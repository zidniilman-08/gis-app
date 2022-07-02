import React from 'react';
import './info.css';

export default function Info() {
  return (
    <div className='divRow'>
      <h1>Informasi</h1>
      <div className='featured'>
        <div className='featuredItem'>
          <span className='featuredTitle'>Lorem</span>
          <div className='featuredContainer'>
            <span className='featuredCount'>JUDUL</span>
          </div>
          <span className='featuredSub'>Lorem Ipsum Gimsum</span>
        </div>
        <div className='featuredItem'>
          <span className='featuredTitle'>Lorem</span>
          <div className='featuredContainer'>
            <span className='featuredCount'>JUDUL</span>
          </div>
          <span className='featuredSub'>Lorem Ipsum Gimsum</span>
        </div>
        <div className='featuredItem'>
          <span className='featuredTitle'>Lorem</span>
          <div className='featuredContainer'>
            <span className='featuredCount'>JUDUL</span>
          </div>
          <span className='featuredSub'>Lorem Ipsum Gimsum</span>
        </div>
      </div>
      <h1>Maps Jalur Evakuasi</h1>
      <div className='featureMap'>
        <iframe
          className='iframe'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.266767426109!2d106.97639631477253!3d-6.858596695043555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684b54e6371c65%3A0x593ac094d060b39b!2sPUNCAK%20BELENDUNG%20GOALPARA!5e0!3m2!1sid!2sid!4v1656412781042!5m2!1sid!2sid'
          frameborder='0'
          allowfullscreen=''
          aria-hidden='false'
          tabindex='0'
        ></iframe>
      </div>
    </div>
  );
}
