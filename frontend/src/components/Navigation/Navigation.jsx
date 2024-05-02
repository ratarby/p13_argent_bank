import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navigation() {
    return (
        <nav className={styles['main-nav']}>
            {/* Nav Right */}
            <div className={styles['nav-right']}>                
                <Link to="signin" className={styles['main-nav-item']}>
                    <AccountCircleIcon  className={styles['css-i4bv87-MuiSvgIcon-root']}/> Sign In
                </Link>
            </div>
        </nav>)
}
