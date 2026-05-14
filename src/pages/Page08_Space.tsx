import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { DhTopBar, DhMist, DhParticles, DhSection, DhCorners } from '../components/atmosphere';

type FlowKey = 'dormant' | 'gather' | 'burst' | 'restore';
type HwKey = 'cam' | 'pc' | 'proj' | 'spk' | 'kb';

const FLOW_ORDER: FlowKey[] = ['dormant', 'gather', 'burst', 'restore'];
const CYCLE_MS = 5000;

interface FlowConfig {
  n: string;
  t: string;
  sub: string;
  d: string;
  detail: { cam: string; td: string; proj: string; spk: string };
  visitor: { x: number; y: number };
  bpm: number;
  particles: number;
}

const FLOW: Record<FlowKey, FlowConfig> = {
  dormant: {
    n: '01', t: '进入空间', sub: 'DORMANT',
    d: '黑金山水 + 沉睡陶俑轮廓',
    detail: {
      cam: '待机扫描 · 无人影',
      td:  '低 CPU · 仅维持山水',
      proj:'黑金山水底图',
      spk: '低频环境声 · 远处风',
    },
    visitor: { x: 8, y: 88 }, bpm: 18, particles: 6,
  },
  gather: {
    n: '02', t: '靠近画面', sub: 'GATHER',
    d: '摄像头捕捉人影 · 粒子聚合',
    detail: {
      cam: '捕捉到人影轮廓',
      td:  '生成粒子云 · 60 FPS',
      proj:'陶俑虚影渐显',
      spk: '鼓点淡入 · 84 BPM',
    },
    visitor: { x: 50, y: 74 }, bpm: 84, particles: 22,
  },
  burst: {
    n: '03', t: '抬手互动', sub: 'BURST',
    d: '手势控制破碎 / 流动 / 重构',
    detail: {
      cam: '手部关键点 · 21 点位',
      td:  '破碎模拟 · 粒子加速',
      proj:'陶片扩散 · 骨架显形',
      spk: '鼓点密集 · 132 BPM',
    },
    visitor: { x: 50, y: 70 }, bpm: 132, particles: 38,
  },
  restore: {
    n: '04', t: '离开展区', sub: 'RESTORE',
    d: '鼓点渐弱 · 画面回到沉默',
    detail: {
      cam: '人影逐步消失',
      td:  '粒子收束 · 进入冷却',
      proj:'画面回归山水',
      spk: '鼓声散场 · 36 BPM',
    },
    visitor: { x: 16, y: 86 }, bpm: 36, particles: 14,
  },
};

const HW_ORDER: HwKey[] = ['cam', 'pc', 'proj', 'spk', 'kb'];

const HW: Record<HwKey, { label: string; sub: string; note: string }> = {
  cam:  { label: '摄像头',     sub: 'CAM',          note: '捕捉观众轮廓与手势 · 60 FPS · ≤ 80 ms 延迟' },
  pc:   { label: '电脑',       sub: 'PC · TD HOST', note: '运行 TouchDesigner · 粒子 / 破碎 / 鼓点解算' },
  proj: { label: '投影 / 大屏', sub: 'PROJ / LED',   note: '约 3.5m 宽 · 1080P · 装置主屏' },
  spk:  { label: '音响 ×2',    sub: 'SPK · 2.1',    note: '左右各一 · 鼓 / 风 / 陶片 / 呼吸' },
  kb:   { label: '键盘备用',    sub: 'KB FALLBACK',  note: '手势失败时 · 数字键 1-4 强制切换状态' },
};

const CAMERA = { x: 50, y: 32 }; // camera position in plan %

/** Derive flow state from a dragged visitor position. */
function deriveFlow(x: number, y: number): FlowKey {
  const dist = Math.hypot(x - CAMERA.x, y - CAMERA.y);
  if (dist < 28) return 'burst';
  if (dist < 50) return 'gather';
  if (x < 22 && y > 78) return 'dormant';
  return 'restore';
}

