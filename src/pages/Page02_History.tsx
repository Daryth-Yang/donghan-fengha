import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DhTopBar, DhMist, DhParticles, DhSection, DhCorners } from '../components/atmosphere';

type Lens = 'folk' | 'non-hero' | 'body';

const TIMELINE_NODES = [
  { id: '25',  year: '25年',    topic: '东汉建立',           desc: '光武中兴，王朝复起；雒阳宫阙，钟鼓初鸣。',                       tags: 'power' },
  { id: '184', year: '184年',   topic: '黄巾起义',           desc: '苍天已死，黄天当立；流民、灾荒、战火并起，民间叙事第一次盖过庙堂。', tags: 'folk non-hero' },
  { id: '189', year: '189年后', topic: '朝廷动荡 · 群雄割据', desc: '宦官外戚相斗，地方势力坐大，山河碎裂。',                         tags: 'power' },
  { id: '220', year: '220年',   topic: '东汉结束',           desc: '曹丕代汉，魏室肇立。一个朝代的鼓点戛然停止。',                   tags: 'power' },
  { id: 'now', year: '当代',    topic: '文物再被唤醒',        desc: '陶俑在博物馆的玻璃柜中沉睡；观众的手势成为新的鼓槌。',           tags: 'folk non-hero body' },
] as const;

const CHIPS: ReadonlyArray<{ id: Lens; cn: string }> = [
  { id: 'folk',     cn: '民间叙事' },
  { id: 'non-hero', cn: '非英雄视角' },
  { id: 'body',     cn: '身体 · 鼓点 · 笑' },
];

const REF_FULL = '《后汉书》《风俗通义》《盐铁论》—— 关于俳优、击鼓说唱、宴饮表演与民间风俗的存世记述。';

export default function Page02_History() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [lens, setLens] = useState<Lens | null>(null);

  const focusNode = TIMELINE_NODES.find((n) => n.id === hoveredNode) ?? TIMELINE_NODES[0];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="历史背景" page="02" />
        <DhMist />
        <DhParticles count={50} seed={7} sizeRange={[1, 2]} opacityRange={[.15, .55]} />

        <div className="dh-p02__bg-glow" />
        <div className="dh-mountain --back dh-p02__mountain-back" />
        <div className="dh-mountain --mid dh-p02__mountain-mid" />

        <div className="dh-p02__header">
          <DhSection num="贰" label="HISTORY · DYNASTIC FALL" title="王朝将倾 · 鼓声未息" />
          <div className="dh-caption">TIMELINE · 25 — 220 AD</div>
        </div>

        <div className={`dh-p02__body${lens ? ` --lens-${lens}` : ''}`}>

          {/* ① 立论 */}
          <section className="dh-p02__statement">
            <h2 className="dh-title-l dh-p02__statement-title">
              史书写战争，<br />而陶俑记住了笑声。
            </h2>
            <p className="dh-body-l dh-p02__statement-sub">
              在烽火与权谋之外，一面小鼓敲响了民间未被记录的笑声。
              这一章从陶俑出发，重新看见乱世里的普通人。
            </p>
          </section>

          {/* ② 横向时间长卷 */}
          <section className="dh-p02__timeline" aria-label="东汉时间轴">
            <div className="dh-p02__timeline-meta">
              <span className="dh-caption dh-p02__timeline-eyebrow">TIMELINE · 公元纪</span>
              <span className="dh-caption dh-p02__timeline-hint">悬停节点 · 查看年代</span>
            </div>

            <div className="dh-p02__timeline-track">
              <div className="dh-p02__timeline-rule" aria-hidden="true" />
              {TIMELINE_NODES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`dh-p02__tnode${focusNode.id === n.id ? ' --focused' : ''}`}
                  data-tags={n.tags}
                  onMouseEnter={() => setHoveredNode(n.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onFocus={() => setHoveredNode(n.id)}
                  onBlur={() => setHoveredNode(null)}
                  aria-label={`${n.year} · ${n.topic}`}
                >
                  <span className="dh-p02__tnode-dot" aria-hidden="true" />
                  <span className="dh-p02__tnode-year">{n.year}</span>
                  <span className="dh-p02__tnode-topic">{n.topic}</span>
                </button>
              ))}
            </div>

            {/* 焦点信息条 —— 随悬停节点切换，默认显示第一节点 */}
            <div className="dh-p02__focus" key={focusNode.id}>
              <div className="dh-p02__focus-meta">
                <span className="dh-caption">FOCUS</span>
                <span className="dh-title-s dh-p02__focus-year">{focusNode.year} · {focusNode.topic}</span>
              </div>
              <p className="dh-body dh-p02__focus-desc">{focusNode.desc}</p>
            </div>
          </section>

          {/* ③ 视角图例 + REF */}
          <section className="dh-p02__legend" aria-label="叙事视角图例">
            <span className="dh-caption dh-p02__legend-eyebrow">LENS · 视角图例</span>
            <div className="dh-p02__legend-row">
              {CHIPS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`dh-p02__chip${lens === c.id ? ' --active' : ''}`}
                  onMouseEnter={() => setLens(c.id)}
                  onMouseLeave={() => setLens(null)}
                  onFocus={() => setLens(c.id)}
                  onBlur={() => setLens(null)}
                  aria-pressed={lens === c.id}
                >
                  {c.cn}
                </button>
              ))}
              <div className="dh-p02__ref" tabIndex={0}>
                <span className="dh-chip-mono dh-p02__ref-trigger">REF · 后汉书 / 风俗通义</span>
                <div className="dh-p02__ref-pop" role="tooltip">{REF_FULL}</div>
              </div>
            </div>
          </section>
        </div>

        {/* 下一章 CTA */}
        <Link to="/figures" className="dh-btn dh-p02__next" aria-label="下一章 · 文物群像">
          <span>下一章 · 文物群像</span>
          <span style={{ letterSpacing: 0 }}>—— →</span>
        </Link>

        <DhCorners />
      </div>
    </div>
  );
}
