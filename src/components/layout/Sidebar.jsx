import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200
        backdrop-blur-sm bg-opacity-95
        border-r border-white/10
        shadow-dark-lg
        text-white transition-all duration-300 ease-in-out z-30
        ${isCollapsed || isMobile ? 'w-20' : 'w-64'}
        translate-x-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 
                    border-b border-white/10 bg-white/5">
        {!isCollapsed && !isMobile && (
          <h1 className="text-xl font-bold tracking-wider text-white">
            VRV Security
          </h1>
        )}
        {!isMobile && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg 
               bg-white/10 hover:bg-white/20
               text-white/80 hover:text-white
               transition-all duration-200
               shadow-dark-sm hover:shadow-dark-glow
               focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
          </button>
        )}
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
              hover:bg-white/10 hover:shadow-dark-glow
              ${isActive 
                ? 'bg-white/20 shadow-dark-glow text-white' 
                : 'text-white/70 hover:text-white'}
              ${isCollapsed || isMobile ? 'justify-center' : ''}`
            }
          >
            <i className={`${item.icon} transition-colors duration-200
                        ${isCollapsed || isMobile ? 'text-xl' : 'w-6'}`}>
            </i>
            {!isCollapsed && !isMobile && (
              <div className="ml-3">
                <span className="font-medium block">
                  {item.name}
                </span>
                <span className="text-xs text-blue-200 group-hover:text-blue-100 
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
                    border-t border-white/10 bg-white/5">
        {!isCollapsed && !isMobile ? (
          <div className="flex items-center space-x-3 
                       hover:bg-white/10 rounded-lg p-2 
                       transition-all duration-200 cursor-pointer
                       hover:shadow-dark-glow">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=2563eb"
              alt="Profile"
              className="w-8 h-8 rounded-full ring-2 ring-white/10"
            />
            <div className="text-sm">
              <p className="font-medium text-white">Admin User</p>
              <p className="text-blue-200">admin@vrvsecurity.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=2563eb"
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-white/10 
                       hover:ring-white/30 transition-all duration-200 
                       cursor-pointer hover:shadow-dark-glow"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;