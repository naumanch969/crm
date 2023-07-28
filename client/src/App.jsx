import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { DashBoard, Leads, Tasks, Users, Authorizations, CashBook, Sales, Vouchers, Report, Login, Signup } from './Pages'

const App = () => {

  const Layout = () => {
    return (
      <>
        <Header />
      </>
    )
  }

  return (
    <div className='' >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<DashBoard />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/user' element={<Users />} />
          <Route path='/auths' element={<Authorizations />} />
          <Route path='/cashbook' element={<CashBook />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/voucher' element={<Vouchers />} />
          <Route path='/report' element={<Report />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App