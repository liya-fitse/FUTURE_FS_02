import { useState } from 'react';
import useStore from '../store';

const Login = ({ setCurrentPage }) => {
  const { login, user } = useStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login({ email: formData.email, name: formData.email.split('@')[0] });
      setCurrentPage('products');
    }
  };

  if (user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
        <button
          onClick={() => setCurrentPage('products')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F8F9FA'}}>
      <div className="container mx-auto p-4 max-w-md py-12">
        <button
          onClick={() => setCurrentPage('products')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          ← Back
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{color: '#212529'}}>
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full text-white py-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg" style={{backgroundColor: '#2563eb'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>
          
          <p className="text-center mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="ml-2 hover:underline" style={{color: '#2563eb'}}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;