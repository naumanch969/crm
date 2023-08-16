import { Box, Chip } from '@mui/material'
import React, { useEffect } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { getLeadsStat } from '../../redux/action/lead'

const Leads = () => {

    const dispatch = useDispatch()
    const { stats: leadsStat } = useSelector(state => state.lead)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'rgb(220 38 38)'];

    useEffect(() => {
        dispatch(getLeadsStat())
    }, [])


    return (
        <Box className="w-auto bg-white h-96 rounded-lg p-6 float-left ml-5">
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
                <Chip style={{ backgroundColor: '#0088FE', color: 'white', margin: '4px' }} label="Successful" />
                <Chip style={{ backgroundColor: '#00C49F', color: 'white', margin: '4px' }} label="Unsuccessful" />
                <Chip style={{ backgroundColor: '#FFBB28', color: 'white', margin: '4px' }} label="Under Process" />
                <Chip style={{ backgroundColor: '#FF8042', color: 'white', margin: '4px' }} label="Declined" />
                <Chip style={{ backgroundColor: 'rgb(220 38 38)', color: 'white', margin: '4px' }} label="Remaining" />
            </div>

        </Box>
    )
}

export default Leads