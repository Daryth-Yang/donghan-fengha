import { Fragment } from 'react';
import { DhMist, DhParticles, DhCorners, DhSection } from '../components/atmosphere';

export default function Page07_Fracture() {
  const flow = ["完整陶俑", "手势扰动", "陶片破碎", "粒子游离", "重新聚合", "文物再生"];
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhMist />
        <DhParticles count={70} seed={37} opacityRange={[.2, .7]} />

        <div style={{ position: "absolute", top: 110, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <DhSection num="柒" label="FRACTURE & RESTORE" title="破碎不是损毁 · 重构不是复原" />
          <div className="dh-caption">SHATTER → DRIFT → RE-FORM</div>
        </div>

        {/* 主视觉 */}
        <div style={{ position: "absolute", top: 200, left: 56, right: 56, height: 480 }}>
          {/* 中心舞台辉光 */}
          <div style={{
            position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
            width: 700, height: 460,
            background: "radial-gradient(closest-side, rgba(201,169,97,.18), transparent 75%)"
          }} />

          {/* 左标签 */}
          <div style={{ position: "absolute", left: 0, top: 60, width: 230 }}>
            <div className="dh-caption" style={{ marginBottom: 12 }}>LEFT · 完整 · INTACT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span className="dh-chip">外层 · 陶土肌理</span>
              <span className="dh-chip">中层 · 体态凝固</span>
              <span className="dh-chip">內层 · 表情瞬间</span>
            </div>
            <p className="dh-body" style={{ fontSize: 12, marginTop: 18, color: "var(--paper-3)" }}>
              「完整」 是文物的当下状态，<br/>但不是它的全部历史。
            </p>
          </div>

          {/* 中心：半破碎陶俑 */}
          <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 380, height: 480 }}>
            {/* 完整左半 */}
            <div style={{
              position: "absolute", left: 0, top: 30, width: 190, height: 420,
              clipPath: "inset(0 0 0 0)",
              borderRight: "1px solid rgba(154,122,62,.45)",
              background:
                "repeating-linear-gradient(135deg, rgba(154,122,62,.12) 0 6px, transparent 6px 14px)," +
                "linear-gradient(180deg, rgba(40,30,18,.8), rgba(7,6,10,.95))"
            }}>
              <div style={{ position: "absolute", right: 8, top: 14, writingMode: "vertical-rl", color: "var(--gold-3)", fontFamily: "var(--sf-serif)", letterSpacing: ".35em", fontSize: 14 }}>击鼓说唱俑</div>
              <div style={{ position: "absolute", left: 10, bottom: 12, fontFamily: "var(--sf-mono)", fontSize: 9, letterSpacing: ".3em", color: "var(--paper-4)" }}>INTACT · 50%</div>
            </div>

            {/* 右半：破碎陶片 + 骨架 */}
            <div style={{ position: "absolute", left: 190, top: 30, width: 190, height: 420 }}>
              {/* 骨架线稿 */}
              <svg viewBox="0 0 190 420" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <g stroke="rgba(239,227,201,.7)" strokeWidth="1" fill="none">
                  <circle cx="60" cy="70" r="38" />
                  <line x1="60" y1="108" x2="60" y2="240" />
                  <line x1="60" y1="150" x2="120" y2="180" />
                  <line x1="60" y1="170" x2="20" y2="220" />
                  <line x1="60" y1="240" x2="30" y2="380" />
                  <line x1="60" y1="240" x2="100" y2="380" />
                  <circle cx="120" cy="180" r="22" strokeDasharray="3 3" />
                </g>
              </svg>
              {/* 飞散陶片 */}
              {[
                { l: 30, t: 60, w: 28, h: 22, r: -18 },
                { l: 80, t: 110, w: 22, h: 16, r: 24 },
                { l: 130, t: 80, w: 18, h: 26, r: 10 },
                { l: 150, t: 200, w: 26, h: 20, r: -28 },
                { l: 60, t: 250, w: 18, h: 14, r: 38 },
                { l: 110, t: 300, w: 22, h: 18, r: -14 },
                { l: 30, t: 340, w: 26, h: 22, r: 20 },
              ].map((p, i) => (
                <div key={i} style={{
                  position: "absolute", left: p.l, top: p.t, width: p.w, height: p.h,
                  background: "rgba(154,122,62,.5)",
                  border: "1px solid var(--gold-3)",
                  transform: `rotate(${p.r}deg)`,
                  boxShadow: "0 0 12px rgba(201,169,97,.3)"
                }} />
              ))}
              {/* 金色粒子 */}
              {[...Array(40)].map((_, i) => {
                const x = (i * 37) % 190;
                const y = (i * 53) % 420;
                return <div key={i} className="dh-dot" style={{ left: x, top: y, width: 2, height: 2, background: "var(--gold-4)", boxShadow: "0 0 6px var(--gold-4)", opacity: .7 }} />;
              })}
            </div>

            {/* 中线 */}
            <div className="dh-rule-v" style={{ position: "absolute", left: 190, top: 0, bottom: 0 }} />
          </div>

          {/* 右标签 */}
          <div style={{ position: "absolute", right: 0, top: 60, width: 230, textAlign: "right" }}>
            <div className="dh-caption" style={{ marginBottom: 12 }}>RIGHT · 重构 · RECONSTRUCT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <span className="dh-chip">外层 · 陶片碎裂</span>
              <span className="dh-chip">中层 · 金色粒子</span>
              <span className="dh-chip">內层 · 骨架线稿</span>
            </div>
            <p className="dh-body" style={{ fontSize: 12, marginTop: 18, color: "var(--paper-3)" }}>
              「破碎」 是时间留下的痕迹，<br/>「重构」 是当代的回答。
            </p>
          </div>
        </div>

        {/* 底部流程 */}
        <div style={{ position: "absolute", bottom: 80, left: 56, right: 56 }}>
          <div className="dh-caption" style={{ marginBottom: 14 }}>FLOW · 六态</div>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {flow.map((f, i) => (
              <Fragment key={f}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: i === 2 || i === 3 ? "var(--gold-4)" : "transparent", border: "1px solid var(--gold-3)", margin: "0 auto", boxShadow: i === 2 || i === 3 ? "0 0 12px rgba(230,200,132,.6)" : "none" }} />
                  <div className="dh-title-s" style={{ fontSize: 14, marginTop: 12 }}>{f}</div>
                  <div className="dh-caption" style={{ marginTop: 4 }}>{`0${i+1}`}</div>
                </div>
                {i < flow.length - 1 && <div style={{ flex: 0.4, height: 1, background: "linear-gradient(90deg, var(--gold-2), var(--gold-3), var(--gold-2))", opacity: .55 }} />}
              </Fragment>
            ))}
          </div>
        </div>

        <p style={{ position: "absolute", bottom: 24, left: 56, right: 56, margin: 0 }} className="dh-body">
          「破碎不是文物的终点，而是时间留下的痕迹。重构也不是简單复原，而是当代观众与文物之间的一次重新连接。」
        </p>

        <DhCorners />
      </div>
    </div>
  );
}
