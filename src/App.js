import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import OrderHistory from './components/OrderHistory';
import Notification from './components/Notification';

function App() {
  const [currentPage, setCurrentPage] = useState('products');

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <Checkout setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'orders':
        return <OrderHistory setCurrentPage={setCurrentPage} />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Notification />
    </div>
  );
}

export default App;