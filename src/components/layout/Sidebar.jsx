import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: 'fas fa-chart-line',
      description: 'Overview & Analytics'
    },
    { 
      name: 'Users', 
      path: '/users', 
      icon: 'fas fa-users',
      description: 'Manage System Users'
    },
    { 
      name: 'Roles', 
      path: '/roles', 
      icon: 'fas fa-user-shield',
      description: 'Configure User Roles'
    },
    { 
      name: 'Permissions', 
      path: '/permissions', 
      icon: 'fas fa-lock',
      description: 'Set Access Rights'
    },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 
        bg-gradient-to-b from-blue-900 to-blue-800 
        dark:from-gray-800 dark:to-gray-900 
        text-white transition-all duration-300 ease-in-out z-30
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 
                    border-b border-blue-700/50 dark:border-gray-700/50">
        {!isCollapsed && (
          <h1 className="text-xl font-bold tracking-wider text-white">
            VRV Security
          </h1>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg 
             bg-blue-800/50 dark:bg-gray-700/50
             hover:bg-blue-700/50 dark:hover:bg-gray-600/50
             text-white/80 hover:text-white
             transition-all duration-200
             focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'} 
                transition-all duration-200
                transform ${isCollapsed ? 'rotate-180' : ''}`}>
          </i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center px-4 py-3 my-1
              rounded-lg transition-all duration-200 ease-in-out
              hover:bg-white/10 
              ${isActive 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:text-white'}`
            }
          >
            <i className={`${item.icon} w-6 transition-colors duration-200
                        ${isCollapsed ? 'text-xl' : ''}`}>
            </i>
            {!isCollapsed && (
              <div className="ml-3">
                <span className="font-medium block">
                  {item.name}
                </span>
                <span className="text-xs text-white/50 group-hover:text-white/70 
                              transition-colors duration-200">
                  {item.description}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 
                    border-t border-blue-700/50 dark:border-gray-700/50">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3 
                       hover:bg-white/10 rounded-lg p-2 
                       transition-all duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-white/10 
                          rounded-full flex items-center justify-center">
              <i className="fas fa-headset text-white"></i>
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">Need Help?</p>
              <p className="text-blue-300 dark:text-gray-400">Contact Support</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-white/10 
                         rounded-full flex items-center justify-center 
                         hover:bg-white/20 transition-colors duration-200 
                         cursor-pointer">
              <i className="fas fa-headset text-white"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;