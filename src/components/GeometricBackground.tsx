const shapes = [
  // Circles
  { type: "circle", color: "hsl(var(--coral))", size: 60, top: "5%", left: "3%", opacity: 0.15, rotate: 0 },
  { type: "circle", color: "hsl(var(--sky))", size: 45, top: "18%", left: "88%", opacity: 0.18, rotate: 0 },
  { type: "circle", color: "hsl(var(--accent))", size: 80, top: "55%", left: "92%", opacity: 0.12, rotate: 0 },
  { type: "circle", color: "hsl(var(--mint))", size: 35, top: "78%", left: "5%", opacity: 0.2, rotate: 0 },
  { type: "circle", color: "hsl(var(--peach))", size: 50, top: "40%", left: "50%", opacity: 0.1, rotate: 0 },

  // Squares
  { type: "square", color: "hsl(var(--accent))", size: 50, top: "12%", left: "75%", opacity: 0.14, rotate: 15 },
  { type: "square", color: "hsl(var(--coral))", size: 40, top: "65%", left: "85%", opacity: 0.12, rotate: 35 },
  { type: "square", color: "hsl(var(--sky))", size: 55, top: "35%", left: "2%", opacity: 0.13, rotate: -20 },
  { type: "square", color: "hsl(var(--mint))", size: 35, top: "88%", left: "45%", opacity: 0.15, rotate: 45 },

  // Triangles
  { type: "triangle", color: "hsl(var(--mint))", size: 55, top: "8%", left: "40%", opacity: 0.13, rotate: 10 },
  { type: "triangle", color: "hsl(var(--peach))", size: 45, top: "48%", left: "8%", opacity: 0.16, rotate: -15 },
  { type: "triangle", color: "hsl(var(--coral))", size: 60, top: "72%", left: "70%", opacity: 0.11, rotate: 30 },
  { type: "triangle", color: "hsl(var(--accent))", size: 38, top: "28%", left: "95%", opacity: 0.14, rotate: -25 },

  // Pentagons
  { type: "pentagon", color: "hsl(var(--sky))", size: 50, top: "22%", left: "18%", opacity: 0.12, rotate: 20 },
  { type: "pentagon", color: "hsl(var(--coral))", size: 42, top: "60%", left: "35%", opacity: 0.1, rotate: -10 },
  { type: "pentagon", color: "hsl(var(--mint))", size: 55, top: "85%", left: "78%", opacity: 0.13, rotate: 40 },
  { type: "pentagon", color: "hsl(var(--accent))", size: 36, top: "45%", left: "65%", opacity: 0.11, rotate: -30 },
];

function pentagonPath(size: number) {
  const r = size / 2;
  const cx = r, cy = r;
  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  });
  return points.join(" ");
}

const GeometricBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    {shapes.map((s, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          opacity: s.opacity,
          transform: `rotate(${s.rotate}deg)`,
        }}
      >
        {s.type === "circle" && (
          <div className="w-full h-full rounded-full" style={{ backgroundColor: s.color }} />
        )}
        {s.type === "square" && (
          <div className="w-full h-full rounded-md" style={{ backgroundColor: s.color }} />
        )}
        {s.type === "triangle" && (
          <svg viewBox={`0 0 ${s.size} ${s.size}`} className="w-full h-full">
            <polygon
              points={`${s.size / 2},0 ${s.size},${s.size} 0,${s.size}`}
              fill={s.color}
            />
          </svg>
        )}
        {s.type === "pentagon" && (
          <svg viewBox={`0 0 ${s.size} ${s.size}`} className="w-full h-full">
            <polygon points={pentagonPath(s.size)} fill={s.color} />
          </svg>
        )}
      </div>
    ))}
  </div>
);

export default GeometricBackground;
