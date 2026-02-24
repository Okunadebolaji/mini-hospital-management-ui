
export interface AdmissionDto {
  admissionId: number;
  patientName: string;
  reason: string;
  room: string;
  date: string; // ISO string from backend
}
