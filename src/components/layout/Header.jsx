import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: 'New user registration', time: '5m ago', type: 'info' },
    { id: 2, text: 'Permission changes detected', time: '10m ago', type: 'warning' },
    { id: 3, text: 'System update completed', time: '1h ago', type: 'success' },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return 'Dashboard';
      case '/users': return 'Users';
      case '/roles': return 'Roles';
      case '/permissions': return 'Permissions';
      default: return 'RBAC';
    }
  };

  return (
    <header className="bg-primary-100/95 backdrop-blur-sm border-b border-white/10 shadow-dark-lg relative z-50">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Page Title - Mobile Optimized */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="mr-4 p-2 rounded-lg md:hidden 
                     bg-white/10 hover:bg-white/20
                     text-white/80 hover:text-white
                     transition-all duration-200"
          >
            <i className={`fas fa-${showMobileMenu ? 'times' : 'bars'}`}></i>
          </button>
          
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-wide">
              {getPageTitle()}
            </h2>
            <p className="text-xs md:text-sm text-blue-200 hidden sm:block">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Search - Hidden on Mobile */}
          <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg 
                  bg-white/10 border border-white/10 
                  text-white placeholder-blue-200
                  focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200
                  hover:bg-white/20"
              />
              <i className="fas fa-search absolute left-3 top-3 text-blue-200"></i>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-blue-200 hover:text-white 
                       bg-white/10 rounded-lg
                       hover:bg-white/20 hover:shadow-dark-glow
                       transition-all duration-200
                       focus:outline-none"
            >
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 h-5 w-5 
                           bg-red-500 rounded-full text-xs text-white 
                           flex items-center justify-center
                           animate-pulse">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] md:w-80 
                           bg-primary-50/95 backdrop-blur-sm rounded-lg 
                           shadow-dark-lg border border-white/10
                           z-[60]">
                <div className="px-4 py-2 border-b border-white/10">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-white/10 cursor-pointer
                             transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        notification.type === 'info' ? 'bg-blue-400' :
                        notification.type === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                      } animate-pulse`}></div>
                      <div>
                        <p className="text-sm text-white">{notification.text}</p>
                        <p className="text-xs text-blue-200">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-white/10">
                  <button className="text-sm text-blue-300 hover:text-blue-200
                                 transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2
                       bg-white/10 rounded-lg
                       hover:bg-white/20 hover:shadow-dark-glow
                       transition-all duration-200
                       focus:outline-none"
            >
              <img
                className="w-8 h-8 rounded-full ring-2 ring-white/20"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=2563eb"
                alt="Admin"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-blue-200">System Administrator</p>
              </div>
              <i className="fas fa-chevron-down text-xs text-blue-200 hidden md:block"></i>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 
                           bg-primary-50/95 backdrop-blur-sm rounded-lg 
                           shadow-dark-lg border border-white/10
                           z-[60]">
                <a href="#profile" className="flex items-center px-4 py-2 text-sm 
                                          text-blue-200 hover:text-white
                                          hover:bg-white/10
                                          transition-all duration-200">
                  <i className="fas fa-user-circle mr-2"></i> Your Profile
                </a>
                <a href="#settings" className="flex items-center px-4 py-2 text-sm 
                                          text-blue-200 hover:text-white
                                          hover:bg-white/10
                                          transition-all duration-200">
                  <i className="fas fa-cog mr-2"></i> Settings
                </a>
                <div className="border-t border-white/10 my-1"></div>
                <a href="#logout" className="flex items-center px-4 py-2 text-sm 
                                        text-red-400 hover:text-red-300
                                        hover:bg-white/10
                                        transition-all duration-200">
                  <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-primary-50/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg 
                  bg-white/10 border border-white/10 
                  text-white placeholder-blue-200
                  focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-200"
              />
              <i className="fas fa-search absolute left-3 top-3 text-blue-200"></i>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;