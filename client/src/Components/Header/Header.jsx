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
      <main
        // style={{ height: 'calc(100vh - 64px)' }}
        className='bg-lighter-gray p-[2rem] flex-grow-[1] '
      >
        <DrawerHeader />
        <Outlet />
      </main>

    </Box>
  )
}

export default Header