import {
  ArrowDownIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Total Revenue', stat: '$71,897', icon: CurrencyDollarIcon, change: '12%', changeType: 'increase' },
  { id: 2, name: 'Total Users', stat: '58,160', icon: UserGroupIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Total Orders', stat: '24,570', icon: ShoppingCartIcon, change: '3.2%', changeType: 'decrease' },
  { id: 4, name: 'Conversion Rate', stat: '24.57%', icon: ChartBarIcon, change: '4.2%', changeType: 'increase' },
]

const recentOrders = [
  { id: 1, customer: 'Lindsay Walton', email: 'lindsay.walton@example.com', amount: '$120.00', status: 'Delivered', date: '2024-01-15' },
  { id: 2, customer: 'Courtney Henry', email: 'courtney.henry@example.com', amount: '$590.00', status: 'Processing', date: '2024-01-14' },
  { id: 3, customer: 'Tom Cook', email: 'tom.cook@example.com', amount: '$225.00', status: 'Shipped', date: '2024-01-14' },
  { id: 4, customer: 'Whitney Francis', email: 'whitney.francis@example.com', amount: '$710.00', status: 'Delivered', date: '2024-01-13' },
  { id: 5, customer: 'Leonard Krasner', email: 'leonard.krasner@example.com', amount: '$142.00', status: 'Processing', date: '2024-01-13' },
]

const topProducts = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', sales: 1234, revenue: '$148,080' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', sales: 891, revenue: '$133,650' },
  { id: 3, name: 'Running Shoes', category: 'Sports', sales: 754, revenue: '$60,320' },
  { id: 4, name: 'Yoga Mat', category: 'Sports', sales: 612, revenue: '$18,360' },
  { id: 5, name: 'Coffee Maker', category: 'Home', sales: 421, revenue: '$42,100' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's an overview of your business.</p>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Orders</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest customer orders from your store.</p>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{order.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={classNames(
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800',
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Top Products</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Best performing products by revenue.</p>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{product.sales}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
