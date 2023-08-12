import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda, VisibilityOff } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useDispatch } from 'react-redux';
import { getLeadReducer } from '../../redux/reducer/lead';
import { format } from 'timeago.js'


const Table = ({ leads, isFetching, error }) => {

    console.log(leads)
    //////////////////////////////////////// VARIABLES ///////////////////////////////////
    const dispatch = useDispatch()

    //////////////////////////////////////// STATES ///////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedLeadId, setSelectedLeadId] = useState(null)

    //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
    const handleOpenEditModal = (lead) => {
        setOpenEditModal(true);
        dispatch(getLeadReducer(lead))
    }
    const handleOpenDeleteModal = (leadId) => {
        setOpenDeleteModal(true);
        setSelectedLeadId(leadId)
    }


    const columns = [
        {
            field: 'clientId.phone', headerName: 'Phone', width: 150, editable: true, renderCell: (params) => (
                <>{params.row.clientId?.phone} </>
            )
        },
        {
            field: 'clientId.firstName', headerName: 'Name', width: 150, editable: true, renderCell: (params) => (
                <>{params.row.clientId?.firstName} {" "} {params.row.clientId?.lastName}</>
            )
        },
        {
            field: 'createdAt', headerName: 'Date', width: 150, renderCell: (params) => (
                <>{format(params.row.createdAt)}</>
            )
        },
        { field: 'city', headerName: 'City', width: 150, },
        { field: 'block', headerName: 'Block', width: 150, },
        { field: 'beds', headerName: 'Beds', width: 150, },
        { field: 'priority', headerName: 'Priority', width: 150, },
        { field: 'clientType', headerName: 'Client Type', width: 150, },
        { field: 'propertyType', headerName: 'Property Type', width: 150, },
        { field: 'homeType', headerName: 'Home Type', width: 150, },
        {
            field: 'area', headerName: 'Area', width: 150, renderCell: (params) => {
                const { minArea, minAreaUnit, maxArea, maxAreaUnit } = params.row
                return (
                    <div className="flex gap-[4px] ">
                        <span className='flex gap-[2px] ' >{minArea} <small>{minAreaUnit}</small> </span>
                        <span className='flex gap-[2px] ' >{maxArea} <small>{maxAreaUnit}</small> </span>
                    </div>
                )
            }
        },
        { field: 'allocatedTo', headerName: 'Allocated To', width: 150, },
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



    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} leadId={selectedLeadId} />

            {
                isFetching
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <CircularProgress />
                </div>
            }
            {
                error
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <span className='text-red-500 ' >{error}</span>
                </div>
            }
            {
                (!isFetching && !error) &&
                < DataGrid
                    rows={leads}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, }
                        },
                    }}
                    getRowId={row => row._id}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            }


        </div>
    );
}

export default Table