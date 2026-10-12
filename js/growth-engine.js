/**
 * File: js/growth-engine.js
 * Description: Comprehensive pediatric growth engine (Calculations & Interpretation).
 * Follows WHO and CDC standards for Z-score and Percentile calculations.
 */

import { GrowthData } from './growth-data.js';

export class GrowthCalculator {
    
    // 1. حساب العمر بالشهور مع دعم العمر المصحح للخدج
    static getExactAgeInMonths(dobString, visitDateObj = new Date(), gestationalWeeks = 40) {
        if (!dobString || dobString === '--') return null;
        const dob = new Date(dobString);
        const visit = new Date(visitDateObj);
        
        let diffMs = visit.getTime() - dob.getTime();
        let ageInMonths = diffMs / (1000 * 60 * 60 * 24 * 30.4375);
        
        // تصحيح العمر للخدج (إذا كان أقل من 37 أسبوع والعمر الزمني أقل من 24 شهراً)
        if (gestationalWeeks < 37 && ageInMonths < 24) {
            const weeksPremature = 40 - gestationalWeeks;
            const correctionMonths = weeksPremature * (7 / 30.4375);
            ageInMonths -= correctionMonths;
        }
        
        return Math.max(0, ageInMonths);
    }

    // 2. حساب Z-score بناءً على معادلة LMS
    static calculateZScore(measurement, l, m, s) {
        if (!measurement || !m || !s) return null;
        let z;
        if (l === 0) {
            z = Math.log(measurement / m) / s;
        } else {
            z = (Math.pow(measurement / m, l) - 1) / (l * s);
        }
        
        // تقييد النتائج المتطرفة (WHO recommends max +/- 5 for biological plausibility)
        if (z > 5) z = 5;
        if (z < -5) z = -5;
        
        return parseFloat(z.toFixed(2));
    }

    // 3. تحويل Z-Score إلى Percentile
    static zScoreToPercentile(z) {
        if (z === null || isNaN(z)) return null;
        const zAbs = Math.abs(z);
        const p = 1 + zAbs * (0.0498673470 + zAbs * (0.0211410061 + zAbs * (0.0032776263 + zAbs * (0.0000380036 + zAbs * (0.0000488906 + zAbs * 0.0000053830)))));
        const p1 = 1 / Math.pow(p, 16);
        let prob = 1 - (p1 / 2);
        if (z < 0) prob = 1 - prob;
        return parseFloat((prob * 100).toFixed(1));
    }

    // 4. التفسير السريري للنتائج (Clinical Interpretation)
    static interpretResult(indicator, zScore, percentile) {
        if (zScore === null) return "بيانات غير كافية للتقييم";
        
        if (indicator === 'WFA') {
            if (zScore <= -3) return "نقص شديد في الوزن (يحتاج تقييم عاجل)";
            if (zScore <= -2) return "نقص في الوزن (تحت المئين الثالث)";
            if (zScore > 2) return "وزن زائد بالنسبة للعمر";
            return "وزن طبيعي";
        }
        if (indicator === 'LFA' || indicator === 'HFA') {
            if (zScore <= -3) return "قصر قامة شديد (Stunting)";
            if (zScore <= -2) return "قصر قامة (تحت المئين الثالث)";
            return "طول طبيعي";
        }
        if (indicator === 'BMI' || indicator === 'WFL') {
            if (zScore <= -3) return "هزال شديد (Severe Wasting)";
            if (zScore <= -2) return "هزال (Wasting)";
            if (zScore >= 1 && zScore < 2) return "خطر السمنة (Overweight risk)";
            if (zScore >= 2 && zScore < 3) return "سمنة (Obesity)";
            if (zScore >= 3) return "سمنة مفرطة (Severe Obesity)";
            return "مؤشر كتلة / تناسب طبيعي";
        }
        if (indicator === 'HCFA') {
            if (zScore <= -2) return "صغر حجم الرأس (Microcephaly)";
            if (zScore >= 2) return "كبر حجم الرأس (Macrocephaly)";
            return "محيط رأس طبيعي";
        }
        return "غير محدد";
    }

    // 5. الدالة الرئيسية للتقييم
    static evaluateMeasurement(indicator, measurement, ageMonths, gender, reference = 'WHO') {
        const genKey = (gender === 'ذكر' || gender === 'Male' || gender === 'M') ? 'M' : 'F';
        
        // محاولة جلب الجداول المرجعية
        const refTables = GrowthData[reference]?.[indicator]?.[genKey];
        if (!refTables) {
            return { error: "الجداول المرجعية غير محملة لهذا المؤشر." };
        }

        // إيجاد أقرب عمر بالشهور في الجدول (للتبسيط، في النظام الكامل نستخدم Interpolation)
        const roundedMonth = Math.round(ageMonths);
        const lms = refTables[roundedMonth];
        
        if (!lms) {
            return { error: `البيانات المرجعية لعمر ${roundedMonth} شهر غير متوفرة في العينة الحالية.` };
        }

        const zScore = this.calculateZScore(measurement, lms.l, lms.m, lms.s);
        const percentile = this.zScoreToPercentile(zScore);
        const interpretation = this.interpretResult(indicator, zScore, percentile);

        return {
            zScore,
            percentile,
            interpretation,
            referenceUsed: reference,
            lmsUsed: lms
        };
    }
}

// دالة مبسطة للرسم للحفاظ على عمل الواجهة (استكمالاً للملف)
export class GrowthChartRenderer {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.chartInstance = null;
    }
    render(indicator, patientData) {
        const canvas = document.getElementById(this.canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (this.chartInstance) this.chartInstance.destroy();
        patientData.sort((a, b) => a.x - b.x);
        
        const config = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'مسار نمو الطفل', data: patientData,
                    borderColor: '#2563eb', backgroundColor: '#2563eb',
                    borderWidth: 3, pointRadius: 5, fill: false, tension: 0.1
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    x: { type: 'linear', title: { display: true, text: 'العمر (بالأشهر)' }, min: 0 },
                    y: { title: { display: true, text: 'القياس' } }
                }
            }
        };
        this.chartInstance = new Chart(ctx, config);
    }
}
