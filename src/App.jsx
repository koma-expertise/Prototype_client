import { useState, useCallback, useEffect, useRef } from "react";
import {
  Building2, Users, FileText, BarChart3,
  DollarSign, Calendar, MessageSquare, FolderOpen, CloudSun, Camera,
  ChevronRight, ChevronDown, ChevronUp, Bell, Search, Menu,
  CheckCircle2, Clock, AlertTriangle, AlertCircle,
  Home, Eye, Download, Upload,
  MapPin, Truck, Phone, Mail,
  FileCheck, Send, Filter,
  Activity, Target, TrendingUp, TrendingDown,
  HardHat, Boxes, Receipt, CreditCard,
  Video, Brain, Layers, Shield,
  Paperclip, Star, Info, X, ExternalLink,
  ArrowRight, ArrowUpRight, Circle, Zap,
  BarChart2, PieChart, Wallet, Banknote,
  CalendarDays, Hash, Image, FileWarning,
  Lock, Unlock, RefreshCw, PlayCircle,
  Package, ShoppingCart, AlertOctagon, Factory, Gauge
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — KOMA EXPERTISE
   Palette: #18B7D2 (cyan), #6BC0AA (sage), #1D1D1B (ink)
   ═══════════════════════════════════════════════════════ */
const T = {
  // Brand
  cyan: "#18B7D2",    cyanDk: "#0E95AD",   cyanLt: "#E6F7FA",  cyanBg: "#F0FAFB",
  sage: "#6BC0AA",    sageDk: "#4DA08B",   sageLt: "#EDF7F3",
  ink: "#1D1D1B",
  // Neutrals
  n900: "#111827", n800: "#1F2937", n700: "#374151", n600: "#4B5563",
  n500: "#6B7280", n400: "#9CA3AF", n300: "#D1D5DB", n200: "#E5E7EB",
  n100: "#F3F4F6", n50: "#F9FAFB", white: "#FFFFFF",
  // Semantic
  ok: "#059669",  okLt: "#D1FAE5",  okBg: "#ECFDF5",
  warn: "#D97706", warnLt: "#FEF3C7", warnBg: "#FFFBEB",
  err: "#DC2626",  errLt: "#FEE2E2",  errBg: "#FEF2F2",
  info: "#2563EB", infoLt: "#DBEAFE", infoBg: "#EFF6FF",
  purp: "#7C3AED", purpLt: "#EDE9FE",
  // Shadows
  sh1: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
  sh2: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
  sh3: "0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.04)",
  // Radius
  r8: 8, r12: 12, r16: 16, r20: 20, rFull: 999,
};

const fmt = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(".0", "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toString();
};

/* ═══════════════════════════════════════════════════════
   MOCK DATA — PROJET VILLA ÉDEN
   Toutes données cohérentes entre écrans
   ═══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "PRJ-001", nom: "Villa Éden", loc: "Douala, Bonamoussadi", typo: "Construction neuve",
    phase: 7, phaseLabel: "Construction", totalPhases: 8, statut: "Actif", av: 44, avPlanifie: 48,
    budget: 120e6, actualise: 123.5e6, engage: 68e6, facture: 52.8e6, paye: 44.4e6, resteAPayer: 79.1e6,
    spoc: "Marie Atangana", amoa: "S. Kamga", moe: "Arc. Njoya", moex: "BTP Cameroun SARL",
    livraison: "Juillet 2027", dateDebut: "Octobre 2025",
    risqueCout: "ok", risqueDelai: "warn", risqueQualite: "ok",
    surface: "280 m²", niveaux: "R+1", style: "Contemporain tropical",
    nbPieces: "6 pièces", terrain: "600 m²",
  },
  {
    id: "PRJ-006", nom: "Étude Géotechnique Kribi", loc: "Kribi", typo: "Études préliminaires",
    phase: 1, phaseLabel: "Pré-faisabilité", totalPhases: 3, statut: "Actif", av: 60, avPlanifie: 60,
    budget: 2.5e6, actualise: 2.5e6, engage: 1.2e6, facture: 0.8e6, paye: 0.8e6, resteAPayer: 1.7e6,
    spoc: "Marie Atangana", amoa: "S. Kamga", moe: "—", moex: "—",
    livraison: "Mai 2026", dateDebut: "Janvier 2026",
    risqueCout: "ok", risqueDelai: "ok", risqueQualite: "ok",
    surface: "—", niveaux: "—", style: "—", nbPieces: "—", terrain: "450 m²",
  },
];

const PHASES = ["Découverte", "Foncier", "Pré-faisabilité", "Conception", "Devis", "Financement", "Contractualisation", "Construction"];

const LOTS = [
  { code: "LOT I",    nom: "Travaux Préparatoires", reel: 100, planifie: 100, budget: 4.5e6,  facture: 4.5e6,  paye: 4.5e6 },
  { code: "LOT II",   nom: "Gros Œuvre",            reel: 72,  planifie: 80,  budget: 28.5e6, facture: 22.3e6, paye: 18.4e6 },
  { code: "LOT III",  nom: "Clos Couvert",          reel: 45,  planifie: 50,  budget: 12e6,   facture: 5.8e6,  paye: 5.8e6 },
  { code: "LOT IV",   nom: "Second Œuvre",           reel: 18,  planifie: 20,  budget: 15.6e6, facture: 2.1e6,  paye: 2.1e6 },
  { code: "LOT V",    nom: "Menuiseries",           reel: 5,   planifie: 10,  budget: 8.4e6,  facture: 0.4e6,  paye: 0.4e6 },
  { code: "LOT VI",   nom: "Plomberie & Sanitaire", reel: 0,   planifie: 0,   budget: 6.2e6,  facture: 0,      paye: 0 },
  { code: "LOT VII",  nom: "Électricité",           reel: 0,   planifie: 0,   budget: 5.8e6,  facture: 0,      paye: 0 },
  { code: "LOT VIII", nom: "Peinture & Finitions",  reel: 0,   planifie: 0,   budget: 7.1e6,  facture: 0,      paye: 0 },
  { code: "LOT IX",   nom: "Aménag. Extérieurs",    reel: 0,   planifie: 0,   budget: 3.9e6,  facture: 0,      paye: 0 },
];

const FACTURES = [
  { id: "FAC-001", objet: "Acompte Gros Œuvre — Lot II",          mt: 14250000, s: "Payée",     date: "15/02/2026", ech: "28/02/2026", lot: "Lot II",  lien: "Devis v3" },
  { id: "FAC-002", objet: "Études géotechniques",                  mt: 1750000,  s: "Payée",     date: "20/01/2026", ech: "05/02/2026", lot: "—",       lien: "ETU-001" },
  { id: "FAC-003", objet: "Approvisionnement matériaux Phase 2",   mt: 8400000,  s: "En attente", date: "10/04/2026", ech: "25/04/2026", lot: "Lot II",  lien: "DA-002" },
  { id: "FAC-004", objet: "Main d'œuvre — Mars 2026",              mt: 3200000,  s: "Validée",   date: "01/04/2026", ech: "15/04/2026", lot: "Lot II",  lien: "Lot II" },
  { id: "FAC-005", objet: "Frais AMOA — T1 2026",                  mt: 2800000,  s: "Payée",     date: "05/03/2026", ech: "20/03/2026", lot: "Global",  lien: "Contrat AMOA" },
];

const PAIEMENTS = [
  { date: "28/02/2026", ref: "FAC-001", objet: "Acompte Gros Œuvre",   mt: 14250000, mode: "Virement Connect" },
  { date: "05/02/2026", ref: "FAC-002", objet: "Études géotechniques", mt: 1750000,  mode: "Virement Connect" },
  { date: "20/03/2026", ref: "FAC-005", objet: "Frais AMOA T1",        mt: 2800000,  mode: "Virement Connect" },
];

const RAPPORTS = [
  { id: "RV-04-12", date: "12/04/2026", type: "Visite AMOA", auteur: "S. Kamga", org: "WeCare", meteo: "Ensoleillé 31°C", lot: "Lot II — Gros Œuvre", taches: "Inspection fondation, contrôle verticalité murs", photos: 12, statut: "Validé", resume: "Fondations conformes. Verticalité des murs vérifiée et dans les tolérances. Deux recommandations mineures identifiées sur le coffrage de la zone B.", recommandations: "Renforcer l'étaiement de la zone B avant coulage. Vérifier l'alignement du ferraillage sur les poteaux P4 à P7.", vigilance: true, lu: true },
  { id: "RJ-04-16", date: "16/04/2026", type: "Rapport journalier", auteur: "B. Ekambi", org: "BTP Cameroun", meteo: "Ensoleillé 33°C", lot: "Lot II — Gros Œuvre", taches: "Coffrage poteaux R+1 zone A", photos: 8, statut: "Validé", resume: "Coffrage des poteaux R+1 en cours dans la zone A. 18 ouvriers présents sur site. Coulage prévu jeudi 17 avril.", recommandations: "", vigilance: false, lu: false },
  { id: "RJ-04-15", date: "15/04/2026", type: "Rapport journalier", auteur: "B. Ekambi", org: "BTP Cameroun", meteo: "Nuageux 30°C", lot: "Lot II — Gros Œuvre", taches: "Ferraillage poteaux R+1, réception agrégats", photos: 6, statut: "Validé", resume: "Ferraillage avancé à 45%. Livraison de 30 m³ de sable et 100 barres de fer réceptionnée conforme.", recommandations: "", vigilance: false, lu: true },
  { id: "RJ-04-13", date: "13/04/2026", type: "Rapport journalier", auteur: "B. Ekambi", org: "BTP Cameroun", meteo: "Forte pluie 26°C", lot: "Lot II — Gros Œuvre", taches: "Arrêt partiel — pluie", photos: 3, statut: "Validé", resume: "Pluie forte le matin (42 mm). Reprise partielle à 14 h. 8 ouvriers présents. Journée partiellement justifiée comme intempérie.", recommandations: "", vigilance: true, lu: true },
];

const DOCUMENTS = [
  { nom: "Devis_V3_VillaEden_signée.pdf", cat: "Devis", type: "PDF", taille: "2.4 MB", date: "10/04/2026", auteur: "AMOA", version: "v3", statut: "Signé", action: null },
  { nom: "Rapport_visite_12-04-2026.pdf", cat: "Rapports", type: "PDF", taille: "8.1 MB", date: "12/04/2026", auteur: "AMOA", version: "v1", statut: "Validé", action: null },
  { nom: "Plans_APS_RDC_v2.dwg", cat: "Plans", type: "DWG", taille: "14 MB", date: "20/03/2026", auteur: "MOE", version: "v2", statut: "Validé", action: null },
  { nom: "Planning_Phase2.xlsx", cat: "Planning", type: "XLSX", taille: "1.8 MB", date: "01/04/2026", auteur: "AMOA", version: "v1", statut: "En vigueur", action: null },
  { nom: "Contrat_BTP_Cameroun.pdf", cat: "Contrats", type: "PDF", taille: "0.9 MB", date: "15/01/2026", auteur: "SPOC", version: "v1", statut: "Signé", action: null },
  { nom: "Photos_chantier_16-04.zip", cat: "Photos", type: "ZIP", taille: "45 MB", date: "16/04/2026", auteur: "MOEX", version: "—", statut: "Nouveau", action: "À consulter" },
  { nom: "Facture_FAC-003.pdf", cat: "Factures", type: "PDF", taille: "0.3 MB", date: "10/04/2026", auteur: "Système", version: "—", statut: "À payer", action: "À payer" },
];

const MESSAGES = [
  { id: 1, from: "Marie Atangana", role: "SPOC KOMA", avatar: "MA", objet: "Avancement chantier — coulage jeudi", preview: "Le coulage des poteaux R+1 est prévu jeudi. Nous avons anticipé la pluie de vendredi.", time: "16/04 14:22", unread: true, priority: true },
  { id: 2, from: "S. Kamga", role: "AMOA WeCare", avatar: "SK", objet: "Rapport de visite du 12/04", preview: "Le rapport de visite du 12/04 est disponible dans vos documents. RAS sur les fondations.", time: "12/04 18:30", unread: false, priority: false },
  { id: 3, from: "Marie Atangana", role: "SPOC KOMA", avatar: "MA", objet: "Facturation — FAC-003", preview: "Facture FAC-003 émise — 8,4M FCFA pour matériaux Phase 2. Échéance le 25/04.", time: "10/04 11:15", unread: false, priority: false },
  { id: 4, from: "Marie Atangana", role: "SPOC KOMA", avatar: "MA", objet: "Devis v3 validé — passage en construction", preview: "Devis v3 signé et validé. Le projet passe en phase construction. Félicitations !", time: "08/04 09:00", unread: false, priority: false },
];

const METEO = [
  { j: "Mer 16", jc: "Aujourd'hui", ic: "☀️", co: "Ensoleillé", tM: 33, tm: 23, pluie: 0, vent: 8, hum: 72, al: "vert", impact: "Aucun — conditions idéales pour les travaux" },
  { j: "Jeu 17", jc: "Demain", ic: "⛅", co: "Nuageux", tM: 31, tm: 22, pluie: 0, vent: 12, hum: 75, al: "vert", impact: "Aucun — coulage béton prévu ce jour" },
  { j: "Ven 18", jc: "", ic: "🌧️", co: "Forte pluie", tM: 27, tm: 21, pluie: 35, vent: 28, hum: 92, al: "rouge", impact: "Coffrage et coulage béton suspendus. Coulage avancé à jeudi par votre SPOC." },
  { j: "Sam 19", jc: "", ic: "🌦️", co: "Averses", tM: 28, tm: 21, pluie: 12, vent: 15, hum: 85, al: "orange", impact: "Travaux extérieurs ralentis — intérieurs possibles" },
  { j: "Dim 20", jc: "", ic: "⛅", co: "Nuageux", tM: 30, tm: 22, pluie: 2, vent: 10, hum: 78, al: "vert", impact: "Aucun" },
  { j: "Lun 21", jc: "", ic: "☀️", co: "Ensoleillé", tM: 34, tm: 23, pluie: 0, vent: 6, hum: 70, al: "vert", impact: "Aucun — conditions idéales" },
  { j: "Mar 22", jc: "", ic: "☀️", co: "Ensoleillé", tM: 35, tm: 24, pluie: 0, vent: 5, hum: 68, al: "vert", impact: "Aucun" },
];

const DECISIONS = [
  { id: 1, type: "Paiement", label: "Facture FAC-003 à régler", detail: "Matériaux Phase 2 (fer, sable, ciment). Nécessaire pour la poursuite du gros œuvre.", montant: "8 400 000 FCFA", urgence: "haute", deadline: "25/04/2026", impact: "Retard possible sur le lot II si non réglé avant le 25/04.", lien: "finances" },
  { id: 2, type: "Validation", label: "Choix de carrelage — Second Œuvre", detail: "3 options proposées par l'architecte pour le séjour et les chambres. Catalogue joint.", montant: null, urgence: "normale", deadline: "05/05/2026", impact: "Le MOE a besoin de votre choix pour finaliser la commande et respecter le planning.", lien: "documents" },
  { id: 3, type: "Lecture", label: "Nouveau rapport journalier 16/04", detail: "Coffrage poteaux R+1 — 8 photos jointes. Votre AMOA a validé ce rapport.", montant: null, urgence: "normale", deadline: null, impact: null, lien: "rapports" },
  { id: 4, type: "Information", label: "Alerte météo — vendredi 18/04", detail: "Forte pluie prévue (35 mm). Votre SPOC a anticipé : le coulage a été avancé à jeudi.", montant: null, urgence: "info", deadline: null, impact: "Aucun impact sur le planning global. Mesure préventive déjà prise.", lien: "meteo" },
];

const ACTIVITES = [
  { d: "16/04", msg: "Rapport journalier validé — coffrage poteaux R+1", icon: FileCheck, color: T.ok },
  { d: "15/04", msg: "Livraison 30 m³ sable + 100 barres fer réceptionnée", icon: Truck, color: T.cyan },
  { d: "12/04", msg: "Visite AMOA — fondations conformes — rapport dispo", icon: Eye, color: T.sage },
  { d: "10/04", msg: "Facture FAC-003 émise — 8,4M FCFA", icon: Receipt, color: T.warn },
  { d: "08/04", msg: "Devis v3 signé — passage en phase construction", icon: FileText, color: T.ok },
];

/* ═══════════════════════════════════════════════════════
   MOCK DATA — APPROVISIONNEMENTS CHANTIER
   ═══════════════════════════════════════════════════════ */
const MATERIAUX = [
  { id: "MAT-001", nom: "Ciment CEM II 42.5", lot: "Lot II", unite: "tonnes", prevu: 85, recu: 72, couverture: 85, statut: "Disponible", prochaineLiv: "17/04/2026", fournisseur: "CIMENCAM", critique: false },
  { id: "MAT-002", nom: "Fer à béton HA12", lot: "Lot II", unite: "barres", prevu: 1200, recu: 980, couverture: 82, statut: "Vigilance", prochaineLiv: "19/04/2026", fournisseur: "Aciéries du Cameroun", critique: true },
  { id: "MAT-003", nom: "Agglos creux 15", lot: "Lot II", unite: "unités", prevu: 8000, recu: 7200, couverture: 90, statut: "Disponible", prochaineLiv: "—", fournisseur: "BCD Matériaux", critique: false },
  { id: "MAT-004", nom: "Sable lavé 0/5", lot: "Lot II", unite: "m³", prevu: 120, recu: 105, couverture: 88, statut: "Disponible", prochaineLiv: "—", fournisseur: "Carrière Bonabéri", critique: false },
  { id: "MAT-005", nom: "Gravier concassé 5/15", lot: "Lot II", unite: "m³", prevu: 95, recu: 80, couverture: 84, statut: "Disponible", prochaineLiv: "21/04/2026", fournisseur: "Carrière Bonabéri", critique: false },
  { id: "MAT-006", nom: "Tôles bac alu 0.5mm", lot: "Lot III", unite: "feuilles", prevu: 180, recu: 90, couverture: 50, statut: "En cours d'approvisionnement", prochaineLiv: "28/04/2026", fournisseur: "Alu Technic", critique: false },
  { id: "MAT-007", nom: "Gaines ICTA 20mm", lot: "Lot VII", unite: "rouleaux", prevu: 45, recu: 0, couverture: 0, statut: "Commandé", prochaineLiv: "15/05/2026", fournisseur: "Schneider Cameroun", critique: false },
  { id: "MAT-008", nom: "Câbles électriques 2.5mm²", lot: "Lot VII", unite: "mètres", prevu: 2500, recu: 0, couverture: 0, statut: "Commandé", prochaineLiv: "15/05/2026", fournisseur: "Nexans Afrique", critique: false },
  { id: "MAT-009", nom: "Carreaux grès 60x60 gris", lot: "Lot VIII", unite: "m²", prevu: 320, recu: 0, couverture: 0, statut: "En rupture fournisseur", prochaineLiv: "Indéterminé", fournisseur: "Groupe Somocer", critique: true },
  { id: "MAT-010", nom: "Peinture acrylique blanc mat", lot: "Lot VIII", unite: "seaux 20L", prevu: 40, recu: 0, couverture: 0, statut: "Non commandé", prochaineLiv: "—", fournisseur: "—", critique: false },
  { id: "MAT-011", nom: "Tubes PVC 100mm", lot: "Lot VI", unite: "barres 4m", prevu: 60, recu: 0, couverture: 0, statut: "Non commandé", prochaineLiv: "—", fournisseur: "—", critique: false },
  { id: "MAT-012", nom: "Robinetterie salle de bain", lot: "Lot VI", unite: "kits", prevu: 6, recu: 0, couverture: 0, statut: "Non commandé", prochaineLiv: "—", fournisseur: "—", critique: false },
];

const COMMANDES = [
  { ref: "CMD-2026-014", fournisseur: "CIMENCAM", materiau: "Ciment CEM II 42.5 (15t)", statut: "En transit", datePrevue: "17/04/2026", dateReelle: null, ecart: null, montant: 1875000 },
  { ref: "CMD-2026-015", fournisseur: "Aciéries du Cameroun", materiau: "Fer HA12 (300 barres)", statut: "Confirmée", datePrevue: "19/04/2026", dateReelle: null, ecart: null, montant: 2400000 },
  { ref: "CMD-2026-016", fournisseur: "Carrière Bonabéri", materiau: "Gravier 5/15 (20 m³)", statut: "Confirmée", datePrevue: "21/04/2026", dateReelle: null, ecart: null, montant: 340000 },
  { ref: "CMD-2026-012", fournisseur: "Carrière Bonabéri", materiau: "Sable 0/5 (30 m³)", statut: "Reçue", datePrevue: "15/04/2026", dateReelle: "15/04/2026", ecart: "0j", montant: 480000 },
  { ref: "CMD-2026-013", fournisseur: "Aciéries du Cameroun", materiau: "Fer HA12 (100 barres)", statut: "Reçue", datePrevue: "14/04/2026", dateReelle: "15/04/2026", ecart: "+1j", montant: 800000 },
  { ref: "CMD-2026-017", fournisseur: "Alu Technic", materiau: "Tôles bac alu (90 feuilles)", statut: "Commandée", datePrevue: "28/04/2026", dateReelle: null, ecart: null, montant: 1620000 },
  { ref: "CMD-2026-018", fournisseur: "Schneider Cameroun", materiau: "Gaines ICTA + câbles élec.", statut: "Commandée", datePrevue: "15/05/2026", dateReelle: null, ecart: null, montant: 1250000 },
  { ref: "CMD-2026-010", fournisseur: "BCD Matériaux", materiau: "Agglos creux 15 (4000 u.)", statut: "Reçue", datePrevue: "08/04/2026", dateReelle: "08/04/2026", ecart: "0j", montant: 1600000 },
];

const ALERTES_APPRO = [
  { niveau: "rouge", materiau: "Carreaux grès 60x60 gris", lot: "Lot VIII — Finitions", consequence: "Le lancement des travaux de finitions pourrait être retardé si le fournisseur ne confirme pas de date.", action: "Votre SPOC négocie une alternative avec un fournisseur local. Arbitrage à prévoir sous 10 jours." },
  { niveau: "orange", materiau: "Fer à béton HA12", lot: "Lot II — Gros Œuvre", consequence: "Stock estimé à 4 jours de travail. Livraison de 300 barres confirmée pour le 19/04.", action: "Aucune action de votre part. KOMA surveille et a sécurisé la commande complémentaire." },
  { niveau: "vert", materiau: "Ciment CEM II 42.5", lot: "Lot II — Gros Œuvre", consequence: "Livraison de 15 tonnes en transit, arrivée prévue demain 17/04.", action: "Risque neutralisé. Approvisionnement conforme au planning." },
];

const ETAPES_APPRO = [
  { etape: "Fondations", avAppro: 100, avChantier: 100, materiauxPrincipaux: "Ciment, fer HA10, sable, gravier, agglos", risque: "vert", detail: "Tous les matériaux ont été livrés et consommés. Aucune alerte." },
  { etape: "Gros Œuvre", avAppro: 82, avChantier: 72, materiauxPrincipaux: "Ciment, fer HA12, sable, gravier, agglos 15, bois coffrage", risque: "orange", detail: "Vigilance sur le fer HA12 (stock à 4 jours). Livraison complémentaire le 19/04." },
  { etape: "Clos Couvert", avAppro: 50, avChantier: 45, materiauxPrincipaux: "Tôles alu, charpente bois, menuiseries extérieures", risque: "vert", detail: "Tôles en cours de livraison. Charpente prévue pour mai." },
  { etape: "Second Œuvre", avAppro: 0, avChantier: 18, materiauxPrincipaux: "Tubes PVC, câbles, gaines, robinetterie", risque: "vert", detail: "Commandes passées pour les lots VI et VII. Livraisons prévues mi-mai." },
  { etape: "Finitions", avAppro: 0, avChantier: 0, materiauxPrincipaux: "Carreaux, peinture, faïence, quincaillerie", risque: "rouge", detail: "Rupture fournisseur sur carreaux 60x60. Alternative en cours de négociation." },
];

const DOCS_APPRO = [
  { nom: "BC_CMD-2026-014_CIMENCAM.pdf", cat: "Bon de commande", date: "14/04/2026", taille: "0.2 MB" },
  { nom: "BL_Sable_15-04-2026.pdf", cat: "Bon de livraison", date: "15/04/2026", taille: "0.3 MB" },
  { nom: "BL_Fer_HA12_15-04-2026.pdf", cat: "Bon de livraison", date: "15/04/2026", taille: "0.3 MB" },
  { nom: "FicheQualite_Ciment_CEM42.5.pdf", cat: "Fiche qualité", date: "10/04/2026", taille: "1.1 MB" },
  { nom: "Rapport_Stock_Mensuel_Mars2026.pdf", cat: "Rapport mensuel", date: "02/04/2026", taille: "2.4 MB" },
  { nom: "Photos_Reception_Agglos_08-04.zip", cat: "Photos réception", date: "08/04/2026", taille: "18 MB" },
];

/* ═══════════════════════════════════════════════════════
   UI PRIMITIVES
   ═══════════════════════════════════════════════════════ */
const badgeStyles = {
  default:  { bg: T.cyanLt, color: T.cyanDk },
  success:  { bg: T.okLt, color: T.ok },
  warning:  { bg: T.warnLt, color: T.warn },
  danger:   { bg: T.errLt, color: T.err },
  info:     { bg: T.infoLt, color: T.info },
  neutral:  { bg: T.n100, color: T.n700 },
  purple:   { bg: T.purpLt, color: T.purp },
};

function Badge({ children, v = "default", dot }) {
  const s = badgeStyles[v] || badgeStyles.default;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: T.rFull, fontSize: 10, fontWeight: 600, background: s.bg, color: s.color, letterSpacing: 0.2, whiteSpace: "nowrap" }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color }} />}
      {children}
    </span>
  );
}

