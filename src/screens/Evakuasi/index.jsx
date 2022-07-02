import React from 'react';
import styles from './styles.module.css';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Maps from '../../components/Maps';

const Evakuasi = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <Topbar />
      <div className={styles.home}>
        <Sidebar />
        <Maps />
      </div>
    </div>
  );
};

export default Evakuasi;

{
  /* <div className={styles.logout}>
<button className={styles.white_btn} onClick={handleLogout}>
	  Logout
  </button>
  </div> */
}
