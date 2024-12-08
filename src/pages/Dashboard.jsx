import { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { format, subDays } from 'date-fns';
import useStore from '../hooks/useStore';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const { users, roles, permissions } = useStore();
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
  // Initialize chart data with default values
  const [userTrend, setUserTrend] = useState({
    labels: [],
    datasets: [{
      label: 'Active Users',
      data: [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4,
    }]
  });

  const [permissionDistribution, setPermissionDistribution] = useState({
    labels: ['Admin', 'Manager', 'User', 'Guest'],
    datasets: [{
      data: [4, 8, 15, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(156, 163, 175, 0.8)',
      ],
      borderWidth: 1,
    }]
  });

  // Add theme change observer
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Calculate active users
    const active = users?.filter(user => user.status === 'active').length || 0;
    setActiveUsers(active);

    // Generate user trend data
    const labels = Array.from({ length: 7 }, (_, i) => 
      format(subDays(new Date(), i), 'MMM dd')
    ).reverse();

    const mockData = Array.from({ length: 7 }, () => 
      Math.floor(Math.random() * 20) + 60
    );

    setUserTrend({
      labels,
      datasets: [{
        label: 'Active Users',
        data: mockData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      }]
    });

    // Set mock recent activities
    setRecentActivities([
      { id: 1, user: 'John Doe', action: 'Modified user permissions', timestamp: new Date(), type: 'security' },
      { id: 2, user: 'Jane Smith', action: 'Created new role', timestamp: subDays(new Date(), 1), type: 'role' },
      { id: 3, user: 'Mike Johnson', action: 'Updated user profile', timestamp: subDays(new Date(), 1), type: 'user' },
    ]);
  }, [users]);

  const stats = [
    { 
      title: 'Total Users',
      value: users?.length || 0,
      icon: 'fas fa-users',
      color: 'bg-blue-500',
    },
    {
      title: 'Active Roles',
      value: roles?.length || 0,
      icon: 'fas fa-user-shield',
      color: 'bg-green-500',
    },
    {
      title: 'Permissions',
      value: permissions?.length || 0,
      icon: 'fas fa-lock',
      color: 'bg-yellow-500',
    },
    {
      title: 'Active Sessions',
      value: activeUsers,
      icon: 'fas fa-signal',
      color: 'bg-purple-500',
    },
  ];

  // Update chart options based on current theme
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#1f2937',
          font: {
            size: 12
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#1f2937',
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#e5e7eb' : '#1f2937',
          font: {
            size: 12
          }
        }
      }
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#1f2937',
          font: {
            size: 12
          }
        }
      },
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor your system's security and user activities</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <i className="fas fa-download mr-2"></i>
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">User Activity Trend</h3>
          <div className="h-64">
            <Line 
              data={userTrend}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Role Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Role Distribution</h3>
          <div className="h-64">
            <Doughnut 
              data={permissionDistribution}
              options={doughnutOptions}
            />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Activities</h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${activity.type === 'security' ? 'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200' :
                    activity.type === 'role' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200' :
                    'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200'}`}>
                  <i className={`fas fa-${
                    activity.type === 'security' ? 'shield-alt' :
                    activity.type === 'role' ? 'user-shield' :
                    'user'}`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.user} <span className="text-gray-500 dark:text-gray-400">
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(activity.timestamp, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;