import { motion } from "framer-motion";
import { Leaf, Truck, Store, User, ArrowRight, CheckCircle } from "lucide-react";

const stages = [
  {
    icon: Leaf,
    title: "Farm Origin",
    description: "Farmers register crops with harvest details, location, and quality metrics",
    details: ["Harvest date recorded", "GPS location tagged", "Quality grade assigned"],
  },
  {
    icon: Truck,
    title: "Transport & Logistics",
    description: "Track movement with temperature monitoring and route optimization",
    details: ["Real-time tracking", "Cold chain verified", "Delivery timestamps"],
  },
  {
    icon: Store,
    title: "Distribution",
    description: "Markets receive verified batches with complete documentation",
    details: ["Inventory synced", "Shelf life tracked", "Price recorded"],
  },
  {
    icon: User,
    title: "Consumer Access",
    description: "Scan QR to see complete journey with freshness guarantee",
    details: ["Full transparency", "Freshness status", "Farmer story"],
  },
];

export function SupplyChainSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From Farm to Fork
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every step is recorded on our immutable blockchain ledger, 
            creating an unbroken chain of trust.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Stage Card */}
                <div className="bg-card rounded-2xl border border-border p-6 h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                      <stage.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {stage.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {stage.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-fresh flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow for mobile/tablet */}
                {index < stages.length - 1 && (
                  <div className="hidden md:flex lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary-foreground rotate-90" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blockchain Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border">
            <div className="h-3 w-3 rounded-full bg-fresh animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              All records secured on immutable blockchain
            </span>
            <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              0x8f7e...3a29
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}