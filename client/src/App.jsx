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
  Projects,
  Employees,
  Clients,
  CreateCashBook,
  ViewCashBook,
  Lead,
  Notifications,
  Inventory,
  Societies,
  Ledger,
} from "./Pages";
import { Navbar, Sidebar } from "./Components";
import { useSelector } from "react-redux";
import Home from "./Client Panel/pages/Dashboard/Home";
import ClientHeader from "./Client Panel/components/ClientHeader";
import ClientProjects from "./Client Panel/pages/Your Projects/ClientProjects";
import Contact from "./Client Panel/pages/Contact Us/Contact";
import RefundForm from "./Pages/Refund/Refund";
import SettingNavbar from "./Pages/Settings/Components/Navbar/SettingNavbar";
import SettingDashboard from "./Pages/Settings/DashBoard/SettingDashboard";
import { Path } from "./utils";
import SettingSidebar from "./Pages/Settings/Components/Sidebar/SettingSidebar";
import SettingProject from "./Pages/Settings/Project/SettingProject";
import SettingLead from "./Pages/Settings/Leads/SettingLead";
import SettingTask from "./Pages/Settings/Task/SettingTask";
import SettingUser from "./Pages/Settings/User/SettingUser";
import SettingSale from "./Pages/Settings/Sale/SettingSale";
import SettingVoucher from "./Pages/Settings/Voucher/SettingVoucher";
import SettingCashbook from "./Pages/Settings/Cashbook/SettingCashbook";
import SettingAuth from "./Pages/Settings/Authorization/SettingAuth";

const App = () => {
  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const pathArr = pathname.split("/").filter((item) => item !== "");
  const showSidebarForSettings = !pathArr.includes("/settings");

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [showSidebar, setShowSidebar] = useState(true);

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    if (window.innerWidth < 768) setShowSidebar(false);
    else setShowSidebar(true);
  }, [window.innerWidth]);

  const ClientPanelLayout = () => <ClientHeader />;

  ///////////////////////////////////// Functions ////////////////////////////////////////
  const Layout = () => {
    return (
      <div className="flex">
        <div className={`${showSidebar ? "w-[250px]" : ""}`}>
          <SettingSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
        <div className="w-full sticky">
          <SettingNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/settings" element={<Layout />}>
          <Route path="/settings/dashboard" element={<SettingDashboard />} />
          <Route path="/settings/project" element={<SettingProject />} />
          <Route path="/settings/lead" element={<SettingLead />} />
          <Route path="/settings/task" element={<SettingTask />} />
          <Route path="/settings/user" element={<SettingUser />} />
          <Route path="/settings/sale" element={<SettingSale />} />
          <Route path="/settings/voucher" element={<SettingVoucher />} />
          <Route path="/settings/cashbook" element={<SettingCashbook />} />
          <Route path="/settings/authorization" element={<SettingAuth />} />
        </Route>
      </Routes>
      <div className="flex flex-col w-full h-full bg-[#f6f9fa]">
        {!loggedUser ? (
          <div className="flex justify-center items-center w-full ">
            <Routes>
              <Route exact path="/auth/register" element={<Register />} />
              <Route exact path="/auth/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/auth/login" />} />
              <Route path="/:anyotherRoutes" element={<Navigate to="/auth/login" />} />
            </Routes>
          </div>
        ) : (
          <div className="flex h-screen font-primary">
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div
              className={`${showSidebar ? "w-full " : "w-full "} flex flex-col overflow-y-scroll `}>
              <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
              <div className="flex p-[1rem] w-full">
                <Routes>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/auth/register" element={<Navigate to="/" />} />
                  <Route path="/auth/login" element={<Navigate to="/" />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/societies" element={<Societies />} />
                  <Route path="/leads/refund" element={<RefundForm />} />
                  <Route path="/myLeads" element={<Leads type="mine" />} />
                  <Route path="/leads" element={<Leads type="all" />} />
                  <Route path="/leads/ledger" element={<Ledger />} />
                  <Route path="/leads/:leadId" element={<Lead />} />
                  <Route path="/leads/followUps" element={<Navigate to='/leads' />} />
                  <Route path="/leads/followUps/:leadId" element={<FollowUps />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/users/:userId" element={<User />} />
                  <Route path="/authorization/request" element={<Request />} />
                  <Route path="/authorization/refund" element={<Refunds />} />
                  <Route path="/cashbook" element={<CashBook />} />
                  <Route path="/cashbook/create" element={<CreateCashBook />} />
                  <Route path="/view/cashbook" element={<ViewCashBook />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/sales/create" element={<CreateSale />} />
                  <Route path="/voucher" element={<Vouchers showSidebar={showSidebar} />} />
                  <Route path="/notifications" element={<Notifications />} />
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
    </div>
  );
};

export default App;
