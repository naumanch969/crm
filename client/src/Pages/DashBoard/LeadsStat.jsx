import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const projectsData = [
  {
    name: "Project 1",
    leads: 10,
  },
  {
    name: "Project 2",
    leads: 7,
  },
  {
    name: "Project 3",
    leads: 6,
  },
  {
    name: "Project 4",
    leads: 5,
  },
  {
    name: "Project 5",
    leads: 2,
  },
  {
    name: "Project 6",
    leads: 0,
  },
  {
    name: "Project 7",
    leads: 9,
  },
];

const priorityVise = [
  {
    name: "Very Hot",
    leads: 10,
  },
  {
    name: "Hot",
    leads: 7,
  },
  {
    name: "Moderate",
    leads: 6,
  },
  {
    name: "Cold",
    leads: 5,
  },
  {
    name: "Very Cold",
    leads: 2,
  },
];

const sourceVise = [
  {
    name: "Instagram",
    leads: 10,
  },
  {
    name: "Facebook",
    leads: 7,
  },
  {
    name: "Facebook Comment",
    leads: 6,
  },
  {
    name: "Friend and Family",
    leads: 5,
  },
  {
    name: "Direct Call",
    leads: 2,
  },
  {
    name: "Google",
    leads: 0,
  },
  {
    name: "Referral",
    leads: 9,
  },
];

const StatusVise = [
  {
    name: "New",
    leads: 23,
  },
  {
    name: "Closed (Lost)",
    leads: 10,
  },
  {
    name: "Closed (Won)",
    leads: 7,
  },
  {
    name: "Meeting (Done)",
    leads: 6,
  },
  {
    name: "Meeting (Attempt)",
    leads: 5,
  },
  {
    name: "Followed Up (Call)",
    leads: 2,
  },
  {
    name: "Followed Up (Email)",
    leads: 2,
  },
  {
    name: "Contacted Client (Call)",
    leads: 1,
  },
  {
    name: "Contacted Client (Call Attempt)",
    leads: 1,
  },
  {
    name: "Contacted Client (Email)",
    leads: 1,
  },
];

const LeadsStat = () => {
  const [selectedValue, setSelectedValue] = useState("projectsVise");
  const [displayValue, setDisplayValue] = useState("projectsVise");

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    setDisplayValue(selectedOption); // Update the display value
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 pb-5">
        <div className="text-xl font-primary">View Leads : </div>
        <div className="flex items-center gap-2 w-3/12">
          {selectedValue === "" ? (
            <InputLabel
              sx={{
                color: "#B3B3B3",
                fontFamily: "'Montserrat', sans-serif",
                paddingTop: "8px",
              }}></InputLabel>
          ) : null}
          <Select
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            value={selectedValue}
            onChange={handleChange}
            fullWidth
            size="small">
            <MenuItem value="projectsVise">Projects Vise</MenuItem>
            <MenuItem value="StatusVise">Status Vise</MenuItem>
            <MenuItem value="priorityVise">Priority Vise</MenuItem>
            <MenuItem value="sourceVise">Source Wise</MenuItem>
          </Select>
        </div>
      </div>
      <BarChart
        width={window.innerWidth - 250}
        height={500}
        data={displayValue == "projectsVise" ? projectsData : displayValue == "sourceVise" ? sourceVise : displayValue == "StatusVise" ? StatusVise : priorityVise}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="leads" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default LeadsStat;
