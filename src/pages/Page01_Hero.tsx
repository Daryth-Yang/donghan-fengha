import { Link } from 'react-router-dom';
import { DhTopBar, DhMist, DhMountains, DhParticles, DhFigurine, DhMeander, DhCorners, DhSection } from '../components/atmosphere';

const MODULE_ENTRIES: ReadonlyArray<{ label: string; path: string; num: string; en: string }> = [
  { label: '历史背景', path: '/history',     num: '02', en: 'HISTORY' },
  { label: '文物群像', path: '/figures',     num: '04', en: 'FIGURES' },
  { label: '互动体验', path: '/interaction', num: '06', en: 'INTERACT' },
  { label: '展陈方案', path: '/exhibition',  num: '08', en: 'EXHIBIT' },
];

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
          <DhFigurine width={260} height={320} label="击鼓说唱俑" code="FIG-01" />
        </div>

        {/* 章节头条（与 04/06/08 同模板） */}
        <div className="dh-p01__header">
          <DhSection num="壹" label="HOMEPAGE · 启动 · 数字卷轴" title="东汉风华 · 俳优之志" />
          <div className="dh-caption">EASTERN HAN · A DIGITAL SCROLL</div>
        </div>

        {/* 中央内容（响应式 flex 居中，随窗口比例自然排布） */}
        <div className="dh-p01__content">
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

          <nav className="dh-p01__entries" aria-label="模块入口">
            {MODULE_ENTRIES.map((m) => (
              <Link key={m.path} to={m.path} className="dh-p01__entry" aria-label={`进入 ${m.label}`}>
                <span className="dh-p01__entry-num">— {m.num}</span>
                <span className="dh-p01__entry-cn">{m.label}</span>
                <span className="dh-p01__entry-en">{m.en}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* 其余四俑 —— 配角列阵（透明剪影，hover 唤醒） */}
        <div className="dh-p01__cast" aria-label="其余四俑预览">
          <div className="dh-eyebrow dh-p01__cast-eyebrow">其余四俑 · ENSEMBLE OF FOUR</div>
          <div className="dh-p01__cast-row">
            {[
              { code: 'FIG-02', cn: '零·贰', name: '陶说唱俑' },
              { code: 'FIG-03', cn: '零·叁', name: '说唱俑' },
              { code: 'FIG-04', cn: '零·肆', name: '陶俳优俑' },
              { code: 'FIG-05', cn: '零·伍', name: '俳优·尾声' },
            ].map((c) => (
              <Link
                key={c.code}
                to={`/detail?fig=${c.code.replace(/^FIG-/, '')}`}
                className="dh-p01__cast-item"
                title={`查看 ${c.name} 详情`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <DhFigurine width={64} height={84} label={c.name} code={c.code} />
                <div className="dh-caption dh-p01__cast-num">{c.cn}</div>
              </Link>
            ))}
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
