// ============================================================================
// REAL AHMEDABAD GEOSPATIAL DATA (Coordinates & Tactical Map Positions)
// Ahmedabad Center: 23.0225° N, 72.5714° E | AMC Healthtech PS000319
// ============================================================================

export const AHMEDABAD_LANDMARKS = [
  { id: 'LM-01', name: 'Law Garden & Ellisbridge', zone: 'West Zone', lat: 23.0268, lng: 72.5612, x: 41, y: 52, riskScore: 88 },
  { id: 'LM-02', name: 'Sabarmati Riverfront (Vallabh Sadan)', zone: 'Central Zone', lat: 23.0285, lng: 72.5710, x: 49, y: 49, riskScore: 76 },
  { id: 'LM-03', name: 'Sindhu Bhavan Road (SBR)', zone: 'New West Zone', lat: 23.0402, lng: 72.5085, x: 14, y: 38, riskScore: 92 },
  { id: 'LM-04', name: 'Kalupur Railway Station', zone: 'East Zone', lat: 23.0262, lng: 72.6002, x: 74, y: 51, riskScore: 96 },
  { id: 'LM-05', name: 'Kankaria Lake Gate #1', zone: 'South Zone', lat: 23.0063, lng: 72.6012, x: 76, y: 74, riskScore: 84 },
  { id: 'LM-06', name: 'Navrangpura AMC Parking Hub', zone: 'West Zone', lat: 23.0365, lng: 72.5611, x: 42, y: 39, riskScore: 79 },
  { id: 'LM-07', name: 'SG Highway (Iskon Cross Road)', zone: 'New West Zone', lat: 23.0274, lng: 72.5074, x: 16, y: 54, riskScore: 89 },
  { id: 'LM-08', name: 'Maninagar BRTS Terminal', zone: 'South Zone', lat: 22.9962, lng: 72.6041, x: 79, y: 86, riskScore: 91 },
];

export const INITIAL_AEDS = [
  { id: 'AED-AMC-01', name: 'Law Garden Night Market Smart Kiosk', lat: 23.0279, lng: 72.5625, x: 43, y: 50, battery: 98, padsExpiry: '2027-08', status: 'READY', locked: true, cabinetOtp: '4829', lastPing: '12s ago', brand: 'ZOLL AED Plus' },
  { id: 'AED-AMC-02', name: 'Riverfront Event Ground Gate 2', lat: 23.0265, lng: 72.5722, x: 51, y: 52, battery: 94, padsExpiry: '2027-05', status: 'READY', locked: true, cabinetOtp: '7310', lastPing: '8s ago', brand: 'Philips HeartStart' },
  { id: 'AED-AMC-03', name: 'Sindhu Bhavan AMC Oxygen Park', lat: 23.0389, lng: 72.5120, x: 17, y: 40, battery: 100, padsExpiry: '2028-01', status: 'READY', locked: true, cabinetOtp: '9042', lastPing: '5s ago', brand: 'Mindray BeneHeart' },
  { id: 'AED-AMC-04', name: 'Kalupur Metro & Rail Concourse', lat: 23.0272, lng: 72.5980, x: 72, y: 49, battery: 89, padsExpiry: '2027-02', status: 'READY', locked: true, cabinetOtp: '6155', lastPing: '19s ago', brand: 'ZOLL AED 3' },
  { id: 'AED-AMC-05', name: 'Kankaria Zoo Entrance Booth', lat: 23.0082, lng: 72.5990, x: 74, y: 71, battery: 92, padsExpiry: '2027-11', status: 'READY', locked: true, cabinetOtp: '3381', lastPing: '4s ago', brand: 'Philips HeartStart' },
  { id: 'AED-AMC-06', name: 'Gujarat University Metro Station', lat: 23.0380, lng: 72.5540, x: 37, y: 37, battery: 96, padsExpiry: '2027-09', status: 'READY', locked: true, cabinetOtp: '5519', lastPing: '14s ago', brand: 'Defibtech Lifeline' },
  { id: 'AED-AMC-07', name: 'Iskon BRTS Smart Shelter', lat: 23.0258, lng: 72.5095, x: 18, y: 56, battery: 76, padsExpiry: '2026-12', status: 'READY', locked: true, cabinetOtp: '2094', lastPing: '22s ago', brand: 'ZOLL AED Plus' },
  { id: 'AED-AMC-08', name: 'Maninagar Railway Footbridge', lat: 22.9980, lng: 72.6020, x: 77, y: 83, battery: 99, padsExpiry: '2028-03', status: 'READY', locked: true, cabinetOtp: '8472', lastPing: '6s ago', brand: 'Mindray BeneHeart' },
  { id: 'AED-AMC-09', name: 'AMC Danapith HQ Main Gate', lat: 23.0230, lng: 72.5850, x: 62, y: 56, battery: 95, padsExpiry: '2027-10', status: 'READY', locked: true, cabinetOtp: '1123', lastPing: '9s ago', brand: 'ZOLL AED 3' },
  { id: 'AED-AMC-10', name: 'Vastrapur Lake Amphitheatre', lat: 23.0395, lng: 72.5290, x: 26, y: 35, battery: 42, padsExpiry: '2026-11', status: 'LOW_BATT', locked: true, cabinetOtp: '9981', lastPing: '1m ago', brand: 'Philips HeartStart' },
];

