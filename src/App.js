import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/product')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="App">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2> - ${product.price}
            <p>{product.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
