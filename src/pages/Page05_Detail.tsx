import { useSearchParams } from 'react-router-dom';
import {
  DhTopBar, DhMist, DhParticles, DhFigurine, DhCorners,
  DhSection, DhSectionNav, DhMeander, cn,
} from '../components/atmosphere';

type Figure = {
  code: string;     // FIG-01..05
  cn: string;       // 中文俑名
  en: string;       // 英文副标题
  catalog: string;  // 编号
  excavation: string; // 出土
  museum: string;   // 现藏地
  paragraphs: string[]; // 简介，2-3 段
};

const FIGURES: Figure[] = [
  {
    code: 'FIG-01',
    cn: '击鼓说唱俑',
    en: 'EASTERN HAN · DRUMMING STORYTELLER',
    catalog: '东汉墓 · 墓三',
    excavation: '四川省成都市天回山东汉崖墓',
    museum: '中国国家博物馆',
    paragraphs: [
      '东汉击鼓说唱陶俑于 1957 年出土于四川省成都市天回山东汉崖墓，为东汉明器。',
      '通高 56 厘米，以泥质灰陶制成；头上戴帻，两肩高耸，着裤赤足，左臂环抱一扁鼓，右手举槌欲击，张口嘻笑，神态诙谐，动作夸张，活现一俳优正在说唱的形象。',
      '东汉击鼓说唱陶俑被誉为「汉代第一俑」，是一件富有浓厚民间气息和地方风貌的优秀雕塑作品，属国家一级文物。',
    ],
  },
  {
    code: 'FIG-02',
    cn: '陶说唱俑',
    en: 'EASTERN HAN · PIPED SINGER',
    catalog: '东汉陶 · 宋家林',
    excavation: '四川省郫县宋家林砖室墓',
    museum: '四川博物院',
    paragraphs: [
      '东汉陶说唱俑于 1963 年出土于四川省郫县宋家林砖室墓，现藏于四川博物院，为国家一级文物。通高 66.5 厘米，以泥质灰陶制成。',
      '头顶作椎髻，双目微闭，歪嘴吐舌，两肩高耸，左手托鼓，右手执槌欲击。上身赤裸，鼓腹翘臀，宽肥长裤垂落至臀下，造型夸张生动，活现一位正在击鼓说唱的俳优形象。',
      '以强烈的艺术夸张和鲜活的动态表现，被认为是汉代陶塑艺术与民间说唱文化的重要代表，展现了东汉时期四川地区乐观活泼的社会生活气息。',
    ],
  },
  {
    code: 'FIG-03',
    cn: '陶俳优俑 · 李家梁',
    en: 'EASTERN HAN · SHU REGION ENTERTAINER',
    catalog: '东汉陶 · 李家梁',
    excavation: '四川省成都金堂县李家梁子汉墓',
    museum: '成都博物馆',
    paragraphs: [
      '东汉陶俳优俑出土于四川省成都市金堂县李家梁子汉墓，现藏于成都博物馆。该俑通高 60 厘米、宽 40 厘米，为东汉陶俑。',
      '头戴巾帽，着裤赤足，上身袒露，双肩高耸，左手执鼓，右手作执槌击鼓状。右脚蹬踢，左脚蜷曲，仰面大笑，动作与神情都极为夸张，活现一位正在表演的俳优形象。',
      '以生动的动态、诙谐的表情和强烈的艺术感染力，展现了汉代四川地区丰富活跃的百戏文化与民间娱乐生活，也体现出东汉陶塑艺术鲜明的写实性和表现力。',
    ],
  },
  {
    code: 'FIG-04',
    cn: '陶说唱俑 · 九龙山',
    en: 'EASTERN HAN · JIULONGSHAN PERFORMER',
    catalog: '东汉陶 · 九龙山',
    excavation: '河边镇九龙山',
    museum: '成都博物馆',
    paragraphs: [
      '东汉陶说唱俑出土于河边镇九龙山，现藏于成都博物馆。',
      '该俑为东汉陶俑，造型生动质朴。俑体前倾，双肩耸起，腹部隆起，双手收于身前，头部微低，面部神情夸张，呈现出强烈的表演感与动态感，塑造出一位正在说唱表演中的俳优形象。',
      '以概括而富有张力的肢体语言，展现出东汉时期四川地区民间说唱艺术和市井娱乐生活的生动面貌，也体现出汉代陶俑艺术中鲜明的现实性与表现力。',
    ],
  },
  {
    code: 'FIG-05',
    cn: '陶俳优俑 · 六一一所',
    en: 'EASTERN HAN · FINALE PERFORMER',
    catalog: '东汉陶 · 六一一所',
    excavation: '成都六一一所汉墓',
    museum: '成都博物馆',
    paragraphs: [
      '东汉陶俳优俑出土于成都六一一所汉墓，现藏成都博物馆。',
      '俑体前倾，双肩高耸，腹部隆起，左臂高举，右手屈肘收于胸前，双腿一前一后，神情夸张，动作富有张力，活现一位正在表演的俳优形象。',
      '以生动的动态、诙谐的表情和强烈的艺术感染力，展现了汉代四川地区市井娱乐和民间表演的活跃景象，也体现出东汉陶俑艺术鲜明的写实性与表现力。',
    ],
  },
];

