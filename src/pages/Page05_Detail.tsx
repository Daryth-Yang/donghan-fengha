import { DhTopBar, DhMist, DhParticles, DhFigurine, DhCorners, DhSection } from '../components/atmosphere';

export default function Page05_Detail() {
  const fields = [
    ["名称",    "击鼓说唱俑"],
    ["年代",    "东汉 · 公元一至二世纪"],
    ["出土地",  "四川省成都市天回山崖墓"],
    ["现藏地",  "中国国家博物馆"],
    ["材质",    "灰陶 · 局部残存彩绘"],
    ["造型特徵", "席地而坐，左臂环鼓，右手扬槌；张口吐舌，双肩高耸。"],
    ["角色定位", "主叙事者 / 唤醒者"],
  ];

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="文物群像" page="05" />
        <DhMist />
        <DhParticles count={45} seed={23} opacityRange={[.15, .5]} />

        <div style={{ position: "absolute", top: 110, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <DhSection num="伍" label="ARTIFACT · 詳情模板" title="文物不是静止的" />
          <div className="dh-caption">TEMPLATE · 五俑通用</div>
        </div>

        {/* 主区双栏 */}
        <div style={{ position: "absolute", top: 200, left: 56, right: 56, bottom: 130, display: "grid", gridTemplateColumns: "35% 1fr", gap: 56 }}>

          {/* 左：档案 */}
          <div className="dh-card" style={{ padding: 32, position: "relative" }}>
            <DhCorners />
            <div className="dh-caption" style={{ marginBottom: 8 }}>ARCHIVE · 文物档案</div>
            <div className="dh-title-m" style={{ marginBottom: 6 }}>FIG-01</div>
            <div className="dh-rule" style={{ width: 60, marginBottom: 22 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {fields.map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "78px 1fr", alignItems: "baseline", gap: 14 }}>
                  <div className="dh-caption" style={{ color: "var(--gold-2)" }}>{k}</div>
                  <div className="dh-body" style={{ color: "var(--paper-1)", fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ position: "absolute", bottom: 28, left: 32, right: 32 }}>
              <div className="dh-rule" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                <span className="dh-caption">FILE · EH·CHIEF · 2026.05</span>
                <span className="dh-caption">01 / 05</span>
              </div>
            </div>
          </div>

          {/* 右：大图 + 操作 */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{
              flex: 1, position: "relative",
              border: "1px solid rgba(154,122,62,.4)",
              background:
                "radial-gradient(360px 460px at 50% 60%, rgba(201,169,97,.18), transparent 70%)," +
                "linear-gradient(180deg, rgba(20,16,12,.5), rgba(7,6,10,.95))"
            }}>
              {/* 占位 3D 模型 */}
              <div style={{ position: "absolute", left: "50%", bottom: 30, transform: "translateX(-50%)" }}>
                <DhFigurine width={220} height={420} label="击鼓说唱俑" code="FIG-01 · 3D" featured />
              </div>
              <DhParticles count={50} seed={29} sizeRange={[1, 2.6]} opacityRange={[.2, .8]} />
              <div className="dh-corner tl" />
              <div className="dh-corner tr" />
              <div className="dh-corner bl" />
              <div className="dh-corner br" />

              {/* 顶部工具条 */}
              <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between" }}>
                <span className="dh-caption">3D MODEL · GLB · 0.0.1</span>
                <span className="dh-caption">VIEW · 正面 / 側面 / 俯视 / 自由</span>
              </div>

              {/* 底部刻度 */}
              <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{ width: 1, height: i % 6 === 0 ? 10 : 6, background: "rgba(154,122,62,.4)" }} />
                ))}
              </div>
            </div>

            {/* 三按钮 */}
            <div style={{ display: "flex", gap: 14 }}>
              <button className="dh-btn" style={{ flex: 1, justifyContent: "center" }}>看造型</button>
              <button className="dh-btn" style={{ flex: 1, justifyContent: "center" }}>听故事</button>
              <button className="dh-btn" style={{ flex: 1, justifyContent: "center" }}>进入互动</button>
            </div>
          </div>
        </div>

        {/* 底部叙事 */}
        <div style={{ position: "absolute", bottom: 22, left: 56, right: 56 }}>
          <div className="dh-rule" style={{ marginBottom: 14 }} />
          <p className="dh-body" style={{ margin: 0, fontStyle: "normal", maxWidth: 1300 }}>
            「这件陶俑的重点不在于像不像真人，而在于它捕捉了表演最生动的一瞬间：
            身体前倾、鼓槌抬起、嘴角张开、笑意外放——它让我们看见汉代民间艺人如何用身体制造戏剧，
            也让我们看见乱世中普通人的乐观与韧性。」
          </p>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
