import {
  Link
} from "react-router-dom";

import styles from './footer.module.css'

function Footer(){
    return(
        <div className="footer">
        <br /><br />
        {/* Footer */}
        <footer className="text-center text-lg-start text-dark">
          {/* Section: Social media */}
          <section className="d-flex justify-content-between p-4 text-white" style={{backgroundColor: '#d15149'}}>
            {/* Left */}
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>
            {/* Left */}
            {/* Right */}
            <div>
              <a href="https://www.facebook.com/desertdreamcoAz" className="text-white me-4">
                <i className="fa-brands fa-facebook" />
              </a>
              <a href="https://twitter.com/DDreamco" className="text-white me-4">
                <i className="fa-brands fa-twitter-square" />
              </a>
              <a href="https://www.google.com/maps?cid=7669249180922442523&_ga=2.228685276.1595662509.1638483652-916416863.1638303183" className="text-white me-4">
                <i className="fa fa-google" />
              </a>
              {/* Right */}
            </div></section>
          {/* Section: Social media */}
          {/* Section: Links  */}
          <section className>
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold">Dreamco Cleaning</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#ffd26b', height: '2px'}} />
                  <p>
                    Dreamco cleaning is an Arizona family owned business that provides  residential and commercial
                    cleaning.
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Services</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#ffd26b', height: '2px'}} />
                  <p>
                    <a href="#!" className="text-dark">Commercial cleaning</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Airbnb Cleaning</a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Business Hours</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#ffd26b', height: '2px'}} />
                  <p>
                    <a href="#!" className="text-dark">From Monday to Friday - 8am - 5pm</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">saturday and sunday - closed </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#ffd26b', height: '2px'}} />
                  <p><i className="fas fa-home mr-3" /> New York, NY 10012, US</p>
                  <p><i className="fas fa-envelope mr-3" /> info@example.com</p>
                  <p><i className="fas fa-phone mr-3" /> +(623) 226-0192</p>
                  {/* Grid column */}
                </div>
                {/* Grid row */}
              </div>
            </div></section>
          {/* Section: Links  */}
          {/* Copyright */}
          <div className="text-center">
            <div className={"row " + styles.rowFooter} style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
              <div className={"col "}>
                © 2022 Copyright:
                <a className="text-dark" href="https://desertdreamco.com/">DreamcoCleaning.com </a>
                <br></br>
                <Link
                to ="/login"
                >
                  <i className="fa-solid fa-users feature-icon" />
                </Link>
              </div>
            </div>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
        {/* End of .container */}
      </div>
    )
}

export default Footer