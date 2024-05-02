import React from 'react'
import styles from './BalanceAccount.module.css'
import { accounts } from '../../data/accounts'
import { individualAccountName } from '../../data/accounts'
import Account from '../../components/Account/Accounts';


export default function BalanceAccount( ) {
    const { firstName, lastName } = individualAccountName[0];

    return (
        <main className={styles['main-balance']}>
            <div className={styles['welcome-back']}>
                <h1>Welcome back <br />{firstName} {lastName}!</h1>
                <button className={styles['edit-button']}>Edit Name</button>
            </div>
            <div>
                {accounts.map(account => (
                    <Account 
                        key={account.id} 
                        title={account.title} 
                        balance={account.balance}
                        description={account.description}
                        />
                ))}
            </div>
        </main>
    );
}






