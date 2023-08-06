import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda, VisibilityOff } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useDispatch } from 'react-redux';
import { getLeadReducer } from '../../redux/reducer/lead';


const Table = ({ leads, isFetching, error }) => {

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
        { field: 'name', headerName: 'Name', width: 200, editable: true, },
        { field: 'primaryPhone', headerName: 'Primary Phone', width: 150, editable: true, },
        {
            field: 'createdAt', headerName: 'Date', width: 150, renderCell: (params) => (
                <>{format(params.row.createdAt)}</>
            )
        },
        {
            field: 'assigned', headerName: 'Assigned', width: 150, renderCell: (params) => (
                <AvatarGroup max={2} >
                    {
                        params.row.assigned.map((user, index) => (
                            <Tooltip placement='top' key={index} title={user.name} >
                                <Avatar src={user.image} className='' />
                            </Tooltip>
                        ))
                    }
                </AvatarGroup>
            )
        },
        {
            field: 'status', headerName: 'Status', width: 120, renderCell: (params) => {
                const { status } = params.row

                return (
                    <span className={`
                    ${status == 'completed' ? 'border-green-500 text-green-500' : status == 'pending' ? 'border-red-500 text-red-500' : ''}
                     border-[1px] rounded-[6px] px-[4px] py-[2px]  `} >{status}</span>
                )
            }
        },
        {
            field: 'value', headerName: 'Value', width: 120, renderCell: (params) => (
                <span className='' >${params.row.value}</span>
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