import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header />
        <main className="p-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
