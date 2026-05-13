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

        <div className="dh-p05__header">
          <DhSection num="伍" label="ARTIFACT · 詳情模板" title="文物不是静止的" />
          <div className="dh-caption">TEMPLATE · 五俑通用</div>
        </div>

        {/* 主区双栏 */}
        <div className="dh-p05__main">

          {/* 左：档案 */}
          <div className="dh-card dh-p05__card">
            <DhCorners />
            <div className="dh-caption" style={{ marginBottom: 8 }}>ARCHIVE · 文物档案</div>
            <div className="dh-title-m" style={{ marginBottom: 6 }}>FIG-01</div>
            <div className="dh-rule" style={{ width: 60, marginBottom: 22 }} />

            <div className="dh-p05__fields">
              {fields.map(([k, v]) => (
                <div key={k} className="dh-p05__field-row">
                  <div className="dh-caption" style={{ color: "var(--gold-2)" }}>{k}</div>
                  <div className="dh-body" style={{ color: "var(--paper-1)" }}>{v}</div>
                </div>
              ))}
            </div>

            <div className="dh-p05__card-footer">
              <div className="dh-rule" />
              <div className="dh-p05__card-meta">
                <span className="dh-caption">FILE · EH·CHIEF · 2026.05</span>
                <span className="dh-caption">01 / 05</span>
              </div>
            </div>
          </div>

          {/* 右：大图 + 操作 */}
          <div className="dh-p05__viewer-col">
            <div className="dh-p05__viewer">
              {/* 占位 3D 模型 */}
              <div className="dh-p05__viewer-figure">
                <DhFigurine width={220} height={420} label="击鼓说唱俑" code="FIG-01 · 3D" featured />
              </div>
              <DhParticles count={50} seed={29} sizeRange={[1, 2.6]} opacityRange={[.2, .8]} />
              <div className="dh-corner tl" />
              <div className="dh-corner tr" />
              <div className="dh-corner bl" />
              <div className="dh-corner br" />

              {/* 顶部工具条 */}
              <div className="dh-p05__viewer-toolbar">
                <span className="dh-caption">3D MODEL · GLB · 0.0.1</span>
                <span className="dh-caption">VIEW · 正面 / 側面 / 俯视 / 自由</span>
              </div>

              {/* 底部刻度 */}
              <div className="dh-p05__viewer-ruler">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{ width: 1, height: i % 6 === 0 ? 10 : 6, background: "rgba(154,122,62,.4)" }} />
                ))}
              </div>
            </div>

            {/* 三按钮 */}
            <div className="dh-p05__actions">
              <button className="dh-btn">看造型</button>
              <button className="dh-btn">听故事</button>
              <button className="dh-btn">进入互动</button>
            </div>
          </div>
        </div>

        {/* 底部叙事 */}
        <div className="dh-p05__footer">
          <div className="dh-rule dh-p05__footer-rule" />
          <p className="dh-body dh-p05__footer-text">
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
