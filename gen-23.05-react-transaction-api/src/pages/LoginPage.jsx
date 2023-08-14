import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../component/Redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

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
        alert(err.response.data);
      });
  };
  return (
    <main className='LoginFormContainer'>
      <div className='flex justify-center p-1 m-1'>
        <form className='flex flex-col font-semibold text-center LoginForm' onSubmit={handleLogin}>
          <div className='Email text-start'>
            Email <br />
            <input
              type='email'
              placeholder='e-mail'
              className='rounded-md'
              name='email'
              value={formData.email}
              onChange={setInputValue}
              required
            />
          </div>
          <div className='Pass text-start'>
            Password <br />
            <input
              type='password'
              placeholder='Password'
              className='rounded-md'
              name='password'
              value={formData.password}
              onChange={setInputValue}
              required
            />
          </div>
          <div className='pt-3'>
            <button className='p-1 m-1 border border-black border-solid rounded-md'>Login</button>
          </div>
          <div>
            Do not have account?{' '}
            <Link to='/register' className='underline'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
