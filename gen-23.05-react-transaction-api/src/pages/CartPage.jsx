import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart);
  const [allProducts, setAllProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleRemoveItem = (itemId) => {
    if (confirm('Apa anda yakin?')) {
      axios.delete('carts/' + itemId);
      window.location.reload();
    }
  };

  useEffect(() => {
    getProduct();
  }, [cartItems]);

  const getProduct = async () => {
    // ambil data dari db carts
    try {
      let response = await axios.get('/productDetails?_embed=carts');
      setAllProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  let number = 0;
  let totalHarga = 0;

  return (
    <main className='CartPageContainer'>
      <div className='flex justify-center CartTitle'>
        <span className='my-1 text-xl font-semibold TitlePage'>Cart List</span>
      </div>
      <div className='flex justify-center pt-3'>
        <table>
          <thead>
            <tr className='tableHeadCart'>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Harga Barang</th>
              <th>Ukuran Barang</th>
              <th>Jumlah Barang</th>
              <th>Sub Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map((product) => {
              // kombinasi data productDetails dan carts
              return product.carts?.map((cart) => {
                if (cart.userId !== user.id) return;
                totalHarga += cart.subTotal;
                return (
                  // 1. ingin simpan hasil perulangan ke redux agar lebih mudah di akses di checkoutPage
                  <tr key={cart.id} className='tableBodyCart'>
                    <td>{++number}</td>
                    <td>{product.namaItem}</td>
                    <td>
                      {product.discountPrice?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </td>
                    <td className='text-center '>{cart.size}</td>
                    <td className='text-center '>{cart.qty}</td>
                    <td>
                      {cart.subTotal?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </td>
                    <td className='text-center '>
                      <button
                        className='p-1 m-1 text-white bg-red-700 rounded hover:bg-red-400 '
                        onClick={() => {
                          handleRemoveItem(cart.id);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <div className='flex flex-col ml-3 blockTotalHarga'>
          <table>
            <thead>
              <tr className='tableHeadCart'>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tableBodyCart'>
                <td>
                  {totalHarga?.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </td>
              </tr>
            </tbody>
          </table>
          <Link
            to={'/admin/checkout/' + number}
            className='mt-3 text-center border border-black rounded hover:bg-black hover:text-white'
          >
            <button className='p-1' type='button' disabled={number < 1}>
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
