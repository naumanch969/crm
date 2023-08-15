import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { DashBoard, Leads, CreateLead, Tasks, Users, CashBook, Sales, Vouchers, Report, Login, Register, CreateUser, CreateTask, CreateSale, User, Request, Projects, CreateProject, } from "./Pages";
import { Navbar, Sidebar } from "./Components";
import { useSelector } from "react-redux";
import CreateCashBook from "./Pages/CashBook/CreateCashBook";
import ViewCashBook from "./Pages/CashBook/ViewCashBook";
import CreateVouchers from "./Pages/Vouchers/CreateVouchers";

const App = () => {

  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [showSidebar, setShowSidebar] = useState(true);

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    if (window.innerWidth < 768) setShowSidebar(false);
    else setShowSidebar(true)
  }, [window.innerWidth]);
 


  const Layout = () => {
    return (
      <>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="w-screen h-full bg-gray-100 flex-grow-[3]">
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      {!loggedUser ? (
        <div className="flex justify-center items-center w-full overflow-y-scroll ">
          <Routes>
            <Route exact path="/auth/register" element={<Register />} />
            <Route exact path="/auth/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/:anyotherRoutes" element={<Navigate to="/auth/login" />} />
          </Routes>
        </div>
      ) : (
        <div style={{ height: "100vh" }} className="flex w-full overflow-y-scroll ">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<DashBoard />} />
              <Route path="/auth/register" element={<Navigate to="/" />} />
              <Route path="/auth/login" element={<Navigate to="/" />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/create" element={<CreateProject />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/leads/create" element={<CreateLead />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/create" element={<CreateTask />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/authorization/request" element={<Request />} />
              <Route path="/cashbook" element={<CashBook />} />
              <Route path="/create/cashbook" element={<CreateCashBook />} />
              <Route path="/view/cashbook" element={<ViewCashBook />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/create" element={<CreateSale />} />
              <Route path="/voucher" element={<Vouchers />} />
              <Route path="/create/voucher" element={<CreateVouchers />} />
              <Route path="/report" element={<Report />} />
            </Route>
          </Routes>
        </div>
      )
      }
    </div>
  );
};

export default App;
