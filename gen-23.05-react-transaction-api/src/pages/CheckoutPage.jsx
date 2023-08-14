import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputBlock from '../component/InputBlock';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [totalHarga, setTotalHarga] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [shipMethod, setShipMethod] = useState('JNE');
  const cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    const total = Object.values(cartItems).reduce(
      (acc, product) => acc + product.harga * product.qty,
      0,
    );
    setTotalHarga(total);
  }, [cartItems]);
  const shipFee = (totalHarga / 100) * 5;
  const taxPrice = (totalHarga / 100) * 10;
  const handleCheckout = (event) => {
    event.preventDefault();
    // console.log(event.target);
    // Lokasi handle data Form
    alert('Berhasil');
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
              {/* Rencananya default berdasarkan info alamat di API user */}
              <InputBlock
                input_title={'Nama Penerima'}
                id='namaPenerima'
                placeholder='Nama Penerima'
              />
              <InputBlock input_title={'Alamat'} id='alamatPenerima' placeholder='Alamat' />
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
                  checked={shipMethod === 'JNE'}
                  onChange={() => setShipMethod('JNE')}
                  id='JNE'
                  name='ship-method'
                  type='radio'
                />
              </div>
              <div className='form__radio'>
                <label htmlFor='J&T'>
                  <img src='/images/J&T.svg' alt='J&T' className='max-w-[90px]' />
                </label>
                <input
                  checked={shipMethod === 'J&T'}
                  onChange={() => setShipMethod('J&T')}
                  id='J&T'
                  name='ship-method'
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
                  checked={paymentMethod === 'visa'}
                  onChange={() => setPaymentMethod('visa')}
                  id='visa'
                  name='payment-method'
                  type='radio'
                />
              </div>

              <div className='form__radio'>
                <label htmlFor='paypal'>
                  <img src='/images/PayPal.svg' alt='PayPal' className='max-w-[60px]' />
                </label>
                <input
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  id='paypal'
                  name='payment-method'
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
