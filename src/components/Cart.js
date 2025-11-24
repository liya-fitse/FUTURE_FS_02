import useStore from '../store';

const Cart = ({ setCurrentPage }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#F8F9FA'}}>
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md mx-4">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="text-white px-8 py-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg" style={{backgroundColor: '#2563eb'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            🛍️ Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F8F9FA'}}>
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentPage('products')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          ← Back
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="text-white p-6" style={{backgroundColor: '#2563eb'}}>
            <h2 className="text-3xl font-bold">🛒 Shopping Cart</h2>
            <p className="text-blue-100 mt-2">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-8">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-8 p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{color: '#212529'}}>{item.name}</h3>
                    <p className="text-lg" style={{color: '#6c757d'}}>${item.price} each</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" style={{color: '#2563eb'}}>${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold" style={{color: '#212529'}}>Total:</span>
                <span className="text-4xl font-bold" style={{color: '#2563eb'}}>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex gap-6">
                <button
                  onClick={() => setCurrentPage('products')}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-lg font-bold transition-colors"
                >
                  ← Continue Shopping
                </button>
                <button
                  onClick={() => setCurrentPage('checkout')}
                  className="flex-1 text-white py-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg" style={{backgroundColor: '#2563eb'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  💳 Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;