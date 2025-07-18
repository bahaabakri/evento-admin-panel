import type { Pagination } from "../../types/pagination.type";

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
    imagesUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    createdAdminId: number;
}

export interface MyEventResponse {
    data: MyEvent[];
    meta: Pagination;
}