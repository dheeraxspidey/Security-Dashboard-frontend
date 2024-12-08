import { useState, useEffect } from 'react';
import useStore from '../hooks/useStore';
import { getRoleColors } from '../utils/roleColors';

function Permissions() {
  const { permissions, setPermissions, roles } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPermissions, setFilteredPermissions] = useState(permissions);
  const [newPermission, setNewPermission] = useState({
    name: '',
    description: '',
    category: 'general',
    isActive: true
  });

  // Categories for organizing permissions
  const categories = [
    { id: 'general', name: 'General', icon: 'fas fa-cube' },
    { id: 'users', name: 'Users', icon: 'fas fa-users' },
    { id: 'content', name: 'Content', icon: 'fas fa-file-alt' },
    { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'admin', name: 'Administration', icon: 'fas fa-cog' }
  ];

  // Category tag styling
  const categoryColors = {
    general: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-800 dark:text-gray-200'
    },
    users: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-200'
    },
    admin: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-800 dark:text-purple-200'
    },
    security: {
      bg: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-800 dark:text-red-200'
    },
    content: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200'
    }
  };

  // Filter permissions based on search query
  useEffect(() => {
    const filtered = permissions.filter(
      permission => 
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPermissions(filtered);
  }, [searchQuery, permissions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPermission) {
      const updatedPermissions = permissions.map(p =>
        p.id === selectedPermission.id ? { ...newPermission, id: p.id } : p
      );
      setPermissions(updatedPermissions);
    } else {
      setPermissions([...permissions, { ...newPermission, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setSelectedPermission(null);
    setNewPermission({
      name: '',
      description: '',
      category: 'general',
      isActive: true
    });
  };

  const getRolesByPermission = (permissionName) => {
    return roles.filter(role => 
      role.permissions.includes(permissionName)
    ).map(role => role.name);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1920px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Permissions Management</h1>
          <p className="text-sm text-blue-200">Configure and manage system permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-primary-50/30 backdrop-blur-sm
                       border border-white/10 rounded-lg
                       text-white placeholder-blue-200
                       focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-blue-200"></i>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-primary-300 text-white rounded-lg
                     hover:bg-primary-400 transition-colors duration-200
                     flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span>Add Permission</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.id}
               className="bg-primary-50/30 backdrop-blur-sm rounded-lg p-4
                        border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10
                          flex items-center justify-center text-primary-300">
                <i className={category.icon}></i>
              </div>
              <div>
                <h3 className="font-medium text-white">{category.name}</h3>
                <p className="text-sm text-blue-200">
                  {filteredPermissions.filter(p => p.category === category.id).length} permissions
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-blue-200">Permission</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Category</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Used By Roles</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Status</th>
                <th className="text-right p-4 text-sm font-medium text-blue-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPermissions.map((permission) => (
                <tr key={permission.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{permission.name}</span>
                      <span className="text-sm text-blue-200">{permission.description}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full
                                 bg-primary-300/20 text-primary-300">
                      {categories.find(c => c.id === permission.category)?.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {getRolesByPermission(permission.name).map(role => (
                        <span key={role}
                              className="px-2 py-1 text-xs font-medium rounded-full
                                     bg-blue-500/20 text-blue-400">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${permission.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'}`}>
                      {permission.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => {
                          setSelectedPermission(permission);
                          setNewPermission(permission);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-blue-200 hover:text-white
                               hover:bg-white/10 rounded-lg
                               transition-all duration-200">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => {
                          const updatedPermissions = permissions.map(p =>
                            p.id === permission.id ? { ...p, isActive: !p.isActive } : p
                          );
                          setPermissions(updatedPermissions);
                        }}
                        className="p-2 text-blue-200 hover:text-white
                               hover:bg-white/10 rounded-lg
                               transition-all duration-200">
                        <i className={`fas fa-${permission.isActive ? 'ban' : 'check'}`}></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Updated styling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary-50/95 rounded-lg p-6 w-full max-w-md
                       border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedPermission ? 'Edit Permission' : 'Add New Permission'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Permission Name
                </label>
                <input
                  type="text"
                  value={newPermission.name}
                  onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                             rounded-md bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white
                             focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newPermission.description}
                  onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                             rounded-md bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white
                             focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newPermission.category}
                  onChange={(e) => setNewPermission({ ...newPermission, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                             rounded-md bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white
                             focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}
                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newPermission.isActive}
                  onChange={(e) => setNewPermission({ ...newPermission, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                           bg-gray-100 dark:bg-gray-700 rounded-md 
                           hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                           rounded-md hover:bg-blue-700"
                >
                  {selectedPermission ? 'Update Permission' : 'Create Permission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Permissions;