import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../component/Redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CartPage() {
  // mengambil data state setelah addItemToCart
  // Data dari redux bukan dari db
  // data di db (carts) sudah terkait dengan user (userId) jadi bisa di panggil menggunakan
  // axios get (/users/{user.id}?_embed=carts)
  const cartItems = useSelector((state) => state.cart);
  const [totalHarga, setTotalHarga] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  useEffect(() => {
    const total = Object.values(cartItems).reduce(
      (acc, product) => acc + product.harga * product.qty,
      0,
    );
    setTotalHarga(total);
    getProduct();
  }, [cartItems]);

  const getProduct = async () => {
    // Ambil data dari db carts
    try {
      let response = await axios.get('/productDetails?_embed=carts');
      setAllProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  let number = 0;
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
            {/* panggil axios.get (carts embed productDetiail) */}

            {allProducts?.map((product) => {
              // kombinasi data productDetails dan carts
              return product.carts?.map((cart) => {
                if (cart.userId !== user.id) return;
                return (
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
                          handleRemoveItem(product.productDetailId);
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
            to={'/admin/checkout'}
            className='p-1 mt-3 text-center border border-black rounded hover:bg-black hover:text-white'
          >
            <button type='button' disabled={cartItems.length === 0}>
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
