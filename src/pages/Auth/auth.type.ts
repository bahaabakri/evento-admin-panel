import { User } from "@/types/user.type";

export interface VerifyOtpResponse {
  user: User;
  message: string;
  access_token: string;
}