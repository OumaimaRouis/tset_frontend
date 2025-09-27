import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface RouteData {
  start: string;
  pickup: string;
  dropoff: string;
  distance_km: number;
  duration_hours: number;
  geometry: [number, number][]; // [lat, lng]
}

interface MapWithRouteProps {
  route: RouteData;
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ route }) => {
  if (!route.geometry || route.geometry.length === 0) {
    return <p>No route data available</p>;
  }

  const polyline = route.geometry.map(([lat, lng]) => [lat, lng]) as [number, number][];
  const startPoint = polyline[0];
  const endPoint = polyline[polyline.length - 1];

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <MapContainer center={startPoint} zoom={6} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Polyline positions={polyline} color="blue" weight={4} />
      <Marker position={startPoint} icon={customIcon}>
        <Popup>Start: {route.start}</Popup>
      </Marker>
      <Marker position={polyline[Math.floor(polyline.length / 2)]} icon={customIcon}>
        <Popup>Pickup: {route.pickup}</Popup>
      </Marker>
      <Marker position={endPoint} icon={customIcon}>
        <Popup>Dropoff: {route.dropoff}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithRoute;
