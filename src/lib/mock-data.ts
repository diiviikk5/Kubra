export interface ProductItem {
  id: string;
  name: string;
  nameHindi: string;
  category: 'Groceries' | 'Electronics' | 'Personal Care' | 'Essentials';
  packSize: string;
  mrp: number;
  ondcPrice: number;
  quickCommercePrice: number;
  amazonPrice: number;
  stockCount: number;
  isAvailable: boolean;
  storeName: string;
  storeDistance: string;
  deliveryTimeOndc: string;
  deliveryTimeQCommerce: string;
  image: string;
  barcode: string;
  substituteId?: string;
}

export interface StoreInventory {
  storeId: string;
  storeName: string;
  ownerName: string;
  location: string;
  rating: number;
  verifiedOndcBadge: boolean;
  totalSkus: number;
  lastSyncTime: string;
  distanceKm: number;
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
}

export interface DisputeCase {
  orderId: string;
  orderDate: string;
  itemTitle: string;
  sellerName: string;
  buyerApp: string;
  logisticsPartner: string;
  orderAmount: number;
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
    packSize: '5 kg',
    mrp: 275,
    ondcPrice: 245,
    quickCommercePrice: 285,
    amazonPrice: 260,
    stockCount: 14,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar (ONDC Verified)',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '12 mins (₹40 Surge + ₹15 Handling)',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
    barcode: '8901725131012',
    substituteId: 'prod-002',
  },
  {
    id: 'prod-002',
    name: 'Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)',
    nameHindi: 'फॉर्च्यून रिफाइंड सनफ्लावर तेल (1 लीटर)',
    category: 'Groceries',
    packSize: '1 L',
    mrp: 165,
    ondcPrice: 142,
    quickCommercePrice: 168,
    amazonPrice: 155,
    stockCount: 8,
    isAvailable: true,
    storeName: 'Gupta Super Bazaar (ONDC Verified)',
    storeDistance: '450m away',
    deliveryTimeOndc: '25-35 mins',
    deliveryTimeQCommerce: '15 mins',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80',
    barcode: '8906007280014',
  },
  {
    id: 'prod-003',
    name: 'Tata Salt Vacuum Evaporated Iodized Salt (1kg)',
    nameHindi: 'टाटा नमक आयोडीन युक्त (1 किग्रा)',
    category: 'Groceries',
    packSize: '1 kg',
    mrp: 30,
    ondcPrice: 26,
    quickCommercePrice: 32,
    amazonPrice: 28,
    stockCount: 22,
    isAvailable: true,
    storeName: 'Jai Ganesh Kirana Store',
    storeDistance: '600m away',
    deliveryTimeOndc: '30 mins',
    deliveryTimeQCommerce: '15 mins',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&auto=format&fit=crop&q=80',
    barcode: '8901030385618',
  },
  {
    id: 'prod-004',
    name: 'Amul Taaza Homogenised Toned Milk (1 Litre Tetra)',
    nameHindi: 'अमुल ताज़ा टोन्ड दूध (1 लीटर)',
    category: 'Essentials',
    packSize: '1 L',
    mrp: 74,
    ondcPrice: 70,
    quickCommercePrice: 78,
    amazonPrice: 75,
    stockCount: 5,
    isAvailable: true,
    storeName: 'Jai Ganesh Kirana Store',
    storeDistance: '600m away',
    deliveryTimeOndc: '30 mins',
    deliveryTimeQCommerce: '12 mins',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80',
    barcode: '8901262010053',
  },
  {
    id: 'prod-005',
    name: 'Dettol Original Germ Protection Soap (Pack of 4 x 125g)',
    nameHindi: 'डेटॉल ओरिजिनल साबुन (4 का पैक)',
    category: 'Personal Care',
    packSize: '4 x 125g',
    mrp: 230,
    ondcPrice: 185,
    quickCommercePrice: 235,
    amazonPrice: 205,
    stockCount: 11,
    isAvailable: true,
    storeName: 'Modern Wellness & General Chemist',
    storeDistance: '850m away',
    deliveryTimeOndc: '40 mins',
    deliveryTimeQCommerce: '15 mins',
    image: 'https://images.unsplash.com/photo-1607006314144-884d64380f2d?w=400&auto=format&fit=crop&q=80',
    barcode: '8901396324019',
  },
  {
    id: 'prod-006',
    name: 'Bajaj Rex 500W Mixer Grinder Replacement Stainless Blade',
    nameHindi: 'बजाज 500W मिक्सर ग्राइंडर स्टेनलेस स्टील ब्लेड',
    category: 'Electronics',
    packSize: '1 Unit',
    mrp: 350,
    ondcPrice: 280,
    quickCommercePrice: 399,
    amazonPrice: 320,
    stockCount: 3,
    isAvailable: true,
    storeName: 'Pooja Electricals & Hardware Bazaar',
    storeDistance: '1.2 km away',
    deliveryTimeOndc: '45 mins (DigiBazaar)',
    deliveryTimeQCommerce: 'Out of Stock on Quick Commerce',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80',
    barcode: '8904011290321',
  }
];

