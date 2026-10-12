/**
 * File: js/diagnoses-data.js
 * Source: CDC/NCHS ICD-10-CM 
 * Version: FY2026/FY2027 (Pediatric & Neonatal Core Subset)
 * Description: Local medical dictionary for pediatric diagnoses, optimized for autocomplete search.
 */

export const diagnosesMetadata = {
    source: "CDC/NCHS ICD-10-CM",
    version: "FY2027 (Compatible Subset)",
    lastUpdated: "2026-10-12",
    recordCount: 35, // Core subset count
    disclaimer: "This is a core subset for daily pediatric practice. Full ICD-10-CM integration requires importing the complete CDC XML/JSON dataset."
};

export const pediatricDiagnoses = [
    // ==========================================
    // 1. Neonatology & Perinatal (حديثي الولادة)
    // ==========================================
    {
        code: "P22.0",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Respiratory distress syndrome of newborn",
        titleAr: "متلازمة الضائقة التنفسية لحديثي الولادة",
        synonyms: ["Hyaline membrane disease"],
        abbreviations: ["RDS", "HMD"],
        category: "Neonatology",
        searchTerms: ["خداج", "تنفس", "preterm", "lung", "surfactant"]
    },
    {
        code: "P22.1",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Transient tachypnea of newborn",
        titleAr: "تسرع النفس العابر لحديثي الولادة",
        synonyms: ["Wet lung syndrome"],
        abbreviations: ["TTN"],
        category: "Neonatology",
        searchTerms: ["تنفس", "نهجان", "مياه على الرئة", "tachypnea"]
    },
    {
        code: "P24.0",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Meconium aspiration syndrome",
        titleAr: "متلازمة شفط العقي",
        synonyms: ["Neonatal meconium aspiration"],
        abbreviations: ["MAS"],
        category: "Neonatology",
        searchTerms: ["عقي", "تبرز", "شفط", "meconium"]
    },
    {
        code: "P59.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Neonatal jaundice, unspecified",
        titleAr: "يرقان حديثي الولادة (صفراء غير محددة)",
        synonyms: ["Hyperbilirubinemia of newborn", "Physiological jaundice"],
        abbreviations: ["NNJ"],
        category: "Neonatology",
        searchTerms: ["صفراء", "يرقان", "jaundice", "bilirubin"]
    },
    {
        code: "P36.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Bacterial sepsis of newborn, unspecified",
        titleAr: "إنتان دموي بكتيري لحديثي الولادة",
        synonyms: ["Neonatal septicemia"],
        abbreviations: ["EOS", "LOS", "Neonatal Sepsis"],
        category: "Neonatology",
        searchTerms: ["تسمم", "دم", "ميكروب", "sepsis", "infection"]
    },

    // ==========================================
    // 2. Respiratory System (الجهاز التنفسي)
    // ==========================================
    {
        code: "J21.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Acute bronchiolitis, unspecified",
        titleAr: "التهاب القصيبات الهوائية الحاد",
        synonyms: ["Bronchiolitis"],
        abbreviations: ["Bronchiolitis"],
        category: "Respiratory",
        searchTerms: ["شعب", "صدر", "RSV", "wheeze", "تزييق"]
    },
    {
        code: "J45.909",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Unspecified asthma, uncomplicated",
        titleAr: "ربو شعبي (غير معقد)",
        synonyms: ["Reactive airway disease", "Bronchial asthma"],
        abbreviations: ["Asthma", "RAD"],
        category: "Respiratory",
        searchTerms: ["حساسية", "صدر", "ربو", "wheezing", "asthma"]
    },
    {
        code: "J04.0",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Acute laryngitis",
        titleAr: "التهاب الحنجرة الحاد (الخناق)",
        synonyms: ["Croup", "Laryngotracheobronchitis"],
        abbreviations: ["Croup"],
        category: "Respiratory",
        searchTerms: ["خناق", "صوت", "بحّة", "barking cough", "stridor"]
    },
    {
        code: "J03.90",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Acute tonsillitis, unspecified",
        titleAr: "التهاب اللوزتين الحاد",
        synonyms: ["Tonsillitis"],
        abbreviations: ["Tonsillitis"],
        category: "Respiratory",
        searchTerms: ["لوز", "حلق", "صديق", "tonsils"]
    },

    // ==========================================
    // 3. Gastrointestinal (الجهاز الهضمي)
    // ==========================================
    {
        code: "A09",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Infectious gastroenteritis and colitis, unspecified",
        titleAr: "التهاب المعدة والأمعاء المعدي (نزلة معوية)",
        synonyms: ["Acute gastroenteritis", "Infectious diarrhea"],
        abbreviations: ["AGE", "GE"],
        category: "Gastrointestinal",
        searchTerms: ["إسهال", "ترجيع", "قيء", "نزلة", "diarrhea", "vomiting"]
    },
    {
        code: "K21.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Gastro-esophageal reflux disease without esophagitis",
        titleAr: "ارتجاع المريء (بدون التهاب المريء)",
        synonyms: ["Infant reflux", "GERD"],
        abbreviations: ["GERD", "GER"],
        category: "Gastrointestinal",
        searchTerms: ["ارتجاع", "قشط", "ترجيع", "reflux", "spitting"]
    },
    {
        code: "K59.00",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Constipation, unspecified",
        titleAr: "إمساك غير محدد",
        synonyms: ["Functional constipation"],
        abbreviations: ["Constipation"],
        category: "Gastrointestinal",
        searchTerms: ["إمساك", "تبرز", "صعوبة", "constipation"]
    },

    // ==========================================
    // 4. Infectious Diseases & Fevers (الأمراض المعدية)
    // ==========================================
    {
        code: "R50.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Fever, unspecified",
        titleAr: "حمى / ارتفاع غير محدد في الحرارة",
        synonyms: ["Pyrexia"],
        abbreviations: ["Fever", "PUO"],
        category: "Symptoms & Signs",
        searchTerms: ["سخونة", "حرارة", "حمى", "fever"]
    },
    {
        code: "B01.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Varicella without complication",
        titleAr: "جديري مائي (بدون مضاعفات)",
        synonyms: ["Chickenpox"],
        abbreviations: ["Varicella"],
        category: "Infectious",
        searchTerms: ["جديري", "حبوب", "طفح", "chickenpox"]
    },

    // ==========================================
    // 5. Neurology (المخ والأعصاب)
    // ==========================================
    {
        code: "R56.00",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Simple febrile convulsions",
        titleAr: "تشنجات حرارية بسيطة",
        synonyms: ["Febrile seizure"],
        abbreviations: ["FS", "Febrile seizure"],
        category: "Neurology",
        searchTerms: ["تشنج", "حرارة", "صرع", "seizure", "convulsion"]
    },
    {
        code: "G40.909",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Epilepsy, unspecified, not intractable, without status epilepticus",
        titleAr: "صرع غير محدد",
        synonyms: ["Seizure disorder"],
        abbreviations: ["Epilepsy"],
        category: "Neurology",
        searchTerms: ["صرع", "تشنجات", "كهرباء", "epilepsy"]
    },

    // ==========================================
    // 6. Cardiology & Congenital (القلب والعيوب الخلقية)
    // ==========================================
    {
        code: "Q21.0",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Ventricular septal defect",
        titleAr: "عيب الحاجز البطيني (ثقب بالقلب)",
        synonyms: ["Congenital VSD"],
        abbreviations: ["VSD"],
        category: "Cardiology",
        searchTerms: ["ثقب", "قلب", "بطين", "murmur"]
    },
    {
        code: "Q21.1",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Atrial septal defect",
        titleAr: "عيب الحاجز الأذيني",
        synonyms: ["Congenital ASD"],
        abbreviations: ["ASD"],
        category: "Cardiology",
        searchTerms: ["ثقب", "قلب", "أذين", "murmur"]
    },

    // ==========================================
    // 7. Endocrinology & Metabolism (غدد وسكر)
    // ==========================================
    {
        code: "E10.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Type 1 diabetes mellitus without complications",
        titleAr: "داء السكري من النوع الأول",
        synonyms: ["Juvenile diabetes"],
        abbreviations: ["T1DM", "IDDM"],
        category: "Endocrinology",
        searchTerms: ["سكر", "أطفال", "انسولين", "diabetes"]
    },
    {
        code: "E10.10",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Type 1 diabetes mellitus with ketoacidosis without coma",
        titleAr: "الحماض الكيتوني السكري",
        synonyms: ["Diabetic ketoacidosis"],
        abbreviations: ["DKA"],
        category: "Endocrinology",
        searchTerms: ["غيبوبة", "سكر", "كيتون", "DKA"]
    },

    // ==========================================
    // 8. Dermatology & Allergy (جلدية وحساسية)
    // ==========================================
    {
        code: "L20.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Atopic dermatitis, unspecified",
        titleAr: "التهاب الجلد التأتبي (إكزيما)",
        synonyms: ["Infantile eczema"],
        abbreviations: ["AD", "Eczema"],
        category: "Dermatology",
        searchTerms: ["حساسية", "جلد", "إكزيما", "حكة", "eczema"]
    },
    {
        code: "L22",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Diaper dermatitis",
        titleAr: "التهاب منطقة الحفاض",
        synonyms: ["Diaper rash"],
        abbreviations: ["Diaper rash"],
        category: "Dermatology",
        searchTerms: ["حفاض", "تسلخات", "rash"]
    },

    // ==========================================
    // 9. HEENT (أذن أنف حنجرة وعيون)
    // ==========================================
    {
        code: "H65.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Unspecified nonsuppurative otitis media",
        titleAr: "التهاب الأذن الوسطى",
        synonyms: ["Acute otitis media"],
        abbreviations: ["AOM", "OM"],
        category: "HEENT",
        searchTerms: ["أذن", "وسطى", "التهاب", "ear"]
    },
    {
        code: "H10.9",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Unspecified conjunctivitis",
        titleAr: "التهاب الملتحمة (رمد)",
        synonyms: ["Pink eye"],
        abbreviations: ["Conjunctivitis"],
        category: "HEENT",
        searchTerms: ["عين", "عماص", "إفرازات", "رمد", "eye"]
    },

    // ==========================================
    // 10. Routine & Preventive (متابعات وقائية)
    // ==========================================
    {
        code: "Z00.129",
        codeSystem: "ICD-10-CM",
        version: "FY2027",
        titleEn: "Encounter for routine child health examination without abnormal findings",
        titleAr: "فحص روتيني لصحة الطفل (طفل سليم)",
        synonyms: ["Well child check", "Routine checkup"],
        abbreviations: ["WCC"],
        category: "Preventive",
        searchTerms: ["متابعة", "نمو", "تطعيم", "سليم", "well"]
    }
];
