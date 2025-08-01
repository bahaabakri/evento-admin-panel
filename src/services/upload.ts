import {request} from "@/services/api";
import type { UploadImagesResponse, RequestIntentResponse, DeleteImageResponse } from "@/types/upload.type";

export function requestUploadIntent() {
    return request<RequestIntentResponse>('post', 'upload-image/intent', {})
}

export function uploadImages(key:string, images:FileList) {
    const formData = new FormData();
    formData.append('key', key)
    for(let i=0; i< images.length; i++) {
        formData.append('images', images[i]);
    }
    return request<UploadImagesResponse>('post', 'upload-image/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
    })
}

export function deleteImage(id:number) {
    console.log(id);
    
    return request<DeleteImageResponse>('delete', `upload-image/image/${id}`)
}