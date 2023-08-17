import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { DashBoard, Leads, CreateLead, Tasks, CashBook, Sales, Vouchers, Report, Login, Register, CreateUser, CreateTask, CreateSale, User, Request, Projects, CreateProject, Employees, Clients, } from "./Pages";
import { ClientDashboard, Contact } from "./Client Panel/pages";
import { Navbar, Sidebar } from "./Components";
import { useSelector } from "react-redux";
import CreateCashBook from "./Pages/CashBook/CreateCashBook";
import Cookies from "js-cookie";

const App = () => {

  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector(state => state.user);

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [showSidebar, setShowSidebar] = useState(true);

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    if (window.innerWidth < 768) setShowSidebar(false);
    else setShowSidebar(true)
  }, [window.innerWidth]);
  useEffect(() => {
    console.log('loggedUser.role', loggedUser?.role)
  }, [loggedUser])


  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-200">
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {
        !loggedUser
          ?
          <div className="fullHeight flex justify-center items-center w-full overflow-y-scroll ">
            <Routes>
              <Route exact path="/auth/register" element={<Register />} />
              <Route exact path="/auth/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/auth/login" />} />
              <Route path="/:anyotherRoutes" element={<Navigate to="/auth/login" />} />
            </Routes>
          </div>
          :
          <div className="fullHeight flex w-full overflow-y-scroll pb-[2rem] ">
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            <div className="flex-[9] px-[1rem] py-[1rem] overflow-x-hidden ">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/auth/register" element={<Navigate to="/" />} />
                <Route path="/auth/login" element={<Navigate to="/" />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/leads/create" element={<CreateLead />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/create" element={<CreateTask />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/:userId" element={<User />} />
                <Route path="/authorization/request" element={<Request />} />
                <Route path="/cashbook" element={<CashBook />} />
                <Route path="/create/cashbook" element={<CreateCashBook />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/sales/create" element={<CreateSale />} />
                <Route path="/voucher" element={<Vouchers />} />
                <Route path="/report" element={<Report />} />

                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/contact" element={<Contact />} />

              </Routes>
            </div>
          </div>
      }
    </div>
  );
};

export default App;
