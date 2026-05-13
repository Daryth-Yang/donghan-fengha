import { DhTopBar, DhMist, DhParticles, DhSection, DhMeander, DhSeal, DhCorners } from '../components/atmosphere';

export default function Page02_History() {
  const nodes = [
    { y: "25年",   t: "东汉建立",          d: "光武中兴，王朝复起；雒阳宫阙，钟鼓初鸣。" },
    { y: "184年",  t: "黄巾起义",          d: "苍天已死，黄天当立；流民、灾荒、战火并起。" },
    { y: "189年后",t: "朝廷动荡 · 群雄割据",d: "宦官外戚相斗，地方势力坐大，山河碎裂。" },
    { y: "220年",  t: "东汉结束",          d: "曹丕代汉，魏室肇立。一个朝代的鼓点戛然停止。" },
    { y: "当代",   t: "文物再被唤醒",       d: "陶俑在博物馆的玻璃柜中沉睡；观众的手势成为新的鼓槌。" },
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="历史背景" page="02" />
        <DhMist />
        <DhParticles count={50} seed={7} sizeRange={[1, 2]} opacityRange={[.15, .55]} />

        {/* 远景：暗山 + 烽烟 */}
        <div className="dh-p02__bg-glow" />
        <div className="dh-mountain --back dh-p02__mountain-back" />
        <div className="dh-mountain --mid dh-p02__mountain-mid" />

        <div className="dh-chap-header">
          <DhSection num="贰" label="HISTORY · DYNASTIC FALL" title="王朝将倾 · 鼓声未息" />
        </div>

        {/* 主体两栏 */}
        <div className="dh-p02__body">

          {/* 左：纵向时间轴 */}
          <div className="dh-p02__timeline">
            <div className="dh-rule-v dh-p02__timeline-rule" />
            <div className="dh-caption dh-p02__timeline-cap">TIMELINE · 公元纪</div>
            {nodes.map((n, i) => (
              <div key={i} className="dh-p02__node">
                <div className="dh-p02__node-dot" style={{
                  background: i === 0 ? "var(--gold-3)" : "var(--ink-1)",
                  boxShadow: i === 0 ? "0 0 14px rgba(230,200,132,.55)" : "none"
                }} />
                <div className="dh-title-s dh-p02__node-year">{n.y}</div>
                <div className="dh-eyebrow dh-p02__node-topic">{n.t}</div>
                <div className="dh-body dh-p02__node-desc">{n.d}</div>
              </div>
            ))}
          </div>

          {/* 右：正文 */}
          <div className="dh-p02__narrative">
            <div className="dh-caption dh-p02__narr-cap">正文 · NARRATIVE</div>
            <h2 className="dh-title-l dh-p02__narr-title">
              史书写战争，<br/>而陶俑记住了笑声。
            </h2>
            <DhMeander width={260} />
            <p className="dh-body-l dh-p02__narr-body">
              史书记录的是战争、权力与英雄，而民间的笑声、歌声与身体表演，
              往往被淹没在宏大的历史叙事之中。在烽火与权谋之外，
              还有另一种声音——它来自市井、田垄、宴席与街角。
            </p>

            {/* 强调引语 */}
            <div className="dh-card dh-p02__emphasis">
              <div className="dh-p02__emphasis-seal">
                <DhSeal ch="俳" />
              </div>
              <div className="dh-p02__emphasis-inner">
                <div className="dh-caption dh-p02__emphasis-cap">EMPHASIS</div>
                <p className="dh-quote" style={{ margin: 0 }}>
                  本作品不以英雄战争为中心，<br/>
                  而从击鼓说唱俑出发，<br/>
                  重新看见乱世中的普通人。
                </p>
              </div>
              <DhCorners />
            </div>

            <div className="dh-p02__chips">
              <span className="dh-chip">民间叙事</span>
              <span className="dh-chip">非英雄视角</span>
              <span className="dh-chip">身体 · 鼓点 · 笑</span>
              <span className="dh-chip-mono">REF · 后汉书 / 风俗通义</span>
            </div>
          </div>
        </div>

        <div className="dh-side-vert dh-p02__sidemark">王朝将倾 鼓声未息</div>
        <DhCorners />
      </div>
    </div>
  );
}
