import React, { useState, useRef } from 'react'
import styles from './SignIn.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userLogin } from '../../utils/requestApi';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    // const [userName, setUserName] = useState();
    // const [password, setPassword] = useState();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    

    const login = async (event) => {
        event.preventDefault();
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        const hasError = !userName || !password;
        setIsError(hasError);
        if (hasError) {
            return;
        }

        const loginResponse = await userLogin(userName, password);
        console.log(loginResponse, loginResponse.data.status, loginResponse.data.body.token);

        if (loginResponse.data.status === 200) {
            localStorage.setItem('token', loginResponse.data.body.token);
            navigate('/profile');
        } else {
            setIsError(true);
            return
        }

    };


    return (
        <div className={styles['container']}>
            <div className={styles['main']}>
                <div className={styles['sign-in-container']}>
                    <div className={styles['sign-in-content']}>
                        <div className={styles['sign-in-header']}>
                            <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} />
                        </div>
                        <h1 className={styles['sign-in-text-title']}>Sign In</h1>
                        <form onSubmit={login}>
                            <div className={styles['input-wrapper']}>
                                <label htmlFor="username" type="username" >Username</label>
                                <input name="username" type="username" id="username" autoComplete="on" ref={userNameRef} />
                            </div>
                            <div className={styles['input-wrapper']}>
                                <label htmlFor="password" type="Password">Password</label>
                                <input name="password" type="password" id="password" autoComplete="on" ref={passwordRef} />
                            </div>
                            <div className={styles['input-remember']}>
                                <input type="checkbox" id="rememberMe" name="Remember Me"
                                    value="Remember Me" /> Remember Me</div>
                            <div className={styles['input-wrapper']}>
                                <button className={styles['sign-in-button']} type="submit" > Sign In</button>
                                {isError && <p className={styles['error-message']}>Wrong username or password</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
