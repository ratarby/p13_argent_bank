import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navigation.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';




export default function Navigation() {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        if (isAuthenticated) {
            dispatch(
                authActions.logout()
            );
            navigate('/');
        }
    }

    return (
        <nav className={styles['main-nav']}>
            <div className={styles['nav-right']}>
                {!isAuthenticated && (
                    <NavLink to="signin" className={styles['main-nav-item']}>
                        <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} />
                        Sign In
                    </NavLink>
                )}
                {isAuthenticated && (
                    <NavLink to="profile" className={styles['main-nav-item']}>
                        <AccountCircleIcon className={styles['css-i4bv87-MuiSvgIcon-root']} />
                        <span className={styles['user-name']}>{user.firstName}</span>
                    </NavLink>
                )}
            </div>
            {isAuthenticated && (
                <NavLink to="/" className={styles['main-nav-item']} onClick={handleLogout}>
                    <LogoutIcon className={styles['css-i4bv87-MuiSvgIcon-root']} />
                    Sign Out
                </NavLink>
            )}
        </nav>
    );
}
