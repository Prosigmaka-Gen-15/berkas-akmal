export default function Footer() {
  return (
    <footer>
      <section className='justify-center p-5 mx-3 mt-3 border-t-2 border-black miniFooter'>
        <div className='flex items-center justify-center text-black footer-nav'>
          <a
            href='#'
            className='px-1 py-1 mx-1 my-0 mr-auto no-underline uppercase border-2 border-black button prev'
          >
            Previous
          </a>

          <span className='m-0'>Halaman 1 of 10</span>

          <a
            href='#'
            className='px-1 py-1 mx-1 my-0 ml-auto no-underline uppercase border-2 border-black button next'
          >
            Next
          </a>
        </div>
      </section>
    </footer>
  );
}
