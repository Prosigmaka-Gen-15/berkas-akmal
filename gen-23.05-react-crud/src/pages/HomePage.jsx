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
      // let response = await axios.get('https://fakestoreapi.com/products');
      let response = await axios.get('/productsDetail');
      setUsers(response.data);
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      alert('Database ' + e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
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
                  id={product.id}
                  namaProduk={product.namaItem}
                  hargaOri={product.originalPrice}
                  hargaDiskon={product.discountPrice}
                  src={product.imagePath}
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
