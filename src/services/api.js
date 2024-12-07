import { initialUsers, initialRoles, initialPermissions } from '../utils/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Users
  async getUsers() {
    await delay(800);
    return initialUsers;
  },

  async createUser(userData) {
    await delay(500);
    return { ...userData, id: Date.now() };
  },

  async updateUser(id, userData) {
    await delay(500);
    return { ...userData, id };
  },

  async deleteUser(id) {
    await delay(500);
    return { success: true };
  },

  // Roles
  async getRoles() {
    await delay(800);
    return initialRoles;
  },

  async createRole(roleData) {
    await delay(500);
    return { ...roleData, id: Date.now() };
  },

  // Permissions
  async getPermissions() {
    await delay(800);
    return initialPermissions;
  },

  // Activity Logs
  async getActivityLogs() {
    await delay(800);
    return [
      {
        id: 1,
        user: 'John Doe',
        action: 'Modified user permissions',
        timestamp: new Date(),
        type: 'security'
      },
      // Add more activity logs as needed
    ];
  }
};