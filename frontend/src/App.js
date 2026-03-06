import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Login from './Login';
import Contact from './Contact';

const products = [
  { id: 1, name: "Wireless Headphones", price: 99.99, emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 199.99, emoji: "⌚" },
  { id: 3, name: "Laptop Bag", price: 49.99, emoji: "💼" },
  { id: 4, name: "Bluetooth Speaker", price: 79.99, emoji: "🔊" },
  { id: 5, name: "Phone Case", price: 19.99, emoji: "📱" },
  { id: 6, name: "USB Hub", price: 34.99, emoji: "🖥️" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place an order!');
      setShowLogin(true);
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/order', {
        userEmail: user.email,
        items: cart,
        total: totalPrice,
      });
      alert('Order placed successfully! 🎉');
      setCart([]);
      setShowCart(false);
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <header className="header">
        <h1>🛍️ My Store</h1>
        <nav>
          <button className="nav-link-btn">Home</button>
          <button className="nav-link-btn">Products</button>
          <button className="contact-nav-btn" onClick={() => setShowContact(true)}>Contact</button>
          {user ? (
            <>
              <span className="user-name">👤 {user.name}</span>
              <button className="login-nav-btn" onClick={() => setUser(null)}>Logout</button>
            </>
          ) : (
            <button className="login-nav-btn" onClick={() => setShowLogin(true)}>Login</button>
          )}
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </nav>
      </header>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(userData) => {
            setUser(userData);
            setShowLogin(false);
          }}
        />
      )}
      {showContact && <Contact onClose={() => setShowContact(false)} />}

      {showCart && (
        <div className="cart-panel">
          <h2>Your Cart 🛒</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <span>{item.emoji} {item.name}</span>
                  <span>x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)}>❌</button>
                </div>
              ))}
              <div className="cart-total">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </>
          )}
        </div>
      )}

      <main className="hero">
        <h2>Welcome to My Store</h2>
        <p>Find the best products at the best prices!</p>
        <button>Shop Now</button>
      </main>

      <section className="products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-emoji">{product.emoji}</div>
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart 🛒</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 My Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;