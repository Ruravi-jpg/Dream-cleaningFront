import styles from "./AboutUs.module.css"

export default function AboutUs() {

//styles for root element
const rootElement = document.documentElement;
rootElement.style = styles.mainRoot;

//set styles for body
document.body.className = styles.body;

    return (
        <>
            <div>
                <div className="row">
                    <h1 className= {styles.title}>About Us</h1>
                </div>
                <div className="row">
                    <p className={styles.bodyText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>

        </>
    )
}