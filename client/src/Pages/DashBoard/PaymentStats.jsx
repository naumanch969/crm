import { CreditCard } from '@mui/icons-material'
import { Box, Card, CardContent } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPayments } from '../../redux/action/cashbook'

const Stats = () => {

    const { payments } = useSelector(state => state.cashbook)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPayments())
    }, [])


    return (
        <Box className='w-auto columns-3'>
            <Link to='/cashbook'>
                <Card className='bg-white border-b-4 border-b-emerald-300'>
                    <CardContent className="flex-grow-[1] flex justify-between items-center">
                        <div>
                            <p className='text-2xl font-Mulish'>${payments?.todayReceived}</p>
                            <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - Today</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <CreditCard sx={{ fontSize: "50px", fontWeight: '1px' }} className='text-emerald-300' />
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link to='/cashbook'>
                <Card className='bg-white border-b-4 border-b-sky-400'>
                    <CardContent className="flex-grow-[1] flex justify-between items-center">
                        <div>
                            <p className='text-2xl font-Mulish'>${payments?.thisMonthReceived}</p>
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
                            <p className='text-2xl font-Mulish'>${payments?.thisYearReceived}</p>
                            <p className='text-md font-Mulish text-slate-500 text-opacity-70'>Payments - This Year</p>
                        </div>
                        <div className="flex justify-end items-center">
                            <CreditCard sx={{ fontSize: "50px" }} className='text-amber-400' />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </Box>
    )
}

export default Stats