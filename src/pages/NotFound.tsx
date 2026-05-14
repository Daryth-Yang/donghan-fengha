/* ===========================================================
   NotFound.tsx — 路径未收录的兜底页
   保留水墨气氛，明确告知用户而非默默回到首章
   =========================================================== */
import { Link, useLocation } from 'react-router-dom';
import { DhTopBar, DhMist, DhParticles, DhCorners, DhMeander } from '../components/atmosphere';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="首页" />
        <DhMist />
        <DhParticles count={70} seed={101} opacityRange={[0.18, 0.55]} />

        <section className="dh-p404__content">
          <div className="dh-eyebrow" style={{ marginBottom: 18 }}>OFF-SCROLL · 404</div>
          <h1 className="dh-title-xl" style={{ margin: 0 }}>路径未收录</h1>
          <div className="dh-p404__meander-wrap">
            <DhMeander width={320} />
          </div>
          <p className="dh-body-l dh-p404__hint" style={{ margin: 0 }}>
            山水长卷上没有这一段 <code style={{ color: 'var(--gold-4)', fontFamily: 'var(--sf-mono)', fontSize: '0.85em' }}>{pathname}</code>。
          </p>
          <p className="dh-body" style={{ marginTop: 16, color: 'var(--paper-3)' }}>
            你可以从首章重新听鼓，或翻到任意一章。
          </p>
          <div className="dh-p404__cta">
            <Link to="/" className="dh-btn">回到首章 ——→</Link>
            <Link to="/figures" className="dh-btn-ghost">查看文物群像</Link>
          </div>
        </section>

        <DhCorners />
      </div>
    </div>
  );
}
