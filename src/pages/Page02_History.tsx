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
        <div style={{
          position: "absolute", inset: "64px 0 0 0",
          background:
            "radial-gradient(700px 260px at 78% 38%, rgba(139,58,42,.10), transparent 70%)," +
            "radial-gradient(900px 320px at 18% 28%, rgba(154,122,62,.10), transparent 70%)"
        }} />
        <div className="dh-mountain --back" style={{ top: 480, bottom: "auto", height: 180, opacity: .25 }} />
        <div className="dh-mountain --mid"  style={{ top: 540, bottom: "auto", height: 200, opacity: .35 }} />

        <div style={{ position: "absolute", top: 110, left: 56, right: 56 }}>
          <DhSection num="贰" label="HISTORY · DYNASTIC FALL" title="王朝将倾 · 鼓声未息" />
        </div>

        {/* 主体两栏 */}
        <div style={{ position: "absolute", top: 200, left: 56, right: 56, display: "grid", gridTemplateColumns: "320px 1fr", gap: 80 }}>

          {/* 左：纵向时间轴 */}
          <div style={{ position: "relative", paddingLeft: 18 }}>
            <div className="dh-rule-v" style={{ position: "absolute", left: 6, top: 4, bottom: 4 }} />
            <div className="dh-caption" style={{ marginBottom: 20 }}>TIMELINE · 公元纪</div>
            {nodes.map((n, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 36 }}>
                <div style={{
                  position: "absolute", left: -18, top: 6,
                  width: 13, height: 13, borderRadius: "50%",
                  border: "1px solid var(--gold-3)",
                  background: i === 0 ? "var(--gold-3)" : "var(--ink-1)",
                  boxShadow: i === 0 ? "0 0 14px rgba(230,200,132,.55)" : "none"
                }} />
                <div className="dh-title-s" style={{ marginBottom: 4 }}>{n.y}</div>
                <div className="dh-eyebrow" style={{ marginBottom: 6, color: "var(--gold-2)" }}>{n.t}</div>
                <div className="dh-body" style={{ fontSize: 12.5, lineHeight: 1.85, color: "var(--paper-3)" }}>{n.d}</div>
              </div>
            ))}
          </div>

          {/* 右：正文 */}
          <div>
            <div className="dh-caption" style={{ marginBottom: 18 }}>正文 · NARRATIVE</div>
            <h2 className="dh-title-l" style={{ margin: "0 0 28px" }}>
              史书写战争，<br/>而陶俑记住了笑声。
            </h2>
            <DhMeander width={260} />
            <p className="dh-body-l" style={{ marginTop: 30, width: 560 }}>
              史书记录的是战争、权力与英雄，而民间的笑声、歌声与身体表演，
              往往被淹没在宏大的历史叙事之中。在烽火与权谋之外，
              还有另一种声音——它来自市井、田垄、宴席与街角。
            </p>

            {/* 强调引语 */}
            <div className="dh-card" style={{ marginTop: 36, padding: "30px 34px", width: 600, position: "relative" }}>
              <div style={{ position: "absolute", left: 18, top: 18 }}>
                <DhSeal ch="俳" />
              </div>
              <div style={{ paddingLeft: 80 }}>
                <div className="dh-caption" style={{ marginBottom: 10 }}>EMPHASIS</div>
                <p className="dh-quote" style={{ margin: 0 }}>
                  本作品不以英雄战争为中心，<br/>
                  而从击鼓说唱俑出发，<br/>
                  重新看见乱世中的普通人。
                </p>
              </div>
              <DhCorners />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <span className="dh-chip">民间叙事</span>
              <span className="dh-chip">非英雄视角</span>
              <span className="dh-chip">身体 · 鼓点 · 笑</span>
              <span className="dh-chip-mono">REF · 后汉书 / 风俗通义</span>
            </div>
          </div>
        </div>

        <div className="dh-side-vert" style={{ right: 28, top: 130 }}>王朝将倾 鼓声未息</div>
        <DhCorners />
      </div>
    </div>
  );
}
