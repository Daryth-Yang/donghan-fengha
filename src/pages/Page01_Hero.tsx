import { Link } from 'react-router-dom';
import { DhTopBar, DhMist, DhMountains, DhParticles, DhFigurine, DhMeander, DhCorners, DhSection } from '../components/atmosphere';

const MODULE_ENTRIES: ReadonlyArray<{ label: string; path: string; en: string }> = [
  { label: '历史背景', path: '/history',     en: 'HISTORY' },
  { label: '文物群像', path: '/figures',     en: 'FIGURES' },
  // 互动体验 section 暂时隐藏；恢复时把下面这行还原并把 CSS 的 grid 列数改回 4
  // { label: '互动体验', path: '/interaction', en: 'INTERACT' },
  { label: '展陈方案', path: '/exhibition',  en: 'EXHIBIT' },
];

export default function Page01_Hero() {
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="首页" />

        {/* 背景层：覆盖整个视口 */}
        <DhMist />
        <DhMountains />
        <DhParticles count={120} seed={3} sizeRange={[1, 2.4]} />


        {/* 章节头条（与 04/06/08 同模板） */}
        <div className="dh-p01__header">
          <DhSection label="HOMEPAGE · 启动 · 数字卷轴" title="东汉风华 · 俳优之志" />
          <div className="dh-caption">EASTERN HAN · A DIGITAL SCROLL</div>
        </div>

        {/* 主区：可滚动主体（高屏自然居中，短屏可滚） */}
        <div className="dh-p01__body">
          <div className="dh-p01__body-inner">

        {/* 中央内容（响应式 flex 居中，随窗口比例自然排布） */}
        <div className="dh-p01__content">
          {/* 标题 + 背景陶俑（陶俑居 H1 正中，中心对中心，大小同步缩放） */}
          <div className="dh-p01__title-stack">
            <span className="dh-p01__title-figure" aria-hidden="true">
              <DhFigurine
                width="clamp(240px, 19vw, 420px)"
                height="clamp(300px, 24vw, 520px)"
                label="击鼓说唱俑"
                code="FIG-01"
              />
            </span>
            <h1 className="dh-title-xl dh-p01__title-text" style={{ margin: 0 }}>
              东汉风华 俳优之志
            </h1>
          </div>

          <DhMeander width={420} />

          <p className="dh-body-l" style={{ margin: 0 }}>
            基于 TouchDesigner 的东汉击鼓说唱俑互动数字叙事交互产品设计
          </p>

          <p className="dh-body dh-p01__story" style={{ margin: 0, lineHeight: 2.1 }}>
            在东汉末年的动荡山河之间，一面小鼓敲响了民间的笑声。<br />
            观众以手势唤醒陶俑，让沉睡千年的俳优在粒子、鼓点与光影中重新登场。
          </p>

          <nav className="dh-p01__entries" aria-label="模块入口">
            {MODULE_ENTRIES.map((m) => (
              <Link key={m.path} to={m.path} className="dh-p01__entry" aria-label={`进入 ${m.label}`}>
                <span className="dh-p01__entry-cn">{m.label}</span>
                <span className="dh-p01__entry-en">{m.en}</span>
              </Link>
            ))}
          </nav>

          {/* 直达终章入口（不抢主 CTA） */}
          <Link to="/ending" className="dh-p01__finale-link" aria-label="直达尾声 · 笑声归尘">
            <span className="dh-p01__finale-cn">尾声 · 笑声归尘</span>
            <span className="dh-p01__finale-en">FINALE</span>
            <span className="dh-p01__finale-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 其余四俑 —— 配角列阵（透明剪影，hover 唤醒） */}
        <div className="dh-p01__cast" aria-label="其余四俑预览">
          <div className="dh-eyebrow dh-p01__cast-eyebrow">其余四俑 · ENSEMBLE OF FOUR</div>
          <div className="dh-p01__cast-row">
            {[
              { code: 'FIG-02', name: '陶说唱俑' },
              { code: 'FIG-03', name: '说唱俑' },
              { code: 'FIG-04', name: '陶俳优俑' },
              { code: 'FIG-05', name: '俳优·尾声' },
            ].map((c) => (
              <Link
                key={c.code}
                to={`/detail?fig=${c.code.replace(/^FIG-/, '')}`}
                className="dh-p01__cast-item"
                title={`查看 ${c.name} 详情`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <DhFigurine width="clamp(56px, 5vw, 110px)" height="clamp(74px, 6.6vw, 145px)" label={c.name} code={c.code} />
                <div className="dh-caption dh-p01__cast-num">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* 底部年代刻度 —— 仅保留项目所覆盖的历史时段 */}
        <div className="dh-p01__scale">
          <div className="dh-caption">25 AD &nbsp;——&nbsp; 220 AD &nbsp;——&nbsp; 2026 NOW</div>
        </div>

          </div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
