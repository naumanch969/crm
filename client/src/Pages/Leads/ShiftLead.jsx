import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLead } from '../../redux/action/lead'
import { getEmployees } from '../../redux/action/user'

const ShiftLead = ({ open, setOpen }) => {

    ////////////////////////////////////// VARIABLES  /////////////////////////////////////
    const dispatch = useDispatch()
    const { currentLead, isFetching } = useSelector(state => state.lead)
    const { employees } = useSelector(state => state.user)
    const employeeNames = employees
        .filter(employee => employee.email !== null && employee.email !== undefined)
        .map(({ _id, email }) => ({ _id, email }));

    ////////////////////////////////////// STATES  /////////////////////////////////////
    const [allocatedTo, setAllocatedTo] = useState(currentLead?.allocatedTo)

    ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
    useEffect(() => {
        setAllocatedTo(currentLead?.allocatedTo)
    }, [currentLead])
    useEffect(() => {
        if (employees.length === 0) {
            dispatch(getEmployees());
        }
    }, [employees]);

    ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateLead(currentLead?._id, { allocatedTo }))
        setOpen(false)
    }
    const handleChange = (e) => {
        setAllocatedTo(e.target.value)
    }




    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

            <div className='w-[14rem] h-fit overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

                <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
                    <h2 className='font-bold text-[20px] ' >Shift Lead</h2>
                    <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
                </div>

                <form onSubmit={handleSubmit} className='w-full p-[10px] flex flex-col gap-[10px] ' >
                    <select className='w-full min-h-[40px] text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='allocatedTo' value={allocatedTo} onChange={handleChange} >
                        {
                            employeeNames.map((employee, index) => (
                                <option value={employee?._id} key={index} >{employee?.email}</option>
                            ))
                        }
                    </select>
                    <div className="w-full flex justify-end items-center">
                        <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                            {isFetching ? 'Shifting...' : 'Shift'}
                        </button>
                    </div>
                </form>

            </div>

        </Modal>
    )
}

export default ShiftLead