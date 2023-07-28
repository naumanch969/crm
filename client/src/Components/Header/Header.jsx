import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';




const Header = () => {

  ////////////////////////////////////// states /////////////////////////////////////
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(true);

  ////////////////////////////////////// use effect /////////////////////////////////
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  ////////////////////////////////////// components //////////////////////////////////
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));



  return (
    <Box sx={{ display: 'flex' }}>

      <Navbar open={open} setOpen={setOpen} date={date} setDate={setDate} />
      <Sidebar open={open} setOpen={setOpen} date={date} setDate={setDate} DrawerHeader={DrawerHeader} />
      <Box className='bg-gray-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>

    </Box>
  )
}

export default Header