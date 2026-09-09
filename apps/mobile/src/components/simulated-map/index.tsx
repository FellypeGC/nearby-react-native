import { G, Circle, Line, Path, Rect, Svg, Text as SvgText } from "react-native-svg";

export type SimPoint = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  user: { latitude: number; longitude: number };
  points: SimPoint[];
  selectedId?: string;
  onSelectPoint: (id: string) => void;
};

const W = 400;
const H = 400;
const PAD = 24;

// Why this exists (portfolio honesty): Expo Go's bundled Google Maps key has
// been expired since Aug 2026, so native tiles can't authenticate and there is
// no budget for a private key. This stylized preview plots the REAL coordinates
// (user GPS + API markets) with a linear projection. Production path: MapLibre
// + dev-client build with our own key. See README "Maps" section.
export function SimulatedMap({ user, points, selectedId, onSelectPoint }: Props) {
  // If the user is far from every market (e.g. another city), framing on the
  // user would squash all pins into an unreadable cluster — frame the markets
  // instead and hide the off-screen user dot.
  const distToFirst =
    points.length > 0
      ? Math.hypot(
          user.latitude - points[0].latitude,
          user.longitude - points[0].longitude
        )
      : 0;
  const FAR_DEG = 0.5; // ~55km: beyond this the user is "away"
  const includeUser = distToFirst <= FAR_DEG;

  const all = includeUser ? [user, ...points] : points;
  const lats = all.map((p) => p.latitude);
  const lngs = all.map((p) => p.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const spanLat = Math.max(maxLat - minLat, 0.0005);
  const spanLng = Math.max(maxLng - minLng, 0.0005);

  const project = (latitude: number, longitude: number) => ({
    // NOTE: y is flipped (north up) and aspect is stretched to fill the box.
    // Good enough for a stylized preview, not for navigation.
    x: PAD + ((longitude - minLng) / spanLng) * (W - PAD * 2),
    y: PAD + ((1 - (latitude - minLat) / spanLat)) * (H - PAD * 2),
  });

  const u = project(user.latitude, user.longitude);
  const showUserDot = includeUser;

  // Decorative street grid (static, relative to the box).
  const grid: number[] = [60, 120, 180, 240, 300, 340];

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      testID="simulated-map"
    >
      <Rect x={0} y={0} width={W} height={H} fill="#EDEAE0" />

      {grid.map((v) => (
        <G key={v}>
          <Line x1={v} y1={0} x2={v} y2={H} stroke="#DDD8C9" strokeWidth={6} />
          <Line x1={0} y1={v} x2={W} y2={v} stroke="#DDD8C9" strokeWidth={6} />
          <Line x1={v} y1={0} x2={v} y2={H} stroke="#FFFFFF" strokeWidth={2} />
          <Line x1={0} y1={v} x2={W} y2={v} stroke="#FFFFFF" strokeWidth={2} />
        </G>
      ))}

      {/* Decorative diagonal avenue + park blob */}
      <Path
        d={`M -20 ${H + 20} L ${W + 20} -20`}
        stroke="#FFFFFF"
        strokeWidth={14}
        fill="none"
      />
      <Path
        d={`M -20 ${H + 20} L ${W + 20} -20`}
        stroke="#F5D90A"
        strokeWidth={2}
        strokeDasharray="8 6"
        fill="none"
      />
      <Circle cx={W * 0.78} cy={H * 0.22} r={46} fill="#CDE6B0" />
      <Circle cx={W * 0.2} cy={H * 0.8} r={34} fill="#CDE6B0" />

      {points.map((p) => {
        const { x, y } = project(p.latitude, p.longitude);
        const selected = p.id === selectedId;
        return (
          <G key={p.id} onPress={() => onSelectPoint(p.id)}>
            <Circle
              cx={x}
              cy={y}
              r={selected ? 16 : 12}
              fill={selected ? "#257F49" : "#2F9E44"}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
            <SvgText
              x={x}
              y={y + 4.5}
              fontSize={11}
              fontWeight="bold"
              fill="#FFFFFF"
              textAnchor="middle"
            >
              {points.indexOf(p) + 1}
            </SvgText>
          </G>
        );
      })}

      {/* User location (hidden when framed out as "away") */}
      {showUserDot && (
        <G>
          <Circle cx={u.x} cy={u.y} r={14} fill="#1E88E5" opacity={0.25} />
          <Circle
            cx={u.x}
            cy={u.y}
            r={7}
            fill="#1E88E5"
            stroke="#FFFFFF"
            strokeWidth={3}
          />
        </G>
      )}
    </Svg>
  );
}
