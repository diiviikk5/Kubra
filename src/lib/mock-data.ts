export interface ProductItem {
  id: string;
  name: string;
  nameHindi: string;
  category: 'Groceries' | 'Dairy' | 'Household' | 'Electronics' | 'Personal Care' | 'Snacks';
  packSize: string;
  mrp: number;
  ondcPrice: number;
  quickCommercePrice: number;
  amazonPrice: number;
  stockCount: number;
  isAvailable: boolean;
  storeName: string;
  storeType: 'Kirana' | 'Supermarket' | 'Hardware' | 'Pharmacy' | 'Dairy Stall';
  storeDistance: string;
  deliveryTimeOndc: string;
  deliveryTimeQCommerce: string;
  image: string;
  barcode: string;
  brand: string;
}

export interface StoreInventory {
  storeId: string;
  storeName: string;
  ownerName: string;
  storeType: string;
  location: string;
  rating: number;
  verifiedOndcBadge: boolean;
  totalSkus: number;
  lastSyncTime: string;
  distanceKm: number;
  upiVpa: string;
}

export interface TransitLeg {
  type: 'WALK' | 'METRO' | 'BUS' | 'AUTO_CAB';
  agency: string;
  routeCode: string;
  from: string;
  to: string;
  durationMinutes: number;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  status: 'ON_TIME' | 'DELAYED' | 'CONGESTED';
  delayMinutes?: number;
  platformOrBay?: string;
  qrPayload: string;
}

export interface MultimodalRoute {
  id: string;
  title: string;
  from: string;
  to: string;
  totalDurationMinutes: number;
  totalFare: number;
  carbonSavedKg: number;
  legs: TransitLeg[];
  compositeTicketId: string;
  dynamicReRouteActive: boolean;
  qrTicketPayload: string;
}

