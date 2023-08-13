import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { resetAuthData } from '../component/Redux/slices/authSlice';
/*
z-index: 
- auto: none
- 1: sideNavbar
*/
export default function FormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuContainer = useRef(null);

  const toggleMenu = () => {
    const el = menuContainer.current;
    if (el) {
      el.style.height = el.style.height === '626px' ? '0px' : (el.style.height = '626px');
    }
  };

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(resetAuthData());
    navigate('/');
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
          <div className='gap-1 p-1 m-1 text-white rounded-lg bg-zinc-800 userInfo'>
            Email: {user.email} <br />
            User Name: {user.username} <br />
            <button onClick={handleLogout}>Logout</button>
            <Link to={'/'}>
              <button>Home</button>
            </Link>
          </div>
          <hr className='border-slate-50' />
          <ul>
            {/* Menu */}
            <li>
              <ul className='adminMenuList'>
                <a className='ml-3 text-lg font-medium'>
                  <span>Product</span>
                </a>
                <li>
                  <Link to={'/admin'}>
                    <span>List Product</span>
                  </Link>
                </li>
                <li>
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
