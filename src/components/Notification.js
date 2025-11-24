import { useEffect, useState } from 'react';
import useStore from '../store';

const Notification = () => {
  const { notification, clearNotification } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => clearNotification(), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="text-white px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm" style={{backgroundColor: '#2563eb', border: '2px solid #1d4ed8'}}>
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-bounce">✅</div>
          <div>
            <p className="font-bold text-lg">{notification}</p>
            <p className="text-blue-100 text-sm">Item added successfully!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;