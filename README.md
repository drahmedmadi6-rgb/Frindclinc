## Phase 2: Doctor Dashboard & Medical Record

The Doctor's Interface is a fully integrated medical record system running on the exact same Firebase backend as the Reception module.

### Core Workflow Integration:
1. **Reception** creates an `appointment` and links it to a `patient`. Status is set to `Waiting`.
2. **Doctor Dashboard** queries `appointments` where date = today.
3. Clicking **Start Consultation** creates a dedicated document in the `visits` collection linked to the appointment, and changes the appointment status to `In Consultation`.
4. The Doctor fills the structured medical record (History, Vitals, Exam, Medications).
5. Files (X-Rays, Labs) are uploaded directly to **Firebase Storage** under `/patients/{patientId}/{visitId}/`.
6. Saving as **Draft** keeps status open. **Complete Consultation** locks the visit and moves status to `Completed`, appearing instantly in the Reception Dashboard as finished.

### Print Prescription
The system includes a dedicated `@media print` CSS layout. Clicking "Print Rx" hides the UI and structures the prescribed medications cleanly on an A4/A5 paper layout branded for NEO KIDS.
