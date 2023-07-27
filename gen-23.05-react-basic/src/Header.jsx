// import { IconShoppingBag } from '@tabler/icons-react';

export default function Header() {
  return (
    <header className='bg-white m-1.5 p-2.5 uppercase'>
      <nav className='flex-wrap items-center justify-between p-3 border-b-2 sm:flex border-b-slate-200'>
        <div className='flex justify-center imgContainer'>
          <a href=''>
            <img src='/images/icon.webp' className='h-11' alt='' />
          </a>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <div className='flex flex-col p-3 font-bold text-black no-underline sm:flex-row'>
            <a href='./index.html' className='p-1 m-1 navContent'>
              Home
            </a>
            <a href='./about.html' className='p-1 m-1 navContent'>
              Product Detail
            </a>
            <a href='https://www.adidas.co.id/pria.html' className='p-1 m-1 navContent'>
              Source
            </a>
            <a href='' className='p-1 m-1 sm:hidden navContent'>
              Chart
            </a>
          </div>
        </div>
        <div className='hidden mr-4 search sm:inline-block'>
          <a href=''>
            <i className='p-2 chart fa fa-shopping-basket fa-2x to-black' />
          </a>
        </div>
      </nav>
      <nav className='justify-center border-b-2 border-black sm:flex navbar2'>
        <div className='flex-wrap text-center'>
          <div className='flex flex-col justify-center p-1 font-bold text-black no-underline sm:flex-row menu2'>
            <a href='' className='m-3 navContent2'>
              Diskon
            </a>
            <a href='' className='m-3 navContent2'>
              Event
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
