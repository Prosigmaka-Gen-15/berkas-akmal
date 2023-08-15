import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputBlock from '../component/InputBlock';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { removeAllItemFromCart } from '../component/Redux/slices/cartSlice';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalHarga, setTotalHarga] = useState(0);
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const transactionId = uuidv4(); // ID transaksi

  const shipFee = (totalHarga / 100) * 5;
  const taxPrice = (totalHarga / 100) * 10;

  // Ambil value dari cartItems
  const details = cartItems.map((item) => {
    return {
      productId: item.id,
      qty: item.qty,
      subTotal: item.harga * item.qty,
    };
  });

  /**
   * Konfigurasi form untuk di upload, terdapat Masalah:
   * 1. format upload ke db menjadi 1, tidak terpisah
   * 2. list products di dalam transactionDetails sebaiknya pakai object atau array atau object array?
   * 3. Ingin di pisahkan menjadi 2 formData berbeda, tapi masalahnya apakah uuid nanti akan sama? tidak tau
   * [], {} atau [{}]

   * const productArray = formData.transactionDetails.products;
   * const mappedArray = productArray.map((product) => {
   * //Lakukan operasi yang Anda inginkan pada setiap elemen produk di sini
   * return product;
   * });
   */
  const [formData, setFormData] = useState({
    userID: user.id,
    totalItems: cartItems.length,
    orderDate: new Date().toISOString(), // TODO : get date and time
    transactionId: transactionId,
    transactionDetails: {
      transactionId: transactionId,
      products: [...details],
      receiverName: '',
      receiverAddress: '',
      shipMethod: '',
      paymentMethod: '',
    },
  });

  useEffect(() => {
    const total = Object.values(cartItems).reduce(
      (acc, product) => acc + product.harga * product.qty,
      0,
    );
    if (cartItems.length === 0) {
      navigate('/admin/cart');
    }
    setTotalHarga(total);
  }, [cartItems, navigate]);

  // Input formData
  const setInputValue = (event) =>
    setFormData({
      ...formData,
      transactionDetails: {
        ...formData.transactionDetails,
        [event.target.id]: event.target.value,
      },
    });
  // Input formData.transactionDetails.shipMethod
  const setShipMethod = (radioID) => {
    setFormData({
      ...formData,
      transactionDetails: {
        ...formData.transactionDetails,
        shipMethod: radioID,
      },
    });
  };
  // Input formData.transactionDetails.paymentMethod
  const setPaymentMethod = (radioID) => {
    setFormData({
      ...formData,
      transactionDetails: {
        ...formData.transactionDetails,
        paymentMethod: radioID,
      },
    });
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    // console.log(event.target);
    // Lokasi handle data Form
    axios
      .post('transaction', formData)
      .then(() => {
        // const { accessToken } = res.data;
        // navigate('/login');
        alert('Berhasil');
      })
      .catch((err) => {
        alert(err.response.data);
      });
    dispatch(removeAllItemFromCart());
    navigate('/');
  };
  // console.log(formData);
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
              {/* Rencananya default berdasarkan info alamat di API user */}
              <InputBlock
                input_title={'Nama Penerima'}
                id='receiverName'
                placeholder='Nama Penerima'
                onChange={setInputValue}
                value={formData.receiverName}
                required
              />
              <InputBlock
                input_title={'Alamat'}
                id='receiverAddress'
                placeholder='Alamat'
                onChange={setInputValue}
                value={formData.receiverAddress}
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
                  checked={formData.transactionDetails.shipMethod === 'JNE'}
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
                  checked={formData.transactionDetails.shipMethod === 'J&T'}
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
                  checked={formData.transactionDetails.paymentMethod === 'visa'}
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
                  checked={formData.transactionDetails.paymentMethod === 'paypal'}
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
              {Object.keys(cartItems).map((arr, index) => {
                const product = cartItems[arr];
                return (
                  <tr key={index} className='tableBodyCheckout'>
                    <td>{product.nama}</td>
                    <td>
                      {product.harga?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </td>
                    <td className='text-center '>x{product.qty}</td>
                    <td>
                      {(product.harga * product.qty)?.toLocaleString('id-ID', {
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
              {shipFee?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </span>
            <span className='flex justify-end m-1 text-sm font-medium uppercase'>
              Tax:&nbsp;
              {taxPrice?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </span>
            <span className='flex justify-end m-1 text-lg font-semibold uppercase'>
              Total:&nbsp;
              {(totalHarga + taxPrice + shipFee)?.toLocaleString('id-ID', {
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
