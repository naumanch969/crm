import React from "react";
import Cards from "./Cards";
import Carousel from "./Carousel";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Cards />
      <div className="text-4xl flex justify-center text-blue-950 font-semibold">Offered Programs</div>
      <Carousel />
    </div>
  );
};

export default Dashboard;
