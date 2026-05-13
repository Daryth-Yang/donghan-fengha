import { DhTopBar, DhMist, DhParticles, DhSection, DhCorners } from '../components/atmosphere';

export default function Page09_Sound() {
  const states = [
    { t: "沉睡", sub: "DORMANT", desc: "低频环境声 · 远处风声 · 微弱鼓点",      bpm: 18,  intensity: .15 },
    { t: "唤醒", sub: "AWAKEN",  desc: "鼓点逐渐清晰 · 节奏加快",                  bpm: 84,  intensity: .55 },
    { t: "重构", sub: "RESTORE", desc: "鼓声 · 陶片声 · 呼吸声交织",             bpm: 132, intensity: .9  },
    { t: "消散", sub: "FADE",    desc: "鼓点渐弱 · 回到风声 · 粒子淡出",         bpm: 36,  intensity: .25 },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="互动体验" page="09" />
        <DhMist />
        <DhParticles count={70} seed={47} opacityRange={[.2, .65]} />

        <div className="dh-p09__header">
          <DhSection num="玖" label="SOUND · 鼓点作为叙事线索" title="鼓点 · 文物被唤醒的节奏" />
          <div className="dh-caption">AUDIO · 4 STATES</div>
        </div>

        <div className="dh-p09__body">

          {/* 左：鼓点波纹中心 */}
          <div className="dh-p09__stage">

            {/* 同心波纹 */}
            <div className="dh-p09__ripples">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="dh-ripple" style={{
                  inset: `${i * 5.8}%`,
                  opacity: .65 - i * .07,
                  borderColor: i < 3 ? "var(--gold-3)" : "rgba(201,169,97,.35)"
                }} />
              ))}
              {/* 中心鼓 */}
              <div className="dh-drum-core dh-p09__drum">
                <div className="dh-p09__drum-inner" />
              </div>
            </div>

            {/* 山水叠影（极淡） */}
            <svg viewBox="0 0 500 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .25 }} preserveAspectRatio="none">
              <path d="M 0 320 L 60 280 L 120 310 L 200 250 L 280 290 L 360 240 L 440 280 L 500 250 L 500 400 L 0 400 Z" fill="rgba(201,169,97,.5)" />
            </svg>

            {/* 手势轨迹（金色细线，正弦） */}
            <svg viewBox="0 0 500 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
              <path d="M 40 200 Q 130 120, 220 200 T 400 200 T 580 200" stroke="rgba(230,200,132,.55)" strokeWidth=".6" fill="none" strokeDasharray="2 3" />
              <path d="M 40 220 Q 130 280, 220 220 T 400 220 T 580 220" stroke="rgba(154,122,62,.4)" strokeWidth=".6" fill="none" strokeDasharray="2 3" />
            </svg>

            {/* 角落标签 */}
            <div style={{ position: "absolute", left: 18, top: 14 }} className="dh-caption">CENTER · 鼓 · 0,0,0</div>
            <div style={{ position: "absolute", right: 18, top: 14 }} className="dh-caption">RIPPLE · r → ∞</div>
            <div style={{ position: "absolute", left: 18, bottom: 14 }} className="dh-caption">SAMPLE · 48 kHz</div>
            <div style={{ position: "absolute", right: 18, bottom: 14 }} className="dh-caption">CHANNELS · 2.1</div>
            <div className="dh-corner tl" /><div className="dh-corner tr" /><div className="dh-corner bl" /><div className="dh-corner br" />
          </div>

          {/* 右：四种声音状态 + 波形 */}
          <div className="dh-p09__states">
            {states.map((s, i) => (
              <div key={i} className="dh-card dh-p09__state-card">
                <div className="dh-p09__state-head">
                  <div>
                    <div className="dh-caption" style={{ color: "var(--gold-2)" }}>{`STATE · 0${i+1} · ${s.sub}`}</div>
                    <div className="dh-title-s" style={{ marginTop: 2 }}>{s.t}</div>
                  </div>
                  <div className="dh-caption">{s.bpm} BPM</div>
                </div>
                {/* 波形 */}
                <div className="dh-p09__wave">
                  {[...Array(56)].map((_, k) => {
                    const phase = (k / 56) * Math.PI * 4;
                    const pct = (Math.abs(Math.sin(phase + i)) * s.intensity) * 90 + 10;
                    return <div key={k} style={{ flex: 1, height: `${pct}%`, minHeight: 3, background: "linear-gradient(180deg, var(--gold-4), var(--gold-2))", opacity: .5 + s.intensity * .5 }} />;
                  })}
                </div>
                <div className="dh-body" style={{ color: "var(--paper-3)", marginTop: 8 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dh-p09__footer">
          <p className="dh-body dh-p09__footer-quote">
            「声音不是背景音乐，而是文物被唤醒的节奏。鼓点响起时，陶俑回到场上；鼓点落下时，他们回到尘土。」
          </p>
          <div className="dh-caption">SOUND · 鼓 / 风 / 陶片 / 呼吸</div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
