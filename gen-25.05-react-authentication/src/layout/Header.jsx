import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-white m-1.5 p-2.5 uppercase'>
      <nav className='flex-wrap items-center justify-between p-3 border-b-2 border-black sm:flex'>
        <div className='flex justify-center imgContainer'>
          <Link to={'/'}>
            <img src='/images/icon.webp' className='h-11' alt='' />
          </Link>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <div className='flex flex-col p-3 font-bold text-black no-underline sm:flex-row'>
            <Link to={'/'} className='p-1 m-1 navContent'>
              Home
            </Link>
            <Link to={'/admin'} className='p-1 m-1 navContent'>
              Admin Page
            </Link>
            <Link to={'/login'} className='p-1 m-1 navContent'>
              Login
            </Link>
            <a href='' className='p-1 m-1 sm:hidden navContent'>
              Cart
            </a>
          </div>
        </div>
        <div className='hidden mr-4 search sm:inline-block'>
          <Link to={'/cart'}>
            <i className='p-2 chart fa fa-shopping-basket fa-2x to-black' />
          </Link>
        </div>
      </nav>
      {/* <nav className='justify-center border-b-2 border-black sm:flex navbar2'>
        <div className='flex-wrap text-center'>
          <div className='flex flex-col justify-center p-1 font-bold text-black no-underline sm:flex-row menu2'>
            <Link to={'/'} className='m-3 navContent2'>
              Diskon
            </Link>
            <Link to={'/'} className='m-3 navContent2'>
              Event
            </Link>
          </div>
        </div>
      </nav> */}
    </header>
  );
}
