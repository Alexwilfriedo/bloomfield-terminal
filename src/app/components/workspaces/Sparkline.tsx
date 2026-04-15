interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  id: string;
}

export function Sparkline({ data, color, width = 80, height = 32, strokeWidth = 1.5, id }: SparklineProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return [x, y] as [number, number];
  });

  const linePath = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
  const gradId = `sp-${id}`;

  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
