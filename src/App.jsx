import { useState } from "react";
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
  Package, Gauge, Sparkles, Award, Landmark,
  Smartphone, Globe, ChevronLeft, Plus, Minus
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════ */
const T = {
  cyan:"#18B7D2",cyanDk:"#0E95AD",cyanLt:"#E6F7FA",cyanBg:"#F0FAFB",
  sage:"#6BC0AA",sageDk:"#4DA08B",sageLt:"#EDF7F3",
  ink:"#1D1D1B",
  n900:"#111827",n800:"#1F2937",n700:"#374151",n600:"#4B5563",
  n500:"#6B7280",n400:"#9CA3AF",n300:"#D1D5DB",n200:"#E5E7EB",
  n100:"#F3F4F6",n50:"#F9FAFB",white:"#FFFFFF",
  ok:"#059669",okLt:"#D1FAE5",okBg:"#ECFDF5",
  warn:"#D97706",warnLt:"#FEF3C7",warnBg:"#FFFBEB",
  err:"#DC2626",errLt:"#FEE2E2",errBg:"#FEF2F2",
  info:"#2563EB",infoLt:"#DBEAFE",infoBg:"#EFF6FF",
  purp:"#7C3AED",purpLt:"#EDE9FE",
  sh1:"0 1px 3px rgba(0,0,0,0.04),0 1px 2px rgba(0,0,0,0.06)",
  sh2:"0 4px 6px -1px rgba(0,0,0,0.05),0 2px 4px -2px rgba(0,0,0,0.05)",
  r8:8,r12:12,r16:16,r20:20,rF:999,
};
const fmt=(n)=>{if(n>=1e6)return(n/1e6).toFixed(1).replace(".0","")+"M";if(n>=1e3)return(n/1e3).toFixed(0)+"K";return n.toString();};

/* ═══════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════ */
const P={id:"PRJ-001",nom:"Villa Éden",loc:"Douala, Bonamoussadi",typo:"Construction neuve",phase:7,phaseLabel:"Construction",totalPhases:8,statut:"Actif",av:44,avP:48,budget:120e6,actu:123.5e6,engage:68e6,fact:52.8e6,paye:44.4e6,rap:79.1e6,spoc:"Marie Atangana",amoa:"S. Kamga",moe:"Arc. Njoya",moex:"BTP Cameroun SARL",livr:"Juillet 2027",debut:"Octobre 2025",rCout:"ok",rDelai:"warn",rQual:"ok",surface:"280 m² de surface bâtie",niv:"R+1",style:"Contemporain tropical",terrain:"600 m²"};

const OPS = {
  "LOT I":   [{c:"O1",n:"Installation & repli de chantier",reel:100,plan:100,budget:4.5e6,engage:4.5e6,paye:4.5e6,rap:0,s:"Terminé"}],
  "LOT II":  [{c:"O2",n:"Implantation du bâtiment",reel:100,plan:100,budget:800000,engage:800000,paye:800000,rap:0,s:"Terminé"},{c:"O3",n:"Terrassement (décapage / fouilles / déblais)",reel:100,plan:100,budget:2200000,engage:2200000,paye:2200000,rap:0,s:"Terminé"},{c:"O4",n:"Béton de propreté",reel:100,plan:100,budget:450000,engage:450000,paye:450000,rap:0,s:"Terminé"},{c:"O5",n:"Fondations béton armé (semelles/longrines/radier)",reel:100,plan:100,budget:6800000,engage:6800000,paye:5400000,rap:1400000,s:"Terminé"},{c:"O6",n:"Étanchéité soubassement (bitume + Delta MS + profilé)",reel:100,plan:100,budget:1200000,engage:1200000,paye:1200000,rap:0,s:"Terminé"},{c:"O7",n:"Drainage périphérique",reel:100,plan:100,budget:650000,engage:650000,paye:650000,rap:0,s:"Terminé"},{c:"O8",n:"Remblaiement périphérique fondations",reel:100,plan:100,budget:550000,engage:550000,paye:550000,rap:0,s:"Terminé"},{c:"O9",n:"Dallage / plancher bas",reel:100,plan:100,budget:3200000,engage:3200000,paye:2600000,rap:600000,s:"Terminé"},{c:"O10",n:"Élévations RDC (maçonnerie) + bande d'arase",reel:85,plan:90,budget:5400000,engage:4600000,paye:3200000,rap:2200000,s:"En cours"},{c:"O11",n:"Élévations étages (R+1…)",reel:30,plan:50,budget:7250000,engage:1850000,paye:1350000,rap:5900000,s:"En cours"}],
  "LOT III": [{c:"O12",n:"Charpente",reel:20,plan:25,budget:4500000,engage:2200000,paye:2200000,rap:2300000,s:"En cours"},{c:"O13",n:"Couverture / Toiture (points singuliers)",reel:0,plan:10,budget:3200000,engage:0,paye:0,rap:3200000,s:"À venir"},{c:"O14",n:"Enduits façades / ravalement (extérieur)",reel:0,plan:0,budget:1800000,engage:0,paye:0,rap:1800000,s:"À venir"},{c:"O21",n:"Menuiseries extérieures (fenêtres/baies/portes ext.)",reel:0,plan:0,budget:1600000,engage:0,paye:0,rap:1600000,s:"À venir"},{c:"O22",n:"Serrurerie (garde-corps/grilles/portails)",reel:0,plan:0,budget:900000,engage:0,paye:0,rap:900000,s:"À venir"}],
  "LOT IV":  [{c:"O15",n:"Plomberie évacuation (EU/EV intérieur)",reel:10,plan:12,budget:2100000,engage:450000,paye:450000,rap:1650000,s:"En cours"},{c:"O16",n:"Plomberie alimentation (EF/EC)",reel:5,plan:8,budget:1800000,engage:200000,paye:200000,rap:1600000,s:"En cours"},{c:"O17",n:"Électricité encastrée (réseaux/câblage)",reel:15,plan:18,budget:3800000,engage:800000,paye:800000,rap:3000000,s:"En cours"},{c:"O18",n:"Tableau électrique",reel:0,plan:0,budget:1200000,engage:0,paye:0,rap:1200000,s:"À venir"},{c:"O19",n:"Cloisons / doublages (placo ou équivalent)",reel:25,plan:30,budget:3500000,engage:650000,paye:650000,rap:2850000,s:"En cours"},{c:"O20",n:"Faux plafond (placo/staff)",reel:0,plan:0,budget:3200000,engage:0,paye:0,rap:3200000,s:"À venir"}],
  "LOT V":   [{c:"O23",n:"Étanchéité pièces d'eau (SPEC/SEL)",reel:5,plan:10,budget:2400000,engage:400000,paye:400000,rap:2000000,s:"En cours"},{c:"O24",n:"Étanchéité balcon / terrasse (SEL/membrane)",reel:0,plan:0,budget:1800000,engage:0,paye:0,rap:1800000,s:"À venir"}],
  "LOT VI":  [{c:"O25",n:"Chape (support revêtement)",reel:0,plan:0,budget:1800000,engage:0,paye:0,rap:1800000,s:"À venir"},{c:"O26",n:"Carrelage sol",reel:0,plan:0,budget:3600000,engage:0,paye:0,rap:3600000,s:"À venir"},{c:"O27",n:"Faïence / carrelage mural",reel:0,plan:0,budget:1800000,engage:0,paye:0,rap:1800000,s:"À venir"},{c:"O28",n:"Revêtements sols souples / parquet",reel:0,plan:0,budget:1200000,engage:0,paye:0,rap:1200000,s:"À venir"}],
  "LOT VII": [{c:"O29",n:"Préparation supports (murs/plafonds/sols)",reel:0,plan:0,budget:800000,engage:0,paye:0,rap:800000,s:"À venir"},{c:"O30",n:"Peinture plafonds",reel:0,plan:0,budget:1200000,engage:0,paye:0,rap:1200000,s:"À venir"},{c:"O31",n:"Peinture murs intérieurs",reel:0,plan:0,budget:1800000,engage:0,paye:0,rap:1800000,s:"À venir"},{c:"O32",n:"Peinture boiseries/métal (portes/grilles/cadres)",reel:0,plan:0,budget:600000,engage:0,paye:0,rap:600000,s:"À venir"},{c:"O33",n:"Portes intérieures & quincaillerie",reel:0,plan:0,budget:2800000,engage:0,paye:0,rap:2800000,s:"À venir"},{c:"O34",n:"Plinthes (hors plinthes carrelage)",reel:0,plan:0,budget:400000,engage:0,paye:0,rap:400000,s:"À venir"},{c:"O35",n:"Électricité - appareillage final & luminaires",reel:0,plan:0,budget:2200000,engage:0,paye:0,rap:2200000,s:"À venir"},{c:"O36",n:"Plomberie - équipements finaux & joints sanitaires",reel:0,plan:0,budget:1600000,engage:0,paye:0,rap:1600000,s:"À venir"},{c:"O37",n:"Joints & étanchéités de finition (points singuliers)",reel:0,plan:0,budget:400000,engage:0,paye:0,rap:400000,s:"À venir"}],
  "LOT VIII":[{c:"O38",n:"VRD & réseaux extérieurs",reel:0,plan:0,budget:3800000,engage:0,paye:0,rap:3800000,s:"À venir"},{c:"O39",n:"Aménagements extérieurs / espaces verts",reel:0,plan:0,budget:3100000,engage:0,paye:0,rap:3100000,s:"À venir"}],
  "LOT IX":  [{c:"O40",n:"Nettoyage final + réception",reel:0,plan:0,budget:1300000,engage:0,paye:0,rap:1300000,s:"À venir"}],
};

const OPS_FLAT = Object.values(OPS).flat().reduce(function(m, o){ m[o.c] = o.n; return m; }, {});

const LOTS=[
  {code:"LOT I",nom:"Travaux préparatoires",reel:100,plan:100,budget:4.5e6,fact:4.5e6,paye:4.5e6,desc:"Préparation du terrain et installation du chantier"},
  {code:"LOT II",nom:"Gros œuvre",reel:72,plan:80,budget:28.5e6,fact:22.3e6,paye:18.4e6,desc:"Structure porteuse du bâtiment : fondations, murs, poteaux, planchers"},
  {code:"LOT III",nom:"Clos couvert",reel:45,plan:50,budget:12e6,fact:5.8e6,paye:5.8e6,desc:"Mise hors d'eau et hors d'air : toiture et fermetures extérieures"},
  {code:"LOT IV",nom:"Second œuvre",reel:18,plan:20,budget:15.6e6,fact:2.1e6,paye:2.1e6,desc:"Aménagements intérieurs non structurels"},
  {code:"LOT V",nom:"Étanchéité",reel:5,plan:10,budget:4.2e6,fact:0.4e6,paye:0.4e6,desc:"Traitement de l'imperméabilisation"},
  {code:"LOT VI",nom:"Revêtements",reel:0,plan:0,budget:8.4e6,fact:0,paye:0,desc:"Sols et murs : carrelage, faïence, revêtements spéciaux"},
  {code:"LOT VII",nom:"Finitions",reel:0,plan:0,budget:11.8e6,fact:0,paye:0,desc:"Plomberie, électricité, peinture, menuiseries intérieures"},
  {code:"LOT VIII",nom:"Extérieurs",reel:0,plan:0,budget:6.9e6,fact:0,paye:0,desc:"Aménagements de la parcelle : clôture, cour, espaces verts"},
  {code:"LOT IX",nom:"Réception",reel:0,plan:0,budget:1.3e6,fact:0,paye:0,desc:"Vérification finale, levée de réserves et livraison"},
];

const PHASES_DATA=[
  {nom:"Découverte",statut:"done",desc:"Prise de contact, analyse de votre besoin et qualification du projet.",livrables:["Fiche prospect","Pré-programme"],acteur:"SPOC",decision:"Projet qualifié — passage en phase foncier"},
  {nom:"Foncier",statut:"done",desc:"Vérification du terrain, titre foncier, bornage et faisabilité parcellaire.",livrables:["Titre foncier vérifié","Plan de bornage","Étude de sol"],acteur:"AMOA",decision:"Terrain validé — faisabilité engagée"},
  {nom:"Pré-faisabilité",statut:"done",desc:"Études de faisabilité, visite de site, esquisse architecturale et démarches administratives.",livrables:["Rapport de faisabilité","Esquisse architecturale","Permis de construire déposé"],acteur:"AMOA / MOE",decision:"Projet réalisable — conception lancée",sousParts:["Permis de construire & démarches administratives"]},
  {nom:"Conception technique",statut:"done",desc:"Plans détaillés APS/APD, études structure, plans techniques validés.",livrables:["Plans APS","Plans APD","Études structure","Plans techniques"],acteur:"MOE",decision:"Plans validés par le client"},
  {nom:"Devis",statut:"done",desc:"Consultation des entreprises, analyse comparative et négociation des offres.",livrables:["Devis comparatif","Devis v3 signé"],acteur:"AMOA",decision:"Devis v3 signé et gelé"},
  {nom:"Accompagnement financier",statut:"done",desc:"Montage financier, simulation de financement, accompagnement bancaire si nécessaire.",livrables:["Plan de financement","Échéancier prévisionnel"],acteur:"SPOC",decision:"Financement sécurisé",sousParts:["Accompagnement financement — partenaires bancaires"]},
  {nom:"Contractualisation",statut:"done",desc:"Signature des contrats avec les entreprises sélectionnées, ordre de service.",livrables:["Contrats signés","Ordre de service"],acteur:"SPOC / AMOA",decision:"Contrats signés — chantier autorisé"},
  {nom:"Construction",statut:"current",desc:"Exécution des travaux, suivi chantier, reporting, contrôle qualité et livraison.",livrables:["Rapports de chantier","Photos","PV intermédiaires"],acteur:"MOEX / AMOA",decision:"En cours — poteaux R+1"},
];

const FACTURES=[
  {id:"FAC-001",objet:"Acompte Gros Œuvre — Lot II",mt:14250000,s:"Payée",date:"15/02/2026",ech:"28/02/2026",lot:"Lot II",type:"Acompte travaux"},
  {id:"FAC-002",objet:"Études géotechniques",mt:1750000,s:"Payée",date:"20/01/2026",ech:"05/02/2026",lot:"Global",type:"Études"},
  {id:"FAC-003",objet:"Approvisionnement matériaux Phase 2",mt:8400000,s:"En attente",date:"10/04/2026",ech:"25/04/2026",lot:"Lot II",type:"Fournitures"},
  {id:"FAC-004",objet:"Main d'œuvre — Mars 2026",mt:3200000,s:"Validée",date:"01/04/2026",ech:"15/04/2026",lot:"Lot II",type:"Main d'œuvre"},
  {id:"FAC-005",objet:"Frais AMOA — T1 2026",mt:2800000,s:"Payée",date:"05/03/2026",ech:"20/03/2026",lot:"Global",type:"Honoraires"},
];

