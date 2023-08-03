import { CreditCard } from 'react-bootstrap-icons'
import { Box, Card, CardContent, Chip } from '@mui/material'
import React, {PureComponent} from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';

function DashBoard() {

  // <---------------------------- Line Chart ---------------------------------->

  const data = [
    {
      name: 'Jan',
      Expenses: 4000,
      Income: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      Expenses: 3000,
      Income: 1398,
      amt: 2210,
    },
    {
      name: 'March',
      Expenses: 2000,
      Income: 9800,
      amt: 2290,
    },
    {
      name: 'April',
      Expenses: 2780,
      Income: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      Expenses: 1890,
      Income: 4800,
      amt: 2181,
    },
    {
      name: 'June',
      Expenses: 2390,
      Income: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: 'Aug',
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: 'Sept',
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: 'Oct',
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: 'Nov',
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
    {
      name: 'Dec',
      Expenses: 3490,
      Income: 4300,
      amt: 2100,
    },
  ];

  let time;


  // <------------------------------------------------------------->

  // <--------------------- Pie Chart ----------------------------->

    
const data1 = [
  { name: 'Successful', value: 600 },
  { name: 'Unsuccessful', value: 200 },
  { name: 'Under Process', value: 300 },
  { name: 'Declined', value: 100 },
  { name: 'Remaining', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'rgb(220 38 38)'];

// <-------------------------------------------------------------->

// <----------------------- Bottom Box --------------------------->

const allData = [
  
]

// <-------------------------------------------------------------->

  return (
    <div className='h-auto'>
      <Box className='w-auto columns-3'>
        <Link to='/cashbook'>
        <Card className='bg-white border-b-4 border-b-emerald-300'>
          <CardContent className='columns-2'>
            <div>
              <p className='text-2xl font-Mulish'>$200.00</p>
              <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - Today</p>
            </div>
            <div className='flex justify-end'>
              <CreditCard className='text-emerald-300' height={50} width={50} />
            </div>
          </CardContent>
        </Card>
        </Link>

        <Link to='/cashbook'>
        <Card className='bg-white border-b-4 border-b-sky-400'>
        <CardContent className='columns-2'>
            <div>
              <p className='text-2xl font-Mulish'>$1500.00</p>
              <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - This Month</p>
            </div>
            <div className='flex justify-end'>
              <CreditCard className='text-sky-400' height={50} width={50} />
            </div>
          </CardContent>
        </Card>
        </Link>

        <Link to='/cashbook'>
        <Card className='bg-white border-b-4 border-b-amber-400'>
        <CardContent className='columns-2'>
            <div>
              <p className='text-2xl font-Mulish'>$23000.00</p>
              <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - This Year</p>
            </div>
            <div className='flex justify-end'>
              <CreditCard className='text-amber-400' height={50} width={50} />
            </div>
          </CardContent>
        </Card>
        </Link>
      </Box>

      <Box className='flex mt-5'>

        <Box className='w-7/12 bg-white h-96 rounded-lg p-6 float-left pb-20'>

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
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div className='columns-3 mt-2'>
            <div className='flex justify-center font-extralight text-3xl'>2023</div>
            <div className='flex justify-center font-extralight text-3xl'>$32400</div>
            <div className='flex justify-center font-extralight text-3xl'>$12000</div>
          </div>
          <div className='columns-3'>
            <div className='flex justify-center text-sm font-thin text-gray-600'>Period</div>
            <div className='flex justify-center text-sm font-thin text-gray-600'>Income</div>
            <div className='flex justify-center text-sm font-thin text-gray-600'>Expenses</div>
          </div>

        </Box>

        <Box className='w-auto bg-white h-96 rounded-lg p-6 float-left ml-5'>

          <div className='flex justify-center text-xl font-light text-gray-600'>Leads This Year</div>
          <PieChart className='flex justify-center' width={450} height={240}>
            <Pie
              data={data1}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div>
            <Chip style={{ backgroundColor:'#0088FE', color:'white', margin:'4px' }} label="Successful" />
            <Chip style={{ backgroundColor:'#00C49F', color:'white', margin:'4px' }} label="Unsuccessful" />
            <Chip style={{ backgroundColor:'#FFBB28', color:'white', margin:'4px' }} label="Under Process" />
            <Chip style={{ backgroundColor:'#FF8042', color:'white', margin:'4px' }} label="Declined" />
            <Chip style={{ backgroundColor:'rgb(220 38 38)', color:'white', margin:'4px' }} label="Remaining" />
          </div>
          
        </Box>

      </Box>

      <Box className='w-full h-auto bg-white rounded-lg mt-5'>

        <div className='flex justify-center text-xl p-4'>Latest Activty</div>
        <Box className='w-11/12 bg-gray-100 h-96 rounded-lg ml-12'>
            
        </Box>

      </Box>
    </div>
  )
}

export default DashBoard