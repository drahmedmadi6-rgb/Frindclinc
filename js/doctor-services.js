import { db, storage } from "./firebase-config.js";
import { collection, doc, getDoc, getDocs, query, where, updateDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

const APPOINTMENTS_COL = "appointments";
const PATIENTS_COL = "patients";
const VISITS_COL = "visits";
const FILES_COL = "files";

// Fetch today's appointments for the Doctor Dashboard
export async function getTodayDoctorAppointments(dateStr) {
    const q = query(collection(db, APPOINTMENTS_COL), where("date", "==", dateStr));
    const snap = await getDocs(q);
    let apps = [];
    snap.forEach(doc => apps.push({ id: doc.id, ...doc.data() }));
    return apps;
}

// Fetch Full Patient Profile
export async function getPatientProfile(patientId) {
    const docSnap = await getDoc(doc(db, PATIENTS_COL, patientId));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Start or Resume a Consultation (Visit)
export async function initOrGetVisit(appointmentId, patientId, mrn) {
    const visitRef = doc(db, VISITS_COL, appointmentId); // 1:1 relation with appointment
    const visitSnap = await getDoc(visitRef);
    
    if (!visitSnap.exists()) {
        // Create new Draft Visit
        const newVisit = {
            visitId: appointmentId,
            appointmentId, patientId, mrn,
            status: "Draft",
            createdAt: serverTimestamp(),
            consultationStartedAt: new Date().toISOString(),
            medications: [],
            files: []
        };
        await setDoc(visitRef, newVisit);
        
        // Update Appointment Status to "In Consultation"
        await updateDoc(doc(db, APPOINTMENTS_COL, appointmentId), { status: "In Consultation" });
        
        return newVisit;
    }
    return { id: visitSnap.id, ...visitSnap.data() };
}

// Save Visit Data (Draft or Complete)
export async function saveVisitData(visitId, data, isComplete = false) {
    const visitRef = doc(db, VISITS_COL, visitId);
    let payload = {
        ...data,
        updatedAt: serverTimestamp()
    };
    
    if (isComplete) {
        payload.status = "Completed";
        payload.consultationEndedAt = new Date().toISOString();
    }
    
    await updateDoc(visitRef, payload);
    
    if (isComplete) {
        await updateDoc(doc(db, APPOINTMENTS_COL, visitId), { status: "Completed" });
    }
}

// Get Previous Visits for a Patient
export async function getPreviousVisits(patientId, currentVisitId) {
    const q = query(collection(db, VISITS_COL), where("patientId", "==", patientId), where("status", "==", "Completed"));
    const snap = await getDocs(q);
    let visits = [];
    snap.forEach(d => {
        if (d.id !== currentVisitId) visits.push({ id: d.id, ...d.data() });
    });
    return visits.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Upload File to Firebase Storage & save metadata
export async function uploadMedicalFile(file, patientId, visitId, onProgress) {
    const filePath = `patients/${patientId}/${visitId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(progress);
            }, 
            (error) => reject(error), 
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                // Save metadata
                const fileMeta = {
                    patientId, visitId, 
                    fileName: file.name, fileType: file.type,
                    downloadURL, uploadedAt: serverTimestamp()
                };
                const docRef = doc(collection(db, FILES_COL));
                await setDoc(docRef, fileMeta);
                resolve(fileMeta);
            }
        );
    });
}

