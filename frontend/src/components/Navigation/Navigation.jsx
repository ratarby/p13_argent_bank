import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { useSelector } from 'react-redux';




export default function Navigation() {
    const firstName = useSelector((state) => state.auth.user?.firstName);
    console.log('firstName', firstName);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log('isAuthenticated', isAuthenticated);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    }

    return (
        <nav className={styles['main-nav']}>
            {/* Nav Right */}
            <div className={styles['nav-right']}>
                {!isAuthenticated  && (
                    <Link to="signin" className={styles['main-nav-item']}>
                        <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} /> Sign In
                    </Link>
                )}
            </div>
            <div className={styles['nav-right']}>
                {isAuthenticated  && (
                    <Link to="/" className={styles['main-nav-item']}>
                        <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} /> 
                        <span className={styles['user-name']}>{firstName}</span>
                    </Link>
                )}
            </div>
            <div className={styles['nav-right']}>
                {isAuthenticated  && (
                    <Link to="/" className={styles['main-nav-item']} >
                        <LogoutIcon className={styles['css-i4bv87-MuiSvgIcon-root']} onClick={handleLogout} />
                        Sign Out
                    </Link>
                )}
            </div>

        </nav>)
}
