import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../component/Redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CartPage() {
  // useState untuk ukuran dan jumlah barang
  // const [sizeInCart, setSizeInCart] = useState();
  // const [qtyInCart, setQtyInCart] = useState();

  // mengambil data state setelah addItemToCart
  const [totalHarga, setTotalHarga] = useState(0);
  const cartItems = useSelector((state) => state.cart);
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
  }, [cartItems]);
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
            {Object.keys(cartItems).map((arr, index) => {
              const product = cartItems[arr];
              return (
                <tr key={index} className='tableBodyCart'>
                  <td className='text-center '>{index + 1}</td>
                  <td>{product.nama}</td>
                  <td>
                    {product.harga?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </td>
                  <td className='text-center '>{product.size}</td>
                  <td className='text-center '>{product.qty}</td>
                  <td>
                    {(product.harga * product.qty)?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </td>
                  <td className='text-center '>
                    <button
                      className='p-1 m-1 text-white bg-red-700 rounded hover:bg-red-400 '
                      onClick={() => {
                        handleRemoveItem(product.id);
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
            to={'/admin/checkout'}
            className='p-1 mt-3 text-center rounded border border-black hover:bg-black hover:text-white'
          >
            <button type='button'>Checkout</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
