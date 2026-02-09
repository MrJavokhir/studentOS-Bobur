import React, { useState, useEffect, useMemo } from 'react';
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

// Role badge colors
const getRoleBadgeStyle = (roleName: string) => {
  const styles: Record<string, string> = {
    'Super Admin': 'bg-purple-100 text-purple-700 border border-purple-200',
    'Employer Admin': 'bg-blue-100 text-blue-700 border border-blue-200',
    'Content Editor': 'bg-green-100 text-green-700 border border-green-200',
    'Support Lead': 'bg-pink-100 text-pink-700 border border-pink-200',
    Support: 'bg-pink-100 text-pink-700 border border-pink-200',
    Viewer: 'bg-gray-100 text-gray-600 border border-gray-200',
  };
  return styles[roleName] || 'bg-gray-100 text-gray-600 border border-gray-200';
};

// Avatar colors
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

function AdminRoles({ navigateTo }: NavigationProps) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Data states
  const [roles, setRoles] = useState<Role[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<Record<string, Permission[]>>({});
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0, limit: 4 });

  // UI states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
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
        setGroupedPermissions(permsRes.data.grouped);
      }
      if (usersRes.data) {
        setAdminUsers(usersRes.data.users);
        setPagination((prev) => ({ ...prev, total: usersRes.data.pagination.total }));
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
      navigateTo(Screen.SIGN_IN);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
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
        await fetchData();
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

  const formatTimeAgo = (date?: string) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Sidebar menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', screen: Screen.ADMIN_DASHBOARD },
    { id: 'employers', label: 'Employers', icon: '🏢', screen: Screen.ADMIN_EMPLOYERS },
    { id: 'pricing', label: 'Pricing', icon: '💳', screen: Screen.ADMIN_PRICING },
    { id: 'users', label: 'Users', icon: '👥', screen: Screen.ADMIN_USERS },
    {
      id: 'roles',
      label: 'Roles & Permissions',
      icon: '🔐',
      screen: Screen.ADMIN_ROLES,
      active: true,
    },
    { id: 'settings', label: 'Settings', icon: '⚙️', screen: Screen.ADMIN_SETTINGS },
  ];

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    return filteredUsers.slice(start, start + pagination.limit);
  }, [filteredUsers, pagination.page, pagination.limit]);

  const totalPages = Math.ceil(filteredUsers.length / pagination.limit);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Blue background */}
      <aside className="w-56 bg-[#4361EE] flex flex-col min-h-screen">
        {/* Logo */}
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">StudentOS</h1>
            <p className="text-white/70 text-xs">Admin Console</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.screen)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-left ${
                item.active
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => navigateTo(Screen.ADMIN_SETTINGS)}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden">
              {user?.profile?.avatarUrl ? (
                <img src={user.profile.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.profile?.fullName?.charAt(0) || 'A'
              )}
            </div>
            <div className="text-left flex-1">
              <p className="text-white font-medium text-sm">
                {user?.profile?.fullName || 'Admin User'}
              </p>
              <p className="text-white/60 text-xs">Super Admin</p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 mt-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage team access and Role-Based Access Control (RBAC)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toast('Audit Log feature coming soon!', { icon: '📋' })}
                className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Audit Log
              </button>
              <button
                onClick={() => setShowCreateRoleModal(true)}
                className="px-4 py-2.5 bg-[#4361EE] text-white rounded-lg hover:bg-[#3651DE] transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Create New Role
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4361EE]"></div>
            </div>
          ) : (
            <div className="flex gap-6">
              {/* Left Panel: Admin Users */}
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Header with search */}
                <div className="p-5 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
                  <div className="relative w-64">
                    <svg
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                    <input
                      type="text"
                      placeholder="Search admins..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#4361EE] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-t border-gray-200">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                            {searchQuery ? 'No users match your search' : 'No admin users found'}
                          </td>
                        </tr>
                      ) : (
                        paginatedUsers.map((adminUser) => (
                          <tr
                            key={adminUser.id}
                            className="border-t border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(adminUser.fullName || adminUser.email)}`}
                                >
                                  {adminUser.fullName
                                    ? adminUser.fullName
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .slice(0, 2)
                                        .toUpperCase()
                                    : adminUser.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {adminUser.fullName || 'Unknown'}
                                  </p>
                                  <p className="text-xs text-gray-500">{adminUser.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              {adminUser.roles.length > 0 ? (
                                <span
                                  className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getRoleBadgeStyle(adminUser.roles[0].name)}`}
                                >
                                  {adminUser.roles[0].name}
                                </span>
                              ) : (
                                <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                                  No role
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {formatTimeAgo(adminUser.lastLoginAt)}
                            </td>
                            <td className="px-5 py-4 text-center">
                              <button
                                onClick={() => {
                                  setEditingUser(adminUser);
                                  setShowEditUserModal(true);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                                title="Edit role"
                              >
                                <svg
                                  className="w-4 h-4"
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
                <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-blue-600">
                    Showing {paginatedUsers.length} of {filteredUsers.length} admins
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                      disabled={pagination.page >= totalPages}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Panel: Role Configuration */}
              <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Configuration</h2>

                  {/* Role Selector */}
                  <select
                    value={selectedRoleId || ''}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    aria-label="Select role"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:ring-2 focus:ring-[#4361EE] cursor-pointer"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role Details */}
                {selectedRole && (
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-amber-600">👤</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedRole.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {selectedRole.description || 'No description'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowEditRoleNameModal(true)}
                        className="text-blue-600 text-xs font-medium hover:text-blue-700"
                      >
                        Edit Name
                      </button>
                    </div>
                  </div>
                )}

                {/* Permissions List */}
                <div className="p-5 max-h-[400px] overflow-y-auto space-y-6">
                  {Object.entries(groupedPermissions).map(([category, perms]) => (
                    <div key={category}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {category}
                      </h4>
                      <div className="space-y-3">
                        {perms.map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-start gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPermissionIds.has(perm.id)}
                              onChange={() => handleTogglePermission(perm.id)}
                              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#4361EE] focus:ring-[#4361EE] cursor-pointer"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-[#4361EE]">
                                {perm.name}
                              </p>
                              {perm.description && (
                                <p className="text-xs text-gray-500 mt-0.5">{perm.description}</p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-3">
                  <button
                    onClick={handleResetPermissions}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSavePermissions}
                    disabled={saving}
                    className="px-4 py-2 bg-[#4361EE] text-white rounded-lg hover:bg-[#3651DE] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Role</h3>
            </div>
            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g., Content Manager"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  placeholder="What can this role do?"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateRoleModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4361EE] text-white rounded-lg hover:bg-[#3651DE] transition-colors"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Name Modal */}
      {showEditRoleNameModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Role</h3>
            </div>
            <form onSubmit={handleUpdateRoleName} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editRoleDescription}
                  onChange={(e) => setEditRoleDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditRoleNameModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4361EE] text-white rounded-lg hover:bg-[#3651DE] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Role Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Change User Role</h3>
              <p className="text-sm text-gray-500 mt-1">
                {editingUser.fullName} ({editingUser.email})
              </p>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">Select a new role for this user:</p>
              <div className="space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleAssignRole(editingUser.id, role.id)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      editingUser.roles[0]?.id === role.id
                        ? 'border-[#4361EE] bg-blue-50'
                        : 'border-gray-200 hover:border-[#4361EE]/50'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{role.name}</p>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button
                  onClick={() => {
                    setShowEditUserModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoles;
