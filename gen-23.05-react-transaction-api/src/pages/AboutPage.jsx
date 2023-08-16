// import React from 'react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { addItemToCart } from '../component/Redux/slices/cartSlice';

const sizes = ['All', 38, 39, 40, 41, 42, 43];
const sizeMapping = {
  All: '38 = 24 cm | 39 = 25 cm | 40 = 25,5 cm | 41 = 26 cm | 42 = 27 cm | 43 = 28 cm',
  38: '38 = 24 cm',
  39: '39 = 25 cm',
  40: '40 = 25,5 cm',
  41: '41 = 26 cm',
  42: '42 = 27 cm',
  43: '43 = 28 cm',
};
const img = [
  { productId: 1, src: '/images/1.webp', alt: 'Product 1' },
  { productId: 2, src: '/images/2.webp', alt: 'Product 2' },
  { productId: 3, src: '/images/3.webp', alt: 'Product 3' },
  { productId: 4, src: '/images/4.webp', alt: 'Product 4' },
  { productId: 5, src: '/images/5.webp', alt: 'Product 5' },
  { productId: 6, src: '/images/6.webp', alt: 'Product 6' },
];

// fetch data carts dan detailProducts dari db dan di simpan ke variable baru
export default function AboutPage() {
  // productId masih error ketika tambah barang baru
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [path, setPath] = useState();
  const [sizeSelected, setSizeSelected] = useState('All');
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.token !== '');
  // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  const mainImg = useRef(null);
  const sizeRef = useRef(null);
  const jumlahIn = useRef(null);

  const getProduct = async () => {
    try {
      let response = await axios.get('/productDetails/' + productId);
      setProduct(response.data);
      setPath(response.data.imagePath);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ChangePath(pathSrc) {
    // mendapatkan alamat baru gambar
    handlePath(pathSrc);
  }
  function handlePath(newSrc) {
    mainImg.current.style.opacity = 0;
    setTimeout(() => {
      setPath(newSrc);
      mainImg.current.style.opacity = 1;
    }, 200);
  }
  // Form Function
  const detailSize = (number) => {
    if (sizeSelected === number) {
      return;
    }
    // Add number to query for cart and apply activeButton
    setSizeSelected(number);
    // ubah sizeDesc sesuai dengan input number
    const newSizeDesc = sizeMapping[number];
    sizeRef.current.textContent = newSizeDesc;
  };
  function handleSubmit(event) {
    // Kenapa jalan ketika di klik button pilih ukuran padahal tidak submit form
    event.preventDefault();
    if (sizeSelected === 'All') {
      alert('Silahkan pilih ukuran sepatu.');
      return;
    }

    const data = {
      id: '', //isi otomatis di db
      userId: user.id,
      productDetailId: product.id, //detail product di ambil dari productDetails, tidak perlu di masukkan ke carts
      size: sizeSelected, // Input user
      qty: event.target.jumlah.value, // Input user
      subTotal: event.target.jumlah.value * product.discountPrice, // Input user
    };
    try {
      // Upload barang ke db carts
      axios
        .post('carts', data)
        .then(() => {
          alert('Barang berhasil di tambahkan');
        })
        .catch((err) => {
          alert(err.response.data);
        });
      // dispatch(addItemToCart(data));
      // tidak pakai dispatch karena di cartPage nanti akan dilakukan /productDetails?_embed=carts untuk ambil detail product langsung dari db
      // hapus data dari carts pakai axios.delete
    } catch (error) {
      console.log(error);
    }
  }
  const kurang = () => {
    var value = parseInt(jumlahIn.current.value);

    if (value > 1) {
      value--;
      jumlahIn.current.value = value;
    }
  };
  const tambah = () => {
    var value = parseInt(jumlahIn.current.value);

    value++;
    jumlahIn.current.value = value;
  };

  return (
    <div>
      <main className='flex justify-center p-3'>
        <div className='block md:flex containerMain'>
          {/* Rencana di pisahkan */}
          <div className='flex justify-center containerLeft md:flex-content'>
            <div className='m-3 content'>
              <div className='flex justify-center m-1 main'>
                <img
                  ref={mainImg}
                  src={path}
                  className='max-w-md transition-opacity mainImg'
                  alt={product.namaItem}
                />
              </div>
              <div className='flex max-w-md m-1 mt-1 overflow-auto'>
                {img.map((product) => (
                  <img
                    key={product.productId}
                    src={product.src}
                    className='w-24 mr-2 transition cursor-pointer flex-flexGellery hover:opacity-50 miniImg'
                    onClick={() => ChangePath(product.src)}
                    alt={product.alt}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* End-Rencana */}
          <div className='flex-1 mt-10 containerRight md:mt-0'>
            <div className='m-3 md:max-w-xl content'>
              <div className='product_title'>
                <h1 className='flex justify-center mx-3 my-2 text-xl font-bold uppercase md:justify-start md:inline-block'>
                  {product.namaItem}
                </h1>
              </div>
              <div className='flex justify-center product_price md:justify-start'>
                <p className='inline-block mx-3 my-1 text-xl font-semibold text-gray-600 line-through'>
                  {product.originalPrice?.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </p>
                <p className='inline-block my-1 text-xl font-semibold text-red-500'>
                  {product.discountPrice?.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </p>
              </div>
              <div className='product_description'>
                <p className='inline-block m-1 text-justify'>
                  {product.itemDesc} <br />
                  <br />
                  Spesifikasi Produk dan Informasi : <br />- Upper : Faux Leather (kulit sintetis
                  premium) <br />- Warna : {product.itemColor} <br />- Size : {product.itemSize}
                </p>
              </div>
              <hr className='my-2 border-gray-500 border-t-1' />
              <div className='p-1 product_size' id='sizeContainer'>
                <h2 className='inline-block mx-2 mb-1 text-lg font-bold uppercase'>Panduan Size</h2>
                <br />
                <p ref={sizeRef} className='inline-block text-justify max-w-[430px]' id='sizeDesc'>
                  38 = 24 cm | 39 = 25 cm | 40 = 25,5 cm | 41 = 26 cm | 42 = 27 cm | 43 = 28 cm
                </p>
              </div>
            </div>
            <div className='flex justify-center m-3 md:max-w-xl md:justify-start order_section'>
              <div className='flex order_size'>
                <form onSubmit={handleSubmit}>
                  <h1 className='flex justify-center mx-3 my-3 text-xl font-bold uppercase md:inline-block'>
                    size
                  </h1>
                  <ul className='flex'>
                    {sizes.map((size) => (
                      <li
                        key={size}
                        className={`mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white ${
                          sizeSelected === size ? ' activeButton' : ''
                        }`}
                      >
                        <button
                          type='button'
                          className='m-2 text-lg'
                          onClick={() => detailSize(size)}
                        >
                          {size}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className='m-3 border border-black rounded-lg order_quantity max-w-[275px]'>
                    <button
                      className='p-3 text-white bg-black rounded cursor-pointer'
                      type='button'
                      onClick={() => kurang()}
                    >
                      -
                    </button>
                    <input
                      ref={jumlahIn}
                      id='jumlah'
                      type='number'
                      min='1'
                      value='1'
                      className='max-w-inputWidth spin-none'
                      readOnly
                    />
                    {/* readOnly pada input harus diganti jika ingin berfungsi */}
                    <button
                      className='p-3 text-white bg-black rounded cursor-pointer'
                      type='button'
                      onClick={() => tambah()}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type='submit'
                    className='p-3 my-2 font-bold border-2 border-black rounded-full hover:bg-black hover:text-white disabled:pointer-events-none'
                    disabled={!isLoggedIn}
                  >
                    {isLoggedIn ? 'Add to Cart' : 'Login Dulu'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
