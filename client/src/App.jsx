import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { DashBoard, Leads, CreateLead, Tasks, CashBook, Sales, Vouchers, Login, Register, CreateUser, CreateTask, CreateSale, User, Request, Projects, CreateProject, Employees, Clients, CreateCashBook, ViewCashBook, CreateVouchers, } from "./Pages";
import { Navbar, Sidebar } from "./Components";
import { useSelector } from "react-redux";
import Home from "./Client Panel/pages/Dashboard/Home";
import ClientHeader from "./Client Panel/components/ClientHeader";
import ClientProjects from "./Client Panel/pages/Your Projects/ClientProjects";
import Contact from "./Client Panel/pages/Contact Us/Contact";

const App = () => {

  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector(state => state.user);

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [showSidebar, setShowSidebar] = useState(true);

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    if (window.innerWidth < 768) setShowSidebar(false);
    else setShowSidebar(true);
  }, [window.innerWidth]);

  const Layout = () => {
    return (
      <>
        <div className={`h-full ${showSidebar ? "mr-[224px]" : "m-0"}`}>
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
        <div className={`w-full h-full bg-gray-100 sticky`}>
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </>
    );
  };

  const ClientPanelLayout = () => (<ClientHeader />)


  return (
    <div className="flex flex-col w-full h-full bg-gray-100">


      {!loggedUser ? (
        <div className="flex justify-center items-center w-full ">
          <Navbar />
          <Routes>
            <Route exact path="/auth/register" element={<Register />} />
            <Route exact path="/auth/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/:anyotherRoutes" element={<Navigate to="/auth/login" />} />
          </Routes>
        </div>
      ) : (
        <div className="flex  ">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className={`${showSidebar ? 'md:w-[85vw] w-full ' : 'w-full '} flex flex-col`}>
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div className="flex p-[1rem] w-full">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/auth/register" element={<Navigate to="/" />} />
                <Route path="/auth/login" element={<Navigate to="/" />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/myLeads" element={<Leads type='mine' />} />
                <Route path="/leads" element={<Leads type='all' />} />
                <Route path="/leads/create" element={<CreateLead />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/create" element={<CreateTask />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/:userId" element={<User />} />
                <Route path="/authorization/request" element={<Request />} />
                <Route path="/cashbook" element={<CashBook />} />
                <Route path="/cashbook/create" element={<CreateCashBook />} />
                <Route path="/view/cashbook" element={<ViewCashBook />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/sales/create" element={<CreateSale />} />
                <Route path="/voucher" element={<Vouchers showSidebar={showSidebar} />} />
                <Route path="/voucher/create" element={<CreateVouchers />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/client" element={<ClientPanelLayout />}>
          <Route path="/client/home" element={<Home />} />
          <Route path="/client/projects" element={<ClientProjects />} />

          <Route path="/client/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
