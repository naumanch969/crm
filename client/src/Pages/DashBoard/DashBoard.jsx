import { Box } from "@mui/material";
import React, { useEffect } from "react";
import PaymentStats from "./PaymentStats";
import IncomeAndExpense from "./IncomeAndExpense";
import LeadsStat from "./LeadsStat";
import ProjectsStats from "./ProjectsStats";
import Messages from "./Messages";

function DashBoard() {

  return (
    <div className="w-full h-auto">
      <PaymentStats />

      <Box className="flex-none mt-5 md:flex">
        <IncomeAndExpense />
        <LeadsStat />
      </Box>

    </div>
  );
}

export default DashBoard;
