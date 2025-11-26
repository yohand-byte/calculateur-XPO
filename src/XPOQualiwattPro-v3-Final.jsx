import React, { useState, useMemo } from 'react';
import { 
  Truck, DollarSign, TrendingDown, AlertCircle, Moon, Check, 
  MapPin, Package, Calendar, Phone, Mail, Plus, Trash2, Edit2, Save, X,
  Zap, Copy
} from 'lucide-react';

export default function XPOQualiwattProV3() {
  // ===== TARIFS COMPLETS (96 DÉPARTEMENTS) =====
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
    "44 - Loire Atlantique": { 0.5: 44.47, 1: 56.03, 2: 93.38, 3: 128.95, 4: 174.31, 5: 211.66, 6: 252.59 },
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
    "70 - Haute Saône": { 0.5: 48.03, 1: 60.48, 2: 100.49, 3: 139.62, 4: 188.54, 5: 228.57, 6: 273.03 },
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
    "92 - Hauts de Seine": { 0.5: 40.91, 1: 51.59, 2: 80.93, 3: 109.39, 4: 128.08, 5: 143.19, 6: 160.09 },
    "93 - Seine St Denis": { 0.5: 36.46, 1: 45.37, 2: 71.15, 3: 95.16, 4: 111.17, 5: 124.51, 6: 139.62 },
    "94 - Val de Marne": { 0.5: 44.47, 1: 55.13, 2: 87.15, 3: 117.4, 4: 137.85, 5: 153.86, 6: 171.65 },
    "95 - Val d'Oise": { 0.5: 35.58, 1: 45.37, 2: 71.15, 3: 95.16, 4: 111.17, 5: 124.51, 6: 139.62 },
    "98 - Monaco": { 0.5: 96.94, 1: 121.84, 2: 193.89, 3: 229.46, 4: 276.6, 5: 328.17, 6: 385.98 },
  };

  const departements = Object.keys(tarifs).sort();
  const idfDepartemens = ["75 - Paris", "77 - Seine et Marne", "78 - Yvelines", "91 - Essonne", "92 - Hauts de Seine", "93 - Seine St Denis", "94 - Val de Marne", "95 - Val d'Oise"];

  // Adresse par défaut Qualiwatt
  const addresseQualiwatt = {
    id: 'qualiwatt-default',
    nom: 'QUALIWATT PRO / LOGISTIC26',
    adresse: '16-18 rue Eiffel',
    codePostal: '77220',
    ville: 'Gretz-Armainvilliers',
    contact: 'Olivier / Thibault',
    tel: '01.64.42.82.55',
    email: 'logistics@qualiwatt.com',
    isDefault: true
  };

  // ===== STATE =====
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tarif');
  
  // Calculateur Tarif
  const [departement, setDepartement] = useState("77 - Seine et Marne");
  const [quantite, setQuantite] = useState(1);
  const [premium, setPremium] = useState(false);
  const [target, setTarget] = useState(false);
  const [priseRdv, setPriseRdv] = useState(false);
  const [tauxGasoil, setTauxGasoil] = useState(0.0579);

  // Carnet d'adresses
  const [adresses, setAdresses] = useState([addresseQualiwatt]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddressForm, setNewAddressForm] = useState({
    nom: '', adresse: '', codePostal: '', ville: '', contact: '', tel: '', email: ''
  });

  // Expéditions
  const [expeditions, setExpeditions] = useState([]);
  const [showNewExpForm, setShowNewExpForm] = useState(false);
  const [newExpForm, setNewExpForm] = useState({
    reference: `EXP-${Date.now().toString().slice(-6)}`,
    dateExpedition: new Date().toISOString().split('T')[0],
    urgence: false,
    palettes: 1,
    premium: false,
    target: false,
    priseRdv: false,
    adresseOriginId: 'qualiwatt-default',
    adresseDestinId: '',
    showNewDestinationForm: false,
    newDestinationForm: { nom: '', adresse: '', codePostal: '', ville: '', contact: '', tel: '', email: '' }
  });

  const colors = darkMode ? {
    bg: 'bg-slate-950',
    text: 'text-white',
    textSecondary: 'text-slate-400',
    input: 'bg-slate-800 text-white border-slate-700',
    card: 'bg-slate-900 border border-slate-800',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-900/20',
    accentBorder: 'border-emerald-700',
  } : {
    bg: 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    input: 'bg-white text-slate-900 border-slate-200',
    card: 'bg-white border border-slate-200 shadow-sm',
    accent: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
  };

  // CALCULS TARIF
  const calculs = useMemo(() => {
    const tarifBase = tarifs[departement]?.[quantite] || 0;
    const fraisFixesExpedition = 2.05;
    const montantGasoil = tarifBase * tauxGasoil;
    const fraisPremium = premium ? 30 : 0;
    const fraisTarget = target ? 15 : 0;
    const fraisPriseRdv = priseRdv ? 5 : 0;
    const estIDF = idfDepartemens.includes(departement);
    const fraisIDF = estIDF ? tarifBase * 0.15 : 0;
    const totalHT = tarifBase + fraisFixesExpedition + montantGasoil + fraisPremium + fraisTarget + fraisPriseRdv + fraisIDF;
    return { tarifBase, fraisFixesExpedition, montantGasoil, fraisPremium, fraisTarget, fraisPriseRdv, estIDF, fraisIDF, totalHT };
  }, [departement, quantite, premium, target, priseRdv, tauxGasoil]);

  // GESTION ADRESSES
  const handleSaveAddress = () => {
    if (editingAddressId) {
      setAdresses(adresses.map(a => a.id === editingAddressId ? { ...newAddressForm, id: editingAddressId } : a));
      setEditingAddressId(null);
    } else {
      setAdresses([...adresses, { ...newAddressForm, id: Date.now().toString() }]);
    }
    setNewAddressForm({ nom: '', adresse: '', codePostal: '', ville: '', contact: '', tel: '', email: '' });
    setShowNewAddressForm(false);
  };

  const handleDeleteAddress = (id) => {
    if (id !== 'qualiwatt-default') {
      setAdresses(adresses.filter(a => a.id !== id));
    }
  };

  const handleEditAddress = (addr) => {
    if (addr.id !== 'qualiwatt-default') {
      setNewAddressForm(addr);
      setEditingAddressId(addr.id);
      setShowNewAddressForm(true);
    }
  };

  // GESTION EXPÉDITIONS
  const handleAddDestination = () => {
    const newId = Date.now().toString();
    setAdresses([...adresses, { ...newExpForm.newDestinationForm, id: newId }]);
    setNewExpForm({
      ...newExpForm,
      adresseDestinId: newId,
      showNewDestinationForm: false,
      newDestinationForm: { nom: '', adresse: '', codePostal: '', ville: '', contact: '', tel: '', email: '' }
    });
  };

  const handleAddExpedition = () => {
    if (newExpForm.adresseDestinId) {
      setExpeditions([...expeditions, { 
        ...newExpForm,
        id: Date.now().toString(),
        showNewDestinationForm: undefined,
        newDestinationForm: undefined 
      }]);
      setNewExpForm({
        reference: `EXP-${Date.now().toString().slice(-6)}`,
        dateExpedition: new Date().toISOString().split('T')[0],
        urgence: false,
        palettes: 1,
        premium: false,
        target: false,
        priseRdv: false,
        adresseOriginId: 'qualiwatt-default',
        adresseDestinId: '',
        showNewDestinationForm: false,
        newDestinationForm: { nom: '', adresse: '', codePostal: '', ville: '', contact: '', tel: '', email: '' }
      });
      setShowNewExpForm(false);
    }
  };

  const handleDeleteExpedition = (id) => {
    setExpeditions(expeditions.filter(e => e.id !== id));
  };

  const getAddressById = (id) => adresses.find(a => a.id === id);

  const handleCopyExpJson = (exp) => {
    const expData = {
      reference: exp.reference,
      dateExpedition: exp.dateExpedition,
      urgence: exp.urgence,
      palettes: exp.palettes,
      options: {
        premium: exp.premium,
        target: exp.target,
        priseRdv: exp.priseRdv
      },
      adresseOrigine: getAddressById(exp.adresseOriginId),
      adresseDestination: getAddressById(exp.adresseDestinId)
    };
    navigator.clipboard.writeText(JSON.stringify(expData, null, 2));
  };

  return (
    <div className={`min-h-screen ${colors.bg} transition-colors duration-300`}>
      {/* ===== HEADER ===== */}
      <div className={`${colors.card} sticky top-0 z-50 backdrop-blur-xl border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-black ${colors.text}`}>XPO Qualiwatt Pro</h1>
              <p className={`text-xs ${colors.textSecondary}`}>v3.0 - Gestion Complète d'Expéditions</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg transition-all hover:scale-110 ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-200 text-slate-700'}`}
          >
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'tarif', label: '📊 Calculateur Tarif', icon: Zap },
            { id: 'adresses', label: '📍 Carnet d\'Adresses', icon: MapPin },
            { id: 'expeditions', label: '📦 Expéditions', icon: Package }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? `border-emerald-500 ${colors.accent}`
                  : `border-transparent ${colors.textSecondary} hover:${colors.textSecondary}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== TAB: CALCULATEUR TARIF ===== */}
        {activeTab === 'tarif' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* GAUCHE: PARAMÈTRES */}
            <div className="lg:col-span-1 space-y-5">
              {/* Département */}
              <div>
                <label className={`block text-xs font-bold ${colors.textSecondary} mb-2.5 uppercase tracking-widest`}>
                  <MapPin className="inline w-3.5 h-3.5 mr-1.5" />
                  Département
                </label>
                <select
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium`}
                >
                  {departements.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Quantité (Palettes) */}
              <div>
                <label className={`block text-xs font-bold ${colors.textSecondary} mb-2.5 uppercase tracking-widest`}>
                  📦 Quantité (Palettes)
                </label>
                <select
                  value={quantite}
                  onChange={(e) => setQuantite(parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-center text-lg`}
                >
                  {[0.5, 1, 2, 3, 4, 5, 6].map(q => (
                    <option key={q} value={q}>{q} palette{q > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Gazole */}
              <div>
                <label className={`block text-xs font-bold ${colors.textSecondary} mb-2.5 uppercase tracking-widest`}>
                  ⛽ Taux Gazole (%)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  value={tauxGasoil}
                  onChange={(e) => setTauxGasoil(parseFloat(e.target.value))}
                  className={`w-full px-4 py-3 rounded-lg ${colors.input} border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-lg text-center`}
                />
              </div>

              {/* Options */}
              <div className={`${colors.card} rounded-lg p-5 space-y-4`}>
                <h3 className={`text-xs font-bold ${colors.textSecondary} uppercase tracking-widest`}>🎯 Options</h3>
                {[
                  { state: premium, setState: setPremium, label: 'Premium', price: 30 },
                  { state: target, setState: setTarget, label: 'Target', price: 15 },
                  { state: priseRdv, setState: setPriseRdv, label: 'Prise RDV', price: 5 }
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
                      {opt.state && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm flex-1 ${colors.textSecondary} group-hover:${colors.text} transition-colors`}>
                      {opt.label}
                    </span>
                    <span className={colors.accent}>+{opt.price}€</span>
                  </label>
                ))}
              </div>
            </div>

            {/* DROITE: RÉSULTATS */}
            <div className="lg:col-span-2 space-y-5">
              {/* Grand Prix */}
              <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
                <p className="text-sm font-semibold text-emerald-100 mb-2 uppercase tracking-widest">💰 Montant H.T.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tight">{calculs.totalHT.toFixed(2)}</span>
                  <span className="text-3xl font-light opacity-90">€</span>
                </div>
                <p className="text-emerald-100 text-xs mt-4">✓ Tarifs France 2025 • Calcul temps réel</p>
              </div>

              {/* Détails 3 colonnes */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Grille', value: calculs.tarifBase, color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-200 dark:border-emerald-800' },
                  { icon: DollarSign, label: 'Frais', value: calculs.fraisFixesExpedition, color: 'from-blue-500/20 to-blue-600/20 border-blue-200 dark:border-blue-800' },
                  { icon: TrendingDown, label: 'Gazole', value: calculs.montantGasoil, color: 'from-orange-500/20 to-orange-600/20 border-orange-200 dark:border-orange-800' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 border`}>
                      <Icon className="w-5 h-5 mb-2 opacity-70" />
                      <p className={`text-xs font-semibold ${colors.textSecondary} mb-1`}>{item.label}</p>
                      <p className={`text-xl font-bold ${colors.text}`}>{item.value.toFixed(2)}€</p>
                    </div>
                  );
                })}
              </div>

              {/* Récap Options */}
              <div className={`${colors.card} rounded-xl p-5`}>
                <h3 className={`text-xs font-bold ${colors.textSecondary} mb-4 uppercase tracking-widest`}>Détails Options</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Premium', value: calculs.fraisPremium },
                    { label: 'Target', value: calculs.fraisTarget },
                    { label: 'RDV', value: calculs.fraisPriseRdv },
                    { label: 'IDF', value: calculs.fraisIDF },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <p className={`text-xs ${colors.textSecondary} mb-2`}>{item.label}</p>
                      <p className={`text-lg font-bold ${item.value > 0 ? colors.accent : colors.textSecondary}`}>
                        {item.value > 0 ? `${item.value.toFixed(2)}€` : '−'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerte IDF */}
              {calculs.estIDF && (
                <div className={`${colors.accentBg} border ${colors.accentBorder} rounded-xl p-4 flex gap-3`}>
                  <AlertCircle className={`w-5 h-5 ${colors.accent} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-sm font-bold ${colors.accent}`}>⚡ Zone Île-de-France</p>
                    <p className={`text-xs ${colors.textSecondary} mt-1`}>
                      Surcharge: <span className={`${colors.accent} font-bold`}>{calculs.fraisIDF.toFixed(2)}€</span> (15%)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== TAB: CARNET D'ADRESSES ===== */}
        {activeTab === 'adresses' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowNewAddressForm(!showNewAddressForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Adresse
            </button>

            {showNewAddressForm && (
              <div className={`${colors.card} rounded-xl p-6 space-y-4`}>
                <h3 className={`text-lg font-bold ${colors.text}`}>
                  {editingAddressId ? '✏️ Modifier Adresse' : '➕ Ajouter Adresse'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nom / Entreprise" value={newAddressForm.nom} onChange={(e) => setNewAddressForm({...newAddressForm, nom: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                  <input type="text" placeholder="Adresse" value={newAddressForm.adresse} onChange={(e) => setNewAddressForm({...newAddressForm, adresse: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                  <input type="text" placeholder="Code Postal" value={newAddressForm.codePostal} onChange={(e) => setNewAddressForm({...newAddressForm, codePostal: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                  <input type="text" placeholder="Ville" value={newAddressForm.ville} onChange={(e) => setNewAddressForm({...newAddressForm, ville: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                  <input type="text" placeholder="Contact" value={newAddressForm.contact} onChange={(e) => setNewAddressForm({...newAddressForm, contact: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                  <input type="tel" placeholder="Téléphone" value={newAddressForm.tel} onChange={(e) => setNewAddressForm({...newAddressForm, tel: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                  <input type="email" placeholder="Email" value={newAddressForm.email} onChange={(e) => setNewAddressForm({...newAddressForm, email: e.target.value})} className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 md:col-span-2`} />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSaveAddress} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    <Save className="inline w-4 h-4 mr-2" />
                    Enregistrer
                  </button>
                  <button onClick={() => { setShowNewAddressForm(false); setEditingAddressId(null); setNewAddressForm({ nom: '', adresse: '', codePostal: '', ville: '', contact: '', tel: '', email: '' }); }} className={`flex-1 py-3 ${colors.card} rounded-lg font-semibold transition-all`}>
                    <X className="inline w-4 h-4 mr-2" />
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {/* Liste Adresses */}
            <div className="grid md:grid-cols-2 gap-4">
              {adresses.map(addr => (
                <div key={addr.id} className={`${colors.card} rounded-xl p-5 space-y-3`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-bold ${colors.text} text-sm`}>{addr.nom}</h4>
                      {addr.isDefault && <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded mt-1 inline-block">⭐ Par Défaut</span>}
                    </div>
                    {!addr.isDefault && (
                      <div className="flex gap-2">
                        <button onClick={() => handleEditAddress(addr)} className={`p-2 rounded transition-all ${colors.card}`} title="Modifier">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteAddress(addr.id)} className={`p-2 rounded transition-all hover:bg-red-500 hover:text-white ${colors.card}`} title="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={`text-xs ${colors.textSecondary} space-y-1`}>
                    <p><span className="font-semibold">📍</span> {addr.adresse}</p>
                    <p><span className="font-semibold">🏙️</span> {addr.codePostal} {addr.ville}</p>
                    <p><span className="font-semibold">👤</span> {addr.contact}</p>
                    <p><span className="font-semibold">📱</span> {addr.tel}</p>
                    <p><span className="font-semibold">📧</span> {addr.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB: EXPÉDITIONS ===== */}
        {activeTab === 'expeditions' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowNewExpForm(!showNewExpForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Expédition
            </button>

            {showNewExpForm && (
              <div className={`${colors.card} rounded-xl p-6 space-y-6`}>
                <h3 className={`text-lg font-bold ${colors.text}`}>📦 Créer Expédition</h3>
                
                {/* Référence + Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Référence"
                    value={newExpForm.reference}
                    onChange={(e) => setNewExpForm({...newExpForm, reference: e.target.value})}
                    className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  <input
                    type="date"
                    value={newExpForm.dateExpedition}
                    onChange={(e) => setNewExpForm({...newExpForm, dateExpedition: e.target.value})}
                    className={`px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                </div>

                {/* Urgence */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newExpForm.urgence}
                    onChange={(e) => setNewExpForm({...newExpForm, urgence: e.target.checked})}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm font-semibold ${colors.text}`}>🚨 Urgence</span>
                </label>

                {/* Palettes */}
                <div>
                  <label className={`block text-xs font-bold ${colors.textSecondary} mb-2.5 uppercase tracking-widest`}>📦 Palettes</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={newExpForm.palettes}
                    onChange={(e) => setNewExpForm({...newExpForm, palettes: parseFloat(e.target.value)})}
                    className={`w-full px-4 py-3 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-lg text-center`}
                  />
                </div>

                {/* Options */}
                <div className={`${colors.card} rounded-lg p-5 space-y-4`}>
                  <h3 className={`text-xs font-bold ${colors.textSecondary} uppercase tracking-widest`}>🎯 Options</h3>
                  {[
                    { state: newExpForm.premium, setState: (val) => setNewExpForm({...newExpForm, premium: val}), label: 'Premium', price: 30 },
                    { state: newExpForm.target, setState: (val) => setNewExpForm({...newExpForm, target: val}), label: 'Target', price: 15 },
                    { state: newExpForm.priseRdv, setState: (val) => setNewExpForm({...newExpForm, priseRdv: val}), label: 'Prise RDV', price: 5 }
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
                        {opt.state && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm flex-1 ${colors.textSecondary}`}>{opt.label}</span>
                      <span className={colors.accent}>+{opt.price}€</span>
                    </label>
                  ))}
                </div>

                {/* Adresse Enlèvement (Qualiwatt par défaut) */}
                <div className={`${colors.card} rounded-lg p-4`}>
                  <p className={`text-sm font-bold ${colors.text} mb-2`}>📦 Adresse d'Enlèvement</p>
                  <p className={`text-xs ${colors.textSecondary}`}>{getAddressById(newExpForm.adresseOriginId)?.nom}</p>
                </div>

                {/* Adresse Destination */}
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs font-bold ${colors.textSecondary} mb-2.5 uppercase tracking-widest`}>📍 Destination</label>
                    <select
                      value={newExpForm.adresseDestinId}
                      onChange={(e) => setNewExpForm({...newExpForm, adresseDestinId: e.target.value})}
                      className={`w-full px-4 py-2.5 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    >
                      <option value="">Sélectionner une adresse</option>
                      {adresses.filter(a => a.id !== 'qualiwatt-default').map(a => (
                        <option key={a.id} value={a.id}>{a.nom}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bouton Nouvelle Adresse */}
                  {!newExpForm.showNewDestinationForm && (
                    <button
                      onClick={() => setNewExpForm({...newExpForm, showNewDestinationForm: true})}
                      className={`w-full py-2 border-2 border-dashed ${colors.accentBorder} rounded-lg text-sm font-semibold ${colors.accent} transition-all hover:${colors.accentBg}`}
                    >
                      + Créer nouvelle adresse de livraison
                    </button>
                  )}

                  {/* Formulaire Nouvelle Adresse */}
                  {newExpForm.showNewDestinationForm && (
                    <div className={`${colors.card} rounded-lg p-4 space-y-3`}>
                      <h4 className={`text-sm font-bold ${colors.text}`}>Créer Adresse de Livraison</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <input type="text" placeholder="Nom / Entreprise" value={newExpForm.newDestinationForm.nom} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, nom: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                        <input type="text" placeholder="Adresse" value={newExpForm.newDestinationForm.adresse} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, adresse: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                        <input type="text" placeholder="Code Postal" value={newExpForm.newDestinationForm.codePostal} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, codePostal: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                        <input type="text" placeholder="Ville" value={newExpForm.newDestinationForm.ville} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, ville: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                        <input type="text" placeholder="Contact" value={newExpForm.newDestinationForm.contact} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, contact: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                        <input type="tel" placeholder="Téléphone" value={newExpForm.newDestinationForm.tel} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, tel: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`} />
                        <input type="email" placeholder="Email" value={newExpForm.newDestinationForm.email} onChange={(e) => setNewExpForm({...newExpForm, newDestinationForm: {...newExpForm.newDestinationForm, email: e.target.value}})} className={`px-3 py-2 rounded-lg ${colors.input} border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 md:col-span-2`} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleAddDestination} className="flex-1 py-2 bg-emerald-500 text-white rounded text-sm font-semibold">Ajouter</button>
                        <button onClick={() => setNewExpForm({...newExpForm, showNewDestinationForm: false})} className={`flex-1 py-2 ${colors.card} rounded text-sm font-semibold`}>Annuler</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Boutons Action */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddExpedition}
                    disabled={!newExpForm.adresseDestinId}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Check className="inline w-4 h-4 mr-2" />
                    Créer Expédition
                  </button>
                  <button
                    onClick={() => setShowNewExpForm(false)}
                    className={`flex-1 py-3 ${colors.card} rounded-lg font-semibold transition-all`}
                  >
                    <X className="inline w-4 h-4 mr-2" />
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {/* Liste Expéditions */}
            <div className="space-y-4">
              {expeditions.length === 0 ? (
                <div className={`${colors.card} rounded-xl p-8 text-center`}>
                  <Package className={`w-12 h-12 ${colors.textSecondary} mx-auto mb-3 opacity-50`} />
                  <p className={colors.textSecondary}>Aucune expédition créée</p>
                </div>
              ) : (
                expeditions.map(exp => {
                  const origAdr = getAddressById(exp.adresseOriginId);
                  const destAdr = getAddressById(exp.adresseDestinId);
                  return (
                    <div key={exp.id} className={`${colors.card} rounded-xl p-5 space-y-3`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-bold ${colors.text}`}>{exp.reference}</h4>
                          <p className={`text-xs ${colors.textSecondary} mt-1`}>
                            📅 {exp.dateExpedition}
                            {exp.urgence && <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">🚨 URGENT</span>}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopyExpJson(exp)}
                          className={`p-2 rounded transition-all ${colors.card}`}
                          title="Copier JSON"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className={`text-xs ${colors.textSecondary} space-y-1 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-lg p-3`}>
                          <p className="font-bold text-emerald-600 dark:text-emerald-400">📦 Enlèvement</p>
                          <p>{origAdr?.nom}</p>
                          <p>{origAdr?.codePostal} {origAdr?.ville}</p>
                        </div>
                        <div className={`text-xs ${colors.textSecondary} space-y-1 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-lg p-3`}>
                          <p className="font-bold text-blue-600 dark:text-blue-400">📍 Livraison</p>
                          <p>{destAdr?.nom}</p>
                          <p>{destAdr?.codePostal} {destAdr?.ville}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3 text-xs">
                        <div className={`${colors.card} rounded p-2 text-center`}>
                          <p className={colors.textSecondary}>Palettes</p>
                          <p className={`font-bold ${colors.text}`}>{exp.palettes}</p>
                        </div>
                        <div className={`${colors.card} rounded p-2 text-center`}>
                          <p className={colors.textSecondary}>Premium</p>
                          <p className={`font-bold ${colors.text}`}>{exp.premium ? 'Oui' : 'Non'}</p>
                        </div>
                        <div className={`${colors.card} rounded p-2 text-center`}>
                          <p className={colors.textSecondary}>Target</p>
                          <p className={`font-bold ${colors.text}`}>{exp.target ? 'Oui' : 'Non'}</p>
                        </div>
                        <div className={`${colors.card} rounded p-2 text-center`}>
                          <p className={colors.textSecondary}>RDV</p>
                          <p className={`font-bold ${colors.text}`}>{exp.priseRdv ? 'Oui' : 'Non'}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteExpedition(exp.id)}
                        className={`w-full py-2 text-xs font-semibold transition-all hover:bg-red-500 hover:text-white ${colors.card} rounded`}
                      >
                        <Trash2 className="inline w-3 h-3 mr-1" />
                        Supprimer
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className={`border-t ${colors.card} mt-12`}>
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className={`text-sm ${colors.textSecondary}`}>
            🚀 XPO Qualiwatt Pro v3.0 • 96 Départements • Carnet d'Adresses • Gestion Complète
          </p>
        </div>
      </div>
    </div>
  );
}
