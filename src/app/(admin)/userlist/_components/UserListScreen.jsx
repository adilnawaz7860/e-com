"use client"
import { useState, useEffect, useMemo, useCallback } from 'react';
import UserEditModal from './UserEditModal'
import { 
  Check, 
  X, 
  Trash2, 
  Edit, 
  Plus,
  Search,
  Mail,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import DataTable from 'react-data-table-component';
import { toast } from 'sonner';
import debounce from 'lodash.debounce';
import AdminService from '@/services/adminService';

const UserListScreen = () => {
  // State management
  const [searchInput, setSearchInput] = useState('');
  const [filterText, setFilterText] = useState('');
  const [users, setUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminFilter, setAdminFilter] = useState('all');
  const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [refresh ,setRefresh] = useState(false);

const openEditModal = (user) => {
  setSelectedUser(user);
  setIsEditOpen(true);
};

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setFilterText(searchValue);
    }, 300),
    []
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Filter users based on search and role
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name?.toLowerCase().includes(filterText.toLowerCase()) || 
                          user.email?.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesAdminFilter = adminFilter === 'all' || 
                               (adminFilter === 'admin' && user.isAdmin) || 
                               (adminFilter === 'user' && !user.isAdmin);
      
      return matchesSearch && matchesAdminFilter;
    });
  }, [users, filterText, adminFilter , refresh]);

  // User actions
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setIsDeleting(true);
        await AdminService.deleteUser(id);
        toast.success('User deleted successfully');
        getUsers();
      } catch (err) {
        toast.error(err?.message || 'Failed to delete user');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const createUserHandler = async () => {
    if (window.confirm('Create a new user?')) {
      try {
        setIsCreating(true);
        await AdminService.createUser();
        toast.success('User created successfully');
        getUsers();
      } catch (err) {
        toast.error(err?.message || 'Failed to create user');
      } finally {
        setIsCreating(false);
      }
    }
  };

  // Table columns configuration
  const columns = useMemo(() => [
    {
      name: 'Phone',
      selector: (row) => row.phone ?? "N/A",
      sortable: true,
      width: '250px',
    },
    {
      name: 'NAME',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'EMAIL',
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="flex items-center text-cyan-600 hover:text-cyan-800 hover:underline transition-colors"
        >
          <Mail className="w-4 h-4 mr-2" />
          {row.email}
        </a>
      ),
      sortable: true,
    },
    {
      name: 'ROLE',
      cell: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.isAdmin 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {row.isAdmin ? 'Admin' : 'User'}
        </span>
      ),
    },
 {
  name: 'ACTIONS',
  cell: (row) => (
    <div className="flex space-x-2">
      <button
        onClick={() => openEditModal(row)}
        className="p-2 text-cyan-600 rounded-lg hover:bg-cyan-50 cursor-pointer transition-colors"
        aria-label="Edit user"
      >
        <Edit className="w-5 h-5" />
      </button>
      <button
        onClick={() => deleteHandler(row._id)}
        className={`p-2 text-red-600 cursor-pointer ${isDeleting && "cursor-not-allowed"} rounded-lg hover:bg-red-50 transition-colors`}
        disabled={isDeleting}
        aria-label="Delete user"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  ),
  ignoreRowClick: true,
}

  ], []);

  // Fetch users
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getAllUsers();
      setUsers(res || []);
    } catch (error) {
      toast.error('Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    return () => {
      debouncedSearch.cancel();
    };
  }, [refresh]);

  // Filter component
  const subHeaderComponentMemo = useMemo(() => (
    <div className="p-0.5 bg-gray-50 rounded-lg mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              aria-label="Search users"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins Only</option>
            <option value="user">Users Only</option>
          </select>
        </div>
      </div>

    </div>
  ), [searchInput, adminFilter, handleSearchChange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage all registered users and their permissions
          </p>
        </div>

        <button
          onClick={createUserHandler}
          disabled={isCreating}
          className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create User</span>
        </button>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50]}
          highlightOnHover
          responsive
          striped
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          customStyles={{
            head: {
              style: {
                backgroundColor: '#f8fafc',
              },
            },
            headCells: {
              style: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
                fontWeight: '600',
                color: '#334155',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.025em',
              },
            },
            cells: {
              style: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
              },
            },
            subHeader: {
              style: {
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
              },
            },
          }}
        />
      </div>
      <UserEditModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  user={selectedUser}
  setRefresh={setRefresh}
/>
    </div>
  );
};

export default UserListScreen;