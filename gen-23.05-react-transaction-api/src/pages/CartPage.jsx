import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
/**
 * Note:
 * 1. ingin menambahkan edit ukuran dan jumlah barang
 */
export default function CartPage() {
  const [allProducts, setAllProducts] = useState([]);
  // const [editedCart, setEditedCart] = useState(null);
  // const [buttonStatus, setButtonStatus] = useState(true);
  const user = useSelector((state) => state.auth.user);

  const handleRemoveItem = (itemId) => {
    if (confirm('Apa anda yakin?')) {
      axios.delete('keranjangs/' + itemId);
      window.location.reload();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    // ambil data dari db carts
    try {
      let response = await axios.get('keranjangs?_expand=productDetail&userId=' + user.id);
      setAllProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  let number = 0;
  let totalHarga = 0;
  // const handleEditCart = (cart) => {
  //   setEditedCart(cart);
  // };
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
            {allProducts?.map((keranjang) => {
              // kombinasi data productDetails dan carts
              totalHarga += keranjang.subTotal;
              return (
                // 1. ingin simpan hasil perulangan ke redux agar lebih mudah di akses di checkoutPage
                <tr key={keranjang.id} className='tableBodyCart'>
                  <td>{++number}</td>
                  <td>{keranjang.productDetail.namaItem}</td>
                  <td>
                    {keranjang.productDetail.discountPrice?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </td>
                  <td className='text-center '>{keranjang.size}</td>
                  <td className='text-center '>{keranjang.qty}</td>
                  <td>
                    {keranjang.subTotal?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </td>
                  <td className='text-center '>
                    {/* <button
                      onClick={() => setButtonStatus((buttonStatus) => !buttonStatus)}
                      type='button'
                      className='p-1 m-1 text-white bg-red-700 rounded hover:bg-red-400 '
                    >
                      {buttonStatus ? 'edit' : 'update'}
                    </button>
                    || */}
                    <button
                      className='p-1 m-1 text-white bg-red-700 rounded hover:bg-red-400 '
                      onClick={() => {
                        handleRemoveItem(keranjang.id);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
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
