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
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0, limit: 5 });

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

  // Sidebar props
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

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    return filteredUsers.slice(start, start + pagination.limit);
  }, [filteredUsers, pagination.page, pagination.limit]);

  const totalPages = Math.ceil(filteredUsers.length / pagination.limit);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Blue background */}
      <aside className="w-64 bg-[#4361EE] flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
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
        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.screen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                item.active
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xl opacity-90">{item.icon}</span>
              <span className="font-medium text-[15px]">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigateTo(Screen.ADMIN_SETTINGS)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white/20">
              {user?.profile?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user?.profile?.fullName || 'Admin User'}
              </p>
              <p className="text-white/60 text-xs text-blue-200">View Profile</p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 tracking-tight">Roles & Permissions</h1>
            <p className="text-gray-500 mt-1">
              Manage team access and Role-Based Access Control (RBAC)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toast('Audit Log feature coming soon!', { icon: '📋' })}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              <span className="text-lg">📋</span>
              <span>Audit Log</span>
            </button>
            <button
              onClick={() => setShowCreateRoleModal(true)}
              className="px-5 py-2.5 bg-[#4361EE] text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 font-medium shadow-md shadow-blue-200"
            >
              <span className="text-lg">+</span>
              <span>Create New Role</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-[#4361EE]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-8">
            {/* Left Panel: Admin Users */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Admin Users</h2>
                <div className="relative">
                  <svg
                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
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
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent transition-shadow outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <p className="text-gray-500 font-medium">No admin users found</p>
                          <p className="text-gray-400 text-sm mt-1">
                            Try adjusting your search query
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((adminUser) => (
                        <tr key={adminUser.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${getAvatarColor(adminUser.fullName || adminUser.email)}`}
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
                                <p className="text-sm font-semibold text-gray-900">
                                  {adminUser.fullName || 'Unknown'}
                                </p>
                                <p className="text-xs text-gray-500 font-medium">
                                  {adminUser.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {adminUser.roles.length > 0 ? (
                              <span
                                className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeStyle(adminUser.roles[0].name)}`}
                              >
                                {adminUser.roles[0].name}
                              </span>
                            ) : (
                              <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                                No role
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                            {formatTimeAgo(adminUser.lastLoginAt)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => {
                                setEditingUser(adminUser);
                                setShowEditUserModal(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit role"
                            >
                              <svg
                                className="w-5 h-5"
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
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-xl">
                <span className="text-sm text-gray-500 font-medium">
                  Showing {paginatedUsers.length} of {filteredUsers.length} admins
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white font-medium text-gray-600 transition-all shadow-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                    disabled={pagination.page >= totalPages}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white font-medium text-gray-600 transition-all shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Role Configuration */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-8rem)] sticky top-8">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Role Configuration</h2>

                {/* Role Selector */}
                <div className="relative">
                  <select
                    value={selectedRoleId || ''}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer outline-none hover:bg-blue-100 transition-colors"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="w-4 h-4 text-blue-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {selectedRole && (
                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                  {/* Role Summary Box */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-100 shrink-0">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        {selectedRole.name}
                        {!selectedRole.isSystem && (
                          <button
                            onClick={() => setShowEditRoleNameModal(true)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
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
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mt-1">
                        {selectedRole.description || 'No description available for this role.'}
                      </p>
                      <p className="text-xs font-semibold text-blue-600 mt-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        {selectedRole.userCount} {selectedRole.userCount === 1 ? 'user' : 'users'}{' '}
                        assigned
                      </p>
                    </div>
                  </div>

                  {/* Permissions List */}
                  <div className="space-y-8">
                    {Object.entries(groupedPermissions).map(([category, perms]) => (
                      <div key={category}>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                          {category}
                        </h4>
                        <div className="space-y-4">
                          {perms.map((perm) => (
                            <label
                              key={perm.id}
                              className="flex items-start gap-3 cursor-pointer group select-none"
                            >
                              <div
                                className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                                  selectedPermissionIds.has(perm.id)
                                    ? 'bg-[#4361EE] border-[#4361EE]'
                                    : 'border-gray-300 bg-white group-hover:border-[#4361EE]'
                                }`}
                              >
                                {selectedPermissionIds.has(perm.id) && (
                                  <svg
                                    className="w-3.5 h-3.5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedPermissionIds.has(perm.id)}
                                onChange={() => handleTogglePermission(perm.id)}
                              />
                              <div className="flex-1">
                                <p
                                  className={`text-sm font-bold transition-colors ${
                                    selectedPermissionIds.has(perm.id)
                                      ? 'text-gray-900'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {perm.name}
                                </p>
                                {perm.description && (
                                  <p className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-500 transition-colors">
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
                </div>
              )}

              {/* Actions */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/30 rounded-b-xl">
                <button
                  onClick={handleResetPermissions}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={handleSavePermissions}
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#4361EE] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold shadow-md shadow-blue-100 transition-all active:scale-95"
                >
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals remain same structure but refined styling */}
      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Create New Role</h3>
            </div>
            <form onSubmit={handleCreateRole} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role Name</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g., Content Manager"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent outline-none transition-all placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  placeholder="What can this role do?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateRoleModal(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4361EE] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleNameModal && selectedRole && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Edit Role</h3>
            </div>
            <form onSubmit={handleUpdateRoleName} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role Name</label>
                <input
                  type="text"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editRoleDescription}
                  onChange={(e) => setEditRoleDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#4361EE] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditRoleNameModal(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4361EE] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Change User Role</h3>
              <p className="text-sm text-gray-500 mt-1">{editingUser.fullName}</p>
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-gray-700 mb-4">Select a new role:</p>
              <div className="space-y-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleAssignRole(editingUser.id, role.id)}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-200 group ${
                      editingUser.roles[0]?.id === role.id
                        ? 'border-[#4361EE] bg-blue-50 ring-1 ring-[#4361EE]'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold ${editingUser.roles[0]?.id === role.id ? 'text-[#4361EE]' : 'text-gray-900'}`}
                      >
                        {role.name}
                      </span>
                      {editingUser.roles[0]?.id === role.id && (
                        <svg
                          className="w-5 h-5 text-[#4361EE]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                <button
                  onClick={() => {
                    setShowEditUserModal(false);
                    setEditingUser(null);
                  }}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
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
