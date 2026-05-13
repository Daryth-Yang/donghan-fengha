/* ===========================================================
   chapters.ts — 十章路由与元信息（被 KeyboardNav 用作路径表）
   =========================================================== */

export type Chapter = {
  num: string;       // "01"
  cn: string;        // "壹"
  path: string;
  title: string;
  nav: string;       // 顶部导航 label
};

export const CHAPTERS: Chapter[] = [
  { num: '01', cn: '壹', path: '/',             title: '启动 · 东汉风华',     nav: '首页' },
  { num: '02', cn: '贰', path: '/history',      title: '历史 · 王朝将倾',     nav: '历史背景' },
  { num: '03', cn: '叁', path: '/map',          title: '叙事 · 山水长卷',     nav: '历史背景' },
  { num: '04', cn: '肆', path: '/figures',      title: '五俑 · 民间表情',     nav: '文物群像' },
  { num: '05', cn: '伍', path: '/detail',       title: '档案 · 文物详情',     nav: '文物群像' },
  { num: '06', cn: '陆', path: '/interaction',  title: '互动 · 手势鼓槌',     nav: '互动体验' },
  { num: '07', cn: '柒', path: '/fracture',     title: '破碎 · 重构再生',     nav: '互动体验' },
  { num: '08', cn: '捌', path: '/exhibition',   title: '展陈 · 现场动线',     nav: '展陈方案' },
  { num: '09', cn: '玖', path: '/sound',        title: '声音 · 鼓点节奏',     nav: '互动体验' },
  { num: '10', cn: '拾', path: '/ending',       title: '结尾 · 笑声归尘',     nav: '首页' },
];
