import * as UI from "./doctor-ui.js";
import * as DB from "./doctor-services.js";

// Global State
let currentVisitId = null;
let currentPatientId = null;
let currentMRN = null;
let currentMedications = [];
let currentFiles = [];

document.addEventListener("DOMContentLoaded", () => {
    UI.setupTabs();
    
    // Sidebar Nav - Secure Binding
    const dashboardNavBtn = document.querySelector('[data-target="dashboardSection"]');
    if (dashboardNavBtn) {
        dashboardNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            UI.showSection('dashboardSection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            loadDashboard();
        });
    }

    const btnRefreshToday = document.getElementById('btnRefreshToday');
    if (btnRefreshToday) {
        btnRefreshToday.addEventListener('click', loadDashboard);
    }

    // Load Dashboard
    async function loadDashboard() {
        UI.showLoading("جاري تحميل العيادة...");
        try {
            const apps = await DB.getTodayDoctorAppointments(UI.getTodayStr());
            const tbody = document.querySelector('#todayTable tbody');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            let wCount=0, cCount=0, dCount=0;

            apps.sort((a,b) => a.time.localeCompare(b.time)).forEach(app => {
                if(app.status === 'Waiting') wCount++;
                if(app.status === 'In Consultation') cCount++;
                if(app.status === 'Completed') dCount++;

                const tr = document.createElement('tr');
                let actionBtn = '';
                
                // Refactored: Removed inline onclick to prevent quoting bugs and XSS
                if(app.status === 'Waiting' || app.status === 'In Consultation') {
                    const encodedComplaint = encodeURIComponent(app.complaint || '');
                    const btnText = app.status === 'Waiting' ? 'بدء الكشف' : 'استكمال الملف';
                    actionBtn = `<button type="button" class="btn-primary btn-small btn-start-visit" 
                        data-appid="${app.id}" 
                        data-patientid="${app.patientId}" 
                        data-mrn="${app.mrn}" 
                        data-complaint="${encodedComplaint}">
                        <i class="fa-solid fa-file-medical"></i> ${btnText}
                    </button>`;
                } else if (app.status === 'Completed') {
                    actionBtn = `<span class="text-muted"><i class="fa-solid fa-check"></i> اكتمل</span>`;
                }

                let badgeClass = app.status === 'In Consultation' ? 'Consulting' : app.status;
                let statusAr = app.status === 'Waiting' ? 'انتظار' : (app.status === 'In Consultation' ? 'داخل الكشف' : 'اكتمل');

                tr.innerHTML = `
                    <td dir="ltr" style="text-align: right;">${app.time}</td>
                    <td><strong>${app.mrn}</strong></td>
                    <td>${app.patientName}</td>
                    <td>${app.complaint || '-'}</td>
                    <td><span class="badge ${badgeClass}">${statusAr}</span></td>
                    <td>${actionBtn}</td>
                `;
                tbody.appendChild(tr);
            });

            // Bind events safely after DOM creation
            document.querySelectorAll('.btn-start-visit').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const d = e.currentTarget.dataset;
                    startConsultation(d.appid, d.patientid, d.mrn, decodeURIComponent(d.complaint));
                });
            });

            // Update Counters safely
            const elWait = document.getElementById('dashWaitingCount');
            const elCons = document.getElementById('dashConsultingCount');
            const elComp = document.getElementById('dashCompletedCount');
            if(elWait) elWait.innerText = wCount;
            if(elCons) elCons.innerText = cCount;
            if(elComp) elComp.innerText = dCount;

        } catch (e) {
            console.error("Dashboard Load Error:", e);
            UI.showToast("خطأ في جلب بيانات اليوم", "error");
        }
        UI.hideLoading();
    }

    // Start Consultation (Standard function, removed from window object)
    async function startConsultation(appId, patientId, mrn, receptionComplaint) {
        UI.showLoading("تجهيز الملف الطبي...");
        try {
            // 1. Fetch Patient
            const patient = await DB.getPatientProfile(patientId);
            if (!patient) throw new Error("Patient not found");
            
            // 2. Init Visit
            const visit = await DB.initOrGetVisit(appId, patientId, mrn);
            
            // 3. Set Globals
            currentVisitId = visit.visitId;
            currentPatientId = patientId;
            currentMRN = mrn;
            currentMedications = visit.medications || [];
            currentFiles = visit.files || []; // Bug fix: properly initialize files

            // 4. Populate Header Safely
            const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
            setVal('phName', patient.fullName || '--');
            setVal('phMRN', mrn);
            setVal('phAge', UI.calculateAge(patient.dob));
            setVal('phGender', patient.gender === 'Male' ? 'ذكر' : 'أنثى');
            setVal('phDOB', patient.dob || '--');
            setVal('phPhone', patient.phone || '--');

            // 5. Populate Form Fields
            const form = document.getElementById('visitForm');
            if(form) form.reset();
            
            const noteSpan = document.querySelector('#receptionComplaintNote span');
            if(noteSpan) noteSpan.innerText = receptionComplaint || 'لا توجد';
            
            const setInput = (id, val) => { const el = document.getElementById(id); if(el) el.value = val || ''; };
            
            setInput('visitComplaint', visit.chiefComplaint);
            if (visit.vitals) {
                setInput('vTemp', visit.vitals.temp);
                setInput('vWeight', visit.vitals.weight);
                setInput('vHeight', visit.vitals.height);
                setInput('vSpo2', visit.vitals.spo2);
            }
            if (visit.history) {
                setInput('hpi', visit.history.hpi);
                setInput('histGestational', visit.history.gestational);
                setInput('histDelivery', visit.history.delivery);
                setInput('histBirthWeight', visit.history.birthWeight);
                setInput('histNICU', visit.history.nicu);
                setInput('histPastFamily', visit.history.pastFamily);
            }
            if (visit.examination) {
                setInput('examGeneral', visit.examination.general);
                setInput('examResp', visit.examination.resp);
                setInput('examCVS', visit.examination.cvs);
                setInput('examAbd', visit.examination.abd);
                setInput('examNeuro', visit.examination.neuro);
            }
            if (visit.diagnoses) {
                setInput('diagPrimary', visit.diagnoses.primary);
                setInput('diagSecondary', visit.diagnoses.secondary);
            }
            if (visit.treatmentPlan) {
                setInput('planNotes', visit.treatmentPlan.notes);
                setInput('planFollowupDecision', visit.treatmentPlan.followUpDecision || 'None');
                setInput('planFollowupDate', visit.treatmentPlan.followUpDate);
                
                // Trigger change event to show/hide date input if UI script expects it
                const decisionEl = document.getElementById('planFollowupDecision');
                if(decisionEl) decisionEl.dispatchEvent(new Event('change'));
            }

            // Render sub-components
            renderMedicationsTable();
            renderFilesList();
            loadPreviousVisits();

            UI.showSection('consultationSection');
            
            // Focus first tab automatically
            const firstTab = document.querySelector('[data-tab="tab-overview"]');
            if(firstTab) firstTab.click();
            
            // Scroll top for mobile workflow
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (e) {
            console.error("Consultation Init Error:", e);
            UI.showToast("حدث خطأ في فتح الملف", "error");
        }
        UI.hideLoading();
    }

    // Medication Logic (Refactored)
    const btnAddMed = document.getElementById('btnAddMed');
    if (btnAddMed) {
        btnAddMed.addEventListener('click', () => {
            const nameEl = document.getElementById('medName');
            const doseEl = document.getElementById('medDose');
            const durationEl = document.getElementById('medDuration');
            const notesEl = document.getElementById('medNotes');

            const name = nameEl?.value.trim();
            const dose = doseEl?.value.trim();
            const duration = durationEl?.value.trim();
            const notes = notesEl?.value.trim();

            if(!name) { 
                UI.showToast("يرجى كتابة اسم الدواء", "error"); 
                nameEl?.focus();
                return; 
            }

            currentMedications.push({ name, dose, duration, notes });
            renderMedicationsTable();
            
            // Clear inputs securely
            if(nameEl) nameEl.value = '';
            if(doseEl) doseEl.value = '';
            if(durationEl) durationEl.value = '';
            if(notesEl) notesEl.value = '';
        });
    }

    // Event Delegation for remove buttons (Replaces inline onclick)
    const medsTbody = document.querySelector('#medsTable tbody');
    if (medsTbody) {
        medsTbody.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.btn-remove-med');
            if (removeBtn) {
                const index = parseInt(removeBtn.dataset.index);
                if (!isNaN(index)) {
                    currentMedications.splice(index, 1);
                    renderMedicationsTable();
                }
            }
        });
    }

    function renderMedicationsTable() {
        if (!medsTbody) return;
        medsTbody.innerHTML = '';
        
        if (currentMedications.length === 0) {
            medsTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;" class="text-muted">لا توجد أدوية مضافة</td></tr>`;
            return;
        }

        currentMedications.forEach((med, i) => {
            medsTbody.innerHTML += `
                <tr>
                    <td><strong>${med.name}</strong></td>
                    <td>${med.dose || '-'}</td>
                    <td>${med.duration || '-'}</td>
                    <td>${med.notes || '-'}</td>
                    <td>
                        <button type="button" class="btn-danger btn-small btn-remove-med" data-index="${i}" style="background:#ef4444; color:#fff; border:none; padding:6px 10px; border-radius:4px;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    // Files List Render Logic (New feature to show existing files)
    function renderFilesList() {
        const ul = document.getElementById('filesList');
        if (!ul) return;
        ul.innerHTML = '';
        
        currentFiles.forEach((file) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><i class="fa-solid fa-file-medical text-primary"></i> ${file.fileName}</span> 
                <a href="${file.downloadURL || file.url}" target="_blank" class="btn-small btn-secondary" style="text-decoration:none;"><i class="fa-solid fa-eye"></i> عرض</a>
            `;
            ul.appendChild(li);
        });
    }

    // Build Data Object
    function buildVisitDataObject() {
        const getVal = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
        
        return {
            chiefComplaint: getVal('visitComplaint'),
            vitals: {
                temp: getVal('vTemp'),
                weight: getVal('vWeight'),
                height: getVal('vHeight'),
                spo2: getVal('vSpo2')
            },
            history: {
                hpi: getVal('hpi'),
                gestational: getVal('histGestational'),
                delivery: getVal('histDelivery'),
                birthWeight: getVal('histBirthWeight'),
                nicu: getVal('histNICU'),
                pastFamily: getVal('histPastFamily')
            },
            examination: {
                general: getVal('examGeneral'),
                resp: getVal('examResp'),
                cvs: getVal('examCVS'),
                abd: getVal('examAbd'),
                neuro: getVal('examNeuro')
            },
            diagnoses: {
                primary: getVal('diagPrimary'),
                secondary: getVal('diagSecondary')
            },
            medications: currentMedications,
            files: currentFiles, // CRITICAL FIX: Files are now correctly saved to DB
            investigations: getVal('invText'),
            treatmentPlan: {
                notes: getVal('planNotes'),
                followUpDecision: getVal('planFollowupDecision'),
                followUpDate: getVal('planFollowupDate')
            }
        };
    }

    // Save Draft
    const btnSaveDraft = document.getElementById('btnSaveDraft');
    if (btnSaveDraft) {
        btnSaveDraft.addEventListener('click', async (e) => {
            const btn = e.currentTarget;
            btn.disabled = true; // Prevent double clicks
            UI.showLoading("جاري الحفظ...");
            try {
                const data = buildVisitDataObject();
                await DB.saveVisitData(currentVisitId, data, false);
                UI.showToast("تم الحفظ كمسودة بنجاح");
            } catch(error) { 
                console.error("Save Draft Error:", error); 
                UI.showToast("خطأ في الحفظ", "error"); 
            } finally {
                btn.disabled = false;
                UI.hideLoading();
            }
        });
    }

    // Complete Visit
    const btnCompleteVisit = document.getElementById('btnCompleteVisit');
    if (btnCompleteVisit) {
        btnCompleteVisit.addEventListener('click', async (e) => {
            const diagPrimary = document.getElementById('diagPrimary')?.value.trim();
            if(!diagPrimary) {
                UI.showToast("يجب إدخال التشخيص الأساسي (Primary Diagnosis)", "error");
                document.querySelector('[data-tab="tab-diagnosis"]')?.click();
                return;
            }

            // Follow-up Date validation
            const fDecision = document.getElementById('planFollowupDecision')?.value;
            const fDate = document.getElementById('planFollowupDate')?.value;
            if (fDecision === 'Required' && !fDate) {
                UI.showToast("الرجاء تحديد تاريخ الاستشارة أو الإعادة", "error");
                document.querySelector('[data-tab="tab-plan"]')?.click();
                return;
            }

            if(confirm("تأكيد إنهاء الكشف الطبي؟ لن تتمكن من التعديل بسهولة بعد الإنهاء.")) {
                const btn = e.currentTarget;
                btn.disabled = true;
                UI.showLoading("جاري إنهاء الكشف...");
                try {
                    const data = buildVisitDataObject();
                    await DB.saveVisitData(currentVisitId, data, true);
                    UI.showToast("تم إنهاء الكشف بنجاح");
                    UI.showSection('dashboardSection');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    loadDashboard();
                } catch(error) { 
                    console.error("Complete Visit Error:", error); 
                    UI.showToast("خطأ أثناء الإنهاء", "error"); 
                } finally {
                    btn.disabled = false;
                    UI.hideLoading();
                }
            }
        });
    }

    // Print Rx
    const btnPrintRx = document.getElementById('btnPrintRx');
    if (btnPrintRx) {
        btnPrintRx.addEventListener('click', () => {
            document.getElementById('rxName').innerText = document.getElementById('phName')?.innerText || '';
            document.getElementById('rxAge').innerText = document.getElementById('phAge')?.innerText || '';
            document.getElementById('rxDate').innerText = UI.getTodayStr();
            
            const rxTbody = document.querySelector('#rxTable tbody');
            if (rxTbody) {
                rxTbody.innerHTML = '';
                if (currentMedications.length === 0) {
                    rxTbody.innerHTML = `<tr><td style="border:none; text-align:center; padding: 20px;">استشارة / نصائح طبية فقط</td></tr>`;
                } else {
                    currentMedications.forEach(med => {
                        rxTbody.innerHTML += `<tr>
                            <td>
                                <strong>${med.name}</strong><br>
                                <small style="color:#555;">${med.dose || ''} ${med.duration ? '- ' + med.duration : ''}</small><br>
                                ${med.notes ? `<i style="color:#000;">الملاحظات: ${med.notes}</i>` : ''}
                            </td>
                        </tr>`;
                    });
                }
            }
            
            const rxNotesEl = document.getElementById('rxNotes');
            if (rxNotesEl) rxNotesEl.innerText = document.getElementById('planNotes')?.value || '';
            
            const fDecision = document.getElementById('planFollowupDecision')?.value;
            const fDate = document.getElementById('planFollowupDate')?.value;
            const rxNextVisitEl = document.getElementById('rxNextVisit');
            if (rxNextVisitEl) {
                rxNextVisitEl.innerHTML = (fDecision === 'Required' && fDate) ? `<strong>الاستشارة / الإعادة:</strong> ${fDate}` : '';
            }

            window.print();
        });
    }

    // Load Previous Visits Timeline (Safe Date Parsing)
    async function loadPreviousVisits() {
        const container = document.getElementById('previousVisitsContainer');
        if (!container) return;
        
        container.innerHTML = '<p class="text-muted"><i class="fa-solid fa-spinner fa-spin"></i> جاري تحميل التاريخ المرضي...</p>';
        try {
            const visits = await DB.getPreviousVisits(currentPatientId, currentVisitId);
            if(visits.length === 0) {
                container.innerHTML = '<p class="text-muted">لا توجد زيارات سابقة مكتملة لهذا المريض.</p>';
                return;
            }
            
            container.innerHTML = '';
            visits.forEach(v => {
                const diag = v.diagnoses?.primary || 'غير مسجل';
                
                // Safe date extraction (handling Firestore timestamp or JS Date)
                let dateStr = '--';
                if (v.createdAt) {
                    const dateObj = typeof v.createdAt.toDate === 'function' ? v.createdAt.toDate() : new Date(v.createdAt);
                    if (!isNaN(dateObj)) dateStr = dateObj.toLocaleDateString('ar-EG');
                }
                
                const medsText = v.medications && v.medications.length > 0 ? v.medications.map(m=>m.name).join('، ') : 'لا يوجد';
                
                container.innerHTML += `
                    <div class="timeline-item" style="border:1px solid var(--border-color); padding:15px; margin-bottom:10px; border-radius:8px; background: #f8fafc;">
                        <strong><i class="fa-regular fa-calendar"></i> ${dateStr}</strong>
                        <p class="text-primary mt-10" style="margin: 8px 0;"><strong>التشخيص:</strong> ${diag}</p>
                        <p style="margin:0; font-size:0.9rem; color:var(--text-muted);"><strong>الشكوى:</strong> ${v.chiefComplaint || '-'}</p>
                        <p style="margin:5px 0 0 0; font-size:0.9rem; color:var(--text-muted);"><strong>الأدوية:</strong> ${medsText}</p>
                    </div>
                `;
            });
        } catch(e) {
            console.error("Load Previous Visits Error:", e);
            container.innerHTML = '<p class="text-danger">خطأ في تحميل التاريخ المرضي.</p>';
        }
    }

    // Upload File Logic (Fix applied for data retention)
    const btnUploadFile = document.getElementById('btnUploadFile');
    if (btnUploadFile) {
        btnUploadFile.addEventListener('click', async (e) => {
            const fileInput = document.getElementById('fileUpload');
            const file = fileInput?.files[0];
            
            if(!file) {
                UI.showToast("يرجى اختيار ملف أولاً", "error");
                return;
            }

            const statusLabel = document.getElementById('uploadStatus');
            if(statusLabel) {
                statusLabel.classList.remove('hidden');
                statusLabel.style.color = "var(--primary-color)";
                statusLabel.innerText = "جاري الرفع 0%";
            }

            const btn = e.currentTarget;
            btn.disabled = true; // Prevent multiple uploads

            try {
                const meta = await DB.uploadMedicalFile(file, currentPatientId, currentVisitId, (prog) => {
                    if(statusLabel) statusLabel.innerText = `جاري الرفع ${Math.round(prog)}%`;
                });
                
                if(statusLabel) {
                    statusLabel.innerText = "تم الرفع بنجاح!";
                    statusLabel.style.color = "var(--success-color)";
                }
                
                // CRITICAL FIX: Push metadata to currentFiles to save later in DB
                currentFiles.push({ fileName: meta.fileName, downloadURL: meta.downloadURL });
                renderFilesList(); // Update UI
                
                // Clear input
                if(fileInput) fileInput.value = "";
                
                setTimeout(() => {
                    if(statusLabel) statusLabel.classList.add('hidden');
                }, 4000);
                
            } catch(error) {
                console.error("Upload Error:", error);
                if(statusLabel) {
                    statusLabel.innerText = "فشل الرفع. حاول مجدداً.";
                    statusLabel.style.color = "var(--danger-color)";
                }
            } finally {
                btn.disabled = false;
            }
        });
    }

    // Initialize App
    loadDashboard();
});
