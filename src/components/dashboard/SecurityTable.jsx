import { useState } from 'react';

function SecurityTable() {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  
  const securityEvents = [
    {
      id: 1,
      event: 'Failed Login Attempt',
      user: 'unknown@email.com',
      ip: '192.168.1.100',
      severity: 'high',
      timestamp: '2024-02-20T10:30:00'
    },
    {
      id: 2,
      event: 'Permission Changed',
      user: 'admin@vrvsecurity.com',
      ip: '192.168.1.101',
      severity: 'medium',
      timestamp: '2024-02-20T10:25:00'
    },
    {
      id: 3,
      event: 'New User Created',
      user: 'admin@vrvsecurity.com',
      ip: '192.168.1.101',
      severity: 'low',
      timestamp: '2024-02-20T10:20:00'
    },
    // Add more events as needed
  ];

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg 
                  border border-white/10 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Security Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Event', 'User', 'IP Address', 'Severity', 'Timestamp'].map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header.toLowerCase())}
                    className="px-4 py-3 text-left text-sm font-medium text-blue-200 
                             cursor-pointer hover:text-white transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      {sortConfig.key === header.toLowerCase() && (
                        <i className={`fas fa-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'} 
                                   text-xs ml-1`}></i>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {securityEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/10 hover:bg-white/5 
                           transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-sm text-white">{event.event}</td>
                  <td className="px-4 py-3 text-sm text-white">{event.user}</td>
                  <td className="px-4 py-3 text-sm text-blue-200">{event.ip}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                 ${getSeverityColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-200">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SecurityTable; 