const shapes = [
  // Circles
  { type: "circle", color: "hsl(var(--yellow))", size: 60, top: "3%", left: "3%", opacity: 0.12, rotate: 0 },
  { type: "circle", color: "hsl(var(--teal))", size: 45, top: "12%", left: "88%", opacity: 0.14, rotate: 0 },
  { type: "circle", color: "hsl(var(--green))", size: 80, top: "38%", left: "92%", opacity: 0.1, rotate: 0 },
  { type: "circle", color: "hsl(var(--peach))", size: 35, top: "65%", left: "5%", opacity: 0.15, rotate: 0 },
  { type: "circle", color: "hsl(var(--yellow))", size: 50, top: "82%", left: "50%", opacity: 0.08, rotate: 0 },
  { type: "circle", color: "hsl(var(--green))", size: 40, top: "28%", left: "55%", opacity: 0.09, rotate: 0 },
  { type: "circle", color: "hsl(var(--teal))", size: 55, top: "72%", left: "22%", opacity: 0.11, rotate: 0 },
  { type: "circle", color: "hsl(var(--peach))", size: 30, top: "48%", left: "78%", opacity: 0.12, rotate: 0 },

  // Squares
  { type: "square", color: "hsl(var(--yellow))", size: 50, top: "10%", left: "75%", opacity: 0.11, rotate: 15 },
  { type: "square", color: "hsl(var(--peach))", size: 40, top: "52%", left: "85%", opacity: 0.1, rotate: 35 },
  { type: "square", color: "hsl(var(--teal))", size: 55, top: "30%", left: "2%", opacity: 0.1, rotate: -20 },
  { type: "square", color: "hsl(var(--green))", size: 35, top: "90%", left: "45%", opacity: 0.12, rotate: 45 },
  { type: "square", color: "hsl(var(--peach))", size: 42, top: "18%", left: "32%", opacity: 0.08, rotate: 25 },
  { type: "square", color: "hsl(var(--yellow))", size: 38, top: "75%", left: "62%", opacity: 0.1, rotate: -35 },
  { type: "square", color: "hsl(var(--green))", size: 30, top: "58%", left: "12%", opacity: 0.09, rotate: 50 },

  // Triangles
  { type: "triangle", color: "hsl(var(--green))", size: 55, top: "6%", left: "40%", opacity: 0.1, rotate: 10 },
  { type: "triangle", color: "hsl(var(--peach))", size: 45, top: "35%", left: "8%", opacity: 0.12, rotate: -15 },
  { type: "triangle", color: "hsl(var(--yellow))", size: 60, top: "58%", left: "70%", opacity: 0.09, rotate: 30 },
  { type: "triangle", color: "hsl(var(--teal))", size: 38, top: "22%", left: "95%", opacity: 0.11, rotate: -25 },
  { type: "triangle", color: "hsl(var(--green))", size: 48, top: "80%", left: "88%", opacity: 0.1, rotate: 18 },
  { type: "triangle", color: "hsl(var(--peach))", size: 35, top: "45%", left: "42%", opacity: 0.07, rotate: -40 },
  { type: "triangle", color: "hsl(var(--yellow))", size: 52, top: "15%", left: "62%", opacity: 0.08, rotate: 55 },

  // Pentagons
  { type: "pentagon", color: "hsl(var(--teal))", size: 50, top: "18%", left: "18%", opacity: 0.1, rotate: 20 },
  { type: "pentagon", color: "hsl(var(--yellow))", size: 42, top: "48%", left: "35%", opacity: 0.08, rotate: -10 },
  { type: "pentagon", color: "hsl(var(--green))", size: 55, top: "75%", left: "78%", opacity: 0.1, rotate: 40 },
  { type: "pentagon", color: "hsl(var(--peach))", size: 36, top: "40%", left: "65%", opacity: 0.09, rotate: -30 },
  { type: "pentagon", color: "hsl(var(--teal))", size: 44, top: "88%", left: "15%", opacity: 0.11, rotate: 12 },
  { type: "pentagon", color: "hsl(var(--yellow))", size: 38, top: "8%", left: "52%", opacity: 0.08, rotate: -22 },
  { type: "pentagon", color: "hsl(var(--green))", size: 32, top: "62%", left: "48%", opacity: 0.07, rotate: 35 },
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
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
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