const codeToIndex = (code: string | null): number => {
  if (!code) return 0;
  const m = code.match(/(\d+)/);
  if (!m) return 0;
  const i = parseInt(m[1], 10) - 1;
  return Math.min(Math.max(i, 0), FIGURES.length - 1);
};

export default function Page05_Detail() {
  const [params, setParams] = useSearchParams();
  const idx = codeToIndex(params.get('fig'));
  const fig = FIGURES[idx];

  const setFig = (i: number) => {
    const code = (i + 1).toString().padStart(2, '0');
    setParams({ fig: code });
  };

  const total = FIGURES.length;
  const ordinal = `零·${cn(idx + 1)}`;

  return (
    <div className="dh-stage">
      <div className="dh-frame">
        <DhTopBar active="文物群像" />
        <DhMist />
        <DhParticles count={45} seed={23} opacityRange={[.15, .5]} />

        <div className="dh-p05__header">
          <DhSection label="ARTIFACT FILE · 文物档案" title="五件俑的来路与去向" />
          <div className="dh-caption">
            {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>

        <DhSectionNav />

        {/* 主区双栏 */}
        <div className="dh-p05__main">

          {/* 左:水彩主图 + 光环 */}
          <div className="dh-p05__viewer">
            <div className="dh-p05__halo" aria-hidden="true" />
            <div className="dh-p05__viewer-figure" key={fig.code}>
              <DhFigurine
                width="clamp(300px, 32vw, 640px)"
                height="clamp(400px, 48vh, 680px)"
                label={fig.cn}
                code={fig.code}
                featured
              />
            </div>
            <div className="dh-p05__viewer-corner --tl">
              <span className="dh-caption">{fig.code}</span>
              <span className="dh-caption">2026 · DIGITAL ARCHIVE</span>
            </div>
          </div>

          {/* 右:档案 */}
          <div className="dh-p05__doc" key={fig.code + '-doc'}>
            <div className="dh-p05__doc-ordinal">{ordinal}</div>
            <h2 className="dh-title-l dh-p05__doc-title" style={{ margin: 0 }}>{fig.cn}</h2>
            <div className="dh-eyebrow">{fig.en}</div>
            <DhMeander width={260} />

            {/* 元数据三行 */}
            <dl className="dh-p05__doc-meta">
              <div className="dh-p05__doc-meta-row">
                <dt className="dh-caption">编号</dt>
                <dd className="dh-body">{fig.catalog}</dd>
              </div>
              <div className="dh-p05__doc-meta-row">
                <dt className="dh-caption">出土</dt>
                <dd className="dh-body">{fig.excavation}</dd>
              </div>
              <div className="dh-p05__doc-meta-row">
                <dt className="dh-caption">现藏</dt>
                <dd className="dh-body">{fig.museum}</dd>
              </div>
            </dl>

            {/* 简介段落 */}
            <div className="dh-p05__doc-body dh-scroll">
              {fig.paragraphs.map((p, i) => (
                <p key={i} className="dh-body">{p}</p>
              ))}
            </div>

            {/* 上一件 / 下一件 由底部切换器接管，进入互动 由 ChapterFooter 接管 */}
          </div>
        </div>

        {/* 底部:5 俑切换器 */}
        <div className="dh-p05__switcher">
          <div className="dh-p05__switcher-rule" />
          <div className="dh-p05__switcher-row">
            {FIGURES.map((f, i) => {
              const active = i === idx;
              return (
                <button
                  key={f.code}
                  type="button"
                  className={`dh-p05__switcher-item ${active ? '--active' : ''}`}
                  onClick={() => setFig(i)}
                  aria-label={`切换到 ${f.cn}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <div className="dh-p05__switcher-num">零·{cn(i + 1)}</div>
                  <div className="dh-p05__switcher-thumb">
                    <DhFigurine width="clamp(72px, 5.8vw, 124px)" height="clamp(96px, 7.2vw, 156px)" label={f.cn} code={f.code} />
                  </div>
                  <div className="dh-p05__switcher-name dh-caption">{f.cn}</div>
                </button>
              );
            })}
          </div>
        </div>

        <DhCorners />
      </div>
    </div>
  );
}