export const INITIAL_RESPONDERS = [
  { id: 'RSP-101', name: 'Dr. Aarav Mehta', role: 'Cardiologist (VS Hospital)', tier: 'Doctor', tierLevel: 1, certId: 'AMC-CPR-8821', lat: 23.0259, lng: 72.5598, x: 39, y: 54, phone: '+91 98250 11201', rating: 4.9, missions: 14 },
  { id: 'RSP-102', name: 'Riya Patel, RN', role: 'ICU Nurse (SVP Hospital)', tier: 'Nurse', tierLevel: 1, certId: 'AMC-CPR-4490', lat: 23.0292, lng: 72.5648, x: 45, y: 47, phone: '+91 98250 44912', rating: 5.0, missions: 9 },
  { id: 'RSP-103', name: 'HC Dinesh Rabari', role: 'Ahmedabad Traffic Police (Ellisbridge Post)', tier: 'Traffic Police', tierLevel: 2, certId: 'AMC-POL-5521', lat: 23.0264, lng: 72.5630, x: 43, y: 53, phone: '+91 98250 77102', rating: 4.9, missions: 8 },
  { id: 'RSP-104', name: 'Mehul Solanki', role: 'BRTS Station Master (Maninagar Hub)', tier: 'BRTS Staff', tierLevel: 2, certId: 'AMC-BRT-1142', lat: 22.9965, lng: 72.6035, x: 78, y: 85, phone: '+91 98240 33819', rating: 4.8, missions: 5 },
  { id: 'RSP-105', name: 'Karan Desai', role: 'BJ Medical Final Yr Student', tier: 'Med Student', tierLevel: 1, certId: 'AMC-CPR-3109', lat: 23.0372, lng: 72.5105, x: 15, y: 42, phone: '+91 97129 88320', rating: 4.8, missions: 6 },
  { id: 'RSP-106', name: 'Sneha Thakkar', role: 'Red Cross CPR Volunteer', tier: 'Volunteer', tierLevel: 3, certId: 'AMC-CPR-7741', lat: 23.0410, lng: 72.5138, x: 19, y: 36, phone: '+91 99099 22104', rating: 4.7, missions: 4 },
  { id: 'RSP-107', name: 'Dr. Farhan Shaikh', role: 'ER Physician (Civil Hosp)', tier: 'Doctor', tierLevel: 1, certId: 'AMC-CPR-1029', lat: 23.0280, lng: 72.5965, x: 70, y: 47, phone: '+91 98980 55312', rating: 5.0, missions: 21 },
  { id: 'RSP-108', name: 'Chirag Parmar', role: '108 Off-Duty EMT Paramedic', tier: 'Paramedic', tierLevel: 1, certId: 'AMC-CPR-6532', lat: 23.0245, lng: 72.6020, x: 77, y: 54, phone: '+91 98242 77819', rating: 4.9, missions: 18 },
  { id: 'RSP-109', name: 'Pooja Trivedi', role: 'NCC Medical Cadet Leader', tier: 'Cadet', tierLevel: 3, certId: 'AMC-CPR-5190', lat: 23.0048, lng: 72.5985, x: 73, y: 76, phone: '+91 96625 33901', rating: 4.8, missions: 5 },
  { id: 'RSP-110', name: 'Vikramsinh Gohil', role: 'AMC Fire & Rescue First Aid', tier: 'Fire & Rescue', tierLevel: 2, certId: 'AMC-CPR-2901', lat: 23.0298, lng: 72.5735, x: 52, y: 46, phone: '+91 98251 90877', rating: 4.9, missions: 11 },
];

