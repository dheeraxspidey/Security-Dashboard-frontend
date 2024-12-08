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
import QuickActions from '../components/dashboard/QuickActions';
import SecurityTable from '../components/dashboard/SecurityTable';

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
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  // Chart configurations
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

  const [roleDistribution, setRoleDistribution] = useState({
    labels: ['Admin', 'Manager', 'User', 'Guest'],
    datasets: [{
      data: [4, 8, 15, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(156, 163, 175, 0.8)',
      ],
      borderWidth: 0,
    }]
  });

  const stats = [
    { 
      title: 'Total Users',
      value: users?.length || 0,
      change: '+12.5%',
      trend: 'up',
      icon: 'fas fa-users',
      color: 'blue'
    },
    {
      title: 'Active Roles',
      value: roles?.length || 0,
      change: '+3.2%',
      trend: 'up',
      icon: 'fas fa-user-shield',
      color: 'green'
    },
    {
      title: 'Permissions',
      value: permissions?.length || 0,
      change: '-2.1%',
      trend: 'down',
      icon: 'fas fa-lock',
      color: 'yellow'
    },
    {
      title: 'Active Sessions',
      value: activeUsers,
      change: '+28.4%',
      trend: 'up',
      icon: 'fas fa-signal',
      color: 'purple'
    }
  ];

  // Refresh data based on selected period
  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Generate user trend data
      const days = selectedPeriod === 'week' ? 7 : 
                  selectedPeriod === 'month' ? 30 : 
                  selectedPeriod === 'year' ? 365 : 1;

      const labels = Array.from({ length: days }, (_, i) => 
        format(subDays(new Date(), i), days > 30 ? 'MMM yyyy' : 'MMM dd')
      ).reverse();

      const mockData = Array.from({ length: days }, () => 
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

      // Calculate active users
      const active = users?.filter(user => user.status === 'active').length || 0;
      setActiveUsers(active);

      // Update recent activities
      setRecentActivities([
        { id: 1, user: 'John Doe', action: 'Modified user permissions', timestamp: new Date(), type: 'security' },
        { id: 2, user: 'Jane Smith', action: 'Created new role', timestamp: subDays(new Date(), 1), type: 'role' },
        { id: 3, user: 'Mike Johnson', action: 'Updated user profile', timestamp: subDays(new Date(), 1), type: 'user' },
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [users, selectedPeriod]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e5e7eb',
          font: { size: 12 }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e5e7eb',
          font: { size: 12 }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e5e7eb',
          font: { size: 12 }
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
          color: '#e5e7eb',
          font: { size: 12 }
        }
      },
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1920px] mx-auto">
      {/* Header Section - Improved mobile layout */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-blue-200">Monitor your system's security and user activities</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="bg-primary-100/30 rounded-lg p-1 flex flex-wrap">
            {['today', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedPeriod === period 
                    ? 'bg-primary-300 text-white shadow-dark-glow' 
                    : 'text-blue-200 hover:text-white hover:bg-white/10'}`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 bg-primary-300 text-white rounded-lg text-sm font-medium
                     hover:bg-primary-400 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center space-x-2"
          >
            <i className={`fas fa-sync-alt ${isLoading ? 'animate-spin' : ''}`}></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid - Improved mobile layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} 
               className="bg-primary-50/30 backdrop-blur-sm rounded-lg p-4
                        border border-white/10">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20 shrink-0`}>
                <i className={`${stat.icon} text-${stat.color}-400 text-xl`}></i>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-blue-200 truncate">{stat.title}</p>
                <h3 className="text-xl font-bold text-white mt-1">{stat.value}</h3>
                <p className={`text-sm mt-2 flex items-center
                            ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  <i className={`fas fa-arrow-${stat.trend} mr-1`}></i>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - Already mobile responsive */}
      <QuickActions />

      {/* Charts - Improved mobile layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg p-4
                     border border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">User Activity Trend</h3>
          <div className="h-[250px] sm:h-[300px]">
            <Line data={userTrend} options={{
              ...chartOptions,
              maintainAspectRatio: false,
            }} />
          </div>
        </div>

        <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg p-4
                     border border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">Role Distribution</h3>
          <div className="h-[250px] sm:h-[300px]">
            <Doughnut data={roleDistribution} options={{
              ...doughnutOptions,
              maintainAspectRatio: false,
            }} />
          </div>
        </div>
      </div>

      {/* Security Table - Already mobile responsive */}
      <SecurityTable />

      {/* Recent Activities - Improved mobile layout */}
      <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg
                   border border-white/10">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Recent Activities</h3>
            <button className="text-blue-300 hover:text-blue-200 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} 
                   className="flex items-center gap-3 p-3
                          hover:bg-white/5 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                  ${activity.type === 'security' ? 'bg-red-500/20 text-red-400' :
                    activity.type === 'role' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'}`}>
                  <i className={`fas fa-${
                    activity.type === 'security' ? 'shield-alt' :
                    activity.type === 'role' ? 'user-shield' :
                    'user'}`}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">
                    <span className="font-medium text-white">{activity.user}</span>
                    <span className="text-blue-200"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-blue-200">
                    {format(activity.timestamp, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <button className="text-blue-200 hover:text-white shrink-0">
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