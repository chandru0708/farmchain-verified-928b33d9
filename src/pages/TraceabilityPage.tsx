import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { sampleBatches, blockchainLedger, CropBatch } from "@/lib/blockchain";
import { 
  Leaf, 
  Truck, 
  Store, 
  User, 
  CheckCircle, 
  Clock,
  MapPin,
  Hash,
  ArrowRight,
  Calendar
} from "lucide-react";

const stageIcons = {
  farmer: Leaf,
  transport: Truck,
  market: Store,
  consumer: User,
};

const stageColors = {
  farmer: "bg-primary",
  transport: "bg-accent",
  market: "bg-fresh",
  consumer: "bg-blockchain",
};

const TraceabilityPage = () => {
  const [selectedBatch, setSelectedBatch] = useState<CropBatch>(sampleBatches[0]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Supply Chain Traceability</h1>
          <p className="text-muted-foreground">
            Visual timeline of product journey with immutable blockchain records
          </p>
        </div>

        {/* Batch Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {sampleBatches.map((batch) => (
            <button
              key={batch.id}
              onClick={() => setSelectedBatch(batch)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedBatch.id === batch.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {batch.cropName}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedBatch.cropName}</CardTitle>
                    <CardDescription>
                      {selectedBatch.batchId}
                    </CardDescription>
                  </div>
                  <StatusBadge status={selectedBatch.verified ? 'verified' : 'pending'} />
                </div>
              </CardHeader>
              <CardContent>
                {/* Timeline Visual */}
                <div className="relative">
                  {selectedBatch.timeline.map((event, index) => {
                    const Icon = stageIcons[event.stage];
                    const color = stageColors[event.stage];
                    const isLast = index === selectedBatch.timeline.length - 1;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative flex gap-6 pb-8"
                      >
                        {/* Connector Line */}
                        {!isLast && (
                          <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary to-border" />
                        )}

                        {/* Icon */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                            </div>
                            {event.verified && (
                              <CheckCircle className="h-5 w-5 text-fresh flex-shrink-0" />
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {event.actor}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.timestamp.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Future stages placeholder */}
                  {selectedBatch.timeline.length < 4 && (
                    <div className="flex gap-6 opacity-40">
                      <div className="h-12 w-12 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 p-4 rounded-lg border-2 border-dashed border-border">
                        <p className="text-sm text-muted-foreground">
                          Awaiting next stage update...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blockchain Ledger */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blockchain" />
                  Blockchain Ledger
                </CardTitle>
                <CardDescription>
                  Immutable transaction records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {blockchainLedger.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-fresh" />
                      <span className="text-xs font-medium text-foreground">
                        {record.action.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Actor:</span>
                        <span className="font-mono">{record.actor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Hash:</span>
                        <code className="font-mono text-blockchain">{record.hash}</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Time:</span>
                        <span>{record.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    {/* Link indicator */}
                    {index < blockchainLedger.length - 1 && (
                      <div className="flex justify-center mt-2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Chain integrity */}
                <div className="p-3 rounded-lg bg-fresh/10 border border-fresh/20 text-center">
                  <CheckCircle className="h-5 w-5 text-fresh mx-auto mb-1" />
                  <p className="text-xs font-medium text-fresh">Chain Integrity Verified</p>
                  <p className="text-xs text-muted-foreground">All blocks cryptographically linked</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TraceabilityPage;