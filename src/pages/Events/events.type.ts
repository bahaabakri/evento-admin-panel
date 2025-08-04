import type { Pagination } from "@/types/pagination.type";
import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";

export interface MyEvent {
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
}

export interface MyEventResponse {
    data: MyEvent[];
    meta: Pagination;
}