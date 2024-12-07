import { create } from 'zustand';
import { 
 initialPermissions, 
  initialRoles, 
  initialUsers 
} from '../utils/mockData';

const useStore = create((set) => ({
  users: initialUsers,
  roles: initialRoles,
  permissions: initialPermissions,
  
  // User actions
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    )
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  
  // Role actions
  addRole: (role) => set((state) => ({ 
    roles: [...state.roles, role] 
  })),
  updateRole: (id, updates) => set((state) => ({
    roles: state.roles.map(role => 
      role.id === id ? { ...role, ...updates } : role
    )
  })),
  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter(role => role.id !== id)
  })),
  
  // Permission actions
  setPermissions: (permissions) => set({ permissions }),
}));

export default useStore;
