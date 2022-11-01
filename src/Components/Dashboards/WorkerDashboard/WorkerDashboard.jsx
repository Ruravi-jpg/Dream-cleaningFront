
import {useNavigate } from 'react-router-dom';
import authService from "../../../Services/auth.service";

import styles from "../dashboard.module.css"



const WorkerDashboard = () =>{
    document.body.className = styles.body;
    const navigate = useNavigate();
    
    const logout = () =>{
      authService.logout();
       navigate("/");
       //window.location.reload();
    }

return(
    <div>
  <div className={styles.header}>
    <img src="/logodreamco-ConvertImage.png" alt="" />
    <br /><br /><br /><br /><br /><hr  className={styles.hr} />
    <h1>Main menu</h1>
    <h1>Welcome Employee!</h1>
    <p>select an option</p>
    <p > 
    <button className={styles.logoutButton} onClick={() => { logout(); }} >logout</button>
    </p>
  </div>
  <div className={styles.row1Container + " row1-container"}>
    <div className={"box box-down " + styles.boxDirty + " " + styles.cyan + " " + styles.boxDirtyDown}>
      <h2 className={styles.h2}>See all</h2>
      <p>see information of the houses assigned for you</p>
      <img className={styles.img} src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt="" />
      <div className={styles.myCtaButton}>Add</div>
    </div>
    <div className={"box box-down " + styles.boxDirty + " " + styles.blue+ " " + styles.boxDirtyDown}>
      <h2 className={styles.h2}>Add evidence</h2>
      <p>Upload evidence of your visit</p>
      <img className={styles.img} src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt="" />
      <a href="/form-upload-employee.html"><div className={styles.myCtaButton}>Add</div></a>
    </div>
  </div>
</div>

)
}

export default WorkerDashboard