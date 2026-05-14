/* ===========================================================
   pages.ts — 网站路由与分区元信息
   - 不再使用"第几章"概念；改为 section（主分区） + title（页面副标）
   - 数组顺序仅用于 KeyboardNav 的辅助快捷键，不向用户暴露任何"X / N"
   =========================================================== */

export type Page = {
  path: string;
  section: string;   // 顶栏主分区（首页 / 历史背景 / 文物群像 / 互动体验 / 展陈方案 / 尾声）
  title: string;     // 页面副标（"王朝将倾 · 鼓声未息" 等）
};

export const PAGES: Page[] = [
  { path: '/',             section: '首页',     title: '东汉风华 · 俳优之志' },
  { path: '/history',      section: '历史背景', title: '王朝将倾 · 鼓声未息' },
  { path: '/figures',      section: '文物群像', title: '五个俑 · 五种民间表情' },
  { path: '/detail',       section: '文物群像', title: '文物档案 · 来路与去向' },
  // 互动体验 section 暂时隐藏（/interaction · /fracture · /sound 路由仍在 App.tsx 中保留，
  // 仅从导航 / 页脚 / 键盘翻页流中移除；未来恢复时把下面三行还原即可）
  // { path: '/interaction',  section: '互动体验', title: '手势鼓槌 · 唤醒陶俑' },
  // { path: '/fracture',     section: '互动体验', title: '破碎重构 · 粒子再生' },
  // { path: '/sound',        section: '互动体验', title: '鼓点节奏 · 四态音频' },
  { path: '/exhibition',   section: '展陈方案', title: '展陈现场 · 观众动线' },
  { path: '/ending',       section: '尾声',     title: '笑声归尘 · 鼓点仍在' },
];
