import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';


const Table = ({ leads }) => {

    const [showMenu, setShowMenu] = useState(false)

    const columns = [
        { field: 'title', headerName: 'Title', width: 200, editable: true, },
        { field: 'contact', headerName: 'Contact', width: 150, editable: true, },
        { field: 'created', headerName: 'Date', width: 150 },
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
                        <button className='cursor-pointer ' ><EditOutlined /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete' >
                        <button className='cursor-pointer ' ><DeleteOutline /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='View' >
                        <button className='cursor-pointer ' ><Eye /></button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            
            <DataGrid
                rows={leads}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                getRowId={row => row._id}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
}

export default Table