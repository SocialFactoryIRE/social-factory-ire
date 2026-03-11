import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Globe, MapPin, Users } from "lucide-react";

interface LocationData {
  country: string;
  city: string;
  member_count: number;
}

interface GroupedLocation {
  country: string;
  totalMembers: number;
  cities: { city: string; count: number }[];
}

const MemberMapSection = () => {
  const [locations, setLocations] = useState<GroupedLocation[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.rpc("get_member_locations");
      if (error || !data) {
        setLoading(false);
        return;
      }

      const raw = data as LocationData[];
      const grouped: Record<string, GroupedLocation> = {};
      let total = 0;

      for (const row of raw) {
        total += row.member_count;
        if (!grouped[row.country]) {
          grouped[row.country] = { country: row.country, totalMembers: 0, cities: [] };
        }
        grouped[row.country].totalMembers += row.member_count;
        grouped[row.country].cities.push({ city: row.city, count: row.member_count });
      }

      const sorted = Object.values(grouped).sort((a, b) => b.totalMembers - a.totalMembers);
      setLocations(sorted);
      setTotalMembers(total);
      setLoading(false);
    };

    fetchLocations();
  }, []);

  if (loading || locations.length === 0) return null;

  const colorClasses = [
    "bg-sky/15 border-sky",
    "bg-mint/15 border-mint",
    "bg-peach/15 border-coral",
    "bg-accent/15 border-accent",
    "bg-primary/10 border-primary",
    "bg-sky/10 border-sky/70",
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            <Globe className="h-4 w-4" />
            Our Global Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Members Around the World
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            <span className="font-bold text-foreground">{totalMembers}</span> members across{" "}
            <span className="font-bold text-foreground">{locations.length}</span> countries are already part of Social Factory.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {locations.map((loc, i) => (
            <div
              key={loc.country}
              className={`p-5 rounded-2xl border-2 ${colorClasses[i % colorClasses.length]} transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-foreground">{loc.country}</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                  <Users className="h-3.5 w-3.5" /> {loc.totalMembers}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {loc.cities.map((c) => (
                  <span
                    key={c.city}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/60 text-xs font-medium text-foreground border border-border"
                  >
                    <MapPin className="h-3 w-3 text-primary" />
                    {c.city}
                    {c.count > 1 && <span className="text-muted-foreground">({c.count})</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberMapSection;
