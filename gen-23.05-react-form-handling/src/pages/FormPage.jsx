// import React from 'react'

import InputBlock from '../component/InputBlock';

export default function FormPage() {
  return (
    <div className='flex justify-center mx-2 FormContainer'>
      <div className='flex flex-col items-center gap-2 p-2 my-2 border border-gray-700 border-solid rounded Form'>
        <div className='text-xl font-semibold TitlePage'>Form Input Barang</div>
        <div className='p-2 border border-gray-600 border-solid rounded input'>
          <form className='flex flex-col gap-1'>
            <InputBlock id={'nama_barang'} inputName='itemName' inputTitle='Item Name' />
            <InputBlock
              id={'harga_original'}
              inputName='original_price'
              inputTitle='Original Price'
            />
            <InputBlock
              id={'harga_discount'}
              inputName='discount_price'
              inputTitle='Discount Price'
            />
            <InputBlock
              id={'deskripsi_barang'}
              inputName='item_desc'
              inputTitle='Item Description'
            />
            <InputBlock id={'warna_barang'} inputName='color' inputTitle='Color Variation' />
            <InputBlock id={'ukuran_barang'} inputName='size' inputTitle='Size' />
            <InputBlock id={'lokasi_gambar'} inputName='image' inputTitle='Image Path' />
            <button
              className='px-4 py-3 mt-3 font-bold text-white bg-gray-500 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none'
              type='button'
            >
              Input Barang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
