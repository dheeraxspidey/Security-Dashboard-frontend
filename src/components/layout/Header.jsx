import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const notifications = [
    { id: 1, text: 'New user registration', time: '5m ago', type: 'info' },
    { id: 2, text: 'Permission changes detected', time: '10m ago', type: 'warning' },
    { id: 3, text: 'System update completed', time: '1h ago', type: 'success' },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return 'Dashboard Overview';
      case '/users': return 'User Management';
      case '/roles': return 'Role Configuration';
      case '/permissions': return 'Permission Settings';
      default: return 'RBAC Dashboard';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-8 h-16">
        {/* Page Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{getPageTitle()}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg 
                  bg-white dark:bg-gray-700 
                  border border-gray-300 dark:border-gray-600 
                  text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        notification.type === 'info' ? 'bg-blue-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="text-sm text-gray-800 dark:text-white">{notification.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img
                className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                alt="Admin"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">System Administrator</p>
              </div>
              <i className="fas fa-chevron-down text-xs text-gray-500 dark:text-gray-400"></i>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-50">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-user-circle mr-2"></i> Your Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-cog mr-2"></i> Settings
                </a>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <a href="#logout" className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;