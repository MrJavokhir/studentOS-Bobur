import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, NavigationProps } from '../types';
import { useAuth } from '../src/contexts/AuthContext';
import { adminApi } from '../src/services/api';
import toast from 'react-hot-toast';

// Types
interface Permission {
  id: string;
  slug: string;
  name: string;
  category: string;
  description?: string;
}

interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  userCount: number;
  permissions: Permission[];
}

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLoginAt?: string;
  roles: { id: string; name: string }[];
}

function AdminRoles({ navigateTo }: NavigationProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data states
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<Record<string, Permission[]>>({});
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 });

  // UI states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAuditLogModal, setShowAuditLogModal] = useState(false);
  const [showEditRoleNameModal, setShowEditRoleNameModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // Form states
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [editRoleName, setEditRoleName] = useState('');
  const [editRoleDescription, setEditRoleDescription] = useState('');

  // Get selected role
  const selectedRole = useMemo(
    () => roles.find((r) => r.id === selectedRoleId),
    [roles, selectedRoleId]
  );

  // Filter users by search
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return adminUsers;
    const q = searchQuery.toLowerCase();
    return adminUsers.filter(
      (u) => u.email.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q)
    );
  }, [adminUsers, searchQuery]);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  // Update selected permissions when role changes
  useEffect(() => {
    if (selectedRole) {
      setSelectedPermissionIds(new Set(selectedRole.permissions.map((p) => p.id)));
      setEditRoleName(selectedRole.name);
      setEditRoleDescription(selectedRole.description || '');
    }
  }, [selectedRole]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permsRes, usersRes] = await Promise.all([
        adminApi.getRoles(),
        adminApi.getPermissions(),
        adminApi.getAdminUsers({ limit: 100 }),
      ]);

      if (rolesRes.data) {
        setRoles(rolesRes.data);
        if (rolesRes.data.length > 0 && !selectedRoleId) {
          setSelectedRoleId(rolesRes.data[0].id);
        }
      }
      if (permsRes.data) {
        setPermissions(permsRes.data.permissions);
        setGroupedPermissions(permsRes.data.grouped);
      }
      if (usersRes.data) {
        setAdminUsers(usersRes.data.users);
        setPagination(usersRes.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      if (next.has(permissionId)) {
        next.delete(permissionId);
      } else {
        next.add(permissionId);
      }
      return next;
    });
  };

  const handleSavePermissions = async () => {
    if (!selectedRoleId) return;

    setSaving(true);
    try {
      const result = await adminApi.updateRolePermissions(
        selectedRoleId,
        Array.from(selectedPermissionIds)
      );

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Permissions updated successfully');
        await fetchData(); // Refresh data
      }
    } catch (error) {
      toast.error('Failed to save permissions');
    } finally {
      setSaving(false);
    }
  };

  const handleResetPermissions = () => {
    if (selectedRole) {
      setSelectedPermissionIds(new Set(selectedRole.permissions.map((p) => p.id)));
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) {
      toast.error('Role name is required');
      return;
    }

    try {
      const result = await adminApi.createRole({
        name: newRoleName.trim(),
        description: newRoleDescription.trim() || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Role created successfully');
        setNewRoleName('');
        setNewRoleDescription('');
        setShowCreateRoleModal(false);
        await fetchData();
        if (result.data?.id) {
          setSelectedRoleId(result.data.id);
        }
      }
    } catch (error) {
      toast.error('Failed to create role');
    }
  };

  const handleUpdateRoleName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleId || !editRoleName.trim()) return;

    try {
      const result = await adminApi.updateRole(selectedRoleId, {
        name: editRoleName.trim(),
        description: editRoleDescription.trim() || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Role updated successfully');
        setShowEditRoleNameModal(false);
        await fetchData();
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleAssignRole = async (userId: string, roleId: string) => {
    try {
      const result = await adminApi.assignUserRole(userId, roleId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Role assigned successfully');
        setShowEditUserModal(false);
        setEditingUser(null);
        await fetchData();
      }
    } catch (error) {
      toast.error('Failed to assign role');
    }
  };

  const handleOpenEditUser = (adminUser: AdminUser) => {
    setEditingUser(adminUser);
    setShowEditUserModal(true);
  };

  const handleShowAuditLog = () => {
    // For now, show a placeholder toast
    toast('Audit Log feature coming soon!', { icon: '📋' });
  };

  // Time formatter
  const formatTimeAgo = (date?: string) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Sidebar navigation items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', screen: Screen.ADMIN_DASHBOARD },
    { id: 'employers', label: 'Employers', icon: '🏢', screen: Screen.ADMIN_EMPLOYERS },
    { id: 'pricing', label: 'Pricing', icon: '💳', screen: Screen.ADMIN_PRICING },
    { id: 'users', label: 'Users', icon: '👥', screen: Screen.ADMIN_USERS },
    { id: 'scholarships', label: 'Scholarships', icon: '🎓', screen: Screen.ADMIN_SCHOLARSHIPS },
    { id: 'blog', label: 'Blog Management', icon: '📝', screen: Screen.ADMIN_BLOG },
    {
      id: 'roles',
      label: 'Roles & Permissions',
      icon: '🔐',
      screen: Screen.ADMIN_ROLES,
      active: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        bg-gradient-to-b from-blue-600 to-blue-800 dark:from-slate-800 dark:to-slate-900
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        flex flex-col
      `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🎓</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">StudentOS</h1>
              <p className="text-white/60 text-xs">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.screen)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  item.active
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigateTo(Screen.ADMIN_SETTINGS)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.profile?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="text-left flex-1">
              <p className="text-white font-medium text-sm">{user?.profile?.fullName || 'Admin'}</p>
              <p className="text-white/60 text-xs">Profile Settings</p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <span>🚪</span>
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Roles & Permissions
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Manage team access and Role-Based Access Control (RBAC)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShowAuditLog}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <span>📋</span>
                <span>Audit Log</span>
              </button>
              <button
                onClick={() => setShowCreateRoleModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span>+</span>
                <span>Create New Role</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel: Admin Users */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Admin Users
                    </h2>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search admins..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                          >
                            {searchQuery ? 'No users match your search' : 'No admin users found'}
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((adminUser) => (
                          <tr
                            key={adminUser.id}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                  {adminUser.fullName?.charAt(0) ||
                                    adminUser.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {adminUser.fullName}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {adminUser.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {adminUser.roles.length > 0 ? (
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                    adminUser.roles[0].name === 'Super Admin'
                                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  }`}
                                >
                                  {adminUser.roles[0].name}
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400">No role</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                              {formatTimeAgo(adminUser.lastLoginAt)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleOpenEditUser(adminUser)}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors"
                                title="Edit role"
                              >
                                <svg
                                  className="w-4 h-4 text-slate-500 dark:text-slate-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Showing {filteredUsers.length} of {pagination.total} admins
                  </span>
                </div>
              </div>

              {/* Right Panel: Role Configuration */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Role Configuration
                    </h2>

                    {/* Role Selector */}
                    <select
                      value={selectedRoleId || ''}
                      onChange={(e) => setSelectedRoleId(e.target.value)}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Role Info */}
                  {selectedRole && (
                    <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🔐</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {selectedRole.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {selectedRole.description || 'No description'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {selectedRole.userCount} user{selectedRole.userCount !== 1 ? 's' : ''}{' '}
                            assigned
                          </p>
                        </div>
                      </div>
                      {!selectedRole.isSystem && (
                        <button
                          onClick={() => setShowEditRoleNameModal(true)}
                          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                        >
                          Edit Name
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Permissions List */}
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  {Object.entries(groupedPermissions).map(([category, perms]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {perms.map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPermissionIds.has(perm.id)}
                              onChange={() => handleTogglePermission(perm.id)}
                              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {perm.name}
                              </p>
                              {perm.description && (
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {perm.description}
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
                  <button
                    onClick={handleResetPermissions}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSavePermissions}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {saving && (
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    )}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Create New Role
              </h3>
            </div>
            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g., Content Manager"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  placeholder="What can this role do?"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateRoleModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Role Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Change User Role
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {editingUser.fullName} ({editingUser.email})
              </p>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Select a new role for this user:
              </p>
              <div className="space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleAssignRole(editingUser.id, role.id)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      editingUser.roles[0]?.id === role.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <p className="font-medium text-slate-900 dark:text-white">{role.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{role.description}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button
                  onClick={() => {
                    setShowEditUserModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Name Modal */}
      {showEditRoleNameModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Edit Role</h3>
            </div>
            <form onSubmit={handleUpdateRoleName} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editRoleDescription}
                  onChange={(e) => setEditRoleDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditRoleNameModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoles;
