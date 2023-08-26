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
import Kanban from './Kanban/Kanban'

function Leads({ type, showSidebar }) {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const dispatch = useDispatch()
    const { archived, leads, isFetching, error } = useSelector(state => state.lead)
    const { loggedUser } = useSelector(state => state.user)
    const role = loggedUser.role
    const columns = [
        {
            field: 'clientId.firstName', headerName: 'Client Name',minWidth: 200, maxWidth: 250 , renderCell: (params) => (
                <Link className='text-[#20aee3] hover:text-[#007bff] font-primary capitalize' to={`/leads/${params.row._id}`} >{params.row.clientId?.firstName} {" "} {params.row.clientId?.lastName}</Link>
            )
        },
        {
            field: 'createdAt', headerName: 'Date',minWidth: 200, maxWidth: 250 , renderCell: (params) => (
                <>{format(params.row.createdAt)}</>
            )
        },
        { field: 'priority', headerName: 'Priority', width: 150, },
        {
            field: 'status', headerName: 'Status', width: 150, renderCell: (params) => (
                <span className={`border-[1px] px-[8px] py-[4px] rounded-full ${params.row.status == "successful" ? "border-green-500 text-green-500" :  ""} ${params.row.status == "remaining" ? "border-sky-400 text-sky-400" :  ""} ${params.row.status == "declined" ? "border-red-400 text-red-400" :  ""} ${params.row.status == "underProcess" ? "border-yellow-500 text-yellow-500" :  ""} ${params.row.status == "unsuccessful" ? "border-black text-black" :  ""}`} >{params.row.status}</span>
            )
        },
        
        { field: 'allocatedTo', headerName: 'Allocated To', width: 200, valueGetter: (params) => params.row.allocatedTo?.username },
        {
            field: "actions", headerName: "Action", width: 250, renderCell: (params) => (
                <div className='flex gap-[8px]' >
                    <Tooltip placement='top' title='View' ><Link to={`/leads/${params.row._id}`}><IconButton className='cursor-pointer' ><OpenInNew /></IconButton></Link></Tooltip>
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
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [openShiftLeadModal, setOpenShiftLeadModal] = useState(false)
    const [selectedLeadId, setSelectedLeadId] = useState(null)
    const [options, setOptions] = useState({ isKanbanView: false, showEmployeeLeads: false, showArchivedLeads: false })

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

            <Topbar options={options} setOptions={setOptions} />
            {
                options.isKanbanView
                    ?
                    <Kanban options={options} setOptions={setOptions} />
                    :
                    <Table
                        rows={options.showArchivedLeads ? archived : leads}
                        columns={modifiedColumns}
                        rowsPerPage={10}
                        isFetching={isFetching}
                        error={error}
                        showSidebar={showSidebar}
                    />
            }

        </div>
    )
}

export default Leads