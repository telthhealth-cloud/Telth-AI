import { useState, useEffect, useRef } from "react";
import {
  Settings,
  Palette,
  Search,
  Eye,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MedicalDevice3D from "./MedicalDevice3D";
import HubDevicesCards from "./ui/HubDevicesCards";
import addicon from "@/assets/add.png"
import tickicon from "@/assets/check-circle.png"
// import { auth, RecaptchaVerifier } from '@/firebase/client';
// import { signInWithPhoneNumber } from 'firebase/auth';
// FIXED IMPORTS - Use relative path
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebaseConfig';



import thermometer from "@/assets/telthdevices/therm-uk.jpg"
import fetaldoppler from "../assets/telthdevices/fetal-doppler-uk.webp"
import spirometer from "@/assets/telthdevices/spirometer-uk.jpg"
import stethoscope from "@/assets/telthdevices/ayusynk-2pro-wireless-digital-stethoscope.png"
import bodycomposeanalyser from "@/assets/telthdevices/body-composotion-ind.webp"
import wirelessstadiometer from "@/assets/telthdevices/stadiometer-uk.jpg"
import otoscope from "@/assets/telthdevices/otoscope-uk.jpg"
import dermatoscope from "@/assets/telthdevices/dermatoscope-ind.jpg"
import oralcamera from "@/assets/telthdevices/oral-camera-uk.png"
import opthalmoscope from "@/assets/telthdevices/opthalmoscope-uk.png"
import pulseoximter from "@/assets/telthdevices/oximeter-uk.png"
import ecgbpmonitor from "@/assets/telthdevices/ecg+bp monitor.png"
import hemoglobinpoct from "@/assets/telthdevices/hemoglobin-poct-uk.jpg"
import multibiochem from "@/assets/telthdevices/multi-biochem-monitor-poct-uk.jpg"
import immunoanalyser from "@/assets/telthdevices/immunoanalyzer-uk.webp"
import urineanalyser from "@/assets/telthdevices/urine-analyzer-uk.png"
import HematologyAnalyzerAutomated from "@/assets/telthdevices/Dymind-DP-H10-Blutanalyse-Geraet.jpg"
import BiochemistryAnalyzerAutomated from "@/assets/telthdevices/bochemistry-analyzer-uk.png"
import ImmunologyAnalyzerAutomated from "@/assets/telthdevices/immunology-analyzer-uk.webp"
import bodycompositionadvanced from "@/assets/telthdevices/body-composotion-ind.webp"
import bodycompositionhigher from "@/assets/telthdevices/body-composotion-ind.webp"
import biochemistrypoct from "@/assets/telthdevices/biochem-poct-ind.jpg"
import immunoanalyserpoct from "@/assets/telthdevices/immunoanalyzer-uk.webp"
import hematologypoct from "@/assets/telthdevices/SCITEK-Fully-Automatic-Dry-Chemistry-Analyzer-POCT-12minutes-sample.avif"

interface MouseEventHandlers {
  (e: React.MouseEvent): void;
}
// src/types/global.d.ts

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}

export { };
// Add this after your imports in ConfigurationHub.tsx

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}
interface PartInfo {
  name: string;
  description: string;
  function: string;
  specifications: string[];
  position: [number, number, number];
}

interface CategorySelection {
  [categoryId: string]: string[];
}

interface AddonDevice {
  id: string;
  name: string;
  description: string;
  function: string;
  specifications: string[];
  imageSrc: string;
  devicesinclude?: string[]; // Add this optional property

}

interface HubDevice {
  id: string;
  name: string;
  description: string;
  mrp: number;
  discountPercent: number;
  finalPrice: number;
  imageSrc: string;
  specs: string[];
}

