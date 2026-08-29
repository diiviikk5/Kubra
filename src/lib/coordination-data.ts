export interface WardCoalition {
  id: string;
  wardNumber: string;
  wardName: string;
  city: string;
  corporatorName: string;
  party: string;
  winningMarginVotes: number; // Corporator winning margin
  activeVoterBlocCount: number; // Citizens in this coordination pool
  blocImpactPercent: number; // % of winning margin
  activePledges: {
    id: string;
    type: 'TRANSIT_POOL' | 'KIRANA_COLLECTIVE' | 'CIVIC_INTERVENTION';
    title: string;
    targetCount: number;
    currentCount: number;
    status: 'ORGANIZING' | 'QUORUM_REACHED' | 'ACTION_TRIGGERED' | 'OFFICIAL_RESOLVED';
    description: string;
    impactSummary: string;
    nextAction: string;
    nextActionDate: string;
    participants: { name: string; timestamp: string; verifiedVoter: boolean }[];
  }[];
}

export const SAMPLE_WARD_COALITIONS: WardCoalition[] = [
  {
    id: 'ward-mum-142',
    wardNumber: 'Ward 142 (Ghatkopar East - Pantnagar)',
    wardName: 'Pantnagar - Garodia Nagar',
    city: 'Mumbai (BMC)',
    corporatorName: 'Suresh R. Gawde',
    party: 'Shiv Sena / MVA',
    winningMarginVotes: 412, // Won by just 412 votes!
    activeVoterBlocCount: 348,
    blocImpactPercent: 84.5, // 84.5% of the margin needed to win/lose next election!
    activePledges: [
      {
        id: 'pledge-transit-01',
        type: 'TRANSIT_POOL',
        title: '300-Commuter Dedicated BEST Electric AC Feeder to BKC',
        targetCount: 300,
        currentCount: 324,
        status: 'QUORUM_REACHED',
        description: 'Instead of 300 individual cab bookings or congested train changes, 324 verified commuters pledged daily travel on Route 340-EXP via ONDC.',
        impactSummary: 'BEST Depot Manager served binding demand notice; 2 additional electric AC buses scheduled from Monday.',
        nextAction: 'Inaugural Collective Commute Launch',
        nextActionDate: 'Mon, 08:30 AM at Ghatkopar Metro Gate 3',
        participants: [
          { name: 'Aditya K.', timestamp: '10 mins ago', verifiedVoter: true },
          { name: 'Pooja Sharma', timestamp: '25 mins ago', verifiedVoter: true },
          { name: 'Vikram Joshi', timestamp: '1 hour ago', verifiedVoter: true },
          { name: 'Meera Iyer', timestamp: '2 hours ago', verifiedVoter: true }
        ]
      },
      {
        id: 'pledge-kirana-02',
        type: 'KIRANA_COLLECTIVE',
        title: 'Neelkanth Valley Society 50-Family Bulk Staple Pool (ONDC)',
        targetCount: 50,
        currentCount: 46,
        status: 'ORGANIZING',
        description: '46 families pooling monthly Atta, Rice & Oil orders directly from Gupta Super Bazaar via ONDC DigiDukaan, bypassing ₹40 dark store surges.',
        impactSummary: 'Saves ₹18,400/month for the society; ₹1.2L direct revenue guaranteed to neighborhood Kirana.',
        nextAction: 'Order Bulk Dispatch via FIFO Fleet',
        nextActionDate: 'Tomorrow, 06:00 PM',
        participants: [
          { name: 'Flat 402 (Nair Family)', timestamp: '15 mins ago', verifiedVoter: true },
          { name: 'Flat 701 (Patel Family)', timestamp: '40 mins ago', verifiedVoter: true },
          { name: 'Flat 1104 (Khan Family)', timestamp: '3 hours ago', verifiedVoter: true }
        ]
      },
      {
        id: 'pledge-civic-03',
        type: 'CIVIC_INTERVENTION',
        title: 'Encroached Footpath & Blocked Drain at 90-Feet Road',
        targetCount: 100,
        currentCount: 142,
        status: 'ACTION_TRIGGERED',
        description: 'Commercial debris dumping blocking pedestrian walking lane for 6 weeks. 142 ward voters signed the statutory CPGRAMS/BMC resolution.',
        impactSummary: 'Corporator office notified with 142 voting signatures; Assistant Municipal Commissioner scheduled inspection.',
        nextAction: 'Citizen Delegation Showing Up at Ward Office',
        nextActionDate: 'Tuesday, 10:30 AM at L-Ward BMC Office',
        participants: [
          { name: 'Rohan Verma', timestamp: '5 mins ago', verifiedVoter: true },
          { name: 'Dr. S. Kulkarni', timestamp: '1 hour ago', verifiedVoter: true },
          { name: 'Sunita Ben', timestamp: '2 hours ago', verifiedVoter: true }
        ]
      }
    ]
  },
  {
    id: 'ward-blr-84',
    wardNumber: 'Ward 84 (Indiranagar - HAL 2nd Stage)',
    wardName: 'Indiranagar 100ft Corridor',
    city: 'Bengaluru (BBMP)',
    corporatorName: 'M. Jayanthi Reddy',
    party: 'INC',
    winningMarginVotes: 328,
    activeVoterBlocCount: 290,
    blocImpactPercent: 88.4,
    activePledges: [
      {
        id: 'pledge-transit-02',
        type: 'TRANSIT_POOL',
        title: 'BMTC Feeder EV-Bus from 12th Main to Baiyappanahalli Metro',
        targetCount: 250,
        currentCount: 268,
        status: 'QUORUM_REACHED',
        description: 'Coordinated last-mile pool of 268 tech park workers pledging daily BMTC feeder booking over high-surge private cabs.',
        impactSummary: 'BMTC Route MF-84 scheduled to run every 8 mins during morning peak.',
        nextAction: 'Deployment Live on ONDC Mobility Rails',
        nextActionDate: 'Active Now',
        participants: [
          { name: 'Gautam Rao', timestamp: '8 mins ago', verifiedVoter: true },
          { name: 'Sneha Mohan', timestamp: '30 mins ago', verifiedVoter: true }
        ]
      }
    ]
  }
];
