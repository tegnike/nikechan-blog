import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const ClientLayout: React.FC = () => {
  return (
    <>
      <header className="border-b border-transparent fixed top-0 left-0 right-0 z-10 bg-gray-900">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">
              <Link to="/" className="transition-colors">
                Nike's Portfolio
              </Link>
            </h1>
            <ul className="flex gap-6 text-white">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-blue-300 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-blue-300 transition-colors">About</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          © 2025 nikechan
        </div>
      </footer>
    </>
  );
};
