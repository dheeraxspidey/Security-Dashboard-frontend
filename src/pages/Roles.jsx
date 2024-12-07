import { useState } from 'react';
import useStore from '../hooks/useStore';

function Roles() {
  const { roles, permissions, addRole, updateRole, deleteRole } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      updateRole(selectedRole.id, newRole);
    } else {
      addRole({ ...newRole, id: Date.now() });
    }
    setIsModalOpen(false);
    setNewRole({ name: '', description: '', permissions: [] });
    setSelectedRole(null);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setNewRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Roles Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configure and manage user roles
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add Role</span>
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div 
            key={role.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                      border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {role.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {role.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-gray-400 hover:text-blue-600 dark:text-gray-500 
                              dark:hover:text-blue-400 transition-colors"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-gray-400 hover:text-red-600 dark:text-gray-500 
                              dark:hover:text-red-400 transition-colors"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permissions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 
                                text-blue-800 dark:text-blue-200 
                                text-xs rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedRole ? 'Edit Role' : 'Add New Role'}
              </h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRole(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 
                          transition-colors duration-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 
                    bg-white dark:bg-gray-700 
                    border border-gray-300 dark:border-gray-600 
                    text-gray-900 dark:text-white 
                    rounded-md 
                    placeholder-gray-400 dark:placeholder-gray-400
                    focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="w-full px-3 py-2 
                    bg-white dark:bg-gray-700 
                    border border-gray-300 dark:border-gray-600 
                    text-gray-900 dark:text-white 
                    rounded-md 
                    placeholder-gray-400 dark:placeholder-gray-400
                    focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newRole.permissions.includes(permission.name)}
                        onChange={(e) => {
                          const updatedPermissions = e.target.checked
                            ? [...newRole.permissions, permission.name]
                            : newRole.permissions.filter((p) => p !== permission.name);
                          setNewRole({ ...newRole, permissions: updatedPermissions });
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {permission.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedRole(null);
                    setNewRole({ name: '', description: '', permissions: [] });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {selectedRole ? 'Update Role' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;