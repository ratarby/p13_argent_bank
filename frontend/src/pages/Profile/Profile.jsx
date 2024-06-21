import React from 'react'
import styles from './Profile.module.css'
import { accounts } from '../../data/accounts'
import { individualAccountName } from '../../data/accounts'
import AccountUserEdit from '../../components/AccountUserEdit/AccountUserEdit';



export default function Profile() {

    const { firstName, lastName } = individualAccountName[0];

    return (
        <main className={styles['main-balance-userEdit']}>
            <div className={styles['welcome-back-userEdit']}>
                <h1>Welcome back</h1>
                <form id='name' >
                    <div className={styles['inputs-container-userEdit']}>
                        <div className={styles['input-firstname-userEdit']}>
                            <input className={styles['firstName-userEdit']} type="text"
                            name='name'
                            placeholder={firstName}
                            autoComplete='off'
                            />
                        </div>
                        <div className={styles['input-lastname-userEdit']}>
                            <input className={styles['lastName-userEdit']} type="text"
                            name='name'
                            placeholder={lastName}
                            autoComplete='off'
                            />
                        </div>
                    </div>
                    <div className={styles['btns-container-userEdit']}>
                        <button type="submit" className={styles['edit-btn-save-userEdit']}>Save</button>
                        <button type="button" className={styles['edit-btn-cancel-userEdit']}>Cancel</button>
                    </div>
                </form>
            </div>
            <div>
                {accounts.map(account => (
                    <AccountUserEdit
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






