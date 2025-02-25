import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClientLayout } from './ClientLayout';
import { Home } from './client/Home';
import { BlogPage } from './client/BlogPage';
import { BlogDetailPage } from './client/BlogDetailPage';
import { MonthlySummaryPage } from './client/MonthlySummaryPage';
import { AboutPage } from './client/AboutPage';
import { GalleryViewer } from './client/GalleryViewer';
import { AnalyticsDashboard } from './client/AnalyticsDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="blog/summary/:yearMonth" element={<MonthlySummaryPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
      {/* モーダルコンポーネント */}
      <GalleryViewer />
    </BrowserRouter>
  );
};
