import { ImageResponse } from "next/og";

export const alt = "jacque Goddess Winds of Change #1";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple gradient background from left to right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to right, #8b5cf6, #a855f7, #c084fc)",
          }}
        />

        {/* Main title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "-1px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            zIndex: 10,
            marginBottom: "16px",
          }}
        >
          Goddess Winds of Change #1
        </h1>

        {/* Author text */}
        <p
          style={{
            fontSize: "28px",
            fontWeight: "400",
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            zIndex: 10,
            opacity: 0.9,
          }}
        >
          by jacque
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