export default function Page08_Space() {
  const [flow, setFlow] = useState<FlowKey>('dormant');
  const [playing, setPlaying] = useState(true);
  const [hw, setHw] = useState<HwKey | null>(null);
  const [visitorOverride, setVisitorOverride] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tick, setTick] = useState(0); // sub-second progress 0-1 for progress bar

  const planRef = useRef<HTMLDivElement | null>(null);

  // —— Auto-play: advance every CYCLE_MS, plus a fine-grained tick for progress bar
  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const elapsed = (now - start) % CYCLE_MS;
      setTick(elapsed / CYCLE_MS);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const id = window.setInterval(() => {
      setFlow((prev) => FLOW_ORDER[(FLOW_ORDER.indexOf(prev) + 1) % FLOW_ORDER.length]);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [playing]);

  // reset progress when state changes manually
  useEffect(() => { if (!playing) setTick(0); }, [flow, playing]);

  // —— Keyboard shortcuts: 1/2/3/4 to switch flow, space to toggle play
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === '1') { selectFlow('dormant'); }
      else if (e.key === '2') { selectFlow('gather'); }
      else if (e.key === '3') { selectFlow('burst'); }
      else if (e.key === '4') { selectFlow('restore'); }
      else if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectFlow = useCallback((k: FlowKey) => {
    setFlow(k);
    setPlaying(false);
    setVisitorOverride(null);
  }, []);

  const selectHw = useCallback((k: HwKey) => {
    setHw((prev) => (prev === k ? null : k));
  }, []);

  // —— Drag handlers for the visitor
  const onVisitorPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setPlaying(false);
  };
  const onVisitorPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!dragging || !planRef.current) return;
    const rect = planRef.current.getBoundingClientRect();
    const x = Math.max(3, Math.min(97, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(28, Math.min(96, ((e.clientY - rect.top) / rect.height) * 100));
    setVisitorOverride({ x, y });
    setFlow(deriveFlow(x, y));
  };
  const onVisitorPointerUp = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const config = FLOW[flow];
  const visitor = visitorOverride ?? config.visitor;

  // —— Particle stream points (visitor → camera). Memoize by visitor position + state.
  const stream = useMemo(() => {
    const pts: Array<{ x: number; y: number; t: number }> = [];
    const n = config.particles;
    const dx = CAMERA.x - visitor.x;
    const dy = CAMERA.y - visitor.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len; // perpendicular
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(1, n - 1);
      const sway = Math.sin(t * Math.PI * 3) * 4;
      pts.push({
        x: visitor.x + dx * t + nx * sway,
        y: visitor.y + dy * t + ny * sway,
        t,
      });
    }
    return pts;
  }, [visitor.x, visitor.y, config.particles]);

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="展陈方案" />
        <DhMist />
        <DhParticles count={36} seed={43} opacityRange={[.12, .42]} />

        <div className="dh-p08__header">
          <DhSection label="EXHIBITION · 毕业展现场" title="观众如何进入文物现场" />
          <div className="dh-p08__header-meta">
            <span className="dh-caption">PLAN · TOP-DOWN VIEW</span>
            <span className="dh-chip-mono dh-p08__space-chip">4.5m × 3.2m · 30㎡</span>
          </div>
        </div>

        <div className="dh-p08__body">

          {/* ============ 左：俯视图 ============ */}
          <div className="dh-p08__plan" ref={planRef} data-flow={flow} data-hw={hw ?? ''}>

            {/* 网格 */}
            <div className="dh-p08__grid" />

            {/* 投影 / 大屏 */}
            <div className="dh-p08__screen" data-flow={flow} data-hl={hw === 'proj' ? 'on' : 'off'}>
              <div className="dh-p08__screen-label">
                <span className="dh-caption">PROJECTION / LED</span>
                <span className="dh-caption" style={{ color: 'var(--gold-3)' }}>投影或大屏</span>
              </div>
              {/* 山水底图（恒存，dormant/restore 强；gather 弱；burst 被破碎覆盖） */}
              <svg viewBox="0 0 800 100" className="dh-p08__screen-mountains" preserveAspectRatio="none">
                <path d="M 0 80 L 100 50 L 200 70 L 320 30 L 440 60 L 560 25 L 680 55 L 800 35 L 800 100 L 0 100 Z" fill="rgba(201,169,97,.45)" />
              </svg>
              {/* 陶俑轮廓（gather 显现） */}
              <svg viewBox="0 0 800 100" className="dh-p08__screen-ghost" preserveAspectRatio="none">
                <g fill="none" stroke="rgba(230,200,132,.55)" strokeWidth=".8">
                  <ellipse cx="400" cy="46" rx="12" ry="14" />
                  <path d="M 388 60 L 388 88 M 412 60 L 412 88 M 388 70 L 412 70" />
                </g>
              </svg>
              {/* 破碎陶片（burst 显现） */}
              <div className="dh-p08__screen-shards" aria-hidden="true">
                {[
                  { l: 22, t: 20, w: 28, h: 18, r: -16 },
                  { l: 38, t: 56, w: 22, h: 14, r: 22 },
                  { l: 54, t: 30, w: 26, h: 20, r: -10 },
                  { l: 65, t: 64, w: 18, h: 14, r: 28 },
                  { l: 78, t: 36, w: 24, h: 18, r: -22 },
                ].map((s, i) => (
                  <span key={i} style={{
                    left: `${s.l}%`, top: `${s.t}%`,
                    width: s.w, height: s.h,
                    transform: `rotate(${s.r}deg)`,
                    ['--i' as string]: i,
                  } as CSSProperties}/>
                ))}
              </div>
              {/* LED 边框跑光 */}
              <div className="dh-p08__screen-chase" />
            </div>

            {/* 摄像头 */}
            <div className="dh-p08__cam" data-flow={flow} data-hl={hw === 'cam' ? 'on' : 'off'}>
              <div className="dh-p08__cam-core" />
              <div className="dh-p08__cam-ring" />
              <div className="dh-p08__cam-label">
                <span className="dh-caption">CAM · 摄像头</span>
              </div>
            </div>

            {/* 摄像头光锥 */}
            <svg viewBox="0 0 100 100" className="dh-p08__cone" data-flow={flow} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="dh-p08-cone" x1="50%" x2="50%" y1="0%" y2="100%">
                  <stop offset="0%"  stopColor="rgba(230,200,132,.65)" />
                  <stop offset="100%" stopColor="rgba(201,169,97,0)" />
                </linearGradient>
              </defs>
              <polygon points="50,0 92,100 8,100" fill="url(#dh-p08-cone)" stroke="rgba(201,169,97,.4)" strokeWidth=".25" strokeDasharray="2 2" />
            </svg>

            {/* 观众站立区（地面互动范围） */}
            <div className="dh-p08__floor" data-flow={flow}>
              <span className="dh-caption dh-p08__floor-label">FLOOR · 地面互动范围 · ⌀ 1.6m</span>
            </div>

            {/* 粒子流 */}
            <div className="dh-p08__stream" aria-hidden="true" data-flow={flow}>
              {stream.map((p, i) => (
                <span key={i} style={{
                  left: `${p.x}%`, top: `${p.y}%`,
                  ['--t' as string]: p.t,
                  ['--idx' as string]: i,
                } as CSSProperties} />
              ))}
            </div>

            {/* 观众 —— 可拖拽 */}
            <div
              className={`dh-p08__visitor${dragging ? ' --dragging' : ''}`}
              data-pose={flow === 'burst' ? 'raise' : 'stand'}
              data-flow={flow}
              style={{ left: `${visitor.x}%`, top: `${visitor.y}%` }}
              onPointerDown={onVisitorPointerDown}
              onPointerMove={onVisitorPointerMove}
              onPointerUp={onVisitorPointerUp}
              onPointerCancel={onVisitorPointerUp}
              role="button"
              aria-label="拖动观众 · 探索不同状态"
              tabIndex={0}
            >
              <div className="dh-p08__visitor-halo" aria-hidden="true" />
              <div className="dh-p08__visitor-head" aria-hidden="true" />
              <div className="dh-p08__visitor-body" aria-hidden="true" />
              <div className="dh-p08__visitor-arm" aria-hidden="true" />
              <div className="dh-caption dh-p08__visitor-tag">VISITOR · 拖动我</div>
            </div>

            {/* 入口 */}
            <div className="dh-p08__entry">
              <span className="dh-caption">ENTRY · 入口</span>
              <span className="dh-p08__entry-arrow" aria-hidden="true">→</span>
            </div>

            {/* 二维码入口 */}
            <div className="dh-p08__qr">
              <div className="dh-p08__qr-grid" />
              <span className="dh-caption">QR · 故事入口</span>
            </div>

            {/* 文物故事展板 */}
            <div className="dh-p08__panel">
              <span className="dh-caption">PANEL</span>
              <span className="dh-p08__panel-cn">俳优故事</span>
            </div>

            {/* 音响 */}
            {([['l', '8%'], ['r', '88%']] as const).map(([side, left]) => (
              <div
                key={side}
                className="dh-p08__spk"
                data-side={side}
                data-flow={flow}
                data-hl={hw === 'spk' ? 'on' : 'off'}
                style={{ left }}
              >
                <div className="dh-p08__spk-box">
                  <div className="dh-p08__spk-cone" />
                </div>
                <div className="dh-p08__spk-ripple" />
                <div className="dh-p08__spk-ripple --d2" />
                <span className="dh-caption">SPK</span>
              </div>
            ))}

            {/* 电脑主机 */}
            <div className="dh-p08__pc" data-hl={hw === 'pc' ? 'on' : 'off'}>
              <div className="dh-p08__pc-led" />
              <div className="dh-p08__pc-vent" />
              <span className="dh-caption dh-p08__pc-label">PC · TD HOST</span>
            </div>

            {/* 键盘（备用，hw 选中时显形） */}
            <div className="dh-p08__kb" data-hl={hw === 'kb' ? 'on' : 'off'}>
              <div className="dh-p08__kb-rows">
                {Array.from({ length: 3 }).map((_, r) => (
                  <div key={r}>
                    {Array.from({ length: 8 }).map((__, c) => (<span key={c} />))}
                  </div>
                ))}
              </div>
              <span className="dh-caption">KB · 备用</span>
            </div>

            {/* 比例尺 */}
            <div className="dh-p08__ruler" aria-hidden="true">
              <div className="dh-p08__ruler-bar">
                {[0, 1, 2, 3, 4].map((m) => <span key={m} />)}
              </div>
              <div className="dh-p08__ruler-marks">
                <span>0</span><span>1m</span><span>2m</span><span>3m</span><span>4.5m</span>
              </div>
            </div>

            {/* 指北 / 入口方向 */}
            <div className="dh-p08__compass" aria-hidden="true">
              <div className="dh-p08__compass-ring">
                <div className="dh-p08__compass-arrow" />
                <span>N</span>
              </div>
              <span className="dh-caption">入口 ← W</span>
            </div>

            {/* 当前状态徽章 */}
            <div className="dh-p08__state-badge" data-flow={flow}>
              <span className="dh-caption">STATE</span>
              <span className="dh-title-s">{config.n} · {config.sub}</span>
              <span className="dh-caption">{config.bpm} BPM</span>
            </div>

            {/* 设备 tooltip：当 hw 被选中时显示在右下 */}
            {hw && (
              <div className="dh-p08__hw-tooltip">
                <span className="dh-caption" style={{ color: 'var(--gold-3)' }}>{HW[hw].sub}</span>
                <span className="dh-title-s">{HW[hw].label}</span>
                <span className="dh-body" style={{ color: 'var(--paper-3)' }}>{HW[hw].note}</span>
              </div>
            )}

            <div className="dh-corner tl" /><div className="dh-corner tr" /><div className="dh-corner bl" /><div className="dh-corner br" />
          </div>

          {/* ============ 右：动线 + 播放 + 硬件 ============ */}
          <div className="dh-p08__right">

            {/* 播放控制 + 进度 */}
            <div className="dh-p08__player">
              <button
                type="button"
                className="dh-p08__player-btn"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? '暂停自动巡演' : '播放自动巡演'}
              >
                {playing ? <span className="dh-p08__player-pause" /> : <span className="dh-p08__player-play" />}
              </button>
              <div className="dh-p08__player-meta">
                <span className="dh-caption">{playing ? 'AUTOPLAY · 5s / STATE' : 'PAUSED · 点卡片或拖观众'}</span>
                <span className="dh-caption" style={{ color: 'var(--gold-3)' }}>NOW · {config.sub} · {config.bpm} BPM</span>
              </div>
              <div className="dh-p08__player-segs">
                {FLOW_ORDER.map((k) => {
                  const idx = FLOW_ORDER.indexOf(flow);
                  const here = FLOW_ORDER.indexOf(k);
                  const isPast = here < idx;
                  const isCurr = here === idx;
                  const fill = isPast ? 1 : isCurr ? (playing ? tick : 1) : 0;
                  return (
                    <div key={k} className="dh-p08__player-seg" data-active={isCurr ? 'on' : 'off'}>
                      <div className="dh-p08__player-seg-fill" style={{ width: `${fill * 100}%` }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 动线卡片 */}
            <div>
              <div className="dh-caption" style={{ marginBottom: 10 }}>EXPERIENCE FLOW · 观众动线 · 按 1 / 2 / 3 / 4 切换</div>
              <div className="dh-p08__flow-list">
                {FLOW_ORDER.map((k) => {
                  const f = FLOW[k];
                  const active = k === flow;
                  return (
                    <button
                      key={k}
                      type="button"
                      className={`dh-card dh-p08__flow-card${active ? ' --active' : ''}`}
                      onClick={() => selectFlow(k)}
                      aria-pressed={active}
                    >
                      <div className="dh-p08__flow-num">{f.n}</div>
                      <div className="dh-p08__flow-main">
                        <div className="dh-p08__flow-title-row">
                          <span className="dh-title-s">{f.t}</span>
                          <span className="dh-caption" style={{ color: 'var(--gold-2)' }}>{f.sub}</span>
                        </div>
                        <div className="dh-body dh-p08__flow-desc">{f.d}</div>
                        {active && (
                          <div className="dh-p08__flow-detail">
                            <div><span className="dh-caption">CAM</span><span>{f.detail.cam}</span></div>
                            <div><span className="dh-caption">TD</span><span>{f.detail.td}</span></div>
                            <div><span className="dh-caption">PROJ</span><span>{f.detail.proj}</span></div>
                            <div><span className="dh-caption">SPK</span><span>{f.detail.spk}</span></div>
                          </div>
                        )}
                      </div>
                      <div className="dh-p08__flow-bar" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 硬件 chips */}
            <div className="dh-card dh-p08__hw-card">
              <div className="dh-p08__hw-head">
                <span className="dh-caption">HARDWARE · 硬件配置 · 点击在图上定位</span>
                {hw && (
                  <button type="button" className="dh-p08__hw-clear" onClick={() => setHw(null)} aria-label="取消高亮">清除 ✕</button>
                )}
              </div>
              <div className="dh-p08__hw-chips">
                {HW_ORDER.map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`dh-chip-mono dh-p08__hw-chip${hw === k ? ' --on' : ''}`}
                    onClick={() => selectHw(k)}
                    aria-pressed={hw === k}
                  >
                    {HW[k].label}
                  </button>
                ))}
              </div>
              <div className="dh-rule" style={{ margin: '12px 0 10px' }} />
              <div className="dh-caption">SPACE · 約 4.5m × 3.2m &nbsp;·&nbsp; 1F · 30㎡ &nbsp;·&nbsp; CEILING ≥ 2.8m</div>
            </div>
          </div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
