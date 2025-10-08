# STELLAR

**Satellite Trusted Evaluation & Lending Ledger Architecture Record**

> **Vision:** Build the foundational trust layer for agricultural finance so every farmer’s labor becomes a bankable asset — starting in Punjab, scaling global.

---

## 🚜 One-line summary

STELLAR turns farms into verifiable, on-chain creditable assets by combining satellite AI analytics, a human DePIN verifier network, and a cryptographic timestamp from Creditcoin’s CTC-0 oracle — unlocking cheaper, faster loans for smallholder farmers.

---

## Why this matters (The Problem)

Small farmers lack timely, fair access to working capital. Banks are slow and documentation-heavy; moneylenders charge crippling rates. The root cause: **productive land and predictable harvests are invisible to lenders**. STELLAR makes farm productivity visible, verifiable, and bankable.

---

## High-level solution

A layered trust stack:

1. **Layer 1 — Core Engine (Automated Data Analysis)**

   * Historical NDVI and satellite time-series (Sentinel-2, Landsat) to build a 5+ year productivity baseline.
   * Real-time overlay of weather and local mandi price oracles to compute a live farm health & value score.

2. **Layer 2 — Trust Layer (DePIN Verifier Network)**

   * Local verifiers (students, retired farmers, co-op members) form *Trust Circles* (3–5 members) and stake CTC.
   * Reports are geotagged, photo-backed, and cross-checked by the Circle; slashing disincentivizes fraud.

3. **Layer 3 — Security Stamp (CTC-0)**

   * Verifier reports optionally get timestamped and geolocated by the CTC-0 satellite oracle for an immutable, on-chain proof.

---

## Core components & repo layout

```
/ (root)
├─ contracts/
│  ├─ StellarFarmNFT.sol
│  ├─ StellarVerifierRegistry.sol
│  └─ StellarLendingPool.sol
├─ backend/
│  ├─ data-processor/      # satellite + NDVI pipeline
│  ├─ oracle-integrator/   # weather, price, and CTC-0 mock
│  └─ credal-api/          # Creditcoin Credal API adapter
├─ frontend/
│  ├─ apps/                # farmer, verifier, lender dashboards (Next.js + Tailwind)
│  └─ components/
├─ infra/                  # docker-compose, terraform templates (optional)
├─ docs/                   # architecture diagrams, hackathon pitch assets
└─ README.md
```

---

## Tech stack

* **Smart contracts:** Solidity, OpenZeppelin (Creditcoin testnet)
* **Backend:** Node.js (Express) + Python for satellite processing
* **Frontend:** Next.js, React, Ethers.js, Tailwind CSS (mobile-first)
* **Data sources:** Sentinel-2, Landsat (via Sentinel Hub), weather & mandi price oracles
* **Identity & ledger:** Creditcoin (Credal API) + CTC token economics
* **Storage:** IPFS for images and metadata hashes

---

## Contracts (quick summary)

* **StellarFarmNFT.sol** — ERC-721 where each token = verified farm. Metadata stores farm geometry, NDVI summary hash, verification history.
* **StellarVerifierRegistry.sol** — manages trust circles, staking, reputation, job assignments, and slashing logic.
* **StellarLendingPool.sol** — USDC pool that issues loans, manages collateralized farm NFTs, interest accounting, and repayments.

> *Note:* Include unit tests, access control (roles), and upgradeability strategy (Proxy pattern) for production-readiness.

---

## Sample workflows

### Farmer onboarding

1. Farmer registers (phone number) and draws their farm polygon in the app.
2. Layer 1 runs: pulls 5y satellite history, computes NDVI baseline and initial score.
3. A verifier job is posted; a Trust Circle verifies and submits a report.
4. Upon verification, mint `StellarFarmNFT` and record metadata hash on-chain. Farmer gets a credit line.

### Verifier flow

1. Verifier forms a Trust Circle and stakes CTC into `StellarVerifierRegistry`.
2. Receives job, travels to farm, collects geotagged photos and submits the report.
3. Report is optionally timestamped by the CTC-0 oracle (or simulated during demo).
4. On success, the circle is rewarded in CTC; on fraud, the stake is slashed.

---

## Quick setup (dev/demo)

> These commands assume a UNIX-like environment and `node`, `npm`, `python`, and `hardhat` installed.

1. Clone the repo

```bash
git clone https://github.com/<ORG>/stellar.git
cd stellar
```

2. Install dependencies

```bash
cd contracts && npm install
cd ../backend && npm install
cd ../frontend && npm install
```

3. Start local blockchain for testing

```bash
cd contracts
npx hardhat node
# deploy contracts to local network
npx hardhat run --network localhost scripts/deploy.js
```

4. Run mock NDVI pipeline (example)

```bash
cd backend/data-processor
python run_demo_pipeline.py --farm-geojson demos/farm1.geojson
```

5. Start frontend

```bash
cd frontend
npm run dev
```

---

## Demo strategy (5-week hackathon)

**Weeks 1–2:** Foundation — deploy NFT + lending pool contracts, basic frontend farmer flow, single hard-coded farm demo with satellite score.

**Week 3:** Trust Layer — VerifierRegistry contract, staking/trust circle logic, verifier submission endpoints and verifier dashboard.

**Week 4:** Moonshot — Integrate CTC-0 oracle if available; otherwise simulate signed timestamp to show end-to-end proof.

**Week 5:** Polish — UI/UX, test data, deploy to testnet, record demo video, finalize pitch.

---

## 3-minute pitch (copy-ready)

> Use this verbatim on-stage or in the video demo.

> "This is Baljeet, a farmer in Punjab. He's one of 500 million smallholders who feed the world, yet he can't get a fair loan. His bank says he has no credit history. We say his credit history is written in the Earth itself. STELLAR reads it. With satellite time-series and NDVI we know his productivity. With local Verifiers in Trust Circles we know the data is honest. And with Creditcoin's CTC-0 oracle we get an immutable stamp from space. Now Baljeet’s farm becomes a verified, mintable NFT that lenders accept — unlocking instant credit lines and a permanent on-chain credit history. STELLAR isn’t just an app; it’s the trust protocol for real-world assets."

---

## Tokenomics (brief)

* **Demand:** CTC staking for verifiers, transaction gas, optional interest payments in CTC.
* **Supply sink:** Staking locks tokens, fees burned or locked as protocol revenue.
* **Rewards:** Verifier payouts in CTC; early adopter / community incentives.

---

## Risks & mitigations (short)

* **CTC-0 availability:** Simulate for demo; phase 3 integration for production.
* **Recruiting verifiers:** Partner with local universities and co-ops.
* **Scalability:** Batch NDVI processing, caching tiles, and region-based job scheduling.

---

## Roadmap

* Phase 0 — Demo-ready (weeks 1–2)
* Phase 1 — Verifier network & staking (week 3)
* Phase 2 — Oracle integration & testnet deployment (week 4)
* Phase 3 — Pilot in Punjab with partner banks & co-ops (Q3)

---

## How to contribute

1. Fork the repo
2. Create a branch `feature/<name>`
3. Open a PR with tests & README updates

Please follow the Code of Conduct in `/docs/CODE_OF_CONDUCT.md`.

---

## License

MIT — see `LICENSE` for details.

---

## Contact

Lead: Nikhil — `@nikhil` (add preferred email/handle)
Team: Hi-Influence / TransparencyX contributors

---

*Want me to also generate:*

* Solidity skeletons for the three contracts
* Hardhat deploy & test scripts
* A Next.js starter with the Farmer and Verifier dashboards

Tell me which one and I’ll add code files next.
