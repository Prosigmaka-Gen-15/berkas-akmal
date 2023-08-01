// import React from 'react';
import Product from '../component/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      let response = await axios.get('https://fakestoreapi.com/products');
      // let response = await axios.get(' http://localhost:3000/products');
      setUsers(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <main>
        <div className='' id='productContainer'>
          <section id='productList' className='flex flex-wrap justify-center gap-1'>
            {loading ? (
              <div className='text-3xl'>Loading . . .</div>
            ) : (
              users.map((product) => (
                <Product
                  key={product.id}
                  namaProduk={product.title}
                  hargaProduk={product.price}
                  src={product.image}
                />
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
