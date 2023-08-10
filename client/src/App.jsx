import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { DashBoard, Leads, CreateLead, Tasks, Users, CashBook, Sales, Vouchers, Report, CreateUser, CreateTask, CreateSale, User, Request, Projects, CreateProject } from './Pages'
import ViewCashBook from './Pages/CashBook/ViewCashBook';
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import CreateVouchers from './Pages/Vouchers/CreateVouchers';
import ClientHeader from './Client Panel/Header/CleintHeader'
import Dashboard from './Client Panel/Dashboard/Dashboard';


const App = () => {

  const Layout1 = () => {
    return (
      <>
        <Header />
      </>
    )
  }

  const Layout2 = () => {
    return (
      <>
        <ClientHeader />
      </>
    )
  }

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Manager and Super Admin Routes */}
        <Route path='/' element={<Layout1 />}>
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

        {/* Client Panel Routes */}
        <Route path='/' element={<Layout2 />}>
          <Route path='/client/dashboard' element={<Dashboard />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App