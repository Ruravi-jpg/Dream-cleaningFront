import styles from './mainPage.module.css';
import BanerPrincipal from "../../Assets/mainPageImages/carrusel-01.JPG";
import BanerPrincipal1 from "../../Assets/mainPageImages/carerusel-02.JPG";
import BanerPrincipal2 from "../../Assets/mainPageImages/carruse-03.JPG";
import SeccionWelcome from "../../Assets/mainPageImages/WelcomeTo.JPG"
import CleaningAirbnb from "../../Assets/mainPageImages/cleaning-airbnb.JPG"
import Cleaninghouse from "../../Assets/mainPageImages/cleaning-house.JPG"


function MainPage() {

//styles for root element
const rootElement = document.documentElement;
rootElement.style = styles.mainRoot;

//set styles for body
document.body.className = styles.body;


  return (
    <div className='MainPage'>
        {/*Main Content*/}
        <section id={styles.mainCarousel}>
          <div id={styles.carousel} className={styles.carouselDirty + " carousel slide carousel-fade"} data-ride="carousel" data-pause="false" data-interval="3500">
            <div className={styles.carouselInerDirty + " carousel-inner"}>
              <div className="carousel-item active">
                <img className="d-block w-100" src={BanerPrincipal} alt="" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={BanerPrincipal1} alt="" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={BanerPrincipal2} alt="" />
              </div>
            </div>

            <div className={styles.overlay}>
              <div className={"container "}>
                <div className="row">
                  <div className="align-items-center">
                    <h1>Licensed &amp; Affordable</h1>
                    <p className={""  + styles.mainText}>
                      Family-owned company that specializes in  Cleaning services in Phoenix, Peoria, Glendale, Surprise, Goodyear and beyond.
                    </p>
                    <button type="button" className={"btn btn-outline-light btn-lg " + styles.btnCarousel} onclick="window.location.href='#'">
                      <i className="fa-solid fa-broom" /> VIEW CLEANING SERVICES
                    </button>
                    <button type="button" className={"btn btn-outline-light btn-lg " + styles.btnCarousel} onclick="window.location.href='#'">
                      <i className="fa-solid fa-phone" /> CONTACT
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </section>



        {/*Features*/}
        <section id={styles.features}>
          <div className="row">
            <div className= {styles.featureBox + " col-lg-4"}>
              <i className={"fa-solid fa-medal fa-4x " + styles.featureIcon}/>
              <h3>Satisfaction Guarantee.</h3>
            </div>
            <div className={styles.featureBox + " col-lg-4"}>
              <i className={"fa-solid fa-truck fa-4x " + styles.featureIcon} />
              <h3>Providing Services In whole valley.</h3>
            </div>
            <div className={styles.featureBox + " col-lg-4"}>
              <i className={"fa-solid fa-people-group fa-4x " + styles.featureIcon}/>
              <h3>Family-Owned Company.</h3>
            </div>
          </div>
        </section>


        {/* Welcome */}
        <section id={styles.welcome}>
          <div className={"row align-items-center " + styles.rowDirty}>
            <div className={"col-lg " + styles.colForm}>
              <h2 className={styles.welcome}>Welcome To Dreamco Cleaning</h2>
              <p className={styles.welcome}>
                The Most Affordable reliable Company for your Cleaning Needs.<br /> Dreamco Cleaning is an Arizona family owned business that provides residential and commercial cleaning.Our company will deliver quality results and outstanding customer experience with uncompromising integrity to ensure the customer satisfaction on every single job.
              </p>
              <div className="text-center">
                <button type="button" className={"btn " + styles.btnDark + " btn-dark center-icon"} onclick>
                  <span>More info </span><i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
            <div className={"col-lg " + styles.colForm}>
              <img src={SeccionWelcome} alt="Nature" className={styles.responsive} />
            </div>




            {/* form Contact */}
            <div className={"col-lg " + styles.colForm}>
              <div className={styles.renderedForm}>
                <div className>
                  <h1 access="false" id="control-6760272">Get a free Quote</h1></div>
                <div className="formbuilder-text form-group field-name">
                  <label htmlFor="name" className="formbuilder-text-label">Name<span className="formbuilder-required">*</span></label>
                  <input type="text" className="form-control" name="name" access="false" id="name" required="required" aria-required="true" />
                </div>
                <br />
                <div className="formbuilder-text form-group field-phone">
                  <label htmlFor="phone" className="formbuilder-text-label">Phone<span className="formbuilder-required">*</span></label>
                  <input type="text" className="form-control" name="phone" access="false" id="phone" required="required" aria-required="true" />
                </div>
                <br />
                <div className="formbuilder-text form-group field-email">
                  <label htmlFor="email" className="formbuilder-text-label">Email<span className="formbuilder-required">*</span></label>
                  <input type="text" className="form-control" name="email" access="false" id="email" required="required" aria-required="true" />
                </div>
                <br />
                <div className="formbuilder-text form-group field-text-1655846451047">
                  <label htmlFor="text-1655846451047" className="formbuilder-text-label">Subject</label>
                  <input type="text" className="form-control" name="text-1655846451047" access="false" id="text-1655846451047" />
                </div>
                <br />
                <div className="formbuilder-textarea form-group field-textarea-1655846529879">
                  <label htmlFor="textarea-1655846529879" className="formbuilder-textarea-label">Message<span className="formbuilder-required">*</span></label>
                  <textarea type="textarea" className="form-control" name="textarea-1655846529879" access="false" id="textarea-1655846529879" required="required" aria-required="true" defaultValue={""} />
                </div>
                <br /> <br />
                <div className="formbuilder-button form-group field-button-form">
                  <button type="button" className="button-form btn-danger btn" name="button-form" access="false" style={{backgroundColor: '#a64342'}} id="button-form">GET QUOTE NOW</button>
                </div>
              </div>
            </div> 
          </div>
        </section>



        <hr style={{color: '#d15149'}} />

        
        <div className={styles.containerServices}>
          <div className="row">
            <h1 className={styles.titleServices}>Cleaning Services</h1>
            <div className="col-lg-4 d-flex justify-content-center">
              <div className={"card " + styles.cardDirty}>
                <figure className={"card__thumb " + styles.cardThumb}>
                  <img src={CleaningAirbnb} alt="Picture by Kyle Cottrell" className={"card__image " + styles.cardImage} />
                  <figcaption className={"card__caption " + styles.cardCaption}>
                    <h2 className={"card__title " + styles.cardTitle}>Airbnb – VRBO – Vacation Rental Cleaning Services</h2>
                    <p className={"card__snippet " + styles.cardSnippet}>Phoenix is a great place to vacation! With incredible museums like the Phoenix Art Museum, the breathtaking Desert Botanical Garden, hiking spots like Camelback Mountain, and award-winning golf courses and resorts like the Arizona Biltmore Resort, it’s no wonder why people come from around the country to spend some time</p>
                    <a href className={"card__button " + styles.cardButton}>Read more</a>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-center" />
            <div className="col-lg-4 d-flex justify-content-center">
              <div className={"card-index " + styles.cardDirty}>
                <figure className={"card__thumb " + styles.cardThumb}>
                  <img src={Cleaninghouse} alt="Picture by Nathan Dumlao" className={"card__image " + styles.cardImage} />
                  <figcaption className={"card__caption " + styles.cardCaption}>
                    <h2 className={"card__title " + styles.cardTitle}>Commercial Building Cleaning Services</h2>
                    <p className={"card__snippet " + styles.cardSnippet}>If you own or manage a commercial facility, you know how important cleanliness is to your bottom line. Not only does regular cleaning and disinfecting boost employee productivity and decrease sick leave, but the appearance of your building directly relates to how credible people find your business to be.</p>
                    <a href className={"card__button " + styles.cardButton}>Read more</a>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div><br /><br />
        <hr style={{color: '#d15149'}} />
        <br /><br />
      </div>
  );
}

export default MainPage;
