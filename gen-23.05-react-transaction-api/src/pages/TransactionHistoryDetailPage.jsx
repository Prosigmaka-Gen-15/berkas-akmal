// import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TransactionHistoryDetailPage() {
  const { userId, transactionId } = useParams();
  const [details, setDetails] = useState([]);
  const [userDetail, setUserDetail] = useState([]);

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
  const getUserDetails = () => {
    try {
      axios
        .get('/users/' + userId)
        .then((res) => {
          setUserDetail(res.data);
        })
        .catch((err) => console.error(err.message));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactionDetails();
    getUserDetails();
  }, []);
  // const productArray = details.transactionDetails;
  return (
    <main>
      <div className='TransactionHistoryContainer w-screen flex flex-col items-center'>
        <div className='flex flex-col justify-center text-center p-1 m-1'>
          <span className='p-1 m-1 text-xl Title'>Transaction History Detail</span>
          <span>{userDetail.username}</span>
        </div>
        {/* Table */}
        <table className='justify-center m-1 w-[90%] text-center'>
          <tbody className='ListProduct w-[100%]'>
            <tr>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Reciver Name</th>
              <th>Reciver Address</th>
              <th>Ship Method</th>
              <th>Payment Method</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>{details.orderDate}</td>
              <td>{details.orderTime}</td>
              <td>{details.receiverName}</td>
              <td>{details.receiverAddress}</td>
              <td>{details.shipMethod}</td>
              <td>{details.paymentMethod}</td>
              <td>{details.totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <hr className='w-[90%] border border-black' />
        <br />
        <table className='justify-center m-1 w-[90%] text-center'>
          <tbody className='ListProduct w-[100%]'>
            <tr>
              <th>Product Name</th>
              {/* <th>Size</th> */}
              <th>Price</th>
              <th>QTY</th>
              <th>SubTotal</th>
              <th>Payment Method</th>
              <th>Total</th>
            </tr>
            {/* {productArray.map((product) => (
              <tr key={product.id}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </main>
  );
}
