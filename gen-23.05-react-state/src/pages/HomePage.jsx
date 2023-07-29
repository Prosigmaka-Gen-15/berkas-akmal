// import React from 'react'
import Product from '../component/ProductCard';
import MainLayout from '../layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <main>
        <div className='' id='productContainer'>
          <section id='productList' className='flex flex-wrap justify-center gap-1'>
            <Product src='/images/1.webp' hargaProduk='144.99' namaProduk='Product 1' />
            <Product src='/images/2.webp' hargaProduk='169.99' namaProduk='Product 2' />
            <Product src='/images/3.webp' hargaProduk='269.99' namaProduk='Product 3' />
            <Product src='/images/4.webp' hargaProduk='369.99' namaProduk='Product 4' />
            <Product src='/images/5.webp' hargaProduk='469.99' namaProduk='Product 5' />
            <Product src='/images/6.webp' hargaProduk='569.99' namaProduk='Product 6' />
            <Product src='/images/7.webp' hargaProduk='669.99' namaProduk='Product 7' />
            <Product src='/images/8.webp' hargaProduk='679.99' namaProduk='Product 8' />
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