const addonDevices = {
  Basic: [
    {
      id: "body-composition-advanced",
      name: "Body Composition Analyzer (Advanced)",
      description: "Advanced body composition analysis with detailed metrics",
      function: "Body composition analysis",
      specifications: ["Multi-frequency BIA", "8-point measurement", "Muscle quality analysis"],
      imageSrc: bodycompositionadvanced,
    },
    {
      id: "body-composition-higher",
      name: "Body Composition Analyzer (Higher)",
      description: "Higher precision body composition measurement",
      function: "Precision body analysis",
      specifications: ["Segmental analysis", "ECW/ICW ratio", "Visceral fat assessment"],
      imageSrc: bodycompositionhigher,
    },
    {
      id: "hematology-poct",
      name: "Hematology Analyzer (Automated-PoCT)",
      description: "Point-of-care hematology testing with automated results",
      function: "Blood cell analysis",
      specifications: ["19 parameters", "CBC with 3-part diff", "45 samples/hour"],
      imageSrc: hematologypoct,
    },
    {
      id: "biochemistry-poct",
      name: "Biochemistry Analyzer (Automated-PoCT)",
      description: "Automated biochemistry testing at point of care",
      function: "Biochemical analysis",
      specifications: ["Multi-parameter testing", "Rapid results", "Quality controls"],
      imageSrc: biochemistrypoct,
    },
    {
      id: "immunology-poct",
      name: "Immunology Analyzer (Automated-PoCT)",
      description: "Automated immunology testing system",
      function: "Immunoassay analysis",
      specifications: ["Turbidimetric technology", "Multiple biomarkers", "Compact design"],
      imageSrc: immunoanalyserpoct,
    }
  ],
  Advanced: [
    {
      id: "body-composition-higher-adv",
      name: "Body Composition Analyzer (Higher)",
      description: "Premium body composition analysis system",
      function: "Advanced body analysis",
      specifications: ["8-electrode technology", "Android/iOS app", "Cloud storage"],
      imageSrc: bodycompositionadvanced,
    },
    {
      id: "hematology-automated",
      name: "Hematology Analyzer (Automated)",
      description: "Fully automated hematology analysis system",
      function: "Complete blood count",
      specifications: ["23 parameters", "5-part differential", "80 samples/hour"],
      imageSrc: hematologypoct,
    },
    {
      id: "biochemistry-automated",
      name: "Biochemistry Analyzer (Automated)",
      description: "Comprehensive automated biochemistry analyzer",
      function: "Biochemical profiling",
      specifications: ["50+ tests", "Random access", "150 tests/hour"],
      imageSrc: biochemistrypoct,
    },
    {
      id: "immunology-automated",
      name: "Immunology Analyzer (Automated)",
      description: "Automated immunology testing platform",
      function: "Immunoassay testing",
      specifications: ["Multiple methodologies", "Batch processing", "High throughput"],
      imageSrc: immunoanalyserpoct,
    }
  ],
  Multispecialty: []
};
// Device data per hub
const hubDevices: Record<string, HubDevice[]> = {
  Basic: [
    {
      id: "digital-thermometer",
      name: "Digital Thermometer",
      description: "High-precision temperature device",
      mrp: 299,
      discountPercent: 15,
      finalPrice: 254,
      imageSrc: thermometer,
      specs: ["±0.1°C accuracy", "Fast response", "Memory recall"],
    },
    {
      id: "foetal-doppler",
      name: "Foetal Doppler",
      description: "Fetal heart rate monitoring device",
      mrp: 1499,
      discountPercent: 20,
      finalPrice: 1199,
      imageSrc: fetaldoppler,
      specs: ["2MHz probe", "LCD display", "Built-in speaker"],
    },
    {
      id: "spirometer",
      name: "Spirometer",
      description: "Lung function testing device",
      mrp: 2499,
      discountPercent: 10,
      finalPrice: 2249,
      imageSrc: spirometer,
      specs: ["FEV1/FVC measurement", "Portable design", "USB connectivity"],
    },
    {
      id: "stethoscope",
      name: "Stethoscope",
      description: "Advanced acoustic monitoring",
      mrp: 3999,
      discountPercent: 25,
      finalPrice: 2999,
      imageSrc: stethoscope,
      specs: ["40x amplification", "Noise reduction", "Recording capability"],
    },
    {
      id: "wireless-stadiometer",
      name: "Wireless Stadiometer",
      description: "Digital height measurement device",
      mrp: 4599,
      discountPercent: 15,
      finalPrice: 3909,
      imageSrc: wirelessstadiometer,
      specs: ["Wireless connectivity", "Digital display", "Auto-calibration"],
    },
    {
      id: "otoscope",
      name: "Otoscope",
      description: "Ear examination and diagnosis",
      mrp: 3299,
      discountPercent: 20,
      finalPrice: 2639,
      imageSrc: otoscope,
      specs: ["LED illumination", "Multiple specula", "Portable design"],
    },
    {
      id: "dermatoscope",
      name: "Dermatoscope",
      description: "Skin surface microscopy",
      mrp: 5999,
      discountPercent: 30,
      finalPrice: 4199,
      imageSrc: dermatoscope,
      specs: ["10x magnification", "Polarized light", "Image capture"],
    },
    {
      id: "oral-camera",
      name: "Oral Camera",
      description: "Intraoral imaging system",
      mrp: 7899,
      discountPercent: 25,
      finalPrice: 5924,
      imageSrc: oralcamera,
      specs: ["HD resolution", "Waterproof", "Wireless operation"],
    },
    {
      id: "opthalmoscope",
      name: "Opthalmoscope",
      description: "Retinal and eye examination",
      mrp: 4299,
      discountPercent: 20,
      finalPrice: 3439,
      imageSrc: opthalmoscope,
      specs: ["Multiple apertures", "LED illumination", "Rechargeable"],
    },
    {
      id: "pulse-oximeter",
      name: "Pulse Oximeter",
      description: "SpO2 and heart rate monitor",
      mrp: 899,
      discountPercent: 15,
      finalPrice: 764,
      imageSrc: pulseoximter,
      specs: ["OLED display", "Low battery indicator", "Auto power-off"],
    },
    {
      id: "ecg-bp-monitor",
      name: "Omron COMPLETE – ECG + BP Monitor",
      description: "Combined cardiac and blood pressure monitoring",
      mrp: 5999,
      discountPercent: 20,
      finalPrice: 4799,
      imageSrc: ecgbpmonitor,
      specs: ["12-lead ECG", "Irregular heartbeat detection", "Cloud sync"],
    },
    {
      id: "hemoglobin-meter",
      name: "Hemoglobin Meter (PoCT)",
      description: "Point-of-care hemoglobin testing",
      mrp: 8999,
      discountPercent: 25,
      finalPrice: 6749,
      imageSrc: hemoglobinpoct,
      specs: ["Rapid results", "Small blood sample", "Portable design"],
    },
    {
      id: "immunology-analyzer",
      name: "Immunology Analyzer (PoCT)",
      description: "Immunological testing device",
      mrp: 12999,
      discountPercent: 30,
      finalPrice: 9099,
      imageSrc: immunoanalyser,
      specs: ["Rapid diagnostics", "Multiple test panels", "Compact design"],
    },
    {
      id: "urine-analyzer",
      name: "Urine Analyzer (PoCT)",
      description: "Automated urine testing system",
      mrp: 10999,
      discountPercent: 20,
      finalPrice: 8799,
      imageSrc: urineanalyser,
      specs: ["10 parameters", "Auto calibration", "QR code reader"],
    }
  ],
  Advanced: [
    {
      id: "digital-thermometer",
      name: "Digital Thermometer",
      description: "High-precision temperature device",
      mrp: 299,
      discountPercent: 15,
      finalPrice: 254,
      imageSrc: thermometer,
      specs: ["±0.1°C accuracy", "Fast response", "Memory recall"],
    },
    {
      id: "foetal-doppler",
      name: "Foetal Doppler",
      description: "Fetal heart rate monitoring device",
      mrp: 1499,
      discountPercent: 20,
      finalPrice: 1199,
      imageSrc: fetaldoppler,
      specs: ["2MHz probe", "LCD display", "Built-in speaker"],
    },
    {
      id: "spirometer",
      name: "Spirometer",
      description: "Lung function testing device",
      mrp: 2499,
      discountPercent: 10,
      finalPrice: 2249,
      imageSrc: spirometer,
      specs: ["FEV1/FVC measurement", "Portable design", "USB connectivity"],
    },
    {
      id: "stethoscope",
      name: "Stethoscope",
      description: "Advanced acoustic monitoring",
      mrp: 3999,
      discountPercent: 25,
      finalPrice: 2999,
      imageSrc: stethoscope,
      specs: ["40x amplification", "Noise reduction", "Recording capability"],
    },
    {
      id: "body-composition-analyzer",
      name: "Body Composition Analyzer",
      description: "Complete body metrics analysis",
      mrp: 12999,
      discountPercent: 25,
      finalPrice: 9749,
      imageSrc: bodycomposeanalyser,
      specs: ["BMI calculation", "Body fat %", "Muscle mass"],
    },
    {
      id: "wireless-stadiometer",
      name: "Wireless Stadiometer",
      description: "Digital height measurement device",
      mrp: 4599,
      discountPercent: 15,
      finalPrice: 3909,
      imageSrc: wirelessstadiometer,
      specs: ["Wireless connectivity", "Digital display", "Auto-calibration"],
    },
    {
      id: "otoscope",
      name: "Otoscope",
      description: "Ear examination and diagnosis",
      mrp: 3299,
      discountPercent: 20,
      finalPrice: 2639,
      imageSrc: otoscope,
      specs: ["LED illumination", "Multiple specula", "Portable design"],
    },
    {
      id: "dermatoscope",
      name: "Dermatoscope",
      description: "Skin surface microscopy",
      mrp: 5999,
      discountPercent: 30,
      finalPrice: 4199,
      imageSrc: dermatoscope,
      specs: ["10x magnification", "Polarized light", "Image capture"],
    },
    {
      id: "oral-camera",
      name: "Oral Camera",
      description: "Intraoral imaging system",
      mrp: 7899,
      discountPercent: 25,
      finalPrice: 5924,
      imageSrc: oralcamera,
      specs: ["HD resolution", "Waterproof", "Wireless operation"],
    },
    {
      id: "opthalmoscope",
      name: "Opthalmoscope",
      description: "Retinal and eye examination",
      mrp: 4299,
      discountPercent: 20,
      finalPrice: 3439,
      imageSrc: opthalmoscope,
      specs: ["Multiple apertures", "LED illumination", "Rechargeable"],
    },
    {
      id: "pulse-oximeter",
      name: "Pulse Oximeter",
      description: "SpO2 and heart rate monitor",
      mrp: 899,
      discountPercent: 15,
      finalPrice: 764,
      imageSrc: pulseoximter,
      specs: ["OLED display", "Low battery indicator", "Auto power-off"],
    },
    {
      id: "ecg-bp-monitor",
      name: "Omron COMPLETE – ECG + BP Monitor",
      description: "Combined cardiac and blood pressure monitoring",
      mrp: 5999,
      discountPercent: 20,
      finalPrice: 4799,
      imageSrc: ecgbpmonitor,
      specs: ["12-lead ECG", "Irregular heartbeat detection", "Cloud sync"],
    },
    {
      id: "immunology-analyzer",
      name: "Immunology Analyzer Automated (PoCT)",
      description: "Immunological testing device",
      mrp: 12999,
      discountPercent: 30,
      finalPrice: 9099,
      imageSrc: ImmunologyAnalyzerAutomated,
      specs: ["Rapid diagnostics", "Multiple test panels", "Compact design"],
    },
    {
      id: "urine-analyzer",
      name: "Urine Analyzer (PoCT)",
      description: "Automated urine testing system",
      mrp: 10999,
      discountPercent: 20,
      finalPrice: 8799,
      imageSrc: urineanalyser,
      specs: ["10 parameters", "Auto calibration", "QR code reader"],
    },
    {
      id: "multi-biochem-monitor",
      name: "Multi Biochem Monitor Automated (PoCT)",
      description: "Multi-parameter biochemical analysis",
      mrp: 15999,
      discountPercent: 15,
      finalPrice: 13599,
      imageSrc: BiochemistryAnalyzerAutomated,
      specs: ["Multi-parameter", "Rapid results", "Quality control"],
    },
    {
      id: "hemato-biochem-monitor",
      name: "Hematology analyser Automated (PoCT)",
      description: "Multi-parameter biochemical analysis",
      mrp: 15999,
      discountPercent: 15,
      finalPrice: 13599,
      imageSrc: HematologyAnalyzerAutomated,
      specs: ["Multi-parameter", "Rapid results", "Quality control"],
    },
    {
      id: "Ultrasound-monitor",
      name: "Portable Ultrasound Physiotherapy Machine",
      description: "Multi-parameter biochemical analysis",
      mrp: 15999,
      discountPercent: 15,
      finalPrice: 13599,
      imageSrc: multibiochem,
      specs: ["Multi-parameter", "Rapid results", "Quality control"],
    },
  ],
  Multispecialty: [
    {
      id: "digital-thermometer",
      name: "Digital Thermometer",
      description: "High-precision temperature device",
      mrp: 299,
      discountPercent: 15,
      finalPrice: 254,
      imageSrc: thermometer,
      specs: ["±0.1°C accuracy", "Fast response", "Memory recall"],
    },
    {
      id: "foetal-doppler",
      name: "Foetal Doppler",
      description: "Fetal heart rate monitoring device",
      mrp: 1499,
      discountPercent: 20,
      finalPrice: 1199,
      imageSrc: fetaldoppler,
      specs: ["2MHz probe", "LCD display", "Built-in speaker"],
    },
    {
      id: "spirometer",
      name: "Spirometer",
      description: "Lung function testing device",
      mrp: 2499,
      discountPercent: 10,
      finalPrice: 2249,
      imageSrc: spirometer,
      specs: ["FEV1/FVC measurement", "Portable design", "USB connectivity"],
    },
    {
      id: "stethoscope",
      name: "Stethoscope",
      description: "Advanced acoustic monitoring",
      mrp: 3999,
      discountPercent: 25,
      finalPrice: 2999,
      imageSrc: stethoscope,
      specs: ["40x amplification", "Noise reduction", "Recording capability"],
    },
    {
      id: "wireless-stadiometer",
      name: "Wireless Stadiometer",
      description: "Digital height measurement device",
      mrp: 4599,
      discountPercent: 15,
      finalPrice: 3909,
      imageSrc: wirelessstadiometer,
      specs: ["Wireless connectivity", "Digital display", "Auto-calibration"],
    },
    {
      id: "otoscope",
      name: "Otoscope",
      description: "Ear examination and diagnosis",
      mrp: 3299,
      discountPercent: 20,
      finalPrice: 2639,
      imageSrc: otoscope,
      specs: ["LED illumination", "Multiple specula", "Portable design"],
    },
    {
      id: "dermatoscope",
      name: "Dermatoscope",
      description: "Skin surface microscopy",
      mrp: 5999,
      discountPercent: 30,
      finalPrice: 4199,
      imageSrc: dermatoscope,
      specs: ["10x magnification", "Polarized light", "Image capture"],
    },
    {
      id: "oral-camera",
      name: "Oral Camera",
      description: "Intraoral imaging system",
      mrp: 7899,
      discountPercent: 25,
      finalPrice: 5924,
      imageSrc: oralcamera,
      specs: ["HD resolution", "Waterproof", "Wireless operation"],
    },
    {
      id: "opthalmoscope",
      name: "Opthalmoscope",
      description: "Retinal and eye examination",
      mrp: 4299,
      discountPercent: 20,
      finalPrice: 3439,
      imageSrc: opthalmoscope,
      specs: ["Multiple apertures", "LED illumination", "Rechargeable"],
    },
    {
      id: "pulse-oximeter",
      name: "Pulse Oximeter",
      description: "SpO2 and heart rate monitor",
      mrp: 899,
      discountPercent: 15,
      finalPrice: 764,
      imageSrc: pulseoximter,
      specs: ["OLED display", "Low battery indicator", "Auto power-off"],
    },
    {
      id: "ecg-bp-monitor",
      name: "Omron COMPLETE – ECG + BP Monitor",
      description: "Combined cardiac and blood pressure monitoring",
      mrp: 5999,
      discountPercent: 20,
      finalPrice: 4799,
      imageSrc: ecgbpmonitor,
      specs: ["12-lead ECG", "Irregular heartbeat detection", "Cloud sync"],
    },
    {
      id: "hemoglobin-meter",
      name: "Hemoglobin Meter (PoCT)",
      description: "Point-of-care hemoglobin testing",
      mrp: 8999,
      discountPercent: 25,
      finalPrice: 6749,
      imageSrc: hemoglobinpoct,
      specs: ["Rapid results", "Small blood sample", "Portable design"],
    },
    {
      id: "multi-biochem-monitor",
      name: "Multi Biochem Monitor (PoCT)",
      description: "Multi-parameter biochemical analysis",
      mrp: 15999,
      discountPercent: 15,
      finalPrice: 13599,
      imageSrc: multibiochem,
      specs: ["Multi-parameter", "Rapid results", "Quality control"],
    },
    {
      id: "urine-analyzer",
      name: "Urine Analyzer (PoCT)",
      description: "Automated urine testing system",
      mrp: 10999,
      discountPercent: 20,
      finalPrice: 8799,
      imageSrc: urineanalyser,
      specs: ["10 parameters", "Auto calibration", "QR code reader"],
    },
    {
      id: "Ultrasound-monitor",
      name: "Portable Ultrasound Physiotherapy Machine",
      description: "Multi-parameter biochemical analysis",
      mrp: 15999,
      discountPercent: 15,
      finalPrice: 13599,
      imageSrc: multibiochem,
      specs: ["Multi-parameter", "Rapid results", "Quality control"],
    },
  ],
};

