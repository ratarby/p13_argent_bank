import React, { useState } from 'react'
import styles from './Profile.module.css'
import { accounts } from '../../data/accounts'
// import { individualAccountName } from '../../data/accounts'
import AccountUserEdit from '../../components/AccountUserEdit/AccountUserEdit';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../utils/requestApi';
import { authActions } from '../../store/authSlice';




export default function Profile() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    console.log('user', user);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
    });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [toggle, setToggle] = useState(false);
    const regexExp = /^[a-zA-Z][a-zA-ZàèçÀÈÇ'-]*$/;


    const hasError = firstName === '' || lastName === '';
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const handleToggle = () => {
        if (!isAuthenticated) {
            navigate('/');
            return
        }
        setToggle(!toggle);
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }

    // handleFirstNameChange
    const handleFirstNameChange = (event) => {
        const value = event.target.value;

        if (!isAuthenticated) {
            navigate('/');
            return
        }
        if (!firstName) {
            setErrors(hasError && regexExp.test(!value));
        }
        if (value.trim().length === 0) {
            setErrors({ ...errors, firstName: 'First name cannot be empty '});
        } 
        if (!regexExp.test(value)) {
            setErrors({ ...errors, firstName: 'Please enter a valid first name' });
        }
        setFirstName(event.target.value && value);
    }

    // handleLastNameChange
    const handleLastNameChange = (event) => {
        const value = event.target.value;

        if (value.trim().length === 0) {
            setErrors({ ...errors, lastName: 'Last name cannot be empty '});
        } 
        if (!regexExp.test(value)) {
            setErrors({ ...errors, lastName: 'Please enter a valid last name' });
        }
        setLastName(event.target.value && value);
    }


    const handleSave = async (event) => {
        event.preventDefault();
    
        let hasErrors = false;
    
        if (firstName.trim().length === 0) {
            setErrors(prev => ({ ...prev, firstName: 'First name cannot be empty' }));
            hasErrors = true;
        }
        if (!regexExp.test(firstName)) {
            setErrors(prev => ({ ...prev, firstName: 'Please enter a valid first name' }));
            hasErrors = true;
        }
    
        if (lastName.trim().length === 0) {
            setErrors(prev => ({ ...prev, lastName: 'Last name cannot be empty' }));
            hasErrors = true;
        }
        if (!regexExp.test(lastName)) {
            setErrors(prev => ({ ...prev, lastName: 'Please enter a valid last name' }));
            hasErrors = true;
        }

        if (hasErrors) {
            // Keep form open if there are errors
            return;
        }
    
        if (!hasErrors) {
            const user = {
                firstName,
                lastName,
            };
    
            const userUpdateResponse = await updateUserProfile(user, token);
    
            if (userUpdateResponse.data.status !== 200) {
                navigate('/');
                return;
            }
            dispatch(
                authActions.updateProfile({
                    user: userUpdateResponse.data.body,
                    token: token
                })
            );
        }
        setToggle(toggle);
    };
    

    /**
     * Handles the cancel action for the profile.
     *
     * Retrieves the user from local storage and the token from local storage.
     * Toggles the toggle state.
     * Sets the first name and last name from the user retrieved from local storage.
     * Dispatches the cancelUpdateProfile action with the user and token.
     *
     * @return {void}
     */
    const handleCancel = () => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        const tokenFromLocalStorage = localStorage.getItem('token');
        console.log('userFromLocalStorage',  userFromLocalStorage);
        setErrors(false)
        setToggle(!toggle);
        setFirstName(userFromLocalStorage.firstName);
        setLastName(userFromLocalStorage.lastName);

        dispatch(authActions.cancelUpdateProfile({
            user:  user,
            token: tokenFromLocalStorage
        }))
        console.log('cancel success:', user, 'token:', tokenFromLocalStorage);

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
                    <form id='name' onSubmit={handleSave}>
                        <div className={styles['inputs-container-userEdit']}>
                            <div className={styles['input-firstname-userEdit']}>
                                <input className={styles['firstName-userEdit']} type="text"
                                    name='name'
                                    autoComplete='off'
                                    onChange={handleFirstNameChange}
                                    value={firstName}
                                /> <br />
                                {errors && <p className={styles['error-message-userEdit-firstName']}>{errors.firstName}</p>}
                            </div>
                            <div className={styles['input-lastname-userEdit']}>
                                <input className={styles['lastName-userEdit']} type="text"
                                    name='name'
                                    autoComplete='off'
                                    onChange={handleLastNameChange}
                                    value={lastName}
                                /> <br />
                                {errors && <p className={styles['error-message-userEdit-lastName']}>{errors.lastName}</p>}
                            </div>

                        </div>
                        <div className={styles['btns-container-userEdit']}>
                            <button type="submit" className={styles['edit-btn-save-userEdit']}>Save</button>
                            <button type="button" className={styles['edit-btn-cancel-userEdit']} onClick={handleCancel}>Cancel</button>
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