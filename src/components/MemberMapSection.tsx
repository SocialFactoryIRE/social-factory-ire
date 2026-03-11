import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Users } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { cityCoordinates } from "@/data/city-coordinates";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LocationData {
  country: string;
  city: string;
  member_count: number;
}

interface MarkerData {
  key: string;
  city: string;
  country: string;
  count: number;
  coordinates: [number, number];
}

const MemberMapSection = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredMarker, setHoveredMarker] = useState<MarkerData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
      const mapped: MarkerData[] = [];

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

      setMarkers(mapped);
      setTotalMembers(total);
      setCountryCount(countries.size);
      setLoading(false);
    };

    fetchLocations();
  }, []);

  if (loading || markers.length === 0) return null;

  const maxCount = Math.max(...markers.map((m) => m.count));
  const getRadius = (count: number) => {
    const min = 4;
    const max = 16;
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
          <ComposableMap
            projectionConfig={{ scale: 147, center: [0, 20] }}
            className="w-full h-auto"
            style={{ maxHeight: "520px" }}
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
            {markers.map((marker) => (
              <Marker
                key={marker.key}
                coordinates={marker.coordinates}
                onMouseEnter={(e) => {
                  setHoveredMarker(marker);
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <circle
                  r={getRadius(marker.count)}
                  fill="hsl(var(--coral))"
                  fillOpacity={0.7}
                  stroke="hsl(var(--coral))"
                  strokeWidth={1.5}
                  strokeOpacity={0.3}
                  className="animate-pulse"
                  style={{ cursor: "pointer" }}
                />
              </Marker>
            ))}
          </ComposableMap>

          {hoveredMarker && (
            <div
              className="fixed z-50 pointer-events-none px-3 py-2 rounded-xl bg-popover text-popover-foreground border border-border shadow-lg text-sm"
              style={{
                left: tooltipPos.x + 12,
                top: tooltipPos.y - 10,
              }}
            >
              <p className="font-bold">{hoveredMarker.city}</p>
              <p className="text-muted-foreground text-xs">{hoveredMarker.country}</p>
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
