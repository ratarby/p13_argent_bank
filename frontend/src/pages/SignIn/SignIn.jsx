import React, { useState, useRef, useEffect } from 'react'
import styles from './SignIn.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userLogin, userProfile, updateUserProfile } from '../../utils/requestApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';


export default function SignIn() {
    const user = useSelector((state) => state.auth.user);
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setIsError(false);
        setUsername(JSON.parse(localStorage.getItem('user')).email);
        setPassword((localStorage.getItem('user')).password);
    }, [user, password]);


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
        console.log('loginResponse', loginResponse.data.body, loginResponse.data.status);


        if (loginResponse.data.status !== 200) {
            navigate('/');
            setIsError(true);
            console.log('login failed');
            return
        }

        const userResponse = await userProfile(loginResponse.data.body.token);

        console.log('userResponse', userResponse.data.body);

        if (userResponse.data.status !== 200) {
            setIsError(true);
            return
        }

        console.log('userResponse', userResponse.data.body);

        const userUpdateResponse = await updateUserProfile(userResponse.data.body, loginResponse.data.body.token);
        console.log('userResponse', userResponse.data.body);


        if (userUpdateResponse.data.status !== 200) {
            setIsError(true);
            return
        }

        dispatch(
            authActions.login({ user: userResponse.data.body, token: loginResponse.data.body.token }),
        );

        console.log('isAuthenticated', dispatch(
            authActions.login({ user: userResponse.data.body, token: loginResponse.data.body.token })))

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
                        <form onSubmit={handleLogin}>
                            <div className={styles['input-wrapper']}>
                                <label htmlFor="username" type="username" >Username</label>
                                <input
                                    name="username"
                                    type="username"
                                    id="username"
                                    autoComplete="off"
                                    ref={userNameRef}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                    defaultValue={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