function StatusBadge({ s }) {
  const map = { "En attente": "warning", "Actif": "success", "Validée": "success", "Payée": "success", "Validé": "success", "En cours": "info", "Nouveau": "info", "Signé": "success", "En vigueur": "success", "À payer": "danger", "À consulter": "info" };
  return <Badge v={map[s] || "default"} dot>{s}</Badge>;
}

function Progress({ value, h = 6, color, bg, animated }) {
  const c = color || (value >= 80 ? T.ok : value >= 40 ? T.cyan : T.warn);
  return (
    <div style={{ width: "100%", background: bg || T.n100, borderRadius: T.rFull, height: h, overflow: "hidden", position: "relative" }}>
      <div style={{ width: Math.min(100, value) + "%", height: "100%", borderRadius: T.rFull, background: c, transition: "width 0.6s ease" }} />
    </div>
  );
}

function Card({ children, style: ext, onClick, hover, accent }) {
  const [hovered, setH] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: T.white, borderRadius: T.r16, padding: 22,
        border: `1px solid ${T.n200}`,
        boxShadow: hovered ? T.sh2 : T.sh1,
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-1px)" : "none",
        borderTop: accent ? `3px solid ${accent}` : undefined,
        ...ext,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, v = "primary", icon: Ic, onClick, size = "md", full }) {
  const isPri = v === "primary";
  const isGhost = v === "ghost";
  const sz = size === "sm" ? { p: "6px 12px", fs: 11 } : size === "lg" ? { p: "10px 20px", fs: 13 } : { p: "8px 16px", fs: 12 };
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: T.r8, fontWeight: 600, cursor: "pointer", fontSize: sz.fs, padding: sz.p, width: full ? "100%" : "auto",
      background: isPri ? T.cyan : isGhost ? "transparent" : T.n50,
      color: isPri ? "#fff" : isGhost ? T.cyan : T.n700,
      border: isGhost ? `1px solid ${T.n200}` : isPri ? "none" : `1px solid ${T.n200}`,
      transition: "all 0.15s",
    }}>
      {Ic && <Ic size={sz.fs} />}
      {children}
    </button>
  );
}