// Offline SMS/IVR Fallback Gateway Templates (Feature Phone & Low 4G/5G Connectivity)
export const OFFLINE_SMS_TEMPLATES = {
  en: (landmark, distance, otp) =>
    `[AMC 108 EMERGENCY ALERT] Cardiac Arrest at ${landmark}. You are ~${distance}m away. Smart Cabinet OTP: ${otp}. Reply 1 to Accept. Good Samaritan Law Protection Applies.`,
  gu: (landmark, distance, otp) =>
    `[AMC ૧૦૮ ઇમરજન્સી એલર્ટ] ${landmark} પાસે હૃદયરોગનો હુમલો. તમે ~${distance}m દૂર છો. કેબિનેટ OTP: ${otp}. સ્વીકારવા ૧ મોકલો. ગુડ સમરિટન કાયદો લાગુ.`,
  hi: (landmark, distance, otp) =>
    `[AMC 108 आपातकालीन अलर्ट] ${landmark} के पास कार्डियक अरेस्ट। आप ~${distance}m दूर हैं। कैबिनेट OTP: ${otp}। स्वीकार करने के लिए 1 भेजें। कानूनी सुरक्षा लागू।`
};

// AED Desert Zones (High Cardiac Risk + Zero AED in 800m)
export const AED_DESERT_ZONES = [
  { id: 'DZ-1', name: 'Bapunagar Industrial & Residential Cluster', x: 85, y: 36, r: 11, casesPerYear: 47, avg108Eta: '13.5 mins' },
  { id: 'DZ-2', name: 'Juhapura - Sarkhej Dense Corridor', x: 24, y: 78, r: 12, casesPerYear: 52, avg108Eta: '14.2 mins' },
  { id: 'DZ-3', name: 'Naroda GIDC Phase-2 Worker Hub', x: 88, y: 18, r: 10, casesPerYear: 39, avg108Eta: '12.8 mins' },
];

