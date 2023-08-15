import React, { useEffect, useState } from 'react'
import { Table } from '../../Components'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getSales } from '../../redux/action/sale'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Tooltip } from 'recharts'
import EditModal from '../Leads/EditModal'
import DeleteModal from '../CashBook/DeleteModal'

function Sales() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { sales, isFetching, error } = useSelector(state => state.sale)
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

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedSaleId, setSelectedSaleId] = useState(null)

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getSales())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenEditModal = (sale) => {
    setOpenEditModal(true);
    dispatch(getSaleReducer(sale))
  }
  const handleOpenDeleteModal = (saleId) => {
    setOpenDeleteModal(true);
    setSelectedSaleId(saleId)
  }


  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} saleId={selectedSaleId} />

      <Topbar view={view} setView={setView} />
      <Table
        rows={sales}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching}
        error={error}
      />

    </div>
  )
}

export default Sales