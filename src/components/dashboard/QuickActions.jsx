function QuickActions() {
  const actions = [
    { 
      title: 'Add User',
      icon: 'fas fa-user-plus',
      color: 'blue',
      action: () => console.log('Add user clicked')
    },
    { 
      title: 'New Role',
      icon: 'fas fa-shield-alt',
      color: 'green',
      action: () => console.log('New role clicked')
    },
    { 
      title: 'Audit Log',
      icon: 'fas fa-history',
      color: 'yellow',
      action: () => console.log('Audit log clicked')
    },
    { 
      title: 'Security',
      icon: 'fas fa-lock',
      color: 'red',
      action: () => console.log('Security clicked')
    }
  ];

  return (
    <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg p-6 
                  border border-white/10">
      <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.action}
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