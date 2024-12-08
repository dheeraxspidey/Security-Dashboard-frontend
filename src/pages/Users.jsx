import { useState } from 'react';
import useStore from '../hooks/useStore';
import FormInput from '../components/common/FormInput';
import FormSelect from '../components/common/FormSelect';
import RoleTag from '../components/RoleTag';

function Users() {
  const { users, roles, addUser, updateUser, deleteUser } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Basic User',
    isActive: true,
    department: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser(selectedUser.id, newUser);
    } else {
      addUser({ 
        ...newUser, 
        id: Date.now(),
        lastLogin: new Date().toISOString()
      });
    }
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'Basic User',
      isActive: true,
      department: '',
      location: ''
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1920px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-blue-200">Manage system users and their roles</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-primary-300 text-white rounded-lg
                   hover:bg-primary-400 transition-colors duration-200
                   flex items-center justify-center gap-2"
        >
          <i className="fas fa-user-plus"></i>
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-primary-50/30 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-blue-200">Name</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Email</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Role</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Status</th>
                <th className="text-left p-4 text-sm font-medium text-blue-200">Last Login</th>
                <th className="text-right p-4 text-sm font-medium text-blue-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-4">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                  </td>
                  <td className="p-4 text-sm text-blue-200">{user.email}</td>
                  <td className="p-4"><RoleTag role={user.role} /></td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${user.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-blue-200">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setNewUser(user);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-blue-200 hover:text-white
                               hover:bg-white/10 rounded-lg
                               transition-all duration-200"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-red-400 hover:text-red-300
                               hover:bg-white/10 rounded-lg
                               transition-all duration-200"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary-50/95 rounded-lg p-6 w-full max-w-md
                       border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter user name"
                required
              />
              
              <FormInput
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
              
              <FormSelect
                label="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                options={roles.map(role => ({
                  value: role.name,
                  label: role.name
                }))}
              />
              
              <FormSelect
                label="Status"
                value={newUser.isActive}
                onChange={(e) => setNewUser({ ...newUser, isActive: e.target.value === 'true' })}
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' }
                ]}
              />

              <FormInput
                label="Department"
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                placeholder="Enter department"
              />

              <FormInput
                label="Location"
                value={newUser.location}
                onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                placeholder="Enter location"
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-blue-200
                           bg-white/10 rounded-lg hover:bg-white/20
                           transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white
                           bg-primary-300 rounded-lg hover:bg-primary-400
                           transition-all duration-200"
                >
                  {selectedUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;