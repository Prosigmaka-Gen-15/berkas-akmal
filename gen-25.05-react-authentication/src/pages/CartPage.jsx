import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../component/Redux/slices/cartSlice';
// import { useState } from 'react';

export default function CartPage() {
  // useState untuk ukuran dan jumlah barang
  // const [sizeInCart, setSizeInCart] = useState();
  // const [qtyInCart, setQtyInCart] = useState();
  // mengambil data state setelah addItemToCart
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };
  return (
    <div className='CartPageContainer'>
      <div className='flex justify-center CartTitle'>
        <span className='my-1 text-xl font-semibold TitlePage'>Cart List</span>
      </div>
      <div className='flex justify-center'>
        <table>
          <thead>
            <tr>
              <th className='borderBlack'>Nama Barang</th>
              <th className='borderBlack'>Harga Barang</th>
              <th className='borderBlack'>Ukuran Barang</th>
              <th className='borderBlack'>Jumlah Barang</th>
              <th className='borderBlack'>Sub Total</th>
              <th className='borderBlack'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartItems).map((arr, index) => {
              const product = cartItems[arr];
              return (
                <tr key={index}>
                  <td className='borderBlack'>{product.nama}</td>
                  <td className='text-center borderBlack'>
                    {product.harga?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </td>
                  <td className='text-center borderBlack'>{product.size}</td>
                  <td className='text-center borderBlack'>{product.qty}</td>
                  <td className='text-center borderBlack'>
                    {(product.harga * product.qty)?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </td>
                  <td className='text-center borderBlack'>
                    <button
                      className='p-1 m-1 borderBlack'
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
      </div>
    </div>
  );
}
