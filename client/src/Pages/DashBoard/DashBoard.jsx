import { Box, Card, CardContent, Chip, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
import { CreditCard } from "@mui/icons-material";

function DashBoard() {
  // <---------------------------- Line Chart ---------------------------------->

  const data = [
    {
      name: "Jan",
      Expenses: 4000,
      Income: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      Expenses: 3000,
      Income: 1398,
      amt: 2210,
    },
    {
      name: "March",
      Expenses: 2000,
      Income: 9800,
      amt: 2290,
    },
    {
      name: "April",
      Expenses: 2780,
      Income: 3908,
      amt: 2000,
    },
    {
      name: "May",
      Expenses: 1890,
      Income: 4800,
      amt: 2181,
    },
    {
      name: "June",
      Expenses: 2390,
      Income: 3800,
      amt: 2500,
    },
    {
      name: "July",
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: "Sept",
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: "Oct",
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: "Dec",
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
  ];

  let time;

  // <------------------------------------------------------------->

  // <--------------------- Pie Chart ----------------------------->


  const data1 = [
    { name: 'Successful', value: 6 },
    { name: 'Unsuccessful', value: 2 },
    { name: 'Under Process', value: 3 },
    { name: 'Declined', value: 1 },
    { name: 'Remaining', value: 3 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'rgb(220 38 38)'];

  // <-------------------------------------------------------------->

  // <---------------------- Latest Activity ----------------------->

  const allData = [
    {
      id: 1,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 2,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 3,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 4,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 5,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 6,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 7,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 8,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 9,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 10,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 11,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 12,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
    {
      id: 13,
      name: 'henry',
      time: 2,
      description: 'This is demo Description',
    },
  ]

  // <-------------------------------------------------------------->

  // <------------------------ Projects ---------------------------->

  const Projectsdata = [
    {
      id: 1,
      action: 'Not Started',
      assigned: 0,
    },
    {
      id: 2,
      action: 'In Progress',
      assigned: 3,
    },
    {
      id: 3,
      action: 'On Hold',
      assigned: 1,
    },
    {
      id: 4,
      action: 'Completed',
      assigned: 5,
    },
  ]

  // <------------------------------------------------------------>

  const currentYear = new Date().getFullYear();

  let IncomeSum = data.reduce(function (prev, current) {
    return prev + +current.Income
  }, 0);

  let ExpensesSum = data.reduce(function (prev, current) {
    return prev + +current.Expenses
  }, 0);

  return (
    <div className='w-full h-auto'>
      <Box className='w-auto columns-3'>
        <Link to='/cashbook'>
          <Card className='bg-white border-b-4 border-b-emerald-300'>
            <CardContent className="flex-grow-[1] flex justify-between items-center">
              <div>
                <p className='text-2xl font-Mulish'>$200.00</p>
                <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - Today</p>
              </div>
              <div className="flex justify-end items-center">
                <CreditCard sx={{ fontSize: "50px", fontWeight:'1px' }} className='text-emerald-300' />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to='/cashbook'>
          <Card className='bg-white border-b-4 border-b-sky-400'>
            <CardContent className="flex-grow-[1] flex justify-between items-center">
              <div>
                <p className='text-2xl font-Mulish'>$1500.00</p>
                <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - This Month</p>
              </div>
              <div className="flex justify-end items-center">
                <CreditCard sx={{ fontSize: "50px" }} className='text-sky-400' />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to='/cashbook'>
          <Card className='bg-white border-b-4 border-b-amber-400'>
            <CardContent className="flex-grow-[1] flex justify-between items-center">
              <div>
                <p className='text-2xl font-Mulish'>$23000.00</p>
                <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - This Year</p>
              </div>
              <div className="flex justify-end items-center">
                <CreditCard  sx={{ fontSize: "50px" }} className='text-amber-400' />
              </div>
            </CardContent>
          </Card>
        </Link>
      </Box>

      <Box className="flex mt-5">
        <Box className="w-7/12 bg-white h-96 rounded-lg p-6 float-left pb-20">
          <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 5,
                left: 0,
                bottom: 5,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div className="columns-3 mt-2">
            <div className="flex justify-center font-extralight text-3xl">{currentYear}</div>
            <div className="flex justify-center font-extralight text-3xl">${IncomeSum}</div>
            <div className="flex justify-center font-extralight text-3xl">${ExpensesSum}</div>
          </div>
          <div className="columns-3">
            <div className="flex justify-center text-sm font-thin text-gray-600">Period</div>
            <div className="flex justify-center text-sm font-thin text-gray-600">Income</div>
            <div className="flex justify-center text-sm font-thin text-gray-600">Expenses</div>
          </div>
        </Box>

        <Box className="w-auto bg-white h-96 rounded-lg p-6 float-left ml-5">
          <div className="flex justify-center text-xl font-light text-gray-600">
            Leads This Year
          </div>
          <PieChart className="flex justify-center" width={450} height={240}>
            <Pie
              data={data1}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value">
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div>
            <Chip style={{ backgroundColor: '#0088FE', color: 'white', margin: '4px' }} label="Successful" />
            <Chip style={{ backgroundColor: '#00C49F', color: 'white', margin: '4px' }} label="Unsuccessful" />
            <Chip style={{ backgroundColor: '#FFBB28', color: 'white', margin: '4px' }} label="Under Process" />
            <Chip style={{ backgroundColor: '#FF8042', color: 'white', margin: '4px' }} label="Declined" />
            <Chip style={{ backgroundColor: 'rgb(220 38 38)', color: 'white', margin: '4px' }} label="Remaining" />
          </div>

        </Box>

      </Box>

      <Box className='flex'>

        <Box className='w-full h-auto bg-white rounded-lg mt-5 pb-4'>

          <div className='flex justify-center text-xl pt-4'>Latest Activty</div>
          <Box className='w-full max-h-96 p-1 rounded-lg overflow-scroll'>
            <List sx={{ width: '100%' }}>
              {allData.map((item, index) => (
                <React.Fragment key={index} >
                  <ListItemButton key={item.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.description} — &nbsp;
                          </Typography>
                          {item.time} Hours Ago
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>

        </Box>

        <Box className='w-7/12 h-full bg-white mt-5 ml-5 p-2'>
          <div className='flex justify-center text-xl'>Projects</div>
          <Box className='w-full max-h-96 p-1 rounded-lg overflow-scroll'>
            <List sx={{ width: '100%' }}>
              {Projectsdata.map((item, index) => (
                <React.Fragment key={index} >
                  <ListItemButton key={item.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: 'orange' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.action}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ font: 'light' }}
                            component="span"
                            variant="body2"
                          >
                            {"Assigned to me : "}
                          </Typography>
                          {item.assigned}
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Box>

      </Box>

    </div>
  );
}

export default DashBoard;
