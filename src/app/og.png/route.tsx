import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { OG_IMAGE } from "@/lib/metadata";

// Rendered once at build time to out/og.png — a real .png so any static host serves the right type.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0c0a09",
        color: "#f5f5f4",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#2dd4bf", letterSpacing: 4 }}>
        {`${profile.role.toUpperCase()} · ${profile.location.toUpperCase()}`}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>{profile.name}</div>
        <div style={{ marginTop: 24, fontSize: 38, color: "#a8a29e", lineHeight: 1.3 }}>
          {profile.headline}
        </div>
      </div>
      <div style={{ display: "flex", width: 120, height: 8, background: "#2dd4bf" }} />
    </div>,
    { width: OG_IMAGE.width, height: OG_IMAGE.height },
  );
}
