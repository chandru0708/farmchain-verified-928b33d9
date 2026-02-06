// Simulated Blockchain Ledger for AgroLedger

export interface BlockchainRecord {
  id: string;
  timestamp: Date;
  action: string;
  actor: string;
  data: Record<string, unknown>;
  previousHash: string;
  hash: string;
}

export interface CropBatch {
  id: string;
  batchId: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  harvestDate: Date;
  expiryDate: Date;
  quantity: number;
  unit: string;
  location: string;
  price: number;
  currency: string;
  status: 'fresh' | 'near-expiry' | 'expired';
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  stage: 'farmer' | 'transport' | 'market' | 'consumer';
  title: string;
  description: string;
  timestamp: Date;
  actor: string;
  location: string;
  verified: boolean;
}

// Simple hash function for demo
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hexHash}${Date.now().toString(16)}`.slice(0, 18);
}

export function generateBatchId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `AGRO-${timestamp}-${random}`.toUpperCase();
}

export function generateBlockchainHash(data: Record<string, unknown>): string {
  return simpleHash(JSON.stringify(data) + Date.now());
}

export function calculateFreshness(harvestDate: Date, expiryDate: Date): 'fresh' | 'near-expiry' | 'expired' {
  const now = new Date();
  const totalShelfLife = expiryDate.getTime() - harvestDate.getTime();
  const elapsed = now.getTime() - harvestDate.getTime();
  const remaining = expiryDate.getTime() - now.getTime();
  
  if (remaining <= 0) return 'expired';
  if (remaining < totalShelfLife * 0.2) return 'near-expiry';
  return 'fresh';
}

export function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const diff = expiryDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Sample data for demo
export const sampleBatches: CropBatch[] = [
  {
    id: '1',
    batchId: 'AGRO-M4K8P2-A1B2C3',
    farmerId: 'F001',
    farmerName: 'Rajesh Kumar',
    cropName: 'Organic Tomatoes',
    harvestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    quantity: 500,
    unit: 'kg',
    location: 'Maharashtra, India',
    price: 45,
    currency: 'INR',
    status: 'fresh',
    verified: true,
    verifiedBy: 'Dr. Anita Sharma',
    verifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    timeline: [
      {
        id: 't1',
        stage: 'farmer',
        title: 'Harvested',
        description: 'Organic tomatoes harvested from Farm Plot A7',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        actor: 'Rajesh Kumar',
        location: 'Maharashtra, India',
        verified: true,
      },
      {
        id: 't2',
        stage: 'transport',
        title: 'In Transit',
        description: 'Loaded onto refrigerated truck TN-42-AB-1234',
        timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
        actor: 'FastFreight Logistics',
        location: 'En route to Mumbai',
        verified: true,
      },
      {
        id: 't3',
        stage: 'market',
        title: 'At Distribution Center',
        description: 'Received at Mumbai Central Market',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        actor: 'Mumbai Fresh Markets',
        location: 'Mumbai, India',
        verified: true,
      },
    ],
  },
  {
    id: '2',
    batchId: 'AGRO-N5L9Q3-D4E5F6',
    farmerId: 'F002',
    farmerName: 'Priya Patel',
    cropName: 'Basmati Rice',
    harvestDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    quantity: 2000,
    unit: 'kg',
    location: 'Punjab, India',
    price: 85,
    currency: 'INR',
    status: 'fresh',
    verified: true,
    verifiedBy: 'Agri Quality Board',
    verifiedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    timeline: [
      {
        id: 't1',
        stage: 'farmer',
        title: 'Harvested & Processed',
        description: 'Premium Basmati rice harvested and sun-dried',
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        actor: 'Priya Patel',
        location: 'Punjab, India',
        verified: true,
      },
      {
        id: 't2',
        stage: 'transport',
        title: 'Transported',
        description: 'Shipped to regional warehouse',
        timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        actor: 'AgriMove Transport',
        location: 'Delhi NCR',
        verified: true,
      },
    ],
  },
  {
    id: '3',
    batchId: 'AGRO-O6M0R4-G7H8I9',
    farmerId: 'F003',
    farmerName: 'Amit Singh',
    cropName: 'Fresh Mangoes',
    harvestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    quantity: 300,
    unit: 'kg',
    location: 'Gujarat, India',
    price: 120,
    currency: 'INR',
    status: 'near-expiry',
    verified: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    timeline: [
      {
        id: 't1',
        stage: 'farmer',
        title: 'Harvested',
        description: 'Alphonso mangoes picked at peak ripeness',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        actor: 'Amit Singh',
        location: 'Gujarat, India',
        verified: true,
      },
    ],
  },
];

export const blockchainLedger: BlockchainRecord[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    action: 'BATCH_CREATED',
    actor: 'Rajesh Kumar',
    data: { batchId: 'AGRO-M4K8P2-A1B2C3', cropName: 'Organic Tomatoes' },
    previousHash: '0x0000000000000000',
    hash: '0x8f7e6d5c4b3a2910',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
    action: 'TRANSPORT_STARTED',
    actor: 'FastFreight Logistics',
    data: { batchId: 'AGRO-M4K8P2-A1B2C3', vehicleId: 'TN-42-AB-1234' },
    previousHash: '0x8f7e6d5c4b3a2910',
    hash: '0x1a2b3c4d5e6f7081',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    action: 'BATCH_VERIFIED',
    actor: 'Dr. Anita Sharma',
    data: { batchId: 'AGRO-M4K8P2-A1B2C3', quality: 'Grade A' },
    previousHash: '0x1a2b3c4d5e6f7081',
    hash: '0x9876543210abcdef',
  },
];