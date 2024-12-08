import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { 
      title: 'Add User',
      icon: 'fas fa-user-plus',
      color: 'blue',
      path: '/users'
    },
    { 
      title: 'New Role',
      icon: 'fas fa-shield-alt',
      color: 'green',
      path: '/roles'
    },
    { 
      title: 'Audit Log',
      icon: 'fas fa-history',
      color: 'yellow',
      path: '/permissions'
    },
    { 
      title: 'Security',
      icon: 'fas fa-lock',
      color: 'red',
      path: '/settings'
    }
  ];

  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  return (
    <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg p-6 
                  border border-white/10">
      <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => handleNavigation(action.path)}
            className={`p-4 rounded-lg bg-${action.color}-500/20 
                     hover:bg-${action.color}-500/30
                     group flex flex-col items-center justify-center
                     transition-all duration-200 hover:shadow-dark-glow`}
          >
            <i className={`${action.icon} text-${action.color}-400 text-xl 
                        group-hover:scale-110 transition-transform duration-200`}></i>
            <span className="mt-2 text-sm text-white">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions; 