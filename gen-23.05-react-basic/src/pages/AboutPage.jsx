// import React from 'react';
import MainLayout from '../layout/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <main className='flex justify-center p-3'>
        <div className='block md:flex containerMain'>
          <div className='flex justify-center containerLeft md:flex-content'>
            <div className='m-3 content'>
              <div className='flex justify-center m-1 main'>
                <img
                  src='/images/1.webp'
                  className='max-w-md transition-opacity mainImg'
                  alt='Product 1'
                />
              </div>
              <div className='flex max-w-md m-1 mt-1 overflow-auto'>
                <img
                  src='/images/2.webp'
                  className='w-24 mr-2 transition cursor-pointer flex-flexGellery hover:opacity-50'
                  alt='Product 1'
                />
                <img
                  src='/images/3.webp'
                  className='w-24 mr-2 transition cursor-pointer flex-flexGellery hover:opacity-50'
                  alt='Product 2'
                />
                <img
                  src='/images/4.webp'
                  className='w-24 mr-2 transition cursor-pointer flex-flexGellery hover:opacity-50'
                  alt='Product 3'
                />
                <img
                  src='/images/5.webp'
                  className='w-24 mr-2 transition cursor-pointer flex-flexGellery hover:opacity-50'
                  alt='Product 4'
                />
                <img
                  src='/images/6.webp'
                  className='w-24 mr-2 transition cursor-pointer flex-flexGellery hover:opacity-50'
                  alt='Product 5'
                />
              </div>
            </div>
          </div>
          <div className='flex-1 mt-10 containerRight md:mt-0'>
            <div className='m-3 md:max-w-xl content'>
              <div className='product_title'>
                <h1 className='flex justify-center mx-3 my-2 text-xl font-bold uppercase md:justify-start md:inline-block'>
                  Gata 1012
                </h1>
              </div>
              <div className='flex justify-center product_price md:justify-start'>
                <p className='inline-block mx-3 my-1 text-xl font-semibold text-gray-600 line-through'>
                  Rp750.000,00
                </p>
                <p className='inline-block my-1 text-xl font-semibold text-red-500'>Rp550.000,00</p>
              </div>
              <div className='product_description'>
                <p className='inline-block m-1 text-justify'>
                  Gata 1012 dari Eral Vittori dibuat dengan material yang berkualitas dikelasnya
                  yang menjamin kenyamanan saat memakainya. Desain yang elegan akan membuat
                  penampilan anda lebih eksklusif formal maupun semi formal. <br />
                  <br />
                  Spesifikasi Produk dan Informasi : <br />- Nama Produk : Gata 1012 <br />- Upper :
                  Faux Leather (kulit sintetis premium) <br />- Warna : Hitam dan Coklat <br />-
                  Size : 38 sampai 43
                </p>
              </div>
              <hr className='my-2 border-gray-500 border-t-1' />
              <div className='p-1 product_size' id='sizeContainer'>
                <h2 className='inline-block mx-2 mb-1 text-lg font-bold uppercase'>Panduan Size</h2>
                <br />
                <p className='inline-block text-justify' id='sizeDesc'>
                  38 = 24 cm | 39 = 25 cm | 40 = 25,5 cm | 41 = 26 cm | 42 = 27 cm | 43 = 28 cm
                </p>
              </div>
            </div>
            <div className='flex justify-center m-3 md:max-w-xl md:justify-start order_section'>
              <div className='order_size'>
                <h1 className='flex justify-center mx-3 my-3 text-xl font-bold uppercase md:inline-block'>
                  size
                </h1>
                <ul className='flex'>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(0)'>
                        All
                      </button>
                    </a>
                  </li>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(1)'>
                        38
                      </button>
                    </a>
                  </li>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(2)'>
                        39
                      </button>
                    </a>
                  </li>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(3)'>
                        40
                      </button>
                    </a>
                  </li>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(4)'>
                        41
                      </button>
                    </a>
                  </li>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(5)'>
                        42
                      </button>
                    </a>
                  </li>
                  <li className='mx-3 transition border border-black rounded-3xl hover:bg-black hover:text-white'>
                    <a>
                      <button className='m-2 text-lg' onClick='detailSize(6)'>
                        43
                      </button>
                    </a>
                  </li>
                </ul>
                <div className=''>
                  <form action='' className='flex'>
                    <div className='m-3 border border-black rounded-lg order_quantity'>
                      <button
                        className='p-3 text-white bg-black rounded cursor-pointer'
                        type='button'
                        onClick='kurang()'
                      >
                        -
                      </button>
                      <input
                        id='jumlah'
                        type='number'
                        min='1'
                        value='1'
                        className='max-w-inputWidth spin-none'
                      />
                      <button
                        className='p-3 text-white bg-black rounded cursor-pointer'
                        type='button'
                        onClick='tambah()'
                      >
                        +
                      </button>
                    </div>
                    <div className='p-3 my-2 border-2 border-black rounded-full hover:bg-black hover:text-white'>
                      <input type='submit' className='font-bold' value='Add to Chart' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
