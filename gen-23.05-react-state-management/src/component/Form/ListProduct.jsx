/**
 * Product List Table
 * Create Button
 * Edit Button
 * Delete Button
 */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    try {
      axios
        .get('productsDetail')
        .then((res) => setProduct(res.data))
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const deleteProduct = (productId) => {
    axios
      .delete('/productsDetail/' + productId)
      .then(() => getProducts())
      .catch((err) => alert(err));
  };
  return (
    <div className='ListProductContainer'>
      <div className='flex justify-center'>
        <div className='flex flex-row justify-center p-1 m-1'>
          <span className='p-1 text-xl Title'>List Product</span>
        </div>
      </div>
      <table className='flex justify-center m-1'>
        <tbody className='ListProduct'>
          <Link
            to={'/admin/form'}
            className='bg-green-600 addProduct p-[1px] m-1 rounded border border-black hover:bg-green-500'
          >
            <button className='p-1 '>Add Product</button>
          </Link>
          <tr className='border border-black border-solid'>
            <th>id</th>
            <th>namaItem</th>
            <th>originalPrice</th>
            <th>discountPrice</th>
            <th>itemDesc</th>
            <th>color</th>
            <th>size</th>
            <th>Action</th>
          </tr>
          {loading ? (
            // <div className='text-3xl'>Loading . . .</div>
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            product.map((product) => (
              <tr key={product.id} className='text-center border border-black border-solid '>
                <td>{product.id}</td>
                <td>{product.namaItem}</td>
                <td>{product.originalPrice}</td>
                <td>{product.discountPrice}</td>
                <td className='max-w-[200px] max-h-0 overflow-hidden text-justify'>
                  {product.itemDesc}
                </td>
                <td>{product.itemColor}</td>
                <td>{product.itemSize}</td>
                <td>
                  <Link to={'/admin/form/' + product.id}>
                    <button className='p-1 text-white bg-blue-500 border border-black border-solid rounded hover:bg-blue-400'>
                      Edit
                    </button>
                  </Link>
                  &nbsp;|&nbsp;
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className='p-1 text-white bg-red-500 border border-black border-solid rounded hover:bg-red-400'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduct;
