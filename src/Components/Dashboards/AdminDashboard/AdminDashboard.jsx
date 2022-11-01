
import { Link, useNavigate } from 'react-router-dom';

import authService from '../../../Services/auth.service';
import logo from '../../../Assets/mainPageImages/logodreamco-ConvertImage.png'

import styles from "../dashboard.module.css"

const AdminDashboard = () =>{
    document.body.className = styles.body;
    const navigate = useNavigate();

    
    const logout = () =>{
      authService.logout();
       navigate("/");
       //window.location.reload();
    }

    return (
        <div>
  <div className={styles.header}>
    <img src={logo} alt="" />
    <br /><br /><br /><br /><br /><hr className={styles.hr} />
    <h1>Main menu</h1>
    <h1>Welcome Admin!</h1>
    <p>select an option</p>
    <p > 
        {/* <button className={styles.logoutButton}  onClick={ () => { authService.logout(); let navigate = useNavigate(); navigate("/") } }>Logout</button>  */}
        {/* <Link to="/" onClick={() => {authService.logout()}} className={styles.logoutButton} >Logout</Link> */}
        <button className={styles.logoutButton} onClick={() => { logout(); }} >logout</button>
    </p>
  </div>
  <div className={styles.row1Container + " row1-container"}>
    <div className={"box box-down " + styles.boxDirty + " " + styles.cyan + " " + styles.boxDirtyDown}>
      <h2 className={styles.h2}>See all</h2>
      <p>view all stored information</p>
      <img className={styles.img} src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt="" />
      <Link to="/tableDashboard"><div className={styles.myCtaButton}>Add</div></Link> 
    </div>
    <div className={"box " + styles.boxDirty + " " + styles.red}>
      <h2 className={styles.h2}>Add a new property</h2>
      <p>Add the information of a new property</p>
      <img className={styles.img} src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt="" />
      <a href="/Register-propiety-form.html"><div className={styles.myCtaButton}>Add</div></a>
    </div>
    <div className={"box box-down " + styles.boxDirty + " " + styles.blue+ " " + styles.boxDirtyDown}>
      <h2 className={styles.h2}>Assign work</h2>
      <p>add an employee, property and time</p>
      <img className={styles.img} src="https://assets.codepen.io/2301174/icon-calculator.svg" alt="" />
      <a href="/work-assigner-form.html"><div className={styles.myCtaButton}>Add</div></a>
    </div>
  </div>
  <div className={styles.row2Container + " row2-container"}>
    <div className={"box " + styles.boxDirty + " " + styles.orange}>
      <h2 className={styles.h2}>Add employees</h2>
      <p>Add and delete employee information</p>
      <img className={styles.img} src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
      <Link to="/register"><div className={styles.myCtaButton}>Add</div></Link>
    </div>
  </div>
</div>

    )
}

export default AdminDashboard