import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Copy, ExternalLink, Twitter, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PriceTicker from "@/components/PriceTicker";
import mascotLogo from "@assets/mascot_transparent.png";
import coinVariant1 from "@assets/generated-image_(2)_1777487835629.png";
import coinVariant2 from "@assets/generated-image_(3)_1777487835629.png";
import wideBanner from "@assets/Gemini_Generated_Image_9zbaqf9zbaqf9zba_1777487821935.png";
import darkWarehouse from "@assets/generated-image_(1)_1777487835627.png";
import purpleWarehouse from "@assets/generated-image_1777487835629.png";

export default function Home() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const contractAddress = "0xT0X1C000000000000000000000000000SLOP";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Contract address copied to clipboard. Pure Slop.",
      className: "bg-background border-primary text-primary font-mono",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 font-mono font-bold text-lg text-white">
          <img src={mascotLogo} alt="Mascot" className="h-8 w-8 object-contain" />
          <span>$TOXIC<span className="text-primary">.SLOP</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">About</a>
          <a href="#tokenomics" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Tokenomics</a>
          <a href="#how-to-buy" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">How to Buy</a>
          <a href="#roadmap" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Roadmap</a>
        </div>
        <a href="#how-to-buy" className="bg-primary text-black px-4 py-2 rounded font-mono font-bold text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-0.5">
          Buy $TOXIC
        </a>
      </nav>

      {/* Launch Banner */}
      <div className="mt-16 bg-gradient-to-r from-accent via-background to-accent py-2 text-center font-mono text-xs text-primary tracking-widest animate-pulse-banner border-b border-border shadow-[0_0_15px_rgba(57,255,20,0.1)]">
        WARNING: $TOXIC IS LIVE ON BASE NETWORK // NO PRESALE // PURE SLOP
      </div>

      {/* Live Price Ticker */}
      <PriceTicker contractAddress={contractAddress} chain="base" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full font-mono text-xs text-primary tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Staging Area Genesis
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 uppercase">
              Minting our <br />
              <span className="text-secondary drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">own future</span> <br />
              <span className="text-primary font-mono drop-shadow-[0_0_20px_rgba(57,255,20,0.3)]">from slop</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md border-l-2 border-secondary pl-4 font-mono text-sm">
              Born from warehouse shifts, gig work, and zero-safety-net hustle. 
              Not corporate fintech. Not luxury crypto.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#how-to-buy" className="bg-primary text-black px-8 py-4 rounded font-mono font-bold text-sm uppercase tracking-widest hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                Ape In Now
              </a>
              <a href="#contract" className="bg-transparent text-white border border-border px-8 py-4 rounded font-mono font-bold text-sm uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all transform hover:-translate-y-1">
                View Contract
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-glow-pulse"></div>
            <motion.img 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={mascotLogo} 
              alt="Synthetic Slop Mascot" 
              className="relative z-10 max-w-[80%] md:max-w-[100%] max-h-full object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.6)]"
            />
            
            {/* Floating Tags */}
            <div className="absolute top-10 -right-4 bg-card border border-primary/30 px-3 py-1.5 rounded font-mono text-[10px] text-primary animate-float-1 hidden md:block">
              // MIDDLE FINGERS UP
            </div>
            <div className="absolute bottom-20 -left-4 bg-card border border-secondary/30 px-3 py-1.5 rounded font-mono text-[10px] text-secondary animate-float-2 hidden md:block">
              // PURE SLOP
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="bg-primary text-black overflow-hidden py-3 border-y border-primary/50 relative z-20">
        <div className="flex whitespace-nowrap font-mono font-bold text-sm tracking-widest uppercase">
          <div className="animate-marquee flex w-[200%]">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-4">
                PURE SLOP // BUILT FROM SWEAT // BASE NETWORK // NO PRESALE // RENOUNCED //
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contract Section */}
      <section id="contract" className="py-20 px-4 relative bg-darker border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mono text-sm text-secondary uppercase tracking-widest mb-4">Official Contract</h2>
          <div className="bg-card border border-border p-4 md:p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-sm md:text-base text-white break-all bg-background px-4 py-2 rounded border border-border w-full md:w-auto overflow-hidden text-ellipsis">
              {contractAddress}
            </span>
            <button 
              onClick={copyToClipboard}
              className="w-full md:w-auto bg-border hover:bg-muted text-white px-6 py-2 rounded font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* About/Origin Story Section */}
      <section id="about" className="py-24 px-4 relative">
        <div className="absolute inset-0 z-0">
          <img src={darkWarehouse} alt="Warehouse background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 text-white drop-shadow-md">
              Born in the <span className="text-primary font-mono">Loading Dock</span>
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                $TOXIC wasn't conceived in a penthouse or a VC boardroom. It was scribbled on a cardboard box during a 3AM shift break. It's the physical manifestation of zero-safety-net hustle.
              </p>
              <p>
                We're tired of clean, corporate, "safe" crypto that promises to bank the unbanked while locking them out of the real gains. We are the unbanked. We are the ones staging the world's packages while they sleep.
              </p>
              <p className="font-mono text-secondary border-l-2 border-secondary pl-4 py-1">
                Now, we're minting our own future. Pure slop. Real grit.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-secondary/20 blur-[50px] rounded-full"></div>
             <img src={wideBanner} alt="Warehouse graffiti" className="relative z-10 rounded-xl border border-border shadow-2xl object-cover w-full h-[300px] md:h-[400px]" />
             
             {/* Decorative tape */}
             <div className="absolute -top-4 -right-4 w-24 h-8 bg-yellow-500/80 rotate-12 z-20 backdrop-blur-sm shadow-md"></div>
             <div className="absolute -bottom-4 -left-4 w-32 h-8 bg-yellow-500/80 -rotate-6 z-20 backdrop-blur-sm shadow-md"></div>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-24 px-4 bg-black relative border-y border-border overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white">
              The <span className="text-secondary font-mono">Slop-o-nomics</span>
            </h2>
            <p className="text-muted-foreground font-mono max-w-2xl mx-auto">No presale. No team allocation. No VC bags to dump. Just raw, unfiltered, radioactive supply.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Supply", value: "1,000,000,000", desc: "One Billion Slop", color: "text-primary", border: "border-primary/30" },
              { label: "Launch", value: "100% Fair", desc: "No Presale", color: "text-white", border: "border-border" },
              { label: "Liquidity", value: "Burned", desc: "Forever", color: "text-orange-500", border: "border-orange-500/30" },
              { label: "Contract", value: "Renounced", desc: "No Owner", color: "text-secondary", border: "border-secondary/30" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-card p-8 rounded-xl border ${stat.border} flex flex-col items-center justify-center text-center relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{stat.label}</div>
                <div className={`text-3xl font-bold font-mono mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              className="w-48 h-48 relative"
            >
              <img src={coinVariant1} alt="$TOXIC Coin" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(57,255,20,0.4)]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section id="how-to-buy" className="py-24 px-4 relative">
        <div className="absolute inset-0 z-0">
          <img src={purpleWarehouse} alt="Purple Warehouse" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white">
              How to <span className="text-primary font-mono">Ape</span>
            </h2>
            <p className="text-muted-foreground font-mono">Get on Base. Get the Slop.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Get a Wallet",
                desc: "Download Metamask, Coinbase Wallet, or Rabby. Save your seed phrase somewhere safe (not on a post-it in the break room)."
              },
              {
                step: "02",
                title: "Bridge to Base",
                desc: "Send ETH to your wallet on the Base network. You can use the official Base bridge or withdraw directly from Coinbase to Base."
              },
              {
                step: "03",
                title: "Go to Uniswap",
                desc: "Connect your wallet to Uniswap on the Base network. Paste the $TOXIC contract address into the swap interface.",
                action: { text: "Open Uniswap", url: "#" }
              },
              {
                step: "04",
                title: "Swap ETH for $TOXIC",
                desc: "Enter the amount, set slippage (it's slop, maybe need 1-2%), and confirm the transaction. Welcome to the loading dock."
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center group hover:border-primary/50 transition-colors"
              >
                <div className="text-5xl font-bold font-mono text-border group-hover:text-primary/20 transition-colors">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
                {step.action && (
                  <a href={step.action.url} className="shrink-0 bg-border hover:bg-primary hover:text-black text-white px-6 py-3 rounded font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                    {step.action.text} <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 px-4 bg-darker border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white">
              The <span className="text-secondary font-mono">Manifesto</span>
            </h2>
            <p className="text-muted-foreground font-mono">Plans are for suits. We have a manifesto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: "Phase 1: Clock In",
                title: "The Genesis Shift",
                items: ["Launch $TOXIC on Base", "Burn LP & Renounce", "Initial TG/Twitter Setup", "Meme generation engine (us on no sleep)"]
              },
              {
                phase: "Phase 2: Overtime",
                title: "Spreading the Slop",
                items: ["CoinGecko/CMC Listings", "Community-funded graffiti", "DEX Trending", "5,000 Holders (The Night Shift Army)"],
                active: true
              },
              {
                phase: "Phase 3: Promotion",
                title: "Taking over the Warehouse",
                items: ["CEX Listings (if they can handle the toxicity)", "Slop Merch (High-vis vests & hardhats)", "100,000+ Holders", "Flipping corporate coins"]
              }
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`bg-card p-8 rounded-xl border relative ${phase.active ? 'border-primary shadow-[0_0_20px_rgba(57,255,20,0.1)]' : 'border-border'}`}
              >
                {phase.active && (
                  <div className="absolute top-0 right-0 bg-primary text-black font-mono text-[10px] uppercase px-3 py-1 rounded-bl-lg rounded-tr-xl font-bold tracking-widest">
                    Current Shift
                  </div>
                )}
                <div className="font-mono text-xs text-secondary mb-2 uppercase tracking-widest">{phase.phase}</div>
                <h3 className="text-xl font-bold text-white mb-6 uppercase">{phase.title}</h3>
                <ul className="space-y-4">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary font-mono mt-0.5">{'>'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Community */}
      <footer className="pt-20 pb-24 md:pb-12 px-4 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-4">
            <img src={coinVariant2} alt="$TOXIC Coin" className="w-16 h-16 object-contain" />
            <div>
              <div className="font-mono font-bold text-xl text-white tracking-widest">$TOXIC</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">Staging Area Genesis</div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all">
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground max-w-2xl text-center md:text-left font-mono">
            DISCLAIMER: $TOXIC is a memecoin created for entertainment purposes. It has no intrinsic value and no expectation of financial return. There is no formal team or roadmap. The coin is completely useless and for entertainment purposes only. Not financial advice. This is literally just slop.
          </p>
          <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
            © 2026 Synthetic Slop.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Buy Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <a href="#how-to-buy" className="block w-full bg-primary text-black text-center py-3 rounded font-mono font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(57,255,20,0.3)]">
          BUY $TOXIC NOW
        </a>
      </div>
    </div>
  );
}