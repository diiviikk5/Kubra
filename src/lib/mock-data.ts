export interface ProductItem {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  brand: string;
  packSize: string;
  mrp: number;
  ondcPrice: number;
  quickCommercePrice: number;
  amazonPrice: number;
  stockCount: number;
  isAvailable: boolean;
  storeName: string;
  storeType: string;
  storeDistance: string;
  deliveryTimeOndc: string;
  deliveryTimeQCommerce: string;
  image: string;
  barcode: string;
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
  type: 'METRO' | 'BUS' | 'AUTO_CAB' | 'WALK' | 'FERRY';
  agency: string;
  routeCode: string;
  from: string;
  to: string;
  durationMinutes: number;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  status: 'ON_TIME' | 'DELAYED' | 'REROUTED' | 'COMPLETED';
  platformOrBay?: string;
  delayMinutes?: number;
  qrPayload: string;
}

export interface MultimodalRoute {
  id: string;
  city: string;
  title: string;
  from: string;
  to: string;
  totalDurationMinutes: number;
  totalFare: number;
  carbonSavedKg: number;
  compositeTicketId: string;
  dynamicReRouteActive: boolean;
  qrTicketPayload: string;
  legs: TransitLeg[];
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
  issueType: 'DAMAGED_IN_TRANSIT' | 'SEAL_BREACH' | 'WRONG_SKU' | 'EXPIRY_TAMPERED' | 'SEVERE_DELAY';
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
  faultAttribution: 'LOGISTICS_PARTNER' | 'SELLER' | 'INSPECTION_OK';
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
    mrp: 295,
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
    barcode: '8901030383857'
  },
  {
    id: 'prod-002',
    name: 'Fortune Kachi Ghani Pure Mustard Oil (1L Pouch)',
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
    nameHindi: 'टाटा नमक शुद्ध वैक्यूम (1 किग्रा)',
    category: 'Groceries',
    brand: 'Tata Consumer',
    packSize: '1 kg',
    mrp: 28,
    ondcPrice: 24,
    quickCommercePrice: 28,
    amazonPrice: 26,
    stockCount: 45,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar',
    storeType: 'Kirana',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&q=80',
    barcode: '8901030383000'
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
    city: 'Mumbai',
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
        from: 'Ghatkopar Metro Gate 4',
        to: 'Jagruti Nagar Station',
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
        from: 'Kurla Depot Link Bay #4',
        to: 'BKC Connector Bus Stop',
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
  },
  {
    id: 'route-delhi-01',
    city: 'Delhi NCR',
    title: 'Rajiv Chowk ➔ Cyber Hub Gurgaon',
    from: 'Rajiv Chowk (Connaught Place)',
    to: 'DLF Cyber Hub (Gurgaon)',
    totalDurationMinutes: 42,
    totalFare: 65,
    carbonSavedKg: 2.1,
    compositeTicketId: 'DMRC-YATRI-88219',
    dynamicReRouteActive: false,
    qrTicketPayload: 'ONDC:MOBILITY:TICKET:DMRC-YATRI-88219:GATE_OK:FARE65:EXP_20260714T2359',
    legs: [
      {
        type: 'METRO',
        agency: 'DMRC Yellow Line',
        routeCode: 'Line 2 (Samaypur Badli - HUDA City)',
        from: 'Rajiv Chowk Gate 2',
        to: 'Sikanderpur Interchange',
        durationMinutes: 28,
        departureTime: '09:00 AM',
        arrivalTime: '09:28 AM',
        fare: 40,
        status: 'ON_TIME',
        platformOrBay: 'Platform 1 (Southbound)',
        qrPayload: 'ONDC:METRO:DMRC:YEL_99182'
      },
      {
        type: 'METRO',
        agency: 'Rapid Metro Gurgaon',
        routeCode: 'RMGL Loop',
        from: 'Sikanderpur Rapid Platform',
        to: 'Cyber City Station',
        durationMinutes: 6,
        departureTime: '09:32 AM',
        arrivalTime: '09:38 AM',
        fare: 15,
        status: 'ON_TIME',
        platformOrBay: 'Platform 2',
        qrPayload: 'ONDC:METRO:RMGL:CYBER_771'
      },
      {
        type: 'AUTO_CAB',
        agency: 'BluSmart EV Feeder',
        routeCode: 'Cyber Shuttle Bay 3',
        from: 'Cyber City Concourse',
        to: 'Building 10B Entrance',
        durationMinutes: 8,
        departureTime: '09:40 AM',
        arrivalTime: '09:48 AM',
        fare: 10,
        status: 'ON_TIME',
        platformOrBay: 'Feeder Bay 3',
        qrPayload: 'ONDC:CAB:BLUSMART:FEEDER_DL01'
      }
    ]
  },
  {
    id: 'route-blr-01',
    city: 'Bengaluru',
    title: 'Whitefield (Kadugodi) ➔ Indiranagar 100ft Rd',
    from: 'Kadugodi Tree Park',
    to: 'Indiranagar 100ft Road Metro',
    totalDurationMinutes: 38,
    totalFare: 45,
    carbonSavedKg: 1.8,
    compositeTicketId: 'BMRCL-SETU-44192',
    dynamicReRouteActive: false,
    qrTicketPayload: 'ONDC:MOBILITY:TICKET:BMRCL-SETU-44192:GATE_OK:FARE45:EXP_20260714T2359',
    legs: [
      {
        type: 'METRO',
        agency: 'Namma Metro (BMRCL)',
        routeCode: 'Purple Line',
        from: 'Kadugodi Tree Park Gate A',
        to: 'Indiranagar Metro Station',
        durationMinutes: 26,
        departureTime: '08:30 AM',
        arrivalTime: '08:56 AM',
        fare: 35,
        status: 'ON_TIME',
        platformOrBay: 'Platform 1 (Westbound)',
        qrPayload: 'ONDC:METRO:BMRCL:PUR_44102'
      },
      {
        type: 'BUS',
        agency: 'BMTC Metro Feeder',
        routeCode: 'MF-12 AC',
        from: 'Indiranagar Station Stop',
        to: '100ft Road 12th Main',
        durationMinutes: 12,
        departureTime: '09:00 AM',
        arrivalTime: '09:12 AM',
        fare: 10,
        status: 'ON_TIME',
        platformOrBay: 'Feeder Bay #1',
        qrPayload: 'ONDC:BUS:BMTC:MF12_881'
      }
    ]
  },
  {
    id: 'route-kochi-01',
    city: 'Kochi',
    title: 'Aluva Metro ➔ Fort Kochi Water Jetty',
    from: 'Aluva Station Gate 1',
    to: 'Fort Kochi Heritage Jetty',
    totalDurationMinutes: 48,
    totalFare: 50,
    carbonSavedKg: 2.4,
    compositeTicketId: 'KMRL-WATER-77102',
    dynamicReRouteActive: false,
    qrTicketPayload: 'ONDC:MOBILITY:TICKET:KMRL-WATER-77102:GATE_OK:FARE50:EXP_20260714T2359',
    legs: [
      {
        type: 'METRO',
        agency: 'Kochi Metro (KMRL)',
        routeCode: 'Blue Line',
        from: 'Aluva Metro Station',
        to: 'High Court Jetty Station',
        durationMinutes: 30,
        departureTime: '09:15 AM',
        arrivalTime: '09:45 AM',
        fare: 30,
        status: 'ON_TIME',
        platformOrBay: 'Platform 2',
        qrPayload: 'ONDC:METRO:KMRL:BLUE_771'
      },
      {
        type: 'FERRY',
        agency: 'Kochi Water Metro (Electric Boats)',
        routeCode: 'WM-1 (High Court - Fort Kochi)',
        from: 'High Court Water Metro Jetty',
        to: 'Fort Kochi Pier',
        durationMinutes: 18,
        departureTime: '09:50 AM',
        arrivalTime: '10:08 AM',
        fare: 20,
        status: 'ON_TIME',
        platformOrBay: 'Berth 2 (EV Ferry 04)',
        qrPayload: 'ONDC:FERRY:WATERMETRO:WM1_992'
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
  },
  {
    orderId: 'ONDC-ORD-2026-88410',
    orderDate: '14 July 2026, 06:15 PM',
    itemTitle: 'Amul Taaza Milk (6x500ml Tetra Pack)',
    sellerName: 'Shree Krishna Dairy & Sweets',
    buyerApp: 'Kubra Citizen App',
    logisticsPartner: 'Dunzo Open Logistics Network',
    orderAmount: 324,
    refundAmount: 108,
    sachetInsuranceId: 'ZK-SACHET-2026-7731',
    insurer: 'Zurich Kotak General Insurance',
    issueType: 'SEAL_BREACH',
    description: '2 pouches punctured during sorting hub conveyor transfer.',
    sampleEvidenceImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
    telemetryLog: {
      dispatchTimestamp: '2026-07-14T17:50:00Z',
      dispatchWeightKg: 3.12,
      deliveredWeightKg: 2.60,
      transitShockEventG: 3.9,
      tamperSealIntactAtHub: false
    },
    settlementConfidence: 98.7,
    faultAttribution: 'LOGISTICS_PARTNER',
    statutoryClause: 'ONDC IGM Clause 6.1: Hub Sorting Damage Auto-Credit'
  },
  {
    orderId: 'ONDC-ORD-2026-77192',
    orderDate: '14 July 2026, 04:00 PM',
    itemTitle: 'Bajaj Rex 500W Replacement Blade Assembly',
    sellerName: 'Pooja Electricals & Spares',
    buyerApp: 'Kubra Citizen App',
    logisticsPartner: 'Porter Quick Logistics',
    orderAmount: 280,
    refundAmount: 280,
    sachetInsuranceId: 'ZK-SACHET-2026-6610',
    insurer: 'Zurich Kotak General Insurance',
    issueType: 'WRONG_SKU',
    description: '750W Heavy Duty blade delivered instead of 500W Rex OEM model.',
    sampleEvidenceImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80',
    telemetryLog: {
      dispatchTimestamp: '2026-07-14T15:20:00Z',
      dispatchWeightKg: 0.45,
      deliveredWeightKg: 0.45,
      transitShockEventG: 0.8,
      tamperSealIntactAtHub: true
    },
    settlementConfidence: 99.1,
    faultAttribution: 'SELLER',
    statutoryClause: 'ONDC IGM Clause 2.4: Mismatched SKU Zero-Return Instant Refund'
  }
];
