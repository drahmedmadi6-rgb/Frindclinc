export function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'dashboardSection') document.getElementById('pageTitle').innerText = "قائمة مرضى اليوم";
    if (sectionId === 'consultationSection') document.getElementById('pageTitle').innerText = "غرفة الكشف الطبي";
}

export function showToast(msg, type = "success") {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.backgroundColor = type === "success" ? "var(--primary-color)" : "#ef4444";
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

export function showLoading(msg = "جاري التحميل...") {
    document.getElementById('loadingText').innerText = msg;
    document.getElementById('loadingOverlay').classList.remove('hidden');
}
export function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

export function calculateAge(dobStr) {
    if (!dobStr) return "--";
    const dob = new Date(dobStr);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
        years--;
        months += 12;
    }
    if (years === 0) return `${months} شهر`;
    if (years === 0 && months === 0) return `حديث ولادة`;
    return `${years} سنة و ${months} شهر`;
}

export function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function setupTabs() {
    const tabs = document.querySelectorAll('#clinicalTabs li');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('#clinicalTabs li').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
            
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.remove('hidden');
        });
    });
}
