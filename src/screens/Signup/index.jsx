import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Signup = () => {
  const [data, setData] = useState({
    namaDepan: '',
    namaBelakang: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/users';
      const { data: res } = await axios.post(url, data);
      navigate('/sign');
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.content}>
          <div className={styles.sign}>
            <Link to='/sign'>
              <button type='button' className={styles.close_btn}>
                X
              </button>
            </Link>
          </div>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Form Registrasi</h1>
            <input
              type='text'
              placeholder='Nama Depan'
              name='namaDepan'
              onChange={handleChange}
              value={data.namaDepan}
              required
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Nama Belakang'
              name='namaBelakang'
              onChange={handleChange}
              value={data.namaBelakang}
              required
              className={styles.input}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.cos_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
