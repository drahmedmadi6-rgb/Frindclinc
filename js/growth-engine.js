/**
 * Pediatric Growth Engine
 * يعتمد على معايير WHO و CDC باستخدام جداول LMS المرجعية.
 * Z-Score Formula: Z = (((X / M)^L) - 1) / (L * S) (If L != 0)
 */

export const GrowthEngine = {
    
    // دالة لحساب العمر الدقيق بالأشهر والسنوات
    calculateExactAgeMonths: function(dobString, visitDateString) {
        if (!dobString || !visitDateString) return null;
        const dob = new Date(dobString);
        const visit = new Date(visitDateString);
        const diffMs = visit.getTime() - dob.getTime();
        const days = diffMs / (1000 * 60 * 60 * 24);
        return days / 30.4375; // متوسط أيام الشهر
    },

    // دالة حساب Z-Score بناءً على عوامل L, M, S
    calculateZScore: function(measurement, l, m, s) {
        if (measurement <= 0 || m <= 0 || s <= 0) return null;
        if (l === 0) {
            return Math.log(measurement / m) / s;
        } else {
            return (Math.pow(measurement / m, l) - 1) / (l * s);
        }
    },

    // دالة تحويل Z-score إلى مئين (Percentile)
    // باستخدام دالة الخطأ التراكمي (Error Function Approximation)
    zScoreToPercentile: function(z) {
        if (z === null) return null;
        // Constants
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;

        // Save the sign of z
        let sign = 1;
        if (z < 0) sign = -1;
        z = Math.abs(z) / Math.SQRT2;

        // A&S formula 7.1.26
        const t = 1.0 / (1.0 + p * z);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

        const erf = sign * y;
        const percent = 0.5 * (1.0 + erf) * 100;
        return percent.toFixed(1);
    },

    // حساب الـ BMI
    calculateBMI: function(weightKg, heightCm) {
        if (!weightKg || !heightCm || heightCm <= 0) return null;
        const heightM = heightCm / 100;
        return (weightKg / (heightM * heightM)).toFixed(2);
    }
    
    // ملاحظة برمجية: 
    // لربط هذا المحرك بشكل كامل، سيتم تحميل ملفات JSON تحتوي على مصفوفات الـ LMS الرسمية
    // وسيتم تمرير الـ Age والـ Gender لهذه المصفوفة لاستخراج L, M, S ثم تمريرها لدالة calculateZScore.
};
