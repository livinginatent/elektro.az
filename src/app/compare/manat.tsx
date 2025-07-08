import * as React from "react";

interface ManatProps {
  className?: string;
  width?: number;
  height?: number;
}

const Manat: React.FC<ManatProps> = ({
  className,
  width = 20,
  height = 20,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 450 370"
    className={className}
    {...props}
  >
    <path
      d="m200.212 345.464 9.815-330.743L242.414.981l3.926 317.985-46.128 26.498z"
      style={{
        fill: "currentColor",
        fillRule: "evenodd",
        stroke: "currentColor",
        strokeWidth: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeOpacity: 1,
      }}
    />
    <path
      d="m0 365.093 45.146 1.963c.871-220.624 119.318-293.37 177.64-295.411 157.587 5.03 175.651 206.518 181.564 295.41l45.146 1.964C446.1 156.053 329.381 39.219 233.581 41.22 70.232 46.978 8.02 213.705 0 365.093z"
      style={{
        fill: "currentColor",
        fillRule: "evenodd",
        stroke: "currentColor",
        strokeWidth: 1,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeOpacity: 1,
      }}
    />
  </svg>
);

export default Manat;
