import React, { useState, useRef, useEffect } from 'react'
import styles from './SignIn.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userProfile, userLogin } from '../../utils/requestApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/authSlice';

export default function SignIn() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(authLogin());
        // eslint-disable-next-line
    }, []);
    
    const login = async (event) => {
        event.preventDefault();

        // call user login

        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        const hasError = !userName || !password;

        // if !userName or !password isError = hasErrror then return
        setIsError(hasError);
        if (hasError) {
            return;
        }

        // login response from requestApi function userLogin 
        const loginResponse = await userLogin(userName, password);
        console.log('loginResponse', loginResponse.data.body);

        // if status !== 200 isError = true
        if (loginResponse.data.status !== 200) {
            setIsError(true);
            return
        }

        // get token from response and store in localStorage
        // localStorage.setItem('token', loginResponse.data.body.token);
        // console.log(loginResponse, loginResponse.data.status, loginResponse.data.body.token);

        // call update profile


        // const token = localStorage.getItem('token');

        // login update response from requestApi function updateUserProfile
        const userResponse = await userProfile(loginResponse.data.body.token);

        // if status !== 200 isError = true 
        if (userResponse.data.status !== 200) {
            setIsError(true);
            return
        }
        // get user and token from response and store in localStorage
        // localStorage.setItem('token', loginUpdateResponse.data.body.token);

        console.log('userResponse', userResponse.data.body);

        // navigate to profile
        navigate('/profile');

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
