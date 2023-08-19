import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

//deklarasi tipe data
Product.propTypes = {
  src: PropTypes.string,
  namaProduk: PropTypes.string,
  hargaDiskon: PropTypes.number,
  hargaOri: PropTypes.number,
  // productId masih error ketika tambah barang baru
  productId: PropTypes.number,
  imgUrl: PropTypes.string,
  size: PropTypes.number,
  qty: PropTypes.number,
};

export default function Product(props) {
  // const dispatch = useDispatch();
  const { src, hargaOri, namaProduk, hargaDiskon, productId } = props;

  {
    /** 
     * 1. di hide sementara karena di cartPage belum ada fitur ubah ukuran dan jumlah barang
     * 2. add!ItemToCart tidak digunakan, sudah menggunakan db gunakan axios.post
  const handleAddToCart = () => {
    // Format object di cart
    const data = { id: id, nama: namaProduk, harga: hargaDiskon, size: size, qty: qty };
    try {
      //gunakan axios.post
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      console.log('Selesai');
    }
  };
  */
  }
  return (
    <article className='flex flex-col items-center justify-center max-w-xs p-3 m-4 text-center transform border border-gray-300 border-solid hover:scale-105 hover:shadow hover:border-gray-600'>
      <Link
        // undefined untuk product baru
        to={'/product/' + productId}
        className='flex flex-col items-center justify-center text-center'
      >
        <img src={src} className='object-contain h-80 w-96' alt='' />
        <h3 className='mt-4 font-bold break-words'>{namaProduk}</h3>
        <p className='font-semibold text-red-600 line-through'>
          {hargaOri.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
        <p className='mt-2 font-semibold'>
          {hargaDiskon.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
      </Link>
      <Link
        // undefined untuk product baru
        to={'/product/' + productId}
        className='inline-block p-1 mt-3 no-underline border border-black border-solid hover:bg-slate-900 hover:text-white'
      >
        Detail
      </Link>
      {/** 
      <div className='p-1 m-1 mt-2 border border-black hover:bg-slate-900 hover:text-white'>
        <button onClick={() => handleAddToCart()}>Add To Cart</button>
        //Want to ddd popup to input size and qty
      </div>
      */}
    </article>
  );
}
