import React, { useId } from "react";

/**
 * A thick colored band that follows a curved SVG path, with a repeating
 * uppercase label riding along its centerline. Used as a signature
 * decorative motif behind hero/CTA imagery.
 */
export default function RibbonBanner({
  text,
  bandColor = "var(--color-brand-orange)",
  textColor = "#F5F5F5",
  pathD,
  viewBox = "0 0 1000 500",
  bandWidth = 62,
  fontSize = 15,
  repeat = 3,
  className = "",
}) {
  const uid = useId().replace(/[:]/g, "");
  const pathId = `ribbon-path-${uid}`;
  const label = Array.from({ length: repeat })
    .map(() => text)
    .join("   ✦   ");

  return (
    <svg
      viewBox={viewBox}
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>
      <use
        href={`#${pathId}`}
        stroke={bandColor}
        strokeWidth={bandWidth}
        strokeLinecap="round"
        fill="none"
      />
      <text
        fontSize={fontSize}
        fontWeight={700}
        letterSpacing="0.12em"
        fill={textColor}
        style={{ textTransform: "uppercase", fontFamily: "var(--font-body)" }}
      >
        <textPath href={`#${pathId}`} startOffset="0%">
          {label}
        </textPath>
      </text>
    </svg>
  );
}
