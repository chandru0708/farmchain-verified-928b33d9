import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/hooks/use-toast";
import { sampleBatches, CropBatch } from "@/lib/blockchain";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  FileCheck,
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  Package,
  DollarSign,
  Eye,
  Stamp
} from "lucide-react";

interface Invoice {
  type: 'farmer' | 'buyer';
  batchId: string;
  amount: number;
  quantity: number;
  date: Date;
}

// Simulated invoices with some mismatches
const invoices: Record<string, { farmer: Invoice; buyer: Invoice }> = {
  'AGRO-M4K8P2-A1B2C3': {
    farmer: {
      type: 'farmer',
      batchId: 'AGRO-M4K8P2-A1B2C3',
      amount: 22500,
      quantity: 500,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    buyer: {
      type: 'buyer',
      batchId: 'AGRO-M4K8P2-A1B2C3',
      amount: 22500,
      quantity: 500,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  },
  'AGRO-O6M0R4-G7H8I9': {
    farmer: {
      type: 'farmer',
      batchId: 'AGRO-O6M0R4-G7H8I9',
      amount: 36000,
      quantity: 300,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    buyer: {
      type: 'buyer',
      batchId: 'AGRO-O6M0R4-G7H8I9',
      amount: 34000,  // Mismatch!
      quantity: 280,  // Mismatch!
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
  },
};

const AdminPanel = () => {
  const { toast } = useToast();
  const [batches, setBatches] = useState<CropBatch[]>(sampleBatches);
  const [selectedBatch, setSelectedBatch] = useState<CropBatch | null>(null);

  const pendingBatches = batches.filter(b => !b.verified);
  const verifiedBatches = batches.filter(b => b.verified);

  const handleVerify = (batchId: string) => {
    setBatches(batches.map(b => 
      b.id === batchId 
        ? { 
            ...b, 
            verified: true, 
            verifiedBy: 'Dr. Anita Sharma',
            verifiedAt: new Date()
          } 
        : b
    ));
    setSelectedBatch(null);
    toast({
      title: "Batch Verified",
      description: "The batch has been marked as verified on the blockchain",
    });
  };

  const checkInvoiceMismatch = (batchId: string) => {
    const inv = invoices[batchId];
    if (!inv) return null;
    
    const amountMatch = inv.farmer.amount === inv.buyer.amount;
    const quantityMatch = inv.farmer.quantity === inv.buyer.quantity;
    
    return {
      amountMatch,
      quantityMatch,
      hasMismatch: !amountMatch || !quantityMatch,
      farmer: inv.farmer,
      buyer: inv.buyer,
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Expert Verification Panel
            </h1>
            <p className="text-muted-foreground">Verify batch authenticity and compare invoices</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-4 py-2 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-2xl font-bold text-warning">{pendingBatches.length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="text-center px-4 py-2 rounded-lg bg-fresh/10 border border-fresh/20">
              <p className="text-2xl font-bold text-fresh">{verifiedBatches.length}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Batches List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Pending Verification
              </h2>
              <div className="space-y-4">
                {pendingBatches.map((batch, index) => {
                  const invoiceCheck = checkInvoiceMismatch(batch.batchId);
                  return (
                    <motion.div
                      key={batch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`hover:shadow-lg transition-shadow ${
                        invoiceCheck?.hasMismatch ? 'border-warning' : ''
                      }`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-foreground">{batch.cropName}</h3>
                                <StatusBadge status={batch.status} />
                                {invoiceCheck?.hasMismatch && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
                                    <AlertTriangle className="h-3 w-3" />
                                    Invoice Mismatch
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground font-mono mb-3">
                                {batch.batchId}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {batch.farmerName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {batch.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Package className="h-3 w-3" />
                                  {batch.quantity} {batch.unit}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedBatch(batch)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleVerify(batch.id)}
                              >
                                <Stamp className="h-4 w-4 mr-1" />
                                Verify
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
                {pendingBatches.length === 0 && (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-fresh mx-auto mb-3" />
                      <p className="text-muted-foreground">All batches have been verified!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Verified Section */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-fresh" />
                Verified Batches
              </h2>
              <div className="space-y-3">
                {verifiedBatches.map((batch) => (
                  <Card key={batch.id} className="bg-fresh/5 border-fresh/20">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-fresh" />
                          <div>
                            <p className="font-medium text-foreground">{batch.cropName}</p>
                            <p className="text-xs text-muted-foreground">
                              Verified by {batch.verifiedBy} • {batch.verifiedAt?.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <code className="text-xs font-mono text-muted-foreground">
                          {batch.batchId}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Invoice Comparison */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Invoice Comparison
                </CardTitle>
                <CardDescription>
                  {selectedBatch 
                    ? `Comparing invoices for ${selectedBatch.cropName}`
                    : 'Select a batch to compare invoices'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedBatch ? (
                  <div className="space-y-4">
                    {(() => {
                      const check = checkInvoiceMismatch(selectedBatch.batchId);
                      if (!check) {
                        return (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No invoice data available for this batch
                          </p>
                        );
                      }
                      return (
                        <>
                          {/* Farmer Invoice */}
                          <div className="p-4 rounded-lg border border-border">
                            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              Farmer Invoice
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-medium">₹{check.farmer.amount.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Quantity</span>
                                <span className="font-medium">{check.farmer.quantity} units</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date</span>
                                <span className="font-medium">{check.farmer.date.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Buyer Invoice */}
                          <div className="p-4 rounded-lg border border-border">
                            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                              <Package className="h-4 w-4 text-accent" />
                              Buyer Invoice
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className={`flex justify-between ${!check.amountMatch ? 'text-warning' : ''}`}>
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-medium flex items-center gap-1">
                                  ₹{check.buyer.amount.toLocaleString()}
                                  {!check.amountMatch && <AlertTriangle className="h-3 w-3" />}
                                </span>
                              </div>
                              <div className={`flex justify-between ${!check.quantityMatch ? 'text-warning' : ''}`}>
                                <span className="text-muted-foreground">Quantity</span>
                                <span className="font-medium flex items-center gap-1">
                                  {check.buyer.quantity} units
                                  {!check.quantityMatch && <AlertTriangle className="h-3 w-3" />}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date</span>
                                <span className="font-medium">{check.buyer.date.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Match Status */}
                          <div className={`p-4 rounded-lg ${
                            check.hasMismatch 
                              ? 'bg-warning/10 border border-warning/20' 
                              : 'bg-fresh/10 border border-fresh/20'
                          }`}>
                            <div className="flex items-center gap-2">
                              {check.hasMismatch ? (
                                <>
                                  <XCircle className="h-5 w-5 text-warning" />
                                  <div>
                                    <p className="font-medium text-warning">Mismatch Detected</p>
                                    <p className="text-xs text-muted-foreground">
                                      {!check.amountMatch && 'Amount differs. '}
                                      {!check.quantityMatch && 'Quantity differs.'}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-5 w-5 text-fresh" />
                                  <div>
                                    <p className="font-medium text-fresh">Invoices Match</p>
                                    <p className="text-xs text-muted-foreground">
                                      All values verified correctly
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button 
                              className="flex-1"
                              onClick={() => handleVerify(selectedBatch.id)}
                            >
                              <Stamp className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileCheck className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Select a pending batch to view and compare invoices
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;