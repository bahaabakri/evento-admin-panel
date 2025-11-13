import type { Pagination } from "@/types/pagination.type";
import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";

type MyEvent = {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  lng: number;
  lat: number;
  isActive: boolean;
  isApproved: boolean;
  images: SelectedImage[];
  createdAt: Date;
  updatedAt: Date;
  createdAdminId: number;
  plans: MyEventPlan[];
};

type MyEventPlan = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  event: MyEvent;
};
export {MyEvent, MyEventPlan}