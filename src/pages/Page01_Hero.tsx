import { DhTopBar, DhMist, DhMountains, DhParticles, DhFigurine, DhMeander, DhCorners } from '../components/atmosphere';

export default function Page01_Hero() {
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="首页" page="01" />

        {/* 背景层：覆盖整个视口 */}
        <DhMist />
        <DhMountains />
        <DhParticles count={120} seed={3} sizeRange={[1, 2.4]} />

        {/* 远景陶俑剪影 */}
        <div className="dh-p01__bg-figurine">
          <DhFigurine width={180} height={360} label="击鼓说唱俑" code="EH·CHIEF" />
        </div>

        {/* 侧边卷标 */}
        <div className="dh-side-vert dh-p01__sidemark">俳优之志 · 第 一 章</div>

        {/* 中央内容（响应式 flex 居中，随窗口比例自然排布） */}
        <div className="dh-p01__content">
          <div className="dh-eyebrow">EASTERN HAN · A DIGITAL SCROLL</div>

          <h1 className="dh-title-xl" style={{ margin: 0 }}>
            东汉风华 <span style={{ color: 'var(--gold-2)', margin: '0 .2em' }}>·</span> 俳优之志
          </h1>

          <DhMeander width={420} />

          <p className="dh-body-l" style={{ margin: 0 }}>
            基于 TouchDesigner 的东汉击鼓说唱俑互动数字叙事交互产品设计
          </p>

          <p className="dh-body dh-p01__story" style={{ margin: 0, lineHeight: 2.1 }}>
            在东汉末年的动荡山河之间，一面小鼓敲响了民间的笑声。<br />
            观众以手势唤醒陶俑，让沉睡千年的俳优在粒子、鼓点与光影中重新登场。
          </p>

          <div className="dh-p01__cta">
            <button className="dh-btn">开始听鼓 <span style={{ letterSpacing: 0 }}>—— →</span></button>
            <button className="dh-btn-ghost">展陈说明</button>
          </div>
        </div>

        {/* 底部刻度尺 */}
        <div className="dh-p01__scale">
          <div className="dh-caption">25 AD &nbsp;——&nbsp; 220 AD &nbsp;——&nbsp; 2026 NOW</div>
          <div className="dh-p01__ticks">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                width: i === 0 ? 28 : 12, height: 1,
                background: i === 0 ? 'var(--gold-3)' : 'rgba(154,122,62,.4)',
              }} />
            ))}
          </div>
          <div className="dh-caption">CHAPTER 01 / 10</div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
