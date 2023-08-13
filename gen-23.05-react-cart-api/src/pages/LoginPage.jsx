import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../component/Redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const setInputValue = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post('/login', formData)
      .then((res) => {
        const { accessToken, user } = res.data;
        dispatch(setToken(accessToken));
        dispatch(setUser(user));
        navigate('/admin');
      })
      .catch((err) => {
        alert('terjadi kesalahan');
        console.error(err);
        console.error(err.response);
      });
  };
  return (
    <main className='LoginFormContainer'>
      <form className='flex flex-col font-semibold text-center LoginForm' onSubmit={handleLogin}>
        <div className='Email'>
          Email <br />
          <input
            type='email'
            placeholder='email'
            className='rounded-md'
            name='email'
            value={formData.email}
            onChange={setInputValue}
          />
        </div>
        <div className='Pass'>
          Password <br />
          <input
            type='password'
            placeholder='password'
            className='rounded-md'
            name='password'
            value={formData.password}
            onChange={setInputValue}
          />
        </div>
        <div className='pt-3'>
          <button className='p-1 m-1 border border-black border-solid rounded-md'>Login</button>
        </div>
      </form>
    </main>
  );
}
