import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CropBatch, sampleBatches, getDaysUntilExpiry } from "@/lib/blockchain";
import { 
  Search, 
  QrCode, 
  User, 
  MapPin, 
  Calendar,
  Package,
  DollarSign,
  CheckCircle,
  Clock,
  Leaf,
  TrendingUp,
  Shield
} from "lucide-react";

const ConsumerPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [batch, setBatch] = useState<CropBatch | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = sampleBatches.find(
      (b) => b.batchId.toLowerCase() === searchValue.toLowerCase()
    );
    setBatch(found || null);
    setSearched(true);
  };

  const daysRemaining = batch ? getDaysUntilExpiry(batch.expiryDate) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Product</h1>
          <p className="text-muted-foreground">
            Scan QR code or enter Batch ID to view complete product journey
          </p>
        </div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="relative flex-1">
                  <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter Batch ID (e.g., AGRO-M4K8P2-A1B2C3)"
                    className="pl-11 h-12"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="gap-2">
                  <Search className="h-4 w-4" />
                  Track
                </Button>
              </form>
              
              {/* Sample IDs */}
              <div className="mt-4 text-sm text-muted-foreground">
                <span>Try sample: </span>
                {sampleBatches.slice(0, 2).map((b, i) => (
                  <span key={b.batchId}>
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => {
                        setSearchValue(b.batchId);
                      }}
                    >
                      {b.batchId}
                    </button>
                    {i === 0 && ", "}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {batch ? (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Info Card */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Leaf className="h-6 w-6 text-primary" />
                          {batch.cropName}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Batch: {batch.batchId}
                        </CardDescription>
                      </div>
                      <StatusBadge status={batch.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Farmer Info */}
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Farmer Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name</span>
                          <p className="font-medium">{batch.farmerName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location</span>
                          <p className="font-medium flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {batch.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-card border border-border text-center">
                        <Package className="h-5 w-5 text-primary mx-auto mb-2" />
                        <span className="text-xs text-muted-foreground block">Quantity</span>
                        <p className="font-semibold">{batch.quantity} {batch.unit}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card border border-border text-center">
                        <DollarSign className="h-5 w-5 text-primary mx-auto mb-2" />
                        <span className="text-xs text-muted-foreground block">Price</span>
                        <p className="font-semibold">₹{batch.price}/{batch.unit}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card border border-border text-center">
                        <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                        <span className="text-xs text-muted-foreground block">Harvested</span>
                        <p className="font-semibold">{batch.harvestDate.toLocaleDateString()}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card border border-border text-center">
                        <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                        <span className="text-xs text-muted-foreground block">Expires</span>
                        <p className="font-semibold">{batch.expiryDate.toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Freshness Meter */}
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Freshness Status
                        </h4>
                        <StatusBadge status={batch.status} />
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${Math.max(0, Math.min(100, (daysRemaining / 14) * 100))}%` 
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            batch.status === 'fresh' 
                              ? 'bg-fresh' 
                              : batch.status === 'near-expiry' 
                                ? 'bg-warning' 
                                : 'bg-expired'
                          }`}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {daysRemaining > 0 
                          ? `${daysRemaining} days remaining`
                          : 'Product has expired'
                        }
                      </p>
                    </div>

                    {/* Verification */}
                    <div className={`p-4 rounded-lg border ${
                      batch.verified 
                        ? 'bg-fresh/10 border-fresh/30' 
                        : 'bg-muted border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          batch.verified ? 'bg-fresh' : 'bg-muted-foreground'
                        }`}>
                          {batch.verified ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <Shield className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {batch.verified ? 'Verified Product' : 'Pending Verification'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {batch.verified 
                              ? `Verified by ${batch.verifiedBy} on ${batch.verifiedAt?.toLocaleDateString()}`
                              : 'This batch is awaiting expert verification'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* QR Code Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Batch QR Code</CardTitle>
                    <CardDescription>Scan to verify authenticity</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="p-6 bg-white rounded-lg border border-border mb-4">
                      <QRCodeSVG
                        value={batch.batchId}
                        size={180}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <code className="text-xs font-mono bg-muted px-3 py-2 rounded text-center break-all">
                      {batch.batchId}
                    </code>
                    
                    {/* Blockchain Hash */}
                    <div className="mt-6 w-full p-3 rounded-lg bg-blockchain/10 border border-blockchain/20">
                      <p className="text-xs text-muted-foreground mb-1">Blockchain Hash</p>
                      <code className="text-xs font-mono text-blockchain">
                        0x8f7e6d5c4b3a2910
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                    <Search className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Batch Not Found
                  </h3>
                  <p className="text-muted-foreground">
                    No product found with ID "{searchValue}". Please check the batch ID and try again.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ConsumerPage;