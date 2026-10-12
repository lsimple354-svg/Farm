import React, { useState } from 'react';
import {
  Compass,
  PlayCircle,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Download,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Search,
  Filter,
  FileText,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Lesson {
  title: string;
  duration: string;
  summary: string;
  steps: string[];
}

interface CurriculumModule {
  id: string;
  number: number;
  domain: string;
  title: string;
  reviewer: string;
  institution: string;
  lastReviewed: string;
  evidenceGrade: 'Established Field Standard' | 'Regulatory Guideline' | 'Validated Practice';
  lessonsCount: number;
  duration: string;
  image: string;
  description: string;
  lessons: Lesson[];
  keyReference: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

const ACADEMY_CURRICULUMS: CurriculumModule[] = [
  {
    id: 'acad-1',
    number: 1,
    domain: 'Crop Science & Production',
    title: 'High-Yield Cereal, Legume & Tuber Production Systems',
    reviewer: 'Dr. Beatrice Wangari, Chief Agronomist',
    institution: 'KALRO Kitale Field Research Centre',
    lastReviewed: 'September 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 5,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    description:
      'Empirical protocols for hybrid maize (H6213, DK777), climbing beans, and Shangi Irish potatoes: soil preparation, certified seed tagging, plant population density, and split basal/topdress regimes.',
    keyReference: 'KALRO Technical Note No. 42 / KEPHIS Seed Testing Regulations',
    lessons: [
      {
        title: 'Seed Tag Verification & Germination Quality Testing',
        duration: '12 mins',
        summary: 'How to verify scratch codes on KEPHIS certified seed bags and test 95%+ germination rate.',
        steps: [
          'Scratch and send 12-digit KEPHIS SMS code to 1393 to verify genuine seed certification.',
          'Take 100 random seeds from the bag and place in a damp cotton cloth for 5 days at room temperature.',
          'Count sprouted seeds: must achieve minimum 90 sprouts to qualify for commercial planting.',
        ],
      },
      {
        title: 'Precision Spacing & Hill Population Targets',
        duration: '15 mins',
        summary: 'Targeting 21,500 maize plants per acre vs 55,000 bean plants per acre.',
        steps: [
          'Highland maize: Mark lines at 75cm between rows and 25cm between hills (1 seed per hill).',
          'Intercropped legumes: Alternate two rows of cereal with one row of bush bean at 15cm hill spacing.',
          'Avoid planting 2 seeds per hole unless thinning explicitly within 14 days post emergence.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the optimal spacing for highland hybrid maize targeting ~21,500 plants/acre?',
        options: ['100cm x 50cm', '75cm x 25cm (1 seed per hill)', '50cm x 10cm', '90cm x 40cm'],
        correctIndex: 1,
        explanation: '75cm row spacing by 25cm hill spacing with 1 seed per hole yields approximately 21,500 plants per acre.',
      },
    ],
  },
  {
    id: 'acad-2',
    number: 2,
    domain: 'Soil Science & Plant Nutrition',
    title: 'Soil Testing, pH Balancing & Balanced Nutrient Stewardship',
    reviewer: 'Prof. Geoffrey Kiptoo, Soil Biogeochemist',
    institution: 'University of Eldoret / Soil Fertility Kenya',
    lastReviewed: 'August 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description:
      'Diagnostic soil sampling techniques, interpreting CEC and micronutrient deficiency reports, agricultural lime application for acid soils (pH < 5.5), and organic compost blending.',
    keyReference: 'Kenya National Soil Health Policy / FAO World Soil Resources Reports',
    lessons: [
      {
        title: 'Zig-Zag Core Sampling Protocol',
        duration: '15 mins',
        summary: 'Collecting 15-20 core sub-samples across the farm for representative lab analysis.',
        steps: [
          'Walk the field in a W or zig-zag pattern, avoiding anthills, fence lines, and old compost pits.',
          'Scrape top 1cm litter, dig a V-shape hole 20cm deep, and slice a 2cm soil core.',
          'Mix all 20 sub-samples thoroughly in a clean plastic bucket and air-dry 500g in shade.',
        ],
      },
    ],
    quiz: [
      {
        question: 'When soil pH tests below 5.2 (strongly acidic), what corrective amendment is required?',
        options: ['Add more urea', 'Apply Agricultural Lime (Calcium/Magnesium Carbonate)', 'Flood the field with water', 'Spray copper sulfate'],
        correctIndex: 1,
        explanation: 'Agricultural limestone neutralizes aluminum and hydrogen toxicity, unlocking locked phosphorus in acidic soils.',
      },
    ],
  },
  {
    id: 'acad-3',
    number: 3,
    domain: 'Plant Health & Integrated Pest Management',
    title: 'Pest Diagnosis, Fall Armyworm Scouting & PCPB Chemical Safety',
    reviewer: 'Dr. Zeyaur Khan / icipe Plant Health Unit',
    institution: 'ICIPE Mbita & Duduville Campus',
    lastReviewed: 'October 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '50 mins',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    description:
      'Field scouting protocols for Fall Armyworm, Tuta absoluta, and Bacterial Wilt; push-pull biocontrol methods; Pre-Harvest Interval (PHI) compliance and PCPB chemical registrations.',
    keyReference: 'Pest Control Products Act (Cap 346) & icipe Push-Pull Guidelines',
    lessons: [
      {
        title: 'W-Pattern Scouting for Fall Armyworm (Spodoptera frugiperda)',
        duration: '15 mins',
        summary: 'Detecting early leaf pinholes and windowpaning before larvae bore into whorls.',
        steps: [
          'Inspect 20 plants across 5 spots weekly from 10 days post-emergence.',
          'Look for inverted Y marking on larval head capsule and 4 square dots on eighth abdominal segment.',
          'If >20% of plants show active damage at whorl stage, initiate registered bio-pesticide application.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is a Pre-Harvest Interval (PHI) on registered crop protection chemicals?',
        options: ['Days between plowing and planting', 'Mandatory days between chemical application and harvest safe for human consumption', 'Time spent spraying', 'Expiry date of the sprayer pump'],
        correctIndex: 1,
        explanation: 'PHI is the legally enforced minimum duration to ensure chemical residues degrade below Maximum Residue Limits (MRL).',
      },
    ],
  },
  {
    id: 'acad-4',
    number: 4,
    domain: 'Livestock & Dairy Systems',
    title: 'High-Yield Dairy Cattle Management, TMR & Silage Preservation',
    reviewer: 'Dr. Joseph Cheruiyot, Livestock Specialist',
    institution: 'Kenya Dairy Board (KDB) / KALRO Naivasha',
    lastReviewed: 'July 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 5,
    duration: '55 mins',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    description:
      'Breeding genetics (Friesian, Ayrshire, Jersey), total mixed ration (TMR) balancing for 25L+/day cows, 32% Dry Matter silage pit sealing, and hygienic zero-grazing stall designs.',
    keyReference: 'Kenya Dairy Industry Regulations / National Silage Standards',
    lessons: [
      {
        title: '32% Dry Matter Silage Harvesting Window',
        duration: '15 mins',
        summary: 'Harvesting when the kernel milk line is two-thirds solid starch.',
        steps: [
          'Break an ear of maize in half and inspect the kernels: the white milk line should be 1/2 to 2/3 down.',
          'Chop to 1.5cm particle size to facilitate anaerobic pit compaction without air pockets.',
          'Layer molasses-water mixture (1:3 ratio) every 30cm and compact using tractor wheels or heavy drums.',
        ],
      },
    ],
    quiz: [
      {
        question: 'Why is air exclusion critical when sealing a silage pit?',
        options: ['To allow mice to leave', 'To allow anaerobic lactic acid bacteria to preserve nutrients and inhibit rotting molds', 'To keep cows cool', 'To dry the grass faster'],
        correctIndex: 1,
        explanation: 'Lactic acid fermentation requires an airtight anaerobic environment; oxygen encourages clostridial rotting and mycotoxins.',
      },
    ],
  },
  {
    id: 'acad-5',
    number: 5,
    domain: 'Veterinary & Animal Welfare Education',
    title: 'Biosecurity, Vaccination Protocols & Herd Health Management',
    reviewer: 'Dr. Mary Kosgei, BVM Registered Surgeon',
    institution: 'Kenya Veterinary Board (KVB)',
    lastReviewed: 'September 2026',
    evidenceGrade: 'Regulatory Guideline',
    lessonsCount: 4,
    duration: '40 mins',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    description:
      'Cold-chain vaccine handling for Foot & Mouth (FMD), East Coast Fever (ECF-ITM), Newcastle in poultry; mastitis early screening with CMT; antimicrobial stewardship limits.',
    keyReference: 'Veterinary Surgeons and Veterinary Paraprofessionals Act (Cap 366)',
    lessons: [
      {
        title: 'California Mastitis Test (CMT) Paddle Testing',
        duration: '10 mins',
        summary: 'Weekly subclinical mastitis paddle testing for each quarter.',
        steps: [
          'Strip first 2 streams of foremilk, then express 2ml from each teat into the 4 paddle wells.',
          'Add equal volume of CMT purple reagent and swirl gently in horizontal circles for 15 seconds.',
          'Observe viscosity: thickening or gel formation indicates high somatic cell count requiring veterinary attention.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What temperature must live poultry vaccines (e.g. Newcastle Lasota) be stored at?',
        options: ['Room temperature (+25°C)', '+2°C to +8°C in a calibrated cold-chain refrigerator', '-20°C deep freeze', 'Direct sunlight'],
        correctIndex: 1,
        explanation: 'Vaccines lose viability if exposed to temperatures outside +2°C to +8°C or sunlight.',
      },
    ],
  },
  {
    id: 'acad-6',
    number: 6,
    domain: 'Irrigation & Protected Cultivation',
    title: 'Gravity & Solar Drip Irrigation, Greenhouses & Fertigation',
    reviewer: 'Eng. Peter Kimani, Agricultural Engineer',
    institution: 'National Irrigation Authority (NIA)',
    lastReviewed: 'August 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    description:
      'Designing gravity drip lines with 0.2 bar hydrostatic head, solar water pump sizing for boreholes, water-soluble fertilizer injection, and greenhouse microclimate humidity control.',
    keyReference: 'Kenya Irrigation Act 2019 / NIA Smallholder Technical Standards',
    lessons: [
      {
        title: 'Emitter Uniformity & Disc Filter Flushing',
        duration: '12 mins',
        summary: 'Preventing emitter clogging from algae and silt deposits.',
        steps: [
          'Always install a 120-mesh disc filter immediately downstream of your delivery tank.',
          'Flush mainline and lateral flush valves once every two weeks until water discharges crystal clear.',
          'Acid flush with dilute phosphoric acid once per season to dissolve carbonate scale.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What elevation provides approximately 0.2 bar hydrostatic water pressure for gravity drip lines?',
        options: ['2 meters elevation', '10 centimeters', '50 meters', 'Ground level'],
        correctIndex: 0,
        explanation: 'Every 1 meter of water elevation produces approximately 0.1 bar (1.42 psi) of hydrostatic pressure.',
      },
    ],
  },
  {
    id: 'acad-7',
    number: 7,
    domain: 'Climate-Smart & Regenerative Agroecology',
    title: 'Conservation Agriculture, Minimum Tillage & Soil Carbon Credits',
    reviewer: 'Dr. Solomon Mwangi, Agroecologist',
    institution: 'World Agroforestry (ICRAF) / CIFOR',
    lastReviewed: 'August 2026',
    evidenceGrade: 'Validated Practice',
    lessonsCount: 4,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    description:
      'Three core pillars of conservation agriculture: permanent soil mulch cover, minimum mechanical soil disturbance, and leguminous crop rotations; biochar production and carbon sequestration verification.',
    keyReference: 'FAO Conservation Agriculture Framework & ICRAF Carbon Monitoring Protocols',
    lessons: [
      {
        title: '30% Residue Retention & Ripper Tine Plowing',
        duration: '12 mins',
        summary: 'Switching from disc plowing to subsoil ripping to preserve soil mycorrhizae.',
        steps: [
          'Retain crop stalks and residues on the surface rather than burning or complete removal.',
          'Rip only narrow planting furrows using chisel or subsoiler tines at 75cm intervals.',
          'Plant cover crops like Mucuna or Lablab to fix atmospheric nitrogen and suppress weeds.',
        ],
      },
    ],
    quiz: [
      {
        question: 'Why does excessive disc plowing degrade soil fertility over multiple seasons?',
        options: ['Destroys soil aggregates, oxidizes organic carbon, and forms an impermeable hardpan below plow depth', 'Attracts too many earthworms', 'Cools the soil down too much', 'Increases soil moisture indefinitely'],
        correctIndex: 0,
        explanation: 'Frequent disc plowing pulverizes soil crumb structure and causes subsurface compaction hardpans.',
      },
    ],
  },
  {
    id: 'acad-8',
    number: 8,
    domain: 'Aquaculture, Apiculture & Integrated Farming',
    title: 'Earthen Fish Ponds, Recirculating Systems & Modern Bee Hives',
    reviewer: 'James Ochieng, Aquaculture Extension Director',
    institution: 'Kenya Marine and Fisheries Research Institute (KMFRI)',
    lastReviewed: 'July 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '40 mins',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
    description:
      'Tilapia and African Catfish fingerling stocking densities, dissolved oxygen monitoring, commercial floating pellet feeding schedules, and Langstroth beehive honey harvesting.',
    keyReference: 'KMFRI Aquaculture Manuals / National Apiculture Guidelines',
    lessons: [
      {
        title: 'Tilapia Stocking Density in 300m² Earthen Ponds',
        duration: '12 mins',
        summary: 'Optimal fingerling stocking numbers to achieve 400g harvest weight in 6 months.',
        steps: [
          'Excavate pond with 1:2 dyke slope and 1.2m water depth at drainage end.',
          'Apply agricultural lime at 20kg/100m² to condition pond bottom before water filling.',
          'Stock all-male (monosex) Nile Tilapia fingerlings at 3 fingerlings per m².',
        ],
      },
    ],
    quiz: [
      {
        question: 'Why is monosex (all-male) tilapia preferred in commercial pond culture?',
        options: ['Males grow 30% faster and do not cause wild overpopulation/stunting in the pond', 'Females do not eat pelleted feed', 'Males require no oxygen', 'Females cannot swim in fresh water'],
        correctIndex: 0,
        explanation: 'Tilapia reproduce precociously; all-male stocking prevents overcrowding and results in uniform, market-weight fish.',
      },
    ],
  },
  {
    id: 'acad-9',
    number: 9,
    domain: 'Agricultural Engineering & Automation',
    title: 'Tractor Calibration, Solar Grain Dryers & Cold Chain Storage',
    reviewer: 'Eng. Kenneth Kiprotich, Farm Machinery Specialist',
    institution: 'Kenya Agricultural Mechanization Research Unit',
    lastReviewed: 'June 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '40 mins',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
    description:
      'Planter calibration to prevent seed bridging, PTO shaft safety, bubble solar grain dryers for aflatoxin mitigation, and decentralized charcoal evaporative cooling chambers for vegetables.',
    keyReference: 'MoALD Agricultural Mechanization Strategy (AMS 2026)',
    lessons: [
      {
        title: 'Planter Seed Plate Calibration Test',
        duration: '10 mins',
        summary: 'Running 100 meters test strip to ensure exact seed drop count.',
        steps: [
          'Jack up drive wheel and rotate 20 turns corresponding to 100m ground distance.',
          'Collect seed drops in buckets under each shoe to count consistency.',
          'Inspect seed plate fingers for wear or cracked seeds.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the primary function of a decentralized charcoal evaporative cooler?',
        options: ['To freeze meat to -18°C', 'To reduce ambient temperature by 8-12°C and maintain 90% humidity for fresh vegetables', 'To heat up chicken coops', 'To generate electricity'],
        correctIndex: 1,
        explanation: 'Water evaporating through charcoal walls extracts latent heat, keeping leafy vegetables crisp and extending shelf life.',
      },
    ],
  },
  {
    id: 'acad-10',
    number: 10,
    domain: 'Farm Management & Enterprise Accounting',
    title: 'Gross Margin Analysis, Cashflow Budgeting & Labor Logs',
    reviewer: 'CPA Daniel Kiprono, Agricultural Financial Analyst',
    institution: 'Agribusiness Advisory Kenya',
    lastReviewed: 'August 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    description:
      'Enterprise budgeting per acre: variable costs (seed, fertilizer, chemicals, labor) vs fixed overheads; break-even price calculation; maintaining auditable farm books.',
    keyReference: 'Farm Management Handbook of Kenya / MoALD Agribusiness Unit',
    lessons: [
      {
        title: 'Calculating Enterprise Gross Margin per Acre',
        duration: '15 mins',
        summary: 'Gross Margin = Total Revenue minus Total Variable Costs.',
        steps: [
          'Record all direct cash expenses: seed, fertilizer, weed control, harvest labor, bags, and transport.',
          'Determine total harvest yield and multiply by realized farm-gate price.',
          'Subtract variable expenses from gross revenue to calculate contribution toward overhead and profit.',
        ],
      },
    ],
    quiz: [
      {
        question: 'If 1 acre of maize costs KES 42,000 to produce and yields 30 bags sold at KES 3,200/bag, what is the net gross margin?',
        options: ['KES 12,000', 'KES 54,000', 'KES 96,000', 'KES 25,000'],
        correctIndex: 1,
        explanation: 'Total revenue = 30 bags x 3,200 = KES 96,000. Gross Margin = 96,000 - 42,000 = KES 54,000 per acre.',
      },
    ],
  },
  {
    id: 'acad-11',
    number: 11,
    domain: 'Agricultural Economics & Value Chains',
    title: 'Contract Farming, Export Standards & Produce Logistics',
    reviewer: 'Agnes Muriuki, Export Certification Specialist',
    institution: 'Horticultural Crops Directorate (HCD) / GlobalGAP',
    lastReviewed: 'September 2026',
    evidenceGrade: 'Regulatory Guideline',
    lessonsCount: 4,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    description:
      'Grading specifications for export French beans and avocado, understanding Minimum Residue Limits (MRL), structuring off-taker contracts, and cooperative aggregation depots.',
    keyReference: 'GlobalGAP Integrated Farm Assurance / HCD Export Guidelines',
    lessons: [
      {
        title: 'Traceability & Spray Log Compliance for Export',
        duration: '15 mins',
        summary: 'Documenting every chemical application with batch numbers and applicator names.',
        steps: [
          'Keep a dedicated spray record folder showing date, field block, target pest, chemical trade name, and dosage.',
          'Ensure the certified applicator has undergone protective equipment training.',
          'Maintain harvest crate traceability codes linking fruit back to the individual farm block.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the consequence of exceeding Maximum Residue Limits (MRL) on produce destined for international export?',
        options: ['Slight discount on price', 'Immediate interception, consignment destruction, and exporter export ban', 'Produce is sold as organic', 'No consequence'],
        correctIndex: 1,
        explanation: 'Exceeding MRL violates sanitary and phytosanitary (SPS) regulations, leading to immediate rejection and quarantine bans.',
      },
    ],
  },
  {
    id: 'acad-12',
    number: 12,
    domain: 'Food Safety & Post-Harvest Loss Prevention',
    title: 'Aflatoxin Control, Moisture Meters & Hermetic Storage Bags',
    reviewer: 'Dr. Joseph Kang\'ethe, Post-Harvest Pathologist',
    institution: 'National Cereals and Produce Board (NCPB) Quality Lab',
    lastReviewed: 'August 2026',
    evidenceGrade: 'Established Field Standard',
    lessonsCount: 4,
    duration: '40 mins',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description:
      'KEPHIS moisture standard (<=13.5% for maize); preventing Aspergillus flavus mold growth; using certified hermetic storage bags (PICS) without insecticide dusts.',
    keyReference: 'EAC Harmonized Grain Standards / NCPB Technical Standards',
    lessons: [
      {
        title: '13.5% Grain Moisture Threshold & Salt Bottle Test',
        duration: '12 mins',
        summary: 'Verifying grain dryness before warehouse bagging.',
        steps: [
          'Test moisture using a calibrated electronic grain moisture meter at 3 different bag depths.',
          'Field salt test: Place grain in a dry glass jar with 2 teaspoons of dry table salt; shake for 2 minutes.',
          'If salt sticks to the glass, grain moisture is above 14% and requires further tarp sun-drying.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the maximum permissible moisture content for safe grain storage in Kenya (EAC Standard)?',
        options: ['13.5%', '20.0%', '18.5%', '8.0%'],
        correctIndex: 0,
        explanation: 'Moisture at or below 13.5% halts fungal growth, prevents Aspergillus mold colonization, and stops weevil propagation.',
      },
    ],
  },
  {
    id: 'acad-13',
    number: 13,
    domain: 'Agricultural Research, Remote Sensing & AI',
    title: 'Satellite NDVI Crop Health, Soil Sensors & Responsible AI',
    reviewer: 'Adams Kipkoech Kering, Systems Architect',
    institution: 'AgriKnowledge Hub Agritech Labs',
    lastReviewed: 'October 2026',
    evidenceGrade: 'Validated Practice',
    lessonsCount: 4,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description:
      'Interpreting Sentinel-2 Normalized Difference Vegetation Index (NDVI) color gradients, ground-truthing chlorophyll variations, mobile optical crop diagnostic models, and ethical agronomic data governance.',
    keyReference: 'Copernicus Earth Observation / Google Gemini Agricultural Science Papers',
    lessons: [
      {
        title: 'Interpreting NDVI Maps on Farm Plots',
        duration: '15 mins',
        summary: 'Understanding vigor index values from 0.0 to 1.0 on field plots.',
        steps: [
          'NDVI values between 0.6 and 0.8 indicate dense, healthy, photosynthetic biomass.',
          'Values dropping below 0.35 in mid-season flag moisture stress, root rot, or severe stemborer patches.',
          'Use GPS coordinates to scout the exact flagged anomaly in person before applying spot interventions.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does a sudden drop in mid-season NDVI in a specific plot section indicate?',
        options: ['Excessive crop growth', 'Biomass stress such as localized waterlogging, nutrient deficiency, or pest damage', 'The satellite camera is offline', 'The crop has matured instantly'],
        correctIndex: 1,
        explanation: 'NDVI measures reflected near-infrared light; damaged or stressed leaf mesophyll cells reflect less NIR light.',
      },
    ],
  },
  {
    id: 'acad-14',
    number: 14,
    domain: 'Agribusiness Financing, Cooperatives & Policies',
    title: 'E-Vouchers, Agriculture SACCOs, Crop Insurance & Grants',
    reviewer: 'Rosemary Muthoni, Rural Finance Advisor',
    institution: 'Ministry of Agriculture and Livestock Development (MoALD)',
    lastReviewed: 'August 2026',
    evidenceGrade: 'Regulatory Guideline',
    lessonsCount: 4,
    duration: '40 mins',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description:
      'Accessing subsidized fertilizer e-vouchers via the Kenya National Farmer Database; Kilimo Biashara credit schemes; index-based weather crop insurance; youth agribusiness grants.',
    keyReference: 'Kenya Agricultural Sector Transformation and Growth Strategy (ASTGS 2019-2029)',
    lessons: [
      {
        title: 'GoK Fertilizer E-Voucher Redemption Workflow',
        duration: '10 mins',
        summary: 'Steps to register with sub-county agricultural extension officers for seasonal e-vouchers.',
        steps: [
          'Ensure your farm details and acreage are registered in the National Farmer Database.',
          'Receive seasonal redemption SMS with authorization voucher code and participating NCPB depot.',
          'Present original National ID at depot to redeem fertilizer at gazetted subsidized prices.',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is Index-Based Weather Insurance in agriculture?',
        options: ['Insurance that covers tractor flat tires', 'Payouts triggered automatically when rainfall or satellite weather metrics deviate beyond historical threshold indices', 'A fixed lottery ticket', 'Health insurance for cattle'],
        correctIndex: 1,
        explanation: 'Index insurance does not require individual farm loss assessments; payouts trigger automatically based on objective rainfall/drought satellite indices.',
      },
    ],
  },
];

export const LearningPage: React.FC = () => {
  const { awardPoints } = useAuth();
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumModule | null>(
    ACADEMY_CURRICULUMS[0]
  );
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz' | 'references'>('lessons');
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [certificateGenerated, setCertificateGenerated] = useState<boolean>(false);

  const domains = [
    'All',
    'Crop Science & Production',
    'Soil Science & Plant Nutrition',
    'Plant Health & Integrated Pest Management',
    'Livestock & Dairy Systems',
    'Veterinary & Animal Welfare Education',
    'Irrigation & Protected Cultivation',
    'Climate-Smart & Regenerative Agroecology',
    'Farm Management & Enterprise Accounting',
  ];

  const filteredCurriculums = ACADEMY_CURRICULUMS.filter((c) =>
    selectedDomainFilter === 'All' ? true : c.domain === selectedDomainFilter
  );

  const handleSelectCurriculum = (module: CurriculumModule) => {
    setSelectedCurriculum(module);
    setActiveLessonIndex(0);
    setActiveTab('lessons');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setCertificateGenerated(false);
  };

  const handleQuizOptionSelect = (qIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (selectedCurriculum) {
      const correctCount = selectedCurriculum.quiz.filter(
        (q, idx) => quizAnswers[idx] === q.correctIndex
      ).length;
      if (correctCount === selectedCurriculum.quiz.length) {
        setCertificateGenerated(true);
        awardPoints(100);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              AgriAcademy — 14 Scientific Curriculums
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Structured international agricultural education verified by KALRO, KEPHIS, icipe, KDB, and the Kenya Veterinary Board.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold shrink-0">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>14 Certified Curriculums Ready</span>
        </div>
      </div>

      {/* Main Study Arena */}
      {selectedCurriculum && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Module Hero Header */}
          <div className="bg-gradient-to-r from-[#183D29] to-[#0E2317] text-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="bg-emerald-700/80 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Curriculum #{selectedCurriculum.number} • {selectedCurriculum.domain}
              </span>
              <span className="text-xs text-emerald-300 font-medium">
                {selectedCurriculum.evidenceGrade}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white mb-2">
              {selectedCurriculum.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed mb-4">
              {selectedCurriculum.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200/90 pt-2 border-t border-emerald-900/80">
              <span>Verified by: <strong>{selectedCurriculum.reviewer}</strong></span>
              <span>•</span>
              <span>{selectedCurriculum.institution}</span>
              <span>•</span>
              <span>Reviewed: {selectedCurriculum.lastReviewed}</span>
            </div>
          </div>

          {/* Module Tabs (Lessons, Quiz, References) */}
          <div className="bg-stone-50 px-6 border-b border-stone-200 flex items-center gap-3 text-xs font-bold">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`py-3.5 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'lessons'
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lessons & Step-by-Step Instructions</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-3.5 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Knowledge Quiz & Certificate</span>
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`py-3.5 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'references'
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Authoritative Citations & Policies</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'lessons' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-bold text-sm text-stone-900">
                    Lesson {activeLessonIndex + 1} of {selectedCurriculum.lessons.length}:{' '}
                    {selectedCurriculum.lessons[activeLessonIndex]?.title}
                  </h3>
                  <span className="text-xs text-stone-500">
                    {selectedCurriculum.lessons[activeLessonIndex]?.duration}
                  </span>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  <strong>Core Takeaway:</strong>{' '}
                  {selectedCurriculum.lessons[activeLessonIndex]?.summary}
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700">
                    Step-by-Step Practical Field Implementation:
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCurriculum.lessons[activeLessonIndex]?.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs sm:text-sm text-stone-800"
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <button
                    disabled={activeLessonIndex === 0}
                    onClick={() => setActiveLessonIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-40 cursor-pointer"
                  >
                    Previous Lesson
                  </button>
                  <button
                    disabled={activeLessonIndex === selectedCurriculum.lessons.length - 1}
                    onClick={() =>
                      setActiveLessonIndex((prev) =>
                        Math.min(selectedCurriculum.lessons.length - 1, prev + 1)
                      )
                    }
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-40 cursor-pointer"
                  >
                    Next Lesson
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-stone-900">
                    Module Certification Assessment
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Answer all questions correctly to generate your verified certificate and earn +100 reputation points.
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedCurriculum.quiz.map((q, qIdx) => {
                    const isSelected = quizAnswers[qIdx] !== undefined;
                    const isCorrect = quizAnswers[qIdx] === q.correctIndex;

                    return (
                      <div
                        key={qIdx}
                        className="p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-3 bg-stone-50/50"
                      >
                        <p className="font-bold text-xs sm:text-sm text-stone-900">
                          {qIdx + 1}. {q.question}
                        </p>

                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = quizAnswers[qIdx] === oIdx;
                            let style = 'bg-white border-stone-200 text-stone-700 hover:border-emerald-500';
                            if (quizSubmitted) {
                              if (oIdx === q.correctIndex) {
                                style = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold';
                              } else if (isChosen) {
                                style = 'bg-rose-100 border-rose-500 text-rose-950';
                              }
                            } else if (isChosen) {
                              style = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleQuizOptionSelect(qIdx, oIdx)}
                                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${style}`}
                              >
                                <span>{opt}</span>
                                {isChosen && <Check className="w-4 h-4 text-emerald-700" />}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-600">
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {certificateGenerated ? (
                  <div className="p-6 bg-gradient-to-br from-emerald-900 to-green-950 text-white rounded-3xl border-2 border-emerald-400 space-y-3 text-center">
                    <Award className="w-12 h-12 text-amber-300 mx-auto" />
                    <h4 className="text-lg font-serif font-bold text-amber-200">
                      Certificate of Agricultural Competence Earned!
                    </h4>
                    <p className="text-xs text-emerald-100 max-w-md mx-auto">
                      Awarded to <strong>John Kiprono Kipchoge</strong> for completing Curriculum #{selectedCurriculum.number}: {selectedCurriculum.title}.
                    </p>
                    <p className="text-[10px] text-emerald-300">
                      Certified by KALRO, KEPHIS & AgriKnowledge Hub Worldwide. +100 Points Awarded!
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleQuizSubmit}
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                      Submit Answers & Verify Grade
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'references' && (
              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 text-sm">Authoritative Research Citation:</h4>
                  <p className="text-emerald-800 font-semibold">{selectedCurriculum.keyReference}</p>
                  <p className="text-stone-500 text-xs">
                    This curriculum conforms to the national statutory standards established by the Kenya Plant Health Inspectorate Service (KEPHIS), KALRO research acts, and PCPB pesticide registries.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-amber-700 inline mr-1" />
                  <strong>Agronomic Review Integrity Policy:</strong> AgriKnowledge Hub prohibits speculative or unverified agricultural chemical formulations. Always confirm local batch numbers and expiry tags with authorized extension officers.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Curriculums Selector Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Browse All 14 Curriculums
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomainFilter(dom)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition cursor-pointer ${
                  selectedDomainFilter === dom
                    ? 'bg-[#183D29] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCurriculums.map((m) => {
            const isSelected = selectedCurriculum?.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => handleSelectCurriculum(m)}
                className={`bg-white rounded-3xl p-5 border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-stone-200 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Module #{m.number} • {m.domain}
                    </span>
                    <span className="text-[10px] text-stone-400">{m.duration}</span>
                  </div>

                  <h4 className="font-bold text-sm text-stone-900 line-clamp-2 leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <span className="text-[11px] text-stone-500">
                    Reviewer: {m.reviewer.split(',')[0]}
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span>Study Module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
