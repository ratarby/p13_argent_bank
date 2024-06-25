import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navigation.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { useSelector } from 'react-redux';




export default function Navigation() {
    const user = useSelector((state) => state.auth.user);
    console.log('user (firstName)', user)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log('isAuthenticated', isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate('/');
    }

    return (
        <nav className={styles['main-nav']}>
            {/* Nav Right */}
            <div className={styles['nav-right']}>
                {!isAuthenticated  && (
                    <NavLink to="signin" className={styles['main-nav-item']}>
                        <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} /> Sign In
                    </NavLink>
                )}
            </div>
            <div className={styles['nav-right']}>
                {isAuthenticated  && (
                    <NavLink to="/" className={styles['main-nav-item']}>
                        <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} /> 
                        <span className={styles['user-name']}>{user.firstName}</span>
                    </NavLink>
                )}
            </div>
            <div className={styles['nav-right']}>
                {isAuthenticated  && (
                    <NavLink to="/" className={styles['main-nav-item']} >
                        <LogoutIcon className={styles['css-i4bv87-MuiSvgIcon-root']} onClick={handleLogout} />
                        Sign Out
                    </NavLink>
                )}
            </div>

        </nav>)
}
