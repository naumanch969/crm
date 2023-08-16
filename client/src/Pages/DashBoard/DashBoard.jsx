import { Box } from "@mui/material";
import React from "react";
import PaymentStats from "./PaymentStats";
import IncomeAndExpense from "./IncomeAndExpense";
import LeadsStat from "./LeadsStat";
import LatestActivity from "./LatestActivity";
import ProjectsStats from "./ProjectsStats";

function DashBoard() {


  //////////////////////////////////// VARIABLES ///////////////////////////////////////////

  //////////////////////////////////// STATES //////////////////////////////////////////////

  //////////////////////////////////// USE EFFECTS /////////////////////////////////////////


  //////////////////////////////////// FUNCTIONS ///////////////////////////////////////////




  return (
    <div className='w-full h-auto'>

      <PaymentStats />

      <Box className="flex mt-5">
        <IncomeAndExpense />
        <LeadsStat />
      </Box>

      <Box className='flex '>
        <LatestActivity />
        <ProjectsStats />
      </Box>

    </div>
  );
}

export default DashBoard;
