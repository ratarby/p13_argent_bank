import { configureStore } from '@reduxjs/toolkit'; // Importing the configureStore function from the Redux Toolkit library
import authReducer from './authSlice'; // Importing the authReducer function from the authSlice file

const localStorageToken = localStorage.getItem('token'); //  Extracting the 'token' data from local storage
const localStorageUserData = JSON.parse(localStorage.getItem('user')); // Extracting the 'user' data from local storage


const initializeState = { // Initial state for the store
    auth: { // Initial state for the 'auth' state
        token: localStorageToken || null, // Setting the 'token' data in the state to the value of the 'token' data in local storage, or null if it doesn't exist
        user: localStorageUserData || null, // Setting the 'user' data in the state to the value of the 'user' data in local storage, or null if it doesn't exist
        isAuthenticated: localStorageUserData ? true : false, // Setting the 'isAuthenticated' state to true if the 'user' data exists in local storage, otherwise it's set to false
    }

}

const store = configureStore({ // Creating a store with the configureStore function
    reducer: { // Defining the reducers for the store
        auth: authReducer, // Reducer for the 'auth' state
    },
    preloadedState: initializeState, // Preloaded state for the store
});

export default store; // Exporting the store
