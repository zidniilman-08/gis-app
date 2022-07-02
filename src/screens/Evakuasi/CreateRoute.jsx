import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, TextField } from '@mui/material';
import styles from './styles.module.css';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Mapbox from '../../components/Maps/MapboxEditor';

const CreateRoute = () => {
  const [data, setData] = useState({});
  const [rute, setRute] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const onSetRute = (point) => {
    setRute([...rute, point]);
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      ...data,
      rute: JSON.stringify(rute),
    };

    try {
      const url = 'http://localhost:8080/api/lines/';
      const { data: res } = await axios.post(url, reqData);
      window.location.reload();
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <div className={styles.main_container}>
      <Topbar />
      <div className={styles.home}>
        <Sidebar />
        <div className='divRow'>
          <div className='featureMap'>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={8} md={8}>
                <Mapbox height={500} onSet={onSetRute} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Box
                  component='form'
                  autoCorrect='off'
                  style={{ marginTop: '5em', padding: '2em' }}
                >
                  <h1>Tambah Jalur Evakuasi</h1>
                  <div>
                    <TextField
                      required
                      id='outlined-required'
                      label='Nama Jalur'
                      placeholder='contoh: Jalur cept'
                      fullWidth
                      name='nama'
                      value={data.nama}
                      onChange={onChange}
                    />
                  </div>
                  <div style={{ marginTop: '1em' }}>
                    <TextField
                      required
                      id='outlined-required'
                      label='Warna Jalur'
                      placeholder='contoh: Green'
                      fullWidth
                      name='warna'
                      value={data.warna}
                      onChange={onChange}
                    />
                  </div>
                  <div style={{ marginTop: '1em' }}>
                    <Button variant='contained' fullWidth onClick={onSubmit}>
                      Simpan
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoute;
