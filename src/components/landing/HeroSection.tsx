import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Play, ArrowRight, Leaf, Truck, Store, User } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Blockchain-Powered Transparency
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              AgroLedger –{" "}
              <span className="text-primary">Transparent Agriculture</span>{" "}
              with Blockchain
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Track crops from farm to fork with trust. Every step verified, 
              every transaction immutable, every product traceable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group" asChild>
                <Link to="/traceability">
                  <Play className="h-4 w-4 mr-2" />
                  View Demo
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/consumer">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR Code
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Supply Chain Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-2xl border border-border p-8 shadow-lg">
              {/* Chain visualization */}
              <div className="flex items-center justify-between relative">
                {/* Connection Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full -translate-y-1/2 z-0" />
                
                {/* Nodes */}
                {[
                  { icon: Leaf, label: "Farmer", color: "bg-primary" },
                  { icon: Truck, label: "Transport", color: "bg-accent" },
                  { icon: Store, label: "Market", color: "bg-primary" },
                  { icon: User, label: "Consumer", color: "bg-accent" },
                ].map((node, index) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative z-10 flex flex-col items-center gap-2"
                  >
                    <div 
                      className={`h-14 w-14 md:h-16 md:w-16 rounded-full ${node.color} flex items-center justify-center shadow-lg ring-4 ring-background`}
                    >
                      <node.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">
                      {node.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
                {[
                  { value: "10K+", label: "Batches Tracked" },
                  { value: "500+", label: "Farmers" },
                  { value: "99.9%", label: "Accuracy" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 h-20 w-20 rounded-xl bg-blockchain/10 border border-blockchain/20 flex items-center justify-center"
            >
              <div className="text-blockchain font-mono text-xs text-center">
                <div className="font-bold">0x8f7e</div>
                <div className="text-[10px] opacity-70">Block #1234</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}