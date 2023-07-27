// /* eslint-disable react/prop-types */

import { getImgUrl } from './utils';
import PropTypes from 'prop-types';

//deklarasi tipe data
Product.propTypes = {
  src: PropTypes.string,
  namaProduk: PropTypes.string,
  hargaProduk: PropTypes.number,
  imgUrl: PropTypes.string,
};

export default function Product(props) {
  const { src, namaProduk = 'Produk', hargaProduk = '0', imgUrl = getImgUrl(src) } = props;
  return (
    <article className='flex flex-col items-center justify-center p-3 m-4 text-center transform border border-gray-300 border-solid hover:scale-105 hover:shadow hover:border-gray500'>
      <a href='' className='flex flex-col items-center justify-center text-center'>
        <img src={imgUrl} className='h-80' alt='' />
        <h3 className='mt-4 font-bold'>{namaProduk}</h3>
        <p className='mt-2'>${hargaProduk}</p>
        <a href='' className='inline-block p-1 mt-3 no-underline border border-black border-solid'>
          Detail
        </a>
      </a>
    </article>
  );
}
