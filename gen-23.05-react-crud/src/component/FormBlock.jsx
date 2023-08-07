import InputBlock from './InputBlock';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  namaItem: yup.string().required('Nama barang harus di isi'),
  originalPrice: yup
    .number('Harga harus menggunakan angka')
    .positive('Harga tidak boleh minus')
    .integer("Harga tidak boleh menggunakan koma ','")
    .required('Harga Barang wajib di isi!')
    .nonNullable('Harga Barang wajib di isi!'),
  discountPrice: yup
    .number('Harga harus menggunakan angka')
    .nullable()
    .positive('Harga tidak boleh minus')
    .integer("Harga tidak boleh menggunakan koma ','"),
  itemDesc: yup.string().required('Deskripsi Barang harus di isi'),
  itemColor: yup.string().required('Warna Barang harus di isi'),
  itemSize: yup.string().required('Ukuran Barang harus di isi'),
  // imagePath: yup..required('Gambar harus di cantumkan'),
});

export default function FormBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div className='items-center gap-2 p-2 my-2 border border-gray-700 border-solid rounded Form'>
      <div className='flex justify-center my-1 text-xl font-semibold TitlePage'>
        Form Input Barang
      </div>
      <div className='p-2 border border-gray-600 border-solid rounded input'>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit(submitForm)}>
          <InputBlock
            id='item_name'
            // name='namaItem'
            type='text'
            input_title='Item Name'
            placeholder='Item Name...'
            {...register('namaItem')}
          />
          <span className='font-semibold text-red-500'>{errors.namaItem?.message}</span>
          <InputBlock
            id='harga_original'
            // name='originalPrice'
            type='text'
            input_title='Original Price'
            placeholder='Original Price...'
            {...register('originalPrice')}
          />
          <span className='font-semibold text-red-500'>{errors.originalPrice?.message}</span>
          <InputBlock
            id='harga_discount'
            // name='discountPrice'
            type='text'
            input_title='Discount Price'
            placeholder='Discount Price...'
            {...register('discountPrice')}
          />
          <span className='font-semibold text-red-500'>{errors.discountPrice?.message}</span>
          <InputBlock
            id='deskripsi_barang'
            // name='itemDesc'
            type='text'
            input_title='Item Description'
            placeholder='Item Description...'
            {...register('itemDesc')}
          />
          <span className='font-semibold text-red-500'>{errors.itemDesc?.message}</span>
          <InputBlock
            id='warna_barang'
            // name='itemColor'
            type='text'
            input_title='Color Variation'
            placeholder='Color Variation...'
            {...register('itemColor')}
          />
          <span className='font-semibold text-red-500'>{errors.itemColor?.message}</span>
          <InputBlock
            id='ukuran_barang'
            // name='itemSize'
            type='text'
            input_title='Size'
            placeholder='Size...'
            {...register('itemSize')}
          />
          <span className='font-semibold text-red-500'>{errors.itemSize?.message}</span>
          <InputBlock
            id='lokasi_gambar'
            // name='imagePath'
            type='file'
            accept='image/*'
            input_title='Image Path'
            placeholder='Image Path...'
            {...register('imagePath')}
          />
          <span className='font-semibold text-red-500'>{errors.imagePath?.message}</span>
          <button
            className='px-4 py-3 mt-3 font-bold text-white rounded shadow bg-zinc-700 hover:bg-zinc-500 focus:shadow-outline focus:outline-none hover:text-gray-700'
            type='submit'
          >
            Input Barang
          </button>
        </form>
      </div>
    </div>
  );
}
