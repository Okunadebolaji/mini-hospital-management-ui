import { AdmissionDto } from "./Admission.dto";
export interface DoctorWithAdmissionsDto {
  doctorId: number;
  userId: number;
  roleId: number;
  name: string;
  specialty: string;
  admissions: AdmissionDto[];
  phone?: string;   // ✅ add
  email?: string;   // ✅ add
  profileImageUrl?: string;
}
