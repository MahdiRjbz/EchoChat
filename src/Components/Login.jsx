import { useState } from 'react';
import styles from './Login.module.css'
import { auth } from '../Firebase'
import { Google } from '@mui/icons-material';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { LoadingButton } from '@mui/lab';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const signinHandle = (event) => {
        event.preventDefault()
        setLoading(true)
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
        .catch((error) => {
            if (error.message.includes('auth/network-request-failed')) {
                alert(`Network Error:  
                    Please use VPN for this app
                    NOTE: VLESS PROTOCOL NOT WORKING IN THIS APP
                `)
                setLoading(false)

            }
        })
        
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
               <div className={styles.leftContainer}>
                    <div className={styles.logoDiv}>
                        <img className={styles.logo} src="./Assets/Logo-white.svg" alt="logo" />
                    </div>
                    <div className={styles.descriptionDiv}>
                        <h5>Welcome to</h5>
                        <h1>EchoChat</h1>
                        <span></span>
                        <p>A Safe, Fast and User friendly place to chat with family friend colleague etc.</p>
                        </div>
               </div>
               <div className={styles.rightContainer}>
                    <div className={styles.logoDiv}>
                        <img className={styles.logo} src="./Assets/Logo-white.svg" alt="logo" />
                    </div>
                    <h2>Login Account</h2>
                    <p>Please login with your google account to able use EchoChat PWA. (No need to worry, your account information will be safe)</p>
                    <LoadingButton style={{ marginBlock: '1rem' }} variant='contained' loadingPosition='center' loading={loading} sx={{ borderRadius: '5px', backgroundColor: '#665DFE' }} className={styles.loginButton}
                        onClick={signinHandle}
                    >
                        <Google sx={{marginBlock: '.5rem' ,fontSize: '2.5rem', display: 'flex' , flexDirection: 'column', justifyContent: 'center', rowGap: '1rem'}} />
                        Login with Google Account
                    </LoadingButton>
               </div>
            </div>
        </div>
    );
};

export default Login;