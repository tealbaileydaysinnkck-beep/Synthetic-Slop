import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, TrendingDown, Activity } from "lucide-react";

type DexPair = {
  priceUsd?: string;
  priceChange?: { h24?: number };
  liquidity?: { usd?: number };
  volume?: { h24?: number };
  fdv?: number;
  marketCap?: number;
  url?: string;
  dexId?: string;
  pairAddress?: string;
  baseToken?: { symbol?: string };
  chainId?: string;
};

type TickerState =
  | { status: "loading" }
  | { status: "pre-launch" }
  | { status: "error" }
  | { status: "live"; pair: DexPair; updatedAt: number };

type Props = {
  contractAddress: string;
  chain?: string;
};

const POLL_MS = 30_000;
const DEXSCREENER_URL = "https://api.dexscreener.com/latest/dex/tokens";

function isLikelyRealAddress(addr: string): boolean {
  // EVM addresses are 0x + 40 hex chars. The placeholder uses non-hex chars.
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

function formatUsd(n: number | undefined, opts?: { compact?: boolean; decimals?: number }): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "--";
  const compact = opts?.compact ?? false;
  if (compact) {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  }
  const decimals = opts?.decimals ?? (n < 0.01 ? 8 : n < 1 ? 6 : 4);
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function formatPct(n: number | undefined): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "--";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function pickBestPair(pairs: DexPair[] | undefined, chain?: string): DexPair | null {
  if (!pairs || pairs.length === 0) return null;
  const filtered = chain ? pairs.filter((p) => p.chainId === chain) : pairs;
  const sorted = [...(filtered.length ? filtered : pairs)].sort(
    (a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0),
  );
  return sorted[0] ?? null;
}

export default function PriceTicker({ contractAddress, chain = "base" }: Props) {
  const [state, setState] = useState<TickerState>(
    isLikelyRealAddress(contractAddress)
      ? { status: "loading" }
      : { status: "pre-launch" },
  );

  useEffect(() => {
    if (!isLikelyRealAddress(contractAddress)) {
      setState({ status: "pre-launch" });
      return;
    }

    let cancelled = false;
    const fetchPair = async () => {
      try {
        const res = await fetch(`${DEXSCREENER_URL}/${contractAddress}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const pair = pickBestPair(data?.pairs, chain);
        if (cancelled) return;
        if (!pair) {
          setState({ status: "pre-launch" });
        } else {
          setState({ status: "live", pair, updatedAt: Date.now() });
        }
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    };

    fetchPair();
    const id = setInterval(fetchPair, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [contractAddress, chain]);

  if (state.status === "pre-launch") {
    return (
      <TickerShell>
        <div className="flex items-center gap-2 text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
          </span>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-secondary">
            Awaiting Genesis
          </span>
        </div>
        <div className="hidden md:block h-3 w-px bg-border" />
        <Stat label="Price" value="--" />
        <Stat label="24h" value="--" />
        <Stat label="MCap" value="--" />
        <Stat label="Vol 24h" value="--" />
        <div className="hidden md:block h-3 w-px bg-border ml-auto" />
        <span className="hidden md:inline-flex font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Live feed activates on first swap
        </span>
      </TickerShell>
    );
  }

  if (state.status === "loading") {
    return (
      <TickerShell>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
            Pinging Dexscreener
          </span>
        </div>
        <Stat label="Price" value="..." />
        <Stat label="24h" value="..." />
        <Stat label="MCap" value="..." />
        <Stat label="Vol 24h" value="..." />
      </TickerShell>
    );
  }

  if (state.status === "error") {
    return (
      <TickerShell>
        <div className="flex items-center gap-2 text-orange-500">
          <Activity className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
            Feed unreachable / retrying
          </span>
        </div>
        <Stat label="Price" value="--" />
        <Stat label="24h" value="--" />
        <Stat label="MCap" value="--" />
        <Stat label="Vol 24h" value="--" />
      </TickerShell>
    );
  }

  const { pair } = state;
  const price = pair.priceUsd ? parseFloat(pair.priceUsd) : undefined;
  const change = pair.priceChange?.h24;
  const mcap = pair.marketCap ?? pair.fdv;
  const vol = pair.volume?.h24;
  const isUp = (change ?? 0) >= 0;

  return (
    <TickerShell>
      <div className="flex items-center gap-2 text-primary">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </span>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary">
          Live · Base
        </span>
      </div>
      <div className="hidden md:block h-3 w-px bg-border" />
      <Stat label="Price" value={formatUsd(price)} />
      <Stat
        label="24h"
        value={
          <span
            className={`inline-flex items-center gap-1 ${
              isUp ? "text-primary" : "text-orange-500"
            }`}
          >
            {isUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {formatPct(change)}
          </span>
        }
      />
      <Stat label="MCap" value={formatUsd(mcap, { compact: true })} />
      <Stat label="Vol 24h" value={formatUsd(vol, { compact: true })} />
      {pair.url && (
        <a
          href={pair.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          Chart <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </TickerShell>
  );
}

function TickerShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-darker/95 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {children}
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-xs md:text-sm font-bold text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}
