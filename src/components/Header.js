import useStore from '../store';

const Header = ({ setCurrentPage }) => {
  const { cart, user, logout } = useStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="text-white shadow-lg" style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'}}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold cursor-pointer hover:text-yellow-300 transition-colors" onClick={() => setCurrentPage('products')}>
              🛍️ ShopHub
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentPage('products')}
              className="hover:text-green-600 transition-colors font-medium"
            >
              Products
            </button>
            {user && (
              <button 
                onClick={() => setCurrentPage('orders')}
                className="hover:text-green-600 transition-colors font-medium"
              >
                My Orders
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-100">👋 {user.name}</span>
                <button 
                  onClick={logout}
                  className="text-blue-900 px-4 py-2 rounded-lg transition-all duration-200 font-medium" style={{backgroundColor: '#fbbf24'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'} onMouseLeave={(e) => e.target.style.backgroundColor = '#fbbf24'}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                className="text-blue-900 px-4 py-2 rounded-lg transition-all duration-200 font-medium" style={{backgroundColor: '#fbbf24'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'} onMouseLeave={(e) => e.target.style.backgroundColor = '#fbbf24'}
              >
                Login
              </button>
            )}
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative text-blue-900 px-4 py-2 rounded-lg transition-all duration-200 font-bold shadow-lg" style={{backgroundColor: '#fde047'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#facc15'} onMouseLeave={(e) => e.target.style.backgroundColor = '#fde047'}
            >
              🛒 Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;