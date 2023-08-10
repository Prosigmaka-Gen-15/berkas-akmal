// import React from 'react';
import Product from '../component/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      axios
        .get('/productsDetail')
        // .get('/660/productsDetail')
        .then((res) => setProducts(res.data))
        .catch((err) => {
          alert('User harus login');
          console.log(err.data);
        });
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
    getProducts();
  }, []);
  return (
    <div>
      <main>
        <div className='' id='productContainer'>
          <section id='productList' className='flex flex-wrap justify-center gap-1'>
            {loading ? (
              <div className='text-3xl'>Loading . . .</div>
            ) : (
              products.map((product) => (
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
