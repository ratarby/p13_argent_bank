import React, { useState } from 'react'
import styles from './Profile.module.css'
import { accounts } from '../../data/accounts'
// import { individualAccountName } from '../../data/accounts'
import AccountUserEdit from '../../components/AccountUserEdit/AccountUserEdit';
import { useSelector } from 'react-redux';
// import { authActions } from '../../store/authSlice';
import { } from 'react-redux';
// import {   userLogin, userProfile, updateUserProfile } from '../../utils/requestApi';



export default function Profile() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    console.log('user', user);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
    });
    const [firstName, setFirstName] = useState('firstName');
    const [lastName, setLastName] = useState('lastName');
    const [toggle, setToggle] = useState(false);

    // const dispatch = useDispatch();


    const handleToggle = () => {
        setToggle(!toggle);
    }


    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        const validateFirstName = (firstName) => {
            return firstName.trim().length > 0;
        }
        // if (validateFirstName(value)) {
        //     setErrors({ ...errors, firstName: '' });
        //     setFirstName(value);
        // } else {
        //     setErrors({ ...errors, firstName: 'Please enter a valid first name' });
        // }
        if(!validateFirstName(value)){
            setErrors({ ...errors, firstName: 'Please enter a valid firstname' });
        } 
        setFirstName(event.target.value);
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const validateLastName = (lastName) => {
            return lastName.trim().length > 0;
        }
        const value = event.target.value;
        // if (validateLastName(value)) {
        //     setErrors({ ...errors, lastName: '' });
        //     setLastName(value);
        // }
        // setLastName(event.target.value);
        if(!validateLastName(value)){
            setErrors({ ...errors, lastName: 'Please enter a valid lastname' });
        } 
        setLastName(event.target.value);
        setLastName(value);
    }




    // const { firstName, lastName } = individualAccountName[0];

    return (
        <main className={styles['main-balance-userEdit']}>
            {isAuthenticated && !toggle && (<div className={styles['welcome-back-userEdit']}>
                <h1>Welcome back <br />{user.firstName} {user.lastName}!</h1>
                <button className={styles['edit-button-userEdit']} onClick={handleToggle}>Edit Name</button>
                {accounts.map(account => (
                    <AccountUserEdit
                        key={account.id}
                        title={account.title}
                        balance={account.balance}
                        description={account.description}
                    />
                ))}
            </div>)}
            {isAuthenticated && toggle && (<div>
                <div className={styles['welcome-back-userEdit']}>
                    <h1>Welcome back</h1>
                    <form id='name' >
                        <div className={styles['inputs-container-userEdit']}>
                            <div className={styles['input-firstname-userEdit']}>
                                <input className={styles['firstName-userEdit']} type="text"
                                    name='name'
                                    placeholder={user.firstName}
                                    autoComplete='off'
                                    onChange={handleFirstNameChange}
                                    value={firstName}
                                />
                            </div>
                            <div className={styles['input-lastname-userEdit']}>
                                <input className={styles['lastName-userEdit']} type="text"
                                    name='name'
                                    placeholder={user.lastName}
                                    autoComplete='off'
                                    onChange={handleLastNameChange}
                                    value={lastName}
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