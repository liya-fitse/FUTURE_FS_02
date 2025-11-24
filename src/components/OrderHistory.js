import useStore from '../store';

const OrderHistory = ({ setCurrentPage }) => {
  const { user, orders } = useStore();

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Login</h2>
        <button
          onClick={() => setCurrentPage('login')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <button
          onClick={() => setCurrentPage('products')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F8F9FA'}}>
      <div className="container mx-auto p-4 py-12">
        <button
          onClick={() => setCurrentPage('products')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-green-600 transition-colors font-medium"
        >
          ← Back
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8" style={{color: '#212529'}}>Order History</h2>
      
          <div className="space-y-8">
        {orders.map(order => (
            <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">{order.date}</p>
                <p className="font-bold">${order.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;