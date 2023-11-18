import React from "react";
import ClientNavbar from "./ClientNavbar";
import Table from "./Table";
import Topbar from "./Topbar";

const Home = () => {
  return (
    <div>
      <ClientNavbar />
      <div className="mx-[2%] mt-5">
        <Topbar />
      </div>
      <div className="mx-[2%] shadow-lg mt-[-10px]">
        <Table />
      </div>
    </div>
  );
};

export default Home;
