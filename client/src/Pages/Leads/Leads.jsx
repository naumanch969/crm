import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeLeads, getLeads } from '../../redux/action/lead'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { DeleteOutline, EditOutlined, FilterTiltShift, MoveUpOutlined, OpenInNew, SellOutlined, Upgrade, VisibilityOff } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { Table } from '../../Components'
import { format } from 'timeago.js'
import { IconButton } from '@mui/material'
import { getLeadReducer } from '../../redux/reducer/lead'
import UpateStatusModal from './UpdateStatus'
import ShiftLeadModal from './ShiftLead'
import { Link, useLocation } from 'react-router-dom'

function Leads({ type, showSidebar }) {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const dispatch = useDispatch()
    const { leads, isFetching, error } = useSelector(state => state.lead)
    const { loggedUser } = useSelector(state => state.user)
    const role = loggedUser.role
    const columns = [
        {
            field: 'clientId.phone', headerName: 'Phone', width: 150, editable: true, renderCell: (params) => (
                <>{params.row.clientId?.phone} </>
            )
        },
        {
            field: 'clientId.firstName', headerName: 'Client Name', width: 150, editable: true, renderCell: (params) => (
                <>{params.row.clientId?.firstName} {" "} {params.row.clientId?.lastName}</>
            )
        },
        {
            field: 'createdAt', headerName: 'Date', width: 150, renderCell: (params) => (
                <>{format(params.row.createdAt)}</>
            )
        },
        { field: 'clientType', headerName: 'Client Type', width: 150, },
        { field: 'city', headerName: 'City', width: 150, },
        { field: 'block', headerName: 'Block', width: 150, },
        { field: 'beds', headerName: 'Beds', width: 150, },
        { field: 'priority', headerName: 'Priority', width: 150, },
        {
            field: 'status', headerName: 'Status', width: 150, renderCell: (params) => (
                <span className='text-green-500 border-[1px] border-green-500 px-[8px] py-[4px] rounded-full ' >{params.row.status}</span>
            )
        },
        { field: 'progress', headerName: 'Progress', width: 150, },
        { field: 'propertyType', headerName: 'Property Type', width: 150, },
        { field: 'homeType', headerName: 'Home Type', width: 150, },
        {
            field: 'area', headerName: 'Area', width: 150, renderCell: (params) => {
                const { minArea, minAreaUnit, maxArea, maxAreaUnit } = params.row
                return (
                    <div className="flex gap-[4px] ">
                        <span className='flex gap-[2px] ' >{minArea} <small>{minAreaUnit}</small> </span>
                        <span>-</span>
                        <span className='flex gap-[2px] ' >{maxArea} <small>{maxAreaUnit}</small> </span>
                    </div>
                )
            }
        },
        { field: 'allocatedTo', headerName: 'Allocated To', width: 200, valueGetter: (params) => params.row.allocatedTo?.email },
        {
            field: "actions", headerName: "Action", width: 250, renderCell: (params) => (
                <div className='flex gap-[8px]' >
                    <Tooltip placement='top' title='View' ><Link to="/view"><IconButton className='cursor-pointer' ><OpenInNew /></IconButton></Link></Tooltip>
                    <Tooltip placement='top' title='Update' > <IconButton onClick={() => handleOpenEditModal(params.row)} className='cursor-pointer ' ><EditOutlined /></IconButton></Tooltip>
                    <Tooltip placement='top' title='Delete' > <IconButton onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></IconButton></Tooltip>
                    <Tooltip placement='top' title='Update Status' > <IconButton onClick={() => handleOpenStatusModal(params.row)} className='cursor-pointer ' ><Upgrade /></IconButton></Tooltip>
                    <Tooltip placement='top' title='Shift Lead' > <IconButton onClick={() => handleOpenShiftLeadModal(params.row)} className='cursor-pointer ' ><FilterTiltShift /></IconButton></Tooltip>
                    <Tooltip placement='top' title='Refund' > <IconButton onClick={() => { }} className='cursor-pointer ' ><SellOutlined /></IconButton></Tooltip>
                    <Tooltip placement='top' title='Share Lead' ><IconButton onClick={() => { }} className='cursor-pointer ' ><MoveUpOutlined /></IconButton></Tooltip>
                </div>
            )
        },
    ];

    let modifiedColumns = columns
    if (role == 'employee' && type == 'all') {
        modifiedColumns = modifiedColumns.filter(column => column.field !== 'allocatedTo');
    }

    ////////////////////////////////////// STATES //////////////////////////////
    const [view, setView] = useState('table')
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [openShiftLeadModal, setOpenShiftLeadModal] = useState(false)
    const [selectedLeadId, setSelectedLeadId] = useState(null)

    ////////////////////////////////////// USE EFFECTS //////////////////////////////
    useEffect(() => {
        type == 'all'
            ?
            dispatch(getLeads())
            :
            dispatch(getEmployeeLeads())
    }, [type])

    ////////////////////////////////////// FUNCTION //////////////////////////////
    const handleOpenEditModal = (lead) => {
        setOpenEditModal(true);
        dispatch(getLeadReducer(lead))
    }
    const handleOpenStatusModal = (lead) => {
        setOpenStatusModal(true);
        dispatch(getLeadReducer(lead))
    }
    const handleOpenShiftLeadModal = (lead) => {
        setOpenShiftLeadModal(true);
        dispatch(getLeadReducer(lead))
    }
    const handleOpenDeleteModal = (leadId) => {
        setOpenDeleteModal(true);
        setSelectedLeadId(leadId)
    }





    return (
        <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} leadId={selectedLeadId} />
            <UpateStatusModal open={openStatusModal} setOpen={setOpenStatusModal} />
            <ShiftLeadModal open={openShiftLeadModal} setOpen={setOpenShiftLeadModal} />

            <Topbar view={view} setView={setView} />
            <Table
                rows={leads}
                columns={modifiedColumns}
                rowsPerPage={10}
                isFetching={isFetching}
                error={error}
                showSidebar={showSidebar}
            />

        </div>
    )
}

export default Leads