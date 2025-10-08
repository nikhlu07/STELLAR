# STELLAR - Satellite-Powered Agricultural Finance

A multi-page web application that turns farms into bankable assets through satellite verification, Trust Circle validation, and AI-powered crop marketplace.

## 🎨 Design System

### Color Palette
- **Primary (Electric Violet)**: `#5C27FE` - The pulse of cosmic intelligence
- **Background**: Pure white `#FFFFFF` for maximum clarity
- **Success**: `#10B981` for verification states
- **Warning**: `#F59E0B` for pending actions
- **Error**: `#EF4444` for failed states

### Typography
- **Headings**: Orbitron (500, 700, 900) - Futuristic command center aesthetic
- **Body & UI**: Space Mono (400, 700) - Monospaced for data-rich readability

### Visual Effects
- Violet glow effects on hover states
- Glass morphism on overlay cards
- Smooth transitions and micro-animations
- Orbital satellite animations

## 📱 Application Structure

### Pages

1. **Landing Page** (`/`)
   - Hero with animated satellite orbit
   - Three layers of trust showcase
   - Stats dashboard
   - Multi-role CTAs

2. **Farmer Dashboard** (`/farmer`)
   - Intelligence score gauge
   - Credit line status
   - Interactive satellite map with farm polygon
   - Marketplace listings
   - Quick actions

3. **Verifier Operations** (`/verifier`)
   - Available verification jobs
   - Trust Circle network visualization
   - Reputation and earnings tracker
   - Job acceptance interface

4. **Lender Intelligence** (`/lender`)
   - Portfolio overview stats
   - Farm NFT marketplace
   - Risk assessment metrics
   - Capital deployment interface

5. **Farm Profile** (`/farm/:id`)
   - NFT card display with 3D effects
   - 5-year NDVI satellite timeline
   - Verification history with CTC-0 timestamps
   - Loan repayment tracking

6. **Crop Marketplace** (`/marketplace`)
   - Satellite-verified crop listings
   - AI-calculated pricing
   - Quality scores and yield predictions
   - Filter and sort capabilities

7. **Sell Crop** (`/farmer/sell-crop`)
   - Farm selection
   - AI pricing engine
   - Real-time NDVI integration
   - Listing creation with confetti celebration

## 🎯 Key Features

### Satellite Intelligence
- Real-time NDVI tracking
- 5-year historical data visualization
- Crop health predictions
- Yield estimation algorithms

### Trust Circles
- Local verifier networks
- Stake-based reputation system
- Geo-tagged verification photos
- CTC-0 cryptographic timestamping

### Marketplace
- Satellite-verified quality badges
- AI-powered fair pricing
- NDVI-based yield predictions
- Market oracle integration

### Loan System
- Intelligence score-based credit lines
- Real-time repayment tracking
- Optimistic UI updates
- Capital deployment interface

## 🛠️ Technical Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: Leaflet
- **Forms**: React Hook Form with Zod validation
- **State**: TanStack Query
- **Notifications**: Sonner toasts
- **Celebrations**: Canvas Confetti

## 🎨 Component Library

### Custom Components
- `IntelligenceGauge` - Circular progress indicator
- `SatelliteMap` - Interactive Leaflet map with polygons
- `OrbitAnimation` - Animated satellite orbit visualization
- `NDVIChart` - Area chart for vegetation index
- `Header` - Navigation with role awareness
- `LoadingSpinner` - Satellite-themed loading state

### Design Utilities
- `.violet-glow` - Electric violet shadow effect
- `.glass-card` - Backdrop blur overlay
- `.text-gradient-violet` - Gradient text effect
- `.transition-smooth` - Cubic bezier transitions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎭 Mock Data

The application includes comprehensive mock data:
- 3 demo farms with complete histories
- 4 crop marketplace listings
- Trust Circle network data
- Verification records with cryptographic hashes
- NDVI time series data

## 🔐 Security Features

- Input validation with Zod schemas
- CTC-0 timestamp sealing
- Immutable verification records
- Stake-based reputation system

## 🌟 User Experience

### Farmer Journey
1. Register farm → Draw polygon on map
2. Request verification → Trust Circle visits
3. Receive intelligence score → Unlock credit
4. List crops → AI suggests price
5. Sell harvest → Track revenue

### Verifier Journey
1. Join Trust Circle → Stake reputation
2. Browse jobs → Accept based on location
3. Visit farm → Submit verification
4. Earn payout → Build reputation

### Lender Journey
1. Browse verified farms → Check intelligence scores
2. Review NDVI data → Assess risk
3. Deploy capital → Track repayments
4. Monitor portfolio → Optimize returns

## 💜 Brand Voice

Mission-oriented, human, encouraging. Complex concepts explained simply. 
Every interaction should feel like piloting a spacecraft through agricultural data.

## 📊 Success Metrics

- ₹2.4Cr+ capital deployed
- 847 verified farms
- 1,243 Trust Circle members
- 98.4% repayment rate

---

Built with 💜 by STELLAR - Where satellite intelligence meets human verification
