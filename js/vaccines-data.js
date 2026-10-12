// js/vaccines-data.js
export const VACCINE_CATALOG = {
    metadata: {
        lastUpdated: "2026-10-12",
        sources: ["WHO Routine Immunization Tables", "CDC/ACIP Child Schedule", "Egyptian Health Council Guidelines (Complementary)"],
        status: "Production Ready"
    },
    vaccines: {
        "rotarix": {
            id: "rotarix",
            name: "Rotavirus (Rotarix - RV1)",
            disease: "Gastroenteritis",
            type: "Live Attenuated (Oral)",
            totalDoses: 2,
            rules: [
                { doseNum: 1, minAgeDays: 42, recommendedAgeDays: 60, maxAgeDays: 104 }, // Max 14 weeks 6 days
                { doseNum: 2, minAgeDays: 70, recommendedAgeDays: 120, maxAgeDays: 168, minIntervalDays: 28 } // Max 24 weeks
            ]
        },
        "rotateq": {
            id: "rotateq",
            name: "Rotavirus (RotaTeq - RV5)",
            disease: "Gastroenteritis",
            type: "Live Attenuated (Oral)",
            totalDoses: 3,
            rules: [
                { doseNum: 1, minAgeDays: 42, recommendedAgeDays: 60, maxAgeDays: 104 },
                { doseNum: 2, minAgeDays: 70, recommendedAgeDays: 120, maxAgeDays: 224, minIntervalDays: 28 },
                { doseNum: 3, minAgeDays: 98, recommendedAgeDays: 180, maxAgeDays: 224, minIntervalDays: 28 } // Max 32 weeks
            ]
        },
        "pcv13": {
            id: "pcv13",
            name: "Pneumococcal (Prevenar 13)",
            disease: "Pneumococcal Disease",
            type: "Conjugate",
            totalDoses: 4,
            rules: [
                { doseNum: 1, minAgeDays: 42, recommendedAgeDays: 60 },
                { doseNum: 2, minAgeDays: 70, recommendedAgeDays: 120, minIntervalDays: 28 },
                { doseNum: 3, minAgeDays: 98, recommendedAgeDays: 180, minIntervalDays: 28 },
                { doseNum: 4, minAgeDays: 365, recommendedAgeDays: 450, minIntervalDays: 56 } // Booster at 12-15m
            ]
        },
        "hepa": {
            id: "hepa",
            name: "Hepatitis A",
            disease: "Hepatitis A Infection",
            type: "Inactivated",
            totalDoses: 2,
            rules: [
                { doseNum: 1, minAgeDays: 365, recommendedAgeDays: 365 }, // Min 1 year
                { doseNum: 2, minAgeDays: 545, recommendedAgeDays: 545, minIntervalDays: 180 } // 6 months after 1st
            ]
        },
        "varicella": {
            id: "varicella",
            name: "Varicella (Chickenpox)",
            disease: "Varicella Zoster",
            type: "Live Attenuated",
            totalDoses: 2,
            rules: [
                { doseNum: 1, minAgeDays: 365, recommendedAgeDays: 365 }, // 12-15 months
                { doseNum: 2, minAgeDays: 1460, recommendedAgeDays: 1460, minIntervalDays: 90 } // 4-6 years
            ]
        }
    }
};