const PAIEMENTS=[
  {date:"28/02/2026",ref:"FAC-001",objet:"Acompte Gros Œuvre",mt:14250000,mode:"Virement Connect"},
  {date:"05/02/2026",ref:"FAC-002",objet:"Études géotechniques",mt:1750000,mode:"Virement Connect"},
  {date:"20/03/2026",ref:"FAC-005",objet:"Frais AMOA T1",mt:2800000,mode:"Orange Money"},
];

const RAPPORTS=[
  {id:"RV-04-12",date:"12/04/2026",type:"Visite AMOA",auteur:"S. Kamga",org:"WeCare",meteo:"Ensoleillé 31°C",lot:"Lot II",photos:12,statut:"Validé",resume:"Fondations conformes. Verticalité des murs dans les tolérances. Deux recommandations mineures sur coffrage zone B.",reco:"Renforcer étaiement zone B. Vérifier alignement ferraillage P4-P7.",vig:true,lu:true},
  {id:"RH-04-14",date:"14/04/2026",type:"Rapport hebdomadaire",auteur:"S. Kamga",org:"WeCare",meteo:"Variable",lot:"Global",photos:0,statut:"Validé",resume:"Semaine 16 : avancement conforme sauf 1 jour météo. Gros œuvre à 70%. Livraisons fer et sable réceptionnées. Prochaine étape : coulage poteaux R+1.",reco:"",vig:false,lu:true},
  {id:"RJ-04-16",date:"16/04/2026",type:"Rapport journalier",auteur:"B. Ekambi",org:"BTP Cameroun",meteo:"Ensoleillé 33°C",lot:"Lot II",photos:8,statut:"Validé",resume:"Coffrage poteaux R+1 zone A. 18 ouvriers. Coulage prévu jeudi 17/04.",reco:"",vig:false,lu:false},
  {id:"RJ-04-15",date:"15/04/2026",type:"Rapport journalier",auteur:"B. Ekambi",org:"BTP Cameroun",meteo:"Nuageux 30°C",lot:"Lot II",photos:6,statut:"Validé",resume:"Ferraillage avancé à 45%. Livraison 30 m³ sable + 100 barres fer réceptionnée conforme.",reco:"",vig:false,lu:true},
  {id:"RJ-04-13",date:"13/04/2026",type:"Rapport journalier",auteur:"B. Ekambi",org:"BTP Cameroun",meteo:"Forte pluie 26°C",lot:"Lot II",photos:3,statut:"Validé",resume:"Pluie forte (42 mm). Reprise partielle à 14h. Journée intempérie justifiée.",reco:"",vig:true,lu:true},
  {id:"RM-03-31",date:"31/03/2026",type:"Rapport mensuel",auteur:"S. Kamga",org:"WeCare",meteo:"—",lot:"Global",photos:0,statut:"Validé",resume:"Mars 2026 : avancement +12 pts. Budget conforme (+1.2% variation). 3 jours météo perdus. Gros œuvre fondations terminé à 100%. Passage poteaux RDC à R+1.",reco:"Sécuriser approvisionnement fer pour avril.",vig:false,lu:true},
];

const DOCUMENTS=[
  {nom:"Devis_V3_VillaEden_signée.pdf",cat:"Devis",type:"PDF",taille:"2.4 MB",date:"10/04/2026",auteur:"AMOA",version:"v3",statut:"Signé",action:null},
  {nom:"Rapport_visite_12-04-2026.pdf",cat:"Rapports",type:"PDF",taille:"8.1 MB",date:"12/04/2026",auteur:"AMOA",version:"v1",statut:"Validé",action:null},
  {nom:"Plans_APS_RDC_v2.dwg",cat:"Plans",type:"DWG",taille:"14 MB",date:"20/03/2026",auteur:"MOE",version:"v2",statut:"Validé",action:null},
  {nom:"Planning_Phase2.xlsx",cat:"Planning",type:"XLSX",taille:"1.8 MB",date:"01/04/2026",auteur:"AMOA",version:"v1",statut:"En vigueur",action:null},
  {nom:"Contrat_BTP_Cameroun.pdf",cat:"Contrats",type:"PDF",taille:"0.9 MB",date:"15/01/2026",auteur:"SPOC",version:"v1",statut:"Signé",action:null},
  {nom:"Photos_chantier_16-04.zip",cat:"Photos",type:"ZIP",taille:"45 MB",date:"16/04/2026",auteur:"MOEX",version:"—",statut:"Nouveau",action:"À consulter"},
  {nom:"Facture_FAC-003.pdf",cat:"Factures",type:"PDF",taille:"0.3 MB",date:"10/04/2026",auteur:"Système",version:"—",statut:"À payer",action:"À payer"},
  {nom:"Permis_de_construire.pdf",cat:"Administratif",type:"PDF",taille:"1.2 MB",date:"18/12/2025",auteur:"SPOC",version:"v1",statut:"Approuvé",action:null},
  {nom:"Plan_financement_VillaEden.pdf",cat:"Finances",type:"PDF",taille:"0.5 MB",date:"05/01/2026",auteur:"SPOC",version:"v1",statut:"Validé",action:null},
];

const MESSAGES=[
  {id:1,from:"Marie Atangana",role:"SPOC KOMA",avatar:"MA",objet:"Avancement chantier — coulage jeudi",preview:"Le coulage des poteaux R+1 est prévu jeudi.",time:"16/04 14:22",unread:true,priority:true},
  {id:2,from:"S. Kamga",role:"AMOA WeCare",avatar:"SK",objet:"Rapport de visite du 12/04",preview:"Le rapport de visite est disponible. RAS sur les fondations.",time:"12/04 18:30",unread:false},
  {id:3,from:"Marie Atangana",role:"SPOC KOMA",avatar:"MA",objet:"Facturation — FAC-003",preview:"Facture FAC-003 émise — 8,4M FCFA, échéance 25/04.",time:"10/04 11:15",unread:false},
  {id:4,from:"Marie Atangana",role:"SPOC KOMA",avatar:"MA",objet:"Devis v3 validé",preview:"Devis v3 signé. Le projet passe en phase construction.",time:"08/04 09:00",unread:false},
];

const METEO=[
  {j:"Mer 16",jc:"Aujourd'hui",ic:"☀️",co:"Ensoleillé",tM:33,tm:23,pluie:0,vent:8,al:"vert",impact:"Conditions idéales — tous travaux possibles"},
  {j:"Jeu 17",jc:"Demain",ic:"⛅",co:"Nuageux",tM:31,tm:22,pluie:0,vent:12,al:"vert",impact:"Coulage béton poteaux R+1 prévu ce jour"},
  {j:"Ven 18",jc:"",ic:"🌧️",co:"Forte pluie",tM:27,tm:21,pluie:35,vent:28,al:"rouge",impact:"Coffrage et coulage suspendus. Coulage avancé à jeudi par votre SPOC."},
  {j:"Sam 19",jc:"",ic:"🌦️",co:"Averses",tM:28,tm:21,pluie:12,vent:15,al:"orange",impact:"Travaux extérieurs ralentis — intérieurs maintenus"},
  {j:"Dim 20",jc:"",ic:"⛅",co:"Nuageux",tM:30,tm:22,pluie:2,vent:10,al:"vert",impact:"RAS"},
  {j:"Lun 21",jc:"",ic:"☀️",co:"Ensoleillé",tM:34,tm:23,pluie:0,vent:6,al:"vert",impact:"Conditions idéales"},
  {j:"Mar 22",jc:"",ic:"☀️",co:"Ensoleillé",tM:35,tm:24,pluie:0,vent:5,al:"vert",impact:"Conditions idéales"},
];

const DECISIONS=[
  {id:1,type:"Paiement",label:"Facture FAC-003 à régler",detail:"Matériaux Phase 2 (fer, sable, ciment) pour poursuite du gros œuvre.",mt:"8 400 000 FCFA",urgence:"haute",deadline:"25/04/2026",impact:"Retard possible lot II si non réglé avant le 25/04.",reco:"KOMA recommande de régler avant le 22/04 pour anticiper les délais bancaires.",lien:"finances"},
  {id:2,type:"Validation",label:"Choix de carrelage — séjour et chambres",detail:"3 options proposées par l'architecte. Catalogue et échantillons en annexe.",mt:null,urgence:"normale",deadline:"05/05/2026",impact:"Commande fournisseur bloquée tant que le choix n'est pas validé.",reco:"KOMA recommande l'option B (meilleur rapport qualité-prix, disponibilité immédiate).",lien:"documents"},
  {id:3,type:"Arbitrage",label:"Variante technique — type de charpente",detail:"Charpente bois vs charpente métallique. L'architecte propose une variante métallique plus rapide.",mt:"Surcoût estimé : 1,2M FCFA",urgence:"normale",deadline:"30/04/2026",impact:"Gain potentiel de 3 semaines sur le lot III si charpente métallique retenue.",reco:"KOMA analyse les deux options. Réunion technique programmée le 22/04.",lien:"avancement"},
  {id:4,type:"Lecture",label:"Rapport hebdomadaire semaine 16",detail:"Synthèse de la semaine : avancement, météo, livraisons, points d'attention.",mt:null,urgence:"normale",deadline:null,impact:null,reco:null,lien:"rapports"},
  {id:5,type:"Information",label:"Alerte météo — vendredi 18/04",detail:"Forte pluie prévue (35 mm). Coulage avancé à jeudi par votre SPOC.",mt:null,urgence:"info",deadline:null,impact:"Aucun impact planning. Mesure préventive déjà prise.",reco:null,lien:"meteo"},
];

const MATERIAUX=[
  {id:"MAT-001",nom:"Ciment CEM II 42.5",lot:"Lot II",op:"O5/O10/O11",unite:"tonnes",prevu:85,recu:72,couv:85,statut:"Disponible",liv:"17/04/2026",fourn:"CIMENCAM",crit:false},
  {id:"MAT-002",nom:"Fer à béton HA12",lot:"Lot II",op:"O5/O10/O11",unite:"barres",prevu:1200,recu:980,couv:82,statut:"Vigilance",liv:"19/04/2026",fourn:"Aciéries du Cameroun",crit:true},
  {id:"MAT-003",nom:"Agglos creux 15",lot:"Lot II",op:"O10/O11",unite:"unités",prevu:8000,recu:7200,couv:90,statut:"Disponible",liv:"—",fourn:"BCD Matériaux",crit:false},
  {id:"MAT-004",nom:"Sable lavé 0/5",lot:"Lot II",op:"O5/O9/O10",unite:"m³",prevu:120,recu:105,couv:88,statut:"Disponible",liv:"—",fourn:"Carrière Bonabéri",crit:false},
  {id:"MAT-005",nom:"Gravier 5/15",lot:"Lot II",op:"O5/O9",unite:"m³",prevu:95,recu:80,couv:84,statut:"Disponible",liv:"21/04/2026",fourn:"Carrière Bonabéri",crit:false},
  {id:"MAT-006",nom:"Tôles bac alu",lot:"Lot III",op:"O13",unite:"feuilles",prevu:180,recu:90,couv:50,statut:"En cours",liv:"28/04/2026",fourn:"Alu Technic",crit:false},
  {id:"MAT-007",nom:"Gaines ICTA 20mm",lot:"Lot IV",op:"O17",unite:"rouleaux",prevu:45,recu:0,couv:0,statut:"Commandé",liv:"15/05/2026",fourn:"Schneider CM",crit:false},
  {id:"MAT-008",nom:"Câbles 2.5mm²",lot:"Lot IV",op:"O17",unite:"mètres",prevu:2500,recu:0,couv:0,statut:"Commandé",liv:"15/05/2026",fourn:"Nexans Afrique",crit:false},
  {id:"MAT-009",nom:"Carreaux grès 60x60",lot:"Lot VI",op:"O26",unite:"m²",prevu:320,recu:0,couv:0,statut:"Rupture fourn.",liv:"Indéterminé",fourn:"Somocer",crit:true},
  {id:"MAT-010",nom:"Peinture acrylique",lot:"Lot VII",op:"O31",unite:"seaux 20L",prevu:40,recu:0,couv:0,statut:"Non commandé",liv:"—",fourn:"—",crit:false},
];

const COMMANDES=[
  {ref:"CMD-014",fourn:"CIMENCAM",mat:"Ciment 42.5 (15t)",statut:"En transit",prev:"17/04/2026",reel:null,ecart:null,mt:1875000},
  {ref:"CMD-015",fourn:"Aciéries du Cameroun",mat:"Fer HA12 (300 barres)",statut:"Confirmée",prev:"19/04/2026",reel:null,ecart:null,mt:2400000},
  {ref:"CMD-016",fourn:"Carrière Bonabéri",mat:"Gravier 5/15 (20 m³)",statut:"Confirmée",prev:"21/04/2026",reel:null,ecart:null,mt:340000},
  {ref:"CMD-012",fourn:"Carrière Bonabéri",mat:"Sable 0/5 (30 m³)",statut:"Reçue",prev:"15/04/2026",reel:"15/04/2026",ecart:"0j",mt:480000},
  {ref:"CMD-013",fourn:"Aciéries du Cameroun",mat:"Fer HA12 (100 barres)",statut:"Reçue",prev:"14/04/2026",reel:"15/04/2026",ecart:"+1j",mt:800000},
  {ref:"CMD-017",fourn:"Alu Technic",mat:"Tôles bac alu (90)",statut:"Commandée",prev:"28/04/2026",reel:null,ecart:null,mt:1620000},
];

const ALERTES_APPRO=[
  {niv:"rouge",mat:"Carreaux grès 60x60",lot:"Lot VI — Revêtements",cons:"Lancement finitions retardé si fournisseur ne confirme pas.",action:"Votre SPOC négocie une alternative locale. Arbitrage sous 10 jours."},
  {niv:"orange",mat:"Fer à béton HA12",lot:"Lot II — Gros œuvre",cons:"Stock estimé à 4 jours. Livraison 300 barres confirmée le 19/04.",action:"KOMA a sécurisé la commande complémentaire. Aucune action de votre part."},
  {niv:"vert",mat:"Ciment CEM II 42.5",lot:"Lot II — Gros œuvre",cons:"15 tonnes en transit, arrivée demain 17/04.",action:"Risque neutralisé. Approvisionnement conforme."},
];

