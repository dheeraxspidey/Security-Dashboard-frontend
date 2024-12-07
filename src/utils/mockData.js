export const initialPermissions = [
  // Dashboard Permissions
  {
    id: 1,
    name: 'view_dashboard',
    description: 'View main dashboard and analytics',
    category: 'general',
    isActive: true
  },
  {
    id: 2,
    name: 'manage_dashboard',
    description: 'Customize and configure dashboard',
    category: 'general',
    isActive: true
  },

  // User Management
  {
    id: 3,
    name: 'view_users',
    description: 'View user list and profiles',
    category: 'users',
    isActive: true
  },
  {
    id: 4,
    name: 'create_users',
    description: 'Create new user accounts',
    category: 'users',
    isActive: true
  },
  {
    id: 5,
    name: 'edit_users',
    description: 'Edit existing user accounts',
    category: 'users',
    isActive: true
  },
  {
    id: 6,
    name: 'delete_users',
    description: 'Delete user accounts',
    category: 'users',
    isActive: true
  },

  // Role Management
  {
    id: 7,
    name: 'view_roles',
    description: 'View role configurations',
    category: 'admin',
    isActive: true
  },
  {
    id: 8,
    name: 'create_roles',
    description: 'Create new roles',
    category: 'admin',
    isActive: true
  },
  {
    id: 9,
    name: 'edit_roles',
    description: 'Modify existing roles',
    category: 'admin',
    isActive: true
  },
  {
    id: 10,
    name: 'delete_roles',
    description: 'Delete roles from system',
    category: 'admin',
    isActive: true
  },

  // Permission Management
  {
    id: 11,
    name: 'view_permissions',
    description: 'View permission settings',
    category: 'admin',
    isActive: true
  },
  {
    id: 12,
    name: 'manage_permissions',
    description: 'Modify system permissions',
    category: 'admin',
    isActive: true
  },

  // Security Features
  {
    id: 13,
    name: 'view_audit_logs',
    description: 'Access system audit logs',
    category: 'security',
    isActive: true
  },
  {
    id: 14,
    name: 'manage_security',
    description: 'Configure security settings',
    category: 'security',
    isActive: true
  },
  {
    id: 15,
    name: 'manage_api_keys',
    description: 'Generate and manage API keys',
    category: 'security',
    isActive: true
  },

  // Content Management
  {
    id: 16,
    name: 'view_content',
    description: 'View system content',
    category: 'content',
    isActive: true
  },
  {
    id: 17,
    name: 'create_content',
    description: 'Create new content',
    category: 'content',
    isActive: true
  },
  {
    id: 18,
    name: 'edit_content',
    description: 'Modify existing content',
    category: 'content',
    isActive: true
  },
  {
    id: 19,
    name: 'delete_content',
    description: 'Delete system content',
    category: 'content',
    isActive: true
  },

  // System Settings
  {
    id: 20,
    name: 'manage_settings',
    description: 'Configure system settings',
    category: 'admin',
    isActive: true
  }
];

export const initialRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Complete system access with all permissions',
    permissions: initialPermissions.map(p => p.name) // All permissions
  },
  {
    id: 2,
    name: 'System Admin',
    description: 'System administration without security management',
    permissions: [
      'view_dashboard', 'manage_dashboard',
      'view_users', 'create_users', 'edit_users',
      'view_roles', 'create_roles', 'edit_roles',
      'view_permissions',
      'view_audit_logs',
      'view_content', 'create_content', 'edit_content',
      'manage_settings'
    ]
  },
  {
    id: 3,
    name: 'Security Admin',
    description: 'Security and audit management',
    permissions: [
      'view_dashboard',
      'view_users', 'view_roles', 'view_permissions',
      'view_audit_logs', 'manage_security', 'manage_api_keys'
    ]
  },
  {
    id: 4,
    name: 'User Manager',
    description: 'User account management',
    permissions: [
      'view_dashboard',
      'view_users', 'create_users', 'edit_users',
      'view_roles'
    ]
  },
  {
    id: 5,
    name: 'Content Manager',
    description: 'Content management and creation',
    permissions: [
      'view_dashboard',
      'view_content', 'create_content', 'edit_content', 'delete_content'
    ]
  },
  {
    id: 6,
    name: 'Content Editor',
    description: 'Content editing only',
    permissions: [
      'view_dashboard',
      'view_content', 'edit_content'
    ]
  },
  {
    id: 7,
    name: 'Auditor',
    description: 'Read-only access for auditing',
    permissions: [
      'view_dashboard',
      'view_users', 'view_roles', 'view_permissions',
      'view_audit_logs', 'view_content'
    ]
  },
  {
    id: 8,
    name: 'Basic User',
    description: 'Basic system access',
    permissions: [
      'view_dashboard',
      'view_content'
    ]
  }
];