function SectionTitle({ children, sub, action, actionLabel, onAction }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 4 }}>
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, margin: 0, lineHeight: 1.3 }}>{children}</h3>
        {sub && <p style={{ fontSize: 11, color: T.n500, margin: "2px 0 0", lineHeight: 1.4 }}>{sub}</p>}
      </div>
      {actionLabel && <Btn v="ghost" size="sm" onClick={onAction} icon={action}>{actionLabel}</Btn>}
    </div>
  );
}

function InfoBanner({ children, type = "info", icon: Ic }) {
  const styles = {
    info: { bg: T.cyanBg, border: T.cyan + "22", color: T.cyanDk, ic: T.cyan },
    warn: { bg: T.warnBg, border: T.warn + "22", color: T.n800, ic: T.warn },
    err:  { bg: T.errBg,  border: T.err + "22",  color: T.n800, ic: T.err },
    ok:   { bg: T.okBg,   border: T.ok + "22",   color: T.n800, ic: T.ok },
  };
  const s = styles[type];
  const Icon = Ic || (type === "err" ? AlertCircle : type === "warn" ? AlertTriangle : Info);
  return (
    <div style={{ display: "flex", gap: 10, padding: "12px 16px", borderRadius: T.r12, background: s.bg, border: `1px solid ${s.border}` }}>
      <Icon size={16} color={s.ic} style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ fontSize: 12, color: s.color, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function MetricCard({ label, value, sub, icon: Ic, color, accent }) {
  return (
    <Card style={{ padding: 16, textAlign: "center", borderTop: accent ? `3px solid ${accent}` : undefined }}>
      {Ic && <div style={{ width: 32, height: 32, borderRadius: T.r8, background: (color || T.cyan) + "10", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Ic size={15} color={color || T.cyan} /></div>}
      <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: color || T.ink, marginTop: 2 }}>{value}</div>
      {sub && <div style={{ fontSize: 9, color: T.n400, marginTop: 2 }}>{sub}</div>}
    </Card>
  );
}

function Avatar({ name, color, size = 32 }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: (color || T.cyan) + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 700, color: color || T.cyan, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function SanteRow({ label, status, detail }) {
  const cfg = { ok: { c: T.ok, l: "Conforme", ic: CheckCircle2 }, warn: { c: T.warn, l: "Attention", ic: AlertTriangle }, err: { c: T.err, l: "Critique", ic: AlertCircle } };
  const s = cfg[status] || cfg.ok;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: T.r8, background: s.c + "06" }}>
      <s.ic size={14} color={s.c} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{label}</span>
          <Badge v={status === "ok" ? "success" : status === "warn" ? "warning" : "danger"}>{s.l}</Badge>
        </div>
        {detail && <div style={{ fontSize: 10, color: T.n500, marginTop: 2 }}>{detail}</div>}
      </div>
    </div>
  );
}

