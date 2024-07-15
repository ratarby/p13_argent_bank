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
        const validateFirstName = (firstName) => {
            return firstName.trim().length > 0;
        }

        if (!validateFirstName(value)) {
            setErrors({ ...errors, firstName: 'Please enter a valid firstname' });
        }
        setFirstName(event.target.value)
        setFirstName(value)
            ;

    }

    // handleLastNameChange
    const handleLastNameChange = (event) => {
        const validateLastName = (lastName) => {
            return lastName.trim().length > 0;
        }
        const value = event.target.value;
        if (!validateLastName(value)) {
            setErrors({ ...errors, lastName: 'Please enter a valid lastname' });
        }
        setLastName(event.target.value);
        setLastName(value);
    }


    const handleSave = async (event) => {
        event.preventDefault();

        //firstName, lastName, password validation
        const validateFirstName = (firstName) => {
            return firstName.trim().length > 0;
        }
        // lastName validation
        const validateLastName = (lastName) => {
            return lastName.trim().length > 0;
        }

        // password validation from local storage (hide)
        if (!validateFirstName(firstName)) {
            setErrors({ ...errors, firstName: 'Please enter a valid firstname' });
        }
        if (!validateLastName(lastName)) {
            setErrors({ ...errors, lastName: 'Please enter a valid lastname' });
        }


        if (!validateFirstName(firstName) || !validateLastName(lastName)) {
            navigate('/')
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user')).password || {};

        const user = {
            firstName,
            lastName,
            password: storedUser.password || ''
        }


        // call user update profile endoint
        const userUpdateResponse = await updateUserProfile(user, token);
        console.log('userUpdateResponse', userUpdateResponse);

        if (userUpdateResponse.status !== 200) {
            navigate('/')
            return
        }

        dispatch(
            authActions.updateProfile({ 
                user: userUpdateResponse.data.body, password: userUpdateResponse.data.body?.password, token:  token }),            
        )
        console.log('update profile success:', user, 'token:', token);
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
                                    placeholder={user.firstName}
                                    autoComplete='off'
                                    onChange={handleFirstNameChange}
                                    value={firstName}
                                /> <br />
                                {errors && <p className={styles['error-message-userEdit-firstName']}>{errors.firstName}</p>}
                            </div>
                            <div className={styles['input-lastname-userEdit']}>
                                <input className={styles['lastName-userEdit']} type="text"
                                    name='name'
                                    placeholder={user.lastName}
                                    autoComplete='off'
                                    onChange={handleLastNameChange}
                                    value={lastName}
                                /> <br />
                                {errors && <p className={styles['error-message-userEdit-lastName']}>{errors.lastName}</p>}
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