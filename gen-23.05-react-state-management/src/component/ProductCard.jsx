import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../component/Chart/slices/cartSlice';

//deklarasi tipe data
Product.propTypes = {
  src: PropTypes.string,
  namaProduk: PropTypes.string,
  hargaDiskon: PropTypes.string,
  hargaOri: PropTypes.string,
  id: PropTypes.number,
  imgUrl: PropTypes.string,
};

export default function Product(props) {
  const dispatch = useDispatch();
  const { src, hargaOri = '0', namaProduk = 'Produk', hargaDiskon = '0', id } = props;

  const handleAddToChart = () => {
    const data = { value: { nama: namaProduk, harga: hargaDiskon } };
    try {
      dispatch(addItem(data));
      console.log(data);
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      console.log('Add Item Selesai');
    }
  };
  return (
    <article className='flex flex-col items-center justify-center max-w-xs p-3 m-4 text-center transform border border-gray-300 border-solid hover:scale-105 hover:shadow hover:border-gray-600'>
      <Link to={'/product/' + id} className='flex flex-col items-center justify-center text-center'>
        <img src={src} className='object-contain h-80 w-96' alt='' />
        <h3 className='mt-4 font-bold break-words'>{namaProduk}</h3>
        <p className='font-semibold text-red-600 line-through'>Rp{hargaOri}</p>
        <p className='mt-2 font-semibold'>Rp{hargaDiskon}</p>
      </Link>
      <Link
        to={'/product/' + id}
        className='inline-block p-1 mt-3 no-underline border border-black border-solid'
      >
        Detail
      </Link>
      <div className='p-1 m-1 mt-2 border border-black '>
        <button onClick={() => handleAddToChart()}>Add To Cart</button>
      </div>
    </article>
  );
}
