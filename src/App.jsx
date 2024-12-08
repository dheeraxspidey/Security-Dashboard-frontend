import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.querySelector('meta[name="theme-color"]')
        .setAttribute('content', isDark ? '#111827' : '#ffffff');
    };

    // Update initially
    updateThemeColor();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateThemeColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <BrowserRouter>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Routes>
            <Route path="/" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/users" element={<Users darkMode={darkMode} />} />
            <Route path="/roles" element={<Roles darkMode={darkMode} />} />
            <Route path="/permissions" element={<Permissions darkMode={darkMode} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
