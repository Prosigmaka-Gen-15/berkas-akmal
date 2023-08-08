import { useSelector } from 'react-redux';

export default function ChartPage() {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className='ChartPageContainer'>
      <div className='flex justify-center ChartTitle'>
        <span className='my-1 text-xl font-semibold TitlePage'>Chart List</span>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
            </tr>
            <tr>
              {cartItems.map((product, index) => {
                <td key={index}>
                  <span>{product.id}</span>
                </td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
