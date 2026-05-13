import { DhMist, DhParticles, DhSection, DhCorners } from '../components/atmosphere';

export default function Page08_Space() {
  const flow = [
    { n: "01", t: "进入空间", d: "黑金山水 + 沉睡陶俑轮廓" },
    { n: "02", t: "靠近画面", d: "摄像头捕捉人影 · 粒子聚合" },
    { n: "03", t: "抬手互动", d: "手势控制破碎 / 流动 / 重构" },
    { n: "04", t: "离开展区", d: "鼓点渐弱 · 画面回到沉默" },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhMist />
        <DhParticles count={40} seed={43} opacityRange={[.15, .5]} />

        <div style={{ position: "absolute", top: 110, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <DhSection num="捌" label="EXHIBITION · 毕业展现场" title="观众如何进入文物现场" />
          <div className="dh-caption">PLAN · TOP-DOWN VIEW</div>
        </div>

        <div style={{ position: "absolute", top: 200, left: 56, right: 56, bottom: 70, display: "grid", gridTemplateColumns: "65% 1fr", gap: 36 }}>

          {/* 左：俯视空间图 */}
          <div style={{ position: "relative", border: "1px solid rgba(154,122,62,.35)", background: "linear-gradient(180deg, rgba(15,12,18,.6), rgba(7,6,10,.95))" }}>

            {/* 网格 */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(154,122,62,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(154,122,62,.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            {/* 大屏 / 投影 */}
            <div style={{ position: "absolute", left: "10%", top: "10%", width: "80%", height: "18%", border: "1px solid var(--gold-3)", background: "linear-gradient(180deg, rgba(201,169,97,.18), rgba(40,30,18,.4))" }}>
              <div style={{ position: "absolute", left: 12, top: 8 }} className="dh-caption">PROJECTION / LED · 投影或大屏</div>
              {/* 投影画面里的山水 */}
              <svg viewBox="0 0 800 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .5 }} preserveAspectRatio="none">
                <path d="M 0 80 L 100 50 L 200 70 L 320 30 L 440 60 L 560 25 L 680 55 L 800 35 L 800 100 L 0 100 Z" fill="rgba(201,169,97,.45)" />
              </svg>
            </div>

            {/* 摄像头 */}
            <div style={{ position: "absolute", left: "48%", top: "32%", width: 22, height: 22, borderRadius: "50%", border: "1px solid var(--gold-3)", background: "var(--ink-2)", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold-4)", boxShadow: "0 0 8px var(--gold-4)" }} />
            </div>
            <div style={{ position: "absolute", left: "50%", top: "31%", transform: "translate(8px, -50%)" }} className="dh-caption">CAM · 摄像头</div>

            {/* 半透明捕捉光锥 */}
            <svg viewBox="0 0 100 100" style={{ position: "absolute", left: "30%", top: "32%", width: "40%", height: "48%" }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="cone" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(201,169,97,.35)"/>
                  <stop offset="100%" stopColor="rgba(201,169,97,0)"/>
                </linearGradient>
              </defs>
              <polygon points="50,0 95,100 5,100" fill="url(#cone)" stroke="rgba(201,169,97,.4)" strokeWidth=".3" strokeDasharray="2 2" />
            </svg>

            {/* 观众站立区（地面互动范围） */}
            <div style={{ position: "absolute", left: "30%", top: "62%", width: "40%", height: "24%", border: "1px dashed rgba(201,169,97,.45)", borderRadius: "50%/40%" }}>
              <div style={{ position: "absolute", left: 16, top: 12 }} className="dh-caption">FLOOR · 地面互动范围</div>
              {/* 观众图标 */}
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid var(--paper-2)", margin: "0 auto" }} />
                <div style={{ width: 26, height: 24, borderTop: "1px solid var(--paper-2)", borderLeft: "1px solid var(--paper-2)", borderRight: "1px solid var(--paper-2)", borderRadius: "12px 12px 0 0", marginTop: 2 }} />
                <div className="dh-caption" style={{ marginTop: 6 }}>VISITOR</div>
              </div>
            </div>

            {/* 金色粒子流 —— 观众 → 屏幕 */}
            {[...Array(30)].map((_, i) => {
              const t = i / 29;
              const y = 76 - t * 50;
              const x = 50 + Math.sin(t * 3) * 6;
              return <div key={i} className="dh-dot" style={{ left: `${x}%`, top: `${y}%`, width: 2.5, height: 2.5, background: "var(--gold-4)", boxShadow: "0 0 6px var(--gold-4)", opacity: .25 + t * .7 }} />;
            })}

            {/* 入口 */}
            <div style={{ position: "absolute", left: 0, top: "82%", width: "10%", height: "10%", borderRight: "1px solid var(--gold-3)", borderTop: "1px solid var(--gold-3)" }}>
              <div style={{ position: "absolute", right: 8, bottom: 6 }} className="dh-caption">ENTRY · 入口</div>
            </div>

            {/* 二维码入口 */}
            <div style={{ position: "absolute", right: "4%", top: "82%", width: 38, height: 38, border: "1px solid var(--gold-3)", padding: 4 }}>
              <div style={{ width: "100%", height: "100%", backgroundImage: "linear-gradient(rgba(201,169,97,.6) 50%, transparent 50%), linear-gradient(90deg, rgba(201,169,97,.6) 50%, transparent 50%)", backgroundSize: "5px 5px" }} />
            </div>
            <div style={{ position: "absolute", right: "4%", top: "94%" }} className="dh-caption">QR · 故事入口</div>

            {/* 文物故事展板 */}
            <div style={{ position: "absolute", left: "4%", top: "32%", width: 90, height: 130, border: "1px solid rgba(154,122,62,.5)" }}>
              <div style={{ position: "absolute", left: 6, top: 6 }} className="dh-caption">PANEL</div>
              <div style={{ position: "absolute", left: 6, bottom: 6, writingMode: "vertical-rl", fontFamily: "var(--sf-serif)", color: "var(--gold-3)", fontSize: 11, letterSpacing: ".3em" }}>俳优故事</div>
            </div>

            {/* 音响 */}
            {[{ l: "8%", t: "12%" }, { l: "88%", t: "12%" }].map((p, i) => (
              <div key={i} style={{ position: "absolute", left: p.l, top: p.t, width: 16, height: 16, border: "1px solid var(--gold-3)", borderRadius: 2 }}>
                <div style={{ position: "absolute", inset: 3, border: "1px solid var(--gold-3)", borderRadius: "50%" }} />
              </div>
            ))}
            <div style={{ position: "absolute", left: "11%", top: "12%" }} className="dh-caption">SPK</div>
            <div style={{ position: "absolute", right: "12%", top: "12%" }} className="dh-caption">SPK</div>

            {/* 电脑主机 */}
            <div style={{ position: "absolute", right: "6%", top: "40%", width: 28, height: 36, border: "1px solid var(--gold-3)" }}>
              <div style={{ position: "absolute", left: 4, right: 4, top: 4, height: 4, background: "rgba(201,169,97,.4)" }} />
              <div style={{ position: "absolute", left: 4, right: 4, top: 12, height: 1, background: "rgba(201,169,97,.4)" }} />
            </div>
            <div style={{ position: "absolute", right: "10%", top: "53%" }} className="dh-caption">PC · TD HOST</div>

            <div className="dh-corner tl" /><div className="dh-corner tr" /><div className="dh-corner bl" /><div className="dh-corner br" />
          </div>

          {/* 右：体验动线 + 硬件 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div className="dh-caption" style={{ marginBottom: 12 }}>EXPERIENCE FLOW · 观众动线</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {flow.map((f) => (
                  <div key={f.n} className="dh-card" style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "36px 1fr", gap: 12, alignItems: "center" }}>
                    <div className="dh-title-s" style={{ fontSize: 18 }}>{f.n}</div>
                    <div>
                      <div className="dh-title-s" style={{ fontSize: 14 }}>{f.t}</div>
                      <div className="dh-body" style={{ fontSize: 11.5, color: "var(--paper-3)", marginTop: 2 }}>{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dh-card" style={{ padding: 18 }}>
              <div className="dh-caption" style={{ marginBottom: 10 }}>HARDWARE · 硬件配置</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span className="dh-chip-mono">摄像头</span>
                <span className="dh-chip-mono">电脑</span>
                <span className="dh-chip-mono">投影 / 大屏</span>
                <span className="dh-chip-mono">音响 ×2</span>
                <span className="dh-chip-mono">键盘备用</span>
              </div>
              <div className="dh-rule" style={{ margin: "14px 0 10px" }} />
              <div className="dh-caption">SPACE · 約 4.5m × 3.2m</div>
            </div>
          </div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
