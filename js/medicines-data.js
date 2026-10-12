/**
 * File: js/medicines-data.js
 * Source: Egyptian Drug Authority (EDA) References & Common Pediatric Formularies
 * Description: Extensive Reference directory for pediatric/neonatal medications in Egypt.
 * Note: This is a static core subset. A complete 100% national DB requires an external JSON integration.
 */

export const pediatricMedicines = [
    // ==========================================
    // 1. Antipyretics, Analgesics & NSAIDs
    // ==========================================
    { id: "m_1", scientificName: "Paracetamol", tradeName: "Cetal", synonyms: ["سيتال", "باراسيتامول"], concentration: "250 mg/5 mL", form: "Syrup", route: "Oral", category: "Analgesic/Antipyretic", status: "Verified" },
    { id: "m_2", scientificName: "Paracetamol", tradeName: "Cetal", synonyms: ["سيتال نقط"], concentration: "100 mg/1 mL", form: "Drops", route: "Oral", category: "Analgesic/Antipyretic", status: "Verified" },
    { id: "m_3", scientificName: "Paracetamol", tradeName: "Cetal", synonyms: ["لبوس سيتال 120"], concentration: "120 mg", form: "Suppository", route: "Rectal", category: "Analgesic/Antipyretic", status: "Verified" },
    { id: "m_4", scientificName: "Paracetamol", tradeName: "Pyal", synonyms: ["بيال"], concentration: "120 mg/5 mL", form: "Syrup", route: "Oral", category: "Analgesic/Antipyretic", status: "Verified" },
    { id: "m_5", scientificName: "Paracetamol", tradeName: "Paramol", synonyms: ["بارامول لبوس"], concentration: "125 mg", form: "Suppository", route: "Rectal", category: "Analgesic/Antipyretic", status: "Verified" },
    { id: "m_6", scientificName: "Paracetamol", tradeName: "Tempra", synonyms: ["تمبرا"], concentration: "160 mg/5 mL", form: "Syrup", route: "Oral", category: "Analgesic/Antipyretic", status: "Verified" },
    { id: "m_7", scientificName: "Paracetamol", tradeName: "Perfalgan", synonyms: ["بيرفالجان", "باراسيتامول وريدي"], concentration: "10 mg/1 mL", form: "Vial", route: "IV", category: "Analgesic/Antipyretic", status: "Verified" },
    
    { id: "m_8", scientificName: "Ibuprofen", tradeName: "Brufen", synonyms: ["بروفين"], concentration: "100 mg/5 mL", form: "Suspension", route: "Oral", category: "NSAID", status: "Verified" },
    { id: "m_9", scientificName: "Ibuprofen", tradeName: "Marcofen", synonyms: ["ماركوفين"], concentration: "100 mg/5 mL", form: "Suspension", route: "Oral", category: "NSAID", status: "Verified" },
    { id: "m_10", scientificName: "Ibuprofen", tradeName: "Megafen", synonyms: ["ميجا فين"], concentration: "100 mg/5 mL", form: "Suspension", route: "Oral", category: "NSAID", status: "Verified" },
    
    { id: "m_11", scientificName: "Diclofenac Potassium", tradeName: "Catafly", synonyms: ["كاتافلاي"], concentration: "2 mg/1 mL", form: "Suspension", route: "Oral", category: "NSAID", status: "Verified" },
    { id: "m_12", scientificName: "Diclofenac Sodium", tradeName: "Dolphin", synonyms: ["دولفين لبوس 12.5"], concentration: "12.5 mg", form: "Suppository", route: "Rectal", category: "NSAID", status: "Verified" },
    { id: "m_13", scientificName: "Diclofenac Sodium", tradeName: "Dolphin", synonyms: ["دولفين لبوس 25"], concentration: "25 mg", form: "Suppository", route: "Rectal", category: "NSAID", status: "Verified" },

    // ==========================================
    // 2. Antibiotics (المضادات الحيوية)
    // ==========================================
    // Penicillins & Combinations
    { id: "m_14", scientificName: "Amoxicillin", tradeName: "Amoxil", synonyms: ["اموكسيل"], concentration: "250 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_15", scientificName: "Amoxicillin + Clavulanic Acid", tradeName: "Augmentin", synonyms: ["اوجمنتين 156"], concentration: "156.25 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_16", scientificName: "Amoxicillin + Clavulanic Acid", tradeName: "Augmentin", synonyms: ["اوجمنتين 312"], concentration: "312.5 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_17", scientificName: "Amoxicillin + Clavulanic Acid", tradeName: "Augmentin", synonyms: ["اوجمنتين 457"], concentration: "457 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_18", scientificName: "Amoxicillin + Clavulanic Acid", tradeName: "Augmentin ES", synonyms: ["اوجمنتين اي اس"], concentration: "600 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_19", scientificName: "Amoxicillin + Clavulanic Acid", tradeName: "Hibiotic", synonyms: ["هايبيوتك 228"], concentration: "228.5 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_20", scientificName: "Amoxicillin + Clavulanic Acid", tradeName: "Hibiotic", synonyms: ["هايبيوتك 460"], concentration: "460 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_21", scientificName: "Ampicillin + Sulbactam", tradeName: "Unictam", synonyms: ["يونيكتام حقن 750"], concentration: "750 mg", form: "Vial", route: "IM/IV", category: "Antibiotic", status: "Verified" },
    { id: "m_22", scientificName: "Ampicillin + Sulbactam", tradeName: "Unictam", synonyms: ["يونيكتام شراب"], concentration: "250 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    
    // Cephalosporins
    { id: "m_23", scientificName: "Cefadroxil", tradeName: "Duricef", synonyms: ["ديوريسيف"], concentration: "250 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_24", scientificName: "Cefadroxil", tradeName: "Duricef", synonyms: ["ديوريسيف 500"], concentration: "500 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_25", scientificName: "Cefdinir", tradeName: "Omnicef", synonyms: ["أومنيسيف"], concentration: "125 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_26", scientificName: "Cefdinir", tradeName: "Omnicef", synonyms: ["أومنيسيف 250"], concentration: "250 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_27", scientificName: "Cefuroxime", tradeName: "Zinnat", synonyms: ["زينات"], concentration: "125 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_28", scientificName: "Cefotaxime", tradeName: "Cefotax", synonyms: ["سيفوتاكس حقن 250"], concentration: "250 mg", form: "Vial", route: "IM/IV", category: "Antibiotic", status: "Verified" },
    { id: "m_29", scientificName: "Cefotaxime", tradeName: "Cefotax", synonyms: ["سيفوتاكس حقن 500"], concentration: "500 mg", form: "Vial", route: "IM/IV", category: "Antibiotic", status: "Verified" },
    { id: "m_30", scientificName: "Ceftriaxone", tradeName: "Rocephin", synonyms: ["روسيفين حقن 500"], concentration: "500 mg", form: "Vial", route: "IM/IV", category: "Antibiotic", status: "Verified" },
    
    // Macrolides
    { id: "m_31", scientificName: "Azithromycin", tradeName: "Zithromax", synonyms: ["زيثراماكس 200"], concentration: "200 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_32", scientificName: "Azithromycin", tradeName: "Xithrone", synonyms: ["زيثيرون"], concentration: "200 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_33", scientificName: "Clarithromycin", tradeName: "Klacid", synonyms: ["كلاسيد 125"], concentration: "125 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_34", scientificName: "Clarithromycin", tradeName: "Klacid", synonyms: ["كلاسيد 250"], concentration: "250 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },

    // Others
    { id: "m_35", scientificName: "Sulfamethoxazole + Trimethoprim", tradeName: "Septrin", synonyms: ["سبترين"], concentration: "240 mg/5 mL", form: "Suspension", route: "Oral", category: "Antibiotic", status: "Verified" },
    { id: "m_36", scientificName: "Metronidazole", tradeName: "Flagyl", synonyms: ["فلاجيل", "مطهر معوي"], concentration: "125 mg/5 mL", form: "Suspension", route: "Oral", category: "Antiprotozoal", status: "Verified" },
    { id: "m_37", scientificName: "Nitazoxanide", tradeName: "Nanazoxid", synonyms: ["نانازوكسيد"], concentration: "100 mg/5 mL", form: "Suspension", route: "Oral", category: "Antiprotozoal", status: "Verified" },
    { id: "m_38", scientificName: "Nifuroxazide", tradeName: "Antinal", synonyms: ["انتينال"], concentration: "220 mg/5 mL", form: "Suspension", route: "Oral", category: "Intestinal Antiseptic", status: "Verified" },

    // ==========================================
    // 3. Respiratory, Allergy & Asthma
    // ==========================================
    // Antihistamines
    { id: "m_39", scientificName: "Cetirizine", tradeName: "Zyrtec", synonyms: ["زيرتك نقط"], concentration: "10 mg/1 mL", form: "Drops", route: "Oral", category: "Antihistamine", status: "Verified" },
    { id: "m_40", scientificName: "Cetirizine", tradeName: "Zyrtec", synonyms: ["زيرتك شراب"], concentration: "5 mg/5 mL", form: "Syrup", route: "Oral", category: "Antihistamine", status: "Verified" },
    { id: "m_41", scientificName: "Levocetirizine", tradeName: "Levohistam", synonyms: ["ليفوهيستام"], concentration: "2.5 mg/5 mL", form: "Syrup", route: "Oral", category: "Antihistamine", status: "Verified" },
    { id: "m_42", scientificName: "Desloratadine", tradeName: "Aerius", synonyms: ["ايريوس"], concentration: "2.5 mg/5 mL", form: "Syrup", route: "Oral", category: "Antihistamine", status: "Verified" },
    { id: "m_43", scientificName: "Ketotifen", tradeName: "Zaditen", synonyms: ["زاديتين"], concentration: "1 mg/5 mL", form: "Syrup", route: "Oral", category: "Antihistamine", status: "Verified" },
    
    // Inhalers & Nebules
    { id: "m_44", scientificName: "Salbutamol", tradeName: "Ventolin", synonyms: ["فنتولين بخاخ"], concentration: "100 mcg/dose", form: "Inhaler", route: "Inhalation", category: "Bronchodilator", status: "Verified" },
    { id: "m_45", scientificName: "Salbutamol", tradeName: "Farcolin", synonyms: ["فاركولين جلسات"], concentration: "5 mg/1 mL", form: "Respirator Solution", route: "Inhalation", category: "Bronchodilator", status: "Verified" },
    { id: "m_46", scientificName: "Ipratropium bromide", tradeName: "Atrovent", synonyms: ["اتروفينت جلسات"], concentration: "250 mcg/1 mL", form: "Vial", route: "Inhalation", category: "Bronchodilator", status: "Verified" },
    { id: "m_47", scientificName: "Budesonide", tradeName: "Pulmicort", synonyms: ["بلميكورت 0.25", "جلسات كورتيزون"], concentration: "0.25 mg/1 mL", form: "Respules", route: "Inhalation", category: "Corticosteroid", status: "Verified" },
    { id: "m_48", scientificName: "Budesonide", tradeName: "Pulmicort", synonyms: ["بلميكورت 0.50"], concentration: "0.5 mg/1 mL", form: "Respules", route: "Inhalation", category: "Corticosteroid", status: "Verified" },
    { id: "m_49", scientificName: "Fluticasone", tradeName: "Flixotide", synonyms: ["فليكسوتيد 50"], concentration: "50 mcg/dose", form: "Inhaler", route: "Inhalation", category: "Corticosteroid", status: "Verified" },
    
    // Oral Corticosteroids
    { id: "m_50", scientificName: "Prednisolone", tradeName: "Xilone", synonyms: ["زيلون"], concentration: "5 mg/5 mL", form: "Syrup", route: "Oral", category: "Corticosteroid", status: "Verified" },
    { id: "m_51", scientificName: "Prednisolone", tradeName: "Xilone Forte", synonyms: ["زيلون فورت"], concentration: "15 mg/5 mL", form: "Syrup", route: "Oral", category: "Corticosteroid", status: "Verified" },
    { id: "m_52", scientificName: "Dexamethasone", tradeName: "Dexazone", synonyms: ["ديكسازون"], concentration: "0.5 mg/5 mL", form: "Syrup", route: "Oral", category: "Corticosteroid", status: "Verified" },

    // Cough & Mucolytics
    { id: "m_53", scientificName: "Ivy leaf extract", tradeName: "Prospan", synonyms: ["بروسبان"], concentration: "7 mg/1 mL", form: "Syrup", route: "Oral", category: "Mucolytic", status: "Verified" },
    { id: "m_54", scientificName: "Ambroxol", tradeName: "Mucosolvan", synonyms: ["موكوسولفان"], concentration: "15 mg/5 mL", form: "Syrup", route: "Oral", category: "Mucolytic", status: "Verified" },
    { id: "m_55", scientificName: "Ambroxol", tradeName: "Mucosolvan", synonyms: ["موكوسولفان نقط"], concentration: "7.5 mg/1 mL", form: "Drops", route: "Oral", category: "Mucolytic", status: "Verified" },

    // ==========================================
    // 4. Gastrointestinal (GI) & Hydration
    // ==========================================
    { id: "m_56", scientificName: "Oral Rehydration Salts (ORS)", tradeName: "Rehydran", synonyms: ["محلول معالجة الجفاف"], concentration: "Sachet", form: "Powder", route: "Oral", category: "Hydration", status: "Verified" },
    { id: "m_57", scientificName: "Domperidone", tradeName: "Motilium", synonyms: ["موتيليوم", "ترجيع"], concentration: "1 mg/1 mL", form: "Suspension", route: "Oral", category: "Antiemetic", status: "Verified" },
    { id: "m_58", scientificName: "Ondansetron", tradeName: "Zofran", synonyms: ["زوفران", "دانسيت"], concentration: "4 mg/5 mL", form: "Syrup", route: "Oral", category: "Antiemetic", status: "Verified" },
    { id: "m_59", scientificName: "Ondansetron", tradeName: "Danset", synonyms: ["دانسيت حقن"], concentration: "4 mg/2 mL", form: "Ampoule", route: "IM/IV", category: "Antiemetic", status: "Verified" },
    { id: "m_60", scientificName: "Simethicone", tradeName: "Dentinox", synonyms: ["دينتينوكس", "مغص"], concentration: "42 mg/5 mL", form: "Drops", route: "Oral", category: "Antiflatulent", status: "Verified" },
    { id: "m_61", scientificName: "Lactulose", tradeName: "Duphalac", synonyms: ["دوفالاك", "امساك"], concentration: "66.7%", form: "Syrup", route: "Oral", category: "Laxative", status: "Verified" },
    { id: "m_62", scientificName: "Bacillus clausii", tradeName: "Enterogermina", synonyms: ["انتروجيرمينا", "بروبيوتيك"], concentration: "2 Billion/5 mL", form: "Vial", route: "Oral", category: "Probiotic", status: "Verified" },
    { id: "m_63", scientificName: "Esomeprazole", tradeName: "Nexium", synonyms: ["نكسيوم اكياس", "ارتجاع"], concentration: "10 mg", form: "Sachet", route: "Oral", category: "PPI", status: "Verified" },

    // ==========================================
    // 5. Vitamins, Minerals & Supplements
    // ==========================================
    { id: "m_64", scientificName: "Cholecalciferol (Vit D3)", tradeName: "Vidrop", synonyms: ["فيدروب", "فيتامين د"], concentration: "2800 IU/1 mL (400 IU/Drop)", form: "Drops", route: "Oral", category: "Vitamin", status: "Verified" },
    { id: "m_65", scientificName: "Iron Polymaltose", tradeName: "Ferose", synonyms: ["فيروز شراب"], concentration: "50 mg/5 mL", form: "Syrup", route: "Oral", category: "Mineral", status: "Verified" },
    { id: "m_66", scientificName: "Iron (Ferrous Sulfate)", tradeName: "In-Rich", synonyms: ["ان ريتش نقط", "حديد"], concentration: "15 mg/1 mL", form: "Drops", route: "Oral", category: "Mineral", status: "Verified" },
    { id: "m_67", scientificName: "Calcium + Vit D", tradeName: "Osteocare", synonyms: ["اوستيوكير", "كالسيوم"], concentration: "Standard", form: "Syrup", route: "Oral", category: "Mineral", status: "Verified" },
    { id: "m_68", scientificName: "Zinc Sulfate", tradeName: "Zinc Origin", synonyms: ["زنك اوريجين"], concentration: "10 mg/5 mL", form: "Syrup", route: "Oral", category: "Mineral", status: "Verified" },
    { id: "m_69", scientificName: "Multivitamin", tradeName: "Sansovit", synonyms: ["سانسوفيت"], concentration: "Standard", form: "Syrup", route: "Oral", category: "Multivitamin", status: "Verified" },

    // ==========================================
    // 6. Neonatology Specific (أدوية الطوارئ وحديثي الولادة)
    // ==========================================
    { id: "m_70", scientificName: "Caffeine Citrate", tradeName: "Peyona", synonyms: ["كافيين حضانات", "انقطاع التنفس"], concentration: "20 mg/1 mL", form: "Ampoule", route: "IV", category: "Neonatal/CNS Stimulant", status: "Verified" },
    { id: "m_71", scientificName: "Poractant alfa", tradeName: "Curosurf", synonyms: ["كيوروسيرف", "سيرفاكتانت"], concentration: "80 mg/1 mL", form: "Vial", route: "Endotracheal", category: "Surfactant", status: "Verified" },
    { id: "m_72", scientificName: "Vitamin K (Phytomenadione)", tradeName: "Konakion MM Paediatric", synonyms: ["كوناكيون", "فيتامين ك"], concentration: "2 mg/0.2 mL", form: "Ampoule", route: "IM/Oral", category: "Vitamin/Hemostatic", status: "Verified" },
    { id: "m_73", scientificName: "Phenobarbital", tradeName: "Sominal", synonyms: ["سومينال", "تشنجات"], concentration: "40 mg", form: "Tablet", route: "Oral", category: "Anticonvulsant", status: "Verified" },

    // ==========================================
    // 7. Topicals (Eye, Ear, Nose, Skin)
    // ==========================================
    { id: "m_74", scientificName: "Normal Saline", tradeName: "Apisal", synonyms: ["ابيسال نقط أنف", "محلول ملح"], concentration: "0.9%", form: "Drops", route: "Nasal", category: "Decongestant", status: "Verified" },
    { id: "m_75", scientificName: "Normal Saline", tradeName: "Lyse", synonyms: ["لايس بخاخ"], concentration: "0.9%", form: "Nasal Spray", route: "Nasal", category: "Decongestant", status: "Verified" },
    { id: "m_76", scientificName: "Xylometazoline", tradeName: "Otrivin Baby Saline", synonyms: ["اوترفين بيبي"], concentration: "0.05%", form: "Drops", route: "Nasal", category: "Decongestant", status: "Verified" },
    { id: "m_77", scientificName: "Tobramycin + Dexamethasone", tradeName: "Dexatobrin", synonyms: ["دكساتوبرين قطرة عين"], concentration: "0.3%", form: "Eye Drops", route: "Ophthalmic", category: "Antibiotic/Steroid", status: "Verified" },
    { id: "m_78", scientificName: "Flumetasone + Clioquinol", tradeName: "Viotic", synonyms: ["فيوتيك قطرة اذن"], concentration: "Standard", form: "Ear Drops", route: "Otic", category: "Antibiotic/Steroid", status: "Verified" },
    { id: "m_79", scientificName: "Zinc Oxide", tradeName: "Sudocrem", synonyms: ["سودوكريم", "تسلخات"], concentration: "Standard", form: "Cream", route: "Topical", category: "Skin Care", status: "Verified" },
    { id: "m_80", scientificName: "Miconazole", tradeName: "Daktarin", synonyms: ["داكتارين جل فموي", "فطريات الفم"], concentration: "2%", form: "Oral Gel", route: "Oral", category: "Antifungal", status: "Verified" },
    { id: "m_81", scientificName: "Nystatin", tradeName: "Nystatin", synonyms: ["نيستاتين نقط"], concentration: "100,000 IU/mL", form: "Drops", route: "Oral", category: "Antifungal", status: "Verified" }
];