export interface DisputeCase {
  orderId: string;
  orderDate: string;
  itemTitle: string;
  sellerName: string;
  buyerApp: string;
  logisticsPartner: string;
  orderAmount: number;
  refundAmount: number;
  sachetInsuranceId: string;
  insurer: string;
  issueType: 'DAMAGED_IN_TRANSIT' | 'WRONG_ITEM_DELIVERED' | 'TAMPERED_SEAL' | 'SPOILED_PERISHABLE';
  description: string;
  sampleEvidenceImage: string;
  telemetryLog: {
    dispatchTimestamp: string;
    dispatchWeightKg: number;
    deliveredWeightKg: number;
    transitShockEventG: number;
    tamperSealIntactAtHub: boolean;
  };
  settlementConfidence: number;
  faultAttribution: 'LOGISTICS_PARTNER' | 'SELLER_PACKAGING' | 'MUTUAL_NO_FAULT';
  statutoryClause: string;
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-001',
    name: 'Aashirvaad Superior MP Shudh Chakki Atta (5kg)',
    nameHindi: 'आशीर्वाद शुद्ध चक्की आटा (5 किग्रा)',
    category: 'Groceries',
    brand: 'ITC Aashirvaad',
    packSize: '5 kg',
    mrp: 275,
    ondcPrice: 245,
    quickCommercePrice: 285,
    amazonPrice: 260,
    stockCount: 18,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar',
    storeType: 'Kirana',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    barcode: '8901030383741'
  },
  {
    id: 'prod-002',
    name: 'Fortune Kachi Ghani Mustard Oil (1L Bottle)',
    nameHindi: 'फॉर्च्यून कच्ची घानी सरसों का तेल (1L)',
    category: 'Groceries',
    brand: 'Adani Wilmar',
    packSize: '1 Litre',
    mrp: 165,
    ondcPrice: 142,
    quickCommercePrice: 168,
    amazonPrice: 155,
    stockCount: 22,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar',
    storeType: 'Kirana',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    barcode: '8906007281014'
  },
  {
    id: 'prod-003',
    name: 'Amul Taaza Homogenised Toned Milk (1L Pouch)',
    nameHindi: 'अमूल ताज़ा टोन्ड दूध (1L)',
    category: 'Dairy',
    brand: 'Amul',
    packSize: '1 Litre',
    mrp: 56,
    ondcPrice: 54,
    quickCommercePrice: 58,
    amazonPrice: 56,
    stockCount: 30,
    isAvailable: true,
    storeName: 'Shree Krishna Dairy & Sweets',
    storeType: 'Dairy Stall',
    storeDistance: '200m away',
    deliveryTimeOndc: '15-20 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    barcode: '8901262010057'
  },
  {
    id: 'prod-004',
    name: 'Bajaj Rex 500W Mixer Grinder Replacement Blade',
    nameHindi: 'बजाज रेक्स मिक्सर ग्राइंडर ब्लेड',
    category: 'Household',
    brand: 'Bajaj Electricals',
    packSize: '1 Unit',
    mrp: 350,
    ondcPrice: 280,
    quickCommercePrice: 350,
    amazonPrice: 310,
    stockCount: 6,
    isAvailable: true,
    storeName: 'Pooja Electricals & Spares',
    storeType: 'Hardware',
    storeDistance: '1.2km away',
    deliveryTimeOndc: '35-45 mins',
    deliveryTimeQCommerce: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
    barcode: '8901308291044'
  },
  {
    id: 'prod-005',
    name: 'Tata Salt Vacuum Evaporated Iodized (1kg)',
    nameHindi: 'टाटा नमक आयोडीन युक्त (1 किग्रा)',
    category: 'Groceries',
    brand: 'Tata Consumer',
    packSize: '1 kg',
    mrp: 28,
    ondcPrice: 25,
    quickCommercePrice: 30,
    amazonPrice: 28,
    stockCount: 45,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar',
    storeType: 'Kirana',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&q=80',
    barcode: '8901030010111'
  },
  {
    id: 'prod-006',
    name: 'Madhur Pure & Hygienic Sugar (1kg)',
    nameHindi: 'मधुर शुद्ध चीनी (1 किग्रा)',
    category: 'Groceries',
    brand: 'Shree Renuka',
    packSize: '1 kg',
    mrp: 58,
    ondcPrice: 51,
    quickCommercePrice: 62,
    amazonPrice: 55,
    stockCount: 28,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar',
    storeType: 'Kirana',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80',
    barcode: '8906001020039'
  },
  {
    id: 'prod-007',
    name: 'Havells 9W LED Cool Day Light Bulb (B22)',
    nameHindi: 'हैवेल्स 9W एलईडी बल्ब',
    category: 'Household',
    brand: 'Havells',
    packSize: 'Pack of 2',
    mrp: 220,
    ondcPrice: 165,
    quickCommercePrice: 210,
    amazonPrice: 180,
    stockCount: 12,
    isAvailable: true,
    storeName: 'Pooja Electricals & Spares',
    storeType: 'Hardware',
    storeDistance: '1.2km away',
    deliveryTimeOndc: '35-45 mins',
    deliveryTimeQCommerce: '15-20 mins',
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&q=80',
    barcode: '8901762014022'
  },
  {
    id: 'prod-008',
    name: 'Dettol Original Germ Protection Liquid Handwash (750ml Refill)',
    nameHindi: 'डेटॉल हैंडवॉश रीफिल (750ml)',
    category: 'Personal Care',
    brand: 'Reckitt',
    packSize: '750 ml',
    mrp: 149,
    ondcPrice: 122,
    quickCommercePrice: 155,
    amazonPrice: 135,
    stockCount: 15,
    isAvailable: true,
    storeName: 'Apollo Care Pharmacy',
    storeType: 'Pharmacy',
    storeDistance: '600m away',
    deliveryTimeOndc: '20-30 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    barcode: '8901396112011'
  },
  {
    id: 'prod-009',
    name: 'Maggi 2-Minute Masala Noodles (Pack of 4)',
    nameHindi: 'मैगी 2-मिनट नूडल्स (4 का पैक)',
    category: 'Snacks',
    brand: 'Nestle Maggi',
    packSize: '280g (4x70g)',
    mrp: 60,
    ondcPrice: 52,
    quickCommercePrice: 60,
    amazonPrice: 56,
    stockCount: 35,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar',
    storeType: 'Kirana',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80',
    barcode: '8901058852236'
  }
];

export const SAMPLE_STORES: StoreInventory[] = [
  {
    storeId: 'str-mum-01',
    storeName: 'Gupta Super Bazaar',
    ownerName: 'Ramprasad Gupta',
    storeType: 'Local Kirana',
    location: 'Shop 4, MG Road, Ghatkopar East, Mumbai - 400077',
    rating: 4.8,
    verifiedOndcBadge: true,
    totalSkus: 840,
    lastSyncTime: '3 mins ago',
    distanceKm: 0.45,
    upiVpa: 'guptabazaar@icici'
  },
  {
    storeId: 'str-mum-02',
    storeName: 'Pooja Electricals & Spares',
    ownerName: 'Pooja & Sanjay Mehta',
    storeType: 'Hardware & Spares',
    location: '12 Station Road, Ghatkopar West, Mumbai - 400086',
    rating: 4.9,
    verifiedOndcBadge: true,
    totalSkus: 420,
    lastSyncTime: '12 mins ago',
    distanceKm: 1.2,
    upiVpa: 'poojaelectricals@hdfc'
  },
  {
    storeId: 'str-mum-03',
    storeName: 'Shree Krishna Dairy & Sweets',
    ownerName: 'Gopal Yadav',
    storeType: 'Fresh Dairy & Sweets',
    location: 'Plot 8, Pant Nagar, Ghatkopar East, Mumbai - 400075',
    rating: 4.7,
    verifiedOndcBadge: true,
    totalSkus: 110,
    lastSyncTime: '1 min ago',
    distanceKm: 0.2,
    upiVpa: 'shreekrishnadairy@sbi'
  }
];

