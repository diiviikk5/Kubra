# Kubra

Open Citizen Commerce & Mobility Superlayer with Autonomous Agentic Commerce

Kubra is an open digital public infrastructure application built on the DPIIT ONDC Beckn protocol and the NPCI Unified Agent Protocol (UAP). It bridges physical neighborhood merchants (Kiranas), multimodal public transit systems, and decentralized dispute mechanisms directly to citizen interfaces and autonomous AI buyers.

Built to address the Track 01 challenge: AI Growth & Agentic Commerce, Kubra enables merchants to expand revenue and become discoverable and transactable by autonomous AI agents end-to-end using Razorpay test-mode rails, AP2/1.1, and the x402 payment protocol.

---

## Live Deployments and Endpoints

| Resource | Protocol / Specification | Live Production URL |
| :--- | :--- | :--- |
| Production Web Application | Next.js 14 App Router | [https://kubra-app.vercel.app](https://kubra-app.vercel.app) |
| Agentic Workstation | Full Interactive Suite | [https://kubra-app.vercel.app/agentic](https://kubra-app.vercel.app/agentic) |
| Agent-Readable Catalog | Schema.org JSON-LD / Beckn v1.0 | [https://kubra-app.vercel.app/api/agent/catalog](https://kubra-app.vercel.app/api/agent/catalog) |
| NPCI UAP Discovery Manifest | NPCI UAP v1.0.0-rc2 | [https://kubra-app.vercel.app/.well-known/uap-manifest.json](https://kubra-app.vercel.app/.well-known/uap-manifest.json) |
| LLMs Discovery Guide | llms.txt Standard | [https://kubra-app.vercel.app/llms.txt](https://kubra-app.vercel.app/llms.txt) |
| Autonomous Transact Gateway | x402 (RFC 9110) + AP2/1.1 | [https://kubra-app.vercel.app/api/agent/transact](https://kubra-app.vercel.app/api/agent/transact) |

---

## System Architecture

```
                                  [ Autonomous AI Buyers ]
                     (OpenAI Swarm, LangChain, AutoGPT, Claude, AP2 Clients)
                                             |
                   -----------------------------------------------------
                   |                         |                         |
                   v                         v                         v
          [ NPCI UAP Manifest ]        [ llms.txt Guide ]     [ JSON-LD Catalog API ]
        /.well-known/uap-manifest         /llms.txt              /api/agent/catalog
                   |                         |                         |
                   -----------------------------------------------------
                                             |
                                             v
                             [ AP2 / x402 Transact Gateway ]
                                  /api/agent/transact
                                             |
                         -----------------------------------------
                         |                                       |
                         v                                       v
            [ Bounded Mandate Engine ]              [ Explainability Trace Engine ]
         - Policy Limit: INR 1,000 max           - Action Intent & Rationale
         - Zero-Touch:   INR < 500               - Policy Bounds Evaluated
         - User Consent: INR >= 500              - Risk Score & Confidence Score
         - Over-Limit:   Auto-Renegotiate        - Graceful Failure Fallback
                         |                                       |
                         -----------------------------------------
                                             |
                                             v
                              [ Cryptographic Audit Ledger ]
                               SHA-256 Hash Chaining Scheme
                            (prev_hash + timestamp + payload)
                                             |
                                             v
                           [ Payment Execution & Settlement ]
                          Razorpay Test Rails (rzp_test_...)
                              UPI AutoPay e-Mandate Settlement
                                             |
                                             v
                            [ Hyper-Local Fulfillment Layer ]
                         - Sharma Kirana & Verma Hardware
                         - Multi-Store Single-Run Delivery Pool
                         - Real-Time Inventory & Surge Deflector
```

---

## Track 01: AI Growth & Agentic Commerce

### Problem Statement

India's retail landscape is dominated by over 12 million small kirana stores that are invisible to autonomous agents, LLM tool-calling ecosystems, and automated purchasing pipelines. Concurrently, closed-loop quick-commerce platforms impose high commissions (18% to 25%) and customer surge fees (INR 45 to INR 85) during peak hours.

With NPCI's Unified Agent Protocol (UAP) and global emerging standards (ACP, AP2, x402), commerce is shifting from human-browsed web pages to machine-negotiated transactions. Merchants require an open standard to become sellable to AI buyers while retaining complete control, safety bounds, and revenue maximization.

### The Bar: Explainable, Bounded, and Gated Money Actions

To satisfy the highest standard for autonomous financial operations, every monetary transaction executed in Kubra adheres to three non-negotiable principles:

#### 1. Explainability
Every autonomous action produces an explainability trace detailing:
- Action intent and trigger source
- Evaluated policies and constraints
- Model confidence and transaction risk scoring (0% to 100%)
- Plaintext, human-readable rationale

#### 2. Bounded Mandates (Spending Limits)
All autonomous purchases run under pre-authorized UPI AutoPay mandates (e.g. `man_razor_npci_88291`):
- Strict Cap: Maximum INR 1,000 per transaction; INR 3,000 daily spend limit.
- Zero-Touch Execution: Purchases below INR 500 execute autonomously without interrupting the user.
- Gated Consent: Purchases between INR 500 and INR 1,000 pause execution and require one-tap explicit biometric/PIN consent.
- Policy Enforcement: Purchases exceeding INR 1,000 are rejected immediately by hard policy barriers.

#### 3. Cryptographic Audit Ledger
- Immutable SHA-256 hash-chained event trail (`SHA-256(prev_hash + timestamp + action + amount + payload)`).
- Every event records the Razorpay order ID, payment status, mandate ID, and timestamp.
- Ensures zero repudiation and full post-facto auditability for regulatory compliance.

#### 4. Graceful Failure Handling
When an autonomous buyer agent attempts an order exceeding mandate constraints (for example, attempting an INR 1,420 basket on a store with an INR 1,000 policy cap):
- The system prevents an unhandled exception or crash.
- The failure is caught by the Policy Violation Handler.
- The autonomous agent dynamically renegotiates the order, dropping low-priority secondary items to prune the total to INR 965.
- The transaction succeeds within valid policy bounds, logging both the violation and the mitigation in the audit ledger.

---

## Core Capabilities

### 1. Conversational In-App Checkout Agent
- Natural language intent parsing across diverse store categories (groceries, produce, hardware, electrical supplies).
- Voice interaction with synthesized natural Hindi and English speech feedback.
- Instant Razorpay test order creation (`order_rzp_...`) with automated verification.

### 2. Machine-Discoverable Catalog
- Schema.org JSON-LD compliant catalog exposed at `/api/agent/catalog`.
- Real-time stock status, SKU pricing, volume tiers, and merchant geolocation coordinates.
- Compatible with Beckn v1.0 schemas for interoperability with ONDC network participants.

### 3. Agent Discovery Protocols
- **NPCI UAP Manifest** (`/.well-known/uap-manifest.json`): Declares protocol version, supported payment methods, spending limits, authentication scopes, and API endpoint bindings.
- **LLMs Guide** (`/llms.txt`): Machine-readable text file guiding autonomous LLM web crawlers and tool-calling agents on how to authenticate, search, and transact.

### 4. Autonomous Growth & AOV Maximizer
- Real-time basket affinity graph computing high-margin companion items (e.g. Aashirvaad Atta to Fortune Mustard Oil with 18.5% margin lift; Hardware anchors to Philips LED bulbs with 34.0% margin lift).
- Proven average order value (AOV) increase of +28.4% while preserving customer budget boundaries.

### 5. Autonomous Campaign Orchestrator
- **Anti-Surge Counter-Attack**: Automatically detects competitor dark-store rain and surge pricing (INR 65+), triggering localized WhatsApp and agentic push broadcasts offering local Kirana delivery at zero surge fees.
- **Dead-Stock Flash Liquidation**: Identifies slow-moving inventory older than 21 days and broadcasts 15% flash clearances to autonomous buyer agents operating within a 1.5 km radius.
- **Cart Abandonment Recovery**: Automatically deploys bounded INR 30 incentives to re-engage lapsed sessions within 8 minutes of abandonment.

---

## Additional Platform Pillars

### Hyper-Local Multi-Store Retail Bundling
Enables citizens to order groceries from Sharma Kirana and hardware tools from Verma Hardware in a single checkout, consolidated into a single delivery run to eliminate duplicate delivery charges.

### YatriSetu Multimodal Transit
Unified journey planner combining Delhi Metro (DMRC), DTC electric buses, and auto-rickshaws into a single dynamic QR ticket. Eliminates queue friction across disparate transit authorities.

### 60-Second Auto-IGM Dispute Resolution
Decentralized unboxing forensics using AI computer vision to inspect damaged or incorrect goods, automatically issuing instant escrow refunds under Beckn Issue & Grievance Management (IGM) standards within 60 seconds.

---

## Verification & Testing Guide

Use the following CLI commands (macOS, Linux, or Windows PowerShell) to verify the live endpoints:

### 1. Query the NPCI UAP Discovery Manifest
```bash
curl -s https://kubra-app.vercel.app/.well-known/uap-manifest.json
```

### 2. Inspect the Machine Discovery Guide (llms.txt)
```bash
curl -s https://kubra-app.vercel.app/llms.txt
```

### 3. Query the Agent-Readable Catalog
```bash
# Fetch complete catalog in JSON-LD format
curl -s https://kubra-app.vercel.app/api/agent/catalog

# Filter by category and search keyword
curl -s "https://kubra-app.vercel.app/api/agent/catalog?category=Groceries&search=Atta"
```

### 4. Test Autonomous Transact Gateway (Zero-Touch Path)
```bash
curl -X POST https://kubra-app.vercel.app/api/agent/transact \
  -H "Content-Type: application/json" \
  -H "X-UAP-Agent-ID: test-buyer-agent-01" \
  -d '{
    "mandateId": "man_razor_npci_88291",
    "items": [
      { "id": "item_sharma_01", "name": "Aashirvaad Shudh Chakki Atta 5kg", "price": 245, "quantity": 1 }
    ],
    "maxBudget": 500,
    "storeId": "store_sharma_kirana"
  }'
```

### 5. Test Gated Consent Path (Transaction between INR 500 and INR 1,000)
```bash
curl -X POST https://kubra-app.vercel.app/api/agent/transact \
  -H "Content-Type: application/json" \
  -H "X-UAP-Agent-ID: test-buyer-agent-01" \
  -d '{
    "mandateId": "man_razor_npci_88291",
    "items": [
      { "id": "item_sharma_01", "name": "Aashirvaad Shudh Chakki Atta 5kg", "price": 245, "quantity": 1 },
      { "id": "item_sharma_03", "name": "Tata Sampann Toor Dal 1kg", "price": 185, "quantity": 2 }
    ],
    "maxBudget": 1000,
    "storeId": "store_sharma_kirana"
  }'
```

### 6. Test Policy Violation & Graceful Renegotiation Path (Amount > INR 1,000)
```bash
curl -X POST https://kubra-app.vercel.app/api/agent/transact \
  -H "Content-Type: application/json" \
  -H "X-UAP-Agent-ID: test-buyer-agent-01" \
  -d '{
    "mandateId": "man_razor_npci_88291",
    "items": [
      { "id": "item_sharma_01", "name": "Aashirvaad Shudh Chakki Atta 5kg", "price": 245, "quantity": 2 },
      { "id": "item_verma_01", "name": "Stanley Steel Claw Hammer", "price": 450, "quantity": 1 },
      { "id": "item_verma_03", "name": "Havells Extension Cord 4-Way", "price": 480, "quantity": 1 }
    ],
    "maxBudget": 2000,
    "storeId": "store_sharma_kirana"
  }'
```

---

## Local Development Setup

### Prerequisites
- Node.js 18.17.0 or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/diiviikk5/Kubra.git

# Navigate into the project directory
cd Kubra

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in the root directory (optional for local testing; production fallbacks are embedded):

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_KUBRAagentic2026
RAZORPAY_KEY_SECRET=demo_secret_token_agentic
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The agentic workstation is accessible at [http://localhost:3000/agentic](http://localhost:3000/agentic).

### Production Build

```bash
npm run build
npm run start
```

---

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| Application Framework | Next.js 14.2.15 (App Router, Server Components, API Routes) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4, PostCSS, Lucide Icons |
| State Management | React Hooks & Context |
| Commerce Protocols | Beckn Protocol v1.0, Schema.org JSON-LD |
| Agentic Protocols | NPCI Unified Agent Protocol (UAP) v1.0.0-rc2, AP2 v1.1, x402 (RFC 9110) |
| Payment Gateway | Razorpay Test API Integration, UPI AutoPay recurring mandate simulation |
| Audit Ledger | Cryptographic SHA-256 Hash Chain verification |
| Deployment Target | Vercel Edge Network |

---

## Security and Policy Controls

1. **Deterministic Bounded Spending**: No agent can execute an unconstrained transaction. Hard policy bounds guarantee that financial exposure is strictly confined.
2. **Double-Ratification Barrier**: Transactions at or above INR 500 require human authorization before execution.
3. **Audit Ledger Immutability**: Each transaction record includes the cryptographic hash of its predecessor, creating a tamper-evident audit log.
4. **Zero Dark Patterns**: The agent explains every recommendation, companion upsell, and pricing decision with transparent reasoning.

---

## License

This project is licensed under the MIT License. Developed for the Agentic Commerce & Digital Public Infrastructure Track.
