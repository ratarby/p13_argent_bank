import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../src/components/Layout/Layout'
import Home from './../src/pages/Home/Home'
import Error from './../src/pages/Error/Error'
import SignIn from './../src/pages/SignIn/SignIn'
import BalanceAccount from './../src/pages/BalanceAccount/BalanceAccount'

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="balanceaccount" element={<BalanceAccount />} />
        </Route>
        <Route path="*" element={<Error />} />
    </Routes>
  )
}

