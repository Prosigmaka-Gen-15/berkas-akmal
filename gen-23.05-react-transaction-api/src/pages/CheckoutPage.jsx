import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputBlock from '../component/InputBlock';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
/**
 *Note:
 *1. Rencananya default berdasarkan info alamat di API user
 */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isItemExist } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [allProducts, setAllProducts] = useState([]);
  const [shipmentFee, setShipFee] = useState(0);
  const [paymentAdminFee, setPaymentAdminFee] = useState(0);
  const orderDate = new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const orderTime = new Date().toLocaleString('id-ID', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  let totalHarga = 0;
  let productDetails = [];
  let totalItem = 0;

  const getProduct = async () => {
    try {
      //ambil data dari db berdasarkan user yg login
      let response = await axios.get('keranjangs?_expand=productDetail&userId=' + user.id);
      setAllProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isItemExist < 1 || isItemExist == null) {
      navigate('/admin/cart');
    }
    getProduct();
  }, [navigate]);
  const setInputValue = (event) =>
    setTransactionsData({
      ...transactionsData,
      [event.target.id]: event.target.value,
      totalPrice: totalHarga,
    });
  const setShipMethod = (radioID) => {
    let shipFee = 0;
    if (radioID == 'JNE') {
      shipFee = 10000;
      setShipFee(shipFee);
    } else {
      shipFee = 20000;
      setShipFee(shipFee);
    }
    setTransactionsData({
      ...transactionsData,
      shipMethod: radioID,
      shipFee: shipFee,
    });
  };
  const setPaymentMethod = (radioID) => {
    let paymentFee = 0;
    if (radioID == 'visa') {
      paymentFee = 15000;
      setPaymentAdminFee(paymentFee);
    } else {
      paymentFee = 30000;
      setPaymentAdminFee(paymentFee);
    }
    setTransactionsData({
      ...transactionsData,
      totalItems: totalItem,
      paymentMethod: radioID,
      paymentAdminFee: paymentFee,
    });
  };

  // Ambil data untuk Table transactionDetails
  allProducts?.map((keranjang) => {
    // kombinasi data productDetails dan carts
    totalItem++;
    totalHarga += keranjang.subTotal;
    productDetails = [
      ...productDetails,
      {
        id: '',
        cartId: keranjang.id,
        qty: keranjang.qty,
        size: keranjang.size,
        subTotal: keranjang.subTotal,
        productDetailId: keranjang.productDetailId,
      },
    ];
  });
  // Format data untuk table transactions
  const [transactionsData, setTransactionsData] = useState({
    id: '', // Input user
    userId: user.id,
    username: user.username,
    orderDate: orderDate,
    orderTime: orderTime,
    receiverName: '', // Input user
    receiverAddress: '', // Input user
    totalItems: '',
    shipMethod: '', // Input user
    shipFee: '',
    paymentMethod: '', // Input user
    paymentAdminFee: '',
  });
  const handleCheckout = async (event) => {
    event.preventDefault();
    await axios
      .post('transactions', transactionsData)
      .then(async (res) => {
        for (const detail of productDetails) {
          const transactionDetailsData = {
            ...detail,
            transactionId: res.data.id, //id transactions
          };
          await axios
            .post('transactionDetails', transactionDetailsData)
            .then(() => {
              console.log('Berhasil');
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        }
        alert('Berhasil');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    allProducts?.map((keranjang) => {
      //delete db berdasarkan id keranjang
      axios.delete('keranjangs/' + keranjang.id);
    });
    navigate('/');
  };
  return (
    <main>
      <div className='flex justify-center pb-2 CheckoutTitle'>
        <span className='my-1 text-xl font-semibold TitlePage'>Order Summary</span>
      </div>
      <form onSubmit={handleCheckout}>
        {/* shipping and payment detail*/}
        <div className='flex flex-col justify-center pt-2 text-center CheckoutTable'>
          <div className='text-start'>
            <address>
              {/* [1] */}
              <InputBlock
                input_title={'Nama Penerima'}
                id='receiverName'
                placeholder='Nama Penerima'
                onChange={setInputValue}
                value={transactionsData.receiverName}
                required
              />
              <InputBlock
                input_title={'Alamat'}
                id='receiverAddress'
                placeholder='Alamat'
                onChange={setInputValue}
                value={transactionsData.receiverAddress}
                required
              />
            </address>
          </div>
          <hr className='mt-5' />
          <div>
            <legend className='p-1 m-1 font-semibold text-start'>Shipment Option</legend>
            <div>
              <div className='form__radio'>
                <label htmlFor='J&T'>
                  <img src='/images/JNE.svg' alt='JNE' className='max-w-[90px]' />
                </label>
                <input
                  checked={transactionsData.shipMethod === 'JNE'}
                  onChange={() => setShipMethod('JNE')}
                  id='JNE'
                  name='shipMethod'
                  type='radio'
                  required
                />
              </div>
              <div className='form__radio'>
                <label htmlFor='J&T'>
                  <img src='/images/J&T.svg' alt='J&T' className='max-w-[90px]' />
                </label>
                <input
                  checked={transactionsData.shipMethod === 'J&T'}
                  onChange={() => setShipMethod('J&T')}
                  id='J&T'
                  name='shipMethod'
                  type='radio'
                />
              </div>
            </div>
          </div>
          <hr className='mt-5' />
          <div>
            <legend className='p-1 m-1 font-semibold text-start'>Payment Method</legend>
            <div className='grid gap-1 form__radios'>
              <div className='form__radio'>
                <label htmlFor='visa'>
                  <img src='/images/Visa.svg' alt='visa' className='max-w-[60px]' />
                </label>
                <input
                  checked={transactionsData.paymentMethod === 'visa'}
                  onChange={() => setPaymentMethod('visa')}
                  id='visa'
                  name='paymentMethod'
                  type='radio'
                  required
                />
              </div>

              <div className='form__radio'>
                <label htmlFor='paypal'>
                  <img src='/images/PayPal.svg' alt='PayPal' className='max-w-[60px]' />
                </label>
                <input
                  checked={transactionsData.paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  id='paypal'
                  name='paymentMethod'
                  type='radio'
                />
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-5' />
        {/* Order Summary */}
        <div className='pt-3 m-1'>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>QTY</th>
                <th>Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.map((keranjang) => {
                return (
                  <tr key={keranjang.id} className='tableBodyCheckout'>
                    <td>{keranjang.productDetail.namaItem}</td>
                    <td>
                      {keranjang.productDetail.discountPrice?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </td>
                    <td className='text-center '>x{keranjang.qty}</td>
                    <td>
                      {keranjang.subTotal?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* total */}
          <div>
            <span className='flex justify-end m-1 text-sm font-medium'>
              Shipment Fee:&nbsp;
              {shipmentFee?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </span>
            <span className='flex justify-end m-1 text-sm font-medium'>
              Payment Admin Fee:&nbsp;
              {paymentAdminFee?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </span>
            <span className='flex justify-end m-1 text-lg font-semibold uppercase'>
              Total:&nbsp;
              {(totalHarga + shipmentFee + paymentAdminFee)?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </span>
          </div>
        </div>

        <div className='flex justify-center m-1'>
          <button type='submit' className='p-1 m-1 border border-black rounded hover:scale-110 '>
            Pay Now
          </button>
        </div>
      </form>
    </main>
  );
}
