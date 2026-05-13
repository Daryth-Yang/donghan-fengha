/* ===========================================================
   GlobalTopBar.tsx — 视口级顶部导航
   从画板内部抽离出来，固定在 viewport 顶部，
   让 Stage 可以用 cover 模式让设计铺满整个浏览器窗口
   而无需担心导航被缩放 / 裁剪掉。
   =========================================================== */
import { useLocation } from 'react-router-dom';
import { DhTopBar } from '../components/atmosphere';
import { CHAPTERS } from './ChapterNav';

export default function GlobalTopBar() {
  const { pathname } = useLocation();
  const chap = CHAPTERS.find((c) => c.path === pathname);
  const active = chap?.nav;
  const page = chap?.num ?? '00';

  return (
    <div
      className="dh-topbar-host"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 50,
        background: 'linear-gradient(180deg, rgba(7,6,10,.88), rgba(7,6,10,.4))',
        backdropFilter: 'blur(6px)',
      }}
    >
      <DhTopBar active={active} page={page} />
    </div>
  );
}
