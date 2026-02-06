import { motion } from "framer-motion";
import { QrCode, Clock, Shield, FileCheck, Leaf, BarChart3 } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Tracking",
    description: "Instant access to complete product history with a simple scan. Every batch gets a unique, tamper-proof QR code.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Expiry-Aware QR",
    description: "Real-time freshness monitoring with automatic status updates. Know exactly when your products are at their best.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Shield,
    title: "Expert Verification",
    description: "Certified agricultural experts verify batch quality and authenticity before products reach consumers.",
    color: "text-fresh",
    bgColor: "bg-fresh/10",
  },
  {
    icon: FileCheck,
    title: "Both-Side Invoice Check",
    description: "Compare farmer and buyer invoices automatically. Flag discrepancies and ensure fair transactions.",
    color: "text-blockchain",
    bgColor: "bg-blockchain/10",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "Track and promote eco-friendly farming methods. Support farmers committed to sustainability.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Price Transparency",
    description: "Complete price history from farm to shelf. Ensure fair pricing across the entire supply chain.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            Why AgroLedger
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Agriculture, Simplified
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our blockchain-powered platform ensures every step of your food's journey 
            is recorded, verified, and accessible.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} mb-4 transition-transform group-hover:scale-110`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}