/* ===========================================================
   ErrorBoundary.tsx — 章节级错误兜底
   单个页面 render 崩溃不影响整个应用与底部 ChapterNav
   =========================================================== */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type State = { error: Error | null };

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="dh-stage" role="alert">
        <div className="dh-frame" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24, padding: '0 80px', textAlign: 'center' }}>
          <div className="dh-eyebrow">PAGE · 异常 · TRY AGAIN</div>
          <h1 className="dh-title-l" style={{ margin: 0 }}>鼓点失序</h1>
          <p className="dh-body" style={{ maxWidth: 640, margin: 0 }}>
            本章在渲染时遇到了问题，请尝试回到首章或刷新页面。
          </p>
          <pre className="dh-caption" style={{ maxWidth: 720, color: 'var(--paper-4)', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            {error.name}: {error.message}
          </pre>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link to="/" onClick={this.reset} className="dh-btn">回到首章</Link>
            <button type="button" onClick={() => location.reload()} className="dh-btn-ghost">刷新本页</button>
          </div>
        </div>
      </div>
    );
  }
}
