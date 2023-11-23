import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components'
import Topbar from './Topbar'
import DeleteModal from './DeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovals } from '../../../redux/action/approval'
import Request from './VoucherRequest'
import EnterPassword from './EnterPassword'

function VoucherApprovals() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { voucherApprovals, isFetching, error } = useSelector(state => state.approval)
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="font-primary capitalize">{params.row?.uid}</span>
      ),
    },
    {
      field: "clientName",
      headerName: "Customer Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="capitalize font-primary">
          <p>{params.row?.data?.clientName}</p>
        </div>
      ),
    },
    {
      field: "project",
      headerName: "Project",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row?.data?.paid}</div>,
    },
    {
      field: "CNIC",
      headerName: "CNIC",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row?.data?.CNIC}</div>,
    },
    {
      field: "issuingDate",
      headerName: "Issue Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row?.data?.issuingDate}</div>,
    },
    {
      field: "type",
      headerName: "Payment Type",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary capitalize">{params.row?.data?.type}</div>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary capitalize">{params.row?.status}</div>,
    },
    {
      field: "paid",
      headerName: "Amount Paid",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row?.data?.paid}</div>,
    },
    {
      field: "approve/reject",
      headerName: "Approve/Reject",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          {
            params.row.status.toLowerCase() == 'underprocess'
              ?
              <>
                <button
                  onClick={() => { setSelectedApproval(params.row); setOpenEnterPassword(true); setRefundType('approve') }}
                  className="cursor-pointer bg-green-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ">
                  Approve
                </button>
                <button
                  onClick={() => { setSelectedApproval(params.row); setOpenEnterPassword(true); setRefundType('reject') }}
                  className="cursor-pointer bg-red-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ">
                  Reject
                </button>
              </>
              :
              <button
                onClick={() => { setOpenDeleteModal(true); setSelectedApproval(params.row) }}
                className="cursor-pointer bg-red-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] "
              >
                Delete
              </button>

          }
        </div>
      ),
    },
  ];


  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')
  const [openRequest, setOpenRequest] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState('')
  const [openEnterPassword, setOpenEnterPassword] = useState(false)
  const [refundType, setRefundType] = useState('') // approve/reject


  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getApprovals('voucher'))
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////



  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem] font-primary' >

      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} approvalId={selectedApproval._id} />
      <EnterPassword open={openEnterPassword} setOpen={setOpenEnterPassword} approval={selectedApproval} type={refundType} />
      <Request open={openRequest} setOpen={setOpenRequest} />

      <Topbar view={view} setView={setView} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
      <Table
        rows={voucherApprovals}
        columns={columns}
        rowsPerPage={10}
        isFetching={isFetching}
        error={error}
      />

    </div>
  )
}

export default VoucherApprovals