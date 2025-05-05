import React from "react";
import ClientNavbar from "./ClientNavbar";
import ClientLeads from "./ClientLeads";
import Topbar from "./Topbar";

const Home = () => {
  return (
    <div>
      <ClientNavbar />
      <div className="mx-[2%] mt-5">
        <Topbar />
      </div>
      <div className="mx-[2%] shadow-lg mt-[-10px]">
        <ClientLeads />
      </div>
    </div>
  );
};

export default Home;
