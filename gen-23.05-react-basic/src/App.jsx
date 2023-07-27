import { IconShoppingBag } from '@tabler/icons-react';

export default function App() {
  return (
    <body>
      <Header />
      <Main />
      <Footer />
    </body>
  );
}

// eslint-disable-next-line no-unused-vars
function Header() {
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
            <a
              href='https://www.adidas.co.id/pria.html'
              className='p-1 m-1 navContent'
            >
              Source
            </a>
            <a href='' className='p-1 m-1 sm:hidden navContent'>
              Chart
            </a>
          </div>
        </div>
        <div className='hidden mr-4 search sm:inline-block'>
          <a href=''>
            <IconShoppingBag />
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

function Main() {
  return (
    <main>
      <div className='flex'>
        <section className='m-auto justify-center gap-1 flex flex-wrap'>
          <Product src='/images/1.webp' text='$44.99'>
            Product 1
          </Product>
          <Product src='/images/2.webp' text='$69.99'>
            Product 2
          </Product>
          <Product src='/images/3.webp' text='$99.99'>
            Product 3
          </Product>
          <Product src='/images/4.webp' text='$59.99'>
            Product 4
          </Product>
          <Product src='/images/5.webp' text='$79.99'>
            Product 5
          </Product>
          <Product src='/images/6.webp' text='$414.99'>
            Product 6
          </Product>
          <Product src='/images/7.webp' text='$440.99'>
            Product 7
          </Product>
          <Product src='/images/8.webp' text='$499.99'>
            Product 8
          </Product>
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <section className='miniFooter justify-center mt-3 p-5 border-t-2 border-black mx-3'>
        <div className='footer-nav flex items-center justify-center text-black'>
          <a
            href='#'
            className='button prev px-1 py-1 my-0 mx-1 border-2 border-black uppercase no-underline mr-auto'
          >
            Previous
          </a>

          <span className='m-0'>Halaman 1 of 10</span>

          <a
            href='#'
            className='button next px-1 py-1 my-0 mx-1 border-2 border-black uppercase no-underline ml-auto'
          >
            Next
          </a>
        </div>
      </section>
    </footer>
  );
}

function Product(props) {
  // eslint-disable-next-line react/prop-types
  const { src, text, children } = props;
  return (
    <article className='flex m-4 p-3 text-center items-center flex-col justify-center border border-solid border-gray-300 transform hover:scale-105 hover:shadow hover:border-gray500'>
      <a
        href=''
        className='flex flex-col items-center justify-center text-center'
      >
        <img src={getImgUrl(src)} className='h-80' alt='' />
        <h3>{children}</h3>
        <p>{text}</p>
        <a
          href=''
          className='inline-block mt-3 p-1 border border-solid border-black no-underline'
        >
          Detail
        </a>
      </a>
    </article>
  );
}
function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href;
}
