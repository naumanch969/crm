import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { DashBoard, Leads, CreateLead, Tasks, Users, CashBook, Sales, Vouchers, Report, CreateUser, CreateTask, CreateSale, User, Request, Projects, CreateProject } from './Pages'
import ViewCashBook from './Pages/CashBook/ViewCashBook';
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import CreateVouchers from './Pages/Vouchers/CreateVouchers';


const App = () => {

  const Layout = () => {
    return (
      <>
        <Header />
      </>
    )
  }

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<DashBoard />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/create' element={<CreateProject />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/leads/create' element={<CreateLead />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tasks/create' element={<CreateTask />} />
          <Route path='/user' element={<Users />} />
          <Route path='/user/create' element={<CreateUser />} />
          <Route path='/user/:userId' element={<User />} />
          <Route path='/authorization/request' element={<Request />} />
          <Route path='/cashbook' element={<CashBook />} />
          <Route path='/view/cashbook' element={<ViewCashBook />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/sales/create' element={<CreateSale />} />
          <Route path='/voucher' element={<Vouchers />} />
          <Route path='/create/voucher' element={<CreateVouchers />} />
          <Route path='/report' element={<Report />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App