function Table({ cols, data }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: T.r12, border: `1px solid ${T.n200}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ background: T.n50 }}>
            {cols.map((c, i) => (
              <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: T.n500, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.4, borderBottom: `1px solid ${T.n200}` }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r, ri) => (
            <tr key={ri} style={{ borderBottom: ri < data.length - 1 ? `1px solid ${T.n100}` : "none" }}>
              {cols.map((c, ci) => (
                <td key={ci} style={{ padding: "10px 14px", color: T.n700 }}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { k: "accueil",    l: "Mon Projet",     i: Home },
  { k: "decisions",  l: "Décisions",      i: Zap },
  { k: "avancement", l: "Avancement",     i: Activity },
  { k: "finances",   l: "Finances",       i: Wallet },
  { k: "appro",      l: "Approvisionnements", i: Package },
  { k: "documents",  l: "Documents",      i: FolderOpen },
  { k: "rapports",   l: "Rapports",       i: FileCheck },
  { k: "messages",   l: "Messages",       i: MessageSquare },
  { k: "live",       l: "Chantier Live",  i: Video },
  { k: "meteo",      l: "Météo Chantier", i: CloudSun },
];

function Sidebar({ nav, onNav, onToggle, open }) {
  const decisionsCount = DECISIONS.filter(d => d.urgence === "haute").length;
  const msgsCount = MESSAGES.filter(m => m.unread).length;
  return (
    <div style={{
      width: open ? 240 : 68, minHeight: "100vh",
      background: `linear-gradient(180deg, ${T.ink} 0%, #262624 100%)`,
      color: "#fff", display: "flex", flexDirection: "column", flexShrink: 0,
      transition: "width 0.25s ease", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 68 }}>
        <div style={{ width: 36, height: 36, borderRadius: T.r12, background: `linear-gradient(135deg, ${T.cyan} 0%, ${T.sage} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, flexShrink: 0, letterSpacing: -1 }}>K</div>
        {open && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3 }}>KOMA</div>
            <div style={{ fontSize: 8, color: T.sage, textTransform: "uppercase", letterSpacing: 2, marginTop: -1 }}>Expertise</div>
          </div>
        )}
      </div>

      {open && <div style={{ padding: "12px 16px 6px", fontSize: 8, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600 }}>Navigation</div>}

      {/* Menu items */}
      <div style={{ padding: "4px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(it => {
          const isAct = nav === it.k;
          const badge = it.k === "decisions" ? decisionsCount : it.k === "messages" ? msgsCount : it.k === "appro" ? ALERTES_APPRO.filter(a => a.niveau === "rouge").length : 0;
          return (
            <button key={it.k} onClick={() => onNav(it.k)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: open ? "10px 14px" : "10px 0",
              justifyContent: open ? "flex-start" : "center",
              borderRadius: T.r8, border: "none", cursor: "pointer", width: "100%",
              background: isAct ? `linear-gradient(135deg, ${T.cyan}20 0%, ${T.sage}15 100%)` : "transparent",
              color: isAct ? T.sage : "rgba(255,255,255,0.45)",
              fontSize: 12, fontWeight: isAct ? 600 : 400, textAlign: "left",
              transition: "all 0.15s",
              position: "relative",
              borderLeft: isAct ? `3px solid ${T.sage}` : "3px solid transparent",
            }}>
              <it.i size={16} style={{ flexShrink: 0 }} />
              {open && <span style={{ flex: 1 }}>{it.l}</span>}
              {badge > 0 && (
                <div style={{
                  position: open ? "relative" : "absolute", top: open ? "auto" : 4, right: open ? "auto" : 8,
                  width: 18, height: 18, borderRadius: "50%", background: T.err,
                  color: "#fff", fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{badge}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Client card */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.cyan} 0%, ${T.sage} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>JF</div>
          {open && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Jean-Pierre Fouda</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>2 projets actifs</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 1: MON PROJET
   ═══════════════════════════════════════════════════════ */
function PageAccueil({ onNav }) {
  const p = PROJECTS[0];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* HERO */}
      <div style={{ borderRadius: T.r20, overflow: "hidden", position: "relative", background: `linear-gradient(135deg, ${T.ink} 0%, #2a3a4a 50%, ${T.cyanDk} 100%)`, padding: "28px 32px", color: "#fff" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: `radial-gradient(ellipse at 80% 30%, ${T.cyan}15 0%, transparent 70%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Badge v="success" dot>En cours</Badge>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Phase {p.phase}/{p.totalPhases} — {p.phaseLabel}</span>
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: -0.5 }}>{p.nom}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} />{p.loc}</span>
                <span>{p.typo}</span>
                <span>{p.surface} · {p.niveaux}</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Livraison estimée : <b style={{ color: "rgba(255,255,255,0.9)" }}>{p.livraison}</b></div>
            </div>
            <div style={{ textAlign: "right", paddingTop: 8 }}>
              <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>{p.av}<span style={{ fontSize: 20, fontWeight: 600 }}>%</span></div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>d'avancement global</div>
              <div style={{ width: 140, marginTop: 8 }}>
                <Progress value={p.av} h={4} color={T.sage} bg="rgba(255,255,255,0.12)" />
              </div>
            </div>
          </div>

          {/* Phase stepper */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 24, gap: 0 }}>
            {PHASES.map((ph, i) => {
              const done = i < p.phase - 1;
              const act = i === p.phase - 1;
              return (
                <div key={i} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                  {i > 0 && <div style={{ position: "absolute", top: 11, right: "50%", width: "100%", height: 2, background: done ? T.sage + "60" : "rgba(255,255,255,0.08)", zIndex: 0 }} />}
                  <div style={{
                    width: act ? 24 : 20, height: act ? 24 : 20, borderRadius: "50%", margin: "0 auto",
                    background: done ? T.sage : act ? T.cyan : "rgba(255,255,255,0.08)",
                    border: act ? `2px solid ${T.cyan}` : "none",
                    color: done || act ? "#fff" : "rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 8, fontWeight: 700, zIndex: 1, position: "relative",
                    boxShadow: act ? `0 0 12px ${T.cyan}40` : "none",
                  }}>
                    {done ? <CheckCircle2 size={10} /> : i + 1}
                  </div>
                  <div style={{ fontSize: 7, marginTop: 4, fontWeight: act ? 700 : 400, color: done || act ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)" }}>{ph}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SANTÉ DU PROJET */}
      <Card>
        <SectionTitle sub="Vue synthétique de la performance de votre projet">Santé du projet</SectionTitle>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <SanteRow label="Coûts" status={p.risqueCout} detail="Budget à +2,9% du prévisionnel — dans les seuils acceptables" />
          <SanteRow label="Délais" status={p.risqueDelai} detail="5 jours de retard cumulé dont 3 justifiés (intempéries)" />
          <SanteRow label="Qualité" status={p.risqueQualite} detail="Aucune non-conformité signalée — dernière visite AMOA le 12/04" />
        </div>
      </Card>

      {/* ACTIONS REQUISES */}
      {DECISIONS.filter(d => d.urgence === "haute").length > 0 && (
        <Card accent={T.err} style={{ background: T.errBg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.err + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={14} color={T.err} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.err }}>Action requise</div>
              <div style={{ fontSize: 10, color: T.n600 }}>Éléments nécessitant votre intervention</div>
            </div>
          </div>
          {DECISIONS.filter(d => d.urgence === "haute").map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: T.r12, background: T.white, marginBottom: 6, border: `1px solid ${T.n200}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{d.label}</div>
                <div style={{ fontSize: 11, color: T.n500, marginTop: 2 }}>{d.detail}</div>
                {d.montant && <div style={{ fontSize: 12, fontWeight: 700, color: T.err, marginTop: 4 }}>{d.montant}</div>}
                {d.deadline && <div style={{ fontSize: 10, color: T.n400, marginTop: 2 }}>Échéance : {d.deadline}</div>}
              </div>
              <Btn onClick={() => onNav(d.lien)} icon={ArrowRight}>Traiter</Btn>
            </div>
          ))}
        </Card>
      )}

      {/* KPIs FINANCIERS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <MetricCard label="Budget actualisé" value={fmt(p.actualise)} sub="FCFA" icon={Target} color={T.ink} />
        <MetricCard label="Engagé" value={fmt(p.engage)} sub={`${((p.engage/p.actualise)*100).toFixed(0)}% du budget`} icon={Banknote} color={T.info} />
        <MetricCard label="Payé" value={fmt(p.paye)} sub={`${((p.paye/p.actualise)*100).toFixed(0)}% du budget`} icon={CheckCircle2} color={T.ok} />
        <MetricCard label="Reste à payer" value={fmt(p.resteAPayer)} sub="FCFA" icon={Clock} color={T.warn} accent={T.warn} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* DERNIÈRES ACTIVITÉS */}
        <Card>
          <SectionTitle sub="Les derniers événements sur votre projet">Activité récente</SectionTitle>
          <div style={{ marginTop: 12 }}>
            {ACTIVITES.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < ACTIVITES.length - 1 ? `1px solid ${T.n100}` : "none" }}>
                <div style={{ width: 30, height: 30, borderRadius: T.r8, background: a.color + "0D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><a.icon size={13} color={a.color} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: T.ink, lineHeight: 1.4 }}>{a.msg}</div>
                </div>
                <span style={{ fontSize: 9, color: T.n400, flexShrink: 0, marginTop: 2 }}>{a.d}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* INTERVENANTS */}
        <Card>
          <SectionTitle sub="L'équipe qui pilote votre projet">Vos intervenants</SectionTitle>
          <div style={{ marginTop: 12 }}>
            {[
              { role: "SPOC", desc: "Votre interlocuteur unique", nom: p.spoc, org: "KOMA Expertise", c: T.cyan, main: true },
              { role: "AMOA", desc: "Assistance maîtrise d'ouvrage", nom: p.amoa, org: "WeCare", c: T.sage },
              { role: "MOE", desc: "Architecte & conception", nom: p.moe, org: "Njoya Architecture", c: T.purp },
              { role: "MOEX", desc: "Entreprise de construction", nom: p.moex, org: "BTP Cameroun", c: T.warn },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: T.r12, background: a.main ? T.cyanBg : "transparent", marginBottom: 4, border: a.main ? `1px solid ${T.cyan}15` : "none" }}>
                <Avatar name={a.nom} color={a.c} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{a.nom}</span>
                    <Badge v={a.main ? "default" : "neutral"}>{a.role}</Badge>
                  </div>
                  <div style={{ fontSize: 10, color: T.n500, marginTop: 1 }}>{a.desc} — {a.org}</div>
                </div>
                {a.main && <Btn v="ghost" size="sm" icon={MessageSquare} onClick={() => onNav("messages")}>Contacter</Btn>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* RÉSUMÉ IA */}
      <Card style={{ background: `linear-gradient(135deg, ${T.cyanBg} 0%, ${T.sageLt} 100%)`, border: `1px solid ${T.cyan}15` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.cyan} 0%, ${T.sage} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}><Brain size={15} color="#fff" /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>Résumé de votre projet</div>
            <div style={{ fontSize: 10, color: T.n500 }}>Synthèse en langage simple, mise à jour le 16/04/2026</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: T.n800, lineHeight: 1.9, padding: "0 4px" }}>
          Votre projet <b>Villa Éden</b> avance conformément aux prévisions. Les fondations sont terminées et le gros œuvre est à <b>72 %</b>. L'équipe travaille sur le <b>coffrage des poteaux du 1ᵉʳ étage</b>, avec un coulage de béton prévu <b>jeudi 17 avril</b>.
          <br /><br />
          <span style={{ color: T.warn }}>⚠</span> <b>Point d'attention</b> : une forte pluie est annoncée vendredi 18/04 (35 mm). Votre SPOC Marie Atangana a anticipé en avançant le coulage à jeudi. <b style={{ color: T.ok }}>Aucun impact sur le planning global.</b>
          <br /><br />
          Côté finances, <b>44 % du budget est consommé pour 44 % d'avancement</b> : c'est parfaitement aligné. Votre prochaine action : <b style={{ color: T.err }}>régler la facture FAC-003</b> (8,4M FCFA, échéance 25/04).
        </div>
      </Card>

      {/* PROCHAINES ÉCHÉANCES */}
      <Card>
        <SectionTitle sub="Les prochains jalons de votre projet">Prochaines échéances</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 12 }}>
          {[
            { date: "17/04", label: "Coulage béton poteaux R+1", cat: "Chantier", c: T.cyan },
            { date: "25/04", label: "Échéance facture FAC-003", cat: "Finances", c: T.err },
            { date: "05/05", label: "Choix carrelage à valider", cat: "Décision", c: T.warn },
          ].map((e, i) => (
            <div key={i} style={{ padding: "14px 16px", borderRadius: T.r12, background: T.n50, borderLeft: `3px solid ${e.c}` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.ink }}>{e.date.split("/")[0]}</div>
              <div style={{ fontSize: 9, color: T.n400, marginBottom: 6 }}>{e.date.split("/")[1] === "04" ? "Avril" : "Mai"} 2026</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.ink }}>{e.label}</div>
              <Badge v="neutral">{e.cat}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 2: DÉCISIONS
   ═══════════════════════════════════════════════════════ */
function PageDecisions({ onNav }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? DECISIONS : DECISIONS.filter(d => d.type.toLowerCase() === filter);

  const urgStyle = { haute: { bg: T.errBg, border: T.err, badge: "danger", label: "Urgent" }, normale: { bg: T.white, border: T.cyan, badge: "default", label: "À faire" }, info: { bg: T.infoBg, border: T.info, badge: "info", label: "Information" } };
  const typeIcon = { Paiement: CreditCard, Validation: CheckCircle2, Lecture: Eye, Information: Info };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Centre de Décisions</h2>
        <p style={{ fontSize: 12, color: T.n500, margin: "4px 0 0" }}>Tout ce qui attend votre attention, classé par priorité</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { l: "Urgent", n: DECISIONS.filter(d => d.urgence === "haute").length, c: T.err },
          { l: "À traiter", n: DECISIONS.filter(d => d.urgence === "normale").length, c: T.cyan },
          { l: "Information", n: DECISIONS.filter(d => d.urgence === "info").length, c: T.info },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "12px 16px", borderRadius: T.r12, background: s.c + "08", border: `1px solid ${s.c}15`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 11, color: T.n600, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6 }}>
        {[{ k: "all", l: "Tout" }, { k: "paiement", l: "Paiements" }, { k: "validation", l: "Validations" }, { k: "lecture", l: "Lectures" }, { k: "information", l: "Infos" }].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{ padding: "6px 14px", borderRadius: T.rFull, fontSize: 11, fontWeight: filter === f.k ? 600 : 400, border: `1px solid ${filter === f.k ? T.cyan : T.n200}`, background: filter === f.k ? T.cyanLt : T.white, color: filter === f.k ? T.cyanDk : T.n600, cursor: "pointer" }}>{f.l}</button>
        ))}
      </div>

      {/* Decision cards */}
      {filtered.map(d => {
        const us = urgStyle[d.urgence] || urgStyle.info;
        const Ic = typeIcon[d.type] || Info;
        return (
          <Card key={d.id} style={{ background: us.bg, borderLeft: `4px solid ${us.border}`, padding: 0 }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <Badge v={us.badge} dot>{us.label}</Badge>
                    <Badge v="neutral"><Ic size={10} style={{ marginRight: 3 }} />{d.type}</Badge>
                    {d.deadline && <span style={{ fontSize: 10, color: T.n400 }}>Échéance : {d.deadline}</span>}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 12, color: T.n600, lineHeight: 1.6 }}>{d.detail}</div>
                  {d.montant && <div style={{ fontSize: 14, fontWeight: 800, color: T.ink, marginTop: 8, padding: "6px 12px", background: T.white, borderRadius: T.r8, display: "inline-block", border: `1px solid ${T.n200}` }}>{d.montant}</div>}
                  {d.impact && <div style={{ fontSize: 11, color: T.n500, marginTop: 8, padding: "8px 12px", borderRadius: T.r8, background: "rgba(255,255,255,0.6)", borderLeft: `3px solid ${T.warn}` }}><b>Impact :</b> {d.impact}</div>}
                </div>
                <div style={{ marginLeft: 16, flexShrink: 0 }}>
                  <Btn onClick={() => onNav(d.lien)} icon={ArrowRight}>{d.type === "Paiement" ? "Payer" : d.type === "Validation" ? "Valider" : "Consulter"}</Btn>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 3: AVANCEMENT
   ═══════════════════════════════════════════════════════ */
function PageAvancement() {
  const p = PROJECTS[0];
  const ecart = p.av - p.avPlanifie;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Avancement du Projet</h2>

      {/* Bandeau explication */}
      <InfoBanner type={ecart >= 0 ? "ok" : "warn"} icon={ecart >= 0 ? CheckCircle2 : AlertTriangle}>
        <b>Phase Construction</b> (étape {p.phase}/{p.totalPhases}). Avancement réel : <b>{p.av} %</b> contre <b>{p.avPlanifie} % planifié</b>.
        {ecart < 0 ? ` L'écart de ${Math.abs(ecart)} points s'explique par 3 jours d'arrêt météo en avril, justifiés et sans impact sur la livraison finale.` : " Votre projet est parfaitement dans les temps."}
      </InfoBanner>

      {/* KPIs avancement */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <MetricCard label="Avancement réel" value={`${p.av}%`} icon={Activity} color={T.cyan} />
        <MetricCard label="Planifié" value={`${p.avPlanifie}%`} icon={Target} color={T.n500} />
        <MetricCard label="Écart" value={`${ecart > 0 ? "+" : ""}${ecart} pts`} icon={ecart >= 0 ? TrendingUp : TrendingDown} color={ecart >= 0 ? T.ok : T.warn} />
        <MetricCard label="Projection livraison" value={p.livraison} icon={CalendarDays} color={T.ink} />
      </div>

      {/* Timeline jalons */}
      <Card>
        <SectionTitle sub="Les grandes étapes de votre projet de la conception à la livraison">Jalons du projet</SectionTitle>
        <div style={{ marginTop: 14, position: "relative", paddingLeft: 24 }}>
          <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: T.n200 }} />
          {[
            { date: "Oct 2025", label: "Démarrage — Études & Pré-faisabilité", s: "done", detail: "Études de sol, relevés, dossier foncier" },
            { date: "Jan 2026", label: "Conception technique (APS / APD)", s: "done", detail: "Plans architecturaux validés par l'architecte" },
            { date: "Mars 2026", label: "Devis v3 signé — Contractualisation", s: "done", detail: "Budget gelé, entreprises sélectionnées" },
            { date: "Avr 2026", label: "Gros œuvre — Poteaux R+1 en cours", s: "current", detail: "Coffrage, ferraillage, coulage béton" },
            { date: "Juil 2026", label: "Fin Gros Œuvre + Clos Couvert", s: "future", detail: "Toiture, menuiseries extérieures" },
            { date: "Nov 2026", label: "Second œuvre + Finitions", s: "future", detail: "Plomberie, électricité, peinture, carrelage" },
            { date: "Juil 2027", label: "Livraison & réception", s: "future", detail: "Vérification finale, remise des clés, DOE" },
          ].map((j, i) => {
            const c = j.s === "done" ? T.ok : j.s === "current" ? T.cyan : T.n300;
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", left: -18, top: 4, width: 12, height: 12, borderRadius: "50%", background: c, border: j.s === "current" ? `3px solid ${T.cyan}30` : "none", boxShadow: j.s === "current" ? `0 0 8px ${T.cyan}30` : "none", zIndex: 1 }} />
                <div style={{ minWidth: 80 }}><span style={{ fontSize: 10, color: T.n400, fontWeight: 600 }}>{j.date}</span></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: j.s === "current" ? 700 : 500, color: j.s === "future" ? T.n400 : T.ink }}>{j.label}</span>
                    {j.s === "current" && <Badge v="default" dot>En cours</Badge>}
                    {j.s === "done" && <Badge v="success">Terminé</Badge>}
                  </div>
                  <div style={{ fontSize: 11, color: T.n500, marginTop: 2 }}>{j.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Lots */}
      <Card>
        <SectionTitle sub="Comparaison réel vs planifié pour chaque corps de métier">Avancement par lot</SectionTitle>
        <div style={{ marginTop: 14 }}>
          {LOTS.map((l, i) => {
            const ecartLot = l.reel - l.planifie;
            const isActive = l.reel > 0 && l.reel < 100;
            return (
              <div key={i} style={{ padding: "12px 14px", borderRadius: T.r12, background: isActive ? T.cyanBg : T.n50, marginBottom: 6, border: isActive ? `1px solid ${T.cyan}15` : `1px solid ${T.n100}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{l.code}</span>
                    <span style={{ fontSize: 12, color: T.n600 }}>{l.nom}</span>
                    {l.reel === 100 && <Badge v="success">Terminé</Badge>}
                    {isActive && <Badge v="default" dot>En cours</Badge>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {ecartLot !== 0 && l.planifie > 0 && (
                      <span style={{ fontSize: 10, fontWeight: 600, color: ecartLot >= 0 ? T.ok : T.err }}>{ecartLot > 0 ? "+" : ""}{ecartLot} pts</span>
                    )}
                    <span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{l.reel}%</span>
                  </div>
                </div>
                <div style={{ position: "relative", height: 8, background: T.n200, borderRadius: T.rFull }}>
                  {l.planifie > 0 && <div style={{ position: "absolute", left: `${l.planifie}%`, top: -2, bottom: -2, width: 2, background: T.n400, borderRadius: 1, zIndex: 2 }} />}
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", borderRadius: T.rFull, width: `${l.reel}%`, background: l.reel >= l.planifie ? T.ok : l.reel >= l.planifie * 0.85 ? T.warn : T.err, transition: "width 0.4s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: T.n400 }}>
                  <span>Réel : {l.reel}%</span>
                  <span>Planifié : {l.planifie}%</span>
                  <span>Budget : {fmt(l.budget)} FCFA</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 4: FINANCES
   ═══════════════════════════════════════════════════════ */
function PageFinances() {
  const p = PROJECTS[0];
  const budgetVar = ((p.actualise - p.budget) / p.budget * 100).toFixed(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Suivi Financier</h2>

      <InfoBanner type="info">
        Votre budget initial était de <b>120M FCFA</b>. Après ajustements techniques validés (renforcement fondation zone B, prix ciment révisé), le budget actualisé est de <b>123,5M FCFA</b> (+{budgetVar} %). Vous avez payé <b>44,4M</b> à ce jour.
      </InfoBanner>

      {/* Métriques */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Budget initial → Actualisé</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: T.ink }}>{fmt(p.actualise)}</span>
            <span style={{ fontSize: 11, color: T.warn, fontWeight: 600 }}>+{budgetVar}%</span>
          </div>
          <div style={{ fontSize: 10, color: T.n400, marginTop: 2 }}>Initial : {fmt(p.budget)} FCFA</div>
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Payé / Engagé</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: T.ok }}>{fmt(p.paye)}</span>
            <span style={{ fontSize: 11, color: T.n400 }}>sur {fmt(p.engage)} engagés</span>
          </div>
          <div style={{ marginTop: 8 }}><Progress value={(p.paye / p.actualise) * 100} h={5} color={T.ok} /></div>
          <div style={{ fontSize: 10, color: T.n400, marginTop: 4 }}>{((p.paye / p.actualise) * 100).toFixed(0)}% du budget consommé</div>
        </Card>
        <Card style={{ padding: 18, borderTop: `3px solid ${T.warn}` }}>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Reste à payer</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: T.warn, marginTop: 6 }}>{fmt(p.resteAPayer)}</div>
          <div style={{ fontSize: 10, color: T.n400, marginTop: 2 }}>FCFA · Selon échéancier validé</div>
        </Card>
      </div>

      {/* Pourquoi le budget a bougé */}
      <Card>
        <SectionTitle>Pourquoi le budget a évolué ?</SectionTitle>
        <div style={{ marginTop: 10 }}>
          {[
            { raison: "Renforcement fondation zone B — recommandation AMOA", mt: "+1 800 000", date: "15/03/2026" },
            { raison: "Hausse prix ciment (+8% marché) — ajustement devis", mt: "+1 200 000", date: "01/04/2026" },
            { raison: "Optimisation ferraillage — économie MOE", mt: "-500 000", date: "20/03/2026" },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.n100}` : "none" }}>
              <div>
                <div style={{ fontSize: 12, color: T.ink }}>{v.raison}</div>
                <div style={{ fontSize: 10, color: T.n400, marginTop: 1 }}>{v.date}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: v.mt.startsWith("+") ? T.err : T.ok }}>{v.mt} FCFA</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Ventilation par lot */}
      <Card>
        <SectionTitle sub="Budget, facturé et payé par corps de métier">Ventilation par lot</SectionTitle>
        <div style={{ marginTop: 12 }}>
          {LOTS.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.n100}` }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.ink, minWidth: 180 }}>{l.code} — {l.nom}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <div style={{ height: 6, borderRadius: T.rFull, background: T.ok, width: `${(l.paye / l.budget) * 100}%`, transition: "width 0.3s" }} />
                  <div style={{ height: 6, borderRadius: T.rFull, background: T.warn, width: `${((l.facture - l.paye) / l.budget) * 100}%` }} />
                </div>
              </div>
              <span style={{ fontSize: 10, color: T.ok, fontWeight: 600, minWidth: 55, textAlign: "right" }}>{fmt(l.paye)}</span>
              <span style={{ fontSize: 10, color: T.n400, minWidth: 55, textAlign: "right" }}>{fmt(l.budget)}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 9, color: T.n400 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.ok }} /> Payé</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.warn }} /> Facturé non payé</span>
          </div>
        </div>
      </Card>

      {/* Factures */}
      <Card>
        <SectionTitle sub="Détail de toutes les factures de votre projet">Factures</SectionTitle>
        <div style={{ marginTop: 12 }}>
          <Table cols={[
            { key: "id", label: "N°", render: r => <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.cyan, fontWeight: 600 }}>{r.id}</span> },
            { key: "objet", label: "Objet", render: r => <span style={{ fontWeight: 500, fontSize: 11 }}>{r.objet}</span> },
            { key: "lot", label: "Lot", render: r => <Badge v="neutral">{r.lot}</Badge> },
            { key: "mt", label: "Montant", render: r => <span style={{ fontWeight: 700, fontSize: 12 }}>{fmt(r.mt)} FCFA</span> },
            { key: "ech", label: "Échéance" },
            { key: "s", label: "Statut", render: r => <StatusBadge s={r.s} /> },
            { key: "act", label: "", render: r => (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Download size={13} color={T.n400} style={{ cursor: "pointer" }} />
                {r.s === "En attente" && <Btn size="sm">Payer</Btn>}
              </div>
            )},
          ]} data={FACTURES} />
        </div>
      </Card>

      {/* Historique paiements */}
      <Card>
        <SectionTitle>Historique des paiements</SectionTitle>
        <div style={{ marginTop: 10 }}>
          <Table cols={[
            { key: "date", label: "Date" },
            { key: "ref", label: "Facture", render: r => <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.cyan }}>{r.ref}</span> },
            { key: "objet", label: "Objet" },
            { key: "mt", label: "Montant", render: r => <span style={{ fontWeight: 700 }}>{fmt(r.mt)} FCFA</span> },
            { key: "mode", label: "Mode", render: r => <Badge v="neutral">{r.mode}</Badge> },
          ]} data={PAIEMENTS} />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 5: DOCUMENTS
   ═══════════════════════════════════════════════════════ */
function PageDocuments() {
  const [catFilter, setCatFilter] = useState("Tous");
  const cats = ["Tous", "Plans", "Devis", "Contrats", "Rapports", "Factures", "Photos", "Planning"];
  const filtered = catFilter === "Tous" ? DOCUMENTS : DOCUMENTS.filter(d => d.cat === catFilter);
  const newDocs = DOCUMENTS.filter(d => d.action);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Documents du Projet</h2>

      {/* Dossiers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {cats.filter(c => c !== "Tous").map(c => {
          const count = DOCUMENTS.filter(d => d.cat === c).length;
          const hasNew = DOCUMENTS.filter(d => d.cat === c && d.action).length > 0;
          return (
            <Card key={c} hover onClick={() => setCatFilter(c)} style={{ padding: 14, textAlign: "center", cursor: "pointer", border: catFilter === c ? `2px solid ${T.cyan}` : `1px solid ${T.n200}` }}>
              <FolderOpen size={18} color={catFilter === c ? T.cyan : T.n400} />
              <div style={{ fontSize: 11, fontWeight: 600, color: T.ink, marginTop: 6 }}>{c}</div>
              <div style={{ fontSize: 9, color: T.n400 }}>{count} fichier{count > 1 ? "s" : ""}</div>
              {hasNew && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.info, margin: "4px auto 0" }} />}
            </Card>
          );
        })}
      </div>

      {/* Documents à traiter */}
      {newDocs.length > 0 && (
        <Card accent={T.info} style={{ background: T.infoBg }}>
          <SectionTitle sub="Documents nécessitant votre attention">À traiter</SectionTitle>
          <div style={{ marginTop: 10 }}>
            {newDocs.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: T.r12, background: T.white, marginBottom: 4, border: `1px solid ${T.n200}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FileText size={16} color={T.info} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{d.nom}</div>
                    <div style={{ fontSize: 10, color: T.n500 }}>{d.cat} · {d.taille} · {d.date}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StatusBadge s={d.statut} />
                  <Btn size="sm" icon={d.action === "À payer" ? CreditCard : Eye}>{d.action}</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Filtre actif */}
      {catFilter !== "Tous" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: T.n500 }}>Filtre :</span>
          <Badge v="default">{catFilter}</Badge>
          <button onClick={() => setCatFilter("Tous")} style={{ background: "none", border: "none", cursor: "pointer", color: T.n400, fontSize: 11 }}>× Effacer</button>
        </div>
      )}

      {/* Tous les documents */}
      <Card>
        <SectionTitle sub={`${filtered.length} document${filtered.length > 1 ? "s" : ""}`}>
          {catFilter === "Tous" ? "Tous les documents" : catFilter}
        </SectionTitle>
        <div style={{ marginTop: 10 }}>
          <Table cols={[
            { key: "nom", label: "Document", render: r => (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FileText size={14} color={T.n400} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.ink }}>{r.nom}</div>
                  <div style={{ fontSize: 9, color: T.n400 }}>{r.taille} · {r.type}</div>
                </div>
              </div>
            )},
            { key: "cat", label: "Catégorie", render: r => <Badge v="neutral">{r.cat}</Badge> },
            { key: "version", label: "Version", render: r => <span style={{ fontSize: 10, color: T.n500 }}>{r.version}</span> },
            { key: "date", label: "Date" },
            { key: "auteur", label: "Par", render: r => <Badge v="neutral">{r.auteur}</Badge> },
            { key: "statut", label: "Statut", render: r => <StatusBadge s={r.statut} /> },
            { key: "act", label: "", render: () => (
              <div style={{ display: "flex", gap: 6 }}>
                <Eye size={13} color={T.n400} style={{ cursor: "pointer" }} />
                <Download size={13} color={T.n400} style={{ cursor: "pointer" }} />
              </div>
            )},
          ]} data={filtered} />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 6: RAPPORTS
   ═══════════════════════════════════════════════════════ */
function PageRapports() {
  const [typeFilter, setTypeFilter] = useState("all");
  const filtered = typeFilter === "all" ? RAPPORTS : RAPPORTS.filter(r => r.type.includes(typeFilter === "visite" ? "Visite" : "journalier"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Rapports de Chantier</h2>

      <InfoBanner type="info" icon={Shield}>
        Les rapports sont produits chaque jour par l'entreprise de construction et <b>validés par votre AMOA</b> avant publication. Seuls les rapports approuvés sont affichés ici, garantissant la fiabilité des informations.
      </InfoBanner>

      {/* Stats rapports */}
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { l: "Total rapports", n: RAPPORTS.length, c: T.ink },
          { l: "Visites AMOA", n: RAPPORTS.filter(r => r.type.includes("Visite")).length, c: T.sage },
          { l: "Rapports journaliers", n: RAPPORTS.filter(r => r.type.includes("journalier")).length, c: T.cyan },
          { l: "Points de vigilance", n: RAPPORTS.filter(r => r.vigilance).length, c: T.warn },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "12px 16px", borderRadius: T.r12, background: T.n50, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 10, color: T.n500 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ display: "flex", gap: 6 }}>
        {[{ k: "all", l: "Tous" }, { k: "visite", l: "Visites AMOA" }, { k: "journalier", l: "Rapports journaliers" }].map(f => (
          <button key={f.k} onClick={() => setTypeFilter(f.k)} style={{ padding: "6px 14px", borderRadius: T.rFull, fontSize: 11, fontWeight: typeFilter === f.k ? 600 : 400, border: `1px solid ${typeFilter === f.k ? T.cyan : T.n200}`, background: typeFilter === f.k ? T.cyanLt : T.white, color: typeFilter === f.k ? T.cyanDk : T.n600, cursor: "pointer" }}>{f.l}</button>
        ))}
      </div>

      {/* Rapport cards */}
      {filtered.map(r => {
        const isVisite = r.type.includes("Visite");
        return (
          <Card key={r.id} style={{ borderLeft: `4px solid ${isVisite ? T.sage : T.cyan}`, padding: 0 }}>
            <div style={{ padding: "18px 22px" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Badge v={isVisite ? "success" : "default"} dot>{r.type}</Badge>
                    <Badge v="neutral">{r.lot}</Badge>
                    {!r.lu && <Badge v="info" dot>Nouveau</Badge>}
                    {r.vigilance && <Badge v="warning" dot>Vigilance</Badge>}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.ink }}>{r.date}</div>
                  <div style={{ fontSize: 11, color: T.n500, marginTop: 2 }}>Par <b>{r.auteur}</b> — {r.org}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: T.n500 }}>{r.meteo}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 4 }}>
                    <Image size={12} color={T.n400} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.ink }}>{r.photos} photos</span>
                  </div>
                  <Badge v="success">Validé par AMOA</Badge>
                </div>
              </div>

              {/* Contenu */}
              <div style={{ fontSize: 13, color: T.n700, lineHeight: 1.7, padding: "10px 14px", borderRadius: T.r12, background: T.n50, marginBottom: 8 }}>
                {r.resume}
              </div>

              {/* Tâches du jour */}
              <div style={{ fontSize: 11, color: T.n500, marginBottom: 8 }}>
                <b>Tâches observées :</b> {r.taches}
              </div>

              {/* Recommandations */}
              {r.recommandations && (
                <div style={{ padding: "10px 14px", borderRadius: T.r8, background: T.warnBg, border: `1px solid ${T.warn}20`, fontSize: 12, color: T.n700, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, color: T.warn }}>Recommandations : </span>{r.recommandations}
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 7: MESSAGES
   ═══════════════════════════════════════════════════════ */
function PageMessages() {
  const [selectedMsg, setSelectedMsg] = useState(0);
  const sel = MESSAGES[selectedMsg];

  const conversations = {
    0: [
      { from: "Marie Atangana", role: "SPOC", self: false, msg: "Bonjour M. Fouda ! Le coulage des poteaux R+1 est prévu jeudi. Nous avons anticipé la pluie de vendredi. Tout est organisé.", time: "14:22" },
      { from: "Jean-Pierre Fouda", role: "Client", self: true, msg: "Merci Marie. Et pour la facture FAC-003 ?", time: "14:35" },
      { from: "Marie Atangana", role: "SPOC", self: false, msg: "Elle concerne les matériaux Phase 2 (fer + sable + ciment). Le montant est de 8,4M FCFA avec une échéance au 25/04. Vous pouvez la régler depuis la section Finances du portail.", time: "14:38" },
      { from: "Marie Atangana", role: "SPOC", self: false, msg: "Je vous envoie également le bon de commande en pièce jointe pour votre information.", time: "14:39", attachment: "BC-003_Materiaux_Phase2.pdf" },
    ],
    1: [
      { from: "S. Kamga", role: "AMOA", self: false, msg: "Le rapport de visite du 12/04 est disponible dans vos documents. RAS sur les fondations — tout est conforme.", time: "18:30" },
    ],
  };

  const conv = conversations[selectedMsg] || conversations[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Messages</h2>

      <InfoBanner type="info">
        Votre <b>SPOC Marie Atangana</b> est votre interlocuteur principal. Tous les échanges passent par elle pour garantir la coordination de votre projet.
      </InfoBanner>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 0, border: `1px solid ${T.n200}`, borderRadius: T.r16, overflow: "hidden", height: 500 }}>
        {/* Liste conversations */}
        <div style={{ borderRight: `1px solid ${T.n200}`, overflowY: "auto", background: T.white }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.n200}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Conversations</div>
            <div style={{ fontSize: 10, color: T.n400, marginTop: 2 }}>{MESSAGES.filter(m => m.unread).length} non lu(s)</div>
          </div>
          {MESSAGES.map((m, i) => (
            <div key={i} onClick={() => setSelectedMsg(i)} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px",
              borderBottom: `1px solid ${T.n100}`, cursor: "pointer",
              background: i === selectedMsg ? T.cyanBg : "transparent",
              borderLeft: i === selectedMsg ? `3px solid ${T.cyan}` : "3px solid transparent",
            }}>
              <Avatar name={m.from} color={m.from.includes("Marie") ? T.cyan : T.sage} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: m.unread ? 700 : 500, color: T.ink }}>{m.from}</span>
                  <span style={{ fontSize: 9, color: T.n400 }}>{m.time.split(" ")[0]}</span>
                </div>
                <div style={{ fontSize: 9, color: T.cyan, fontWeight: 500 }}>{m.role}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.info, marginTop: 2 }}>{m.objet}</div>
                <div style={{ fontSize: 10, color: T.n500, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
              </div>
              {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.cyan, flexShrink: 0, marginTop: 6 }} />}
            </div>
          ))}
        </div>

        {/* Conversation */}
        <div style={{ display: "flex", flexDirection: "column", background: T.n50 }}>
          {/* Header */}
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.n200}`, background: T.white }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={sel.from} color={sel.from.includes("Marie") ? T.cyan : T.sage} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: T.ink }}>{sel.from}</span>
                  <Badge v={sel.from.includes("Marie") ? "default" : "success"}>{sel.role}</Badge>
                </div>
                <div style={{ fontSize: 10, color: T.info, marginTop: 1 }}>Objet : {sel.objet}</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10, overflowY: "auto" }}>
            {conv.map((c, i) => (
              <div key={i} style={{ alignSelf: c.self ? "flex-end" : "flex-start", maxWidth: "75%" }}>
                <div style={{
                  padding: "11px 16px", borderRadius: c.self ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  background: c.self ? T.cyan : T.white, color: c.self ? "#fff" : T.ink,
                  fontSize: 13, lineHeight: 1.6,
                  boxShadow: c.self ? "none" : T.sh1,
                  border: c.self ? "none" : `1px solid ${T.n200}`,
                }}>
                  {c.msg}
                </div>
                {c.attachment && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, padding: "6px 10px", background: T.white, borderRadius: T.r8, border: `1px solid ${T.n200}`, cursor: "pointer" }}>
                    <Paperclip size={12} color={T.n400} />
                    <span style={{ fontSize: 10, color: T.cyan, fontWeight: 600 }}>{c.attachment}</span>
                    <Download size={11} color={T.n400} />
                  </div>
                )}
                <div style={{ fontSize: 9, color: T.n400, marginTop: 3, textAlign: c.self ? "right" : "left" }}>{c.time}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.n200}`, background: T.white, display: "flex", gap: 8, alignItems: "center" }}>
            <input placeholder="Écrire un message..." style={{ flex: 1, padding: "10px 14px", borderRadius: T.r12, border: `1px solid ${T.n200}`, fontSize: 12, outline: "none", background: T.n50 }} />
            <Btn v="ghost" size="sm" icon={Paperclip} />
            <Btn icon={Send}>Envoyer</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 8: CHANTIER LIVE
   ═══════════════════════════════════════════════════════ */
