import { useState } from 'react';
import useStore from '../store';

const Checkout = ({ setCurrentPage }) => {
  const { cart, getCartTotal, clearCart, addOrder } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addOrder({ customerInfo: formData });
      alert('Order placed successfully!');
      clearCart();
      setCurrentPage('products');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F8F9FA'}}>
      <div className="container mx-auto p-4 max-w-2xl py-12">
        <button
          onClick={() => setCurrentPage('cart')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-green-600 transition-colors font-medium"
        >
          ← Back
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8" style={{color: '#212529'}}>Checkout</h2>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2 font-bold">
          Total: ${getCartTotal().toFixed(2)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.zipCode ? 'border-red-500' : ''}`}
            />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{color: '#212529'}}>Payment Method</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-2">💳</div>
                <div className="font-medium">Credit Card</div>
              </div>
            </label>
            
            <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-2">🅿️</div>
                <div className="font-medium">PayPal</div>
              </div>
            </label>
            
            <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'apple' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="apple"
                checked={formData.paymentMethod === 'apple'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-2">🍎</div>
                <div className="font-medium">Apple Pay</div>
              </div>
            </label>
            
            <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'google' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="google"
                checked={formData.paymentMethod === 'google'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium">Google Pay</div>
              </div>
            </label>
          </div>
        </div>

        {formData.paymentMethod === 'card' && (
          <>
            <div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : ''}`}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
            </div>
          </>
        )}

        {formData.paymentMethod !== 'card' && (
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <div className="text-4xl mb-4">
              {formData.paymentMethod === 'paypal' && '🅿️'}
              {formData.paymentMethod === 'apple' && '🍎'}
              {formData.paymentMethod === 'google' && '🔍'}
            </div>
            <p className="text-blue-800 font-medium">
              You will be redirected to {formData.paymentMethod === 'paypal' ? 'PayPal' : formData.paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your payment.
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : ''}`}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : ''}`}
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage('cart')}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;