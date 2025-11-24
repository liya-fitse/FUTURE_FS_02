import { create } from 'zustand';

const useStore = create((set, get) => ({
  products: [
    { id: 1, name: 'Smartphone X10', price: 499, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&q=80', category: 'Electronics' },
    { id: 2, name: 'Bluetooth Speaker Mini', price: 79, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop&q=80', category: 'Electronics' },
    { id: 3, name: "Men's Hoodie", price: 45, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop&q=80', category: 'Clothing' },
    { id: 4, name: "Women's Summer Dress", price: 39, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop&q=80', category: 'Clothing' },
    { id: 5, name: 'Aloe Vera Face Cream', price: 18, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&q=80', category: 'Beauty' },
    { id: 6, name: 'Coco Chanel Perfume', price: 89, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop&q=80', category: 'Beauty' },
    { id: 7, name: 'LED Table Lamp', price: 29, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop&q=80', category: 'Home' },
    { id: 8, name: 'Ceramic Coffee Mug Set', price: 22, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&q=80', category: 'Home' },
    { id: 9, name: 'Wireless Keyboard & Mouse Combo', price: 45, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&q=80', category: 'Tech Accessories' },
    { id: 10, name: 'Power Bank 10000mAh', price: 30, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop&q=80', category: 'Tech Accessories' },
    { id: 11, name: 'Premium Coffee Beans', price: 15, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&q=80', category: 'Food' },
    { id: 12, name: 'Dark Chocolate Bar', price: 8, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop&q=80', category: 'Food' },
  ],
  cart: [],
  searchTerm: '',
  selectedCategory: '',
  user: null,
  orders: [],
  notification: null,
  
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    const newState = existing
      ? {
          cart: state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
      : { cart: [...state.cart, { ...product, quantity: 1 }] };
    
    return {
      ...newState,
      notification: `${product.name} added to cart!`
    };
  }),
  
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    cart: quantity > 0 
      ? state.cart.map(item => item.id === id ? { ...item, quantity } : item)
      : state.cart.filter(item => item.id !== id)
  })),
  
  clearCart: () => set({ cart: [] }),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  getFilteredProducts: () => {
    const { products, searchTerm, selectedCategory } = get();
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },
  
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  login: (userData) => set({ user: userData }),
  
  logout: () => set({ user: null }),
  
  addOrder: (orderData) => set((state) => ({
    orders: [...state.orders, {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: [...state.cart],
      total: state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      ...orderData
    }]
  })),
  
  clearNotification: () => set({ notification: null })
}));

export default useStore;