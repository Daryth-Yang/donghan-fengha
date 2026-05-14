import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { DhTopBar, DhMist, DhParticles, DhSection, DhSectionNav, DhMountainLayer, DhCorners } from '../components/atmosphere';

type Lens = 'folk' | 'non-hero' | 'body';
type Tone = 'cold' | 'mid' | 'warm' | 'gold';

/* —— 横向画卷 · 五帧 —— 每帧含：字 / 英文 / 色调 / 标题 / 状态 / 叙事 / 引文 / 出处 —— */
type Frame = {
  key: string;
  cn: string;
  en: string;
  tone: Tone;
  title: string;
  state: string;
  body: string;
  quote: string;
  source: string;
};

const FRAMES: ReadonlyArray<Frame> = [
  {
    key: 'war',
    cn: '烽',  en: 'WAR',     tone: 'cold',
    title: '烽火不息',
    state: '远景 · 25–220 AD',
    body: '州郡频破，雒阳烧三日不尽。从黄巾到赤壁，史书写满了名字。',
    quote: '白骨露於野，千里无鸡鸣。',
    source: '曹操《蒿里行》',
  },
  {
    key: 'exodus',
    cn: '旅',  en: 'EXODUS',  tone: 'cold',
    title: '南渡未休',
    state: '中景 · 流民迁徙',
    body: '中原板荡，士庶南下荆襄、巴蜀。一支家族走上数年，沿途立坟、生子、改姓。',
    quote: '关东有义士，兴兵讨群凶。',
    source: '曹操《薤露行》',
  },
  {
    key: 'market',
    cn: '市',  en: 'MARKET',  tone: 'mid',
    title: '市井重开',
    state: '近景 · 落脚之地',
    body: '到了安处，集市再开。盐铁、布帛、酒肉、说书。鼓声从远处的烽烟里被收回，落在街口。',
    quote: '市井之处，鼓乐相闻。',
    source: '《盐铁论》',
  },
  {
    key: 'play',
    cn: '戏',  en: 'PLAY',    tone: 'warm',
    title: '俳优击鼓',
    state: '场中 · 一面小鼓',
    body: '俳优坐在人群中央，肘抱小鼓，张口而笑。一时之间，围观者忘了北面的烽烟，也忘了去年的瘟疫。',
    quote: '击鼓鸣笙，舞罢俳优。',
    source: '《风俗通义》',
  },
  {
    key: 'figure',
    cn: '俑',  en: 'FIGURE',  tone: 'gold',
    title: '泥土留声',
    state: '定格 · 1800 年',
    body: '那一刻被陶工捏进泥里，进入坟墓，再被掘出。两千年过去，他还张着嘴。',
    quote: '俑笑而不衰，王朝倾而无声。',
    source: '1957 · 天回山 · 国博',
  },
];

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
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const frameRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // 自动巡演：每 3.8s 切下一帧；切到最后一帧自动停
  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setSelectedFrame((i) => {
        const next = i + 1;
        if (next >= FRAMES.length) {
          setAutoPlay(false);
          return i;
        }
        return next;
      });
    }, 3800);
    return () => window.clearInterval(id);
  }, [autoPlay]);

  const moveFrame = (delta: number) => {
    setSelectedFrame((i) => {
      const next = i + delta;
      if (next < 0) return 0;
      if (next >= FRAMES.length) return FRAMES.length - 1;
      frameRefs.current[next]?.focus();
      return next;
    });
  };

  const handleFrameKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      moveFrame(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      moveFrame(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSelectedFrame(0);
      frameRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setSelectedFrame(FRAMES.length - 1);
      frameRefs.current[FRAMES.length - 1]?.focus();
    }
  };

  const detailIndex = hoveredFrame ?? selectedFrame;
  const detail = FRAMES[detailIndex];
  const progress = ((selectedFrame + 1) / FRAMES.length) * 100;

  const focusNode = TIMELINE_NODES.find((n) => n.id === hoveredNode) ?? TIMELINE_NODES[0];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="历史背景" />
        <DhMist />
        <DhParticles count={50} seed={7} sizeRange={[1, 2]} opacityRange={[.15, .55]} />

        <div className="dh-p02__bg-glow" />
        <DhMountainLayer variant="back" className="dh-p02__mountain-back" />
        <DhMountainLayer variant="mid" className="dh-p02__mountain-mid" />

        <div className="dh-p02__header">
          <DhSection label="HISTORY · DYNASTIC FALL" title="王朝将倾 · 鼓声未息" />
        </div>

        <DhSectionNav />

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
              <span className="dh-title-s dh-p02__focus-year">{focusNode.year} · {focusNode.topic}</span>
              <p className="dh-body dh-p02__focus-desc">{focusNode.desc}</p>
            </div>
          </section>

          {/* ③ 视角图例 + REF */}
          <section className="dh-p02__legend" aria-label="叙事视角图例">
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

          {/* ④ 横向画卷 —— 五帧叙事，可点击 / 键盘 / 自动巡演 */}
          <section className="dh-p02__canvas" aria-label="横向画卷">
            <div className="dh-p02__canvas-meta">
              <span className="dh-caption dh-p02__canvas-eyebrow">
                CANVAS · 横向画卷 · {String(selectedFrame + 1).padStart(2, '0')} / {String(FRAMES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className={`dh-p02__autoplay${autoPlay ? ' --on' : ''}`}
                onClick={() => setAutoPlay((p) => !p)}
                aria-pressed={autoPlay}
              >
                <span className="dh-p02__autoplay-icon" aria-hidden="true">{autoPlay ? '❚❚' : '▷'}</span>
                <span className="dh-p02__autoplay-label">{autoPlay ? 'PAUSE' : 'AUTO'}</span>
              </button>
            </div>

            <div className="dh-p02__stage">
              <div className="dh-p02__vB" role="tablist" aria-label="叙事帧">
                <div className="dh-p02__vB-rail" aria-hidden="true" />
                <div
                  className="dh-p02__vB-rail-progress"
                  style={{ width: `calc(${progress}% - ${progress === 100 ? 0 : 8}px)` }}
                  aria-hidden="true"
                />
                {FRAMES.map((f, i) => {
                  const isActive = selectedFrame === i;
                  const isHovered = hoveredFrame === i;
                  return (
                    <button
                      ref={(el) => { frameRefs.current[i] = el; }}
                      key={f.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      className={`dh-p02__vB-frame --${f.tone}${isActive ? ' --active' : ''}${isHovered ? ' --hover' : ''}`}
                      style={{ animationDelay: `${i * 0.12}s` }}
                      onClick={() => setSelectedFrame(i)}
                      onMouseEnter={() => setHoveredFrame(i)}
                      onMouseLeave={() => setHoveredFrame(null)}
                      onFocus={() => setSelectedFrame(i)}
                      onKeyDown={handleFrameKey}
                    >
                      <div className="dh-p02__vB-glyph" aria-hidden="true">{f.cn}</div>
                      <div className="dh-p02__vB-art" aria-hidden="true">
                        {f.tone === 'gold' ? (
                          <img src="/figurines/fig-01.png" alt="" className="dh-p02__vB-fig" loading="lazy" />
                        ) : (
                          <ScrollSilhouette tone={f.tone} index={i} />
                        )}
                      </div>
                      <div className="dh-p02__vB-label">
                        <span className="dh-p02__vB-cn">{f.title}</span>
                        <span className="dh-p02__vB-en">{f.en}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="dh-p02__vB-detail" key={detail.key}>
                <div className="dh-p02__vB-detail-meta">
                  <span className="dh-p02__vB-detail-num">
                    {String(detailIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="dh-p02__vB-detail-title">{detail.title}</span>
                  <span className="dh-p02__vB-detail-state">{detail.state}</span>
                </div>
                <p className="dh-p02__vB-detail-body">{detail.body}</p>
                <p className="dh-p02__vB-detail-quote">
                  <span className="dh-p02__vB-mark" aria-hidden="true">「</span>
                  {detail.quote}
                  <span className="dh-p02__vB-mark" aria-hidden="true">」</span>
                  <span className="dh-p02__vB-detail-source"> —— {detail.source}</span>
                </p>
              </div>
            </div>
          </section>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}

/* ——— 五帧 SVG 剪影：远景战火 / 流民 / 市集 / 戏台 ——— */
function ScrollSilhouette({ tone, index }: { tone: 'cold' | 'mid' | 'warm'; index: number }) {
  if (tone === 'cold' && index === 0) {
    // 烽：远山+烟
    return (
      <svg viewBox="0 0 100 60" className="dh-p02__vB-svg" aria-hidden="true">
        <path d="M0,55 L18,38 L34,46 L52,30 L70,42 L86,34 L100,48 L100,60 L0,60 Z" fill="currentColor" opacity=".4" />
        <path d="M48,30 Q50,18 46,10 Q52,16 50,4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity=".55" />
        <path d="M72,42 Q74,32 70,26" stroke="currentColor" strokeWidth="0.6" fill="none" opacity=".45" />
      </svg>
    );
  }
  if (tone === 'cold' && index === 1) {
    // 旅：流民列队
    return (
      <svg viewBox="0 0 100 60" className="dh-p02__vB-svg" aria-hidden="true">
        {[12, 26, 40, 54, 68, 82].map((x, i) => (
          <g key={x} transform={`translate(${x}, ${44 + (i % 2)})`} opacity={0.45 + (i % 2) * 0.1}>
            <circle cx="0" cy="-8" r="1.6" fill="currentColor" />
            <path d="M0,-6 L0,4 M-2.5,0 L2.5,0 M-1.5,4 L-2.5,11 M1.5,4 L2.5,11" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          </g>
        ))}
        <path d="M0,55 L100,55" stroke="currentColor" strokeWidth="0.4" opacity=".3" />
      </svg>
    );
  }
  if (tone === 'mid') {
    // 市：摊位+人
    return (
      <svg viewBox="0 0 100 60" className="dh-p02__vB-svg" aria-hidden="true">
        <rect x="14" y="38" width="22" height="6" fill="currentColor" opacity=".35" />
        <rect x="62" y="40" width="20" height="5" fill="currentColor" opacity=".35" />
        <path d="M14,38 L25,30 L36,38" stroke="currentColor" strokeWidth="0.6" fill="none" opacity=".5" />
        <path d="M62,40 L72,33 L82,40" stroke="currentColor" strokeWidth="0.6" fill="none" opacity=".5" />
        {[8, 44, 52, 90].map((x) => (
          <g key={x} transform={`translate(${x}, 50)`}>
            <circle cx="0" cy="-6" r="1.5" fill="currentColor" opacity=".7" />
            <path d="M0,-4 L0,4 M-2,-1 L2,-1 M-1.5,4 L-2.5,9 M1.5,4 L2.5,9" stroke="currentColor" strokeWidth="0.8" fill="none" opacity=".7" strokeLinecap="round" />
          </g>
        ))}
        <path d="M0,55 L100,55" stroke="currentColor" strokeWidth="0.4" opacity=".3" />
      </svg>
    );
  }
  // tone === 'warm': 戏 — 围观击鼓
  return (
    <svg viewBox="0 0 100 60" className="dh-p02__vB-svg" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="36" ry="3" fill="currentColor" opacity=".18" />
      {[20, 30, 70, 80].map((x) => (
        <g key={x} transform={`translate(${x}, 50)`}>
          <circle cx="0" cy="-6" r="1.6" fill="currentColor" opacity=".75" />
          <path d="M0,-4 L0,4 M-2,-1 L2,-1 M-1.5,4 L-2.5,9 M1.5,4 L2.5,9" stroke="currentColor" strokeWidth="0.9" fill="none" opacity=".75" strokeLinecap="round" />
        </g>
      ))}
      {/* 中央击鼓者 */}
      <g transform="translate(50, 48)">
        <ellipse cx="0" cy="2" rx="5" ry="2.5" fill="currentColor" opacity=".55" />
        <circle cx="0" cy="-9" r="2" fill="currentColor" />
        <path d="M0,-7 L0,2 M-3,-4 L3,-4 M-2,2 L-3,8 M2,2 L3,8" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
