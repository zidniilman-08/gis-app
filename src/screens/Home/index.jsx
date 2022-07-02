import React from 'react';
import styles from './styles.module.css';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Info from '../../components/Info';

const Home = () => {
  return (
    <div className={styles.main_container}>
      <Topbar />
      <div className={styles.home}>
        <Sidebar />
        <Info />
      </div>
    </div>
  );
};

export default Home;
