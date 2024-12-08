import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      <aside className={`fixed top-0 left-0 h-full z-30
        ${isMobile ? 'w-20' : (isCollapsed ? 'w-20' : 'w-64')}
        transition-all duration-300 ease-in-out`}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </aside>
      
      <div className={`flex-1 transition-all duration-300 ease-in-out bg-black
        ${isMobile ? 'ml-20' : (isCollapsed ? 'ml-20' : 'ml-64')}`}>
        <Header onMenuClick={() => setIsCollapsed(!isCollapsed)} />
        <main className="p-4 md:p-6 lg:p-8 text-white bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
