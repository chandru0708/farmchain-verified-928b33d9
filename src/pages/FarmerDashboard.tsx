import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/hooks/use-toast";
import { 
  CropBatch, 
  generateBatchId, 
  generateBlockchainHash, 
  calculateFreshness,
  sampleBatches 
} from "@/lib/blockchain";
import { 
  Plus, 
  Leaf, 
  Calendar, 
  MapPin, 
  Package, 
  DollarSign,
  QrCode,
  Download,
  Copy,
  CheckCircle
} from "lucide-react";

const FarmerDashboard = () => {
  const { toast } = useToast();
  const [batches, setBatches] = useState<CropBatch[]>(sampleBatches.filter(b => b.farmerId === 'F001'));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cropName: "",
    harvestDate: "",
    quantity: "",
    unit: "kg",
    location: "",
    price: "",
    shelfLifeDays: "14",
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const harvestDate = new Date(formData.harvestDate);
    const expiryDate = new Date(harvestDate);
    expiryDate.setDate(expiryDate.getDate() + parseInt(formData.shelfLifeDays));
    
    const batchId = generateBatchId();
    const newBatch: CropBatch = {
      id: Date.now().toString(),
      batchId,
      farmerId: "F001",
      farmerName: "Current Farmer",
      cropName: formData.cropName,
      harvestDate,
      expiryDate,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      location: formData.location,
      price: parseFloat(formData.price),
      currency: "INR",
      status: calculateFreshness(harvestDate, expiryDate),
      verified: false,
      createdAt: new Date(),
      timeline: [
        {
          id: "t1",
          stage: "farmer",
          title: "Batch Created",
          description: `${formData.cropName} registered on blockchain`,
          timestamp: new Date(),
          actor: "Current Farmer",
          location: formData.location,
          verified: true,
        },
      ],
    };

    setBatches([newBatch, ...batches]);
    setFormData({
      cropName: "",
      harvestDate: "",
      quantity: "",
      unit: "kg",
      location: "",
      price: "",
      shelfLifeDays: "14",
    });
    setShowForm(false);
    
    toast({
      title: "Batch Created Successfully",
      description: `Batch ID: ${batchId} has been recorded on blockchain`,
    });
  };

  const copyBatchId = async (batchId: string) => {
    await navigator.clipboard.writeText(batchId);
    setCopiedId(batchId);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Batch ID copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Manage your crop batches and generate tracking codes</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Batch
          </Button>
        </div>

        {/* Add Batch Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Register New Crop Batch
                </CardTitle>
                <CardDescription>
                  Add your harvest details to generate a blockchain-tracked batch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cropName">Crop Name</Label>
                    <div className="relative">
                      <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cropName"
                        placeholder="e.g., Organic Tomatoes"
                        className="pl-10"
                        value={formData.cropName}
                        onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="harvestDate"
                        type="date"
                        className="pl-10"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shelfLife">Shelf Life (Days)</Label>
                    <Input
                      id="shelfLife"
                      type="number"
                      placeholder="14"
                      value={formData.shelfLifeDays}
                      onChange={(e) => setFormData({ ...formData, shelfLifeDays: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="500"
                          className="pl-10"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          required
                        />
                      </div>
                      <select
                        className="w-20 rounded-md border border-input bg-background px-3 text-sm"
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      >
                        <option value="kg">kg</option>
                        <option value="ton">ton</option>
                        <option value="quintal">quintal</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="e.g., Maharashtra, India"
                        className="pl-10"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price per {formData.unit}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="45"
                        className="pl-10"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3 flex gap-4">
                    <Button type="submit" className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Create Batch
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Batches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch, index) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{batch.cropName}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {batch.location}
                      </CardDescription>
                    </div>
                    <StatusBadge status={batch.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* QR Code */}
                  <div className="flex justify-center p-4 bg-white rounded-lg border border-border">
                    <QRCodeSVG
                      value={batch.batchId}
                      size={120}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  {/* Batch ID */}
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs font-mono bg-muted px-3 py-2 rounded truncate">
                      {batch.batchId}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyBatchId(batch.batchId)}
                    >
                      {copiedId === batch.batchId ? (
                        <CheckCircle className="h-4 w-4 text-fresh" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantity</span>
                      <p className="font-medium">{batch.quantity} {batch.unit}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price</span>
                      <p className="font-medium">₹{batch.price}/{batch.unit}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Harvested</span>
                      <p className="font-medium">{batch.harvestDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires</span>
                      <p className="font-medium">{batch.expiryDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="pt-4 border-t border-border">
                    {batch.verified ? (
                      <div className="flex items-center gap-2 text-sm text-fresh">
                        <CheckCircle className="h-4 w-4" />
                        Verified by {batch.verifiedBy}
                      </div>
                    ) : (
                      <StatusBadge status="pending" className="w-full justify-center" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {batches.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No batches yet</h3>
            <p className="text-muted-foreground mb-4">Create your first crop batch to get started</p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Batch
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;