import React from 'react'
import styles from './Accounts.module.css'

export default function Accounts({ title, balance, description }) {

    return (

        <div className={styles['account']}>
            <div>
                <div className={styles['account-title']}>{title}</div>
                <div className={styles['account-amount']}>{balance}</div>
                <div className={styles['account-description']}>{description}</div>
            </div>
            <button className={styles['transaction-button']}>
                <p>View Transactions</p>
            </button>
        </div>


    );
}






