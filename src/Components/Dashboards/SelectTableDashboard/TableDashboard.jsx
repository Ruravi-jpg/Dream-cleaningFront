
import { Link } from 'react-router-dom';

import styles from "../dashboard.module.css"


import EmployeeLogo from '../../../Assets/DashboardImages/image (15).png'
import PropiertyLogo from '../../../Assets/DashboardImages/image (13).png'
import logo from '../../../Assets/mainPageImages/logodreamco-ConvertImage.png'

const TableDashboard = () =>{
    document.body.className = styles.body;

return(
    <div>
  <div className={styles.header}>
    <img src={logo} alt="" />
    <br /><br /><br /><br /><br />
    <hr style={{backgroundColor: '#f45b69'}} />
    <h1 style={{color: '#f45b69'}}>What do you want to see?</h1>
    <p>select an option / back to menu</p>
  </div>
  <div className={styles.row1Container}>
    <div className={"box " + styles.boxDirty + " " + styles.cyan}>
      <h2>employees</h2>
      <img className={styles.img} src={EmployeeLogo} alt="" />
      <Link to="/employees"><div className={styles.myCtaButton}>View</div></Link>
    </div>
    <div className={"box " + styles.boxDirty + " " + styles.blue}>
      <h2>Propierties</h2>
      <img className={styles.img} src={PropiertyLogo} alt="" />
      <a href="/form-upload-employee.html"><div className={styles.myCtaButton}>View</div></a>
    </div>
  </div>
</div>


)
}

export default TableDashboard