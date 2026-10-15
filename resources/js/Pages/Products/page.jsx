import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'A5 Wagyu Beef Ribeye', category: 'Meats', price: 145.00, stock: 12, unit: 'per kg', description: 'Miyazaki A5 marbled beef with extraordinary tenderness and rich umami.' },
  { id: 2, name: 'Saffron Threads (Super Negin)', category: 'Spices', price: 42.50, stock: 25, unit: 'per gram', description: 'Grade 1 Persian saffron threads offering deep crimson hue and potent aroma.' },
  { id: 3, name: 'White Truffle Oil (Extra Virgin)', category: 'Oils & Condiments', price: 38.00, stock: 18, unit: '250ml bottle', description: 'Cold-pressed Italian olive oil infused with authentic Alba white truffles.' },
  { id: 4, name: 'Organic Madagascar Vanilla Beans', category: 'Spices', price: 19.99, stock: 40, unit: 'pack of 5', description: 'Plump, oily Grade-A Bourbon vanilla beans packed with fragrant seeds.' },
  { id: 5, name: 'Wild Catch Pacific Salmon', category: 'Seafood', price: 28.50, stock: 15, unit: 'per kg', description: 'Freshly harvested Alaskan wild salmon fillet rich in Omega-3 fatty acids.' },
  { id: 6, name: 'Artisan Aged Parmigiano Reggiano', category: 'Dairy', price: 24.00, stock: 30, unit: '500g block', description: 'D.O.P. certified 36-month aged Italian hard cheese with crystalline texture.' },
];

export default function ProductsPage({ products = INITIAL_PRODUCTS }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);

  // Recipe Cost Estimator State
  const [calculatorList, setCalculatorList] = useState([]);

  const categories = ['All', 'Meats', 'Spices', 'Oils & Condiments', 'Seafood', 'Dairy'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                            item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesPrice = item.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, selectedCategory, maxPrice, products]);

  const addToCalculator = (product) => {
    setCalculatorList((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCalculatorList((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalEstimate = calculatorList.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <Head title="Pantry Ingredients Brochure" />

      {/* Header Navigation */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
              ✨
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-wide text-amber-200">AURUM PANTRY</h1>
              <p className="text-xs text-neutral-400">Gourmet Ingredient Brochure & Estimator</p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-sm transition-all shadow-md shadow-amber-500/10"
          >
            Go to Admin Dashboard →
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800/80 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Artisan Catalog
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-100">
            Explore Premium Pantry Ingredients & Pricing
          </h2>
          <p className="text-neutral-400 text-base max-w-2xl mx-auto">
            Search our curated selection of fine culinary ingredients, view live inventory levels, and estimate your dish preparation costs in real-time.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters & Calculator */}
        <aside className="space-y-6 lg:col-span-1">
          {/* Search Box */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-amber-300 text-sm tracking-wide uppercase">Search & Filter</h3>
            
            <div>
              <label className="text-xs text-neutral-400 mb-1 block">Search Ingredient</label>
              <input
                type="text"
                placeholder="e.g. Saffron, Wagyu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs text-neutral-400 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-xs transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-neutral-950 font-semibold'
                        : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Max Price:</span>
                <span className="text-amber-400 font-semibold">${maxPrice}.00</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Recipe Cost Calculator Drawer */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-amber-300 text-sm tracking-wide uppercase">Dish Cost Estimator</h3>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                {calculatorList.length} items
              </span>
            </div>

            {calculatorList.length === 0 ? (
              <p className="text-xs text-neutral-500 italic text-center py-4">
                Click "+ Add to Estimate" on any ingredient to calculate recipe cost.
              </p>
            ) : (
              <div className="space-y-3">
                {calculatorList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs border-b border-neutral-800 pb-2">
                    <div>
                      <p className="font-medium text-neutral-200">{item.name}</p>
                      <p className="text-neutral-500">${item.price.toFixed(2)} / unit</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center font-bold text-neutral-300"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-semibold text-amber-200">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center font-bold text-neutral-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-neutral-700 flex justify-between items-center">
                  <span className="text-xs text-neutral-400 font-medium">Estimated Cost:</span>
                  <span className="text-lg font-serif font-bold text-amber-300">${totalEstimate.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Ingredients Grid */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <p className="text-xs text-neutral-400">
              Showing <span className="text-neutral-200 font-semibold">{filteredProducts.length}</span> ingredients
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-neutral-900/50 rounded-xl border border-neutral-800">
              <p className="text-neutral-400 text-sm">No ingredients match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-xl p-5 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {item.category}
                        </span>
                        <h4 className="text-lg font-serif font-bold text-neutral-100 group-hover:text-amber-200 transition-colors mt-2">
                          {item.name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-serif font-bold text-amber-300">${item.price.toFixed(2)}</span>
                        <p className="text-[11px] text-neutral-400">{item.unit}</p>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">
                      In Stock: <strong className="text-neutral-200">{item.stock}</strong>
                    </span>
                    <button
                      onClick={() => addToCalculator(item)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 text-xs font-medium transition-all"
                    >
                      + Add to Estimate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}