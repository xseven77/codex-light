import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #151515 45%, #0f1a12 100%)",
          color: "#f5f5f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(145deg, #444b52, #2a3036)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "#18df38",
                boxShadow: "0 0 24px rgba(24,223,56,0.55)",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>macOS 菜单栏</span>
            <span>Codex 额度工具</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(245,245,245,0.72)",
            }}
          >
            官方 OAuth 登录 · 5 小时 / 周额度 · Credits · 重置券
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 22,
            color: "rgba(245,245,245,0.55)",
          }}
        >
          <span>Swift + SwiftUI</span>
          <span>·</span>
          <span>开源</span>
          <span>·</span>
          <span>隐私优先</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
