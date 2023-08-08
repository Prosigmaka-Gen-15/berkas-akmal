import { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
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
      el.style.height = el.style.height === '626px' ? '0px' : (el.style.height = '626px');
    }
  };
  return (
    <div className='flex justify-center mx-2 FormContainer'>
      {/* Side Navbar */}
      <button
        className='absolute z-[2] left-4 inline-block rounded bg-zinc-700 px-5 py-2.5 text-xs font-medium uppercase leading-tight text-white hover:shadow-lg hover:bg-zinc-500 hover:text-gray-700'
        onClick={toggleMenu}
      >
        &#9776; Menu
      </button>
      <div
        className='sideNav absolute mt-11 left-4 bg-zinc-800 w-60 z-[1] h-[626px] overflow-hidden text-white transition duration-500 ease-in-out'
        ref={menuContainer}
      >
        <nav className='p-1'>
          <ul>
            {/* Menu */}
            <li>
              <ul>
                <a className='ml-3 text-lg font-medium'>
                  <span>Product</span>
                </a>
                <li className='flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none hover:bg-white/10 hover:outline-none '>
                  <Link to={'/admin'}>
                    <span>List Product</span>
                  </Link>
                </li>
                <li className='flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none hover:bg-white/10 hover:outline-none '>
                  <Link to={'/admin/form'}>
                    <span>Add Product</span>
                  </Link>
                </li>
                {/* End sub-menu */}
              </ul>
            </li>
            {/* End Menu */}
          </ul>
        </nav>
      </div>
      {/* Content */}
      <div className='menuContentContainer'>
        <Outlet />
      </div>
    </div>
  );
}
