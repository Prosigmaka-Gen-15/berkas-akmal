// import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TransactionHistoryDetailPage() {
  const { transactionId } = useParams();
  const [details, setDetails] = useState([]);
  const [productArr, setProductArr] = useState([]);

  const getTransactionDetails = () => {
    try {
      axios
        .get('/transactions/' + transactionId + '?_embed=transactionDetails')
        .then((res) => {
          setDetails(res.data);
        })
        .catch((err) => console.error(err.message));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const getProductList = async () => {
    const ProductList = await axios.get(
      'transactionDetails?_expand=productDetail&transactionId=' + transactionId,
    );
    // console.log(ProductList.data);
    setProductArr(ProductList.data);
  };
  useEffect(() => {
    getTransactionDetails();
    getProductList();
  }, []);

  return (
    <main>
      <div className='flex flex-col items-center w-screen TransactionHistoryContainer'>
        <div className='flex flex-col justify-center p-1 m-1 text-center'>
          <span className='p-1 m-1 text-xl Title'>Transaction History</span>
        </div>
        {/* Table */}
        <table className='justify-center m-1 w-[90%] text-center'>
          <tbody className='ListProduct w-[100%]'>
            <tr>
              <th>Username</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Reciver Name</th>
              <th>Reciver Address</th>
              <th>Ship Method</th>
              <th>Payment Method</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>{details.username}</td>
              <td>{details.orderDate}</td>
              <td>{details.orderTime}</td>
              <td>{details.receiverName}</td>
              <td>{details.receiverAddress}</td>
              <td>{details.shipMethod}</td>
              <td>{details.paymentMethod}</td>
              <td>
                {(details.totalPrice + details.shipFee + details.paymentAdminFee)?.toLocaleString(
                  'id-ID',
                  {
                    style: 'currency',
                    currency: 'IDR',
                  },
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <hr className='w-[90%] border border-black' />
        <div className='flex flex-col justify-center p-1 m-1 text-center'>
          <span className='p-1 m-1 text-xl Title'>Transaction History Detail</span>
        </div>
        <table className='justify-center m-1 w-[90%] text-center'>
          <tbody className='ListProduct w-[100%]'>
            <tr>
              <th>Product Name</th>
              {/* <th>Size</th> */}
              <th>Price</th>
              <th>QTY</th>
              <th>Size</th>
              <th>SubTotal</th>
            </tr>
            {productArr.map((product) => (
              <tr key={product.id}>
                <td>{product.productDetail.namaItem}</td>
                <td>{product.productDetail.discountPrice}</td>
                <td>{product.qty}</td>
                <td>{product.size}</td>
                <td>
                  {product.subTotal?.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan='4' className='text-lg font-semibold '>
                Shipment Fee
              </td>
              <td>
                {details.shipFee?.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </td>
            </tr>
            <tr>
              <td colSpan='4' className='text-lg font-semibold '>
                Payment Admin Fee
              </td>
              <td>
                {details.paymentAdminFee?.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </td>
            </tr>
            <tr>
              <td colSpan='4' className='text-lg font-bold uppercase'>
                Total
              </td>
              <td>
                {(details.totalPrice + details.shipFee + details.paymentAdminFee)?.toLocaleString(
                  'id-ID',
                  {
                    style: 'currency',
                    currency: 'IDR',
                  },
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
