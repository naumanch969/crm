import { Box } from "@mui/material";
import React, { useEffect } from "react";
import PaymentStats from "./PaymentStats";
import IncomeAndExpense from "./IncomeAndExpense";
import LeadsStat from "./LeadsStat";
import ProjectsStats from "./ProjectsStats";
import Messages from "./Messages";
import MeetingCalendar from "./MeetingCalendar/MeetingCalendar";

function DashBoard() {
  return (
    <div className="w-full h-auto">
      <PaymentStats />
      <div className="p-4 bg-white my-4 rounded-md">
        <MeetingCalendar />
      </div>
      <div className="mt-5">
        <IncomeAndExpense />
      </div>

      <div className="mt-5 py-10 bg-white rounded-md">
        <LeadsStat />
      </div>
    </div>
  );
}

export default DashBoard;