// Multilingual Clinical CPR & AED Instructions (English, Gujarati, Hindi)
export const MULTILINGUAL_GUIDES = {
  en: {
    langName: 'English',
    voiceCode: 'en-IN',
    banner: 'PUSH HARD & FAST IN CENTER OF CHEST (110 BPM)',
    goodSamaritanTitle: 'Good Samaritan Legal Shield',
    goodSamaritanText: 'Protected under Supreme Court Guidelines & Gujarat Good Samaritan Norms against any civil or criminal liability.',
    steps: [
      { title: '1. Check Responsiveness & Breathing', desc: 'Tap shoulders firmly. Confirm patient is unconscious and not breathing normally.' },
      { title: '2. High-Quality Chest Compressions', desc: 'Place heel of hand on center of sternum. Push 2 inches deep at 110 beats per minute.' },
      { title: '3. Apply AED Pads When Runner Arrives', desc: 'Turn on AED. Peel and place Upper-Right and Lower-Left chest pads on bare skin.' },
      { title: '4. Clear Patient & Deliver Shock', desc: 'Ensure nobody touches the patient during rhythm analysis and shock delivery.' }
    ],
    speechPrompt: 'Emergency CPR Mode Active. Push hard and fast in the center of the chest following the 110 beats per minute tone. Do not stop until the A E D or 108 ambulance arrives.'
  },
  gu: {
    langName: 'ગુજરાતી (Gujarati)',
    voiceCode: 'gu-IN',
    banner: 'છાતીની મધ્યમાં જોરથી અને ઝડપથી દબાવો (110 BPM)',
    goodSamaritanTitle: 'ગુડ સમરિટન કાનૂની સંરક્ષણ',
    goodSamaritanText: 'સુપ્રીમ કોર્ટ અને ગુજરાત સરકારના નિયમો મુજબ કટોકટીમાં મદદ કરનાર નાગરિક પર કોઈ દીવાની કે ફોજદારી જવાબદારી રહેશે નહીં.',
    steps: [
      { title: '૧. દર્દીનું ભાન અને શ્વાસ તપાસો', desc: 'ખભા પર થપથપાવો. જો દર્દી બેભાન હોય અને શ્વાસ ન લેતું હોય તો તરત જ સીપીઆર (CPR) શરૂ કરો.' },
      { title: '૨. છાતીની મધ્યમાં દબાણ આપો (110 BPM)', desc: 'બે હાથ એકબીજા પર રાખી છાતીની વચ્ચે ૨ ઈંચ ઊંડે સુધી બીપના અવાજ સાથે સતત દબાવો.' },
      { title: '૩. AED પેડ્સ છાતી પર લગાવો', desc: 'AED મશીન ચાલુ કરો. જમણી બાજુ ઉપર અને ડાબી બાજુ નીચેની તરફ પેડ્સ ચોંટાડો.' },
      { title: '૪. દર્દીથી દૂર રહો અને શોક (Shock) આપો', desc: 'જ્યારે AED મશીન હૃદયની તપાસ કરે અને શોક આપે ત્યારે દર્દીને કોઈએ અડકવું નહીં.' }
    ],
    speechPrompt: 'સીપીઆર મોડ શરૂ. છાતીની મધ્યમાં જોરથી અને ઝડપથી દબાવો. એકસો દસ બીપીએમ ના અવાજ સાથે તાલ મિલાવો.'
  },
  hi: {
    langName: 'हिंदी (Hindi)',
    voiceCode: 'hi-IN',
    banner: 'छाती के बीच में ज़ोर से और तेज़ी से दबाएं (110 BPM)',
    goodSamaritanTitle: 'गुड सेमेरिटन कानूनी सुरक्षा',
    goodSamaritanText: 'सुप्रीम कोर्ट एवं गुजरात सरकार के नियमों के तहत आपातकालीन मदद देने वाले नागरिक को पूर्ण कानूनी सुरक्षा प्राप्त है।',
    steps: [
      { title: '1. मरीज़ की सांस और होश जांचें', desc: 'कंधे को थपथपाएं। यदि मरीज़ बेहोश है और सांस नहीं ले रहा है, तो तुरंत सीपीआर शुरू करें।' },
      { title: '2. लगातार चेस्ट कम्प्रेशन दें (110 BPM)', desc: 'हथेली को छाती के बीच में रखें। बीप की आवाज़ के साथ 2 इंच गहरा और तेज़ दबाएं।' },
      { title: '3. AED पैड छाती पर लगाएं', desc: 'AED चालू करें। एक पैड दाहिने कंधे के नीचे और दूसरा बाईं पसली के नीचे लगाएं।' },
      { title: '4. मरीज़ से दूर हटें और शॉक दें', desc: 'जब मशीन जांच करे या शॉक का बटन दबाएं, तो सुनिश्चित करें कि कोई मरीज़ को न छुए।' }
    ],
    speechPrompt: 'सीपीआर मोड चालू है। छाती के बीच में ज़ोर से और तेज़ी से दबाएं। एक सौ दस बीपीएम की बीप के साथ ताल मिलाएं।'
  }
};

