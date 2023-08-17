import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TransactionHistoryPage() {
  /**
   * thead:
   * - userId
   * --> axios.get users?_embed=transactions
   * --> axios.get transactions?_embed=transactionDetails
   * - transactionId
   * - orderDate
   * - TotalPrice
   * - Detail => Page
   *
   * Note:
   * - Tidak bisa menggunakan user dari redux, karena user di transactions berdasarkan user di db sedangkan user di redux merupakan user lokal/login
   * Note:
   * /transactions/{transactions.id}?_embed=transactionDetails
   */

  const [transaction, setTransaction] = useState([]);
  const getTransactionHistory = () => {
    try {
      axios
        .get('transactions')
        .then((res) => setTransaction(res.data))
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  useEffect(() => {
    getTransactionHistory();
  }, []);

  return (
    <main>
      <div className='flex flex-col items-center w-screen TransactionHistoryContainer'>
        <div className='flex justify-center p-1 m-1 text-center'>
          <span className='p-1 m-1 text-xl Title'>Transaction History</span>
        </div>
        {/* Table */}
        <table className='justify-center m-1 w-[70%] text-center'>
          <thead className='ListProduct w-[100%]'>
            <tr>
              <th className='w-[15%]'>User</th>
              <th className='w-[20%]'>Order Date</th>
              <th className='w-[15%]'>Order Time (Jam:Menit:Detik)</th>
              <th className='w-[20%]'>Total Price</th>
              <th className='w-[15%]'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.orderDate}</td>
                <td>{item.orderTime}</td>
                <td>
                  {item.totalPrice?.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </td>
                <td>
                  {/* Param: userId dan transactionId */}
                  <Link to={'/admin/transactions/detail/' + item.userId + '/' + item.id}>
                    <button className='p-1 text-white bg-blue-500 border border-black border-solid rounded hover:bg-blue-400'>
                      Detail
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
