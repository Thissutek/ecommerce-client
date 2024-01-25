import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

//Components
import RegistrationForm from './components/Registration/Registration';
import LoginForm from './components/UserLogin/UserLogin';




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
            <h3>{product.name}</h3> - ${product.price}
          </li>
        ))}
      </ul>


      <div>
        <RegistrationForm />
      </div>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