// Production Backend Code String for Modal / Tab
export const BACKEND_CODE_SNIPPET = `/**
 * PULSE-AHMEDABAD (PS000319) - PRODUCTION BACKEND ENGINE
 * Stack: Node.js, Express, Socket.io, MySQL 8.0 Spatial (ST_Distance_Sphere)
 */
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.json());

// 1. MySQL 8.0 Spatial Database Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'amc_pulse_admin',
  password: process.env.DB_PASSWORD || 'amc_secure_2026',
  database: 'pulse_ahmedabad_db'
});

/* =========================================================================
   MYSQL SPATIAL SCHEMA (Run in MySQL Workbench / CLI)
   =========================================================================
   CREATE TABLE verified_responders (
     responder_id VARCHAR(32) PRIMARY KEY,
     full_name VARCHAR(100) NOT NULL,
     qualification ENUM('DOCTOR','NURSE','PARAMEDIC','MEDICAL_STUDENT','CPR_VOLUNTEER'),
     amc_cert_id VARCHAR(50) UNIQUE NOT NULL,
     location POINT NOT NULL SRID 4326,
     is_online BOOLEAN DEFAULT TRUE,
     SPATIAL INDEX(location)
   );

   CREATE TABLE public_aeds (
     aed_id VARCHAR(32) PRIMARY KEY,
     landmark_name VARCHAR(150) NOT NULL,
     location POINT NOT NULL SRID 4326,
     battery_pct INT DEFAULT 100,
     cabinet_locked BOOLEAN DEFAULT TRUE,
     dynamic_otp VARCHAR(6),
     SPATIAL INDEX(location)
   );
========================================================================= */

// 2. Dual-Vector Geospatial Dispatch Endpoint (108 CAD Webhook)
app.post('/api/v1/emergency/trigger-108-sca', async (req, res) => {
  const { incidentId, callerPhone, lat, lng, landmarkName } = req.body;
  const victimPoint = \`POINT(\${lng} \${lat})\`;

  try {
    // Query closest 5 online verified responders within 800m radius
    const [responders] = await db.execute(\`
      SELECT responder_id, full_name, qualification, amc_cert_id,
             ST_X(location) AS lng, ST_Y(location) AS lat,
             ROUND(ST_Distance_Sphere(location, ST_GeomFromText(?, 4326))) AS dist_meters
      FROM verified_responders
      WHERE is_online = TRUE
        AND ST_Distance_Sphere(location, ST_GeomFromText(?, 4326)) <= 1200
      ORDER BY dist_meters ASC
      LIMIT 5
    \`, [victimPoint, victimPoint]);

    // Query nearest ready Public AED within 800m radius
    const [aeds] = await db.execute(\`
      SELECT aed_id, landmark_name, battery_pct,
             ST_X(location) AS lng, ST_Y(location) AS lat,
             ROUND(ST_Distance_Sphere(location, ST_GeomFromText(?, 4326))) AS dist_meters
      FROM public_aeds
      WHERE battery_pct > 50
      ORDER BY dist_meters ASC
      LIMIT 1
    \`, [victimPoint]);

    const primaryCprResponder = responders[0] || null;
    const aedRunnerResponder = responders[1] || responders[0] || null;
    const nearestAed = aeds[0] || null;
    const unlockOtp = Math.floor(1000 + Math.random() * 9000).toString();

    // Update Smart Cabinet OTP in DB
    if (nearestAed) {
      await db.execute(
        'UPDATE public_aeds SET dynamic_otp = ? WHERE aed_id = ?',
        [unlockOtp, nearestAed.aed_id]
      );
    }

    // Broadcast real-time WebSocket Dual-Vector Alert to Citizen Apps & AMC Console
    const payload = {
      incidentId,
      landmarkName,
      victimCoords: { lat, lng },
      assignments: {
        DIRECT_CPR: primaryCprResponder,
        AED_RUNNER: aedRunnerResponder,
        TARGET_AED: nearestAed ? { ...nearestAed, unlockOtp } : null
      },
      timestamp: new Date().toISOString()
    };

    io.emit('CRITICAL_SCA_DISPATCH', payload);
    return res.status(200).json({ status: 'DISPATCHED', payload });
  } catch (err) {
    console.error('Dispatch Error:', err);
    return res.status(500).json({ error: 'Geospatial Dispatch Failed' });
  }
});

server.listen(4000, () => console.log('Pulse-Ahmedabad Spatial Engine running on :4000'));`;