const ETAPES_APPRO=[
  {etape:"Fondations",avA:100,avC:100,mats:"Ciment, fer HA10, sable, gravier",risque:"vert",detail:"Terminé. Tous matériaux livrés et consommés."},
  {etape:"Gros œuvre",avA:82,avC:72,mats:"Ciment, fer HA12, sable, gravier, agglos, bois coffrage",risque:"orange",detail:"Vigilance fer HA12 (stock 4j). Livraison complémentaire 19/04."},
  {etape:"Clos couvert",avA:50,avC:45,mats:"Tôles alu, charpente bois, menuiseries ext.",risque:"vert",detail:"Tôles en livraison. Charpente prévue mai."},
  {etape:"Second œuvre & finitions",avA:0,avC:0,mats:"Tubes PVC, câbles, gaines, carreaux, peinture",risque:"rouge",detail:"Rupture fournisseur carreaux 60x60. Alternative en négociation."},
  {etape:"Extérieurs & réception",avA:0,avC:0,mats:"Clôture, portail, plantations",risque:"vert",detail:"Commandes non encore requises. Échéance T1 2027."},
];

const FIL_ACTU=[
  {date:"16/04",heure:"14:38",type:"message",msg:"Votre SPOC vous a envoyé un message sur l'avancement chantier",icon:MessageSquare,c:T.cyan},
  {date:"16/04",heure:"10:00",msg:"Rapport journalier du 16/04 validé par l'AMOA",type:"rapport",icon:FileCheck,c:T.ok},
  {date:"15/04",heure:"16:20",msg:"Livraison réceptionnée : 30 m³ sable + 100 barres fer",type:"livraison",icon:Truck,c:T.sage},
  {date:"12/04",heure:"18:30",msg:"Visite AMOA — fondations conformes — rapport disponible",type:"rapport",icon:Eye,c:T.sage},
  {date:"10/04",heure:"11:15",msg:"Facture FAC-003 émise — 8,4M FCFA — échéance 25/04",type:"facture",icon:Receipt,c:T.warn},
  {date:"08/04",heure:"09:00",msg:"Devis v3 signé — passage en phase construction",type:"decision",icon:CheckCircle2,c:T.ok},
  {date:"05/04",heure:"14:00",msg:"Alerte météo annoncée pour la semaine 16",type:"alerte",icon:CloudSun,c:T.info},
  {date:"02/04",heure:"10:00",msg:"Rapport mensuel mars 2026 publié",type:"rapport",icon:BarChart2,c:T.purp},
];

/* ═══════════════════════════════════════════════════════
   UI PRIMITIVES
   ═══════════════════════════════════════════════════════ */
const bS={default:{bg:T.cyanLt,c:T.cyanDk},success:{bg:T.okLt,c:T.ok},warning:{bg:T.warnLt,c:T.warn},danger:{bg:T.errLt,c:T.err},info:{bg:T.infoLt,c:T.info},neutral:{bg:T.n100,c:T.n700},purple:{bg:T.purpLt,c:T.purp}};

function Badge({children, v="default", dot}) {
  const s = bS[v] || bS.default;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:T.rF,fontSize:10,fontWeight:600,background:s.bg,color:s.c,letterSpacing:.2,whiteSpace:"nowrap"}}>
      {dot && <span style={{width:5,height:5,borderRadius:"50%",background:s.c}} />}
      {children}
    </span>
  );
}

function SB({s}) {
  const m = {"En attente":"warning","Actif":"success","Validée":"success","Payée":"success","Validé":"success","En cours":"info","Nouveau":"info","Signé":"success","En vigueur":"success","À payer":"danger","À consulter":"info","Approuvé":"success","Confirmée":"default","Commandée":"neutral","En transit":"info","Reçue":"success","Commandé":"info","Rupture fourn.":"danger","Non commandé":"neutral","Disponible":"success","Vigilance":"warning"};
  return (<Badge v={m[s] || "default"} dot>{s}</Badge>);
}

function Pr({value, h=6, color, bg}) {
  const c = color || (value >= 80 ? T.ok : value >= 40 ? T.cyan : T.warn);
  return (
    <div style={{width:"100%",background:bg||T.n100,borderRadius:T.rF,height:h,overflow:"hidden"}}>
      <div style={{width:Math.min(100,value)+"%",height:"100%",borderRadius:T.rF,background:c,transition:"width .5s"}} />
    </div>
  );
}

function Card({children, style:ext, onClick, accent}) {
  const [h, sH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>onClick&&sH(true)} onMouseLeave={()=>sH(false)} style={{background:T.white,borderRadius:T.r16,padding:22,border:"1px solid "+T.n200,boxShadow:h?T.sh2:T.sh1,cursor:onClick?"pointer":"default",transition:"all .2s",transform:h?"translateY(-1px)":"none",borderTop:accent?"3px solid "+accent:undefined,...ext}}>
      {children}
    </div>
  );
}

function Btn({children, v="primary", icon:Ic, onClick, size="md", full}) {
  const p = v === "primary";
  const g = v === "ghost";
  const sz = size === "sm" ? {p:"6px 12px",fs:11} : size === "lg" ? {p:"10px 20px",fs:13} : {p:"8px 16px",fs:12};
  return (
    <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,borderRadius:T.r8,fontWeight:600,cursor:"pointer",fontSize:sz.fs,padding:sz.p,width:full?"100%":"auto",background:p?T.cyan:g?"transparent":T.n50,color:p?"#fff":g?T.cyan:T.n700,border:g?"1px solid "+T.n200:p?"none":"1px solid "+T.n200,transition:"all .15s"}}>
      {Ic && <Ic size={sz.fs} />}
      {children}
    </button>
  );
}

function SecTitle({children, sub}) {
  return (
    <div style={{marginBottom:4}}>
      <h3 style={{fontSize:15,fontWeight:700,color:T.ink,margin:0}}>{children}</h3>
      {sub && <p style={{fontSize:11,color:T.n500,margin:"2px 0 0"}}>{sub}</p>}
    </div>
  );
}

function Banner({children, type="info", icon:Ic}) {
  const s = {info:{bg:T.cyanBg,b:T.cyan+"22",c:T.cyanDk,ic:T.cyan},warn:{bg:T.warnBg,b:T.warn+"22",c:T.n800,ic:T.warn},err:{bg:T.errBg,b:T.err+"22",c:T.n800,ic:T.err},ok:{bg:T.okBg,b:T.ok+"22",c:T.n800,ic:T.ok}}[type];
  const Icon = Ic || (type === "err" ? AlertCircle : type === "warn" ? AlertTriangle : Info);
  return (
    <div style={{display:"flex",gap:10,padding:"12px 16px",borderRadius:T.r12,background:s.bg,border:"1px solid "+s.b}}>
      <Icon size={16} color={s.ic} style={{flexShrink:0,marginTop:1}} />
      <div style={{fontSize:12,color:s.c,lineHeight:1.7}}>{children}</div>
    </div>
  );
}

function Av({name, color, size=32}) {
  const ini = name.split(" ").map(function(w){return w[0];}).join("").slice(0,2);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:(color||T.cyan)+"14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.35,fontWeight:700,color:color||T.cyan,flexShrink:0}}>
      {ini}
    </div>
  );
}

