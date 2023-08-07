import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda, VisibilityOff } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useDispatch } from 'react-redux';
import { getProjectReducer } from '../../redux/reducer/project';


const Table = ({ projects, isFetching, error }) => {

    //////////////////////////////////////// VARIABLES ////////////////////////////////
    const dispatch = useDispatch()

    //////////////////////////////////////// STATES ///////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState(null)

 
    //////////////////////////////////////// FUNCTIONS ////////////////////////////////
    const handleOpenEditModal = (project) => {
        setOpenEditModal(true);
        dispatch(getProjectReducer(project))
    }
    const handleOpenDeleteModal = (projectId) => {
        setOpenDeleteModal(true);
        setSelectedProjectId(projectId)
    }

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


    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} projectId={selectedProjectId} />

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
                    rows={projects}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, }
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