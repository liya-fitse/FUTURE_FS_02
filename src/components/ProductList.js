import useStore from '../store';

const ProductList = () => {
  const { searchTerm, selectedCategory, setSearchTerm, setSelectedCategory, addToCart, getFilteredProducts } = useStore();
  const products = getFilteredProducts();

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, #dbeafe 0%, #f0f9ff 50%, #fef3c7 100%)'}}>
      {/* Hero Section */}
      <div className="text-white py-12" style={{background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)'}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">✨ Discover Amazing Products</h2>
          <p className="text-xl" style={{color: '#fef3c7'}}>Find everything you need in one place</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-8 rounded-xl shadow-lg p-6" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)', border: '2px solid #e0e7ff'}}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 border-2 rounded-lg focus:outline-none transition-colors text-lg" style={{borderColor: '#c7d2fe', backgroundColor: '#f8fafc'}} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#c7d2fe'}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-4 border-2 rounded-lg focus:outline-none transition-colors text-lg" style={{borderColor: '#c7d2fe', backgroundColor: '#f8fafc'}} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#c7d2fe'}
            >
              <option value="">🏷️ All Categories</option>
              <option value="Electronics">📱 Electronics</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Beauty">💄 Beauty</option>
              <option value="Home">🏠 Home</option>
              <option value="Tech Accessories">💻 Tech Accessories</option>
              <option value="Food">🍽️ Food</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(product => (
            <div key={product.id} className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e0e7ff'}}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: 'rgba(254, 243, 199, 0.9)', color: '#1e40af'}}>
                  {product.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors" style={{color: '#212529'}}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold" style={{color: '#1e40af'}}>${product.price}</span>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full text-white py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}} onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)'} onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold mb-2" style={{color: '#212529'}}>No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;