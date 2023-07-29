import Product from './component/ProductCard';
import MainLayout from './layout/MainLayout';

// data produk
const products = [
  { id: 1, namaProduk: 'Product 1', hargaProduk: 144.99, src: '/images/1.webp' },
  { id: 2, namaProduk: 'Product 2', hargaProduk: 169.99, src: '/images/2.webp' },
  { id: 3, namaProduk: 'Product 3', hargaProduk: 269.99, src: '/images/3.webp' },
  { id: 4, namaProduk: 'Product 4', hargaProduk: 369.99, src: '/images/4.webp' },
  { id: 5, namaProduk: 'Product 5', hargaProduk: 469.99, src: '/images/5.webp' },
  { id: 6, namaProduk: 'Product 6', hargaProduk: 569.99, src: '/images/6.webp' },
  { id: 7, namaProduk: 'Product 7', hargaProduk: 669.99, src: '/images/7.webp' },
  { id: 8, namaProduk: 'Product 8', hargaProduk: 679.99, src: '/images/8.webp' },
];

export default function App() {
  return (
    <MainLayout>
      <main>
        <div className='' id='productContainer'>
          <section id='productList' className='flex flex-wrap justify-center gap-1'>
            {products.map((product) => (
              <Product
                key={product.id}
                namaProduk={product.namaProduk}
                hargaProduk={product.hargaProduk}
                src={product.src}
              />
            ))}
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
