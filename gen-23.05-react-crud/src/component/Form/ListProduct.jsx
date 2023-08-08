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

  const getUsers = () => {
    setLoading(true);
    try {
      axios
        .get('http://localhost:3000/productsDetail')
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
    getUsers();
  }, []);
  const deletePerson = (productId) => {
    axios
      .delete('http://localhost:3000/productsDetail/' + productId)
      .then(() => getUsers())
      .catch((err) => alert(err));
  };
  return (
    <div className='ListProductContainer'>
      <div className='flex justify-center Title'>List Product</div>
      <table className='flex m-1 justify-center'>
        <tbody className='ListProduct'>
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
                <td>{product.color}</td>
                <td>{product.size}</td>
                <td>
                  <Link to={'/admin/form/' + product.id}>
                    <button className='hover:bg-blue-400 border border-solid border-black p-1 rounded bg-blue-500 text-white'>
                      Edit
                    </button>
                  </Link>
                  &nbsp;|&nbsp;
                  <button
                    onClick={() => deletePerson(product.id)}
                    className='hover:bg-red-400 border border-solid border-black p-1 rounded bg-red-500 text-white'
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
