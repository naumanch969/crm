import React from "react";
import Cards from "./Cards";
import Progress from "./Progress";

function ClientProjects() {
  return (
    <div className="h-screen w-screen">
      <Cards />
      <div className="text-4xl flex justify-center text-blue-950 font-semibold">
        Offered Programs
      </div>
      <Progress />
    </div>
  );
}

export default ClientProjects;
