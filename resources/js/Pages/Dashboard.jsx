import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'A5 Wagyu Beef Ribeye', category: 'Meats', price: 145.00, stock: 12, unit: 'per kg' },
  { id: 2, name: 'Saffron Threads (Super Negin)', category: 'Spices', price: 42.50, stock: 25, unit: 'per gram' },
  { id: 3, name: 'White Truffle Oil (Extra Virgin)', category: 'Oils & Condiments', price: 38.00, stock: 18, unit: '250ml bottle' },
  { id: 4, name: 'Organic Madagascar Vanilla Beans', category: 'Spices', price: 19.99, stock: 40, unit: 'pack of 5' },
  { id: 5, name: 'Wild Catch Pacific Salmon', category: 'Seafood', price: 28.50, stock: 15, unit: 'per kg' },
];

export default function Dashboard({ productsList = INITIAL_PRODUCTS }) {
  const [products, setProducts] = useState(productsList);

  // Form State for Adding New Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'Spices',
    price: '',
    stock: '',
    unit: 'per kg',
    description: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;

    const newEntry = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      unit: formData.unit,
      description: formData.description || 'Fresh inventory addition.',
    };

    setProducts([newEntry, ...products]);
    setFormData({ name: '', category: 'Spices', price: '', stock: '', unit: 'per kg', description: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const totalInventoryValue = products.reduce((acc, item) => acc + item.price * item.stock, 0);
  const totalStockCount = products.reduce((acc, item) => acc + item.stock, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <Head title="Products Inventory Dashboard" />

      {/* Top Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-bold text-amber-200">AURUM ADMIN</h1>
            <p className="text-xs text-neutral-400">Product & Inventory Management</p>
          </div>

          <Link
            href="/products"
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium border border-neutral-700 transition-all"
          >
            ← View Brochure Catalog
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
            <p className="text-xs text-neutral-400">Total Unique Items</p>
            <p className="text-2xl font-serif font-bold text-amber-300 mt-1">{products.length}</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
            <p className="text-xs text-neutral-400">Total Stock Quantity</p>
            <p className="text-2xl font-serif font-bold text-amber-300 mt-1">{totalStockCount} units</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
            <p className="text-xs text-neutral-400">Total Inventory Value</p>
            <p className="text-2xl font-serif font-bold text-amber-300 mt-1">${totalInventoryValue.toFixed(2)}</p>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-200">Add New Ingredient</h3>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Ingredient Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Saffron Threads"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Meats">Meats</option>
                    <option value="Spices">Spices</option>
                    <option value="Oils & Condiments">Oils & Condiments</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="per kg"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25.00"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Stock Qty</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="10"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Description</label>
                <textarea
                  name="description"
                  rows="2"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short description..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all"
              >
                + Add Ingredient
              </button>
            </form>
          </div>

          {/* Product Inventory Table */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-amber-200">Current Inventory</h3>
              <span className="text-xs text-neutral-400">{products.length} Items Listed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="px-4 py-3">Ingredient</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {products.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-neutral-100">{item.name}</td>
                      <td className="px-4 py-3 text-neutral-400">{item.category}</td>
                      <td className="px-4 py-3 text-amber-300 font-semibold">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.stock > 10
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {item.stock} in stock
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}