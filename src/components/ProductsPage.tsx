import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Product {
  id: number
  name: string
  category: string
  price: string
  stock: number
  status: 'active' | 'inactive'
  image: string
}

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$120.00', stock: 45, status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: '$150.00', stock: 32, status: 'active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
  { id: 3, name: 'Running Shoes', category: 'Sports', price: '$80.00', stock: 0, status: 'inactive', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  { id: 4, name: 'Yoga Mat', category: 'Sports', price: '$30.00', stock: 100, status: 'active', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200' },
  { id: 5, name: 'Coffee Maker', category: 'Home', price: '$100.00', stock: 15, status: 'active', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200' },
  { id: 6, name: 'Desk Lamp', category: 'Home', price: '$45.00', stock: 60, status: 'active', image: 'https://images.unsplash.com/photo-1565636192335-e91b9983d806?w=200' },
  { id: 7, name: 'Backpack', category: 'Accessories', price: '$65.00', stock: 25, status: 'active', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200' },
  { id: 8, name: 'Water Bottle', category: 'Sports', price: '$25.00', stock: 80, status: 'active', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: 0,
    status: 'active' as 'active' | 'inactive',
  })

  const categories = ['All', 'Electronics', 'Sports', 'Home', 'Accessories']

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.replace('$', ''),
      stock: product.stock,
      status: product.status,
    })
    setShowAddModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProduct) {
      setProducts(products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              price: `$${formData.price}`,
              stock: formData.stock,
              status: formData.status,
            }
          : p
      ))
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: formData.name,
        category: formData.category,
        price: `$${formData.price}`,
        stock: formData.stock,
        status: formData.status,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      }
      setProducts([...products, newProduct])
    }
    
    setShowAddModal(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Electronics',
      price: '',
      stock: 0,
      status: 'active',
    })
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product inventory</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null)
              setFormData({
                name: '',
                category: 'Electronics',
                price: '',
                stock: 0,
                status: 'active',
              })
              setShowAddModal(true)
            }}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            Add Product
          </button>
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
            placeholder="Search products..."
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={classNames(
                category === selectedCategory
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50',
                'rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="aspect-w-3 aspect-h-2">
              <img className="h-48 w-full object-cover" src={product.image} alt={product.name} />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{product.price}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Stock: </span>
                  <span className={classNames(
                    product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600',
                    'ml-1 text-sm font-medium'
                  )}>
                    {product.stock}
                  </span>
                </div>
                <span
                  className={classNames(
                    product.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  )}
                >
                  {product.status}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon className="inline-block h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  <TrashIcon className="inline-block h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
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
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Electronics</option>
                        <option>Sports</option>
                        <option>Home</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        required
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        type="number"
                        id="stock"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    {editingProduct ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingProduct(null)
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
    </div>
  )
}