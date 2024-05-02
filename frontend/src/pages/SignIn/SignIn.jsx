import React from 'react'
import styles from './SignIn.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'

export default function SignInForm() {
    return (
        <div className={styles['container']}>
            <div className={styles['main']}>
                <div className={styles['sign-in-container']}>
                    <div className={styles['sign-in-content']}>
                        <div className={styles['sign-in-header']}>
                            <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} />
                        </div>
                        <h1 className={styles['sign-in-text-title']}>Sign In</h1>
                        <form>
                            <div className={styles['input-wrapper']}>
                                <label type="username">Username</label>
                                <input type="username" id="username" />
                            </div>
                            <div className={styles['input-wrapper']}>
                                <label type="Password">Password</label>
                                <input type="new-password" id={'newPassword'} />
                            </div>
                            <div className={styles['input-remember']}>
                                <input type="checkbox" id="rememberMe" name="Remember Me"
                                    value="Remember Me" /> Remember Me</div>
                            <div className={styles['input-wrapper']}>
                                <Link to="/balanceaccount">
                                    <button className={styles['sign-in-button']} type="submit" >
                                        Sign In</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
