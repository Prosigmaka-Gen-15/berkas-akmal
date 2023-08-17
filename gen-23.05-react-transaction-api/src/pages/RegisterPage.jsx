import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const setInputValue = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post('register', formData)
      .then(() => {
        // const { accessToken } = res.data;
        navigate('/login');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <main className='RegisterFormContainer'>
      <div className='flex justify-center p-1 m-1'>
        <form
          className='flex flex-col font-semibold text-center RegisterForm'
          onSubmit={handleRegister}
        >
          <div className='Username text-start'>
            Username <br />
            <input
              type='text'
              placeholder='username'
              className='rounded-md'
              name='username'
              value={formData.username}
              onChange={setInputValue}
              required
            />
          </div>
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
            <button className='p-1 m-1 border border-black border-solid rounded-md'>
              Register
            </button>
          </div>
          <div>
            Already have an account?{' '}
            <Link to='/login' className='underline'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