export const SAMPLE_TRANSIT_ROUTES: MultimodalRoute[] = [
  {
    id: 'route-mum-01',
    title: 'Ghatkopar Station ➔ BKC (Bandra Kurla Complex) Diamond Bourse',
    from: 'Ghatkopar Metro Station',
    to: 'BKC Central Business District',
    totalDurationMinutes: 38,
    totalFare: 55,
    carbonSavedKg: 2.4,
    compositeTicketId: 'ONDC-MTT-MUM-893241-QR',
    dynamicReRouteActive: false,
    legs: [
      {
        type: 'METRO',
        agency: 'Mumbai Metro Line 1 (MMOPL via ONDC)',
        routeCode: 'BLUE-L1',
        from: 'Ghatkopar',
        to: 'Airport Road',
        durationMinutes: 14,
        departureTime: '08:45 AM',
        arrivalTime: '08:59 AM',
        fare: 25,
        status: 'ON_TIME',
        platformOrBay: 'Platform 2',
        qrPayload: 'ONDC:MUM-L1:GHT-AIR:AUTH-98321'
      },
      {
        type: 'BUS',
        agency: 'BEST City Bus (Electric AC Express)',
        routeCode: 'BEST-340-EXP',
        from: 'Airport Road Junction',
        to: 'BKC MTNL Interchange',
        durationMinutes: 16,
        departureTime: '09:04 AM',
        arrivalTime: '09:20 AM',
        fare: 15,
        status: 'ON_TIME',
        platformOrBay: 'Bay #4',
        qrPayload: 'ONDC:BEST:BUS-340:SEAT-ANY:AUTH-45129'
      },
      {
        type: 'AUTO_CAB',
        agency: 'Bharat Taxi (ONDC Driver Cooperative)',
        routeCode: 'LAST-MILE-AUTO',
        from: 'BKC MTNL Interchange',
        to: 'Bharat Diamond Bourse Gate 2',
        durationMinutes: 8,
        departureTime: '09:22 AM',
        arrivalTime: '09:30 AM',
        fare: 15,
        status: 'ON_TIME',
        platformOrBay: 'Pickup Point Alpha',
        qrPayload: 'ONDC:BTAX:AUTO-MH02-CR9012'
      }
    ]
  },
  {
    id: 'route-del-02',
    title: 'Noida City Centre ➔ Connaught Place (Rajiv Chowk)',
    from: 'Noida Sector 34',
    to: 'Rajiv Chowk Gate #7',
    totalDurationMinutes: 44,
    totalFare: 62,
    carbonSavedKg: 3.1,
    compositeTicketId: 'ONDC-MTT-DEL-774129-QR',
    dynamicReRouteActive: false,
    legs: [
      {
        type: 'AUTO_CAB',
        agency: 'Namma Yatri / Bharat Taxi',
        routeCode: 'FEEDER-EV-AUTO',
        from: 'Sector 34 Residence',
        to: 'Noida City Centre Metro',
        durationMinutes: 9,
        departureTime: '08:50 AM',
        arrivalTime: '08:59 AM',
        fare: 22,
        status: 'ON_TIME',
        platformOrBay: 'Gate 1 Dropoff',
        qrPayload: 'ONDC:DMRC-FEED:UP16-EX4412'
      },
      {
        type: 'METRO',
        agency: 'Delhi Metro Rail Corp (DMRC Blue Line)',
        routeCode: 'DMRC-BLUE',
        from: 'Noida City Centre',
        to: 'Rajiv Chowk',
        durationMinutes: 35,
        departureTime: '09:03 AM',
        arrivalTime: '09:38 AM',
        fare: 40,
        status: 'ON_TIME',
        platformOrBay: 'Platform 1',
        qrPayload: 'ONDC:DMRC:NOIDA-RAJIV:AUTH-88219'
      }
    ]
  }
];

