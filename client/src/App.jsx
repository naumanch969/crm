import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  DashBoard,
  Leads,
  FollowUps,
  Tasks,
  CashBook,
  Sales,
  Vouchers,
  Login,
  Register,
  CreateSale,
  User,
  Request,
  Refunds,
  Employees,
  Clients,
  Inventories,
  Societies,
  Projects,
  CreateCashBook,
  ViewCashBook,
  Lead,
  Notifications,
  Ledger,
  AllFollowUps,
  ForgotPassword,
  InputCode,
  ResetPassword,
  Transcript,
} from "./Pages";
import { Navbar, Sidebar } from "./Components";
import { useSelector } from "react-redux";
import LeadRefunds from "./Pages/Leads/Refund/Refund";
import VoucherPage from "./Pages/Vouchers/VoucherPage";
import Home from "./ClientPanel/Home";
import TranscriptPage from "./Pages/Transcript/TranscriptPage";

const App = () => {
  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const pathArr = pathname.split("/").filter((item) => item != "");
  const showSidebarForSettings = !pathArr.includes("/settings");

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [showSidebar, setShowSidebar] = useState(true);

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    if (window.innerWidth < 768) setShowSidebar(false);
    else setShowSidebar(true);
  }, [window.innerWidth]);

  ///////////////////////////////////// Functions ////////////////////////////////////////

  return (
    <div>
      <div className="flex flex-col w-full h-screen bg-[#f6f9fa]">
        {!loggedUser ? (
          <div className={`flex justify-center items-center w-full `}>
            <Routes>
              <Route exact path="/auth/register" element={<Register />} />
              <Route exact path="/auth/login" element={<Login />} />
              <Route exact path="/auth/forgot_password" element={<ForgotPassword />} />
              <Route exact path="/auth/newpassword" element={<ResetPassword />} />
              <Route exact path="/auth/forgot_password/enter_code" element={<InputCode />} />
              <Route exact path="/auth/change_password" element={<Navigate to="/auth/register" />} />
              <Route path="/" element={<Navigate to="/auth/login" />} />
              <Route path="/:anyotherRoutes" element={<Navigate to="/auth/login" />} />
            </Routes>
          </div>
        ) : loggedUser.role != "client" ? (
          <div
            className={`flex h-screen font-primary ${`${pathname.includes("/client/") || pathname.includes("download") ? "hidden" : "visible"}`}`}>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div
              className={`${showSidebar ? "w-full " : "w-full "} flex flex-col overflow-y-scroll `}>
              <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
              <div className="flex p-[1rem] w-full">
                <Routes>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/auth/register" element={<Navigate to="/" />} />
                  <Route path="/auth/login" element={<Navigate to="/" />} />
                  <Route path="/myLeads" element={<Leads />} />
                  <Route path="/leads" exact element={<Leads />} />
                  <Route path="/leads/call-reminders" element={<AllFollowUps />} />
                  <Route path="/leads/ledger" element={<Navigate to="/leads" />} />
                  <Route path="/leads/ledger/:leadId" element={<Ledger />} />
                  <Route path="/leads/:leadId" element={<Lead />} />
                  <Route path="/leads/followUps" element={<Navigate to="/leads" />} />
                  <Route path="/leads/followUps/:leadId" element={<FollowUps />} />
                  <Route path="/leads/refund" element={<Navigate to="/leads" />} />
                  <Route path="/leads/refund/:leadId" element={<LeadRefunds />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/inventories" element={<Inventories />} />
                  <Route path="/societies" element={<Societies />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/users/:userId" element={<User />} />
                  <Route path="/authorization/request" element={<Request />} />
                  <Route path="/authorization/refund" element={<Refunds />} />
                  <Route path="/cashbook" element={<CashBook />} />
                  <Route path="/cashbook/create" element={<CreateCashBook />} />
                  <Route path="/view/cashbook" element={<ViewCashBook />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/sales/create" element={<CreateSale />} />
                  <Route path="/transcript" element={<Transcript />} />
                  <Route path="/voucher" element={<Vouchers showSidebar={showSidebar} />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/client" element={<Home />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}

        <Routes>
          <Route path="/download/transcript" element={<TranscriptPage />} />
          <Route path="/download/voucher" element={<VoucherPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
