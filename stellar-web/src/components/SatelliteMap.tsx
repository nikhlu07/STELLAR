import { useEffect, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface SatelliteMapProps {
  center?: LatLngExpression;
  zoom?: number;
  farmPolygon?: LatLngExpression[];
  farmName?: string;
}

const SatelliteMap = ({ 
  center = [30.7333, 76.7794], 
  zoom = 13,
  farmPolygon,
  farmName = "Farm Area"
}: SatelliteMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add farm polygon if provided
    if (farmPolygon && farmPolygon.length > 0) {
      const violetColor = "#5C27FE";
      const polygon = L.polygon(farmPolygon, {
        color: violetColor,
        fillColor: violetColor,
        fillOpacity: 0.2,
        weight: 3,
      }).addTo(map);
      
      polygon.bindPopup(farmName);
      
      // Fit bounds to polygon
      map.fitBounds(polygon.getBounds(), { padding: [50, 50] });
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  return (
    <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden border border-border" />
  );
};

export default SatelliteMap;