export const initialUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@vrvsecurity.com',
    role: 'Super Admin',
    isActive: true,
    lastLogin: '2024-03-20T10:30:00',
    department: 'IT Administration',
    location: 'HQ'
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.j@vrvsecurity.com',
    role: 'System Admin',
    isActive: true,
    lastLogin: '2024-03-20T09:15:00',
    department: 'IT Operations',
    location: 'HQ'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.c@vrvsecurity.com',
    role: 'Security Admin',
    isActive: true,
    lastLogin: '2024-03-20T08:45:00',
    department: 'Security',
    location: 'Remote'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@vrvsecurity.com',
    role: 'User Manager',
    isActive: true,
    lastLogin: '2024-03-19T17:30:00',
    department: 'HR',
    location: 'Branch Office'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.b@vrvsecurity.com',
    role: 'Content Manager',
    isActive: true,
    lastLogin: '2024-03-20T11:00:00',
    department: 'Marketing',
    location: 'HQ'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa.a@vrvsecurity.com',
    role: 'Content Editor',
    isActive: true,
    lastLogin: '2024-03-20T10:00:00',
    department: 'Marketing',
    location: 'Remote'
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.t@vrvsecurity.com',
    role: 'Auditor',
    isActive: true,
    lastLogin: '2024-03-19T16:45:00',
    department: 'Compliance',
    location: 'HQ'
  },
  {
    id: 8,
    name: 'Jennifer Martinez',
    email: 'jennifer.m@vrvsecurity.com',
    role: 'Basic User',
    isActive: true,
    lastLogin: '2024-03-20T09:30:00',
    department: 'Sales',
    location: 'Branch Office'
  }
];

export const auditLogs = [
  {
    id: 1,
    action: 'USER_LOGIN',
    user: 'john.smith@vrvsecurity.com',
    timestamp: '2024-03-20T10:30:00',
    details: 'Successful login from HQ location'
  },
  {
    id: 2,
    action: 'ROLE_MODIFIED',
    user: 'john.smith@vrvsecurity.com',
    timestamp: '2024-03-20T10:35:00',
    details: 'Updated permissions for Content Editor role'
  },
  {
    id: 3,
    action: 'USER_CREATED',
    user: 'emily.j@vrvsecurity.com',
    timestamp: '2024-03-20T09:15:00',
    details: 'Created new System Admin account'
  },
  {
    id: 4,
    action: 'PERMISSION_ADDED',
    user: 'michael.c@vrvsecurity.com',
    timestamp: '2024-03-20T08:45:00',
    details: 'Added manage_api_keys permission to Security Admin role'
  },
  {
    id: 5,
    action: 'USER_ROLE_CHANGED',
    user: 'sarah.w@vrvsecurity.com',
    timestamp: '2024-03-19T17:30:00',
    details: 'Changed role from Basic User to User Manager'
  },
  {
    id: 6,
    action: 'CONTENT_CREATED',
    user: 'david.b@vrvsecurity.com',
    timestamp: '2024-03-20T11:00:00',
    details: 'Created new marketing content'
  },
  {
    id: 7,
    action: 'AUDIT_REPORT_GENERATED',
    user: 'robert.t@vrvsecurity.com',
    timestamp: '2024-03-19T16:45:00',
    details: 'Generated monthly compliance report'
  }
];

export const categories = [
  { id: 'general', name: 'General', icon: 'fas fa-cube' },
  { id: 'users', name: 'Users', icon: 'fas fa-users' },
  { id: 'content', name: 'Content', icon: 'fas fa-file-alt' },
  { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
  { id: 'admin', name: 'Administration', icon: 'fas fa-cog' }
];

// Then we should delete src/data/mockData.js 