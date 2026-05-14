/* ===========================================================
   ChapterFooter.tsx — 编辑型页脚（非 PPT 翻页器）
   - 两端：上一页 / 下一页，各为两行（分区眉条 + 页面标题）
   - 中央：留白；不再有 N / 10 的进度点
   - 视觉：无硬边横栏，仅一条极淡的金线 + 上沿淡入的氛围渐变
   =========================================================== */
import { Link, useLocation } from 'react-router-dom';
import { PAGES } from './pages';

export default function ChapterFooter() {
  const { pathname } = useLocation();
  const idx = PAGES.findIndex((p) => p.path === pathname);
  if (idx < 0) return null;
  const prev = PAGES[idx - 1];
  const next = PAGES[idx + 1];

  return (
    <footer className="dh-bottombar" role="contentinfo" aria-label="页脚导航">
      {prev && (
        <Link
          to={prev.path}
          className="dh-bottombar__link --prev"
          aria-label={`上一页 · ${prev.section} · ${prev.title}`}
        >
          <span className="dh-bottombar__arrow" aria-hidden="true">←</span>
          <span className="dh-bottombar__text">
            <span className="dh-bottombar__eyebrow">{prev.section}</span>
            <span className="dh-bottombar__title">{prev.title}</span>
          </span>
        </Link>
      )}
      {next && (
        <Link
          to={next.path}
          className="dh-bottombar__link --next"
          aria-label={`下一页 · ${next.section} · ${next.title}`}
        >
          <span className="dh-bottombar__text --right">
            <span className="dh-bottombar__eyebrow">{next.section}</span>
            <span className="dh-bottombar__title">{next.title}</span>
          </span>
          <span className="dh-bottombar__arrow" aria-hidden="true">→</span>
        </Link>
      )}
    </footer>
  );
}
