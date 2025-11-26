import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Manager' | 'Customer' | 'Support'
  status: 'Active' | 'Inactive'
  joinDate: string
  lastActive: string
  avatar: string
  phone: string
  totalOrders: number
  totalSpent: string
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-05-15',
    lastActive: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=256',
    phone: '+1 555-0101',
    totalOrders: 45,
    totalSpent: '$5,420.00'
  },
  {
    id: 2,
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Customer',
    status: 'Active',
    joinDate: '2023-06-20',
    lastActive: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256',
    phone: '+1 555-0102',
    totalOrders: 23,
    totalSpent: '$2,890.00'
  },
  {
    id: 3,
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Manager',
    status: 'Active',
    joinDate: '2023-04-10',
    lastActive: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256',
    phone: '+1 555-0103',
    totalOrders: 0,
    totalSpent: '$0.00'
  },
  {
    id: 4,
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    role: 'Customer',
    status: 'Inactive',
    joinDate: '2023-07-01',
    lastActive: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=256',
    phone: '+1 555-0104',
    totalOrders: 67,
    totalSpent: '$8,710.00'
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    role: 'Support',
    status: 'Active',
    joinDate: '2023-08-15',
    lastActive: '3 hours ago',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=256',
    phone: '+1 555-0105',
    totalOrders: 0,
    totalSpent: '$0.00'
  },
  {
    id: 6,
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    role: 'Customer',
    status: 'Active',
    joinDate: '2023-09-02',
    lastActive: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=256',
    phone: '+1 555-0106',
    totalOrders: 12,
    totalSpent: '$1,350.00'
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Customer' as User['role'],
    status: 'Active' as User['status'],
    phone: '',
  })

  const roles = ['All', 'Admin', 'Manager', 'Customer', 'Support']

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'All' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
    })
    setShowAddModal(true)
  }

  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setShowDetails(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingUser) {
      setUsers(users.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              status: formData.status,
              phone: formData.phone,
            }
          : u
      ))
    } else {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        phone: formData.phone,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'Just now',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256',
        totalOrders: 0,
        totalSpent: '$0.00',
      }
      setUsers([...users, newUser])
    }
    
    setShowAddModal(false)
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      role: 'Customer',
      status: 'Active',
      phone: '',
    })
  }

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800'
      case 'Manager':
        return 'bg-blue-100 text-blue-800'
      case 'Customer':
        return 'bg-green-100 text-green-800'
      case 'Support':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    admins: users.filter(u => u.role === 'Admin').length,
    customers: users.filter(u => u.role === 'Customer').length,
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage user accounts and permissions</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setEditingUser(null)
              setFormData({
                name: '',
                email: '',
                role: 'Customer',
                status: 'Active',
                phone: '',
              })
              setShowAddModal(true)
            }}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            Add User
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Users</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.total}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Active Users</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">{stats.active}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Admins</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-purple-600">{stats.admins}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Customers</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-blue-600">{stats.customers}</dd>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search users..."
          />
        </div>
        <div className="flex gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={classNames(
                role === selectedRole
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50',
                'rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300'
              )}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Orders
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={classNames(
                    getRoleColor(user.role),
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  )}>
                    {user.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={classNames(
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  )}>
                    {user.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.joinDate}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.lastActive}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {user.totalOrders}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    {editingUser ? 'Edit User' : 'Add New User'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Customer">Customer</option>
                        <option value="Support">Support</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    {editingUser ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingUser(null)
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDetails && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDetails(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div className="flex items-center mb-4">
                  <img className="h-20 w-20 rounded-full" src={selectedUser.avatar} alt={selectedUser.name} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Role</p>
                      <span className={classNames(
                        getRoleColor(selectedUser.role),
                        'mt-1 inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                      )}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Status</p>
                      <span className={classNames(
                        selectedUser.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800',
                        'mt-1 inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                      )}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Joined</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Last Active</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.lastActive}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Total Orders</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{selectedUser.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Total Spent</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{selectedUser.totalSpent}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}