const categories = [
  {
    id: "Basic",
    name: "Basic Configuration",
    description: "Essential medical monitoring features",
    price: "$2,999",
    features: [
      "Heart Rate Monitoring",
      "Blood Pressure",
      "Temperature Tracking",
      "Basic Analytics",
    ],
    specifications: [
      "Digital Thermometer",
      "Foetal Doppler",
      "Spirometer",
      "Stethoscope",
      "Body Composition Analyzer",
      "Wireless Stadiometer",
      "Otoscope",
      "Dermatoscope",
      "Oral Camera",
      "Opthalmoscope",
      "Pulse Oximeter",
      "Omron COMPLETE – ECG + BP Monitor",
      "Hemoglobin Meter (PoCT)",
      "Multi Biochem Monitor (PoCT)",
      "Immunology Analyzer (PoCT)",
      "Urine Analyzer (PoCT)",
    ],
  },
  {
    id: "Advanced",
    name: "Advanced Configuration",
    description: "Enhanced AI-powered diagnostics",
    price: "$5,999",
    features: [
      "AI Diagnostics",
      "Real-time Alerts",
      "Cloud Sync",
      "Advanced Analytics",
      "Multi-patient Support",
    ],
    specifications: [
      "Digital Thermometer",
      "Foetal Doppler",
      "Spirometer",
      "Stethoscope",
      "Pulse Oximeter",
      "Omron COMPLETE – ECG + BP Monitor",
    ],
  },
  {
    id: "Multispecialty",
    name: "Multispecialty Configuration",
    description: "Complete healthcare solution",
    price: "$9,999",
    features: [
      "Full Diagnostic Suite",
      "Specialized Modules",
      "Enterprise Integration",
      "Custom AI Models",
      "24/7 Support",
    ],
    specifications: [
      "Digital Thermometer",
      "Foetal Doppler",
      "Spirometer",
      "Stethoscope",
      "Body Composition Analyzer",
      "Wireless Stadiometer",
      "Otoscope",
      "Dermatoscope",
      "Oral Camera",
      "Opthalmoscope",
      "Pulse Oximeter",
      "Omron COMPLETE – ECG + BP Monitor",
      "Hemoglobin Meter (PoCT)",
      "Multi Biochem Monitor (PoCT)",
      "Immunology Analyzer (PoCT)",
      "Urine Analyzer (PoCT)",
    ],
  },
];

const producthighlights = {
  Basic: {
    totalParams: 100,
    outputDays: 7
  },
  Advanced: {
    totalParams: 200,
    outputDays: 3
  },
  Multispecialty: {
    totalParams: 500,
    outputDays: 1
  }
};
// Separate careplans data (appears in all categories)
const careplansData = [
  {
    id: "careplanskit-home",
    name: "Homecareplan-Kit (Careplan)",
    description: "Comprehensive home care solution covering all major specialties",
    function: "Multi-specialty home care monitoring",
    specifications: ["Cardiac monitoring", "Sugar tracking", "Ortho rehabilitation"],
    devicesinclude: ["One tablet", "Digital thermometer", "Fetal doppler", "BP monitor", "Pulse oximeter", "ECG device"],
    imageSrc: thermometer,
  },
  {
    id: "careplanskit-premium",
    name: "Premium Careplan-Kit (Careplan)",
    description: "Advanced careplan with specialized medical devices",
    function: "Premium home healthcare package",
    specifications: ["Advanced diagnostics", "Remote monitoring", "AI analysis"],
    devicesinclude: ["Smart tablet", "Advanced thermometer", "Wireless BP monitor", "ECG + SpO2", "Stethoscope"],
    imageSrc: immunoanalyser, // Add your second careplan image
  }
];

const colors = [
  { name: "Midnight Black", value: "#000000" },
  { name: "Medical White", value: "#FFFFFF" },
  { name: "Steel Gray", value: "#6B7280" },
  { name: "Clinical Blue", value: "#3B82F6" },
];

const placeholderCount = 5;

const ConfigurationHub = () => {
  const [activeCategory, setActiveCategory] = useState("Basic");
  const [selectedSpecs, setSelectedSpecs] = useState<CategorySelection>({});
  const [isSticky, setIsSticky] = useState(false);
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartInfo | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [selectedAddonModalDevice, setSelectedAddonModalDevice] = useState<AddonDevice | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderSubmissionStatus, setOrderSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null);
  // Add this new state to track hub navigation popup
  const [showHubNavigationPopup, setShowHubNavigationPopup] = useState(false);
  const [lastActiveCategory, setLastActiveCategory] = useState("Basic");
  const [targetCategory, setTargetCategory] = useState("");


  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const [initialRecaptchaVerifier, setInitialRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  // Global device selection state (persists across hub switches)
  const [shouldSticky, setShouldSticky] = useState(true);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [selectedModalDevice, setSelectedModalDevice] = useState<HubDevice | null>(null)
  const [expandedAddons, setExpandedAddons] = useState<Record<string, boolean>>({});
  // New hub-specific state structure
  const [hubSelections, setHubSelections] = useState<Record<string, {
    selectedAddons: string[];
    careplanQuantities: Record<string, number>;
    selectedColor: string; // Add color per hub
  }>>({
    Basic: { selectedAddons: [], careplanQuantities: {}, selectedColor: "#000000" },
    Advanced: { selectedAddons: [], careplanQuantities: {}, selectedColor: "#000000" },
    Multispecialty: { selectedAddons: [], careplanQuantities: {}, selectedColor: "#000000" }
  });

  // Global states (remain same)
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+91" });

  // OTP states - REPLACE your existing OTP states with these:    
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState("#000000"); // ← REMOVE THIS
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [isRecaptchaModalOpen, setIsRecaptchaModalOpen] = useState(false);
  // Add this to your state
  const [recaptchaSolved, setRecaptchaSolved] = useState(false);

  const [lastOtpTime, setLastOtpTime] = useState(0);
  // Add this to your component


  const handleColorSelect = (colorValue: string) => {
    setHubSelections(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        selectedColor: colorValue
      }
    }));
    setSelectedColor(colorValue); // Keep both in sync
  };

  const createRecaptcha = (containerId: string = 'recaptcha-container'): Promise<RecaptchaVerifier> => {
    return new Promise((resolve, reject) => {
      console.log('🔄 Creating OTP reCAPTCHA for container:', containerId);

      // Cleanup existing OTP reCAPTCHA (but don't touch bot verification one)
      if (window.recaptchaVerifier && containerId === 'recaptcha-container-otp') {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      const container = document.getElementById(containerId);
      if (!container) {
        reject(new Error(`reCAPTCHA container ${containerId} not found`));
        return;
      }

      container.innerHTML = '';

      try {
        const recaptchaVerifier = new RecaptchaVerifier(
          auth,
          containerId,
          {
            size: 'normal',
            callback: (response: string) => {
              console.log('✅ OTP reCAPTCHA solved in container:', containerId);
              // Don't auto-proceed here - let user manually verify OTP
            },
            'expired-callback': () => {
              console.log('❌ OTP reCAPTCHA expired');
            }
          }
        );

        // Only set as global if it's for OTP
        if (containerId === 'recaptcha-container-otp') {
          window.recaptchaVerifier = recaptchaVerifier;
        }

        recaptchaVerifier.render().then(() => {
          console.log('✅ OTP reCAPTCHA rendered in:', containerId);
          resolve(recaptchaVerifier);
        }).catch(error => {
          console.error('❌ OTP reCAPTCHA render failed:', error);
          reject(error);
        });

      } catch (error) {
        console.error('💥 OTP reCAPTCHA creation failed:', error);
        reject(error);
      }
    });
  };
  const initializeBotVerificationRecaptcha = async () => {
    try {
      console.log('🔄 Creating bot verification reCAPTCHA...');

      const container = document.getElementById('recaptcha-container-initial');
      if (!container) {
        console.error('❌ Bot verification reCAPTCHA container not found');
        return;
      }

      // Clear any existing content
      container.innerHTML = '';

      // Create NEW reCAPTCHA instance for bot verification
      const botRecaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container-initial',
        {
          size: 'normal',
          callback: (response: string) => {
            console.log('✅ Bot verification reCAPTCHA solved - proceeding to OTP');
            handleRecaptchaSuccess();
          },
          'expired-callback': () => {
            console.log('❌ Bot verification reCAPTCHA expired');
            setRecaptchaInitialized(false);
          }
        }
      );

      // Store this separately from the global verifier
      setInitialRecaptchaVerifier(botRecaptchaVerifier);

      // Render reCAPTCHA
      await botRecaptchaVerifier.render();
      console.log('✅ Bot verification reCAPTCHA rendered');
      setRecaptchaInitialized(true);

    } catch (error) {
      console.error('💥 Failed to initialize bot verification reCAPTCHA:', error);
      setRecaptchaInitialized(false);
    }
  };
  const handleRecaptchaSuccess = async () => {
    console.log('✅ reCAPTCHA verified - opening OTP modal...');

    // IMMEDIATELY open OTP modal and close reCAPTCHA modal
    setIsRecaptchaModalOpen(false);

    // Use setTimeout to ensure state updates happen in correct order
    setTimeout(() => {
      setOtpModalOpen(true);
    }, 100);

    // Generate OTP after a brief delay to ensure modal is open
    setTimeout(async () => {
      setOtpLoading(true);
      try {
        console.log('📱 Starting OTP generation...');
        const otpResult = await generateOTP(formData.phone);

        if (!otpResult.success) {
          setOtpError(otpResult.message);
          // If OTP fails, go back to reCAPTCHA
          setOtpModalOpen(false);
          setIsRecaptchaModalOpen(true);

          // Reset reCAPTCHA
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
          }
        }
      } catch (error: any) {
        console.error('OTP generation error:', error);
        setOtpError('Failed to send OTP: ' + error.message);
        // Reset on error
        setOtpModalOpen(false);
        setIsRecaptchaModalOpen(true);
      } finally {
        setOtpLoading(false);
      }
    }, 500);
  };
