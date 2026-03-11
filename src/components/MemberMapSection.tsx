import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Users, ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { cityCoordinates } from "@/data/city-coordinates";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

interface LocationData {
  country: string;
  city: string;
  member_count: number;
}

interface CityMarker {
  key: string;
  city: string;
  country: string;
  count: number;
  coordinates: [number, number];
}

interface CountryMarker {
  country: string;
  count: number;
  center: [number, number];
  cities: CityMarker[];
}

const EUROPE_CENTER: [number, number] = [52, 10];
const EUROPE_ZOOM = 4;

const FlyTo = ({ center, zoom, onZoomChange, onMoveEnd }: { center: [number, number]; zoom: number; onZoomChange: (z: number) => void; onMoveEnd?: (center: [number, number], zoom: number) => void }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  useEffect(() => {
    const zoomHandler = () => onZoomChange(map.getZoom());
    const moveHandler = () => {
      const c = map.getCenter();
      onMoveEnd?.([c.lat, c.lng], map.getZoom());
    };
    map.on("zoomend", zoomHandler);
    map.on("moveend", moveHandler);
    onZoomChange(map.getZoom());
    return () => { map.off("zoomend", zoomHandler); map.off("moveend", moveHandler); };
  }, [map, onZoomChange, onMoveEnd]);
  return null;
};

const InvalidateSize = ({ trigger }: { trigger: boolean }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [trigger, map]);
  return null;
};

const MemberMapSection = () => {
  const [cityMarkers, setCityMarkers] = useState<CityMarker[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(EUROPE_ZOOM);
  const [flyTarget, setFlyTarget] = useState<{ center: [number, number]; zoom: number }>({
    center: EUROPE_CENTER,
    zoom: EUROPE_ZOOM,
  });
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Escape key to exit fullscreen
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.rpc("get_member_locations");
      if (error || !data) {
        setLoading(false);
        return;
      }

      const raw = data as LocationData[];
      const countries = new Set<string>();
      let total = 0;
      const mapped: CityMarker[] = [];

      for (const row of raw) {
        total += row.member_count;
        countries.add(row.country);
        const coords = cityCoordinates[`${row.country}|${row.city}`];
        if (coords) {
          mapped.push({
            key: `${row.country}|${row.city}`,
            city: row.city,
            country: row.country,
            count: row.member_count,
            coordinates: coords,
          });
        }
      }

      setCityMarkers(mapped);
      setTotalMembers(total);
      setCountryCount(countries.size);
      setLoading(false);
    };

    fetchLocations();
  }, []);

  const countryMarkers = useMemo<CountryMarker[]>(() => {
    const grouped = new Map<string, { count: number; cities: CityMarker[] }>();
    for (const cm of cityMarkers) {
      const entry = grouped.get(cm.country) || { count: 0, cities: [] };
      entry.count += cm.count;
      entry.cities.push(cm);
      grouped.set(cm.country, entry);
    }
    const result: CountryMarker[] = [];
    for (const [country, { count, cities }] of grouped) {
      const avgLat = cities.reduce((s, c) => s + c.coordinates[1], 0) / cities.length;
      const avgLng = cities.reduce((s, c) => s + c.coordinates[0], 0) / cities.length;
      result.push({ country, count, center: [avgLat, avgLng], cities });
    }
    return result;
  }, [cityMarkers]);

  if (loading || cityMarkers.length === 0) return null;

  const zoomScale = Math.min(1, currentZoom / EUROPE_ZOOM);

  const maxCountryCount = Math.max(...countryMarkers.map((m) => m.count));
  const getCountryRadius = (count: number) => {
    const min = 4;
    const max = 12;
    const base = maxCountryCount <= 1 ? min : min + ((count - 1) / (maxCountryCount - 1)) * (max - min);
    return Math.max(2, base * zoomScale);
  };

  const mapContent = (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[9999] bg-background"
          : "relative max-w-5xl mx-auto rounded-2xl border-2 border-border overflow-hidden"
      }
    >
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="gap-1.5 bg-background/90 backdrop-blur-sm"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {isFullscreen ? "Exit" : "Fullscreen"}
        </Button>
      </div>
      {!isDefaultView && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setFlyTarget({ center: EUROPE_CENTER, zoom: EUROPE_ZOOM });
            setIsDefaultView(true);
          }}
          className="absolute top-4 left-4 z-[1000] gap-1.5 bg-background/90 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Europe
        </Button>
      )}

      <MapContainer
        center={EUROPE_CENTER}
        zoom={EUROPE_ZOOM}
        minZoom={3}
        maxZoom={12}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        worldCopyJump={false}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%", minHeight: isFullscreen ? "100vh" : "520px" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          noWrap={true}
        />
        <FlyTo center={flyTarget.center} zoom={flyTarget.zoom} onZoomChange={setCurrentZoom} onMoveEnd={(c, z) => {
          const dist = Math.abs(c[0] - EUROPE_CENTER[0]) + Math.abs(c[1] - EUROPE_CENTER[1]);
          setIsDefaultView(dist < 2 && Math.abs(z - EUROPE_ZOOM) <= 1);
        }} />
        <InvalidateSize trigger={isFullscreen} />

        {countryMarkers.map((marker) => (
            <CircleMarker
              key={marker.country}
              center={marker.center}
              radius={getCountryRadius(marker.count)}
              pathOptions={{
                fillColor: "hsl(210, 80%, 50%)",
                fillOpacity: 0.7,
                color: "hsl(210, 80%, 40%)",
                weight: 1.5,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]}>
                <div className="text-center">
                  <p className="font-bold text-sm">{marker.country}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Users className="h-3 w-3 inline" /> {marker.count} member{marker.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            <Globe className="h-4 w-4" />
            Our Global Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Members Around the World
          </h2>
        </div>

        {isFullscreen ? createPortal(mapContent, document.body) : mapContent}
      </div>
    </section>
  );
};

export default MemberMapSection;
