/**
 * Merchant AI Growth Engine
 * Powers:
 * 1. Upsell & Cross-sell Agent (AOV Maximizer)
 * 2. Autonomous Campaign Orchestrator (Anti-Surge, Dead-Stock Liquidation, Abandonment Recovery)
 */

export interface UpsellRecommendation {
  recommendedSkuId: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  merchantMarginPct: number;
  estimatedAovLiftINR: number;
  buyerSavingsINR: number;
  affinityReason: string;
  bundleTag: string;
}

export interface MerchantCampaign {
  id: string;
  type: 'ANTI_SURGE_COUNTER' | 'DEAD_STOCK_LIQUIDATION' | 'CART_RECOVERY_PUSH';
  title: string;
  status: 'ACTIVE' | 'DRAFT' | 'EXECUTED';
  triggerCondition: string;
  targetAudienceCount: number;
  discountOfferedPct: number;
  projectedGmvLiftINR: number;
  actualOrdersGenerated: number;
  actualRevenueEarnedINR: number;
  channel: 'WHATSAPP_COMMERCE' | 'ONDC_NETWORK_PUSH' | 'UAP_AGENT_BROADCAST';
  messageTemplate: string;
}

/**
 * Computes AI-driven upsell recommendations based on current cart
 */
export function computeUpsellRecommendations(cartSkuIds: string[]): UpsellRecommendation[] {
  const recommendations: UpsellRecommendation[] = [];

  // Atta in cart -> suggest Mustard Oil & Tata Salt
  if (cartSkuIds.some(id => id.includes('001') || id.toLowerCase().includes('atta'))) {
    recommendations.push({
      recommendedSkuId: 'prod-002',
      name: 'Fortune Kachi Ghani Mustard Oil (1L Pouch)',
      category: 'Groceries',
      price: 142,
      discountedPrice: 132,
      merchantMarginPct: 18.5,
      estimatedAovLiftINR: 132,
      buyerSavingsINR: 36, // vs Quick commerce ₹168
      affinityReason: '82% of citizens purchasing 5kg Atta purchase 1L Cooking Oil within 48 hours.',
      bundleTag: 'Ration Staple Bundle'
    });

    recommendations.push({
      recommendedSkuId: 'prod-005',
      name: 'Tata Salt Vacuum Evaporated Iodized (1kg)',
      category: 'Groceries',
      price: 24,
      discountedPrice: 20,
      merchantMarginPct: 22.0,
      estimatedAovLiftINR: 20,
      buyerSavingsINR: 8,
      affinityReason: 'Zero-friction basket top-up item with 94% consumer acceptance.',
      bundleTag: 'Daily Essentials Add-on'
    });
  }

  // Hardware / Mixer in cart -> suggest Havells LED or Extension Cord
  if (cartSkuIds.some(id => id.includes('004') || id.toLowerCase().includes('blade') || id.toLowerCase().includes('mixer'))) {
    recommendations.push({
      recommendedSkuId: 'prod-007',
      name: 'Havells 9W LED Cool Day Light Bulb (Pack of 2)',
      category: 'Household',
      price: 165,
      discountedPrice: 145,
      merchantMarginPct: 34.0,
      estimatedAovLiftINR: 145,
      buyerSavingsINR: 65, // vs MRP ₹220
      affinityReason: 'High-margin electrical maintenance companion with 34% merchant margin.',
      bundleTag: 'Home Utility Bundle'
    });
  }

  // Default snack complement if cart is light
  if (recommendations.length === 0) {
    recommendations.push({
      recommendedSkuId: 'prod-009',
      name: 'Maggi 2-Minute Masala Noodles (Pack of 4)',
      category: 'Snacks',
      price: 52,
      discountedPrice: 48,
      merchantMarginPct: 15.0,
      estimatedAovLiftINR: 48,
      buyerSavingsINR: 12,
      affinityReason: 'High-velocity instant consumer impulse add-on.',
      bundleTag: 'Quick Meal Top-Up'
    });
  }

  return recommendations;
}

export const SAMPLE_MERCHANT_CAMPAIGNS: MerchantCampaign[] = [
  {
    id: 'camp_anti_surge_901',
    type: 'ANTI_SURGE_COUNTER',
    title: 'Ghatkopar Monsoon Anti-Surge Counter-Attack',
    status: 'ACTIVE',
    triggerCondition: 'Blinkit & Zepto dark stores active surge: ₹65 delivery + ₹15 platform fee',
    targetAudienceCount: 420,
    discountOfferedPct: 5,
    projectedGmvLiftINR: 24500,
    actualOrdersGenerated: 34,
    actualRevenueEarnedINR: 18420,
    channel: 'WHATSAPP_COMMERCE',
    messageTemplate: '🌧️ Heavy Rain in Ghatkopar? Dark stores charging ₹65 surge fee! Gupta Super Bazaar has fresh Atta, Oil & Milk delivered in 25 mins with ZERO surge fee. Tap to order with 1-click UPI: https://kubra.in/c/monsoon'
  },
  {
    id: 'camp_dead_stock_902',
    type: 'DEAD_STOCK_LIQUIDATION',
    title: 'Havells 9W LED Excess Inventory Flash Liquidation',
    status: 'ACTIVE',
    triggerCondition: '12 units aging past 30-day velocity benchmark in Pooja Electricals',
    targetAudienceCount: 180,
    discountOfferedPct: 15,
    projectedGmvLiftINR: 4200,
    actualOrdersGenerated: 9,
    actualRevenueEarnedINR: 3150,
    channel: 'UAP_AGENT_BROADCAST',
    messageTemplate: '⚡ Flash Clearance: 15% off Havells 9W LED 2-pack for all autonomous AI buyer agents searching in 1.5km radius. Valid until 9 PM.'
  },
  {
    id: 'camp_recovery_903',
    type: 'CART_RECOVERY_PUSH',
    title: 'Abandoned Atta & Oil Basket Auto-Nudge',
    status: 'ACTIVE',
    triggerCondition: 'Citizen initiated cart > 45 mins ago without payment capture',
    targetAudienceCount: 65,
    discountOfferedPct: 4,
    projectedGmvLiftINR: 8900,
    actualOrdersGenerated: 18,
    actualRevenueEarnedINR: 7850,
    channel: 'WHATSAPP_COMMERCE',
    messageTemplate: 'Namaste! We saved your 5kg Atta and Mustard Oil order at Gupta Super Bazaar. Complete order now for free delivery + ₹20 instant coupon.'
  }
];
