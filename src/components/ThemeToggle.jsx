import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(
      localStorage.theme === 'dark' || 
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-7 rounded-full w-12 
                bg-gray-200 dark:bg-gray-700 transition-colors duration-300 
                focus:outline-none px-[2px]"
      role="switch"
      aria-checked={isDark}
    >
      <span className="sr-only">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      <div
        className={`${
          isDark ? 'translate-x-5 bg-blue-600' : 'translate-x-0 bg-white'
        } inline-block w-5 h-5 transform rounded-full 
           transition-transform duration-300 ease-in-out
           flex items-center justify-center relative`}
      >
        <i className={`text-[10px] absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 ${
          isDark 
            ? 'fas fa-moon text-white' 
            : 'fas fa-sun text-yellow-500'
        }`}></i>
      </div>
    </button>
  );
}

export default ThemeToggle; 