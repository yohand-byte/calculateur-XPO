const { useState, useMemo, useEffect } = React;

const ICONS = {
  truck: '🚚',
  money: '💶',
  drop: '⬇️',
  alert: '⚠️',
  sun: '☀️',
  moon: '🌙',
  check: '✔️',
  pin: '📍',
};

const Icon = ({ symbol, className = '' }) => (
  <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
    {symbol}
  </span>
);

const ACCESS_PASSWORD = "Qualiwatt55!";

function CalculateurXPO() {
  const tarifs = {
    "01 - Ain": { 0.5: 48.03, 1: 60.48, 2: 100.49, 3: 142.3, 4: 201.89, 5: 249.9, 6: 304.15 },
    "02 - Aisne": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "03 - Allier": { 0.5: 48.92, 1: 61.37, 2: 99.61, 3: 136.96, 4: 174.31, 5: 205.44, 6: 239.23 },
    "04 - Alpes Hautes": { 0.5: 88.94, 1: 111.17, 2: 184.09, 3: 256.14, 4: 345.96, 5: 418.89, 6: 500.71 },
    "05 - Alpes Haute Provence": { 0.5: 78.26, 1: 97.83, 2: 162.75, 3: 225.9, 4: 305.05, 5: 369.1, 6: 441.13 },
    "06 - Alpes Maritime": { 0.5: 67.59, 1: 84.49, 2: 143.19, 3: 204.56, 4: 305.05, 5: 387.76, 6: 478.48 },
    "07 - Ardèche": { 0.5: 64.03, 1: 80.04, 2: 133.41, 3: 184.99, 4: 249.9, 5: 303.29, 6: 361.97 },
    "08 - Ardennes": { 0.5: 62.26, 1: 78.26, 2: 122.74, 3: 165.42, 4: 192.99, 5: 216.1, 6: 241.91 },
    "09 - Ariège": { 0.5: 64.03, 1: 80.04, 2: 136.07, 3: 194.77, 4: 289.93, 5: 367.31, 6: 453.58 },
    "10 - Aube": { 0.5: 40.02, 1: 50.69, 2: 79.15, 3: 106.73, 4: 125.4, 5: 139.62, 6: 156.53 },
    "11 - Aude": { 0.5: 64.03, 1: 80.04, 2: 136.07, 3: 194.77, 4: 289.93, 5: 367.31, 6: 453.58 },
    "12 - Aveyron": { 0.5: 77.37, 1: 96.94, 2: 160.09, 3: 223.24, 4: 301.5, 5: 365.54, 6: 436.68 },
    "13 - Bouches du Rhône": { 0.5: 61.37, 1: 76.49, 2: 130.74, 3: 186.78, 4: 277.48, 5: 352.19, 6: 434.89 },
    "14 - Calvados": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "15 - Cantal": { 0.5: 70.26, 1: 88.04, 2: 145.86, 3: 202.77, 4: 273.93, 5: 331.74, 6: 396.67 },
    "16 - Charente": { 0.5: 49.8, 1: 62.26, 2: 104.94, 3: 147.63, 4: 209, 5: 258.81, 6: 314.83 },
    "17 - Charente Maritime": { 0.5: 49.8, 1: 62.26, 2: 104.94, 3: 147.63, 4: 209, 5: 258.81, 6: 314.83 },
    "18 - Cher": { 0.5: 38.25, 1: 48.03, 2: 78.26, 3: 107.6, 4: 136.96, 5: 160.97, 6: 187.67 },
    "19 - Correze": { 0.5: 44.47, 1: 56.03, 2: 95.16, 3: 136.07, 4: 201.89, 5: 257.02, 6: 317.51 },
    "20 - Corse": { 0.5: 205.44, 1: 256.14, 2: 410, 3: 484.71, 4: 584.31, 5: 691.94, 6: 815.55 },
    "21 - Côte d'Or": { 0.5: 46.25, 1: 57.8, 2: 94.28, 3: 128.95, 4: 164.54, 5: 193.89, 6: 226.79 },
    "22 - Côte d'Armor": { 0.5: 42.69, 1: 54.25, 2: 89.83, 3: 127.19, 4: 179.64, 5: 222.34, 6: 270.38 },
    "23 - Creuse": { 0.5: 58.69, 1: 73.81, 2: 119.17, 3: 163.65, 4: 208.12, 5: 245.46, 6: 286.38 },
    "24 - Dordogne": { 0.5: 56.92, 1: 71.15, 2: 119.17, 3: 168.09, 4: 238.35, 5: 295.27, 6: 359.31 },
    "25 - Doubs": { 0.5: 48.03, 1: 60.48, 2: 100.49, 3: 139.62, 4: 188.54, 5: 228.57, 6: 273.03 },
    "26 - Drôme": { 0.5: 61.37, 1: 76.49, 2: 128.08, 3: 177.88, 4: 240.12, 5: 290.82, 6: 346.86 },
    "27 - Eure": { 0.5: 36.46, 1: 45.37, 2: 71.15, 3: 95.16, 4: 111.17, 5: 124.51, 6: 139.62 },
    "28 - Eure et Loire": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "29 - Finistère": { 0.5: 68.48, 1: 85.38, 2: 138.74, 3: 190.33, 4: 242.8, 5: 285.49, 6: 333.51 },
    "30 - Gard": { 0.5: 64.03, 1: 80.04, 2: 134.3, 3: 189.43, 4: 267.69, 5: 331.74, 6: 402.87 },
    "31 - Haute Garonne": { 0.5: 59.59, 1: 74.71, 2: 126.29, 3: 181.43, 4: 269.48, 5: 342.4, 6: 422.45 },
    "32 - Gers": { 0.5: 64.03, 1: 80.04, 2: 136.07, 3: 194.77, 4: 289.93, 5: 367.31, 6: 453.58 },
    "33 - Gironde": { 0.5: 52.48, 1: 65.82, 2: 110.28, 3: 155.65, 4: 219.69, 5: 273.03, 6: 331.74 },
    "34 - Hérault": { 0.5: 75.6, 1: 94.28, 2: 156.53, 3: 217.89, 4: 294.39, 5: 356.63, 6: 426.9 },
    "35 - Ille et Vilaine": { 0.5: 47.13, 1: 59.59, 2: 98.72, 3: 136.96, 4: 184.99, 5: 224.12, 6: 267.69 },
    "36 - Indre": { 0.5: 42.69, 1: 54.25, 2: 89.83, 3: 124.51, 4: 168.09, 5: 203.66, 6: 242.8 },
    "37 - Indre et Loire": { 0.5: 52.48, 1: 65.82, 2: 104.05, 3: 139.62, 4: 163.65, 5: 182.32, 6: 203.66 },
    "38 - Isère": { 0.5: 47.13, 1: 59.59, 2: 100.49, 3: 144.08, 4: 214.34, 5: 272.14, 6: 336.18 },
    "39 - Jura": { 0.5: 46.25, 1: 57.8, 2: 96.94, 3: 134.3, 4: 181.43, 5: 219.69, 6: 263.25 },
    "40 - Landes": { 0.5: 59.59, 1: 74.71, 2: 126.29, 3: 181.43, 4: 269.48, 5: 342.4, 6: 422.45 },
    "41 - Loir et Cher": { 0.5: 42.69, 1: 54.25, 2: 87.15, 3: 119.17, 4: 152.07, 5: 179.64, 6: 209 },
    "42 - Loire": { 0.5: 44.47, 1: 56.03, 2: 93.38, 3: 128.95, 4: 174.31, 5: 211.66, 6: 252.59 },
    "43 - Haute Loire": { 0.5: 48.92, 1: 61.37, 2: 102.27, 3: 144.96, 4: 205.44, 5: 254.36, 6: 309.5 },
    "44 - Loire Atlantantique": { 0.5: 44.47, 1: 56.03, 2: 93.38, 3: 128.95, 4: 174.31, 5: 211.66, 6: 252.59 },
    "45 - Loiret": { 0.5: 42.69, 1: 54.25, 2: 84.49, 3: 113.83, 4: 133.41, 5: 149.42, 6: 166.32 },
    "46 - Lot": { 0.5: 48.92, 1: 61.37, 2: 104.05, 3: 149.42, 4: 222.34, 5: 281.92, 6: 347.74 },
    "47 - Lot et Garonne": { 0.5: 59.59, 1: 74.71, 2: 124.51, 3: 176.1, 4: 249.02, 5: 309.5, 6: 375.31 },
    "48 - Lozère": { 0.5: 79.15, 1: 98.72, 2: 155.65, 3: 209.89, 4: 245.46, 5: 273.93, 6: 306.83 },
    "49 - Maine et Loire": { 0.5: 39.14, 1: 49.8, 2: 81.82, 3: 113.83, 4: 153.86, 5: 186.78, 6: 223.24 },
    "50 - Manche": { 0.5: 50.69, 1: 64.03, 2: 100.49, 3: 135.18, 4: 158.31, 5: 176.99, 6: 197.43 },
    "51 - Marne": { 0.5: 36.46, 1: 45.37, 2: 72.93, 3: 99.61, 4: 127.19, 5: 150.3, 6: 175.2 },
    "52 - Haute Marne": { 0.5: 54.25, 1: 68.48, 2: 107.6, 3: 144.08, 4: 168.98, 5: 188.54, 6: 210.77 },
    "53 - Mayenne": { 0.5: 44.47, 1: 56.03, 2: 90.71, 3: 124.51, 4: 158.31, 5: 186.78, 6: 217.89 },
    "54 - Meurthe et Moselle": { 0.5: 40.02, 1: 50.69, 2: 81.82, 3: 112.07, 4: 143.19, 5: 168.09, 6: 196.55 },
    "55 - Meuse": { 0.5: 44.47, 1: 56.03, 2: 90.71, 3: 124.51, 4: 158.31, 5: 186.78, 6: 217.89 },
    "56 - Morbihan": { 0.5: 47.13, 1: 59.59, 2: 98.72, 3: 136.96, 4: 184.99, 5: 224.12, 6: 267.69 },
    "57 - Moselle": { 0.5: 44.47, 1: 56.03, 2: 88.04, 3: 119.17, 4: 138.74, 5: 155.65, 6: 173.43 },
    "58 - Nièvre": { 0.5: 42.69, 1: 54.25, 2: 87.15, 3: 119.17, 4: 152.07, 5: 179.64, 6: 209 },
    "59 - Nord": { 0.5: 37.36, 1: 46.25, 2: 73.81, 3: 87.15, 4: 104.94, 5: 124.51, 6: 146.74 },
    "60 - Oise": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "61 - Orne": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "62 - Pas de Calais": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "63 - Puy de Dôme": { 0.5: 48.92, 1: 61.37, 2: 102.27, 3: 142.3, 4: 192.11, 5: 232.12, 6: 277.48 },
    "64 - Pyrénées Atlantiques": { 0.5: 83.61, 1: 104.05, 2: 173.43, 3: 241.01, 4: 325.51, 5: 393.99, 6: 471.37 },
    "65 - Hautes-Pyrénées": { 0.5: 75.6, 1: 94.28, 2: 157.42, 3: 222.34, 4: 314.83, 5: 391.33, 6: 474.92 },
    "66 - Pyrénées Orientales": { 0.5: 88.94, 1: 111.17, 2: 184.09, 3: 256.14, 4: 345.96, 5: 418.89, 6: 500.71 },
    "67 - Bas Rhin": { 0.5: 57.8, 1: 72.93, 2: 117.4, 3: 160.97, 4: 205.44, 5: 241.91, 6: 281.92 },
    "68 - Haut Rhin": { 0.5: 47.13, 1: 59.59, 2: 98.72, 3: 136.96, 4: 184.99, 5: 224.12, 6: 267.69 },
    "69 - Rhône": { 0.5: 45.37, 1: 56.92, 2: 95.16, 3: 131.63, 4: 177.88, 5: 216.1, 6: 257.91 },
    "70 -  Haute Saône": { 0.5: 48.03, 1: 60.48, 2: 100.49, 3: 139.62, 4: 188.54, 5: 228.57, 6: 273.03 },
    "71 - Saône et Loire": { 0.5: 41.79, 1: 52.48, 2: 87.15, 3: 121.84, 4: 164.54, 5: 199.22, 6: 238.35 },
    "72 - Sarthe": { 0.5: 44.47, 1: 56.03, 2: 90.71, 3: 124.51, 4: 158.31, 5: 186.78, 6: 217.89 },
    "73 - Savoie": { 0.5: 51.59, 1: 64.92, 2: 108.5, 3: 152.97, 4: 216.1, 5: 268.59, 6: 325.51 },
    "74 - Haute Savoie": { 0.5: 49.8, 1: 62.26, 2: 104.94, 3: 147.63, 4: 209, 5: 258.81, 6: 314.83 },
    "75 - Paris": { 0.5: 44.47, 1: 55.13, 2: 87.15, 3: 117.4, 4: 137.85, 5: 153.86, 6: 171.65 },
    "76 - Seine Maritime": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "77 - Seine et Marne": { 0.5: 46.25, 1: 57.8, 2: 90.71, 3: 121.84, 4: 142.3, 5: 159.2, 6: 177.88 },
    "78 - Yvelines": { 0.5: 46.25, 1: 57.8, 2: 90.71, 3: 121.84, 4: 142.3, 5: 159.2, 6: 177.88 },
    "79 - Deux sèvres": { 0.5: 45.37, 1: 56.92, 2: 95.16, 3: 134.3, 4: 190.33, 5: 236.58, 6: 287.26 },
    "80 - Somme": { 0.5: 36.46, 1: 45.37, 2: 71.15, 3: 95.16, 4: 111.17, 5: 124.51, 6: 139.62 },
    "81 - Tarn": { 0.5: 64.03, 1: 80.04, 2: 136.07, 3: 194.77, 4: 289.93, 5: 367.31, 6: 453.58 },
    "82 - Tarn et Garonne": { 0.5: 64.03, 1: 80.04, 2: 134.3, 3: 189.43, 4: 267.69, 5: 331.74, 6: 402.87 },
    "83 - Var": { 0.5: 66.72, 1: 83.61, 2: 141.42, 3: 201.89, 4: 301.5, 5: 382.43, 6: 472.26 },
    "84 - Vaucluse": { 0.5: 59.59, 1: 74.71, 2: 126.29, 3: 181.43, 4: 269.48, 5: 342.4, 6: 422.45 },
    "85 - Vendée": { 0.5: 49.8, 1: 62.26, 2: 104.05, 3: 144.96, 4: 194.77, 5: 236.58, 6: 282.81 },
    "86 - Vienne": { 0.5: 49.8, 1: 62.26, 2: 101.38, 3: 138.74, 4: 176.99, 5: 209, 6: 243.69 },
    "87 - Haute Vienne": { 0.5: 48.92, 1: 61.37, 2: 102.27, 3: 142.3, 4: 192.11, 5: 232.12, 6: 277.48 },
    "88 - Vosges": { 0.5: 44.47, 1: 56.03, 2: 90.71, 3: 124.51, 4: 158.31, 5: 186.78, 6: 217.89 },
    "89 - Yonne": { 0.5: 66.72, 1: 83.61, 2: 131.63, 3: 176.99, 4: 207.22, 5: 231.23, 6: 258.81 },
    "90 - Belfort Territoire": { 0.5: 43.58, 1: 55.13, 2: 91.59, 3: 127.19, 4: 171.65, 5: 207.22, 6: 248.14 },
    "91 - Essonne": { 0.5: 44.47, 1: 55.13, 2: 87.15, 3: 117.4, 4: 137.85, 5: 153.86, 6: 171.65 },
    "92  - Hauts de Seine": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "93 - Seine St Denis": { 0.5: 36.46, 1: 45.37, 2: 71.15, 3: 95.16, 4: 111.17, 5: 124.51, 6: 139.62 },
    "94 - Val de Marne": { 0.5: 44.47, 1: 55.13, 2: 87.15, 3: 117.4, 4: 137.85, 5: 153.86, 6: 171.65 },
    "95 - Val d'Oise": { 0.5: 35.58, 1: 45.37, 2: 71.15, 3: 95.16, 4: 111.17, 5: 124.51, 6: 139.62 },
    "98 - Monaco": { 0.5: 96.94, 1: 121.84, 2: 193.89, 3: 229.46, 4: 276.6, 5: 328.17, 6: 385.98 },
  };

  const departements = Object.keys(tarifs).sort();
  const idfDepartemens = ["75 - Paris", "77 - Seine et Marne", "78 - Yvelines", "91 - Essonne", "92  - Hauts de Seine", "93 - Seine St Denis", "94 - Val de Marne", "95 - Val d'Oise"];

  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [departement, setDepartement] = useState("35 - Ille et Vilaine");
  const [quantite, setQuantite] = useState(0.5);
  const [premium, setPremium] = useState(false);
  const [target, setTarget] = useState(false);
  const [priseRdv, setPriseRdv] = useState(false);
  const [tauxGasoil, setTauxGasoil] = useState(0.0579);
  const [shipmentRef, setShipmentRef] = useState("REF-TEST");
  const [slotInfo, setSlotInfo] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [xpoLoading, setXpoLoading] = useState(false);
  const [xpoError, setXpoError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('xpoAccess');
    if (saved === ACCESS_PASSWORD) {
      setAuthed(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ACCESS_PASSWORD) {
      localStorage.setItem('xpoAccess', ACCESS_PASSWORD);
      setAuthed(true);
      setPasswordError("");
    } else {
      setPasswordError("Mot de passe incorrect");
    }
  };

  const FRAIS_FIXES_EXPEDITION = 2.05;
  const FRAIS_FIXES_PREMIUM = 30;
  const FRAIS_FIXES_TARGET = 15;
  const FRAIS_FIXES_PRISE_RDV = 5;

  const fetchSlot = async () => {
    setXpoError(""); setBookingInfo(null); setSlotInfo(null); setXpoLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/xpo/slots?shipment=${encodeURIComponent(shipmentRef)}`);
      const data = await res.json();
      setSlotInfo(data.slots?.[0] || null);
      if (!data.slots?.length) setXpoError("Aucun créneau retourné par le bridge");
    } catch (e) {
      setXpoError(e.message || "Erreur bridge XPO");
    } finally {
      setXpoLoading(false);
    }
  };

  const bookSlot = async () => {
    if (!slotInfo) return;
    setXpoError(""); setBookingInfo(null); setXpoLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/xpo/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipment: shipmentRef, slotId: slotInfo.id })
      });
      const data = await res.json();
      setBookingInfo(data.confirmation || null);
      if (data.error) setXpoError(data.error);
    } catch (e) {
      setXpoError(e.message || "Erreur booking XPO");
    } finally {
      setXpoLoading(false);
    }
  };

  const calculs = useMemo(() => {
    const grilleDepot = tarifs[departement] || tarifs["35 - Ille et Vilaine"];
    const tranches = [0.5, 1, 2, 3, 4, 5, 6];
    let tarifBase = 0;
    
    if (quantite <= 0.5) {
      tarifBase = grilleDepot[0.5];
    } else {
      for (let i = 0; i < tranches.length - 1; i++) {
        if (quantite >= tranches[i] && quantite <= tranches[i + 1]) {
          const q1 = tranches[i];
          const q2 = tranches[i + 1];
          const p1 = grilleDepot[q1];
          const p2 = grilleDepot[q2];
          tarifBase = p1 + ((quantite - q1) / (q2 - q1)) * (p2 - p1);
          break;
        }
      }
      if (quantite > 6) {
        tarifBase = grilleDepot[6];
      }
    }

    const fraisPremium = premium ? FRAIS_FIXES_PREMIUM : 0;
    const fraisTarget = target ? FRAIS_FIXES_TARGET : 0;
    const fraisPriseRdv = priseRdv ? FRAIS_FIXES_PRISE_RDV : 0;
    const estIDF = idfDepartemens.includes(departement);
    const fraisIDF = estIDF ? (tarifBase * 0.15) : 0;

    const montantAvantGasoil = tarifBase + FRAIS_FIXES_EXPEDITION + fraisPremium + fraisTarget + fraisPriseRdv + fraisIDF;
    const montantGasoil = montantAvantGasoil * tauxGasoil;
    const totalHT = montantAvantGasoil + montantGasoil;

    return {
      tarifBase: Math.round(tarifBase * 100) / 100,
      fraisFixesExpedition: FRAIS_FIXES_EXPEDITION,
      fraisPremium,
      fraisTarget,
      fraisPriseRdv,
      fraisIDF: Math.round(fraisIDF * 100) / 100,
      montantAvantGasoil: Math.round(montantAvantGasoil * 100) / 100,
      montantGasoil: Math.round(montantGasoil * 100) / 100,
      totalHT: Math.round(totalHT * 100) / 100,
      estIDF
    };
  }, [departement, quantite, premium, target, priseRdv, tauxGasoil]);

  const colors = darkMode ? {
    bg: 'bg-gradient-to-br from-slate-900 to-blue-900',
    card: 'bg-slate-800/40 backdrop-blur-sm border border-slate-700',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    input: 'bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10 border-emerald-500/30',
    accentBorder: 'border-emerald-400/60',
    border: 'border-slate-700',
    header: 'bg-gradient-to-r from-blue-900 to-blue-800',
    button: 'bg-emerald-500 hover:bg-emerald-600 text-white'
  } : {
    bg: 'bg-slate-50',
    card: 'bg-white border border-slate-200 shadow-sm',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    input: 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500',
    accent: 'text-emerald-600',
    accentBg: 'bg-emerald-50 border-emerald-300',
    accentBorder: 'border-emerald-300',
    border: 'border-slate-200',
    header: 'bg-gradient-to-r from-blue-900 to-blue-800',
    button: 'bg-emerald-500 hover:bg-emerald-600 text-white'
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Icon symbol={ICONS.pin} className="text-emerald-300 text-xl" />
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Qualiwatt</p>
              <h1 className="text-2xl font-bold">Calculateur XPO</h1>
            </div>
          </div>

          <p className="text-sm text-slate-200 mb-4">Accès protégé. Saisis le mot de passe pour ouvrir le calculateur.</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-200 mb-2">Mot de passe</label>
              <input
                type="password"
                className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/20 focus:border-emerald-400 outline-none"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="********"
              />
              {passwordError && <p className="text-red-300 text-xs mt-2">{passwordError}</p>}
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">Entrer</button>
          </form>
          <p className="text-[11px] text-slate-300 mt-4">Indice : même mot de passe que celui communiqué (Qualiwatt55!).</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colors.bg} transition-colors duration-300`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <div className={`${colors.header} text-white py-8 px-8 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">Pro</span>
              <h2 className="text-sm font-semibold text-emerald-300 uppercase tracking-widest">Qualiwatt</h2>
            </div>
            <h1 className="text-4xl font-bold">Calculateur XPO</h1>
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full border-2 transition-all ${
              darkMode 
                ? 'bg-slate-700 border-slate-600 text-yellow-400' 
                : 'bg-slate-300 border-slate-400 text-slate-700'
            } hover:scale-110`}
          >
            <Icon symbol={darkMode ? ICONS.sun : ICONS.moon} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className={`${colors.card} rounded-xl p-8 space-y-6`}>
            <h2 className={`text-xl font-bold ${colors.text} mb-6 flex items-center gap-2`}>
              <Icon symbol={ICONS.pin} className="w-5 h-5 text-emerald-500" />
              Paramètres
            </h2>

            <div>
              <label className={`block text-xs font-bold ${colors.textSecondary} mb-2 uppercase tracking-widest`}>
                Département
              </label>
              <select
                value={departement}
                onChange={(e) => setDepartement(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                {departements.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold ${colors.textSecondary} mb-2 uppercase tracking-widest`}>
                Quantité (tranches)
              </label>
              <select
                value={quantite}
                onChange={(e) => setQuantite(parseFloat(e.target.value))}
                className={`w-full px-4 py-2.5 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                {[0.5, 1, 2, 3, 4, 5, 6].map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div className={`border-t ${colors.border} pt-6`}>
              <p className={`text-xs font-bold ${colors.textSecondary} mb-3 uppercase tracking-widest`}>Options</p>
              <div className="space-y-3">
                {[
                  { state: premium, setState: setPremium, label: 'Premium', price: 30 },
                  { state: target, setState: setTarget, label: 'Target', price: 15 },
                  { state: priseRdv, setState: setPriseRdv, label: 'Prise de RDV', price: 5 }
                ].map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={opt.state}
                      className="sr-only"
                      onChange={(e) => opt.setState(e.target.checked)}
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      opt.state 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : `border-slate-400 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`
                    }`}>
                      {opt.state && <Icon symbol={ICONS.check} className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${colors.textSecondary} group-hover:${colors.text} transition-colors`}>
                      {opt.label} <span className={colors.accent}>+{opt.price}€</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold ${colors.textSecondary} mb-2 uppercase tracking-widest`}>
                Taux gazole (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={tauxGasoil}
                onChange={(e) => setTauxGasoil(parseFloat(e.target.value))}
                className={`w-full px-4 py-2.5 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
            </div>
          </div>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prix principal */}
            <div className={`${colors.card} rounded-xl p-8 bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-lg`}>
              <p className="text-sm font-semibold text-emerald-100 mb-2 uppercase tracking-widest">
                Montant HT Total
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">
                  {calculs.totalHT.toFixed(2)}
                </span>
                <span className="text-2xl text-emerald-100">€</span>
              </div>
            </div>

            {/* Grille 3 colonnes */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ICONS.truck, label: 'Tarif grille', value: calculs.tarifBase },
                { icon: ICONS.money, label: 'Frais fixes', value: calculs.fraisFixesExpedition },
                { icon: ICONS.drop, label: 'Montant gazole', value: calculs.montantGasoil },
              ].map((item, idx) => {
                const iconSymbol = item.icon;
                return (
                  <div key={idx} className={`${colors.card} rounded-lg p-4`}>
                    <Icon symbol={iconSymbol} className={`w-5 h-5 ${colors.accent} mb-2`} />
                    <p className={`text-xs ${colors.textSecondary} mb-1`}>{item.label}</p>
                    <p className={`text-xl font-bold ${colors.text}`}>{item.value.toFixed(2)}€</p>
                  </div>
                );
              })}
            </div>

            {/* Détails options */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${colors.card} rounded-lg p-4`}>
              {[
                { label: 'Premium', value: calculs.fraisPremium },
                { label: 'Target', value: calculs.fraisTarget },
                { label: 'RDV', value: calculs.fraisPriseRdv },
                { label: 'IDF', value: calculs.fraisIDF },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <p className={`text-xs ${colors.textSecondary} mb-1`}>{item.label}</p>
                  <p className={`text-sm font-semibold ${item.value > 0 ? colors.accent : colors.textSecondary}`}>
                    {item.value > 0 ? `${item.value.toFixed(2)}€` : '-'}
                  </p>
                </div>
              ))}
            </div>

            {/* Alerte IDF */}
            {calculs.estIDF && (
              <div className={`${colors.accentBg} border ${colors.accentBorder} rounded-lg p-4 flex gap-3`}>
                <Icon symbol={ICONS.alert} className={`w-5 h-5 ${colors.accent} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className={`text-sm font-semibold ${colors.accent}`}>Zone Île-de-France</p>
                  <p className={`text-xs ${colors.textSecondary} mt-1`}>
                    Surcharge de <span className={`${colors.accent} font-semibold`}>{calculs.fraisIDF.toFixed(2)}€</span> (15% du tarif) appliquée
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* XPO bridge section */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${colors.card} rounded-xl p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${colors.text}`}>Prise de RDV XPO</h3>
            <label className={`block text-xs font-bold ${colors.textSecondary} mb-2 uppercase tracking-widest`}>
              Référence expédition
            </label>
            <input
              value={shipmentRef}
              onChange={(e) => setShipmentRef(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              placeholder="REF-12345"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={fetchSlot}
                disabled={xpoLoading}
                className={`px-4 py-2 rounded-lg ${colors.button} text-sm font-semibold`}
              >
                {xpoLoading ? "..." : "Proposer un RDV"}
              </button>
              <button
                onClick={bookSlot}
                disabled={!slotInfo || xpoLoading}
                className={`px-4 py-2 rounded-lg ${slotInfo ? colors.button : 'bg-slate-300 text-slate-500'} text-sm font-semibold`}
              >
                {xpoLoading ? "..." : "Confirmer"}
              </button>
            </div>
            {xpoError && <p className="text-red-500 text-sm mt-3">{xpoError}</p>}
            {slotInfo && (
              <div className={`${colors.accentBg} border ${colors.accentBorder} rounded-lg p-3 mt-4`}>
                <p className={`text-sm font-semibold ${colors.accent}`}>{slotInfo.label}</p>
                <p className={`text-xs ${colors.textSecondary}`}>Slot ID: {slotInfo.id}</p>
              </div>
            )}
            {bookingInfo && (
              <div className={`${colors.accentBg} border ${colors.accentBorder} rounded-lg p-3 mt-3`}>
                <p className={`text-sm font-semibold ${colors.accent}`}>RDV confirmé</p>
                <p className={`text-xs ${colors.textSecondary}`}>Date : {bookingInfo.date}</p>
                <p className={`text-xs ${colors.textSecondary}`}>Créneau : {bookingInfo.window}</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 text-sm leading-6">
            <div className={`${colors.card} rounded-xl p-6`}>
              <p className={`${colors.textSecondary}`}>
                Le bridge XPO applique la règle contrat : demande avant 12h → enlèvement J+1, après 12h → J+2, fenêtre 14h–16h.
                Le bouton “Proposer un RDV” interroge `GET /api/xpo/slots`, “Confirmer” appelle `POST /api/xpo/book` avec le Slot ID.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-12 text-center text-sm ${colors.textSecondary}`}>
          <p>Qualiwatt Pro • Tarifs France 2025 • Calcul temps réel</p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CalculateurXPO />);
