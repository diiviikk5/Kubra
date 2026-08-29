export function generateBecknSearchPayload(intentText: string, category: string, city: string = 'std:022') {
  return {
    context: {
      domain: category === 'TRANSIT' ? 'nic2004:60221' : 'nic2004:52110',
      country: 'IND',
      city: city,
      action: 'search',
      core_version: '1.0.0',
      bap_id: 'buyer-app.ondc-bharatos.in',
      bap_uri: 'https://buyer-app.ondc-bharatos.in/protocol/v1',
      transaction_id: `txn_${Math.random().toString(36).substring(2, 11)}`,
      message_id: `msg_${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toISOString(),
      ttl: 'PT30S'
    },
    message: {
      intent: {
        item: {
          descriptor: {
            name: intentText
          }
        },
        fulfillment: {
          type: category === 'TRANSIT' ? 'RIDE' : 'Delivery',
          tracking: true
        }
      }
    }
  };
}

export function generateBecknConfirmPayload(orderId: string, items: any[], totalAmount: number, providerId: string) {
  return {
    context: {
      domain: 'nic2004:52110',
      country: 'IND',
      city: 'std:022',
      action: 'confirm',
      core_version: '1.0.0',
      bap_id: 'buyer-app.ondc-bharatos.in',
      bap_uri: 'https://buyer-app.ondc-bharatos.in/protocol/v1',
      bpp_id: providerId,
      bpp_uri: `https://${providerId}/protocol/v1`,
      transaction_id: `txn_${Math.random().toString(36).substring(2, 11)}`,
      message_id: `msg_${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toISOString()
    },
    message: {
      order: {
        id: orderId,
        state: 'Created',
        provider: {
          id: providerId
        },
        items: items.map(item => ({
          id: item.id,
          quantity: { count: item.quantity || 1 },
          price: { currency: 'INR', value: String(item.ondcPrice || item.price) }
        })),
        payment: {
          uri: 'https://upi.npci.org.in/pay',
          type: 'ON-ORDER',
          status: 'PAID',
          params: {
            amount: String(totalAmount),
            currency: 'INR',
            transaction_id: `UPI_${Date.now()}`
          }
        }
      }
    }
  };
}

export function generateBecknIGMPayload(orderId: string, issueType: string, evidenceUrl: string, fault: string, confidence: number) {
  return {
    context: {
      domain: 'nic2004:52110',
      country: 'IND',
      city: 'std:022',
      action: 'issue',
      core_version: '1.0.0',
      bap_id: 'buyer-app.ondc-bharatos.in',
      bap_uri: 'https://buyer-app.ondc-bharatos.in/protocol/v1',
      transaction_id: `igm_txn_${Date.now()}`,
      message_id: `igm_msg_${Date.now()}`,
      timestamp: new Date().toISOString()
    },
    message: {
      issue: {
        id: `ISSUE-${Date.now().toString().slice(-6)}`,
        category: 'ITEM_DAMAGE',
        sub_category: issueType,
        complainant_info: {
          person: { name: 'Rohan Verma' },
          contact: { phone: '+91-9876543210', email: 'rohan.v@citizen.in' }
        },
        order_details: {
          id: orderId,
          state: 'Delivered'
        },
        description: {
          short_desc: 'Item damaged during courier transit',
          long_desc: 'AI Vision evidence confirms packaging breach with weight delta and high G-force transit shock.',
          images: [evidenceUrl]
        },
        ai_forensic_resolution: {
          engine: 'OpenAI GPT-4o Vision + Beckn IGM Engine',
          attribution: fault,
          confidence_score: `${confidence}%`,
          remedy: 'INSTANT_UPI_REFUND',
          escrow_action: 'REVERSE_ESCROW_TO_BUYER_VPA'
        }
      }
    }
  };
}
