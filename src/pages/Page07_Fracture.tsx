import { Fragment } from 'react';
import { DhTopBar, DhMist, DhParticles, DhCorners, DhSection, DhSectionNav } from '../components/atmosphere';

export default function Page07_Fracture() {
  const flow = ["完整陶俑", "手势扰动", "陶片破碎", "粒子游离", "重新聚合", "文物再生"];
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="互动体验" />
        <DhMist />
        <DhParticles count={70} seed={37} opacityRange={[.2, .7]} />

        <div className="dh-p07__header">
          <DhSection label="FRACTURE & RESTORE" title="破碎不是损毁 · 重构不是复原" />
          <div className="dh-caption">SHATTER → DRIFT → RE-FORM</div>
        </div>

        <DhSectionNav />

        {/* 主区：可滚动主体（短屏不再撞挤） */}
        <div className="dh-p07__body">
          <div className="dh-p07__body-inner">

        {/* 主视觉 */}
        <div className="dh-p07__stage">
          {/* 中心舞台辉光 */}
          <div className="dh-p07__glow" />

          {/* 左标签 */}
          <div className="dh-p07__side --left">
            <div className="dh-caption dh-p07__side-title">LEFT · 完整 · INTACT</div>
            <div className="dh-p07__side-chips">
              <span className="dh-chip">外层 · 陶土肌理</span>
              <span className="dh-chip">中层 · 体态凝固</span>
              <span className="dh-chip">內层 · 表情瞬间</span>
            </div>
            <p className="dh-body dh-p07__side-note">
              「完整」 是文物的当下状态，<br/>但不是它的全部历史。
            </p>
          </div>

          {/* 中心：半破碎陶俑 */}
          <div className="dh-p07__central">
            {/* 完整左半 */}
            <div className="dh-p07__half --left">
              <div className="dh-p07__half-cn">击鼓说唱俑</div>
              <div className="dh-p07__half-code">INTACT · 50%</div>
            </div>

            {/* 右半：破碎陶片 + 骨架 */}
            <div className="dh-p07__half --right">
              {/* 骨架线稿 */}
              <svg viewBox="0 0 190 420" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
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
              {/* 飞散陶片 —— 用 % 而非 px 以适应可变容器 */}
              {[
                { l: 16, t: 14, w: 28, h: 22, r: -18 },
                { l: 42, t: 26, w: 22, h: 16, r: 24 },
                { l: 68, t: 19, w: 18, h: 26, r: 10 },
                { l: 78, t: 48, w: 26, h: 20, r: -28 },
                { l: 31, t: 60, w: 18, h: 14, r: 38 },
                { l: 57, t: 71, w: 22, h: 18, r: -14 },
                { l: 16, t: 81, w: 26, h: 22, r: 20 },
              ].map((p, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: `${p.l}%`,
                  top: `${p.t}%`,
                  width: p.w,
                  height: p.h,
                  background: "rgba(154,122,62,.5)",
                  border: "1px solid var(--gold-3)",
                  transform: `rotate(${p.r}deg)`,
                  boxShadow: "0 0 12px rgba(201,169,97,.3)"
                }} />
              ))}
              {/* 金色粒子 */}
              {[...Array(40)].map((_, i) => {
                const x = ((i * 37) % 190) / 190 * 100;
                const y = ((i * 53) % 420) / 420 * 100;
                return <div key={i} className="dh-dot" style={{ left: `${x}%`, top: `${y}%`, width: 2, height: 2, background: "var(--gold-4)", boxShadow: "0 0 6px var(--gold-4)", opacity: .7 }} />;
              })}
            </div>

            {/* 中线 */}
            <div className="dh-rule-v dh-p07__midline" />
          </div>

          {/* 右标签 */}
          <div className="dh-p07__side --right">
            <div className="dh-caption dh-p07__side-title">RIGHT · 重构 · RECONSTRUCT</div>
            <div className="dh-p07__side-chips">
              <span className="dh-chip">外层 · 陶片碎裂</span>
              <span className="dh-chip">中层 · 金色粒子</span>
              <span className="dh-chip">內层 · 骨架线稿</span>
            </div>
            <p className="dh-body dh-p07__side-note">
              「破碎」 是时间留下的痕迹，<br/>「重构」 是当代的回答。
            </p>
          </div>
        </div>

        {/* 底部流程 */}
        <div className="dh-p07__flow">
          <div className="dh-caption dh-p07__flow-title">FLOW · 六态</div>
          <div className="dh-p07__flow-row">
            {flow.map((f, i) => (
              <Fragment key={f}>
                <div className="dh-p07__flow-step">
                  <div className={`dh-p07__flow-dot${(i === 2 || i === 3) ? ' --active' : ''}`} />
                  <div className="dh-title-s dh-p07__flow-label">{f}</div>
                  <div className="dh-caption dh-p07__flow-num">{`0${i+1}`}</div>
                </div>
                {i < flow.length - 1 && <div className="dh-p07__flow-link" />}
              </Fragment>
            ))}
          </div>
        </div>

        <p className="dh-body dh-p07__quote">
          「破碎不是文物的终点，而是时间留下的痕迹。重构也不是简單复原，而是当代观众与文物之间的一次重新连接。」
        </p>

          </div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
