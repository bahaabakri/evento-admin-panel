import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import { I } from "framer-motion/dist/types.d-Cjd591yU";

export type HeroResponse = {
    id: number;
    name: string;
    isActive: boolean;
    images: SelectedImage[];
    title: string;
    description: string;
}