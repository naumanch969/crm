import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getLeadsStat } from "../../redux/action/lead";
import { useDispatch, useSelector } from "react-redux";


const priorities = [
  { name: "Very Hot", value: 'veryHot' },
  { name: "Hot", value: 'hot' },
  { name: "Moderate", value: 'moderate' },
  { name: "Cold", value: 'cold' },
  { name: "Very Cold", value: 'veryCold' },
];
  
const sources = [
  { name: "Instagram", value: 'instagram' },
  { name: "Facebook", value: 'facebook' },
  { name: "Facebook Comment", value: 'facebookComment' },
  { name: "Friend and Family", value: 'friendAndFamily' },
  { name: "Direct Call", value: 'directCall' },
  { name: "Google", value: 'google' },
  { name: "Referral", value: 'referral' },
];

const statuses = [
  { name: "New", value: 'new' },
  { name: "Closed (Lost)", value: 'closedLost' },
  { name: "Closed (Won)", value: 'closedWon' },
  { name: "Meeting (Done)", value: 'meetingDone' },
  { name: "Meeting (Attempt)", value: 'meetingAttempt' },
  { name: "Followed Up (Call)", value: 'followedUpCall' },
  { name: "Followed Up (Email)", value: 'followedUpEmail' },
  { name: "Contacted Client (Call)", value: 'contactedClientCall' },
  { name: "Contacted Client (Call Attempt)", value: 'contactedClientCallAttempt' },
  { name: "Contacted Client (Email)", value: 'contactedClientEmail' },
];

const LeadsStat = () => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
  const { stats, leads } = useSelector(state => state.lead)
  const dispatch = useDispatch()
 

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
  const [type, setType] = useState('status')  // status, priority, property, source

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getLeadsStat(type))
  }, [type])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setType(selectedOption);
    setType(selectedOption); // Update the display value
  };


  return (
    <div>
      <div className="flex items-center justify-center gap-4 pb-5">
        <div className="text-xl font-primary">View Leads : </div>
        <div className="flex items-center gap-2 w-3/12">
          {type === "" ? (
            <InputLabel
              sx={{
                color: "#B3B3B3",
                fontFamily: "'Montserrat', sans-serif",
                paddingTop: "8px",
              }}></InputLabel>
          ) : null}
          <Select
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            value={type}
            onChange={handleChange}
            fullWidth
            size="small">
            <MenuItem value="degree">Degree Vise</MenuItem>
            <MenuItem value="visa">VISA Vise</MenuItem>
            <MenuItem value="status">Status Vise</MenuItem>
            <MenuItem value="priority">Priority Vise</MenuItem>
            <MenuItem value="source">Source Wise</MenuItem>
          </Select>
        </div>
      </div>
      <BarChart
        width={window.innerWidth - 250}
        height={500}
        data={stats}
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
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default LeadsStat;