function Tbl({cols, data}) {
  return (
    <div style={{overflowX:"auto",borderRadius:T.r12,border:"1px solid "+T.n200}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
        <thead>
          <tr style={{background:T.n50}}>
            {cols.map(function(c,i){return (<th key={i} style={{padding:"10px 14px",textAlign:"left",fontWeight:600,color:T.n500,fontSize:9,textTransform:"uppercase",letterSpacing:.4,borderBottom:"1px solid "+T.n200}}>{c.label}</th>);})}
          </tr>
        </thead>
        <tbody>
          {data.map(function(r,ri){return (
            <tr key={ri} style={{borderBottom:ri<data.length-1?"1px solid "+T.n100:"none"}}>
              {cols.map(function(c,ci){return (<td key={ci} style={{padding:"10px 14px",color:T.n700}}>{c.render?c.render(r):r[c.key]}</td>);})}
            </tr>
          );})}
        </tbody>
      </table>
    </div>
  );
}

function MC({label, value, sub, icon:Ic, color, accent}) {
  return (
    <Card style={{padding:16,textAlign:"center",borderTop:accent?"3px solid "+accent:undefined}}>
      {Ic && <div style={{width:32,height:32,borderRadius:T.r8,background:(color||T.cyan)+"10",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}><Ic size={15} color={color||T.cyan} /></div>}
      <div style={{fontSize:9,color:T.n500,textTransform:"uppercase",letterSpacing:.5,fontWeight:600}}>{label}</div>
      <div style={{fontSize:20,fontWeight:800,color:color||T.ink,marginTop:2}}>{value}</div>
      {sub && <div style={{fontSize:9,color:T.n400,marginTop:2}}>{sub}</div>}
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */
const NAV=[
  {k:"accueil",l:"Mon Projet",i:Home},
  {k:"decisions",l:"Décisions",i:Zap},
  {k:"avancement",l:"Avancement",i:Activity},
  {k:"finances",l:"Finances",i:Wallet},
  {k:"appro",l:"Appro chantier",i:Package},
  {k:"documents",l:"Documents",i:FolderOpen},
  {k:"rapports",l:"Rapports",i:FileCheck},
  {k:"messagerie",l:"Messagerie",i:MessageSquare},
  {k:"live",l:"Chantier Live",i:Video},
  {k:"meteo",l:"Météo Chantier",i:CloudSun},
];

function Sidebar({nav,onNav,open}){
  const dC=DECISIONS.filter(d=>d.urgence==="haute").length;
  const mC=MESSAGES.filter(m=>m.unread).length;
  return(
    <div style={{width:open?240:68,minHeight:"100vh",background:`linear-gradient(180deg,${T.ink} 0%,#262624 100%)`,color:"#fff",display:"flex",flexDirection:"column",flexShrink:0,transition:"width .25s",overflow:"hidden"}}>
      <div style={{padding:"20px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,.06)",minHeight:68}}>
        <div style={{width:36,height:36,borderRadius:T.r12,background:`linear-gradient(135deg,${T.cyan} 0%,${T.sage} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,flexShrink:0}}>K</div>
        {open&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}><div style={{fontSize:14,fontWeight:800,letterSpacing:-.3}}>KOMA</div><div style={{fontSize:8,color:T.sage,textTransform:"uppercase",letterSpacing:2,marginTop:-1}}>Expertise</div></div>}
      </div>
      {open&&<div style={{padding:"12px 16px 6px",fontSize:8,color:"rgba(255,255,255,.25)",textTransform:"uppercase",letterSpacing:1.2,fontWeight:600}}>Navigation</div>}
      <div style={{padding:"4px 8px",flex:1,display:"flex",flexDirection:"column",gap:2}}>
        {NAV.map(it=>{const a=nav===it.k;const b=it.k==="decisions"?dC:it.k==="messagerie"?mC:it.k==="appro"?ALERTES_APPRO.filter(x=>x.niv==="rouge").length:0;return(
          <button key={it.k} onClick={()=>onNav(it.k)} style={{display:"flex",alignItems:"center",gap:10,padding:open?"10px 14px":"10px 0",justifyContent:open?"flex-start":"center",borderRadius:T.r8,border:"none",cursor:"pointer",width:"100%",background:a?`linear-gradient(135deg,${T.cyan}20,${T.sage}15)`:"transparent",color:a?T.sage:"rgba(255,255,255,.45)",fontSize:12,fontWeight:a?600:400,textAlign:"left",transition:"all .15s",borderLeft:a?`3px solid ${T.sage}`:"3px solid transparent",position:"relative"}}>
            <it.i size={16} style={{flexShrink:0}}/>
            {open&&<span style={{flex:1}}>{it.l}</span>}
            {b>0&&<div style={{position:open?"relative":"absolute",top:open?"auto":4,right:open?"auto":8,width:18,height:18,borderRadius:"50%",background:T.err,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{b}</div>}
          </button>);})}
      </div>
      <div style={{padding:16,borderTop:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${T.cyan},${T.sage})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>JF</div>
          {open&&<div style={{overflow:"hidden"}}><div style={{fontSize:12,fontWeight:600}}>Jean-Pierre Fouda</div><div style={{fontSize:9,color:"rgba(255,255,255,.35)"}}>2 projets actifs</div></div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 1 — MON PROJET
   ═══════════════════════════════════════════════════════ */
function PageAccueil({onNav}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {/* HERO */}
      <div style={{borderRadius:T.r20,overflow:"hidden",position:"relative",background:`linear-gradient(135deg,${T.ink} 0%,#2a3a4a 50%,${T.cyanDk} 100%)`,padding:"28px 32px",color:"#fff"}}>
        <div style={{position:"absolute",top:0,right:0,width:"40%",height:"100%",background:`radial-gradient(ellipse at 80% 30%,${T.cyan}15 0%,transparent 70%)`}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><Badge v="success" dot>En cours</Badge><span style={{fontSize:10,color:"rgba(255,255,255,.5)"}}>Phase {P.phase}/{P.totalPhases} — {P.phaseLabel}</span></div>
              <h1 style={{fontSize:26,fontWeight:900,margin:0,letterSpacing:-.5}}>{P.nom}</h1>
              <div style={{display:"flex",alignItems:"center",gap:16,marginTop:8,fontSize:12,color:"rgba(255,255,255,.7)"}}>
                <span style={{display:"flex",alignItems:"center",gap:4}}><MapPin size={12}/>{P.loc}</span>
                <span>{P.typo}</span>
              </div>
              <div style={{display:"flex",gap:16,marginTop:6,fontSize:11,color:"rgba(255,255,255,.5)"}}>
                <span>{P.surface}</span><span>{P.niv}</span><span>Terrain : {P.terrain}</span>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:4}}>Livraison estimée : <b style={{color:"rgba(255,255,255,.9)"}}>{P.livr}</b></div>
            </div>
            <div style={{textAlign:"right",paddingTop:8}}>
              <div style={{fontSize:48,fontWeight:900,lineHeight:1,letterSpacing:-2}}>{P.av}<span style={{fontSize:20,fontWeight:600}}>%</span></div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginTop:2}}>d'avancement global</div>
              <div style={{width:140,marginTop:8}}><Pr value={P.av} h={4} color={T.sage} bg="rgba(255,255,255,.12)"/></div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",marginTop:24}}>
            {PHASES_DATA.map((ph,i)=>{const done=ph.statut==="done"&&i<P.phase-1;const act=ph.statut==="current";return(
              <div key={i} style={{flex:1,textAlign:"center",position:"relative"}}>
                {i>0&&<div style={{position:"absolute",top:11,right:"50%",width:"100%",height:2,background:done?T.sage+"60":"rgba(255,255,255,.08)",zIndex:0}}/>}
                <div style={{width:act?24:20,height:act?24:20,borderRadius:"50%",margin:"0 auto",background:done?T.sage:act?T.cyan:"rgba(255,255,255,.08)",color:done||act?"#fff":"rgba(255,255,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,zIndex:1,position:"relative",boxShadow:act?`0 0 12px ${T.cyan}40`:"none"}}>
                  {done?<CheckCircle2 size={10}/>:i+1}
                </div>
                <div style={{fontSize:7,marginTop:4,fontWeight:act?700:400,color:done||act?"rgba(255,255,255,.85)":"rgba(255,255,255,.2)"}}>{ph.nom}</div>
              </div>);})}
          </div>
        </div>
      </div>

      {/* RÉSUMÉ PROJET — remonté */}
      <Card style={{background:`linear-gradient(135deg,${T.cyanBg} 0%,${T.sageLt} 100%)`,border:`1px solid ${T.cyan}15`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${T.cyan},${T.sage})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={15} color="#fff"/></div>
          <div><div style={{fontSize:14,fontWeight:700,color:T.ink}}>Résumé de votre projet</div><div style={{fontSize:10,color:T.n500}}>Mise à jour : 16/04/2026</div></div>
        </div>
        <div style={{fontSize:13,color:T.n800,lineHeight:1.9}}>
          Votre projet <b>Villa Éden</b> avance conformément aux prévisions. Le gros œuvre est à <b>72 %</b> et l'équipe prépare le <b>coffrage des poteaux R+1</b>.
          <br/><br/>
          <b>Cette semaine :</b> le coulage béton est prévu <b>jeudi 17/04</b>. Votre SPOC a anticipé la pluie de vendredi en avançant cette opération d'un jour.
          <br/><br/>
          <b>Budget :</b> <span style={{color:T.ok}}>44 % consommé pour 44 % d'avancement</span> — parfaitement aligné. Le budget a augmenté de +2,9 % suite à un renforcement technique recommandé par l'AMOA et validé par vous.
          <br/><br/>
          <b>Votre prochaine action :</b> <span style={{color:T.err,fontWeight:700}}>régler la facture FAC-003</span> (8,4M FCFA, échéance 25/04).
        </div>
      </Card>

      {/* SANTÉ DU PROJET */}
      <Card>
        <SecTitle sub="Performance coûts, délais et qualité de votre projet">Santé du projet</SecTitle>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          {[
            {label:"Coûts",status:P.rCout,detail:"Budget à +2,9 % du prévisionnel. Écart maîtrisé : renforcement technique validé.",maitrise:"Maîtrisé"},
            {label:"Délais",status:P.rDelai,detail:"5 jours de retard cumulé dont 3 justifiés (intempéries). Coulage avancé pour rattraper.",maitrise:"En cours de rattrapage"},
            {label:"Qualité",status:P.rQual,detail:"Aucune non-conformité. Dernière visite AMOA le 12/04 : fondations conformes.",maitrise:"Conforme"},
          ].map((s,i)=>{const cfg={ok:{c:T.ok,ic:CheckCircle2},warn:{c:T.warn,ic:AlertTriangle},err:{c:T.err,ic:AlertCircle}};const st=cfg[s.status];return(
            <div key={i} style={{flex:1,padding:"12px 14px",borderRadius:T.r12,background:st.c+"06",border:`1px solid ${st.c}12`}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                <st.ic size={14} color={st.c}/><span style={{fontSize:13,fontWeight:700,color:T.ink}}>{s.label}</span>
                <Badge v={s.status==="ok"?"success":s.status==="warn"?"warning":"danger"}>{s.maitrise}</Badge>
              </div>
              <div style={{fontSize:11,color:T.n600,lineHeight:1.5}}>{s.detail}</div>
            </div>);})}
        </div>
      </Card>

      {/* ACTION REQUISE */}
      {DECISIONS.filter(d=>d.urgence==="haute").length>0&&(
        <Card accent={T.err} style={{background:T.errBg}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:T.err+"14",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={14} color={T.err}/></div>
            <div><div style={{fontSize:14,fontWeight:700,color:T.err}}>Action requise</div><div style={{fontSize:10,color:T.n600}}>Éléments bloquants nécessitant votre intervention</div></div>
          </div>
          {DECISIONS.filter(d=>d.urgence==="haute").map((d,i)=>(
            <div key={i} style={{padding:"14px 16px",borderRadius:T.r12,background:T.white,marginBottom:6,border:`1px solid ${T.n200}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <Badge v="danger" dot>Urgent</Badge><Badge v="neutral">{d.type}</Badge>
                    {d.deadline&&<span style={{fontSize:10,color:T.n400}}>Échéance : {d.deadline}</span>}
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:T.ink}}>{d.label}</div>
                  <div style={{fontSize:11,color:T.n600,marginTop:2}}>{d.detail}</div>
                  {d.mt&&<div style={{fontSize:13,fontWeight:800,color:T.ink,marginTop:6}}>{d.mt}</div>}
                  {d.impact&&<div style={{fontSize:11,color:T.n500,marginTop:4,padding:"6px 10px",borderRadius:T.r8,background:T.warnBg,borderLeft:`3px solid ${T.warn}`}}><b>Impact :</b> {d.impact}</div>}
                  {d.reco&&<div style={{fontSize:11,color:T.cyanDk,marginTop:4,padding:"6px 10px",borderRadius:T.r8,background:T.cyanLt,borderLeft:`3px solid ${T.cyan}`}}><b>Recommandation KOMA :</b> {d.reco}</div>}
                </div>
                <Btn onClick={()=>onNav(d.lien)} icon={ArrowRight}>Traiter</Btn>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* KPIs FINANCIERS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        <MC label="Budget actualisé" value={fmt(P.actu)} sub="FCFA" icon={Target} color={T.ink}/>
        <MC label="Engagé" value={fmt(P.engage)} sub={`${((P.engage/P.actu)*100).toFixed(0)}% du budget`} icon={Banknote} color={T.info}/>
        <MC label="Payé" value={fmt(P.paye)} sub={`${((P.paye/P.actu)*100).toFixed(0)}% — aligné avec avancement`} icon={CheckCircle2} color={T.ok}/>
        <MC label="Reste à payer" value={fmt(P.rap)} sub="FCFA" icon={Clock} color={T.warn} accent={T.warn}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {/* ACTIVITÉ RÉCENTE */}
        <Card>
          <SecTitle sub="Derniers événements sur votre projet">Activité récente</SecTitle>
          <div style={{marginTop:12}}>
            {FIL_ACTU.slice(0,5).map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"10px 0",borderBottom:i<4?`1px solid ${T.n100}`:"none"}}>
                <div style={{width:30,height:30,borderRadius:T.r8,background:a.c+"0D",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><a.icon size={13} color={a.c}/></div>
                <div style={{flex:1}}><div style={{fontSize:12,color:T.ink,lineHeight:1.4}}>{a.msg}</div></div>
                <span style={{fontSize:9,color:T.n400,flexShrink:0,marginTop:2}}>{a.date}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* INTERVENANTS */}
        <Card>
          <SecTitle sub="L'équipe qui pilote et sécurise votre projet">Vos intervenants</SecTitle>
          <div style={{marginTop:12}}>
            {[
              {role:"SPOC",desc:"Votre interlocuteur principal — il coordonne tout pour vous",nom:P.spoc,org:"KOMA Expertise",c:T.cyan,main:true},
              {role:"AMOA",desc:"Conseil et contrôle — il défend vos intérêts",nom:P.amoa,org:"WeCare",c:T.sage},
              {role:"MOE",desc:"Conception technique et études architecturales",nom:P.moe,org:"Njoya Architecture",c:T.purp},
              {role:"MOEX",desc:"Coordination et exécution des travaux sur le chantier",nom:P.moex,org:"BTP Cameroun",c:T.warn},
            ].map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:T.r12,background:a.main?T.cyanBg:"transparent",marginBottom:4,border:a.main?`1px solid ${T.cyan}15`:"none"}}>
                <Av name={a.nom} color={a.c}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:12,fontWeight:600,color:T.ink}}>{a.nom}</span><Badge v={a.main?"default":"neutral"}>{a.role}</Badge></div>
                  <div style={{fontSize:10,color:T.n500,marginTop:1}}>{a.desc}</div>
                </div>
                {a.main&&<Btn v="ghost" size="sm" icon={MessageSquare} onClick={()=>onNav("messagerie")}>Contacter</Btn>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* PROCHAINES ÉCHÉANCES */}
      <Card>
        <SecTitle sub="Jalons à venir et actions à anticiper">Prochaines échéances</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:12}}>
          {[
            {date:"17/04",mois:"Avril",label:"Coulage béton poteaux R+1",cat:"Chantier",c:T.cyan,client:false,impact:"Étape structurelle majeure du gros œuvre"},
            {date:"25/04",mois:"Avril",label:"Échéance facture FAC-003",cat:"Paiement",c:T.err,client:true,impact:"Retard possible sur approvisionnement si non réglée"},
            {date:"05/05",mois:"Mai",label:"Choix carrelage à valider",cat:"Décision client",c:T.warn,client:true,impact:"Commande fournisseur bloquée en attente de votre choix"},
          ].map((e,i)=>(
            <div key={i} style={{padding:"16px 18px",borderRadius:T.r12,background:T.n50,borderLeft:`3px solid ${e.c}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div><div style={{fontSize:20,fontWeight:900,color:T.ink}}>{e.date.split("/")[0]}</div><div style={{fontSize:9,color:T.n400}}>{e.mois} 2026</div></div>
                {e.client&&<Badge v="warning" dot>Action client</Badge>}
              </div>
              <div style={{fontSize:12,fontWeight:600,color:T.ink,marginBottom:4}}>{e.label}</div>
              <Badge v="neutral">{e.cat}</Badge>
              <div style={{fontSize:10,color:T.n500,marginTop:6,lineHeight:1.4}}>{e.impact}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 2 — DÉCISIONS
   ═══════════════════════════════════════════════════════ */
function PageDecisions({onNav}){
  const[filter,setF]=useState("all");
  const filtered=filter==="all"?DECISIONS:DECISIONS.filter(d=>d.type.toLowerCase()===filter);
  const uS={haute:{bg:T.errBg,b:T.err,bv:"danger",l:"Urgent"},normale:{bg:T.white,b:T.cyan,bv:"default",l:"À faire"},info:{bg:T.infoBg,b:T.info,bv:"info",l:"Information"}};
  const tI={Paiement:CreditCard,Validation:CheckCircle2,Arbitrage:Target,Lecture:Eye,Information:Info};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div><h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Centre de Décisions</h2><p style={{fontSize:12,color:T.n500,margin:"4px 0 0"}}>Tout ce qui attend votre attention, classé par priorité</p></div>
      <div style={{display:"flex",gap:10}}>
        {[{l:"Urgent",n:DECISIONS.filter(d=>d.urgence==="haute").length,c:T.err,d:"bloquent le planning"},{l:"À traiter",n:DECISIONS.filter(d=>d.urgence==="normale").length,c:T.cyan,d:"nécessitent votre choix"},{l:"Information",n:DECISIONS.filter(d=>d.urgence==="info").length,c:T.info,d:"pour votre information"}].map((s,i)=>(
          <div key={i} style={{flex:1,padding:"14px 16px",borderRadius:T.r12,background:s.c+"08",border:`1px solid ${s.c}15`}}>
            <div style={{fontSize:28,fontWeight:900,color:s.c}}>{s.n}</div>
            <div style={{fontSize:11,fontWeight:600,color:T.n700}}>{s.l}</div>
            <div style={{fontSize:10,color:T.n500,marginTop:2}}>{s.d}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:6}}>
        {[{k:"all",l:"Tout"},{k:"paiement",l:"Paiements"},{k:"validation",l:"Validations"},{k:"arbitrage",l:"Arbitrages"},{k:"lecture",l:"Lectures"},{k:"information",l:"Infos"}].map(f=>(
          <button key={f.k} onClick={()=>setF(f.k)} style={{padding:"6px 14px",borderRadius:T.rF,fontSize:11,fontWeight:filter===f.k?600:400,border:`1px solid ${filter===f.k?T.cyan:T.n200}`,background:filter===f.k?T.cyanLt:T.white,color:filter===f.k?T.cyanDk:T.n600,cursor:"pointer"}}>{f.l}</button>
        ))}
      </div>
      {filtered.map(d=>{const us=uS[d.urgence]||uS.info;const Ic=tI[d.type]||Info;return(
        <Card key={d.id} style={{background:us.bg,borderLeft:`4px solid ${us.b}`,padding:0}}>
          <div style={{padding:"18px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <Badge v={us.bv} dot>{us.l}</Badge><Badge v="neutral"><Ic size={10} style={{marginRight:3}}/>{d.type}</Badge>
                  {d.deadline&&<span style={{fontSize:10,color:T.n400}}>Échéance : {d.deadline}</span>}
                </div>
                <div style={{fontSize:15,fontWeight:700,color:T.ink,marginBottom:4}}>{d.label}</div>
                <div style={{fontSize:12,color:T.n600,lineHeight:1.6}}>{d.detail}</div>
                {d.mt&&<div style={{fontSize:14,fontWeight:800,color:T.ink,marginTop:8,padding:"6px 12px",background:T.white,borderRadius:T.r8,display:"inline-block",border:`1px solid ${T.n200}`}}>{d.mt}</div>}
                {d.impact&&<div style={{fontSize:11,color:T.n500,marginTop:8,padding:"8px 12px",borderRadius:T.r8,background:"rgba(255,255,255,.6)",borderLeft:`3px solid ${T.warn}`}}><b>Impact :</b> {d.impact}</div>}
                {d.reco&&<div style={{fontSize:11,color:T.cyanDk,marginTop:6,padding:"8px 12px",borderRadius:T.r8,background:T.cyanLt,borderLeft:`3px solid ${T.cyan}`}}><b>Recommandation KOMA :</b> {d.reco}</div>}
              </div>
              <Btn onClick={()=>onNav(d.lien)} icon={ArrowRight}>{d.type==="Paiement"?"Payer":d.type==="Validation"?"Valider":d.type==="Arbitrage"?"Arbitrer":"Consulter"}</Btn>
            </div>
          </div>
        </Card>);})}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 3 — AVANCEMENT
   ═══════════════════════════════════════════════════════ */
function PageAvancement(){
  const[selJalon,setSelJ]=useState(null);
  const[selLot,setSelL]=useState(null);
  const ecart=P.av-P.avP;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Avancement du Projet</h2>
      <Banner type={ecart>=0?"ok":"warn"} icon={ecart>=0?CheckCircle2:AlertTriangle}>
        <b>Phase Construction</b> (étape {P.phase}/{P.totalPhases}). Avancement réel : <b>{P.av} %</b> vs <b>{P.avP} % planifié</b>.
        {ecart<0?` Écart de ${Math.abs(ecart)} points dû à 3 jours d'intempéries. Écart maîtrisé — pas d'impact sur la date de livraison.`:" Projet dans les temps."}
      </Banner>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        <MC label="Avancement réel" value={`${P.av}%`} icon={Activity} color={T.cyan}/>
        <MC label="Planifié" value={`${P.avP}%`} icon={Target} color={T.n500}/>
        <MC label="Écart" value={`${ecart>0?"+":""}${ecart} pts`} icon={ecart>=0?TrendingUp:TrendingDown} color={ecart>=0?T.ok:T.warn}/>
        <MC label="Livraison" value={P.livr} icon={CalendarDays} color={T.ink}/>
      </div>

      {/* JALONS CLIQUABLES */}
      <Card>
        <SecTitle sub="Cliquez sur une étape pour voir le détail complet">Jalons du projet</SecTitle>
        <div style={{marginTop:14,position:"relative",paddingLeft:24}}>
          <div style={{position:"absolute",left:10,top:0,bottom:0,width:2,background:T.n200}}/>
          {PHASES_DATA.map((j,i)=>{const c=j.statut==="done"?T.ok:j.statut==="current"?T.cyan:T.n300;const sel=selJalon===i;return(
            <div key={i}>
              <div onClick={()=>setSelJ(sel?null:i)} style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:sel?8:16,position:"relative",cursor:"pointer",padding:"6px 0",borderRadius:T.r8}}>
                <div style={{position:"absolute",left:-18,top:10,width:12,height:12,borderRadius:"50%",background:c,zIndex:1,boxShadow:j.statut==="current"?`0 0 8px ${T.cyan}30`:"none"}}/>
                <div style={{minWidth:80}}><span style={{fontSize:10,color:T.n400,fontWeight:600}}>{["Oct 2025","Nov 2025","Déc 2025","Jan 2026","Fév 2026","Mar 2026","Mars 2026","Avr 2026"][i]}</span></div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:13,fontWeight:j.statut==="current"?700:500,color:j.statut==="future"?T.n400:T.ink}}>{j.nom}</span>
                    {j.statut==="current"&&<Badge v="default" dot>En cours</Badge>}
                    {j.statut==="done"&&<Badge v="success">Terminé</Badge>}
                    <ChevronDown size={12} color={T.n400} style={{transform:sel?"rotate(180deg)":"none",transition:"transform .2s"}}/>
                  </div>
                  <div style={{fontSize:11,color:T.n500,marginTop:2}}>{j.desc}</div>
                </div>
              </div>
              {sel&&(
                <div style={{marginLeft:30,marginBottom:16,padding:"16px 18px",borderRadius:T.r12,background:T.n50,border:`1px solid ${T.n200}`,borderLeft:`4px solid ${c}`}}>
                  <div style={{fontSize:12,fontWeight:600,color:T.ink,marginBottom:8}}>Détail de l'étape : {j.nom}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:11,color:T.n700}}>
                    <div><b>Acteur principal :</b> {j.acteur}</div>
                    <div><b>Décision :</b> {j.decision}</div>
                  </div>
                  <div style={{marginTop:10}}><b style={{fontSize:11}}>Livrables :</b>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>{j.livrables.map((l,li)=><Badge key={li} v="neutral">{l}</Badge>)}</div>
                  </div>
                  {j.sousParts&&<div style={{marginTop:10,padding:"8px 12px",borderRadius:T.r8,background:T.cyanLt,border:`1px solid ${T.cyan}15`,fontSize:11,color:T.cyanDk}}><b>Sous-partie :</b> {j.sousParts.join(", ")}</div>}
                </div>
              )}
            </div>);})}
        </div>
      </Card>

      {/* LOTS CLIQUABLES */}
      <Card>
        <SecTitle sub="Cliquez sur un lot pour voir le détail des opérations et l'état financier">Avancement par lot</SecTitle>
        <div style={{marginTop:14}}>
          {LOTS.map((l,i)=>{const ecL=l.reel-l.plan;const isA=l.reel>0&&l.reel<100;const sel=selLot===i;return(
            <div key={i}>
              <div onClick={()=>setSelL(sel?null:i)} style={{padding:"12px 14px",borderRadius:T.r12,background:isA?T.cyanBg:T.n50,marginBottom:sel?4:6,border:isA?`1px solid ${T.cyan}15`:`1px solid ${T.n100}`,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:12,fontWeight:700,color:T.ink}}>{l.code}</span>
                    <span style={{fontSize:12,color:T.n600}}>{l.nom}</span>
                    {l.reel===100&&<Badge v="success">Terminé</Badge>}
                    {isA&&<Badge v="default" dot>En cours</Badge>}
                    {l.reel===0&&l.plan===0&&<Badge v="neutral">À venir</Badge>}
                    <ChevronDown size={12} color={T.n400} style={{transform:sel?"rotate(180deg)":"none",transition:"transform .2s"}}/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    {ecL!==0&&l.plan>0&&<span style={{fontSize:10,fontWeight:600,color:ecL>=0?T.ok:T.err}}>{ecL>0?"+":""}{ecL} pts</span>}
                    <span style={{fontSize:13,fontWeight:800,color:T.ink}}>{l.reel}%</span>
                  </div>
                </div>
                <div style={{position:"relative",height:8,background:T.n200,borderRadius:T.rF}}>
                  {l.plan>0&&<div style={{position:"absolute",left:`${l.plan}%`,top:-2,bottom:-2,width:2,background:T.n400,borderRadius:1,zIndex:2}}/>}
                  <div style={{position:"absolute",top:0,left:0,height:"100%",borderRadius:T.rF,width:`${l.reel}%`,background:l.reel>=l.plan?T.ok:l.reel>=l.plan*.85?T.warn:T.err}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:9,color:T.n400}}><span>Réel : {l.reel}%</span><span>Planifié : {l.plan}%</span><span>Budget : {fmt(l.budget)} FCFA</span></div>
              </div>
              {sel&&(
                <div style={{marginBottom:8,padding:"16px 18px",borderRadius:T.r12,background:T.white,border:"1px solid "+T.n200,borderLeft:"4px solid "+T.cyan}}>
                  <div style={{fontSize:12,fontWeight:600,color:T.ink,marginBottom:4}}>{l.code} — {l.nom}</div>
                  <div style={{fontSize:11,color:T.n600,marginBottom:10}}>{l.desc}</div>
                  <div style={{fontSize:11,fontWeight:600,color:T.n700,marginBottom:8}}>Opérations rattachées :</div>
                  <div style={{borderRadius:T.r8,border:"1px solid "+T.n200,overflow:"hidden"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
                      <thead>
                        <tr style={{background:T.n50}}>
                          <th style={{padding:"7px 10px",textAlign:"left",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Code</th>
                          <th style={{padding:"7px 10px",textAlign:"left",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Opération</th>
                          <th style={{padding:"7px 10px",textAlign:"left",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Statut</th>
                          <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Réel</th>
                          <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Planifié</th>
                          <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Écart</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(OPS[l.code]||[]).map(function(op,oi){
                          var ec = op.reel - op.plan;
                          return (
                            <tr key={oi} style={{borderBottom:"1px solid "+T.n100}}>
                              <td style={{padding:"7px 10px",fontFamily:"monospace",fontWeight:600,color:T.cyan,fontSize:10}}>{op.c}</td>
                              <td style={{padding:"7px 10px",color:T.ink,fontWeight:500}}>{op.n}</td>
                              <td style={{padding:"7px 10px"}}><SB s={op.s} /></td>
                              <td style={{padding:"7px 10px",textAlign:"right",fontWeight:700,color:T.ink}}>{op.reel}%</td>
                              <td style={{padding:"7px 10px",textAlign:"right",color:T.n500}}>{op.plan}%</td>
                              <td style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:ec===0?T.n400:ec>0?T.ok:T.err}}>{ec===0?"—":(ec>0?"+":"")+ec+" pts"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>);})}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 4 — FINANCES
   ═══════════════════════════════════════════════════════ */
function PageFinances(){
  const[showPay,setShowPay]=useState(false);
  const[selFLot,setSelFLot]=useState(null);
  const bv=((P.actu-P.budget)/P.budget*100).toFixed(1);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Suivi Financier</h2>
      <Banner type="info">Budget initial <b>120M FCFA</b>, actualisé à <b>123,5M</b> (+{bv} %). L'écart provient d'un renforcement technique validé et de la hausse du ciment. <b>KOMA a généré 1,8M d'économies</b> pour limiter l'impact.</Banner>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        <Card style={{padding:18}}><div style={{fontSize:9,color:T.n500,textTransform:"uppercase",fontWeight:600,letterSpacing:.5}}>Budget initial → Actualisé</div><div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:6}}><span style={{fontSize:22,fontWeight:900,color:T.ink}}>{fmt(P.actu)}</span><span style={{fontSize:11,color:T.warn,fontWeight:600}}>+{bv}%</span></div><div style={{fontSize:10,color:T.n400,marginTop:2}}>Initial : {fmt(P.budget)} FCFA</div></Card>
        <Card style={{padding:18}}><div style={{fontSize:9,color:T.n500,textTransform:"uppercase",fontWeight:600,letterSpacing:.5}}>Payé / Engagé</div><div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:6}}><span style={{fontSize:22,fontWeight:900,color:T.ok}}>{fmt(P.paye)}</span><span style={{fontSize:11,color:T.n400}}>sur {fmt(P.engage)} engagés</span></div><div style={{marginTop:8}}><Pr value={(P.paye/P.actu)*100} h={5} color={T.ok}/></div><div style={{fontSize:10,color:T.n400,marginTop:4}}>{((P.paye/P.actu)*100).toFixed(0)}% consommé — {P.av}% d'avancement physique</div></Card>
        <Card style={{padding:18,borderTop:`3px solid ${T.warn}`}}><div style={{fontSize:9,color:T.n500,textTransform:"uppercase",fontWeight:600,letterSpacing:.5}}>Reste à payer</div><div style={{fontSize:22,fontWeight:900,color:T.warn,marginTop:6}}>{fmt(P.rap)}</div><div style={{fontSize:10,color:T.n400,marginTop:2}}>FCFA · Selon échéancier validé</div></Card>
      </div>

      {/* Pourquoi le budget a évolué */}
      <Card><SecTitle>Pourquoi le budget a évolué ?</SecTitle>
        <div style={{marginTop:10}}>
          {[{r:"Renforcement fondation zone B",mt:"+1 800 000",type:"Arbitrage technique",d:"15/03/2026",icon:Shield,c:T.warn},
            {r:"Hausse prix ciment (+8% marché)",mt:"+1 200 000",type:"Hausse marché",d:"01/04/2026",icon:TrendingUp,c:T.err},
            {r:"Optimisation ferraillage par le MOE",mt:"-500 000",type:"Économie générée",d:"20/03/2026",icon:Sparkles,c:T.ok}
          ].map((v,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<2?`1px solid ${T.n100}`:"none"}}>
              <div style={{width:28,height:28,borderRadius:T.r8,background:v.c+"10",display:"flex",alignItems:"center",justifyContent:"center"}}><v.icon size={13} color={v.c}/></div>
              <div style={{flex:1}}><div style={{fontSize:12,color:T.ink}}>{v.r}</div><div style={{display:"flex",gap:6,marginTop:2}}><Badge v="neutral">{v.type}</Badge><span style={{fontSize:10,color:T.n400}}>{v.d}</span></div></div>
              <span style={{fontSize:13,fontWeight:700,color:v.mt.startsWith("+")?T.err:T.ok}}>{v.mt} FCFA</span>
            </div>
          ))}
        </div>
      </Card>

      {/* OPTIMISATIONS & ARBITRAGES — Nouveau bloc */}
      <Card accent={T.ok} style={{background:T.okBg}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:T.ok+"14",display:"flex",alignItems:"center",justifyContent:"center"}}><Award size={16} color={T.ok}/></div>
          <div><div style={{fontSize:14,fontWeight:700,color:T.ink}}>Optimisations & valeur ajoutée KOMA</div><div style={{fontSize:10,color:T.n500}}>Ce que KOMA a fait pour protéger et optimiser votre budget</div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{label:"Optimisation ferraillage",detail:"Réduction de 12% du fer utilisé grâce à un calcul structure optimisé par le MOE.",gain:"-500 000 FCFA",icon:Target},
            {label:"Négociation fournisseur sable",detail:"Remise de 8% obtenue par KOMA via commande groupée avec 2 autres chantiers.",gain:"-180 000 FCFA",icon:Banknote},
            {label:"Anticipation météo",detail:"Coulage avancé d'un jour — évite 2 jours d'arrêt et 400 000 FCFA de surcoût équipe.",gain:"400 000 FCFA évités",icon:CloudSun},
            {label:"Variante bois local",detail:"Remplacement du bois importé par du bois camerounais certifié — même qualité, coût réduit.",gain:"-320 000 FCFA",icon:Sparkles},
          ].map((o,i)=>(
            <div key={i} style={{padding:"12px 14px",borderRadius:T.r12,background:T.white,border:`1px solid ${T.n200}`}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><o.icon size={13} color={T.ok}/><span style={{fontSize:12,fontWeight:600,color:T.ink}}>{o.label}</span></div>
              <div style={{fontSize:11,color:T.n600,lineHeight:1.5,marginBottom:6}}>{o.detail}</div>
              <Badge v="success">{o.gain}</Badge>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,padding:"10px 14px",borderRadius:T.r8,background:T.white,border:`1px solid ${T.ok}20`,textAlign:"center"}}>
          <span style={{fontSize:13,fontWeight:800,color:T.ok}}>Total économies et coûts évités : ~ 1 400 000 FCFA</span>
        </div>
      </Card>

      {/* Ventilation par lot */}
      <Card><SecTitle sub="Cliquez sur un lot pour voir le détail financier par opération">Ventilation par lot</SecTitle>
        <div style={{marginTop:12}}>
          {LOTS.map(function(l, i){
            var isSel = selFLot === i;
            return (
              <div key={i}>
                <div onClick={function(){ setSelFLot(isSel ? null : i); }} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid "+T.n100,cursor:"pointer"}}>
                  <ChevronDown size={12} color={T.n400} style={{transform:isSel?"rotate(180deg)":"none",transition:"transform .2s",flexShrink:0}} />
                  <span style={{fontSize:11,fontWeight:600,color:T.ink,minWidth:200}}>{l.code} — {l.nom}</span>
                  <div style={{flex:1}}><div style={{display:"flex",gap:2}}><div style={{height:6,borderRadius:T.rF,background:T.ok,width:(l.budget>0?(l.paye/l.budget)*100:0)+"%"}} /><div style={{height:6,borderRadius:T.rF,background:T.warn,width:(l.budget>0?((l.fact-l.paye)/l.budget)*100:0)+"%"}} /></div></div>
                  <span style={{fontSize:10,color:T.ok,fontWeight:600,minWidth:55,textAlign:"right"}}>{fmt(l.paye)}</span>
                  <span style={{fontSize:10,color:T.n400,minWidth:55,textAlign:"right"}}>{fmt(l.budget)}</span>
                </div>
                {isSel && (
                  <div style={{padding:"12px 16px 12px 28px",marginBottom:4}}>
                    <div style={{borderRadius:T.r8,border:"1px solid "+T.n200,overflow:"hidden"}}>
                      <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
                        <thead>
                          <tr style={{background:T.n50}}>
                            <th style={{padding:"7px 10px",textAlign:"left",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Code</th>
                            <th style={{padding:"7px 10px",textAlign:"left",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Opération</th>
                            <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Budget</th>
                            <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Engagé</th>
                            <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Payé</th>
                            <th style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.n500,fontSize:8,textTransform:"uppercase",letterSpacing:.4}}>Reste à payer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(OPS[l.code]||[]).map(function(op,oi){
                            return (
                              <tr key={oi} style={{borderBottom:"1px solid "+T.n100}}>
                                <td style={{padding:"7px 10px",fontFamily:"monospace",fontWeight:600,color:T.cyan,fontSize:10}}>{op.c}</td>
                                <td style={{padding:"7px 10px",color:T.ink,fontWeight:500}}>{op.n}</td>
                                <td style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:T.ink}}>{fmt(op.budget)}</td>
                                <td style={{padding:"7px 10px",textAlign:"right",color:T.info}}>{fmt(op.engage)}</td>
                                <td style={{padding:"7px 10px",textAlign:"right",color:T.ok}}>{fmt(op.paye)}</td>
                                <td style={{padding:"7px 10px",textAlign:"right",fontWeight:600,color:op.rap>0?T.warn:T.n400}}>{op.rap>0?fmt(op.rap):"—"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div style={{display:"flex",gap:16,marginTop:8,fontSize:9,color:T.n400}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:8,borderRadius:2,background:T.ok}} /> Payé</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:8,borderRadius:2,background:T.warn}} /> Facturé non payé</span>
          </div>
        </div>
      </Card>

      {/* Factures */}
      <Card><SecTitle sub="Détail des factures de votre projet">Factures</SecTitle>
        <div style={{marginTop:12}}>
          <Tbl cols={[
            {key:"id",label:"N°",render:r=><span style={{fontFamily:"monospace",fontSize:10,color:T.cyan,fontWeight:600}}>{r.id}</span>},
            {key:"objet",label:"Objet",render:r=><span style={{fontWeight:500,fontSize:11}}>{r.objet}</span>},
            {key:"type",label:"Type",render:r=><Badge v="neutral">{r.type}</Badge>},
            {key:"lot",label:"Lot",render:r=><Badge v="neutral">{r.lot}</Badge>},
            {key:"mt",label:"Montant",render:r=><span style={{fontWeight:700,fontSize:12}}>{fmt(r.mt)} FCFA</span>},
            {key:"ech",label:"Échéance"},
            {key:"s",label:"Statut",render:r=><SB s={r.s}/>},
            {key:"act",label:"",render:r=><div style={{display:"flex",gap:6,alignItems:"center"}}><Download size={13} color={T.n400} style={{cursor:"pointer"}}/>{r.s==="En attente"&&<Btn size="sm" onClick={()=>setShowPay(true)}>Payer</Btn>}</div>},
          ]} data={FACTURES}/>
        </div>
      </Card>

      {/* Connect Pay Modal */}
      {showPay&&(
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setShowPay(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:T.white,borderRadius:T.r20,padding:"28px 32px",width:480,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.15)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div><div style={{fontSize:18,fontWeight:800,color:T.ink}}>Connect Pay</div><div style={{fontSize:11,color:T.n500}}>Paiement sécurisé — FAC-003</div></div>
              <button onClick={()=>setShowPay(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={T.n400}/></button>
            </div>
            <div style={{padding:"14px 16px",borderRadius:T.r12,background:T.n50,marginBottom:20,textAlign:"center"}}>
              <div style={{fontSize:10,color:T.n500}}>Montant à régler</div>
              <div style={{fontSize:28,fontWeight:900,color:T.ink}}>8 400 000 FCFA</div>
              <div style={{fontSize:10,color:T.n400}}>Approvisionnement matériaux Phase 2</div>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:T.ink,marginBottom:10}}>Choisissez votre mode de paiement</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {nom:"Orange Money",desc:"Paiement mobile Orange",icon:"🟠",pop:true},
                {nom:"MTN MoMo",desc:"Paiement mobile MTN",icon:"🟡"},
                {nom:"Ceyna One",desc:"Solution Connect intégrée",icon:"🔵",pop:true},
                {nom:"Carte bancaire",desc:"Visa, Mastercard",icon:"💳"},
                {nom:"PayPal",desc:"Paiement international",icon:"🅿️"},
                {nom:"Virement bancaire",desc:"Instructions envoyées par email",icon:"🏦"},
              ].map((m,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:T.r12,border:`1px solid ${T.n200}`,cursor:"pointer",background:T.white,transition:"all .15s"}} onMouseOver={e=>e.currentTarget.style.borderColor=T.cyan} onMouseOut={e=>e.currentTarget.style.borderColor=T.n200}>
                  <span style={{fontSize:20}}>{m.icon}</span>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:T.ink}}>{m.nom}</div><div style={{fontSize:10,color:T.n500}}>{m.desc}</div></div>
                  {m.pop&&<Badge v="success">Populaire</Badge>}
                  <ChevronRight size={14} color={T.n400}/>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}><Shield size={12} color={T.ok}/><span style={{fontSize:10,color:T.n500}}>Transaction sécurisée et traçable</span></div>
          </div>
        </div>
      )}

      {/* Historique paiements */}
      <Card><SecTitle>Historique des paiements</SecTitle>
        <div style={{marginTop:10}}>
          <Tbl cols={[{key:"date",label:"Date"},{key:"ref",label:"Facture",render:r=><span style={{fontFamily:"monospace",fontSize:10,color:T.cyan}}>{r.ref}</span>},{key:"objet",label:"Objet"},{key:"mt",label:"Montant",render:r=><span style={{fontWeight:700}}>{fmt(r.mt)} FCFA</span>},{key:"mode",label:"Mode",render:r=><Badge v="neutral">{r.mode}</Badge>}]} data={PAIEMENTS}/>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 5 — APPRO CHANTIER
   ═══════════════════════════════════════════════════════ */
function PageAppro({onNav}){
  const[sF,setSF]=useState("all");const[lF,setLF]=useState("all");const[cO,setCO]=useState(false);const[showCmd,setShowCmd]=useState(false);
  const tG=Math.round(MATERIAUX.reduce((s,m)=>s+m.couv,0)/MATERIAUX.length);
  const tV=MATERIAUX.filter(m=>m.crit).length;
  const lA=COMMANDES.filter(c=>c.statut==="En transit"||c.statut==="Confirmée").length;
  const iP=ALERTES_APPRO.some(a=>a.niv==="rouge")?"Modéré":"Faible";const iC=iP==="Modéré"?T.warn:T.cyan;
  const aL=[...new Set(MATERIAUX.map(m=>m.lot))];
  let fM=MATERIAUX;if(sF!=="all")fM=fM.filter(m=>m.statut===sF);if(lF!=="all")fM=fM.filter(m=>m.lot===lF);if(cO)fM=fM.filter(m=>m.crit);
  const sBV=s=>({Disponible:"success",Vigilance:"warning","En cours":"info",Commandé:"info","Rupture fourn.":"danger","Non commandé":"neutral"}[s]||"neutral");
  const rC={vert:T.ok,orange:T.warn,rouge:T.err};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div><h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Appro Chantier</h2><p style={{fontSize:12,color:T.n500,margin:"4px 0 0"}}>Suivi des matériaux, livraisons et risques d'approvisionnement</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        <MC label="Taux d'approvisionnement" value={`${tG}%`} icon={Gauge} color={T.cyan} accent={T.cyan}/>
        <MC label="Matériaux à surveiller" value={tV.toString()} icon={AlertTriangle} color={T.warn} accent={T.warn}/>
        <MC label="Livraisons attendues" value={lA.toString()} sub="cette semaine" icon={Truck} color={T.info} accent={T.info}/>
        <MC label="Impact planning" value={iP} icon={Activity} color={iC} accent={iC}/>
      </div>

      {/* Alertes */}
      <Card accent={T.err}><SecTitle sub="Points nécessitant attention ou suivi KOMA">Alertes & Risques</SecTitle>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:14}}>
          {ALERTES_APPRO.map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 16px",borderRadius:T.r12,background:a.niv==="rouge"?T.errBg:a.niv==="orange"?T.warnBg:T.okBg,borderLeft:`4px solid ${rC[a.niv]}`}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:rC[a.niv]+"14",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{a.niv==="rouge"?<AlertCircle size={14} color={T.err}/>:a.niv==="orange"?<AlertTriangle size={14} color={T.warn}/>:<CheckCircle2 size={14} color={T.ok}/>}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><Badge v={a.niv==="rouge"?"danger":a.niv==="orange"?"warning":"success"} dot>{a.niv==="rouge"?"Risque":a.niv==="orange"?"Vigilance":"Maîtrisé"}</Badge><span style={{fontSize:13,fontWeight:700,color:T.ink}}>{a.mat}</span><Badge v="neutral">{a.lot}</Badge></div>
                <div style={{fontSize:12,color:T.n700,lineHeight:1.6}}>{a.cons}</div>
                <div style={{fontSize:11,color:T.n600,marginTop:4,padding:"6px 10px",borderRadius:T.r8,background:"rgba(255,255,255,.7)",borderLeft:`3px solid ${rC[a.niv]}`}}><b>Action :</b> {a.action}</div>
              </div>
              {a.niv==="rouge"&&<Btn v="ghost" size="sm" icon={MessageSquare} onClick={()=>onNav("messagerie")}>SPOC</Btn>}
            </div>
          ))}
        </div>
      </Card>

      {/* Parcours Commander */}
      <Card style={{background:`linear-gradient(135deg,${T.cyanBg},${T.sageLt})`,border:`1px solid ${T.cyan}15`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <Package size={18} color={T.cyan}/><div><div style={{fontSize:14,fontWeight:700,color:T.ink}}>Besoin de matériaux supplémentaires ?</div><div style={{fontSize:10,color:T.n500}}>Trois options pour approvisionner votre chantier</div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[{title:"Je fournis moi-même",desc:"Vous achetez directement et faites livrer sur le chantier. KOMA vérifie la conformité à réception.",icon:Truck,c:T.sage},
            {title:"Marketplace KOMA",desc:"Accédez au catalogue de fournisseurs référencés et achetez aux prix négociés par KOMA.",icon:Globe,c:T.cyan},
            {title:"KOMA achète pour moi",desc:"Confiez à KOMA le sourcing, la négociation et l'achat. Vous validez le devis.",icon:Shield,c:T.purp},
          ].map((o,i)=>(
            <div key={i} style={{padding:"16px 14px",borderRadius:T.r12,background:T.white,border:`1px solid ${T.n200}`,cursor:"pointer",textAlign:"center"}} onMouseOver={e=>e.currentTarget.style.borderColor=o.c} onMouseOut={e=>e.currentTarget.style.borderColor=T.n200}>
              <div style={{width:36,height:36,borderRadius:"50%",background:o.c+"10",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}><o.icon size={16} color={o.c}/></div>
              <div style={{fontSize:12,fontWeight:700,color:T.ink,marginBottom:4}}>{o.title}</div>
              <div style={{fontSize:10,color:T.n500,lineHeight:1.5}}>{o.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Table matériaux */}
      <Card>
        <SecTitle sub={`${fM.length} matériaux affichés`}>État des approvisionnements</SecTitle>
        <div style={{display:"flex",gap:8,marginTop:12,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          <select value={lF} onChange={e=>setLF(e.target.value)} style={{padding:"5px 10px",borderRadius:T.r8,border:`1px solid ${T.n200}`,fontSize:10,background:T.white,cursor:"pointer",color:T.n700}}><option value="all">Tous les lots</option>{aL.map(l=><option key={l} value={l}>{l}</option>)}</select>
          <select value={sF} onChange={e=>setSF(e.target.value)} style={{padding:"5px 10px",borderRadius:T.r8,border:`1px solid ${T.n200}`,fontSize:10,background:T.white,cursor:"pointer",color:T.n700}}><option value="all">Tous statuts</option><option value="Disponible">Disponible</option><option value="Vigilance">Vigilance</option><option value="Commandé">Commandé</option><option value="Rupture fourn.">Rupture</option></select>
          <label style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:T.n600,cursor:"pointer"}}><input type="checkbox" checked={cO} onChange={e=>setCO(e.target.checked)} style={{accentColor:T.err}}/>Critiques</label>
        </div>
        <Tbl cols={[
          {key:"nom",label:"Matériau",render:r=><div style={{display:"flex",alignItems:"center",gap:6}}>{r.crit&&<div style={{width:6,height:6,borderRadius:"50%",background:T.err}}/>}<div><div style={{fontSize:11,fontWeight:600,color:T.ink}}>{r.nom}</div><div style={{fontSize:9,color:T.n400}}>{r.fourn}</div></div></div>},
          {key:"lot",label:"Lot",render:r=><Badge v="neutral">{r.lot}</Badge>},
          {key:"op",label:"Opération",render:function(r){var codes=r.op.split("/");return (<div style={{display:"flex",flexDirection:"column",gap:2}}>{codes.map(function(c,i){var nm=OPS_FLAT[c]||"";var short=nm.length>30?nm.slice(0,28)+"…":nm;return (<div key={i} style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:"monospace",fontSize:10,fontWeight:700,color:T.cyanDk,flexShrink:0}}>{c}</span><span style={{fontSize:9,color:T.n500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:120}}>{short}</span></div>);})}</div>);}},
          {key:"qte",label:"Quantité",render:r=><span><b>{r.recu}</b><span style={{color:T.n400}}> / {r.prevu} {r.unite}</span></span>},
          {key:"couv",label:"Couverture",render:r=><div style={{minWidth:80}}><div style={{fontSize:11,fontWeight:700,color:r.couv>=80?T.ok:r.couv>=40?T.warn:T.n500,marginBottom:3}}>{r.couv}%</div><Pr value={r.couv} h={5}/></div>},
          {key:"statut",label:"Statut",render:r=><SB s={r.statut}/>},
          {key:"liv",label:"Prochaine livraison",render:r=><span style={{fontSize:10,color:r.liv==="—"||r.liv==="Indéterminé"?T.n400:T.ink,fontWeight:r.liv!=="—"?600:400}}>{r.liv}</span>},
        ]} data={fM}/>
      </Card>

      {/* Commandes */}
      <Card><SecTitle sub="Suivi des commandes fournisseurs">Commandes & Livraisons</SecTitle>
        <div style={{marginTop:12}}>
          <Tbl cols={[
            {key:"ref",label:"Réf.",render:r=><span style={{fontFamily:"monospace",fontSize:10,color:T.cyan,fontWeight:600}}>{r.ref}</span>},
            {key:"fourn",label:"Fournisseur"},{key:"mat",label:"Matériau"},
            {key:"mt",label:"Montant",render:r=><span style={{fontWeight:700}}>{fmt(r.mt)}</span>},
            {key:"prev",label:"Prévue"},{key:"reel",label:"Réelle",render:r=>r.reel||<span style={{color:T.n400}}>—</span>},
            {key:"ecart",label:"Écart",render:r=>r.ecart?<Badge v={r.ecart==="0j"?"success":"warning"}>{r.ecart}</Badge>:<span style={{color:T.n400}}>—</span>},
            {key:"statut",label:"Statut",render:r=><SB s={r.statut}/>},
          ]} data={COMMANDES}/>
        </div>
      </Card>

      {/* Par étape */}
      <Card><SecTitle sub="Cohérence entre approvisionnement et exécution par phase">Approvisionnement par étape</SecTitle>
        <div style={{marginTop:14}}>{ETAPES_APPRO.map((e,i)=>(
          <div key={i} style={{padding:"14px 16px",borderRadius:T.r12,marginBottom:8,background:e.risque==="rouge"?T.errBg:e.risque==="orange"?T.warnBg:T.n50,borderLeft:`4px solid ${rC[e.risque]}`,border:`1px solid ${e.risque!=="vert"?rC[e.risque]+"20":T.n200}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:700,color:T.ink}}>{e.etape}</span><Badge v={e.risque==="vert"?"success":e.risque==="orange"?"warning":"danger"} dot>{e.risque==="vert"?"RAS":e.risque==="orange"?"Vigilance":"Risque"}</Badge></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:900,color:T.ink}}>{e.avA}%</div><div style={{fontSize:9,color:T.n400}}>approvisionné</div></div>
            </div>
            <div style={{display:"flex",gap:12,marginBottom:8}}>
              <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:9,color:T.n500}}>Appro</span><span style={{fontSize:9,fontWeight:600,color:T.cyan}}>{e.avA}%</span></div><Pr value={e.avA} h={5} color={T.cyan}/></div>
              <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:9,color:T.n500}}>Chantier</span><span style={{fontSize:9,fontWeight:600,color:T.sage}}>{e.avC}%</span></div><Pr value={e.avC} h={5} color={T.sage}/></div>
            </div>
            <div style={{fontSize:11,color:T.n600,lineHeight:1.5}}>{e.detail}</div>
            <div style={{fontSize:10,color:T.n400,marginTop:4}}><b>Matériaux :</b> {e.mats}</div>
          </div>))}</div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 6 — DOCUMENTS
   ═══════════════════════════════════════════════════════ */
function PageDocuments(){
  const [catF, setCatF] = useState("Tous");
  const [search, setSearch] = useState("");

  var DOC_CATS = [
    {key:"Plans",    icon: Layers,    color: T.purp},
    {key:"Devis",    icon: FileText,  color: T.cyan},
    {key:"Contrats", icon: Shield,    color: T.ink},
    {key:"Rapports", icon: FileCheck, color: T.sage},
    {key:"Factures", icon: Receipt,   color: T.warn},
    {key:"Photos",   icon: Image,     color: T.info},
    {key:"Planning", icon: CalendarDays, color: T.cyanDk},
  ];

  var catCounts = {};
  var catHasNew = {};
  DOC_CATS.forEach(function(dc){
    catCounts[dc.key] = DOCUMENTS.filter(function(d){ return d.cat === dc.key; }).length;
    catHasNew[dc.key] = DOCUMENTS.some(function(d){ return d.cat === dc.key && d.action; });
  });

  var fD = DOCUMENTS;
  if (catF !== "Tous") fD = fD.filter(function(d){ return d.cat === catF; });
  if (search) fD = fD.filter(function(d){ return d.nom.toLowerCase().includes(search.toLowerCase()); });
  var nD = DOCUMENTS.filter(function(d){ return d.action; });

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Documents du Projet</h2>

      {/* ── Category cards strip ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:10}}>
        {DOC_CATS.map(function(dc){
          var isActive = catF === dc.key;
          var count = catCounts[dc.key] || 0;
          var hasNew = catHasNew[dc.key];
          var Ic = dc.icon;
          return (
            <div
              key={dc.key}
              onClick={function(){ setCatF(isActive ? "Tous" : dc.key); }}
              style={{
                position:"relative",
                padding:"14px 10px",
                borderRadius:T.r12,
                background: isActive ? dc.color + "08" : T.white,
                border: isActive ? "2px solid " + dc.color : "1px solid " + T.n200,
                cursor:"pointer",
                textAlign:"center",
                transition:"all .15s",
                boxShadow: isActive ? T.sh2 : T.sh1,
              }}
            >
              {hasNew && (
                <div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:T.info}} />
              )}
              <div style={{
                width:34,height:34,borderRadius:"50%",
                background: isActive ? dc.color + "18" : T.n100,
                display:"flex",alignItems:"center",justifyContent:"center",
                margin:"0 auto 8px",
                transition:"all .15s",
              }}>
                <Ic size={16} color={isActive ? dc.color : T.n400} />
              </div>
              <div style={{fontSize:11,fontWeight:isActive ? 700 : 600,color:isActive ? dc.color : T.ink}}>{dc.key}</div>
              <div style={{fontSize:9,color:isActive ? dc.color : T.n400,marginTop:2}}>
                {count} fichier{count !== 1 ? "s" : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Search + dropdown filter ── */}
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div style={{flex:1,position:"relative"}}>
          <Search size={14} color={T.n400} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}} />
          <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Rechercher un document..." style={{width:"100%",padding:"8px 10px 8px 32px",borderRadius:T.r8,border:"1px solid "+T.n200,fontSize:11,outline:"none"}} />
        </div>
        {catF !== "Tous" && (
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <Badge v="default">{catF}</Badge>
            <button onClick={function(){setCatF("Tous");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:T.n400}}>× Effacer</button>
          </div>
        )}
      </div>

      {/* ── Documents à traiter ── */}
      {nD.length > 0 && (
        <Card accent={T.info} style={{background:T.infoBg}}>
          <SecTitle sub="Documents nécessitant votre attention">À traiter</SecTitle>
          <div style={{marginTop:10}}>
            {nD.map(function(d, i){
              return (
                <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:T.r12,background:T.white,marginBottom:4,border:"1px solid "+T.n200}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <FileText size={16} color={T.info} />
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:T.ink}}>{d.nom}</div>
                      <div style={{fontSize:10,color:T.n500}}>{d.cat} · {d.taille} · {d.date}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <SB s={d.statut} />
                    <Btn size="sm" icon={d.action === "À payer" ? CreditCard : Eye}>{d.action}</Btn>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── Table documents ── */}
      <Card>
        <SecTitle sub={fD.length + " document" + (fD.length !== 1 ? "s" : "")}>{catF === "Tous" ? "Tous les documents" : catF}</SecTitle>
        <div style={{marginTop:10}}>
          <Tbl cols={[
            {key:"nom",label:"Document",render:function(r){return (
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <FileText size={14} color={T.n400} />
                <div>
                  <div style={{fontSize:11,fontWeight:600,color:T.ink}}>{r.nom}</div>
                  <div style={{fontSize:9,color:T.n400}}>{r.taille} · {r.type}</div>
                </div>
              </div>
            );}},
            {key:"cat",label:"Catégorie",render:function(r){return (<Badge v="neutral">{r.cat}</Badge>);}},
            {key:"version",label:"Version"},
            {key:"date",label:"Date"},
            {key:"auteur",label:"Par",render:function(r){return (<Badge v="neutral">{r.auteur}</Badge>);}},
            {key:"statut",label:"Statut",render:function(r){return (<SB s={r.statut} />);}},
            {key:"act",label:"",render:function(){return (
              <div style={{display:"flex",gap:6}}>
                <Eye size={13} color={T.n400} style={{cursor:"pointer"}} />
                <Download size={13} color={T.n400} style={{cursor:"pointer"}} />
              </div>
            );}},
          ]} data={fD} />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 7 — RAPPORTS
   ═══════════════════════════════════════════════════════ */
function PageRapports(){
  const[tF,setTF]=useState("all");
  const types=["all","Rapport journalier","Rapport hebdomadaire","Rapport mensuel","Visite AMOA","PV de réception"];
  const fR=tF==="all"?RAPPORTS:RAPPORTS.filter(r=>r.type===tF);
  const tColor={
    "Rapport journalier":T.cyan,"Rapport hebdomadaire":T.info,"Rapport mensuel":T.purp,"Visite AMOA":T.sage,"PV de réception":T.ok
  };
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Rapports de Chantier</h2>
      <Banner type="info" icon={Shield}>Les rapports sont produits par l'entreprise de construction et <b>validés par votre AMOA</b> avant publication. Seuls les rapports approuvés sont affichés.</Banner>
      <div style={{display:"flex",gap:10}}>
        {[{l:"Total",n:RAPPORTS.length,c:T.ink},{l:"Journaliers",n:RAPPORTS.filter(r=>r.type==="Rapport journalier").length,c:T.cyan},{l:"Hebdomadaires",n:RAPPORTS.filter(r=>r.type==="Rapport hebdomadaire").length,c:T.info},{l:"Mensuels",n:RAPPORTS.filter(r=>r.type==="Rapport mensuel").length,c:T.purp},{l:"Visites AMOA",n:RAPPORTS.filter(r=>r.type==="Visite AMOA").length,c:T.sage}].map((s,i)=>(
          <div key={i} style={{flex:1,padding:"10px 14px",borderRadius:T.r12,background:T.n50,textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:s.c}}>{s.n}</div><div style={{fontSize:9,color:T.n500}}>{s.l}</div></div>
        ))}
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{types.map(function(t){var l=t==="all"?"Tous":t;return (<button key={t} onClick={function(){setTF(t);}} style={{padding:"6px 14px",borderRadius:T.rF,fontSize:11,fontWeight:tF===t?600:400,border:"1px solid "+(tF===t?T.cyan:T.n200),background:tF===t?T.cyanLt:T.white,color:tF===t?T.cyanDk:T.n600,cursor:"pointer"}}>{l}</button>);})}</div>
      {fR.map(r=>{const tc=tColor[r.type]||T.cyan;return(
        <Card key={r.id} style={{borderLeft:`4px solid ${tc}`,padding:0}}>
          <div style={{padding:"18px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <Badge v={r.type.includes("Visite")?"success":r.type.includes("hebdo")?"info":r.type.includes("mensuel")?"purple":"default"} dot>{r.type}</Badge>
                  <Badge v="neutral">{r.lot}</Badge>
                  {!r.lu&&<Badge v="info" dot>Nouveau</Badge>}
                  {r.vig&&<Badge v="warning" dot>Vigilance</Badge>}
                </div>
                <div style={{fontSize:16,fontWeight:700,color:T.ink}}>{r.date}</div>
                <div style={{fontSize:11,color:T.n500,marginTop:2}}>Par <b>{r.auteur}</b> — {r.org}</div>
              </div>
              <div style={{textAlign:"right"}}>{r.meteo!=="—"&&<div style={{fontSize:11,color:T.n500}}>{r.meteo}</div>}{r.photos>0&&<div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",marginTop:4}}><Image size={12} color={T.n400}/><span style={{fontSize:11,fontWeight:600}}>{r.photos} photos</span></div>}<Badge v="success">Validé par AMOA</Badge></div>
            </div>
            <div style={{fontSize:13,color:T.n700,lineHeight:1.7,padding:"10px 14px",borderRadius:T.r12,background:T.n50,marginBottom:8}}>{r.resume}</div>
            {r.reco&&<div style={{padding:"10px 14px",borderRadius:T.r8,background:T.warnBg,border:`1px solid ${T.warn}20`,fontSize:12,color:T.n700,lineHeight:1.6}}><b style={{color:T.warn}}>Recommandations :</b> {r.reco}</div>}
          </div>
        </Card>);})}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 8 — MESSAGERIE
   ═══════════════════════════════════════════════════════ */
function PageMessagerie({onNav}){
  const[tab,setTab]=useState("fil");const[selM,setSelM]=useState(0);
  const sel=MESSAGES[selM];
  const conv=[
    {from:"Marie Atangana",self:false,msg:"Bonjour M. Fouda ! Le coulage des poteaux R+1 est prévu jeudi. Nous avons anticipé la pluie de vendredi.",time:"14:22"},
    {from:"Jean-Pierre Fouda",self:true,msg:"Merci Marie. Et pour la facture FAC-003 ?",time:"14:35"},
    {from:"Marie Atangana",self:false,msg:"Elle concerne les matériaux Phase 2 (fer + sable + ciment). 8,4M FCFA, échéance 25/04. Vous pouvez la régler depuis Finances.",time:"14:38"},
    {from:"Marie Atangana",self:false,msg:"Je vous envoie le bon de commande en pièce jointe.",time:"14:39",attachment:"BC-003_Materiaux.pdf"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Messagerie</h2>
      <div style={{display:"flex",gap:4}}>
        {[{k:"fil",l:"Fil d'actualité",i:Activity},{k:"conv",l:"Conversations",i:MessageSquare}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",borderRadius:`${T.r8}px ${T.r8}px 0 0`,fontSize:12,fontWeight:tab===t.k?700:400,border:`1px solid ${tab===t.k?T.n200:T.n100}`,borderBottom:tab===t.k?`2px solid ${T.cyan}`:"none",background:tab===t.k?T.white:T.n50,color:tab===t.k?T.ink:T.n500,cursor:"pointer"}}><t.i size={14}/>{t.l}</button>
        ))}
      </div>

      {tab==="fil"?(
        <Card>
          <SecTitle sub="Flux chronologique des événements importants de votre projet">Activité du projet</SecTitle>
          <div style={{marginTop:14}}>
            {FIL_ACTU.map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 0",borderBottom:i<FIL_ACTU.length-1?`1px solid ${T.n100}`:"none"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:a.c+"0D",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><a.icon size={14} color={a.c}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:T.ink,lineHeight:1.5}}>{a.msg}</div>
                  <div style={{fontSize:10,color:T.n400,marginTop:2}}>{a.date} à {a.heure}</div>
                </div>
                <Badge v="neutral">{a.type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"320px 1fr",gap:0,border:`1px solid ${T.n200}`,borderRadius:T.r16,overflow:"hidden",height:500}}>
          <div style={{borderRight:`1px solid ${T.n200}`,overflowY:"auto",background:T.white}}>
            <div style={{padding:"14px 16px",borderBottom:`1px solid ${T.n200}`}}><div style={{fontSize:13,fontWeight:700,color:T.ink}}>Conversations</div><div style={{fontSize:10,color:T.n400,marginTop:2}}>{MESSAGES.filter(m=>m.unread).length} non lu(s)</div></div>
            {MESSAGES.map((m,i)=>(
              <div key={i} onClick={()=>setSelM(i)} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 16px",borderBottom:`1px solid ${T.n100}`,cursor:"pointer",background:i===selM?T.cyanBg:"transparent",borderLeft:i===selM?`3px solid ${T.cyan}`:"3px solid transparent"}}>
                <Av name={m.from} color={m.from.includes("Marie")?T.cyan:T.sage} size={36}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,fontWeight:m.unread?700:500,color:T.ink}}>{m.from}</span><span style={{fontSize:9,color:T.n400}}>{m.time.split(" ")[0]}</span></div>
                  <div style={{fontSize:9,color:T.cyan}}>{m.role}</div>
                  <div style={{fontSize:10,fontWeight:600,color:T.info,marginTop:2}}>{m.objet}</div>
                  <div style={{fontSize:10,color:T.n500,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.preview}</div>
                </div>
                {m.unread&&<div style={{width:8,height:8,borderRadius:"50%",background:T.cyan,flexShrink:0,marginTop:6}}/>}
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",background:T.n50}}>
            <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.n200}`,background:T.white}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><Av name={sel.from} color={sel.from.includes("Marie")?T.cyan:T.sage}/><div><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:700,fontSize:14,color:T.ink}}>{sel.from}</span><Badge v="default">{sel.role}</Badge></div><div style={{fontSize:10,color:T.info,marginTop:1}}>Objet : {sel.objet}</div></div></div>
            </div>
            <div style={{flex:1,padding:20,display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:10,overflowY:"auto"}}>
              {conv.map((c,i)=>(
                <div key={i} style={{alignSelf:c.self?"flex-end":"flex-start",maxWidth:"75%"}}>
                  <div style={{padding:"11px 16px",borderRadius:c.self?"16px 4px 16px 16px":"4px 16px 16px 16px",background:c.self?T.cyan:T.white,color:c.self?"#fff":T.ink,fontSize:13,lineHeight:1.6,boxShadow:c.self?"none":T.sh1,border:c.self?"none":`1px solid ${T.n200}`}}>{c.msg}</div>
                  {c.attachment&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:6,padding:"6px 10px",background:T.white,borderRadius:T.r8,border:`1px solid ${T.n200}`,cursor:"pointer"}}><Paperclip size={12} color={T.n400}/><span style={{fontSize:10,color:T.cyan,fontWeight:600}}>{c.attachment}</span><Download size={11} color={T.n400}/></div>}
                  <div style={{fontSize:9,color:T.n400,marginTop:3,textAlign:c.self?"right":"left"}}>{c.time}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"12px 16px",borderTop:`1px solid ${T.n200}`,background:T.white,display:"flex",gap:8,alignItems:"center"}}>
              <input placeholder="Écrire un message..." style={{flex:1,padding:"10px 14px",borderRadius:T.r12,border:`1px solid ${T.n200}`,fontSize:12,outline:"none",background:T.n50}}/>
              <Btn v="ghost" size="sm" icon={Paperclip}/><Btn icon={Send}>Envoyer</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 9 — CHANTIER LIVE
   ═══════════════════════════════════════════════════════ */
function PageLive(){
  const cams=[
    {id:"CAM-001",nom:"Entrée chantier",zone:"Accès principal",status:"En ligne",last:"16/04 14:38:22",evt:"Mouvement détecté (02:14) — vérifié par gardien",evtT:"warn",logs:["14:38 — Flux actif","08:12 — Arrivée équipe (18 pers.)","02:14 — Mouvement nocturne → gardien alerté → RAS"]},
    {id:"CAM-003",nom:"Front de chantier",zone:"Zone Gros Œuvre",status:"En ligne",last:"16/04 14:38:22",evt:"Activité normale — 18 ouvriers détectés",evtT:"ok",logs:["14:38 — Flux actif","12:00 — Pause déjeuner","08:00 — Début activité normale"]},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Mon Chantier en Direct</h2>
      <Banner type="info" icon={Shield}>Caméras accessibles <b>24h/24</b>. En cas d'activité suspecte hors heures de travail, alerte automatique au SPOC et au gardien. Images conservées 30 jours.</Banner>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {cams.map(cam=>(
          <Card key={cam.id} style={{padding:0,overflow:"hidden"}}>
            <div style={{width:"100%",aspectRatio:"16/9",background:"linear-gradient(135deg,#0a0f1a,#1a2332,#0d1b2a)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <div style={{position:"absolute",top:12,left:14,display:"flex",alignItems:"center",gap:6,zIndex:1}}><div style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:T.rF,background:"rgba(220,38,38,.9)"}}><div style={{width:5,height:5,borderRadius:"50%",background:"#fff",animation:"pulse 1.5s infinite"}}/><span style={{fontSize:9,color:"#fff",fontWeight:700,letterSpacing:.8}}>LIVE</span></div></div>
              <div style={{position:"absolute",top:12,right:14}}><span style={{fontSize:8,color:"rgba(255,255,255,.4)",fontFamily:"monospace"}}>{cam.id}</span></div>
              <PlayCircle size={40} strokeWidth={1} color="rgba(255,255,255,.15)"/>
              <div style={{position:"absolute",bottom:12,left:14,fontSize:9,color:"rgba(255,255,255,.35)",fontFamily:"monospace"}}>{cam.last} (UTC+1)</div>
              <div style={{position:"absolute",bottom:12,right:14,display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:T.ok}}/><span style={{fontSize:9,color:T.ok,fontWeight:600}}>En direct</span></div>
            </div>
            <div style={{padding:"16px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div><div style={{fontSize:14,fontWeight:700,color:T.ink}}>{cam.nom}</div><div style={{fontSize:11,color:T.n500}}>{cam.zone}</div></div><Badge v="success" dot>Actif</Badge></div>
              <div style={{padding:"10px 12px",borderRadius:T.r8,background:cam.evtT==="warn"?T.warnBg:T.okBg,border:`1px solid ${cam.evtT==="warn"?T.warn:T.ok}15`,marginBottom:10}}>
                <div style={{fontSize:10,fontWeight:600,color:cam.evtT==="warn"?T.warn:T.ok,marginBottom:2}}>Dernier événement</div>
                <div style={{fontSize:11,color:T.n700}}>{cam.evt}</div>
              </div>
              <div style={{fontSize:10,color:T.n500}}><div style={{fontWeight:600,marginBottom:4,color:T.n600}}>Historique du jour</div>{cam.logs.map((log,i)=><div key={i} style={{padding:"3px 0",borderBottom:`1px solid ${T.n100}`,fontFamily:"monospace",fontSize:9,color:T.n500}}>{log}</div>)}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE 10 — MÉTÉO CHANTIER
   ═══════════════════════════════════════════════════════ */
function PageMeteo(){
  const alC={vert:T.ok,orange:T.warn,rouge:T.err};
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div><h2 style={{fontSize:22,fontWeight:800,color:T.ink,margin:0}}>Météo du Chantier</h2><div style={{fontSize:12,color:T.n500,marginTop:4,display:"flex",alignItems:"center",gap:6}}><MapPin size={12}/>Douala, Bonamoussadi — 4.07°N, 9.74°E</div></div>
      <Card accent={T.err} style={{background:T.errBg}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:T.err+"14",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><AlertTriangle size={20} color={T.err}/></div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700,color:T.err,marginBottom:4}}>Alerte météo — Vendredi 18 Avril</div>
            <div style={{fontSize:12,color:T.n700,lineHeight:1.7}}>Forte pluie prévue (<b>35 mm</b>), rafales 28 km/h. Le coulage béton a été <b>avancé à jeudi 17/04</b>. Travaux extérieurs suspendus vendredi.</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8,padding:"8px 12px",background:T.white,borderRadius:T.r8,border:`1px solid ${T.n200}`}}><CheckCircle2 size={14} color={T.ok}/><span style={{fontSize:11,color:T.ok,fontWeight:600}}>Mesure prise par Marie Atangana (SPOC) le 16/04</span></div>
            <div style={{fontSize:11,color:T.n500,marginTop:6}}><b style={{color:T.ok}}>Aucun impact sur la date de livraison.</b></div>
          </div>
        </div>
      </Card>
      <Card><SecTitle sub="Prévisions sur la zone de votre chantier">Prévisions 7 jours</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8,marginTop:14}}>
          {METEO.map((m,i)=>{const isA=m.al!=="vert";const isT=i===0;return(
            <div key={i} style={{textAlign:"center",padding:"14px 8px",borderRadius:T.r12,background:isT?T.cyanBg:isA?alC[m.al]+"06":T.n50,border:`1px solid ${isA?alC[m.al]+"30":isT?T.cyan+"20":T.n200}`}}>
              <div style={{fontSize:11,fontWeight:700,color:isT?T.cyan:T.n600}}>{m.j}</div>
              {m.jc&&<div style={{fontSize:8,color:T.n400,marginTop:1}}>{m.jc}</div>}
              <div style={{fontSize:30,margin:"8px 0"}}>{m.ic}</div>
              <div style={{fontSize:10,fontWeight:500,color:T.n600,minHeight:28}}>{m.co}</div>
              <div style={{fontSize:20,fontWeight:900,color:T.ink,margin:"4px 0"}}>{m.tM}°</div>
              <div style={{fontSize:9,color:T.n400}}>{m.tm}° min</div>
              {m.pluie>0&&<div style={{fontSize:10,fontWeight:700,color:T.err,marginTop:4}}>{m.pluie} mm</div>}
              <div style={{marginTop:8,fontSize:8,fontWeight:700,padding:"3px 8px",borderRadius:T.rF,display:"inline-block",background:alC[m.al]+"14",color:alC[m.al],textTransform:"uppercase",letterSpacing:.5}}>{m.al==="vert"?"OK":m.al}</div>
            </div>);})}
        </div>
      </Card>
      <Card><SecTitle sub="Ce que la météo signifie pour vos travaux">Impacts chantier</SecTitle>
        <div style={{marginTop:12}}>{METEO.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 0",borderBottom:i<METEO.length-1?`1px solid ${T.n100}`:"none"}}>
            <span style={{fontSize:24,flexShrink:0}}>{m.ic}</span>
            <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:12,fontWeight:600,color:T.ink}}>{m.j}</span><span style={{fontSize:11,color:T.n500}}>{m.co}</span><Badge v={m.al==="vert"?"success":m.al==="orange"?"warning":"danger"}>{m.al==="vert"?"RAS":m.al}</Badge></div><div style={{fontSize:11,color:T.n600,marginTop:3,lineHeight:1.5}}>{m.impact}</div></div>
          </div>))}</div>
      </Card>
      <Card><SecTitle>Lots potentiellement impactés</SecTitle>
        <div style={{marginTop:10}}>
          {[{lot:"Lot II — Gros œuvre",impact:"Coulage avancé à jeudi. Coffrage intérieur maintenu vendredi.",risque:"Maîtrisé"},{lot:"Lot III — Clos couvert",impact:"Travaux toiture suspendus vendredi si pluie > 20 mm.",risque:"À surveiller"}].map((l,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:T.r12,background:T.n50,marginBottom:6}}>
              <HardHat size={16} color={T.warn}/><div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:T.ink}}>{l.lot}</div><div style={{fontSize:11,color:T.n600,marginTop:1}}>{l.impact}</div></div>
              <Badge v={l.risque==="Maîtrisé"?"success":"warning"}>{l.risque}</Badge>
            </div>))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════ */
export default function KomaClientPortal(){
  const[nav,setNav]=useState("accueil");
  const[sO,setSO]=useState(true);
  const pages={accueil:<PageAccueil onNav={setNav}/>,decisions:<PageDecisions onNav={setNav}/>,avancement:<PageAvancement/>,finances:<PageFinances/>,appro:<PageAppro onNav={setNav}/>,documents:<PageDocuments/>,rapports:<PageRapports/>,messagerie:<PageMessagerie onNav={setNav}/>,live:<PageLive/>,meteo:<PageMeteo/>};
  return(
    <div style={{display:"flex",height:"100vh",width:"100%",fontFamily:"'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif",background:T.n50,overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.n300};border-radius:3px}::-webkit-scrollbar-thumb:hover{background:${T.n400}}
        button{font-family:inherit}button:hover{opacity:.92}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      `}</style>
      <Sidebar nav={nav} onNav={setNav} open={sO}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:56,padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.n200}`,background:T.white,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>setSO(!sO)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><Menu size={18} color={T.n500}/></button>
            <div style={{width:1,height:20,background:T.n200}}/>
            <div><div style={{fontSize:14,fontWeight:700,color:T.ink}}>Villa Éden</div><div style={{fontSize:10,color:T.n400}}>Douala, Bonamoussadi</div></div>
            <Badge v="success" dot>Actif</Badge>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <select style={{padding:"5px 10px",borderRadius:T.r8,border:`1px solid ${T.n200}`,fontSize:11,fontWeight:600,background:T.n50,cursor:"pointer",color:T.n700,outline:"none"}}><option>PRJ-001 — Villa Éden</option><option>PRJ-006 — Étude Kribi</option></select>
            <div style={{position:"relative",cursor:"pointer"}}><Bell size={18} color={T.n500}/><div style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:"50%",background:T.err,border:`2px solid ${T.white}`}}/></div>
          </div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:"24px 28px"}}>{pages[nav]||<PageAccueil onNav={setNav}/>}</div>
      </div>
    </div>
  );
}