export const SAMPLE_TRANSIT_ROUTES: MultimodalRoute[] = [
  {
    id: 'route-mum-01',
    title: 'Ghatkopar Station ➔ BKC Financial Hub',
    from: 'Ghatkopar (East)',
    to: 'Bandra-Kurla Complex (Diamond Bourse)',
    totalDurationMinutes: 34,
    totalFare: 55,
    carbonSavedKg: 1.45,
    compositeTicketId: 'MM-PASS-2026-99120',
    dynamicReRouteActive: false,
    qrTicketPayload: 'ONDC:MOBILITY:TICKET:MM-PASS-2026-99120:GATE_OK:FARE55:EXP_20260714T2359',
    legs: [
      {
        type: 'WALK',
        agency: 'Citizen Pedestrian Rail',
        routeCode: 'Skywalk East',
        from: 'Ghatkopar Station Gate 3',
        to: 'Metro Line 1 Platform 1',
        durationMinutes: 3,
        departureTime: '08:45 AM',
        arrivalTime: '08:48 AM',
        fare: 0,
        status: 'ON_TIME',
        qrPayload: 'PASS_WALK_OK'
      },
      {
        type: 'METRO',
        agency: 'MMOPL (Mumbai Metro)',
        routeCode: 'Line 1 (Blue)',
        from: 'Ghatkopar Metro',
        to: 'Jagruti Nagar',
        durationMinutes: 8,
        departureTime: '08:50 AM',
        arrivalTime: '08:58 AM',
        fare: 20,
        status: 'ON_TIME',
        platformOrBay: 'Platform 2 (Southbound)',
        qrPayload: 'ONDC:METRO:MMOPL:TKT_99812:VALID'
      },
      {
        type: 'BUS',
        agency: 'BEST City Bus',
        routeCode: 'Route 302 AC',
        from: 'Kurla Depot Link',
        to: 'BKC Connector Bus Station',
        durationMinutes: 15,
        departureTime: '09:04 AM',
        arrivalTime: '09:19 AM',
        fare: 15,
        status: 'ON_TIME',
        platformOrBay: 'Bay #4 (Real-time Slot Reserved)',
        qrPayload: 'ONDC:BUS:BEST:RT302:TKT_99813'
      },
      {
        type: 'AUTO_CAB',
        agency: 'Bharat Taxi / Yatri Auto',
        routeCode: 'Electric Auto Node #4',
        from: 'BKC Connector Gate',
        to: 'Diamond Bourse Tower B',
        durationMinutes: 8,
        departureTime: '09:22 AM',
        arrivalTime: '09:30 AM',
        fare: 20,
        status: 'ON_TIME',
        platformOrBay: 'Designated Smart Bay Alpha',
        qrPayload: 'ONDC:CAB:BHARAT:AUTO_MH02_EE'
      }
    ]
  }
];

export const SAMPLE_DISPUTES: DisputeCase[] = [
  {
    orderId: 'ONDC-ORD-2026-99214',
    orderDate: '14 July 2026, 08:30 PM',
    itemTitle: 'Fortune Kachi Ghani Mustard Oil (1L Bottle)',
    sellerName: 'Gupta Super Bazaar',
    buyerApp: 'Kubra Citizen App',
    logisticsPartner: 'Shadowfax FleetConnect FIFO',
    orderAmount: 667,
    refundAmount: 142,
    sachetInsuranceId: 'ZK-SACHET-2026-8812',
    insurer: 'Zurich Kotak General Insurance',
    issueType: 'DAMAGED_IN_TRANSIT',
    description: 'Oil bottle arrived ruptured with leaked liquid soaking outer delivery carton.',
    sampleEvidenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80',
    telemetryLog: {
      dispatchTimestamp: '2026-07-14T19:40:00Z',
      dispatchWeightKg: 5.24,
      deliveredWeightKg: 4.85,
      transitShockEventG: 4.8,
      tamperSealIntactAtHub: false
    },
    settlementConfidence: 99.4,
    faultAttribution: 'LOGISTICS_PARTNER',
    statutoryClause: 'ONDC IGM Rules Section 4.2: Automated Transit Damage Escrow Reversal'
  }
];
