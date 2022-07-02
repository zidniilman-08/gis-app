import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Mapbox from './Mapbox';
import './maps.css';

export default function Maps() {
  return (
    <div className='divRow'>
      <h1>
        Maps Jalur Evakuasi{' '}
        <Button variant='contained' style={{ float: 'right' }}>
          <Link to='/evakuasi/tambah-jalur' style={{ textTransform: 'capitalize', textDecoration: 'none', color: 'white', hover: 'none'}}>Tambah Jalur</Link>
        </Button>
      </h1>
      <div className='featureMap'>
        <Mapbox height={500} />
      </div>
    </div>
  );
}
