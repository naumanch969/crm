import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getIncomeAndExpenses } from '../../redux/action/cashbook'
import { Loader } from '../../utils'

const IncomeAndExpense = () => {

    const dispatch = useDispatch()
    const { incomeAndExpenses, isFetching } = useSelector(state => state.cashbook)
    const currentYear = new Date().getFullYear();
    let incomeSum = incomeAndExpenses.reduce((prev, current) => prev + +current.income, 0);
    let expensesSum = incomeAndExpenses.reduce((prev, current) => prev + +current.expense, 0);

    useEffect(() => {
        dispatch(getIncomeAndExpenses())
    }, [])


    return (
        <Box className="w-full bg-white h-[28rem] rounded-lg p-6 pb-20 font-primary">

            {
                isFetching
                    ?
                    <div className="flex justify-center items-center w-full h-full ">
                        <Loader />
                    </div>
                    :
                    <>
                        <ResponsiveContainer>
                            <LineChart
                                width={500}
                                height={300}
                                data={incomeAndExpenses}
                                margin={{ top: 20, right: 5, left: 35, bottom: 5, }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="columns-3 mt-2">
                            <div className="flex justify-center font-extralight sm:text-3xl text-2xl">{currentYear}</div>
                            <div className="flex justify-center font-extralight sm:text-3xl text-2xl">${incomeSum}</div>
                            <div className="flex justify-center font-extralight sm:text-3xl text-2xl">${expensesSum}</div>
                        </div>
                        <div className="columns-3">
                            <div className="flex justify-center text-sm font-thin text-gray-600">Period</div>
                            <div className="flex justify-center text-sm font-thin text-gray-600">Income</div>
                            <div className="flex justify-center text-sm font-thin text-gray-600">Expenses</div>
                        </div>
                    </>
            }
        </Box>
    )
}

export default IncomeAndExpense