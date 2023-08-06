import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import EditModal from './EditModal';
import React from 'react'
import DeleteModal from './DeleteModal';
import { getSaleReducer } from '../../redux/reducer/sale';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Table = ({ sales, isFetching, error }) => {

    //////////////////////////////////////// VARIABLES ///////////////////////////////////
    const dispatch = useDispatch()

    //////////////////////////////////////// STATES ///////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedSaleId, setSelectedSaleId] = useState(null)


    //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
    const handleOpenEditModal = (sale) => {
        setOpenEditModal(true);
        dispatch(getSaleReducer(sale))
    }
    const handleOpenDeleteModal = (saleId) => {
        setOpenDeleteModal(true);
        setSelectedSaleId(saleId)
    }

    const columns = [
        {
            field: 'sr', headerName: 'Sr.', width: 80, renderCell: (params) => (
                <>{params.id}</>
            )
        },
        { field: 'invoiceNumber', headerName: 'Inv No.', width: 150, },
        { field: 'createdAt', headerName: 'Date', width: 150 },
        { field: 'supplierName', headerName: 'Supplier', width: 150 },
        { field: 'leadId', headerName: 'Lead ID', width: 150 },
        { field: 'net', headerName: 'Net', width: 100 },
        { field: 'received', headerName: 'Received', width: 150 },
        { field: 'psf', headerName: 'PSF', width: 100 },
        { field: 'fop', headerName: 'FOP', width: 100 },
        { field: 'branch', headerName: 'Branch', width: 100 },
        { field: 'staff', headerName: 'Staff', width: 120 },
        {
            field: "action", headerName: "Action", width: 100, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <Tooltip placement='top' title='Edit' >
                        <button onClick={() => handleOpenEditModal(params.row)} className='cursor-pointer ' ><EditOutlined /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete' >
                        <button onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></button>
                    </Tooltip>
                </div>
            ),
        },
    ];



    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} saleId={selectedSaleId} />

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
                    rows={sales}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 }
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