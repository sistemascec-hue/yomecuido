import React from "react";
import { Svg, Path } from "react-native-svg";

export default function ConexionGamePoints({ start, end }) {
  const x1 = start.x;
  const y1 = start.y;
  const x2 = end.x;
  const y2 = end.y;

  // Generar una curva "suave"
  const controlPointX = (x1 + x2) / 2;
  const controlPointY = Math.min(y1, y2) -50; // Más hacia arriba

  const pathData = `M${x1},${y1} Q${controlPointX},${controlPointY} ${x2},${y2}`;

  return (
    <Svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="100%"
      height="100%"
    >
      <Path
        d={pathData}
        fill="none"
        stroke="#FFFFFF" 
        strokeWidth={15}
        strokeOpacity={0.2}
      />
    </Svg>
  );
}
