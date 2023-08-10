import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../component/Redux/slices/cartSlice';

export default function CartPage() {
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
        <table className='border border-black border-solid'>
          <thead>
            <tr>
              <th className='border border-black border-solid'>Nama Barang</th>
              <th className='border border-black border-solid'>Harga Barang</th>
              <th className='border border-black border-solid'>Jumlah Barang</th>
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
                  <td className='text-center border border-black border-solid'>jumlahTemp</td>
                  <td className='text-center border border-black border-solid'>
                    <button
                      className='p-1 m-1 border border-black border-solid'
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
