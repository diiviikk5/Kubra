import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS, SAMPLE_STORES } from '@/lib/mock-data';

export const dynamic = 'force-static';

export async function GET() {
  const machineCatalog = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kubra Agent-Readable ONDC Catalog',
    description: 'Autonomous agent-queryable merchant catalog compliant with NPCI UAP and AP2/1.1 protocols.',
    protocolVersion: 'UAP/1.0.0-rc2',
    network: 'DPIIT_ONDC_BHARAT',
    merchant: {
      '@type': 'LocalBusiness',
      name: SAMPLE_STORES[0].storeName,
      identifier: SAMPLE_STORES[0].storeId,
      location: SAMPLE_STORES[0].location,
      paymentAccepted: ['UPI', 'RAZORPAY_AUTOPAY', 'AP2_MANDATE', 'x402_RAZORPAY'],
      priceRange: '₹20 - ₹500',
      currenciesAccepted: 'INR'
    },
    negotiationRules: {
      bulkDiscountThresholdUnits: 5,
      maxAllowedDiscountPct: 8.5,
      autonomousCheckoutMaxINR: 2000,
      settlementGuarantee: 'T+0_NPCI_ESCROW'
    },
    numberOfItems: INITIAL_PRODUCTS.length,
    itemListElement: INITIAL_PRODUCTS.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        sku: prod.id,
        gtin: prod.barcode,
        name: prod.name,
        category: prod.category,
        brand: {
          '@type': 'Brand',
          name: prod.brand
        },
        offers: {
          '@type': 'Offer',
          price: prod.ondcPrice,
          priceCurrency: 'INR',
          priceValidUntil: '2026-12-31',
          availability: prod.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: prod.storeName,
            distance: prod.storeDistance
          },
          priceComparison: {
            ondcPriceINR: prod.ondcPrice,
            mrpINR: prod.mrp,
            quickCommerceDarkStorePriceINR: prod.quickCommercePrice,
            amazonPriceINR: prod.amazonPrice,
            netSavingsINR: prod.quickCommercePrice - prod.ondcPrice
          }
        },
        agentParameters: {
          shelfStabilityDays: prod.category === 'Dairy' ? 3 : 180,
          requiresRefrigeration: prod.category === 'Dairy',
          maxOrderQuantityPerAgent: 10
        }
      }
    }))
  };

  return NextResponse.json(machineCatalog, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/ld+json',
      'X-UAP-Protocol': '1.0.0-rc2',
      'X-Agent-Compatibility': 'ACP-0.9, AP2-1.1, x402-1.0'
    }
  });
}
