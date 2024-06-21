import React from 'react'
import styles from './AccountUserEdit.module.css'

export default function AccountUserEdit({ title, balance, description }) {

    return (

        <div className={styles['account-userEdit']}>
            <div>
                <div className={styles['accountt-title-userEdit']}>{title}</div>
                <div className={styles['account-amount-userEdit']}>{balance}</div>
                <div className={styles['account-description-userEdit']}>{description}</div>
            </div>
            <button className={styles['transaction-button-userEdit']}>
                <p>View Transactions</p>
            </button>
        </div>


    );
}






