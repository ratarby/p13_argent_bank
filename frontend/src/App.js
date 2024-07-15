import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../src/components/Layout/Layout'
import Home from './../src/pages/Home/Home'
import Error from './../src/pages/Error/Error'
import SignIn from './../src/pages/SignIn/SignIn'
import BalanceAccount from './../src/pages/BalanceAccount/BalanceAccount'
import Profile from './pages/Profile/Profile'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from './store/authSlice';


export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);



  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(
      authActions.loadUserFromStorage());
  }, [dispatch, isAuthenticated]);

  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={!isAuthenticated ?  <SignIn /> :   <Navigate to="/profile" /> }
        />
        <Route path="balanceaccount" element={<BalanceAccount />} />
        <Route path="profile"element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />}
        />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
