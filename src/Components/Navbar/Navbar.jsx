
import styles from './navbar.module.css';

function Navbar() {
  return (
    <>
   <nav className={"navbar navbar-expand-lg " + styles.menu}>
  {/* burger menu */}
  <a className="navbar-brand"><img src="https://i.ibb.co/KxXHQXp/logodreamco-Convert-Image.png" alt="My Awesome Website" /></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className={"navbar-nav mr-auto " + styles.menuUl}>
      <li className={"nav-item " + styles.menuLi}>
        <a className={"nav-link " + styles.menuLink} href="#">Home</a>
      </li>
      <li className={"nav-item " + styles.menuLi}>
        <a className={"nav-link " + styles.menuLink} href="#">Cleaning Services</a>
      </li>
      <li className={"nav-item " + styles.menuLi}>
        <a className={"nav-link " + styles.menuLink} href="#">Contact</a>
      </li>
      <li className={"nav-item " + styles.menuLi}>
        <a className={"nav-link " + styles.menuLink} href="#">About Us</a>
      </li>
    </ul>
  </div>  
</nav>

  </>
  );
}

export default Navbar;
