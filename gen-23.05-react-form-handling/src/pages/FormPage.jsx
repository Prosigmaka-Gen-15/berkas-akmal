import { useRef, useState } from 'react';
import InputBlock from '../component/InputBlock';
/*
z-index: 
- auto: none
- 1: sideNavbar
*/
export default function FormPage() {
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
  const menuContainer = useRef(null);
  const toggleMenu = () => {
    const el = menuContainer.current;
    if (el) {
      el.style.height =
        el.style.height === '626px'
          ? ((el.style.height = '0px'), el.className.remove('asd'))
          : ((el.style.height = '626px'), el.className.add('asd'));
    }
  };
  return (
    <div className='flex justify-center mx-2 FormContainer'>
      <div className='p-1 menuButton'>
        <button
          className='absolute z-[2] left-4 inline-block rounded bg-zinc-700 px-5 py-2.5 text-xs font-medium uppercase leading-tight text-white hover:shadow-lg hover:bg-zinc-500 hover:text-gray-700'
          onClick={toggleMenu}
        >
          &#9776; Menu
        </button>
      </div>
      <div
        className='sideNav absolute mt-11 left-4 bg-zinc-800 w-60 z-[1] h-[626px] overflow-hidden text-white transition duration-500 ease-in-out'
        ref={menuContainer}
      >
        <nav className='p-1'>
          <ul>
            {/* Menu */}
            <li className='flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none hover:bg-white/10 hover:outline-none '>
              <a>
                <span>Input Barang</span>
              </a>
            </li>
            {/* <li>
              <ul>
                <a>
                  <span>sub-menu</span>
                </a>
                
                <li>
                  <a>
                    <span>Test page 1</span>
                  </a>
                </li>
                <li>
                  <a>
                    <span>Test page 2</span>
                  </a>
                </li>
                End sub-menu
              </ul>
            </li> */}
            {/* End Menu */}
          </ul>
        </nav>
      </div>

      <div className='menuContentContainer'>
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
                type='text'
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
      </div>
    </div>
  );
}
