import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/img/argent-bank-logo.png'
import Navigation from '../Navigation/Navigation'

export default function Header() {
    return (
        <nav className={styles['main-nav']}>
            {/* Logo */}
            <Link to="/" className={styles['main-nav-logo']}>
                <img
                    className={styles['main-nav-logo-image']}
                    src={logo}
                    alt="Argent Bank Logo"
                />
            </Link>
            <Navigation />
        </nav>

    )
}