export const SAMPLE_DISPUTES: DisputeCase[] = [
  {
    orderId: 'ONDC-ORD-2026-99214',
    orderDate: '29 Aug 2026, 04:15 PM',
    itemTitle: 'Fortune Sunlite 1L Pouch + Kissan Mixed Fruit Jam 500g',
    sellerName: 'Krishna Super Mart (Seller NP: DigiDukaan)',
    buyerApp: 'Paytm ONDC Store',
    logisticsPartner: 'FleetConnect / Airxy Tech (FIFO Rider)',
    orderAmount: 345,
    sachetInsuranceId: 'ZURICH-ONDC-SACHET-88321',
    insurer: 'Zurich Kotak General Insurance',
    issueType: 'DAMAGED_IN_TRANSIT',
    description: 'Oil bottle arrived cracked and spilled over the entire grocery box; cardboard is completely soaked with oil.',
    sampleEvidenceImage: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=500&auto=format&fit=crop&q=80',
    telemetryLog: {
      dispatchTimestamp: '29 Aug 2026, 03:42 PM',
      dispatchWeightKg: 1.85,
      deliveredWeightKg: 1.12,
      transitShockEventG: 4.8,
      tamperSealIntactAtHub: true
    },
    settlementConfidence: 99.2,
    faultAttribution: 'LOGISTICS_PARTNER',
    statutoryClause: 'ONDC Sachet Logistics Coverage Clause 4.2: Transit Impact Leakage'
  },
  {
    orderId: 'ONDC-ORD-2026-88102',
    orderDate: '28 Aug 2026, 07:30 PM',
    itemTitle: 'BoAt Rockerz 255 Pro+ Wireless Earphones',
    sellerName: 'Shree Balaji Digital Tech',
    buyerApp: 'Magicpin ONDC',
    logisticsPartner: 'Shadowfax Direct',
    orderAmount: 1299,
    sachetInsuranceId: 'CARE-ONDC-MAR-44912',
    insurer: 'Care Health & General',
    issueType: 'TAMPERED_SEAL',
    description: 'Security tape cut open before delivery, box empty with only warranty card inside.',
    sampleEvidenceImage: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=80',
    telemetryLog: {
      dispatchTimestamp: '28 Aug 2026, 06:10 PM',
      dispatchWeightKg: 0.38,
      deliveredWeightKg: 0.09,
      transitShockEventG: 1.2,
      tamperSealIntactAtHub: false
    },
    settlementConfidence: 98.7,
    faultAttribution: 'LOGISTICS_PARTNER',
    statutoryClause: 'Beckn IGM Protocol 1.0 - Unsealed Package Weight Mismatch (Delta > 70%)'
  }
];
