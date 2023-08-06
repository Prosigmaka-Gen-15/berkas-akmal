import { useRef } from 'react';
import FormBlock from '../component/FormBlock';
/*
z-index: 
- auto: none
- 1: sideNavbar
*/
export default function FormPage() {
  const menuContainer = useRef(null);
  const toggleMenu = () => {
    const el = menuContainer.current;
    if (el) {
      el.style.height =
        el.style.height === '626px'
          ? ((el.style.height = '0px'), el.classList.remove('close'))
          : ((el.style.height = '626px'), el.classList.add('open'));
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
        <FormBlock />
      </div>
    </div>
  );
}
