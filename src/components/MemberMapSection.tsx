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

const FlyTo = ({ center, zoom, onZoomChange }: { center: [number, number]; zoom: number; onZoomChange: (z: number) => void }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  useEffect(() => {
    const handler = () => onZoomChange(map.getZoom());
    map.on("zoomend", handler);
    onZoomChange(map.getZoom());
    return () => { map.off("zoomend", handler); };
  }, [map, onZoomChange]);
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
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ center: [number, number]; zoom: number }>({
    center: EUROPE_CENTER,
    zoom: EUROPE_ZOOM,
  });
  const [explodingCities, setExplodingCities] = useState<string[]>([]);
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

  const handleCountryClick = (cm: CountryMarker) => {
    setSelectedCountry(cm.country);
    setExplodingCities([]);
    const lats = cm.cities.map((c) => c.coordinates[1]);
    const lngs = cm.cities.map((c) => c.coordinates[0]);
    const cLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const cLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
    const spread = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs));
    const zoom = spread < 1 ? 10 : spread < 3 ? 8 : spread < 6 ? 7 : spread < 10 ? 6 : 5;
    setFlyTarget({ center: [cLat, cLng], zoom });
    cm.cities.forEach((city, i) => {
      setTimeout(() => setExplodingCities((prev) => [...prev, city.key]), 300 + i * 120);
    });
  };

  const handleBack = () => {
    setSelectedCountry(null);
    setExplodingCities([]);
    setFlyTarget({ center: EUROPE_CENTER, zoom: EUROPE_ZOOM });
  };

  if (loading || cityMarkers.length === 0) return null;

  const zoomScale = Math.min(1, currentZoom / EUROPE_ZOOM);

  const maxCountryCount = Math.max(...countryMarkers.map((m) => m.count));
  const getCountryRadius = (count: number) => {
    const min = 4;
    const max = 12;
    const base = maxCountryCount <= 1 ? min : min + ((count - 1) / (maxCountryCount - 1)) * (max - min);
    return Math.max(2, base * zoomScale);
  };

  const activeCities = selectedCountry ? cityMarkers.filter((m) => m.country === selectedCountry) : [];
  const maxCityCount = activeCities.length ? Math.max(...activeCities.map((m) => m.count)) : 1;
  const getCityRadius = (count: number) => {
    const min = 4;
    const max = 10;
    const base = maxCityCount <= 1 ? min : min + ((count - 1) / (maxCityCount - 1)) * (max - min);
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
      {selectedCountry && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          className="absolute top-4 left-4 z-[1000] gap-1.5 bg-background/90 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Europe
        </Button>
      )}

      <MapContainer
        center={EUROPE_CENTER}
        zoom={EUROPE_ZOOM}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        style={{ height: "100%", width: "100%", minHeight: isFullscreen ? "100vh" : "520px" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FlyTo center={flyTarget.center} zoom={flyTarget.zoom} onZoomChange={setCurrentZoom} />
        <InvalidateSize trigger={isFullscreen} />

        {!selectedCountry &&
          countryMarkers.map((marker) => (
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
              eventHandlers={{ click: () => handleCountryClick(marker) }}
            >
              <Tooltip direction="top" offset={[0, -8]}>
                <div className="text-center">
                  <p className="font-bold text-sm">{marker.country}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Users className="h-3 w-3 inline" /> {marker.count} member{marker.count !== 1 ? "s" : ""}
                  </p>
                  {marker.cities.length > 1 && (
                    <p className="text-xs text-primary mt-0.5">Click to explore</p>
                  )}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}

        {selectedCountry &&
          activeCities.map((marker) => {
            const isVisible = explodingCities.includes(marker.key);
            return (
              <CircleMarker
                key={marker.key}
                center={[marker.coordinates[1], marker.coordinates[0]]}
                radius={isVisible ? getCityRadius(marker.count) : 0}
                pathOptions={{
                  fillColor: "hsl(210, 90%, 55%)",
                  fillOpacity: isVisible ? 0.8 : 0,
                  color: "hsl(210, 90%, 40%)",
                  weight: 1.5,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <Tooltip direction="top" offset={[0, -6]}>
                  <div className="text-center">
                    <p className="font-bold text-sm">{marker.city}</p>
                    <p className="text-xs text-muted-foreground">{marker.country}</p>
                    <p className="text-xs flex items-center gap-1 justify-center">
                      <Users className="h-3 w-3 inline" /> {marker.count} member{marker.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            <span className="font-bold text-foreground">{totalMembers}</span> members across{" "}
            <span className="font-bold text-foreground">{countryCount}</span> countries are already
            part of Social Factory.
          </p>
        </div>

        {isFullscreen ? createPortal(mapContent, document.body) : mapContent}
      </div>
    </section>
  );
};

export default MemberMapSection;
