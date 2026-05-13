import { DhMist, DhMountains, DhParticles, DhFigurine, DhRipples, DhMeander, DhCorners } from '../components/atmosphere';

export default function Page10_Ending() {
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhMist />
        <DhMountains />
        <DhParticles count={90} seed={53} opacityRange={[.15, .7]} />

        {/* 五个陶俑剪影逐渐消散，只留下中间击鼓的小鼓 */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 200, height: 280, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 40 }}>
          {[
            { o: .12, h: 140 },
            { o: .25, h: 170 },
            { o: .9,  h: 220, featured: true }, // 中央击鼓
            { o: .25, h: 170 },
            { o: .12, h: 140 },
          ].map((f, i) => (
            <div key={i} style={{ opacity: f.o, position: "relative" }}>
              {f.featured && <DhRipples count={3} size={200} x="50%" y={f.h / 2} />}
              <DhFigurine width={f.featured ? 90 : 70} height={f.h} label={["散","隐","鼓","隐","散"][i]} code={`${i+1}/5`} featured={f.featured} />
              {/* 飞散的金色粒子 */}
              {!f.featured && [...Array(6)].map((_, k) => (
                <div key={k} className="dh-dot" style={{
                  width: 2, height: 2, background: "var(--gold-4)",
                  left: 30 + (k * 13) % 80,
                  top: 20 + (k * 23) % 100,
                  boxShadow: "0 0 6px var(--gold-4)",
                  opacity: 1 - f.o
                }} />
              ))}
            </div>
          ))}
        </div>

        {/* 标题 */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 510, textAlign: "center" }}>
          <div className="dh-eyebrow" style={{ marginBottom: 16 }}>FINALE · 第 拾 章</div>
          <h1 className="dh-title-l" style={{ margin: 0, fontSize: 68 }}>
            笑声归尘 <span style={{ color: "var(--gold-2)", margin: "0 14px" }}>·</span> 鼓点仍在
          </h1>
          <div style={{ display: "flex", justifyContent: "center", margin: "26px auto 0" }}>
            <DhMeander width={320} />
          </div>
        </div>

        {/* 三栏诗文 */}
        <div style={{ position: "absolute", top: 660, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 80 }}>
          <p className="dh-body" style={{ margin: 0, textAlign: "center", lineHeight: 2.1, color: "var(--paper-2)" }}>
            他们没有留下姓名。<br/>
            留下的是一个抬起的鼓槌，<br/>
            一个夸张的笑容，<br/>
            一个即将开始的动作。
          </p>
          <div className="dh-rule-v" style={{ height: 120 }} />
          <p className="dh-body" style={{ margin: 0, textAlign: "center", lineHeight: 2.1, color: "var(--paper-2)" }}>
            在东汉末年的动荡中，<br/>
            历史记住了战争与英雄；<br/>
            而陶俑记住了，<br/>
            民间的笑声。
          </p>
          <div className="dh-rule-v" style={{ height: 120 }} />
          <p className="dh-body" style={{ margin: 0, textAlign: "center", lineHeight: 2.1, color: "var(--gold-3)" }}>
            当观众的手势再次唤醒它们，<br/>
            被尘土覆盖的不是文物，<br/>
            而是一段，<br/>
            重新被听见的生活。
          </p>
        </div>

        {/* 三按钮 */}
        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
          <button className="dh-btn">重新听鼓 ⟲</button>
          <button className="dh-btn-ghost">查看文物档案</button>
          <button className="dh-btn-ghost">进入互动说明</button>
        </div>

        <div className="dh-side-vert" style={{ right: 32, top: 110 }}>笑声归尘 鼓点仍在</div>

        <DhCorners />
      </div>
    </div>
  );
}
