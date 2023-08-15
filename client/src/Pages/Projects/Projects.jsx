import React, { useEffect, useState } from 'react'
import {Table} from '../../Components'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../redux/action/project'
import { Tooltip } from 'recharts'
import { DeleteOutline, EditOutlined, VisibilityOff } from '@mui/icons-material'
import EditModal from '../Leads/EditModal'
import DeleteModal from '../CashBook/DeleteModal'

function Projects() {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const dispatch = useDispatch()
    const { projects, isFetching, error } = useSelector(state => state.project)
    const columns = [
        { field: 'city', headerName: 'City', width: 120, editable: true, },
        { field: 'title', headerName: 'Title', width: 150, editable: true, },
        { field: 'block', headerName: 'Block', width: 150 },
        { field: 'propertyType', headerName: 'Property Type', width: 150 },
        { field: 'homeType', headerName: 'Home Type', width: 150 },
        { field: 'beds', headerName: 'Beds', width: 150 },
        { field: 'priority', headerName: 'Priority', width: 150 },
        {
            field: 'price', headerName: 'Price', width: 150, renderCell: (params) => (
                <span className="">
                    {params.row.price}
                </span>
            )
        },
        {
            field: 'area', headerName: 'Area', width: 150, renderCell: (params) => (
                <span className="">
                    {params.row.area}
                    <small>{params.row.areaUnit}</small>
                </span>
            )
        },
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <Tooltip placement='top' title='Edit' >
                        <button onClick={() => handleOpenEditModal(params.row)} className='cursor-pointer ' ><EditOutlined /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete' >
                        <button onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='View' >
                        <button className='cursor-pointer ' ><VisibilityOff /></button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    ////////////////////////////////////// STATES //////////////////////////////
    const [view, setView] = useState('table')
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState(null)

    ////////////////////////////////////// USE EFFECTS //////////////////////////////
    useEffect(() => {
        dispatch(getProjects())
    }, [])

    ////////////////////////////////////// FUNCTION //////////////////////////////
    const handleOpenEditModal = (project) => {
        setOpenEditModal(true);
        dispatch(getProjectReducer(project))
    }
    const handleOpenDeleteModal = (projectId) => {
        setOpenDeleteModal(true);
        setSelectedProjectId(projectId)
    }


    return (
        <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} projectId={selectedProjectId} />

            <Topbar view={view} setView={setView} />
            <Table
                rows={projects}
                columns={columns}
                rowsPerPage={5}
                isFetching={isFetching}
                error={error}
            />

        </div>
    )
}

export default Projects