import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children }) {
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 
                    text-gray-900 dark:text-white 
                    transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
