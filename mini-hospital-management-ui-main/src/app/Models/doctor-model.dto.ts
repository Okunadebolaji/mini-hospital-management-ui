
export interface Doctor {
  doctorId: number;
  userId: number;
    roleId: number;      
  name: string;
  specialty: string;
  phone: string;
  email: string;
  profileImageUrl?: string; // optional, comes from DoctorProfileImages table
}
