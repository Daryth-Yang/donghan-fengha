import { Link } from 'react-router-dom';
import { DhTopBar, DhMist, DhMountains, DhParticles, DhFigurine, DhRipples, DhMeander, DhCorners } from '../components/atmosphere';

export default function Page10_Ending() {
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="尾声" />
        <DhMist />
        <DhMountains />
        <DhParticles count={90} seed={53} opacityRange={[.15, .7]} />

        {/* 主区：可滚动容器（短屏自动出滚动条；高屏内容自然居中） */}
        <div className="dh-p10__body">
          <div className="dh-p10__inner">

            {/* 五个陶俑剪影逐渐消散，只留下中间击鼓的小鼓 */}
            <div className="dh-p10__figs">
              {[
                { o: .12, w: 'clamp(58px, 5.6vw, 118px)', h: 'clamp(120px, 11vw, 240px)' },
                { o: .25, w: 'clamp(58px, 5.6vw, 118px)', h: 'clamp(146px, 13.4vw, 290px)' },
                { o: .9,  w: 'clamp(78px, 7.2vw, 152px)', h: 'clamp(190px, 17.4vw, 376px)', featured: true },
                { o: .25, w: 'clamp(58px, 5.6vw, 118px)', h: 'clamp(146px, 13.4vw, 290px)' },
                { o: .12, w: 'clamp(58px, 5.6vw, 118px)', h: 'clamp(120px, 11vw, 240px)' },
              ].map((f, i) => (
                <div key={i} style={{ opacity: f.o, position: "relative" }}>
                  {f.featured && <DhRipples count={3} size="clamp(170px, 16vw, 340px)" x="50%" y="50%" />}
                  <DhFigurine width={f.w} height={f.h} label={["散","隐","鼓","隐","散"][i]} code={`${i+1}/5`} featured={f.featured} />
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
            <div className="dh-p10__title-wrap">
              <div className="dh-eyebrow" style={{ marginBottom: 16 }}>FINALE · 尾声</div>
              <h1 className="dh-title-l" style={{ margin: 0 }}>
                笑声归尘 <span style={{ color: "var(--gold-2)", margin: "0 14px" }}>·</span> 鼓点仍在
              </h1>
              <div className="dh-p10__meander-wrap">
                <DhMeander width={320} />
              </div>
            </div>

            {/* 三栏诗文 */}
            <div className="dh-p10__poem">
              <p className="dh-body" style={{ margin: 0, textAlign: "center", lineHeight: 2.1, color: "var(--paper-2)" }}>
                他们没有留下姓名。<br/>
                留下的是一个抬起的鼓槌，<br/>
                一个夸张的笑容，<br/>
                一个即将开始的动作。
              </p>
              <div className="dh-rule-v dh-p10__poem-rule" />
              <p className="dh-body" style={{ margin: 0, textAlign: "center", lineHeight: 2.1, color: "var(--paper-2)" }}>
                在东汉末年的动荡中，<br/>
                历史记住了战争与英雄；<br/>
                而陶俑记住了，<br/>
                民间的笑声。
              </p>
              <div className="dh-rule-v dh-p10__poem-rule" />
              <p className="dh-body" style={{ margin: 0, textAlign: "center", lineHeight: 2.1, color: "var(--gold-3)" }}>
                当观众的手势再次唤醒它们，<br/>
                被尘土覆盖的不是文物，<br/>
                而是一段，<br/>
                重新被听见的生活。
              </p>
            </div>

            {/* 三按钮 —— 互动体验暂时隐藏，第三个改为指向展陈方案 */}
            <div className="dh-p10__cta">
              <Link to="/" className="dh-btn">重新听鼓 ⟲</Link>
              <Link to="/detail" className="dh-btn-ghost">查看文物档案</Link>
              <Link to="/exhibition" className="dh-btn-ghost">查看展陈方案</Link>
            </div>

          </div>
        </div>

        <div className="dh-side-vert dh-p10__sidemark">笑声归尘 鼓点仍在</div>

        <DhCorners />
      </div>
    </div>
  );
}
