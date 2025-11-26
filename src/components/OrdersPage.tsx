import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon } from '@heroicons/react/24/outline'

interface Order {
  id: string
  customer: string
  email: string
  date: string
  total: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
  paymentMethod: string
  shippingAddress: string
}

const initialOrders: Order[] = [
  { 
    id: '#ORD-001', 
    customer: 'Lindsay Walton', 
    email: 'lindsay.walton@example.com', 
    date: '2024-01-15', 
    total: '$120.00', 
    status: 'delivered', 
    items: 3,
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  { 
    id: '#ORD-002', 
    customer: 'Courtney Henry', 
    email: 'courtney.henry@example.com', 
    date: '2024-01-14', 
    total: '$590.00', 
    status: 'processing', 
    items: 5,
    paymentMethod: 'PayPal',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001'
  },
  { 
    id: '#ORD-003', 
    customer: 'Tom Cook', 
    email: 'tom.cook@example.com', 
    date: '2024-01-14', 
    total: '$225.00', 
    status: 'shipped', 
    items: 2,
    paymentMethod: 'Credit Card',
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  { 
    id: '#ORD-004', 
    customer: 'Whitney Francis', 
    email: 'whitney.francis@example.com', 
    date: '2024-01-13', 
    total: '$710.00', 
    status: 'delivered', 
    items: 4,
    paymentMethod: 'Debit Card',
    shippingAddress: '321 Elm St, Houston, TX 77001'
  },
  { 
    id: '#ORD-005', 
    customer: 'Leonard Krasner', 
    email: 'leonard.krasner@example.com', 
    date: '2024-01-13', 
    total: '$142.00', 
    status: 'pending', 
    items: 1,
    paymentMethod: 'Credit Card',
    shippingAddress: '654 Maple Dr, Phoenix, AZ 85001'
  },
  { 
    id: '#ORD-006', 
    customer: 'Floyd Miles', 
    email: 'floyd.miles@example.com', 
    date: '2024-01-12', 
    total: '$350.00', 
    status: 'cancelled', 
    items: 3,
    paymentMethod: 'PayPal',
    shippingAddress: '987 Cedar Ln, Philadelphia, PA 19101'
  },
  { 
    id: '#ORD-007', 
    customer: 'Emily Selman', 
    email: 'emily.selman@example.com', 
    date: '2024-01-12', 
    total: '$875.00', 
    status: 'processing', 
    items: 6,
    paymentMethod: 'Credit Card',
    shippingAddress: '159 Birch Rd, San Antonio, TX 78201'
  },
  { 
    id: '#ORD-008', 
    customer: 'Kristin Watson', 
    email: 'kristin.watson@example.com', 
    date: '2024-01-11', 
    total: '$425.00', 
    status: 'shipped', 
    items: 3,
    paymentMethod: 'Debit Card',
    shippingAddress: '753 Willow Way, San Diego, CA 92101'
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const statuses = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowDetails(true)
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and track customer orders</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.total}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Pending</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-yellow-600">{stats.pending}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Processing</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-blue-600">{stats.processing}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Shipped</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-indigo-600">{stats.shipped}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Delivered</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">{stats.delivered}</dd>
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
            placeholder="Search orders by ID, customer, or email..."
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Payment
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {order.items} items
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {order.total}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className={classNames(
                      getStatusColor(order.status),
                      'rounded-full px-2 text-xs font-semibold leading-5 border-0 focus:ring-2 focus:ring-indigo-500'
                    )}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {order.paymentMethod}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDetails(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div>
                <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                  Order Details - {selectedOrder.id}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.customer}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order Date</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment Method</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <span className={classNames(
                        getStatusColor(selectedOrder.status),
                        'mt-1 inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                      )}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-500">Total Items</p>
                      <p className="text-sm text-gray-900">{selectedOrder.items}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-base font-medium text-gray-900">Order Total</p>
                      <p className="text-base font-medium text-gray-900">{selectedOrder.total}</p>
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