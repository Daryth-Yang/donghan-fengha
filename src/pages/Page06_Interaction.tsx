import { DhTopBar, DhMist, DhParticles, DhFigurine, DhCorners, DhSection } from '../components/atmosphere';

export default function Page06_Interaction() {
  const steps = [
    { n: "01", t: "观众靠近",  d: "摄像头捕捉到人影，黑色背景中浮现金色粒子。" },
    { n: "02", t: "人影停留",  d: "陶俑轮廓逐渐显现，粒子由散点聚合成身体。" },
    { n: "03", t: "手势移动",  d: "手掌左右移动，控制粒子流动 / 鼓点节奏 / 身体破碎方向。" },
    { n: "04", t: "手势张开",  d: "俑体破碎，陶片与粒子向外扩散。" },
    { n: "05", t: "手势合拢",  d: "破碎陶片重新聚合，形成完整俑像。" },
    { n: "06", t: "人影离开",  d: "鼓点渐弱，俑群慢慢消散，回到黑暗。" },
  ];

  const states = [
    { t: "未唤醒",  sub: "DORMANT",   particles: 8,  showFig: false, hint: "静默 · 微尘浮动" },
    { t: "粒子聚合", sub: "GATHER",    particles: 60, showFig: "ghost", hint: "轮廓初现" },
    { t: "破碎扩散", sub: "BURST",     particles: 90, showFig: "burst",  hint: "陶片外扩" },
    { t: "重构完成", sub: "RESTORE",   particles: 40, showFig: "solid",  hint: "鼓槌已扬" },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="互动体验" page="06" />
        <DhMist />

        <div className="dh-p06__header">
          <DhSection num="陆" label="INTERACTION · TouchDesigner FLOW" title="手势成为新的鼓槌" />
          <div className="dh-caption">CAM → TD → PROJ / SPK</div>
        </div>

        {/* 主区双栏 */}
        <div className="dh-p06__main">

          {/* 左：六步流程 */}
          <div>
            <div className="dh-caption dh-p06__col-title">FLOW · 六步</div>
            <div className="dh-p06__flow">
              {steps.map((s) => (
                <div key={s.n} className="dh-card dh-p06__step">
                  <div className="dh-title-s dh-p06__step-num">{s.n}</div>
                  <div>
                    <div className="dh-title-s">{s.t}</div>
                  </div>
                  <div className="dh-body dh-p06__step-desc">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：四个状态预览 */}
          <div>
            <div className="dh-caption dh-p06__col-title">STATE PREVIEW · 四态</div>
            <div className="dh-p06__states">
              {states.map((st, i) => (
                <div key={i} className="dh-p06__state-card">
                  <DhParticles count={st.particles} seed={31 + i} opacityRange={[.2, .85]} />
                  {st.showFig === "ghost" && (
                    <div className="dh-p06__state-fig --ghost">
                      <DhFigurine width={50} height={130} label="显" code="GHOST" />
                    </div>
                  )}
                  {st.showFig === "burst" && (
                    <div className="dh-p06__state-fig">
                      <div style={{ position: "relative", width: 60, height: 140 }}>
                        <DhFigurine width={50} height={130} label="碎" code="BURST" />
                        {[...Array(8)].map((_, k) => (
                          <div key={k} className="dh-dot" style={{
                            width: 4, height: 4, background: "var(--gold-4)",
                            left: 30 + Math.cos(k * 0.78) * (30 + k * 4),
                            top:  70 + Math.sin(k * 0.78) * (30 + k * 4),
                            boxShadow: "0 0 6px var(--gold-4)"
                          }}/>
                        ))}
                      </div>
                    </div>
                  )}
                  {st.showFig === "solid" && (
                    <div className="dh-p06__state-fig">
                      <DhFigurine width={56} height={140} label="重" code="SOLID" featured />
                    </div>
                  )}

                  <div className="dh-p06__state-label">
                    <div className="dh-caption dh-p06__state-eyebrow">{`STATE · 0${i+1}`}</div>
                    <div className="dh-title-s dh-p06__state-title">{st.t}</div>
                    <div className="dh-caption dh-p06__state-sub">{st.sub}</div>
                  </div>
                  <div className="dh-caption dh-p06__state-hint">{st.hint}</div>
                  <div className="dh-corner tl" />
                  <div className="dh-corner br" />
                </div>
              ))}
            </div>

            {/* 硬件 */}
            <div className="dh-card dh-p06__hardware">
              <span className="dh-caption dh-p06__hardware-label">HARDWARE</span>
              <span className="dh-chip-mono">摄像头</span>
              <span className="dh-chip-mono">TouchDesigner</span>
              <span className="dh-chip-mono">投影 / 大屏</span>
              <span className="dh-chip-mono">音响</span>
              <span className="dh-chip-mono">键盘备用</span>
            </div>
          </div>
        </div>

        <div className="dh-p06__footer">
          <div className="dh-caption">SIGNAL · 摄像头(轮廓 / 手势) → TouchDesigner(粒子 / 破碎 / 鼓点) → 投影 + 音响</div>
          <div className="dh-caption">FPS · 60 &nbsp;·&nbsp; LATENCY · ≤ 80 ms</div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
