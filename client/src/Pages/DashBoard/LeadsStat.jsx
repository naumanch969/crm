import { Box, Chip } from '@mui/material'
import React, { useEffect } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { getLeadsStat } from '../../redux/action/lead'

const Leads = () => {

    const dispatch = useDispatch()
    const { stats: leadsStat } = useSelector(state => state.lead)
    const COLORS = ['rgb(34 197 94)', 'rgb(249 115 22)', 'rgb(234 179 8)', 'red', 'rgb(56 189 248)'];

    useEffect(() => {
        dispatch(getLeadsStat())
    }, [])


    return (
        <Box className="w-full bg-white h-96 rounded-lg p-6  mt-5 float-left ml-0 md:w-auto md:ml-5 md:mt-0">
            <div className="flex justify-center text-xl font-light text-gray-600">
                Leads This Year
            </div>
            <PieChart className="flex justify-center" width={450} height={240}>
                <Pie
                    data={leadsStat}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value">
                    {leadsStat.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <div>
                <Chip style={{ backgroundColor: 'rgb(34 197 94)', color: 'white', margin: '4px' }} label="Successful" />
                <Chip style={{ backgroundColor: 'rgb(249 115 22)', color: 'white', margin: '4px' }} label="Unsuccessful" />
                <Chip style={{ backgroundColor: 'rgb(234 179 8)', color: 'white', margin: '4px' }} label="Under Process" />
                <Chip style={{ backgroundColor: 'red', color: 'white', margin: '4px' }} label="Declined" />
                <Chip style={{ backgroundColor: 'rgb(56 189 248)', color: 'white', margin: '4px' }} label="Remaining" />
            </div>

        </Box>
    )
}

export default Leads