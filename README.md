# Pulse-Ahmedabad: Tech-Enabled Citizen First Responder & Public AED Network
> **Problem Statement ID:** PS000319 | **Sector:** Healthtech  
> **Organization:** Ahmedabad Municipal Corporation (AMC) — Seva First Innovation Challenge 2026  
> **City Coordinates:** Ahmedabad, Gujarat (`23.0225° N, 72.5714° E`)

---

## 1. Executive Summary & Ground Crisis (PS000319)

When Sudden Cardiac Arrest (SCA) occurs in Ahmedabad, irreversible brain death begins within **4 to 6 minutes**. Survival rates decrease by **10% for every minute** that passes without CPR and defibrillation. However, 108 GVK EMRI ambulances face heavy congestion along arterial routes (e.g., SG Highway, Kalupur, Ashram Road), resulting in average response times of **8 to 15 minutes**.

Even when off-duty doctors, nurses, police, or BLS-trained citizens are within **200m–500m**, no system exists to alert them. Public Automated External Defibrillators (AEDs) installed across BRTS/Metro stations, parks, and malls remain unmapped and locked inside cabinets, while citizens fear legal consequences.

**Pulse-Ahmedabad** bridges this critical 4-minute gap by uniting 108 Emergency CAD dispatch, a verified citizen first responder network, and IoT-enabled smart public AED cabinets.

---

## 2. Core Innovations & Architecture

###  Dual-Vector Geospatial Dispatch Split
- **Vector 1 (Direct-to-Victim CPR):** Automatically routes the nearest verified medical or citizen responder directly to the patient's coordinates to initiate hands-only chest compressions.
- **Vector 2 (AED Runner):** Routes a secondary responder via the closest accessible public AED cabinet, provides a dynamic 4-digit IoT solenoid unlock OTP, and directs them to the victim.
- **Vector 3 (108 CAD Integration):** Tracks the approaching ALS ambulance for seamless clinical paramedic handoff.

###  Haversine Spherical Distance Math
- All distances, ETAs, and assignments are dynamically calculated in real time using the Haversine formula across realistic Ahmedabad coordinates (Law Garden, Sindhu Bhavan Road, Kalupur Railway Station, Sabarmati Riverfront, Kankaria Lake, SG Highway, Maninagar BRTS).

###  Browser-Native 110 BPM Metronome & Multilingual Audio Guide
- **100% Offline-Resilient:** Synthesizes a clinical 110 BPM rhythm and emergency alert sirens via Web Audio API (`AudioContext`). Zero external MP3/WAV dependencies that could 404 or stutter.
- **Multilingual Voice Guidance:** Integrated `window.speechSynthesis` providing clinical CPR step-by-step coaching in **Gujarati (`ગુજરાતી`)**, **Hindi (`हिंदी`)**, and **English**.

###  AI "AED Desert" Analyzer
- Identifies critical high-risk cardiac zones lacking public AED coverage within an 800m radius (e.g., Bapunagar Industrial Cluster, Juhapura Corridor, Naroda GIDC Phase-2) for AMC deployment planning.

###  Zero-Config Cross-Tab & Multi-Screen Sync
- Employs the `BroadcastChannel` API (`pulse_ahmedabad_sync`) with `localStorage` fallback.
- Enables jury demonstrations across dual screens (e.g., Laptop = 108 Command Console, Second Screen/Phone = Citizen Responder Mobile App) with instant real-time synchronization.

###  Real Browser Geolocation
- Features a **"Use My Live GPS Location"** tool that plots the user's real-world coordinates on the map, calculates proximity to Ahmedabad AEDs, and allows triggering simulated cardiac SOS alerts.

### ⚖️ Good Samaritan Legal Protection Shield
- Clear legal notices citing Supreme Court Guidelines and Gujarat Good Samaritan Norms to eliminate bystander hesitation and protect responders from civil or criminal liability.

---

## 3. Technology Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Lucide React icons
- **Audio & Speech:** Native Web Audio API (`AudioContext` oscillator & gain nodes), Web Speech Synthesis API
- **Geospatial Math:** Great-Circle Haversine spherical distance formula
- **Cross-Window Sync:** Browser-native `BroadcastChannel` & Web Storage events
- **Backend (Optional Standalone):** Node.js, Express, Socket.io, MySQL 8.0 Spatial (`ST_Distance_Sphere`)
- **Deployment:** Vercel SPA configuration (`vercel.json`)

---

## 4. Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm / pnpm / yarn

### Installation
```bash
git clone https://github.com/jaydeepjoshi511-rgb/pulse-ahmedabad.git
cd pulse-ahmedabad
npm install
```

### Local Development
```bash
# Start Vite development server
npm run dev

# Expose to local network (for testing on mobile phone and laptop simultaneously)
npm run dev:host
```

### Production Build
```bash
npm run build
npm run preview
```

### Standalone Socket.io Backend (Optional)
```bash
cd server
npm install
npm start
```

---

## 5. Live Demo Views
1. **Split-Screen Live Demo Mode:** Side-by-side synchronized view of AMC 108 Command Center and Citizen Responder App.
2. **108 Tactical Command Center:** Full-screen Ahmedabad dark-mode GIS map with live 500m/1km radar sweep, AED desert heatmap, and Dual-Vector routing.
3. **Citizen First-Responder Mobile App:** Phone simulator with priority alert override, turn-by-turn routing, IoT cabinet OTP unlock, and 110 BPM metronome.
4. **Public AED IoT Registry:** Live battery telemetry, electrode pad expiry tracker, smart lock status, and AI desert coverage recommendations.
5. **Production Backend Code Viewer:** One-click modal exporting production-grade Node.js + MySQL 8.0 Spatial CAD webhook code.

---

## 6. License & Civic Hackathon Info
Developed for the **AMC Seva First Innovation Challenge 2026** (Problem Statement: **PS000319**, Healthtech).  
Built for the citizens of Ahmedabad Municipal Corporation.
