import styles from './Welcome.module.css'

const Welcome = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h2>Welcome To EchoChat!</h2>
                <div className={styles.bannerContainer}>
                    <img className={styles.banner} src="./Assets/welcomeAsset.webp" alt="banner" />
                    <div className={styles.logoContainer} >
                        <img className={styles.logo} src="./Assets/Logo-white.svg" alt="echoChat-logo" />
                    </div>
                </div>
                <h3>Create a Group or Select A Chat.</h3>
                <p>Powered by Google's Firestore <br></br> Design And Developed By:</p>
                <span className={styles.developer}>Mahdi Rajabzadeh</span>
            </div>
        </div>
    );
};

export default Welcome;