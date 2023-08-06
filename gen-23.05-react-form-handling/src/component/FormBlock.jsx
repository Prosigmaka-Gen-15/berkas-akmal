import { useState } from 'react';
import InputBlock from './InputBlock';

export default function FormBlock() {
  const [formInput, setFormInput] = useState({
    nama: '',
    originalPrice: '',
    discountPrice: '',
    itemDesc: '',
    color: '',
    size: '',
    imagePath: '',
  });

  const handleFormInput = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
    /* ===OR=== */
    // setFormInput((prev) => {
    //   return {
    //     ...prev,
    //     [event.target.name]: event.target.value,
    //   };
    // });
  };
  return (
    <div className='flex flex-col items-center gap-2 p-2 my-2 border border-gray-700 border-solid rounded Form'>
      <div className='text-xl font-semibold TitlePage'>Form Input Barang</div>
      <div className='p-2 border border-gray-600 border-solid rounded input'>
        <form className='flex flex-col gap-1'>
          <InputBlock
            id='item_name'
            name='nama'
            type='text'
            value={formInput.nama}
            onChange={handleFormInput}
            input_title='Item Name'
            placeholder='Item Name...'
          />
          <InputBlock
            id='harga_original'
            name='originalPrice'
            type='text'
            value={formInput.originalPrice}
            onChange={handleFormInput}
            input_title='Original Price'
            placeholder='Original Price...'
          />
          <InputBlock
            id='harga_discount'
            name='discountPrice'
            type='text'
            value={formInput.discountPrice}
            onChange={handleFormInput}
            input_title='Discount Price'
            placeholder='Discount Price...'
          />
          <InputBlock
            id='deskripsi_barang'
            name='itemDesc'
            type='text'
            value={formInput.itemDesc}
            onChange={handleFormInput}
            input_title='Item Description'
            placeholder='Item Description...'
          />
          <InputBlock
            id='warna_barang'
            name='color'
            type='text'
            value={formInput.color}
            onChange={handleFormInput}
            input_title='Color Variation'
            placeholder='Color Variation...'
          />
          <InputBlock
            id='ukuran_barang'
            name='size'
            type='text'
            value={formInput.size}
            onChange={handleFormInput}
            input_title='Size'
            placeholder='Size...'
          />
          <InputBlock
            id='lokasi_gambar'
            name='imagePath'
            // type='file'
            type='image'
            value={formInput.imagePath}
            onChange={handleFormInput}
            input_title='Image Path'
            placeholder='Image Path...'
          />
          <button
            className='px-4 py-3 mt-3 font-bold text-white rounded shadow bg-zinc-700 hover:bg-zinc-500 focus:shadow-outline focus:outline-none hover:text-gray-700'
            type='button'
          >
            Input Barang
          </button>
        </form>
      </div>
    </div>
  );
}
