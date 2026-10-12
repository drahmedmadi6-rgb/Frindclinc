/**
 * File: js/growth-data.js
 * Description: Storage for WHO & CDC LMS tables.
 * Source: WHO Child Growth Standards (0-5 years) / CDC Growth Charts (2-20 years).
 * NOTE: This file contains a sample core subset (WHO WFA 0-24m) to demonstrate functionality.
 * Full integration requires loading the complete JSON files from official WHO/CDC sources.
 */

export const GrowthData = {
    WHO: {
        // Weight-for-Age (0-24 months) Sample
        WFA: {
            M: { // Male
                0:  { l: 0.1207, m: 3.3464, s: 0.14602 },
                1:  { l: 0.1221, m: 4.4700, s: 0.13395 },
                2:  { l: 0.1165, m: 5.5751, s: 0.12403 },
                3:  { l: 0.1065, m: 6.3941, s: 0.11718 },
                6:  { l: 0.0543, m: 7.9304, s: 0.10626 },
                9:  { l: -0.009, m: 8.9406, s: 0.10228 },
                12: { l: -0.076, m: 9.6385, s: 0.10125 },
                18: { l: -0.198, m: 10.925, s: 0.10237 },
                24: { l: -0.301, m: 12.152, s: 0.10515 }
            },
            F: { // Female
                0:  { l: 0.1481, m: 3.2322, s: 0.14171 },
                1:  { l: 0.1436, m: 4.1950, s: 0.13110 },
                2:  { l: 0.1287, m: 5.1278, s: 0.12249 },
                3:  { l: 0.1098, m: 5.8459, s: 0.11652 },
                6:  { l: 0.0416, m: 7.2995, s: 0.10825 },
                9:  { l: -0.033, m: 8.2198, s: 0.10609 },
                12: { l: -0.106, m: 8.9481, s: 0.10628 },
                18: { l: -0.231, m: 10.155, s: 0.10860 },
                24: { l: -0.329, m: 11.458, s: 0.11246 }
            }
        },
        // Length-for-Age (LFA), HC-for-Age (HCFA), BMI-for-Age (BMI) can be added here
        LFA: { M: {}, F: {} },
        HCFA: { M: {}, F: {} },
        BMI: { M: {}, F: {} }
    },
    CDC: {
        // CDC data for > 2 years goes here
        WFA: { M: {}, F: {} },
        LFA: { M: {}, F: {} },
        BMI: { M: {}, F: {} }
    }
};
