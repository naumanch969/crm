import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getLeads } from '../../redux/action/lead'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { DeleteOutline, EditOutlined, VisibilityOff } from '@mui/icons-material'
import { Tooltip } from 'recharts'
import { Table } from '../../Components'
import { format } from 'timeago.js'
import { IconButton } from '@mui/material'

function Leads({showSidebar}) {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const dispatch = useDispatch()
    const { leads, isFetching, error } = useSelector(state => state.lead)
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
        { field: 'allocatedTo', headerName: 'Allocated To', width: 150, valueGetter: (params) => params.row.allocatedTo?.email },
        {
            field: "actions", headerName: "Action", width: 150, renderCell: (params) => (
                <div className='flex gap-[8px]' >
                    <IconButton onClick={() => handleOpenEditModal(params.row)} className='cursor-pointer ' ><EditOutlined /></IconButton>
                    <IconButton onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////////////// STATES //////////////////////////////
    const [view, setView] = useState('table')
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedLeadId, setSelectedLeadId] = useState(null)

    ////////////////////////////////////// USE EFFECTS //////////////////////////////
    useEffect(() => {
        if (leads.length == 0) {
            dispatch(getLeads())
        }
    }, [])

    ////////////////////////////////////// FUNCTION //////////////////////////////
    const handleOpenEditModal = (lead) => {
        setOpenEditModal(true);
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

            <Topbar view={view} setView={setView} />
            <Table
                rows={leads}
                columns={columns}
                rowsPerPage={10}
                isFetching={isFetching}
                error={error}
                showSidebar={showSidebar}
            />

        </div>
    )
}

export default Leads