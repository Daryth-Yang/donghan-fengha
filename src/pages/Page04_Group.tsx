import { DhTopBar, DhMist, DhParticles, DhSection, DhRipples, DhFigurine, DhCorners, cn } from '../components/atmosphere';

export default function Page04_Group() {
  const figures = [
    { cn: "陶俳优俑", code: "FIG-04", h: 280, kw: "戏谑 · 民间",   one: "他的身体像一段凝固的表演，保留着民间艺人的夸张与幽默。" },
    { cn: "陶说唱俑", code: "FIG-02", h: 320, kw: "笑声 · 吐舌",   one: "他张口、弯腰、吐舌，把苦难讲成笑话，也把笑话变成历史。" },
    { cn: "击鼓说唱俑", code: "FIG-01", h: 380, kw: "鼓点 · 主叙事", one: "他不是战争的英雄，却用一面小鼓敲开乱世中普通人的笑声。", featured: true },
    { cn: "说唱俑",   code: "FIG-03", h: 320, kw: "蜀地 · 百戏",   one: "他来自巴蜀的生活现场，连接着汉代说唱与民间娱乐。" },
    { cn: "陶俳优俑 · 尾声", code: "FIG-05", h: 280, kw: "群像 · 消散", one: "他像最后一个退场的表演者，在粒子消散前回望观众。" },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="文物群像" page="04" />
        <DhMist />
        <DhParticles count={70} seed={17} opacityRange={[.2, .55]} />

        <div style={{ position: "absolute", top: 110, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <DhSection num="肆" label="FIVE FIGURES · 半圆舞台" title="五个俑 · 五种民间表情" />
          <div className="dh-caption">HOVER · 金粒光环 + 鼓点波纹</div>
        </div>

        {/* 半圆舞台 */}
        <div style={{ position: "absolute", left: 56, right: 56, top: 220, height: 530 }}>
          {/* 舞台背景：陶土色弧形 */}
          <svg viewBox="0 0 1328 530" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
            <defs>
              <radialGradient id="stage" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#3a2c14" stopOpacity=".55"/>
                <stop offset="60%" stopColor="#15121a" stopOpacity=".25"/>
                <stop offset="100%" stopColor="#07060a" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="664" cy="600" rx="700" ry="320" fill="url(#stage)" />
            <ellipse cx="664" cy="600" rx="700" ry="320" fill="none" stroke="rgba(154,122,62,.25)" strokeWidth="1" />
            <ellipse cx="664" cy="600" rx="500" ry="220" fill="none" stroke="rgba(154,122,62,.15)" strokeWidth="1" strokeDasharray="3 6" />
          </svg>

          {/* 五个俑 —— 半圆排布 */}
          <div style={{ position: "absolute", inset: 0 }}>
            {figures.map((f, i) => {
              const total = figures.length;
              const ratio = total > 1 ? i / (total - 1) : 0.5;
              const xPct = 12 + ratio * 76;
              const arcY = 240 - Math.sin(ratio * Math.PI) * 90;
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: `${xPct}%`, top: arcY,
                  transform: "translateX(-50%)",
                  textAlign: "center"
                }}>
                  {f.featured && <DhRipples count={3} size={260} x="50%" y={f.h / 2 + 0} />}
                  <div className="dh-halo" style={{ width: 180, height: 180, left: "50%", top: f.h / 2 - 90, transform: "translateX(-50%)", opacity: f.featured ? .9 : .25 }} />
                  <DhFigurine width={f.featured ? 130 : 100} height={f.h} label={f.cn} code={f.code} featured={f.featured} />
                  <div className="dh-caption" style={{ marginTop: 14, color: "var(--gold-2)" }}>{`零·${cn(i + 1)}`}</div>
                  <div className="dh-title-s" style={{ fontSize: 15, marginTop: 6 }}>{f.cn}</div>
                  <div className="dh-body" style={{ fontSize: 11, color: "var(--paper-3)", marginTop: 4, letterSpacing: ".22em" }}>{f.kw}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部说明 —— 当前选中（中间这个） */}
        <div style={{ position: "absolute", bottom: 24, left: 56, right: 56, display: "flex", alignItems: "center", gap: 24 }}>
          <div className="dh-seal" style={{ width: 48, height: 48, fontSize: 22 }}>鼓</div>
          <div style={{ flex: 1 }}>
            <div className="dh-caption" style={{ marginBottom: 4 }}>FOCUS · FIG-01 · CHIEF NARRATOR</div>
            <div className="dh-quote" style={{ fontSize: 18, lineHeight: 1.6 }}>{figures[2].one}</div>
          </div>
          <button className="dh-btn-ghost">查看詳情 →</button>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
