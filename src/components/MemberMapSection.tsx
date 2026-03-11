import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Users, ArrowLeft } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { cityCoordinates } from "@/data/city-coordinates";
import { Button } from "@/components/ui/button";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  coordinates: [number, number];
  cities: CityMarker[];
}

// Europe-centered view
const EUROPE_VIEW = { center: [15, 52] as [number, number], zoom: 3.5 };

const MemberMapSection = () => {
  const [cityMarkers, setCityMarkers] = useState<CityMarker[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredMarker, setHoveredMarker] = useState<{ name: string; detail: string; count: number } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [view, setView] = useState(EUROPE_VIEW);

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

  // Aggregate city markers into country-level markers
  const countryMarkers = useMemo<CountryMarker[]>(() => {
    const map = new Map<string, { count: number; cities: CityMarker[] }>();
    for (const cm of cityMarkers) {
      const entry = map.get(cm.country) || { count: 0, cities: [] };
      entry.count += cm.count;
      entry.cities.push(cm);
      map.set(cm.country, entry);
    }
    const result: CountryMarker[] = [];
    for (const [country, { count, cities }] of map) {
      // Use average coordinates of cities as country center
      const avgLng = cities.reduce((s, c) => s + c.coordinates[0], 0) / cities.length;
      const avgLat = cities.reduce((s, c) => s + c.coordinates[1], 0) / cities.length;
      result.push({ country, count, coordinates: [avgLng, avgLat], cities });
    }
    return result;
  }, [cityMarkers]);

  const handleCountryClick = (cm: CountryMarker) => {
    if (cm.cities.length <= 1) return; // No drill-down needed for single city
    setSelectedCountry(cm.country);
    // Zoom to country center
    const lngs = cm.cities.map(c => c.coordinates[0]);
    const lats = cm.cities.map(c => c.coordinates[1]);
    const cLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
    const cLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const spread = Math.max(Math.max(...lngs) - Math.min(...lngs), Math.max(...lats) - Math.min(...lats));
    const zoom = spread < 2 ? 12 : spread < 5 ? 8 : spread < 10 ? 5 : 4;
    setView({ center: [cLng, cLat], zoom });
  };

  const handleBack = () => {
    setSelectedCountry(null);
    setView(EUROPE_VIEW);
    setHoveredMarker(null);
  };

  if (loading || cityMarkers.length === 0) return null;

  const activeMarkers = selectedCountry
    ? cityMarkers.filter(m => m.country === selectedCountry)
    : null;

  const getRadius = (count: number, markers: { count: number }[]) => {
    const maxCount = Math.max(...markers.map(m => m.count));
    const min = 4;
    const max = 14;
    if (maxCount <= 1) return min;
    return min + ((count - 1) / (maxCount - 1)) * (max - min);
  };

  return (
    <section className="py-20 relative overflow-hidden">
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
            <span className="font-bold text-foreground">{countryCount}</span> countries are already part of Social Factory.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-2xl border-2 border-border bg-card/50 overflow-hidden">
          {selectedCountry && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="absolute top-4 left-4 z-10 gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Europe
            </Button>
          )}

          <ComposableMap
            projectionConfig={{ scale: 147, center: [0, 20] }}
            className="w-full h-auto"
            style={{ maxHeight: "520px" }}
          >
            <ZoomableGroup
              center={view.center}
              zoom={view.zoom}
              minZoom={1}
              maxZoom={20}
              filterZoomEvent={() => false}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "hsl(var(--muted-foreground) / 0.2)" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Country-level markers (default view) */}
              {!selectedCountry &&
                countryMarkers.map((marker) => (
                  <Marker
                    key={marker.country}
                    coordinates={marker.coordinates}
                    onClick={() => handleCountryClick(marker)}
                    onMouseEnter={(e) => {
                      setHoveredMarker({
                        name: marker.country,
                        detail: `${marker.cities.length} ${marker.cities.length === 1 ? "city" : "cities"}`,
                        count: marker.count,
                      });
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredMarker(null)}
                  >
                    <circle
                      r={getRadius(marker.count, countryMarkers)}
                      fill="hsl(var(--coral))"
                      fillOpacity={0.75}
                      stroke="hsl(var(--coral))"
                      strokeWidth={1.5}
                      strokeOpacity={0.3}
                      className={marker.cities.length > 1 ? "cursor-pointer" : ""}
                      style={{ transition: "r 0.3s ease" }}
                    />
                    {marker.cities.length > 1 && (
                      <circle
                        r={getRadius(marker.count, countryMarkers) + 3}
                        fill="none"
                        stroke="hsl(var(--coral))"
                        strokeWidth={1}
                        strokeOpacity={0.3}
                        className="animate-pulse cursor-pointer"
                      />
                    )}
                  </Marker>
                ))}

              {/* City-level markers (drilled-down view) */}
              {selectedCountry &&
                activeMarkers?.map((marker) => (
                  <Marker
                    key={marker.key}
                    coordinates={marker.coordinates}
                    onMouseEnter={(e) => {
                      setHoveredMarker({
                        name: marker.city,
                        detail: marker.country,
                        count: marker.count,
                      });
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredMarker(null)}
                  >
                    <circle
                      r={getRadius(marker.count, activeMarkers)}
                      fill="hsl(var(--coral))"
                      fillOpacity={0.8}
                      stroke="hsl(var(--coral))"
                      strokeWidth={1.5}
                      strokeOpacity={0.4}
                      style={{ cursor: "pointer", transition: "r 0.3s ease" }}
                    />
                  </Marker>
                ))}
            </ZoomableGroup>
          </ComposableMap>

          {hoveredMarker && (
            <div
              className="fixed z-50 pointer-events-none px-3 py-2 rounded-xl bg-popover text-popover-foreground border border-border shadow-lg text-sm"
              style={{
                left: tooltipPos.x + 12,
                top: tooltipPos.y - 10,
              }}
            >
              <p className="font-bold">{hoveredMarker.name}</p>
              <p className="text-muted-foreground text-xs">{hoveredMarker.detail}</p>
              <p className="flex items-center gap-1 text-xs mt-0.5">
                <Users className="h-3 w-3" /> {hoveredMarker.count} member{hoveredMarker.count !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemberMapSection;