const handleCategoryChange = (categoryId: string) => {
  // Only show popup if actually switching to a different category AND current hub has selections
  if (categoryId !== activeCategory) {
    const currentHubSelection = hubSelections[activeCategory];
    const hasSelections = 
      currentHubSelection.selectedAddons.length > 0 || 
      Object.values(currentHubSelection.careplanQuantities).some(qty => qty > 0);

    if (hasSelections) {
      setLastActiveCategory(activeCategory); // Store current category
      setTargetCategory(categoryId); // Store the target category user wants to switch to
      setShowHubNavigationPopup(true); // Show popup only if current hub has selections
    } else {
      // If no selections in current hub, just switch directly
      setActiveCategory(categoryId);
    }
  }
};
  const handleGetPricing = () => {
    setShowHubNavigationPopup(false);
    setActiveCategory(lastActiveCategory); // Stay on current category and open pricing
    setIsOrderModalOpen(true); // Open the existing order form
  };
  const handleConfigureAnotherHub = () => {
    setShowHubNavigationPopup(false);
    setActiveCategory(targetCategory); // Switch to the intended target category
  };

  // Update generateOTP to use the promise version
  const generateOTP = async (phoneNumber: string, countryCode: string) => {
    const now = Date.now();
    const timeSinceLastOtp = now - lastOtpTime;

    if (timeSinceLastOtp < 60000) {
      setOtpError('Please wait 60 seconds before requesting another OTP');
      return { success: false, message: 'Rate limit exceeded' };
    }

    if (otpAttempts >= 3) {
      setOtpError('Too many attempts. Please try again later.');
      return { success: false, message: 'Max attempts reached' };
    }

    setOtpAttempts(prev => prev + 1);
    setLastOtpTime(now);

    try {  
      console.log('📱 Generating OTP...');
      setOtpError('');

      // Combine country code with phone number
      const formattedPhone = `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
      console.log('📞 Formatted phone:', formattedPhone);

      // Verify reCAPTCHA is ready
      if (!window.recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized. Please complete the verification first.');
      }

      console.log('✅ Using verified reCAPTCHA, sending OTP...');
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);

      console.log('✅ OTP sent successfully!');
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setResendTimer(90);
      startResendTimer();

      return {
        success: true,
        message: 'OTP sent to your phone'
      };

    } catch (error: any) {
      console.error('❌ OTP generation failed:', error);

      let errorMessage = 'Failed to send OTP';
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setOtpError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const formatPhoneNumber = (phone: string, countryCode: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return `${countryCode}${cleaned}`;
  };
  // Add this useEffect to handle OTP generation when modal opens
  // Update the reCAPTCHA initialization in your useEffect
  useEffect(() => {

    if (isRecaptchaModalOpen) {
      const initializeRecaptcha = async () => {
        try {
          console.log('🔄 Initializing reCAPTCHA...');

          const container = document.getElementById('recaptcha-container');
          if (!container) {
            console.error('❌ reCAPTCHA container not found');
            return;
          }

          // Clear previous instance completely
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
          }

          // Clear container content
          container.innerHTML = '';

          // Create new reCAPTCHA instance
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {
              size: 'normal',
              callback: (response: string) => {
                console.log('✅ reCAPTCHA solved successfully');
                setRecaptchaSolved(true);
              },
              'expired-callback': () => {
                console.log('❌ reCAPTCHA expired');
                setRecaptchaSolved(false);
                setOtpError('Verification expired. Please try again.');
              },
              'error-callback': () => {
                console.log('❌ reCAPTCHA error');
                setRecaptchaSolved(false);
                setOtpError('Verification failed. Please try again.');
              }
            }
          );

          // Render and store widget ID
          const widgetId = await window.recaptchaVerifier.render();
          setRecaptchaWidgetId(widgetId);
          console.log('✅ reCAPTCHA rendered with widget ID:', widgetId);

          // Reset solved state
          setRecaptchaSolved(false);

        } catch (error) {
          console.error('💥 reCAPTCHA initialization failed:', error);
          setOtpError('Failed to load verification. Please refresh and try again.');
        }
      };


      initializeRecaptcha();
    }
  }, [isRecaptchaModalOpen]);
  // Handle OTP when modal opens
  useEffect(() => {
    if (otpModalOpen && !otpSent && !confirmationResult) {
      console.log('🔄 OTP modal opened, generating OTP...');

      const generateOtpOnOpen = async () => {
        if (formData.phone && window.recaptchaVerifier) {
          setOtpLoading(true);
          try {
            await generateOTP(formData.phone, formData.countryCode);
          } catch (error) {
            console.error('Auto OTP generation failed:', error);
            setOtpError('Failed to send OTP. Please try again.');
          } finally {
            setOtpLoading(false);
          }
        } else {
          setOtpError('Phone number or reCAPTCHA verification missing');
        }
      };

      generateOtpOnOpen();
    }
  }, [otpModalOpen, otpSent, confirmationResult]);

  // Remove the debugging useEffect and replace with this:
  useEffect(() => {
    if (isRecaptchaModalOpen) {
      console.log('🎯 reCAPTCHA modal opened, initializing...');

      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeRecaptchaForModal();
      }, 300);

      return () => clearTimeout(timer);
    } else {
      // Cleanup when modal closes
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      setRecaptchaSolved(false);
    }
  }, [isRecaptchaModalOpen]);


  const initializeRecaptchaForModal = async () => {
    try {
      console.log('🔄 Initializing reCAPTCHA for modal...');

      // Wait a bit for the DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      const container = document.getElementById('recaptcha-container');
      console.log('🔍 Looking for recaptcha-container:', container);

      if (!container) {
        console.error('❌ reCAPTCHA container not found');
        // Try to create it if it doesn't exist
        const modalContent = document.querySelector('[data-radix-dialog-content]');
        if (modalContent) {
          const newContainer = document.createElement('div');
          newContainer.id = 'recaptcha-container';
          newContainer.className = 'flex justify-center w-full min-h-[78px] border rounded-lg p-4 bg-gray-50';
          modalContent.querySelector('div > div:last-child')?.prepend(newContainer);
          console.log('✅ Created recaptcha container dynamically');
        }
        return;
      }

      // Clear any existing content
      container.innerHTML = '';

      // Clear any existing reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      console.log('✅ Container found, creating reCAPTCHA...');

      // Create and render reCAPTCHA
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container', // This MUST match the ID above
        {
          size: 'normal',
          callback: (response: string) => {
            console.log('✅ reCAPTCHA solved - proceeding to OTP');
            setRecaptchaSolved(true);
          },
          'expired-callback': () => {
            console.log('❌ reCAPTCHA expired');
            setRecaptchaSolved(false);
            setOtpError('Verification expired. Please try again.');
          },
          'error-callback': () => {
            console.log('❌ reCAPTCHA error');
            setRecaptchaSolved(false);
            setOtpError('Verification failed. Please try again.');
          }
        }
      );

      window.recaptchaVerifier = recaptchaVerifier;

      // Render reCAPTCHA
      console.log('🎨 Rendering reCAPTCHA...');
      const widgetId = await recaptchaVerifier.render();
      console.log('✅ reCAPTCHA rendered with widget ID:', widgetId);

      setRecaptchaSolved(false);

    } catch (error) {
      console.error('💥 Failed to initialize reCAPTCHA:', error);
      setOtpError('Failed to load verification. Please refresh and try again.');
    }
  };
  // Timer function
  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const handleBotVerificationCancel = () => {
    // Cleanup bot verification reCAPTCHA
    if (initialRecaptchaVerifier) {
      initialRecaptchaVerifier.clear();
      setInitialRecaptchaVerifier(null);
    }
    setRecaptchaInitialized(false);
    setIsRecaptchaModalOpen(false);
  };


  // Get current hub's selections
  const currentHubSelections = hubSelections[activeCategory];

  // Update addon selection for current hub
  const toggleAddonSelection = (id: string) => {
    setHubSelections(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        selectedAddons: prev[activeCategory].selectedAddons.includes(id)
          ? prev[activeCategory].selectedAddons.filter(a => a !== id)
          : [...prev[activeCategory].selectedAddons, id]
      }
    }));
  };

  // Update careplan quantity for current hub
  const updateCareplanQuantity = (careplanId: string, change: number) => {
    setHubSelections(prev => {
      const currentHub = prev[activeCategory];
      const currentQty = currentHub.careplanQuantities[careplanId] || 0;
      const newQty = Math.max(0, currentQty + change);

      const updatedQuantities = {
        ...currentHub.careplanQuantities,
        [careplanId]: newQty
      };

      // Update selectedAddons based on quantity
      const updatedAddons = newQty > 0
        ? [...currentHub.selectedAddons.filter(a => a !== careplanId), careplanId]
        : currentHub.selectedAddons.filter(a => a !== careplanId);

      return {
        ...prev,
        [activeCategory]: {
          selectedAddons: updatedAddons,
          careplanQuantities: updatedQuantities
        }
      };
    });
  };

  const prepareOrderData = () => {
    const allAddons = [
      ...(addonDevices[activeCategory] || []),
      ...careplansData
    ];

    const hubsData = Object.keys(hubSelections).reduce((acc, hubId) => {
      const hubSelection = hubSelections[hubId];
      const hubAddons = allAddons.filter(device =>
        hubSelection.selectedAddons.includes(device.id)
      );

      acc[hubId] = {
        selectedAddons: hubAddons,
        careplanQuantities: hubSelection.careplanQuantities,
        selectedColor: hubSelection.selectedColor // ✅ ADD THIS
      };
      return acc;
    }, {} as any);

    const allHubDevices = Object.values(hubDevices).flat();
    const selectedDeviceDetails = allHubDevices.filter(device =>
      selectedDevices.includes(device.id)
    );

    return {
      ...formData,
      category: activeCategory, // ✅ Already correct
      hubs: hubsData,
      selectedDevices: selectedDeviceDetails,
      timestamp: new Date().toISOString(),
      otpVerified: true // ✅ This confirms OTP was verified
    };
  };

  // OTP Input Handling
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    // Auto-advance
    if (element.value && index < 5) {
      const nextInput = element.nextElementSibling as HTMLInputElement;
      nextInput?.focus();
    }
    // Auto-submit when all digits filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerifyOtp();
    }
  };
  // Paste support
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.slice(0, 6).split('');

    if (pastedOtp.every(digit => !isNaN(Number(digit)))) {
      setOtp(pastedOtp);

      // Auto-focus last input and submit
      const lastInput = document.getElementById(`otp-5`) as HTMLInputElement;
      lastInput?.focus();

      if (pastedOtp.length === 6) {
        setTimeout(() => handleVerifyOtp(), 100);
      }
    }
  };

  // Resend OTP Logic
  const handleResendOtp = async () => {
    if (resendAttempts >= 3) {
      setOtpError('Maximum resend attempts reached');
      return;
    }

    setOtpLoading(true);
    setOtpError('');

    try {
      // ✅ CORRECT: Send only required fields
      const resp = await fetch("https://api.telth.ai:8000/api/v1/webapp1/auth/otp/generate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: `${formData.countryCode}${formData.phone}`, // ✅ Correct field name
          webappId: "webapp1" // ✅ Include webappId
        })
      });

      if (resp.ok) {
        setResendTimer(90);
        setResendAttempts(prev => prev + 1);
        setOtp(new Array(6).fill('')); // Clear OTP inputs
      } else {
        setOtpError('Failed to resend OTP');
      }
    } catch (error) {
      setOtpError('Network error');
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setOtpError('');

    try {
      const otpCode = otp.join('');

      if (otpCode.length !== 6) {
        throw new Error('Please enter a 6-digit OTP');
      }

      if (!confirmationResult) {
        throw new Error('OTP session expired. Please request a new OTP.');
      }

      // ✅ Step 1: Verify OTP with Firebase
      const result = await confirmationResult.confirm(otpCode);
      const idToken = await result.user.getIdToken();

      // ✅ Step 2: Prepare order data
      const orderData = prepareOrderData();

      // ✅ Step 3: Send BOTH verification AND order data to backend
      const backendResponse = await fetch("http://localhost:8000/api/v1/webapp1/auth/phone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: `${formData.countryCode}${formData.phone}`,
          idToken: idToken,
          webappId: "webapp1",
          userData: {
            name: formData.name,
            email: formData.email,
            phone: `${formData.countryCode}${formData.phone}`
          },
          orderData: orderData // ✅ Include order data here
        })
      });

      const backendResult = await backendResponse.json();

      // ✅ Step 4: ONLY if backend confirms success, show success modal
      if (backendResult.success) {
        setOtpVerified(true);
        setOtpModalOpen(false);
        setOrderSubmissionStatus('success');
        setIsSuccessModalOpen(true);
        setIsOrderModalOpen(false);

        // Cleanup
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }
      } else {
        throw new Error(backendResult.message || 'Backend verification failed');
      }

    } catch (error: any) {
      console.error('OTP verification error:', error);

      if (error.code === 'auth/invalid-verification-code') {
        setOtpError('Invalid OTP code. Please check and try again.');
      } else if (error.code === 'auth/code-expired') {
        setOtpError('OTP has expired. Please request a new one.');
      } else {
        setOtpError(error.message || 'OTP verification failed. Please try again.');
      }
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    const initialSelectedSpecs: CategorySelection = {};
    categories.forEach((category) => {
      initialSelectedSpecs[category.id] = [];
    });
    setSelectedSpecs(initialSelectedSpecs);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && detailsRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const leftHeight = sectionRef.current.offsetHeight;
        const sectionTop = window.scrollY + sectionRect.top;
        const rightScrolled = window.scrollY + window.innerHeight - sectionTop;
        // const shouldBeSticky = sectionRect.top <= 80 && rightScrolled < leftHeight;
        // setIsSticky(shouldBeSticky);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (leftColumnRef.current) {
        const leftHeight = leftColumnRef.current.offsetHeight;
        const scrollY = window.scrollY;

        // Stop sticking when scrolled 300px past left content height
        if (scrollY > leftHeight + 300) {
          setShouldSticky(false);
        } else {
          setShouldSticky(true);
        }
      }
    };       

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderSubmit = async () => {
    // Validate form
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    console.log('🔄 Starting order submission process...');

    // Reset OTP state
    setOtpError('');
    setOtp(new Array(6).fill(''));
    setOtpSent(false);
    setConfirmationResult(null);
    setRecaptchaSolved(false);

    // Close order modal and open reCAPTCHA modal
    setIsOrderModalOpen(false);
    setIsRecaptchaModalOpen(true);
  };

  // In your OTP modal, update the cancel handler:
  const handleCancelOtp = () => {
    if (window.confirm("Are you sure? Your OTP will expire and you'll need to start over.")) {
      // Cleanup reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      setOtpModalOpen(false);
      setOtp(new Array(6).fill(''));
      setOtpError('');
      setResendAttempts(0);
      setResendTimer(0);
      setOtpSent(false);
      setConfirmationResult(null);
    }
  };

  // Prevent modal close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const resetOtpFlow = () => {
    console.log('Resetting OTP flow...');

    // Cleanup reCAPTCHA
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    // Clear container
    const container = document.getElementById('recaptcha-container');
    if (container) {
      container.innerHTML = '';
    }

    // Reset state
    setOtpModalOpen(false);
    setOtp(new Array(6).fill(''));
    setOtpError('');
    setResendAttempts(0);
    setResendTimer(0);
    setOtpSent(false);
    setOtpVerified(false);
    setConfirmationResult(null);
    setOtpLoading(false);
  };

  const handleRecaptchaVerified = async () => {
    if (!recaptchaSolved) {
      setOtpError('Please complete the reCAPTCHA verification first');
      return;
    }

    console.log('✅ reCAPTCHA verified - sending OTP...');

    setOtpLoading(true);
    try {
      const otpResult = await generateOTP(formData.phone, formData.countryCode);

      if (otpResult.success) {
        setIsRecaptchaModalOpen(false);
        setOtpModalOpen(true);
        setOtpError('');
      } else {
        setOtpError(otpResult.message);
        // ❌ PROBLEM: This doesn't allow user to close modal or re-enter number
        // ✅ FIX: Reset reCAPTCHA but DON'T lock the user
        resetRecaptcha(); // Clear reCAPTCHA
        setRecaptchaSolved(false);
        // Re-initialize reCAPTCHA so user can try again
        setTimeout(() => {
          initializeRecaptchaForModal();
        }, 500);
      }
    } catch (error: any) {
      console.error('OTP generation error:', error);
      setOtpError('Failed to send OTP: ' + error.message);
      // ✅ FIX: Reset on error too
      resetRecaptcha();
      setRecaptchaSolved(false);
      setTimeout(() => {
        initializeRecaptchaForModal();
      }, 500);
    } finally {
      setOtpLoading(false);
    }
  };
  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    setRecaptchaSolved(false);
    setRecaptchaWidgetId(null);
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId) ? prev.filter((d) => d !== deviceId) : [...prev, deviceId]
    );
  };

  const toggleExploreMode = () => {
    setIsExploreMode(!isExploreMode);
    setSelectedPart(null);
  };
  const toggleAddonExpansion = (deviceId: string) => {
    setExpandedAddons(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId]
    }));
  };

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];
  const currentHubDevices = hubDevices[activeCategory] || [];

  // // Add this before your return statement
  // console.log('currentCategory:', currentCategory);
  // console.log('selectedModalDevice:', selectedModalDevice);
  // console.log('selectedAddonModalDevice:', selectedAddonModalDevice); 
  // console.log('formData:', formData);

  // // Add this right after your imports in ConfigurationHub.tsx
  // console.log('=== FIREBASE DEBUG INFO ===');
  // console.log('1. auth object:', auth);
  // console.log('2. auth type:', typeof auth);
  // console.log('3. signInWithPhoneNumber:', typeof signInWithPhoneNumber);
  // console.log('4. RecaptchaVerifier:', typeof RecaptchaVerifier);
  // console.log('5. Import path:', '../firebaseConfig');

  return (
    <section
      id="configuration"
      className="py-20 bg-gradient-to-b from-[#6D6F7A] via-[#AFAEC3] to-[#F7F4FB]" 
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Configuration Hub</h2>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl mx-auto">
            Customize your medical AI device with our interactive 3D
            configurator. Choose from different categories and specifications
            to match your healthcare needs.
          </p>
        </div>
        {/* Category Navigation */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="flex flex-wrap justify-center gap-1 bg-secondary rounded-lg p-1 max-w-full ">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {category.name}
              </button>
            ))}

          </div>
        </div>
        {showHubNavigationPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl w-full max-w-md shadow-2xl border border-border">
              <div className="p-6">
                {/* Title - Centered */}
                <h2 className="text-2xl font-bold text-center mb-4">
                  Your custom AI Hub is ready!
                </h2>

                {/* Info Text */}
                <p className="text-muted-foreground text-center mb-6">
                  Enter your email or phone number to receive your personalized AI Health Hub configuration and get started.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {/* Primary Button - Get Pricing */}
                  <Button
                    onClick={handleGetPricing}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    Get Pricing
                  </Button>

                  {/* Secondary Button - Configure Another Hub */}
                  <Button
                    onClick={handleConfigureAnotherHub}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Configure Another Hub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left Side: 3D cube + placeholders */}
          <div className="space-y-4 lg:space-y-6 xl:sticky xl:top-20 xl:self-start">
            <Card className="p-3 sm:p-4 bg-gradient-dark text-white">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden relative min-h-[300px] sm:min-h-[400px]">
                  <MedicalDevice3D
                    selectedColor={hubSelections[activeCategory].selectedColor}
                    category={activeCategory}
                    // isAnimating={!isExploreMode}
                    // isExploreMode={isExploreMode}
                    // onPartSelect={setSelectedPart}
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      onClick={toggleExploreMode}
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-black hover:bg-white"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {isExploreMode ? "Exit Explore" : "Explore"}
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-white/90 text-black"
                    >
                      3D Interactive Model
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">{currentCategory?.name}</h3>
                  <p className="text-gray-300 mt-1">
                    {currentCategory?.description}
                  </p>
                </div>
              </div>
            </Card>
            <div className="flex items-center gap-3 mt-2 mb-1 cursor-pointer text-primary text-2xl select-none font-bold">
              +
            </div>
            {/* Add this above the placeholders */}
            <div className="flex items-center justify-between ">
              <div className="text-sm text-muted-foreground ">
                {hubSelections[activeCategory].selectedAddons.length > 0 ? `+${hubSelections[activeCategory].selectedAddons.length} items selected` : "Add devices from below"}              </div>
            </div>

            {/* Placeholders section */}
            {/* Placeholders section - Show current hub selections */}
            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
              {(() => {
                const currentHubSelection = hubSelections[activeCategory];
                const allAddons = [
                  ...(addonDevices[activeCategory] || []),
                  ...careplansData
                ];

                const selectedForPlaceholders = currentHubSelection.selectedAddons.slice(0, 5);

                return [...Array(5)].map((_, idx) => {
                  const addonId = selectedForPlaceholders[idx];
                  const addon = allAddons.find((a) => a.id === addonId);
                  const quantity = currentHubSelection.careplanQuantities[addonId] || 0;

                  return (
                    <div
                      key={idx}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden relative"
                    >
                      {addon ? (
                        <>
                          <img
                            src={addon.imageSrc}
                            alt={addon.name}
                            className="object-contain max-w-full max-h-full"
                          />
                          {quantity > 1 && (
                            <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                              {quantity}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-gray-500 text-3xl select-none">+</div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Show message if more than 5 items selected in current hub */}
            {hubSelections[activeCategory].selectedAddons.length > 5 && (
              <div className="text-xs text-muted-foreground mt-2 text-center">
                +{hubSelections[activeCategory].selectedAddons.length - 5} more items selected
              </div>
            )}


          </div>
          {/* Right Side: Scrollable container */}
          <div className="space-y-4 lg:space-y-6" ref={detailsRef}>

            {/* Product Highlights Section */}
            <Card
              className="mb-6 bg-white dark:bg-neutral-900 rounded-2xl p-4
  shadow-lg dark:shadow-[0_6px_20px_rgba(0,0,0,0.5)]
  transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Performance Highlights
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex gap-4 justify-start">
                  {/* Button 1 */}
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-1 h-auto py-4 px-5 rounded-2xl
        bg-[#e0e0e0] dark:bg-[#1e1e1e]
        shadow-[6px_6px_12px_#bebebe,_-6px_-6px_12px_#ffffff]
        dark:shadow-[6px_6px_12px_#141414,_-6px_-6px_12px_#2a2a2a]
        hover:shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]
        dark:hover:shadow-[inset_6px_6px_12px_#141414,_inset_-6px_-6px_12px_#2a2a2a]
        transition-all duration-300"
                  >
                    <span className="text-xs text-muted-foreground">Total Parameters</span>
                    <span className="text-xl font-bold text-primary">
                      {producthighlights[activeCategory].totalParams}+
                    </span>
                    <span className="text-xs">Medical Measurements</span>
                  </Button>

                  {/* Button 2 */}
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-1 h-auto py-4 px-5 rounded-2xl
        bg-[#e0e0e0] dark:bg-[#1e1e1e]
        shadow-[6px_6px_12px_#bebebe,_-6px_-6px_12px_#ffffff]
        dark:shadow-[6px_6px_12px_#141414,_-6px_-6px_12px_#2a2a2a]
        hover:shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]
        dark:hover:shadow-[inset_6px_6px_12px_#141414,_inset_-6px_-6px_12px_#2a2a2a]
        transition-all duration-300"
                  >
                    <span className="text-xs text-muted-foreground">Result Speed</span>
                    <span className="text-xl font-bold text-primary">
                      {producthighlights[activeCategory].outputDays} Day
                      {producthighlights[activeCategory].outputDays > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs">Test Output</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Explore Mode Details */}
            {isExploreMode && selectedPart && (
              <Card className="border-2 border-primary bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      {selectedPart.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPart(null)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPart.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Function</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPart.function}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Specifications</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedPart.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hub Devices - Horizontal Scroll Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Hub Devices
                  </CardTitle>
                  <CardTitle>
                    <button onClick={() => setShowAllDevices(true)} className="bg-black text-white text-sm px-2 py-1 rounded-xl" > Showall</button>
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Horizontal Scroll Container with Drag Scroll */}
                <div
                  className="p-6 pt-0 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                  ref={(el) => {
                    if (el) {
                      let isDown = false;
                      let startX;
                      let scrollLeft;
                      let isDragMode = false;
                      let lastClickTime = 0;

                      const handleMouseDown = (e) => {
                        const now = new Date().getTime();
                        if (now - lastClickTime < 300) {
                          isDragMode = true;
                          el.style.cursor = 'grabbing';
                        }
                        lastClickTime = now;

                        if (isDragMode) {
                          isDown = true;
                          startX = e.pageX - el.offsetLeft;
                          scrollLeft = el.scrollLeft;
                        }
                      };

                      const handleMouseLeave = () => {
                        isDown = false;
                        isDragMode = false;
                        el.style.cursor = 'grab';
                      };

                      const handleMouseUp = () => {
                        isDown = false;
                        isDragMode = false;
                        el.style.cursor = 'grab';
                      };

                      const handleMouseMove = (e) => {
                        if (!isDown || !isDragMode) return;
                        e.preventDefault();
                        const x = e.pageX - el.offsetLeft;
                        const walk = (x - startX) * 1.5;
                        el.scrollLeft = scrollLeft - walk;
                      };

                      el.addEventListener("mousedown", handleMouseDown);
                      el.addEventListener("mouseleave", handleMouseLeave);
                      el.addEventListener("mouseup", handleMouseUp);
                      el.addEventListener("mousemove", handleMouseMove);
                    }
                  }}
                >
                  <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

                  <div className="flex gap-6 pb-6 items-start">
                    {/* Device Cards */}
                    {currentHubDevices.slice(0, 5).map((device) => (
                      <div
                        key={device.id}
                        onClick={() => setSelectedModalDevice(device)}
                        className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer transition-all duration-300 hover:scale-[1.02"
                        style={{ minWidth: "220px" }}
                      >
                        {/* Outer Card - Neumorphism Shadow */}
                        <div className="w-full h-[270px] rounded-2xl overflow-hidden relative shadow-[8px_8px_20px_rgba(0,0,0,0.25),-6px_-6px_16px_rgba(255,255,255,0.4)] bg-white/90 border border-gray-200 transition-all duration-300 hover:shadow-[10px_10px_25px_rgba(0,0,0,0.3),-6px_-6px_18px_rgba(255,255,255,0.6)]">

                          {/* Image Section (Normal Look) */}
                          <div className="w-full h-[180px] bg-gray-50 flex items-center justify-center overflow-hidden">
                            <img
                              src={device.imageSrc}
                              alt={device.name}
                              className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                            />
                          </div>

                          {/* Details Section (Glassmorphism) */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-lg border-t border-white/20 rounded-t-xl">
                            <h3 className="text-sm font-semibold text-foreground truncate text-center mb-1">
                              {device.name}
                            </h3>

                            <p className="text-xs text-muted-foreground line-clamp-3 text-center">
                              {device.description?.length > 80
                                ? device.description.slice(0, 80) + "..."
                                : device.description}
                            </p>

                            {(device.description?.length > 80 || device.specs?.length > 0) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedModalDevice(device);
                                }}
                                className="text-[11px] text-primary mt-2 hover:underline block mx-auto"
                              >
                                See more
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* + See More Button */}
                    {currentHubDevices.length > 5 && (
                      <div
                        onClick={() => setShowAllDevices(true)}
                        className="flex-shrink-0 w-[220px] h-[250px] cursor-pointer transition-all duration-300 hover:scale-[1.05]"
                        style={{ minWidth: "220px" }}
                      >
                        <div
                          className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 shadow-[8px_8px_20px_rgba(0,0,0,0.25),-6px_-6px_16px_rgba(255,255,255,0.4)] bg-white/80 backdrop-blur-md hover:shadow-[10px_10px_25px_rgba(0,0,0,0.3),-6px_-6px_18px_rgba(255,255,255,0.6)]"
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-primary-foreground">+</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">See More</p>
                          <p className="text-xs text-muted-foreground">
                            {currentHubDevices.length - 5} more devices
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* All Devices Modal */}
                {showAllDevices && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl w-full max-w-6xl max-h-[85vh] overflow-hidden shadow-2xl border border-border">
                      {/* Modal Header */}
                      <div className="bg-gradient-to-r from-secondary/50 to-secondary/30 p-6 border-b border-border flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-foreground">All Hub Devices</h2>
                        <button
                          onClick={() => setShowAllDevices(false)}
                          className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                        >
                          <X className="h-6 w-6 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>

                      {/* Modal Content - Scrollable but hidden scrollbar */}
                      <div
                        className="p-6 max-h-[calc(85vh-88px)] overflow-y-auto"
                        style={{
                          scrollbarWidth: "none", // Firefox
                          msOverflowStyle: "none", // IE/Edge
                        }}
                      >
                        <style jsx>{`
          /* Chrome, Safari, Edge */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                          {currentHubDevices.map((device) => (
                            <div
                              key={device.id}
                              onClick={() => {
                                setSelectedModalDevice(device);
                                setShowAllDevices(false);
                              }}
                              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              <div className="relative rounded-2xl overflow-hidden shadow-md border border-border h-[250px]">
                                {/* Image */}
                                <div className="w-full h-[160px] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                                  <img
                                    src={device.imageSrc}
                                    alt={device.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                {/* Details */}
                                <div className="p-3 bg-white/10 backdrop-blur-md border-t border-white/20 rounded-b-2xl">
                                  <h3 className="text-sm font-bold text-foreground truncate text-center mb-1">
                                    {device.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground line-clamp-3 text-center">
                                    {device.description?.length > 80
                                      ? device.description.slice(0, 80) + "..."
                                      : device.description}
                                  </p>
                                  {(device.description?.length > 80 || device.specs?.length > 0) && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedModalDevice(device);
                                        setShowAllDevices(false);
                                      }}
                                      className="text-[11px] text-primary mt-2 hover:underline block mx-auto"
                                    >
                                      See more
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Individual Device Details Modal */}
                {selectedModalDevice && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-border">
                      <div className="flex justify-between items-center p-6 border-b border-border">
                        <h2 className="text-2xl font-bold text-foreground">{selectedModalDevice.name}</h2>
                        <button
                          onClick={() => setSelectedModalDevice(null)}
                          className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                        >
                          <X className="h-6 w-6 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>

                      {/* FIXED SCROLL CONTAINER - Hide scrollbar but keep scroll */}
                      <div className="overflow-y-auto max-h-[calc(85vh-120px)] scrollbar-hide">
                        {/* Full Image - Remove fixed height to allow natural flow */}
                        <div className="w-full bg-gradient-to-br from-gray-100 to-gray-50">
                          <img
                            src={selectedModalDevice.imageSrc}
                            alt={selectedModalDevice.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2 text-foreground">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {selectedModalDevice.description}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg mb-3 text-foreground">Specifications</h3>
                            <div className="space-y-2">
                              {selectedModalDevice.specs.map((spec, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm">
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                  <span className="text-muted-foreground">{spec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Careplans Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Careplans-Kit
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {careplansData.map((careplan) => {
                  const quantity = hubSelections[activeCategory].careplanQuantities[careplan.id] || 0;
                  const isExpanded = expandedAddons[careplan.id] || false;

                  return (
                    <div key={careplan.id} className="py-3">
                      {/* Header Row */}
                      <div className="flex items-center justify-between">
                        {/* Left side - Image and Name */}
                        <div
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                          onClick={() => toggleAddonExpansion(careplan.id)}
                        >
                          <div
                            className="w-12 h-12 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAddonModalDevice(careplan);
                            }}
                          >
                            <img
                              src={careplan.imageSrc}
                              alt={careplan.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{careplan.name}</span>
                        </div>

                        {/* Right side - Quantity controls */}
                        <div className="flex items-center gap-2">
                          {/* Minus button - only show when quantity > 0 */}
                          {quantity > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCareplanQuantity(careplan.id, -1);
                              }}
                              className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
                            >
                              <span className="text-lg font-bold text-gray-600">-</span>
                            </button>
                          )}

                          {/* Quantity display */}
                          <div className={`min-w-7 h-7 px-2 rounded-full flex items-center justify-center transition-all duration-200 ${quantity > 0
                            ? 'bg-primary text-primary-foreground border border-primary'
                            : 'bg-gray-100 border border-gray-300'
                            }`}>
                            <span className="text-sm font-medium">{quantity}</span>
                          </div>

                          {/* Plus button - always show */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateCareplanQuantity(careplan.id, 1);
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
                          >
                            <span className="text-lg font-bold text-gray-600">+</span>
                          </button>
                        </div>
                      </div>

                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="mt-3 pl-16 text-sm text-muted-foreground space-y-2">
                          <p>
                            <strong className="text-foreground">Function:</strong> {careplan.function}
                          </p>
                          <p>
                            <strong className="text-foreground">Description:</strong> {careplan.description}
                          </p>

                          {/* Specifications */}
                          <div>
                            <strong className="text-foreground">Key Specs:</strong>
                            <ul className="mt-1 space-y-1">
                              {careplan.specifications.map((spec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Devices Included */}
                          {careplan.devicesinclude && (
                            <div>
                              <strong className="text-foreground">Devices Included:</strong>
                              <ul className="mt-1 space-y-1">
                                {careplan.devicesinclude.slice(0, 4).map((deviceItem, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                                    {deviceItem}
                                  </li>
                                ))}
                              </ul>
                              {careplan.devicesinclude.length > 4 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedAddonModalDevice(careplan);
                                  }}
                                  className="text-[11px] text-primary mt-1 hover:underline"
                                >
                                  + {careplan.devicesinclude.length - 4} more devices
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            {/* Addon devices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Addon Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {(() => {
                  const currentAddons = addonDevices[activeCategory] || [];

                  if (currentAddons.length === 0) {
                    return (
                      <div className="py-6 text-center text-muted-foreground">
                        <p>No addon items available for this hub configuration</p>
                      </div>
                    );
                  }
                  return currentAddons.map((device) => {
                    const isChecked = hubSelections[activeCategory].selectedAddons.includes(device.id);
                    const isExpanded = expandedAddons[device.id] || false; // Get from state

                    return (
                      <div key={device.id} className="py-3">
                        {/* Header Row */}
                        <div className="flex items-center justify-between">
                          {/* Left side - Image and Name (clickable for accordion) */}
                          <div
                            className="flex items-center gap-3 flex-1 cursor-pointer"
                            onClick={() => toggleAddonExpansion(device.id)} // Use the function
                          >
                            <div
                              className="w-12 h-12 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAddonModalDevice(device);
                              }}
                            >
                              <img
                                src={device.imageSrc}
                                alt={device.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{device.name}</span>
                          </div>
                          {/* Right side - Add/Remove button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAddonSelection(device.id);
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
                          >
                            {isChecked ? (
                              <img src={tickicon} alt="Added" className="w-5 h-5" />
                            ) : (
                              <img src={addicon} alt="Add" className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {/* Accordion Content - rest remains the same */}
                        {isExpanded && (
                          <div className="mt-3 pl-16 text-sm text-muted-foreground space-y-2">
                            {/* ... your accordion content ... */}
                            {isExpanded && (
                              <div className="mt-3 pl-16 text-sm text-muted-foreground space-y-2">
                                <p>
                                  <strong className="text-foreground">Function:</strong> {device.function}
                                </p>
                                <p>
                                  <strong className="text-foreground">Description:</strong> {device.description}
                                </p>
                                <div>
                                  <strong className="text-foreground">Key Specs:</strong>
                                  <ul className="mt-1 space-y-1">
                                    {device.specifications.map((spec, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                                        {spec}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </CardContent>
            </Card>
            {/* Addon Device Modal */}
            {selectedAddonModalDevice && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-background rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl border border-border">
                  <div className="flex justify-between items-center p-6 border-b border-border">
                    <h2 className="text-2xl font-bold text-foreground">{selectedAddonModalDevice.name}</h2>
                    <button
                      onClick={() => setSelectedAddonModalDevice(null)}
                      className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                    >
                      <X className="h-6 w-6 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row overflow-hidden">
                    {/* Image Section */}
                    <div className="md:w-1/2 h-80 md:h-auto bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                      <img
                        src={selectedAddonModalDevice.imageSrc}
                        alt={selectedAddonModalDevice.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-6 overflow-y-auto max-h-80">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-foreground">Function</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectedAddonModalDevice.function}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-foreground">Description</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectedAddonModalDevice.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-3 text-foreground">Specifications</h3>
                          <div className="space-y-2">
                            {selectedAddonModalDevice.specifications.map((spec, index) => (
                              <div key={index} className="flex items-center gap-3 text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                <span className="text-muted-foreground">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Devices Included (for careplans) */}
                        {selectedAddonModalDevice.devicesinclude && (
                          <div>
                            <h3 className="font-semibold text-lg mb-3 text-foreground">Devices Included</h3>
                            <div className="space-y-2">
                              {selectedAddonModalDevice.devicesinclude.map((deviceItem, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm">
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                  <span className="text-muted-foreground">{deviceItem}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Add/Remove Button */}
                        <div className="pt-4 border-t border-border">
                          <button
                            onClick={() => {
                              toggleAddonSelection(selectedAddonModalDevice.id);
                              setSelectedAddonModalDevice(null);
                            }}
                            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${hubSelections[activeCategory].selectedAddons.includes(selectedAddonModalDevice.id)
                              ? "bg-black text-white hover:bg-gray-800"
                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                              }`}
                          >
                            {hubSelections[activeCategory].selectedAddons.includes(selectedAddonModalDevice.id) ? (
                              <>
                                <Check className="w-4 h-4" />
                                Remove from Cart
                              </>
                            ) : (
                              <>
                                <span className="text-lg font-bold">+</span>
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleColorSelect(color.value)} // ← CHANGED
                      className={`p-3 rounded-lg border-2 transition-all duration-300 ${hubSelections[activeCategory].selectedColor === color.value // ← CHANGED
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full border border-border"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="font-medium">{color.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Place Order Button */}
            <Button
              onClick={() => setIsOrderModalOpen(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              size="lg"
            >
              Reach for super deal
            </Button>
            {/* Order Modal - Keep this separate */}
            <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
              <DialogContent className="max-w-l h-[85vh] flex flex-col"> {/* Fixed height and flex column */}
                <DialogHeader className="flex-shrink-0"> {/* Prevent header from shrinking */}
                  <DialogTitle>Complete Your Order</DialogTitle>
                </DialogHeader>

                {/* Scrollable content area - hides scrollbar but remains scrollable */}
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-5 pr-3 pl-2"> {/* Added padding for scrollbar space */}
                  {/* Name, Email, Phone fields - unchanged */}
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      className="mt-2"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={otpModalOpen}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={otpModalOpen}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <div className="flex mt-2">
                      {/* Country Code Dropdown - Styled */}
                      <select
                        value={formData.countryCode || "+91"}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        disabled={otpModalOpen}
                        className="w-20 px-3 py-2 border border-r-0 rounded-l-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="+1">+1 US</option>
                        <option value="+44">+44 UK</option>
                        <option value="+91">+91 IN</option>
                      </select>

                      {/* Phone Number Input */}
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={formData.phone}
                        onChange={(e) => {
                          // Remove any non-digit characters and limit to 10 digits
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setFormData({ ...formData, phone: digitsOnly });
                        }}
                        disabled={otpModalOpen}
                        className="flex-1 rounded-l-none border-l-0"
                      />
                    </div>
                  </div>

                  {/* Enhanced Order Summary - This section will be scrollable */}
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold mb-3">Order Summary</h4>

                    <div className="space-y-4 text-sm">
                      {/* Hub Configurations Summary - Show ALL hubs with selections */}
                      {Object.entries(hubSelections).map(([hubId, selections]) => {
                        const hasAddons = selections.selectedAddons.length > 0;
                        const hasCareplans = Object.values(selections.careplanQuantities).some(qty => qty > 0);

                        // Only show hubs that have selections
                        if (!hasAddons && !hasCareplans) return null;

                        const hubColor = colors.find(c => c.value === selections.selectedColor);

                        return (
                          <div key={hubId} className="border rounded-lg p-3 bg-background">
                            <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                              {hubId} Configuration
                              {hubColor && (
                                <div className="flex items-center gap-1 text-xs font-normal">
                                  <div
                                    className="w-3 h-3 rounded-full border"
                                    style={{ backgroundColor: hubColor.value }}
                                  />
                                  {hubColor.name}
                                </div>
                              )}
                            </div>

                            {/* Addon Devices */}
                            {hasAddons && (
                              <div className="ml-2 mb-2">
                                <div className="text-xs font-medium text-muted-foreground mb-1">Addon Devices:</div>
                                <div className="space-y-1">
                                  {(() => {
                                    const allAddons = [
                                      ...(addonDevices[hubId] || []),
                                      ...careplansData
                                    ];

                                    return selections.selectedAddons
                                      .filter(addonId => !careplansData.find(cp => cp.id === addonId))
                                      .map(addonId => {
                                        const addon = allAddons.find(a => a.id === addonId);
                                        return addon ? (
                                          <div key={addonId} className="flex items-center gap-2 text-xs">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                            <span>{addon.name}</span>
                                          </div>
                                        ) : null;
                                      });
                                  })()}
                                </div>
                              </div>
                            )}

                            {/* Careplans */}
                            {hasCareplans && (
                              <div className="ml-2">
                                <div className="text-xs font-medium text-muted-foreground mb-1">Careplan Kits:</div>
                                <div className="space-y-1">
                                  {Object.entries(selections.careplanQuantities)
                                    .filter(([_, qty]) => qty > 0)
                                    .map(([careplanId, quantity]) => {
                                      const careplan = careplansData.find(cp => cp.id === careplanId);
                                      return careplan ? (
                                        <div key={careplanId} className="flex items-center gap-2 text-xs">
                                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                                          <span>{careplan.name} × {quantity}</span>
                                        </div>
                                      ) : null;
                                    })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Global Selected Devices (if any) */}
                      {selectedDevices.length > 0 && (
                        <div className="border rounded-lg p-3 bg-background">
                          <div className="font-semibold text-foreground mb-2">Additional Devices</div>
                          <div className="text-xs text-muted-foreground">
                            {selectedDevices.length} device(s) selected
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button - Fixed at bottom */}
                <div className="flex-shrink-0 pt-4 border-t"> {/* Prevent button from scrolling */}
                  <Button
                    className="w-full"
                    onClick={handleOrderSubmit}
                    disabled={otpLoading || otpModalOpen || orderSubmissionStatus === 'loading'}
                  >
                    {otpLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Initializing OTP...
                      </div>
                    ) : (
                      'Send OTP & Place Order'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {/* Bot Verification Modal */}
            {/* Bot Verification Modal - SIMPLIFIED FIX */}
            <Dialog open={isRecaptchaModalOpen} onOpenChange={(open) => {
              if (!open) {
                if (window.recaptchaVerifier) {
                  window.recaptchaVerifier.clear();
                  window.recaptchaVerifier = null;
                }
                setIsRecaptchaModalOpen(false);
                setRecaptchaSolved(false);
                setOtpError('');
                setOtpLoading(false);
                setIsOrderModalOpen(true);
              }
            }}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Verify You're Human</DialogTitle>
                  <DialogDescription>
                    Complete reCAPTCHA to receive OTP on your phone
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* reCAPTCHA Container - MINIMAL FIX */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-sm text-muted-foreground text-center">
                      Click the checkbox to verify you're not a robot
                    </div>

                    {/* SIMPLIFIED - Only add what's necessary */}
                    <div
                      id="recaptcha-container"
                      className="flex justify-center w-full min-h-[78px] bg-gray-50"
                    />

                    {otpError && (
                      <div className="text-sm text-destructive text-center p-2 bg-red-50 rounded-lg">
                        {otpError}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Status: {recaptchaSolved ? '✅ Verified' : '❌ Click the checkbox above'}
                    </div>

                    <div className="flex gap-3 w-full">
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (window.recaptchaVerifier) {
                            window.recaptchaVerifier.clear();
                            window.recaptchaVerifier = null;
                          }
                          setIsRecaptchaModalOpen(false);
                          setRecaptchaSolved(false);
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRecaptchaVerified}
                        disabled={!recaptchaSolved || otpLoading}
                        className="flex-1"
                      >
                        {otpLoading ? 'Sending...' : 'Send OTP'}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            {/* OTP Verification Modal - Clean, no reCAPTCHA */}
            <Dialog open={otpModalOpen} onOpenChange={(open) => {
              if (!open) {
                handleCancelOtp();
              }
            }}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Verify Your Phone</DialogTitle>
                  <DialogDescription>
                    Enter the 6-digit OTP sent to {formData.phone}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* OTP Inputs */}
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onPaste={handleOtpPaste}
                        className="w-12 h-12 text-center text-lg font-semibold"
                        placeholder="•"
                        disabled={otpLoading}
                      />
                    ))}
                  </div>

                  {/* Resend OTP Section */}
                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Resend OTP in {resendTimer}s
                      </p>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        disabled={otpLoading || resendAttempts >= 3}
                        className="text-sm text-primary hover:underline disabled:text-muted-foreground"
                      >
                        {otpLoading ? 'Sending...' : 'Resend OTP'}
                        {resendAttempts >= 3 && ' (Max attempts reached)'}
                      </button>
                    )}
                  </div>

                  {/* Error Message */}
                  {otpError && (
                    <div className="text-sm text-destructive text-center">
                      {otpError}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleCancelOtp}
                      disabled={otpLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleVerifyOtp}
                      disabled={otpLoading || otp.some(digit => digit === '')}
                      className="flex-1"
                    >
                      {otpLoading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>


            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
              <DialogContent className="max-w-md text-center">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="h-6 w-6" />
                    Order Placed Successfully!
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>

                  <p className="text-muted-foreground">
                    Thank you for your order! We have sent a confirmation to your email.
                  </p>

                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold">Order Summary</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentCategory?.name} • {colors.find(c => c.value === selectedColor)?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Total items: {hubSelections[activeCategory].selectedAddons.length + selectedDevices.length}
                    </p>
                  </div>

                  <Button
                    onClick={() => setIsSuccessModalOpen(false)}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>

      </div>
    </section>
  );
}



export default ConfigurationHub;     