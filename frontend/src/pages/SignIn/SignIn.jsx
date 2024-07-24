import React, { useState, useRef } from 'react'
import styles from './SignIn.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userLogin, userProfile } from '../../utils/requestApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';



/**
 * Renders a Sign In form and handles the login process.
 *
 * @return {JSX.Element} The Sign In form component.
 */
export default function SignIn() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    // Handle the login form submission
    const handleLogin = async (event) => {
        event.preventDefault();

        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        const hasError = !userName || !password;


        setIsError(hasError);
        if (hasError) {
            return;
        }

        const loginResponse = await userLogin(userName, password);
        try {
            if (loginResponse.data.status !== 200) {
                setIsError(hasError);
                return;
            }
            console.log('loginResponse : login successful => get user token', loginResponse.data.body, loginResponse.data.status);

            const userResponse = await userProfile(loginResponse.data.body.token);
            if (userResponse.data.status !== 200) {
                setIsError(true);
                return;
            }
            console.log('userResponse : retreived user data', userResponse.data.body, userResponse.data.status);

            // const userUpdateResponse = await updateUserProfile(userResponse.data.body, loginResponse.data.body.token);
            // try {
            //     if (userUpdateResponse.data.status !== 200) {
            //     setIsError(true);
            //     return
            // }
            // console.log('userUpdateResponse', userResponse.data.body);
            // } catch (error) {
            //     console.log('userUpdateResponse : login failed');
            // }



            // login successful, store user and token in Redux store
            dispatch(
                authActions.login({ user: userResponse.data.body, token: loginResponse.data.body.token }),
            );

            console.log('isAuthenticated : login success', dispatch(
                authActions.login({ user: userResponse.data.body, token: loginResponse.data.body.token })))

            navigate('/profile');
        } catch (error) {
            console.log('login failed');
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
                        <form onSubmit={handleLogin}>
                            <div className={styles['input-wrapper']}>
                                <label htmlFor="username" type="username">Username</label>
                                <input
                                    name="username"
                                    type="username"
                                    id="username"
                                    autoComplete="off"
                                    ref={userNameRef}
                                />
                            </div>
                            <div className={styles['input-wrapper']}>
                                <label htmlFor="password" type="Password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    ref={passwordRef}
                                />
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