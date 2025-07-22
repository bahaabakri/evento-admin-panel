export type RequestIntentResponse = {
    key:string;
    createdAt: string 
} 

export type UploadImagesResponse = [{
    id:number,
    imagePath:string,
    name: string,
    uploadIntent: RequestIntentResponse
}]

export type DeleteImageResponse = {
    image: UploadImagesResponse[number];
    message: string
}