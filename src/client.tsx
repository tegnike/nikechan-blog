import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

// クライアントサイドのエントリーポイント
const root = document.getElementById('app-root');

if (root) {
  // サーバーサイドでレンダリングされたHTMLをハイドレート
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
