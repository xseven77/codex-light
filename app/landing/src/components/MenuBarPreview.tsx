import type { ReactNode } from "react";

function IconButton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      aria-hidden
      title={label}
      className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] border border-[#d1d9e3]/80 bg-white/80 text-[#242933] shadow-[0_3px_10px_rgba(36,41,51,0.04)]"
    >
      {children}
    </div>
  );
}

function QuotaRow({
  label,
  value,
  total,
  percent,
  tint,
}: {
  label: string;
  value: number;
  total: number;
  percent: number;
  tint: string;
}) {
  return (
    <div className="flex h-6 items-center gap-2">
      <span className="w-[58px] text-xs text-[#5b6572]">{label}</span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full border border-[#d1d9e3]/55 bg-[#eaebee]">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${Math.max(percent, 4)}%`, backgroundColor: tint }}
        />
      </div>
      <span className="w-12 text-right text-xs font-semibold tabular-nums text-[#242933]">
        {value}/{total}
      </span>
    </div>
  );
}

function CouponRow({ expires, source }: { expires: string; source: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-[#d1d9e3] bg-white px-2.5 py-2 shadow-[0_3px_10px_rgba(36,41,51,0.035)]">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-[#242933]">重置券</div>
        <div className="text-xs text-[#5b6572]">
          {expires} 过期 · {source}
        </div>
      </div>
      <span className="rounded-[7px] bg-[#ff5f5f]/[0.07] px-2 py-1.5 text-[13px] font-bold tabular-nums text-[#ff5f5f]">
        1 张
      </span>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[#d1d9e3] bg-white p-3.5 shadow-[0_3px_10px_rgba(36,41,51,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

export function MenuBarPreview() {
  return (
    <div
      className="overflow-hidden rounded-[28px] border border-black/10 bg-[#f4f4f4] shadow-[0_30px_80px_rgba(0,0,0,0.16)]"
      aria-hidden
    >
      {/* macOS menu bar */}
      <div className="border-b border-black/[0.08] bg-[#ececec]/95 px-4 py-2 backdrop-blur-xl">
        <div className="flex items-center justify-between text-[11px] text-black/70">
          <div className="flex gap-3">
            <span></span>
            <span>Finder</span>
            <span>文件</span>
            <span>编辑</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-black/[0.06] px-2 py-0.5 font-medium text-black/80">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#28c04e] shadow-[0_0_6px_rgba(40,192,78,0.55)]"
                aria-hidden
              />
              Codex 5h 77% · 周 57%
            </span>
            <span>Wed 17:57</span>
          </div>
        </div>
      </div>

      {/* Desktop + popover */}
      <div className="relative bg-gradient-to-br from-[#ececec] via-[#f4f4f4] to-[#e8e8e8] p-5 sm:p-6">
        <div className="absolute inset-0 opacity-40">
          <div className="grid-bg h-full w-full" />
        </div>

        <div className="relative mx-auto w-full max-w-[414px] overflow-hidden rounded-2xl border border-[#d1d9e3]/90 bg-[#f4f4f4] shadow-[0_24px_60px_rgba(36,41,51,0.14)]">
          {/* Header */}
          <div className="border-b border-[#d1d9e3]/75 bg-gradient-to-b from-white/90 to-[#fafafa] px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[15px] font-semibold text-[#242933]">
                    Demo User
                  </span>
                  <span className="rounded-[5px] bg-[#28c04e]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#28c04e]">
                    API
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-[#5b6572]">
                  name@example.com · Personal · Plus
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <IconButton label="刷新">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M13 3v3H10M3 13V10H6" />
                    <path d="M13.5 8a5.5 5.5 0 0 0-9.8-3.5M2.5 8a5.5 5.5 0 0 0 9.8 3.5" />
                  </svg>
                </IconButton>
                <IconButton label="退出登录">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="8" cy="5.5" r="2.2" />
                    <path d="M3.5 13c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
                    <path d="M11.5 3.5l1 1" />
                  </svg>
                </IconButton>
                <IconButton label="打开窗口">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="2.5" y="4.5" width="8" height="8" rx="1.2" />
                    <path d="M6 4.5V3.8A1.3 1.3 0 0 1 7.3 2.5H12.2A1.3 1.3 0 0 1 13.5 3.8V8.7A1.3 1.3 0 0 1 12.2 10H11.5" />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3 px-4 py-3">
            <GlassCard>
              <div className="flex items-center gap-3.5">
                <div className="w-[118px] shrink-0">
                  <div className="text-[40px] font-bold leading-none tabular-nums text-[#28c04e]">
                    77%
                  </div>
                  <div className="mt-1.5 text-xs leading-5 text-[#5b6572]">
                    5 小时额度
                    <br />
                    19:36:04 重置
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <QuotaRow label="5 小时" value={77} total={100} percent={77} tint="#28c04e" />
                  <QuotaRow label="周额度" value={57} total={100} percent={57} tint="#007aef" />
                </div>
              </div>
            </GlassCard>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#242933]">重置券 3 张</span>
                <span className="text-xs text-[#5b6572]">按过期时间从近到远</span>
              </div>
              <div className="space-y-2">
                <CouponRow expires="2026-07-18 08:08:34" source="available" />
                <CouponRow expires="2026-07-18 08:08:34" source="available" />
                <CouponRow expires="2026-07-18 08:08:34" source="available" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#d1d9e3] bg-gradient-to-b from-[#fafafa] to-[#f7f7f7] px-4 pb-3.5 pt-3.5">
            <div className="space-y-2 text-[13px]">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[#5b6572]">周额度重置</span>
                <span className="font-medium tabular-nums text-[#242933]">2026-07-14 15:19:37</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[#5b6572]">最近更新</span>
                <span className="inline-flex items-center gap-1.5 font-medium tabular-nums text-[#242933]">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#28c04e]" fill="currentColor">
                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm3.03 4.47-3.56 3.56a.75.75 0 0 1-1.06 0L4.97 8.1a.75.75 0 0 1 1.06-1.06l1.44 1.44 3.03-3.03a.75.75 0 1 1 1.06 1.06Z" />
                  </svg>
                  2026-07-09 17:57:06
                </span>
              </div>
            </div>

            <div className="mt-3.5 flex gap-2">
              <div className="flex h-9 flex-1 items-center justify-center rounded-[9px] bg-[#181a1e] text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                刷新
              </div>
              <IconButton label="官方 Usage">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="8" cy="8" r="5.5" />
                  <path d="M2 8h12M8 2.5a10.8 10.8 0 0 1 0 11M8 2.5a10.8 10.8 0 0 0 0 11" />
                </svg>
              </IconButton>
              <IconButton label="退出软件">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 2.5v5M5.5 5 8 2.5 10.5 5" />
                  <path d="M3.5 8.5v3A1.5 1.5 0 0 0 5 13h6a1.5 1.5 0 0 0 1.5-1.5v-3" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
