

## Plan: Add Interactive World Map to Homepage

### Overview
Replace the current card-based member location display with a live interactive SVG world map showing markers where members have signed up from, using **react-simple-maps**.

### Changes

**Install**: `react-simple-maps` package

**New file: `src/data/city-coordinates.ts`**
Static lookup table mapping `"Country|City"` to `[longitude, latitude]` coordinates for all ~500 cities in the existing countries-cities data. Avoids runtime geocoding API calls.

**Rewrite: `src/components/MemberMapSection.tsx`**
- Keep existing `supabase.rpc("get_member_locations")` data fetch
- Render `ComposableMap` + `Geographies` (world topojson from unpkg CDN) + `Marker` components
- Each marker placed at city coordinates, sized proportionally to `member_count` (6px min, 20px max radius)
- Hover tooltip showing city, country, and count -- styled with existing card aesthetic
- Summary stats (total members, country count) displayed above the map
- Map styled with muted background matching site palette; markers in brand coral with pulse animation
- Graceful fallback: cities not found in coordinate lookup are silently skipped

No other files need changes -- `MemberMapSection` is already integrated into `Index.tsx`.

