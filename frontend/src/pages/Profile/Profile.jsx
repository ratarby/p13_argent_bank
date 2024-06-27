import React, { useState } from 'react'
import styles from './Profile.module.css'
import { accounts } from '../../data/accounts'
// import { individualAccountName } from '../../data/accounts'
import AccountUserEdit from '../../components/AccountUserEdit/AccountUserEdit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function Profile() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    const handleToggle = () => {
        if (!isAuthenticated) {
            navigate('/signin');
            return;
        }
        setToggle(!toggle);
    }
    

    // const { firstName, lastName } = individualAccountName[0];

    return (
        <main className={styles['main-balance-userEdit']}>
            {isAuthenticated && !toggle && (<div className={styles['welcome-back-userEdit']}>
                <h1>Welcome back <br />{user.firstName} {user.lastName}!</h1>
                <button className={styles['edit-button-userEdit']}onClick={handleToggle}>Edit Name</button>
            </div>)}
            { isAuthenticated  && toggle && (<div>
                <div className={styles['welcome-back-userEdit']}>
                <h1>Welcome back</h1>
                <form id='name' >
                    <div className={styles['inputs-container-userEdit']}>
                        <div className={styles['input-firstname-userEdit']}>
                            <input className={styles['firstName-userEdit']} type="text"
                            name='name'
                            placeholder={user.firstName}
                            autoComplete='off'
                            />
                        </div>
                        <div className={styles['input-lastname-userEdit']}>
                            <input className={styles['lastName-userEdit']} type="text"
                            name='name'
                            placeholder={user.lastName}
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
                {accounts.map(account => (
                    <AccountUserEdit 
                        key={account.id} 
                        title={account.title} 
                        balance={account.balance}
                        description={account.description}
                        />
                ))}
            </div>)}
        </main>
    );
}






