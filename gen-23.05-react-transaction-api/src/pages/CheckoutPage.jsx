import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputBlock from '../component/InputBlock';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isItemExist } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [allProducts, setAllProducts] = useState([]);
  const [shipmentFee, setShipFee] = useState(0);
  const [adminFee, setAdminFee] = useState(0);
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
    // ambil data dari db carts
    try {
      let response = await axios.get('/productDetails?_embed=carts');
      setAllProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // Kembali ketika cart kosong. belum di ubah kondisinya, masih pakai redux
    if (isItemExist < 1 || isItemExist == null) {
      navigate('/admin/cart');
    }
    getProduct();
  }, [navigate]);
  // Input formData
  const setInputValue = (event) =>
    setTransactionsData({
      ...transactionsData,
      [event.target.id]: event.target.value, //simpan hasil input user ke transactionsData
      totalPrice: totalHarga, //totalHarga terbaru dari useEffect
    });
  // Input formData.transactionDetails.shipMethod
  const setShipMethod = (radioID) => {
    if (radioID == 'JNE') {
      setShipFee(10000);
    } else {
      setShipFee(20000);
    }
    setTransactionsData({
      ...transactionsData,
      shipMethod: radioID,
    });
  };
  // Input formData.transactionDetails.paymentMethod
  const setPaymentMethod = (radioID) => {
    if (radioID == 'visa') {
      setAdminFee(15000);
    } else {
      setAdminFee(30000);
    }
    setTransactionsData({
      ...transactionsData,
      paymentMethod: radioID,
    });
  };

  // Ambil data untuk Table transactionDetails
  allProducts?.map((products) => {
    // kombinasi data productDetails dan carts
    if (products.carts.length > 0) {
      products.carts.map((cart) => {
        if (cart.userId == user.id) {
          // Hitung totalHarga dan gabungkan ke dalam Array Object
          totalHarga += cart.subTotal;
          totalItem += 1;
          productDetails = [
            ...productDetails,
            {
              id: '',
              cartId: cart.id,
              qty: cart.qty,
              size: cart.size,
              subTotal: cart.subTotal,
              productDetailId: cart.productDetailId,
            },
          ];
        }
      });
    }
  });

  // console.log(productDetails.length);
  // Format data untuk table transactions
  const [transactionsData, setTransactionsData] = useState({
    id: '', // Input user
    userId: user.id,
    username: user.username,
    orderDate: orderDate,
    orderTime: orderTime,
    totalItems: '', //carts
    receiverName: '', // Input user
    receiverAddress: '', // Input user
    shipMethod: '', // Input user
    paymentMethod: '', // Input user
  });
  const handleCheckout = (event) => {
    event.preventDefault();
    setTransactionsData((prev) => ({
      ...prev,
      totalItems: totalItem,
    }));
    axios
      .post('transactions', transactionsData)
      .then((res) => {
        for (const detail of productDetails) {
          axios.delete('carts/' + detail.cartId);
          const payload = {
            ...detail,
            transactionId: res.data.id, //id transactions
          };
          axios
            .post('transactionDetails', payload)
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

    // lokasi hapus items di cart setelah upload, belum di buat karena kalau dihapus semua items dari user lain juga ikut terhapus
    // harus hapus berdasarkan user id yang sudah di upload
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
              {allProducts?.map((product) => {
                // kombinasi data productDetails dan carts
                return product.carts?.map((cart) => {
                  if (cart.userId !== user.id) return;
                  return (
                    // 1. ingin simpan hasil perulangan ke redux agar lebih mudah di akses di checkoutPage
                    <tr key={cart.id} className='tableBodyCheckout'>
                      <td>{product.namaItem}</td>
                      <td>
                        {product.discountPrice?.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </td>
                      <td className='text-center '>x{cart.qty}</td>
                      <td>
                        {cart.subTotal?.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </td>
                    </tr>
                  );
                });
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
            <span className='flex justify-end m-1 text-sm font-medium uppercase'>
              Payment Admin:&nbsp;
              {adminFee?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </span>
            <span className='flex justify-end m-1 text-lg font-semibold uppercase'>
              Total:&nbsp;
              {(totalHarga + shipmentFee + adminFee)?.toLocaleString('id-ID', {
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
