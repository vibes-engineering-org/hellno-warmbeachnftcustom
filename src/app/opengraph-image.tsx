import { ImageResponse } from "next/og";

export const alt = "WarmBeachNftCustom - Custom Beach-Themed NFT Collection";
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
          backgroundColor: "#fef3c7",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm beach gradient background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #92400e)",
          }}
        />

        {/* Decorative wave pattern */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))",
            borderRadius: "50% 50% 0 0",
            transform: "scaleX(2)",
          }}
        />

        {/* Main title */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            zIndex: 10,
            marginBottom: "20px",
            maxWidth: "800px",
            padding: "0 40px",
          }}
        >
          WarmBeachNftCustom
        </h1>

        {/* Description text */}
        <p
          style={{
            fontSize: "28px",
            fontWeight: "500",
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            zIndex: 10,
            opacity: 0.95,
            maxWidth: "700px",
            padding: "0 40px",
            marginBottom: "12px",
          }}
        >
          Beach-Themed Digital Art Collection
        </p>

        {/* Creator text */}
        <p
          style={{
            fontSize: "24px",
            fontWeight: "400",
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0.5px",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            zIndex: 10,
            opacity: 0.9,
          }}
        >
          by WarmBeachCreator
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
