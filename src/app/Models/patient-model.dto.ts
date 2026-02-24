export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string;
  userId: number;
  user?: any;
  patientAdmissions: any[];
}
