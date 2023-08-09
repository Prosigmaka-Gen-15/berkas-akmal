import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../component/Chart/slices/cartSlice';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };
  return (
    <div className='CartPageContainer'>
      <div className='flex justify-center ChartTitle'>
        <span className='my-1 text-xl font-semibold TitlePage'>Chart List</span>
      </div>
      <div className='flex justify-center'>
        <table className='border border-black border-solid'>
          <thead>
            <tr>
              <th className='border border-black border-solid'>Nama Barang</th>
              <th className='border border-black border-solid'>Harga Barang</th>
              <th className='border border-black border-solid'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartItems).map((arr, index) => {
              const product = cartItems[arr];
              console.log(product);
              return (
                <tr key={index}>
                  <td className='border border-black border-solid'>{product.nama}</td>
                  <td className='text-center border border-black border-solid'>{product.harga}</td>
                  <td className='text-center border border-black border-solid'>
                    <button
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
