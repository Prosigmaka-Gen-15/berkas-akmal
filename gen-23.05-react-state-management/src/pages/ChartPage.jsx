import { useSelector } from 'react-redux';

export default function ChartPage() {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className='ChartPageContainer'>
      <div className='flex justify-center ChartTitle'>
        <span className='my-1 text-xl font-semibold TitlePage'>Chart List</span>
      </div>
      <div className='flex justify-center'>
        <table className='border border-black border-solid'>
          <thead>
            <tr>
              <th className='border border-black border-solid'>Nama Barang</th>
              <th className='border border-black border-solid'>Harga Barang</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartItems).map((arr, index) => {
              const product = cartItems[arr];
              // console.log(product);
              return (
                <tr key={index}>
                  <td className='border border-black border-solid'>{product.value.nama}</td>
                  <td className='text-center border border-black border-solid'>
                    {product.value.harga}
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
