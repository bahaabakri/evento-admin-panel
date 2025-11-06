import { BASE_URL } from "@/services/api";

export function renderImage(
  imageData: any,
  urlKey: string = "url",
  nameKey: string = "name",
  className: string = "w-12 h-12 object-contain rounded-md border border-gray-200 bg-gray-50"
) {
  const fallbackSrc = "/small-image-placeholder.png";

  const imageObj = Array.isArray(imageData) ? imageData[0] : imageData;
  const imageUrl = imageObj?.[urlKey]
    ? `${BASE_URL}${imageObj[urlKey]}`
    : fallbackSrc;
  const altText = imageObj?.[nameKey] || "Image not available";

  return (
    <img
      className={className}
      src={imageUrl}
      alt={altText}
      onError={(e) => {
        if (e.currentTarget.src !== window.location.origin + fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
      draggable={false}
    />
  );
}
