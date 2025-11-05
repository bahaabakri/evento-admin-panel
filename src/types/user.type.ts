import { UserStatus } from "@/enums/user-status.enum";
export interface User {
  id: number;
  email: string;
  isVerified: boolean;
  role: string;
  status: UserStatus;
  firstname: string;
  lastname: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  rejectionReason?:string
}
