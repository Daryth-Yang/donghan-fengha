import { DhTopBar, DhMist, DhParticles, DhSection, DhCorners } from '../components/atmosphere';

export default function Page03_Map() {
  const nodes = [
    { x: 8,  label: "中原动荡", sub: "雒阳风起",      desc: "宫阙倾颓 · 流民南徙" },
    { x: 24, label: "蜀道入川", sub: "剑阁峥嵘",      desc: "翻越秦岭 · 栈道千里" },
    { x: 42, label: "成都宴乐", sub: "府第灯火",      desc: "天府之国 · 庖厨百戏" },
    { x: 58, label: "俳优登场", sub: "鼓槌方起",      desc: "市井登场 · 笑语入宴" },
    { x: 76, label: "陶俑入墓", sub: "永葬其乐",      desc: "凝为陶质 · 随主入幽" },
    { x: 92, label: "当代唤醒", sub: "粒子重生",      desc: "手势为槌 · 光影再敲" },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="历史背景" page="03" />
        <DhMist />
        <DhParticles count={60} seed={11} opacityRange={[.2, .55]} />

        <div className="dh-chap-header">
          <DhSection num="叁" label="NARRATIVE MAP · 山水长卷" title="从雒阳风声到蜀地鼓声" />
        </div>

        {/* 山水长卷主图 */}
        <div className="dh-p03__scroll">
          {/* 卷轴底纹 */}
          <div className="dh-p03__scroll-bg" />
          {/* 远山脉 */}
          <svg viewBox="0 0 1320 470" className="dh-p03__svg" style={{ opacity: .55 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#9a7a3e" stopOpacity=".0"/>
                <stop offset="100%" stopColor="#c9a961" stopOpacity=".55"/>
              </linearGradient>
            </defs>
            <path d="M 0 380 L 60 320 L 130 360 L 200 280 L 280 340 L 360 270 L 440 330 L 520 260 L 620 310 L 720 240 L 820 300 L 920 230 L 1020 290 L 1120 250 L 1220 300 L 1320 260 L 1320 470 L 0 470 Z" fill="url(#m1)" />
            <path d="M 0 420 L 80 380 L 160 410 L 240 360 L 340 400 L 440 350 L 540 390 L 640 340 L 740 380 L 840 330 L 940 370 L 1040 320 L 1140 360 L 1240 320 L 1320 350 L 1320 470 L 0 470 Z" fill="#0c0a0e" opacity=".75" />
          </svg>

          {/* 金色细线连接路径 */}
          <svg viewBox="0 0 1320 470" className="dh-p03__svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trail" x1="0" x2="1">
                <stop offset="0%" stopColor="#9a7a3e" stopOpacity=".2"/>
                <stop offset="50%" stopColor="#e6c884" stopOpacity=".95"/>
                <stop offset="100%" stopColor="#9a7a3e" stopOpacity=".2"/>
              </linearGradient>
            </defs>
            <path
              d="M 100 200 C 220 130, 280 280, 380 200 S 600 120, 720 220 S 940 320, 1080 200 S 1240 100, 1280 180"
              stroke="url(#trail)" strokeWidth="1" fill="none"
              strokeDasharray="2 4"
            />
          </svg>

          {/* 节点 */}
          {nodes.map((n, i) => (
            <div key={i} className="dh-p03__node" style={{
              left: `${n.x}%`,
              top: i % 2 === 0 ? 160 : 220,
            }}>
              <div className="dh-halo dh-p03__node-halo" style={{ opacity: i === 3 ? 1 : .4 }} />
              <div className="dh-p03__node-dot" />
              <div className="dh-p03__node-stem" />
              <div className="dh-eyebrow dh-p03__node-idx">{`0${i+1}`}</div>
              <div className="dh-title-s dh-p03__node-label">{n.label}</div>
              <div className="dh-body dh-p03__node-sub">{n.sub}</div>
              <div className="dh-caption dh-p03__node-desc">{n.desc}</div>
            </div>
          ))}

          {/* 卷轴标签 */}
          <div className="dh-side-vert dh-p03__edge-tag --left">北 · 雒阳</div>
          <div className="dh-side-vert dh-p03__edge-tag --right">南 · 益州</div>
        </div>

        {/* 底部图例 */}
        <div className="dh-chap-footnote">
          <div className="dh-p03__legend-left">
            <span className="dh-caption">LEGEND</span>
            <span className="dh-chip-mono">○ 叙事节点</span>
            <span className="dh-chip-mono">— 金线轨迹</span>
            <span className="dh-chip-mono">▲ 山水留白</span>
          </div>
          <div className="dh-caption">SCROLL · 云卷云舒 · 不取真实地理</div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
