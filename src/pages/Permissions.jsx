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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Permissions Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configure and manage system permissions
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                         rounded-lg bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-plus"></i>
            <span>Add Permission</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg 
                      border border-gray-200 dark:border-gray-700 
                      shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 
                            text-blue-600 dark:text-blue-300 
                            flex items-center justify-center">
                <i className={category.icon}></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredPermissions.filter(p => p.category === category.id).length} permissions
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                    border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium 
                             text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Permission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Used By Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPermissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {permission.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 
                                      rounded-full text-xs font-medium
                                      ${categoryColors[permission.category]?.bg || categoryColors.general.bg}
                                      ${categoryColors[permission.category]?.text || categoryColors.general.text}
                                      transition-colors duration-200`}>
                      {categories.find(c => c.id === permission.category)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {getRolesByPermission(permission.name).map(role => {
                        const colors = getRoleColors(role);
                        return (
                          <span
                            key={role}
                            className={`inline-flex items-center px-2 py-0.5 
                                       rounded-full text-xs font-medium
                                       ${colors.bg} ${colors.text} ${colors.border}
                                       transition-colors duration-200`}
                          >
                            {role}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${permission.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'}`}>
                      {permission.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPermission(permission);
                        setNewPermission(permission);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => {
                        const updatedPermissions = permissions.map(p =>
                          p.id === permission.id ? { ...p, isActive: !p.isActive } : p
                        );
                        setPermissions(updatedPermissions);
                      }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <i className={`fas fa-${permission.isActive ? 'ban' : 'check'}`}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
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
  )
}

export default Permissions;