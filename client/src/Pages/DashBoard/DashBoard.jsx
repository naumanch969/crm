import { CreditCard } from 'react-bootstrap-icons'
import { Box, Card, CardContent } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function DashBoard() {
  return (
    <div className='h-screen'>
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

      <Box>
        
      </Box>
    </div>
  )
}

export default DashBoard