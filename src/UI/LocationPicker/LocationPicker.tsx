import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import classes from './LocationPicker.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import { IconCurrentLocation, IconMapPinFilled } from '@tabler/icons-react';
import { renderToString } from 'react-dom/server';

const fallbackPosition = { lat: 25.276987, lng: 55.296249 }; // Dubai

// // Fix marker icon loading
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
// });
const svgHTML = renderToString(<IconMapPinFilled size={32} color="var(--primary-color)" />);
const tablerIconMarker = L.divIcon({
  html: svgHTML,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
function LocationUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng]);

  return null;
}
function MapClickHandler({ onMapClick }: { onMapClick: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({
    click: (e) => onMapClick(e),
  });
  return null;
}
export default function LocationPicker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState(fallbackPosition);

  // 🛰️ Automatically get current location on mount
  useEffect(() => {
    handleGetLocation()
  }, []);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPosition({ lat, lng });
    onSelect(lat, lng);
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition({ lat, lng });
        onSelect(lat, lng);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setPosition(fallbackPosition);
        onSelect(fallbackPosition.lat, fallbackPosition.lng);
      }
    );
  };

  return (
    <>


      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        style={{ height: '400px', width: '100%', position: 'relative' }}
      >
        <CustomButton onClick={handleGetLocation} className={`${classes.currentPosition}`}>
            <IconCurrentLocation />
        </CustomButton>
        <MapClickHandler onMapClick={handleMapClick} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]} icon={tablerIconMarker} />
        <LocationUpdater lat={position.lat} lng={position.lng} />
      </MapContainer>
    </>
  );
}