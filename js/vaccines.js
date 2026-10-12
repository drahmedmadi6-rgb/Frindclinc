// js/vaccines.js
import { VACCINE_CATALOG } from './vaccines-data.js';

export class VaccineEngine {
    constructor() {
        this.catalog = VACCINE_CATALOG.vaccines;
    }

    // حساب العمر بالأيام بدقة
    calculateAgeInDays(dobStr) {
        if (!dobStr) return null;
        const dob = new Date(dobStr);
        const today = new Date();
        const diffTime = Math.abs(today - dob);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    // تقييم حالة اللقاح للطفل
    evaluateVaccineStatus(vaccineId, patientDobStr, patientHistoryArray) {
        const vaccine = this.catalog[vaccineId];
        if (!vaccine) return { status: "Unknown", alert: "Vaccine not found in catalog" };

        const ageInDays = this.calculateAgeInDays(patientDobStr);
        if (ageInDays === null) return { status: "Needs Review", alert: "Missing Date of Birth" };

        // تصفية التاريخ التطعيمي للطفل لهذا اللقاح تحديداً
        const history = patientHistoryArray.filter(v => v.vaccineId === vaccineId).sort((a, b) => a.doseNum - b.doseNum);
        const dosesGiven = history.length;

        if (dosesGiven >= vaccine.totalDoses) {
            return { status: "Completed", alert: "All doses administered" };
        }

        const nextDoseRule = vaccine.rules[dosesGiven];
        
        // التحقق من الحد الأقصى للعمر (مثال: الروتا)
        if (nextDoseRule.maxAgeDays && ageInDays > nextDoseRule.maxAgeDays) {
            return { status: "Overdue/Ineligible", alert: `Patient exceeded maximum age limit (${nextDoseRule.maxAgeDays} days) for dose ${nextDoseRule.doseNum}.` };
        }

        // التحقق من الفاصل الزمني إذا كانت هناك جرعات سابقة
        if (dosesGiven > 0) {
            const lastDoseDate = new Date(history[dosesGiven - 1].dateGiven);
            const daysSinceLastDose = Math.floor((new Date() - lastDoseDate) / (1000 * 60 * 60 * 24));
            
            if (nextDoseRule.minIntervalDays && daysSinceLastDose < nextDoseRule.minIntervalDays) {
                const eligibleDate = new Date(lastDoseDate);
                eligibleDate.setDate(eligibleDate.getDate() + nextDoseRule.minIntervalDays);
                return { 
                    status: "Upcoming", 
                    alert: `Minimum interval not met. Next dose due after ${eligibleDate.toLocaleDateString('ar-EG')}` 
                };
            }
        }

        // التحقق من الاستحقاق بناءً على العمر
        if (ageInDays >= nextDoseRule.minAgeDays) {
            if (ageInDays > nextDoseRule.recommendedAgeDays + 30) {
                return { status: "Overdue", alert: `Dose ${nextDoseRule.doseNum} is overdue.` };
            }
            return { status: "Due Now", alert: `Dose ${nextDoseRule.doseNum} is currently due.` };
        } else {
            const expectedDate = new Date(patientDobStr);
            expectedDate.setDate(expectedDate.getDate() + nextDoseRule.recommendedAgeDays);
            return { status: "Upcoming", alert: `Expected on ${expectedDate.toLocaleDateString('ar-EG')}` };
        }
    }

    // استخراج تقرير شامل لكل التطعيمات الإضافية للطفل
    generatePatientReport(patientDobStr, patientHistoryArray) {
        let report = [];
        for (const [id, vaccine] of Object.entries(this.catalog)) {
            const evaluation = this.evaluateVaccineStatus(id, patientDobStr, patientHistoryArray);
            report.push({
                vaccineId: id,
                name: vaccine.name,
                status: evaluation.status,
                alert: evaluation.alert,
                dosesGiven: patientHistoryArray.filter(v => v.vaccineId === id).length,
                totalDoses: vaccine.totalDoses
            });
        }
        return report;
    }
}