function PageLive() {
  const cameras = [
    { id: "CAM-001", nom: "Entrée chantier", zone: "Accès principal", status: "En ligne", last: "16/04 14:38:22", evt: "Mouvement détecté (02:14) — vérifié par gardien", evtType: "warn", logs: ["14:38 — Flux actif", "08:12 — Arrivée équipe", "02:14 — Mouvement nocturne détecté"] },
    { id: "CAM-003", nom: "Front de chantier", zone: "Zone Gros Œuvre", status: "En ligne", last: "16/04 14:38:22", evt: "Activité normale — 18 ouvriers détectés", evtType: "ok", logs: ["14:38 — Flux actif", "12:00 — Pause déjeuner", "08:00 — Début activité"] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Mon Chantier en Direct</h2>

      <InfoBanner type="info" icon={Shield}>
        Vos caméras de chantier sont accessibles <b>24h/24</b>. En cas d'activité suspecte en dehors des heures de travail, une alerte automatique est envoyée à votre SPOC et au gardien. Les images sont conservées 30 jours.
      </InfoBanner>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {cameras.map(cam => (
          <Card key={cam.id} style={{ padding: 0, overflow: "hidden" }}>
            {/* Video placeholder */}
            <div style={{ width: "100%", aspectRatio: "16/9", background: `linear-gradient(135deg, #0a0f1a 0%, #1a2332 50%, #0d1b2a 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 12, left: 14, display: "flex", alignItems: "center", gap: 6, zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: T.rFull, background: "rgba(220,38,38,0.9)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", animation: "pulse 1.5s infinite" }} />
                  <span style={{ fontSize: 9, color: "#fff", fontWeight: 700, letterSpacing: 0.8 }}>LIVE</span>
                </div>
              </div>
              <div style={{ position: "absolute", top: 12, right: 14 }}>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{cam.id}</span>
              </div>
              <PlayCircle size={40} strokeWidth={1} color="rgba(255,255,255,0.15)" />
              <div style={{ position: "absolute", bottom: 12, left: 14, fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{cam.last} (UTC+1)</div>
              <div style={{ position: "absolute", bottom: 12, right: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.ok }} />
                  <span style={{ fontSize: 9, color: T.ok, fontWeight: 600 }}>En direct</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{cam.nom}</div>
                  <div style={{ fontSize: 11, color: T.n500 }}>{cam.zone}</div>
                </div>
                <Badge v="success" dot>Actif</Badge>
              </div>

              {/* Dernier événement */}
              <div style={{ padding: "10px 12px", borderRadius: T.r8, background: cam.evtType === "warn" ? T.warnBg : T.okBg, border: `1px solid ${cam.evtType === "warn" ? T.warn : T.ok}15`, marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: cam.evtType === "warn" ? T.warn : T.ok, marginBottom: 2 }}>Dernier événement</div>
                <div style={{ fontSize: 11, color: T.n700 }}>{cam.evt}</div>
              </div>

              {/* Logs */}
              <div style={{ fontSize: 10, color: T.n500 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: T.n600 }}>Historique du jour</div>
                {cam.logs.map((log, i) => (
                  <div key={i} style={{ padding: "3px 0", borderBottom: `1px solid ${T.n100}`, fontFamily: "monospace", fontSize: 9, color: T.n500 }}>{log}</div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 9: MÉTÉO
   ═══════════════════════════════════════════════════════ */
function PageMeteo() {
  const alerteJours = METEO.filter(m => m.al !== "vert");
  const alColor = { vert: T.ok, orange: T.warn, rouge: T.err };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Météo du Chantier</h2>
        <div style={{ fontSize: 12, color: T.n500, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}><MapPin size={12} />Douala, Bonamoussadi — 4.07°N, 9.74°E</div>
      </div>

      {/* Alerte principale */}
      {alerteJours.length > 0 && (
        <Card accent={T.err} style={{ background: T.errBg }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.err + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AlertTriangle size={20} color={T.err} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.err, marginBottom: 4 }}>Alerte météo — Vendredi 18 Avril</div>
              <div style={{ fontSize: 12, color: T.n700, lineHeight: 1.7 }}>
                Forte pluie prévue (<b>35 mm</b>) avec rafales de vent à 28 km/h. Humidité à 92%.
              </div>
              <div style={{ fontSize: 12, color: T.n700, lineHeight: 1.7, marginTop: 6 }}>
                <b>Impact sur votre chantier :</b> le coulage du béton des poteaux R+1, initialement prévu vendredi, a été <b>avancé à jeudi 17 avril</b>. Les travaux extérieurs seront suspendus vendredi.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, padding: "8px 12px", background: T.white, borderRadius: T.r8, border: `1px solid ${T.n200}` }}>
                <CheckCircle2 size={14} color={T.ok} />
                <span style={{ fontSize: 11, color: T.ok, fontWeight: 600 }}>Mesure prise par votre SPOC Marie Atangana le 16/04</span>
              </div>
              <div style={{ fontSize: 11, color: T.n500, marginTop: 6 }}>
                <b style={{ color: T.ok }}>Aucun impact sur le planning global.</b> La livraison reste prévue en {PROJECTS[0].livraison}.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Prévisions 7 jours */}
      <Card>
        <SectionTitle sub="Prévisions pour la zone de votre chantier">Prévisions 7 jours</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginTop: 14 }}>
          {METEO.map((m, i) => {
            const isAlert = m.al !== "vert";
            const isToday = i === 0;
            return (
              <div key={i} style={{
                textAlign: "center", padding: "14px 8px", borderRadius: T.r12,
                background: isToday ? T.cyanBg : isAlert ? alColor[m.al] + "06" : T.n50,
                border: `1px solid ${isAlert ? alColor[m.al] + "30" : isToday ? T.cyan + "20" : T.n200}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: isToday ? T.cyan : T.n600 }}>{m.j}</div>
                {(m.jc) && <div style={{ fontSize: 8, color: T.n400, marginTop: 1 }}>{m.jc}</div>}
                <div style={{ fontSize: 30, margin: "8px 0" }}>{m.ic}</div>
                <div style={{ fontSize: 10, fontWeight: 500, color: T.n600, minHeight: 28 }}>{m.co}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: T.ink, margin: "4px 0" }}>{m.tM}°</div>
                <div style={{ fontSize: 9, color: T.n400 }}>{m.tm}° min</div>
                {m.pluie > 0 && <div style={{ fontSize: 10, fontWeight: 700, color: T.err, marginTop: 4 }}>{m.pluie} mm</div>}
                <div style={{ fontSize: 9, color: T.n400, marginTop: 2 }}>Vent {m.vent} km/h</div>
                <div style={{
                  marginTop: 8, fontSize: 8, fontWeight: 700, padding: "3px 8px", borderRadius: T.rFull,
                  display: "inline-block",
                  background: alColor[m.al] + "14", color: alColor[m.al],
                  textTransform: "uppercase", letterSpacing: 0.5,
                }}>{m.al === "vert" ? "OK" : m.al}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Impacts détaillés */}
      <Card>
        <SectionTitle sub="Ce que la météo signifie concrètement pour vos travaux">Impacts sur votre chantier</SectionTitle>
        <div style={{ marginTop: 12 }}>
          {METEO.map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < METEO.length - 1 ? `1px solid ${T.n100}` : "none" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{m.ic}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{m.j}</span>
                  <span style={{ fontSize: 11, color: T.n500 }}>{m.co} · {m.tM}°C</span>
                  <Badge v={m.al === "vert" ? "success" : m.al === "orange" ? "warning" : "danger"}>{m.al === "vert" ? "RAS" : m.al}</Badge>
                </div>
                <div style={{ fontSize: 11, color: T.n600, marginTop: 3, lineHeight: 1.5 }}>{m.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Lots impactés */}
      <Card>
        <SectionTitle>Lots potentiellement impactés cette semaine</SectionTitle>
        <div style={{ marginTop: 10 }}>
          {[
            { lot: "Lot II — Gros Œuvre", impact: "Coulage béton avancé à jeudi. Coffrage intérieur maintenu vendredi.", risque: "Maîtrisé" },
            { lot: "Lot III — Clos Couvert", impact: "Travaux de toiture suspendus vendredi si pluie > 20mm.", risque: "À surveiller" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: T.r12, background: T.n50, marginBottom: 6 }}>
              <HardHat size={16} color={T.warn} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{l.lot}</div>
                <div style={{ fontSize: 11, color: T.n600, marginTop: 1 }}>{l.impact}</div>
              </div>
              <Badge v={l.risque === "Maîtrisé" ? "success" : "warning"}>{l.risque}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 10: APPROVISIONNEMENTS CHANTIER
   ═══════════════════════════════════════════════════════ */
function PageAppro({ onNav }) {
  const [statutFilter, setStatutFilter] = useState("all");
  const [lotFilter, setLotFilter] = useState("all");
  const [critiqueOnly, setCritiqueOnly] = useState(false);

  const totalPrevu = MATERIAUX.length;
  const totalDisponible = MATERIAUX.filter(m => m.couverture >= 80).length;
  const totalVigilance = MATERIAUX.filter(m => m.critique).length;
  const livraisonsAttendue = COMMANDES.filter(c => c.statut === "En transit" || c.statut === "Confirmée").length;
  const tauxGlobal = Math.round(MATERIAUX.reduce((s, m) => s + m.couverture, 0) / MATERIAUX.length);
  const impactPlanning = ALERTES_APPRO.some(a => a.niveau === "rouge") ? "Modéré" : ALERTES_APPRO.some(a => a.niveau === "orange") ? "Faible" : "Nul";
  const impactColor = impactPlanning === "Modéré" ? T.warn : impactPlanning === "Faible" ? T.cyan : T.ok;

  const allLots = [...new Set(MATERIAUX.map(m => m.lot))];

  let filteredMat = MATERIAUX;
  if (statutFilter !== "all") filteredMat = filteredMat.filter(m => m.statut === statutFilter);
  if (lotFilter !== "all") filteredMat = filteredMat.filter(m => m.lot === lotFilter);
  if (critiqueOnly) filteredMat = filteredMat.filter(m => m.critique);

  const statutColor = (s) => {
    if (s === "Disponible") return T.ok;
    if (s === "Vigilance") return T.warn;
    if (s === "En cours d'approvisionnement" || s === "Commandé") return T.info;
    if (s === "En rupture fournisseur") return T.err;
    if (s === "Non commandé") return T.n400;
    return T.n500;
  };
  const statutBadge = (s) => {
    if (s === "Disponible") return "success";
    if (s === "Vigilance") return "warning";
    if (s === "En cours d'approvisionnement" || s === "Commandé") return "info";
    if (s === "En rupture fournisseur") return "danger";
    return "neutral";
  };
  const cmdStatutBadge = (s) => {
    if (s === "Reçue") return "success";
    if (s === "En transit") return "info";
    if (s === "Confirmée") return "default";
    if (s === "Commandée") return "neutral";
    if (s === "Retardée") return "danger";
    return "neutral";
  };
  const risqueColor = { vert: T.ok, orange: T.warn, rouge: T.err };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.ink, margin: 0 }}>Approvisionnements Chantier</h2>
        <p style={{ fontSize: 12, color: T.n500, margin: "4px 0 0" }}>Suivi des matériaux, livraisons et risques d'approvisionnement de votre projet</p>
      </div>

      {/* ────── A. BANDEAU KPI ────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <Card style={{ padding: 18, textAlign: "center", borderTop: `3px solid ${T.cyan}` }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.cyan + "10", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Gauge size={17} color={T.cyan} /></div>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Taux d'approvisionnement</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: T.ink, marginTop: 2 }}>{tauxGlobal}%</div>
          <div style={{ marginTop: 6 }}><Progress value={tauxGlobal} h={5} color={T.cyan} /></div>
          <div style={{ fontSize: 9, color: T.n400, marginTop: 4 }}>des matériaux prévus sont approvisionnés</div>
        </Card>
        <Card style={{ padding: 18, textAlign: "center", borderTop: `3px solid ${T.warn}` }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.warn + "10", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><AlertTriangle size={17} color={T.warn} /></div>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Matériaux à surveiller</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: T.warn, marginTop: 2 }}>{totalVigilance}</div>
          <div style={{ fontSize: 9, color: T.n400, marginTop: 4 }}>nécessitent une attention particulière</div>
        </Card>
        <Card style={{ padding: 18, textAlign: "center", borderTop: `3px solid ${T.info}` }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.info + "10", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Truck size={17} color={T.info} /></div>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Livraisons attendues</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: T.info, marginTop: 2 }}>{livraisonsAttendue}</div>
          <div style={{ fontSize: 9, color: T.n400, marginTop: 4 }}>cette semaine</div>
        </Card>
        <Card style={{ padding: 18, textAlign: "center", borderTop: `3px solid ${impactColor}` }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: impactColor + "10", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Activity size={17} color={impactColor} /></div>
          <div style={{ fontSize: 9, color: T.n500, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Impact planning</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: impactColor, marginTop: 2 }}>{impactPlanning}</div>
          <div style={{ fontSize: 9, color: T.n400, marginTop: 4 }}>sur l'avancement du chantier</div>
        </Card>
      </div>

      {/* ────── C. ALERTES & RISQUES ────── */}
      <Card accent={T.err}>
        <SectionTitle sub="Points nécessitant votre attention ou un suivi par KOMA">Alertes & Risques approvisionnement</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          {ALERTES_APPRO.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: T.r12,
              background: a.niveau === "rouge" ? T.errBg : a.niveau === "orange" ? T.warnBg : T.okBg,
              border: `1px solid ${risqueColor[a.niveau]}18`,
              borderLeft: `4px solid ${risqueColor[a.niveau]}`,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: risqueColor[a.niveau] + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                {a.niveau === "rouge" ? <AlertCircle size={15} color={T.err} /> : a.niveau === "orange" ? <AlertTriangle size={15} color={T.warn} /> : <CheckCircle2 size={15} color={T.ok} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Badge v={a.niveau === "rouge" ? "danger" : a.niveau === "orange" ? "warning" : "success"} dot>
                    {a.niveau === "rouge" ? "Risque" : a.niveau === "orange" ? "Vigilance" : "Maîtrisé"}
                  </Badge>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{a.materiau}</span>
                  <Badge v="neutral">{a.lot}</Badge>
                </div>
                <div style={{ fontSize: 12, color: T.n700, lineHeight: 1.6, marginBottom: 4 }}>{a.consequence}</div>
                <div style={{ fontSize: 11, color: T.n600, padding: "6px 10px", borderRadius: T.r8, background: "rgba(255,255,255,0.7)", borderLeft: `3px solid ${risqueColor[a.niveau]}` }}>
                  <b>Action :</b> {a.action}
                </div>
              </div>
              {a.niveau === "rouge" && (
                <Btn v="ghost" size="sm" icon={MessageSquare} onClick={() => onNav("messages")}>Contacter SPOC</Btn>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ────── B. ÉTAT DES APPROVISIONNEMENTS ────── */}
      <Card>
        <SectionTitle sub={`${filteredMat.length} matériau${filteredMat.length > 1 ? "x" : ""} affichés`}>État des approvisionnements</SectionTitle>

        {/* Filtres */}
        <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: T.n500, fontWeight: 600 }}>Filtrer :</span>
          <select value={lotFilter} onChange={e => setLotFilter(e.target.value)} style={{ padding: "5px 10px", borderRadius: T.r8, border: `1px solid ${T.n200}`, fontSize: 10, fontWeight: 500, background: T.white, cursor: "pointer", color: T.n700, outline: "none" }}>
            <option value="all">Tous les lots</option>
            {allLots.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={statutFilter} onChange={e => setStatutFilter(e.target.value)} style={{ padding: "5px 10px", borderRadius: T.r8, border: `1px solid ${T.n200}`, fontSize: 10, fontWeight: 500, background: T.white, cursor: "pointer", color: T.n700, outline: "none" }}>
            <option value="all">Tous les statuts</option>
            <option value="Disponible">Disponible</option>
            <option value="Vigilance">Vigilance</option>
            <option value="En cours d'approvisionnement">En cours</option>
            <option value="Commandé">Commandé</option>
            <option value="En rupture fournisseur">En rupture</option>
            <option value="Non commandé">Non commandé</option>
          </select>
          <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: T.n600, cursor: "pointer" }}>
            <input type="checkbox" checked={critiqueOnly} onChange={e => setCritiqueOnly(e.target.checked)} style={{ accentColor: T.err }} />
            Critiques uniquement
          </label>
          {(statutFilter !== "all" || lotFilter !== "all" || critiqueOnly) && (
            <button onClick={() => { setStatutFilter("all"); setLotFilter("all"); setCritiqueOnly(false); }} style={{ background: "none", border: "none", fontSize: 10, color: T.cyan, cursor: "pointer", fontWeight: 600 }}>× Réinitialiser</button>
          )}
        </div>

        {/* Table matériaux */}
        <Table cols={[
          { key: "nom", label: "Matériau", render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {r.critique && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.err, flexShrink: 0 }} />}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.ink }}>{r.nom}</div>
                <div style={{ fontSize: 9, color: T.n400 }}>{r.fournisseur !== "—" ? r.fournisseur : "Non attribué"}</div>
              </div>
            </div>
          )},
          { key: "lot", label: "Lot", render: r => <Badge v="neutral">{r.lot}</Badge> },
          { key: "qte", label: "Quantité", render: r => (
            <div>
              <span style={{ fontWeight: 600, fontSize: 11 }}>{r.recu}</span>
              <span style={{ color: T.n400, fontSize: 10 }}> / {r.prevu} {r.unite}</span>
            </div>
          )},
          { key: "couverture", label: "Couverture", render: r => (
            <div style={{ minWidth: 90 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: r.couverture >= 80 ? T.ok : r.couverture >= 40 ? T.warn : T.n500 }}>{r.couverture}%</span>
              </div>
              <Progress value={r.couverture} h={5} color={r.couverture >= 80 ? T.ok : r.couverture >= 40 ? T.warn : T.n300} />
            </div>
          )},
          { key: "statut", label: "Statut", render: r => <Badge v={statutBadge(r.statut)} dot>{r.statut}</Badge> },
          { key: "prochaineLiv", label: "Prochaine livraison", render: r => (
            <span style={{ fontSize: 10, color: r.prochaineLiv === "—" || r.prochaineLiv === "Indéterminé" ? T.n400 : T.ink, fontWeight: r.prochaineLiv !== "—" && r.prochaineLiv !== "Indéterminé" ? 600 : 400 }}>
              {r.prochaineLiv}
            </span>
          )},
        ]} data={filteredMat} />
      </Card>

      {/* ────── D. COMMANDES & LIVRAISONS ────── */}
      <Card>
        <SectionTitle sub="Toutes les commandes passées pour votre projet, de la plus récente à la plus ancienne">Commandes & Livraisons</SectionTitle>
        <div style={{ marginTop: 12 }}>
          <Table cols={[
            { key: "ref", label: "Référence", render: r => <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.cyan, fontWeight: 600 }}>{r.ref}</span> },
            { key: "fournisseur", label: "Fournisseur", render: r => <span style={{ fontWeight: 500, fontSize: 11 }}>{r.fournisseur}</span> },
            { key: "materiau", label: "Matériau" },
            { key: "montant", label: "Montant", render: r => <span style={{ fontWeight: 700, fontSize: 11 }}>{fmt(r.montant)} FCFA</span> },
            { key: "datePrevue", label: "Date prévue" },
            { key: "dateReelle", label: "Date réelle", render: r => r.dateReelle || <span style={{ color: T.n400 }}>—</span> },
            { key: "ecart", label: "Écart", render: r => {
              if (!r.ecart) return <span style={{ color: T.n400 }}>—</span>;
              const isOk = r.ecart === "0j";
              return <Badge v={isOk ? "success" : "warning"}>{r.ecart}</Badge>;
            }},
            { key: "statut", label: "Statut", render: r => <Badge v={cmdStatutBadge(r.statut)} dot>{r.statut}</Badge> },
          ]} data={COMMANDES} />
        </div>
      </Card>

      {/* ────── E. CONSOMMATION PAR ÉTAPE CHANTIER ────── */}
      <Card>
        <SectionTitle sub="Niveau d'approvisionnement par grande étape du projet">Approvisionnement par étape chantier</SectionTitle>
        <div style={{ marginTop: 14 }}>
          {ETAPES_APPRO.map((e, i) => {
            const rc = risqueColor[e.risque];
            const isActive = e.avChantier > 0 && e.avChantier < 100;
            return (
              <div key={i} style={{
                padding: "16px 18px", borderRadius: T.r12, marginBottom: 8,
                background: e.risque === "rouge" ? T.errBg : e.risque === "orange" ? T.warnBg : isActive ? T.cyanBg : T.n50,
                border: `1px solid ${e.risque !== "vert" ? rc + "20" : T.n200}`,
                borderLeft: `4px solid ${rc}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{e.etape}</span>
                    {e.avChantier === 100 && <Badge v="success">Terminé</Badge>}
                    {isActive && <Badge v="default" dot>En cours</Badge>}
                    {e.avChantier === 0 && e.avAppro === 0 && <Badge v="neutral">À venir</Badge>}
                    <Badge v={e.risque === "vert" ? "success" : e.risque === "orange" ? "warning" : "danger"} dot>
                      {e.risque === "vert" ? "RAS" : e.risque === "orange" ? "Vigilance" : "Risque"}
                    </Badge>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: T.ink }}>{e.avAppro}%</div>
                    <div style={{ fontSize: 9, color: T.n400 }}>approvisionné</div>
                  </div>
                </div>

                {/* Double barre: appro vs chantier */}
                <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: T.n500 }}>Approvisionnement</span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: T.cyan }}>{e.avAppro}%</span>
                    </div>
                    <Progress value={e.avAppro} h={6} color={T.cyan} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: T.n500 }}>Avancement chantier</span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: T.sage }}>{e.avChantier}%</span>
                    </div>
                    <Progress value={e.avChantier} h={6} color={T.sage} />
                  </div>
                </div>

                <div style={{ fontSize: 11, color: T.n600, lineHeight: 1.5, marginBottom: 4 }}>{e.detail}</div>
                <div style={{ fontSize: 10, color: T.n400 }}>
                  <b>Matériaux principaux :</b> {e.materiauxPrincipaux}
                </div>

                {/* Cohérence appro/chantier */}
                {e.avAppro > 0 && e.avChantier > 0 && (
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    {e.avAppro >= e.avChantier ? (
                      <>
                        <CheckCircle2 size={12} color={T.ok} />
                        <span style={{ fontSize: 10, color: T.ok, fontWeight: 600 }}>Approvisionnement en avance sur l'exécution — bon rythme</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={12} color={T.warn} />
                        <span style={{ fontSize: 10, color: T.warn, fontWeight: 600 }}>Approvisionnement en retard de {e.avChantier - e.avAppro} points sur l'exécution</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ────── F. DOCUMENTS LIÉS ────── */}
      <Card>
        <SectionTitle sub="Bons de commande, bons de livraison, fiches qualité et rapports de stock">Documents approvisionnement</SectionTitle>
        <div style={{ marginTop: 12 }}>
          {DOCS_APPRO.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: T.r12, background: T.n50, marginBottom: 4, border: `1px solid ${T.n100}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FileText size={15} color={T.n400} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.ink }}>{d.nom}</div>
                  <div style={{ fontSize: 9, color: T.n400 }}>{d.cat} · {d.taille} · {d.date}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Badge v="neutral">{d.cat}</Badge>
                <Eye size={13} color={T.n400} style={{ cursor: "pointer" }} />
                <Download size={13} color={T.n400} style={{ cursor: "pointer" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ────── Info KOMA ────── */}
      <InfoBanner type="info" icon={Shield}>
        Les informations d'approvisionnement sont consolidées par <b>votre AMOA</b> et votre <b>SPOC Marie Atangana</b>. Les quantités et statuts sont mis à jour à chaque livraison et à chaque rapport de chantier. Si vous avez une question, contactez votre SPOC depuis la <b>messagerie</b>.
      </InfoBanner>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════ */
export default function KomaClientPortal() {
  const [nav, setNav] = useState("accueil");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    accueil: <PageAccueil onNav={setNav} />,
    decisions: <PageDecisions onNav={setNav} />,
    avancement: <PageAvancement />,
    finances: <PageFinances />,
    appro: <PageAppro onNav={setNav} />,
    documents: <PageDocuments />,
    rapports: <PageRapports />,
    messages: <PageMessages />,
    live: <PageLive />,
    meteo: <PageMeteo />,
  };

  const pageTitle = NAV_ITEMS.find(n => n.k === nav)?.l || "Mon Projet";

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", fontFamily: "'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif", background: T.n50, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.n300}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.n400}; }
        button { font-family: inherit; }
        button:hover { opacity: 0.92; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      <Sidebar nav={nav} onNav={setNav} open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ height: 56, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${T.n200}`, background: T.white, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Menu size={18} color={T.n500} />
            </button>
            <div style={{ width: 1, height: 20, background: T.n200 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>Villa Éden</div>
              <div style={{ fontSize: 10, color: T.n400 }}>Douala, Bonamoussadi</div>
            </div>
            <Badge v="success" dot>Actif</Badge>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <select style={{ padding: "5px 10px", borderRadius: T.r8, border: `1px solid ${T.n200}`, fontSize: 11, fontWeight: 600, background: T.n50, cursor: "pointer", color: T.n700, outline: "none" }}>
              <option>PRJ-001 — Villa Éden</option>
              <option>PRJ-006 — Étude Kribi</option>
            </select>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={18} color={T.n500} />
              <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: T.err, border: `2px solid ${T.white}` }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
          {pages[nav] || <PageAccueil onNav={setNav} />}
        </div>
      </div>
    </div>
  );
}
