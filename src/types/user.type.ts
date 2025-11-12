import { UserStatus } from "@/enums/user-status.enum";
import { MyEvent } from "@/pages/Events/events.type";
import { Permission } from "@/pages/Permissions/permissions.type";
import { Role } from "@/pages/Roles/roles.type";
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
  roles: Role[];
  createdEvents: MyEvent[]
  permissions: Permission[]
  // tickets: Ticket[]
}
