import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteApproval, getApprovals } from '../../../redux/action/approval'
import { getApprovalReducer } from '../../../redux/reducer/approval'
import { rejectRequestApproval, rejectRefundApproval } from '../../../redux/action/approval'
import { register } from '../../../redux/action/user'
import { format } from 'timeago.js'
import { IconButton, Tooltip } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { createCashbook } from '../../../redux/action/cashbook'

function RequestApprovals() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { refundApprovals: approvals, isFetching, error } = useSelector(state => state.approval)
  const columns = [
    {
      field: 'sr', headerName: 'Sr.', width: 80, renderCell: (params) => (
        <>{params.id}</>
      )
    },
    {
      field: 'data.amount', headerName: 'Amount', width: 130, renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 '  >{params.row.data.amount}</span>
      )
    },
    {
      field: 'data.branch', headerName: 'Branch', width: 130, renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 '  >{params.row.data.branch}</span>
      )
    },
    {
      field: 'data.reason', headerName: 'Reason', width: 130, renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 '  >{params.row.data.reason}</span>
      )
    },
    {
      field: 'data.customerName', headerName: 'Customer Name', width: 130, renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 '  >{params.row.data.customerName}</span>
      )
    },
    {
      field: 'data.cnic', headerName: 'cnic', width: 160, renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 '  >{params.row.data.cnic}</span>
      )
    },
    {
      field: 'data.phone', headerName: 'Phone', width: 150, renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 '  >{params.row.data.phone}</span>
      )
    },
    {
      field: "approve/reject", headerName: "Approve/Reject", width: 150, renderCell: (params) => (
        <div className='flex gap-[4px] ' >
          <button onClick={() => handleApprove(params.row)} className='cursor-pointer bg-green-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ' >Approve</button>
          <button onClick={() => handleReject(params.row._id)} className='cursor-pointer bg-red-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ' >Reject</button>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getApprovals('refund'))
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////

  const handleApprove = (approval) => {
    const data = {
      customerName: approval.data.customerName,
      paymentType: 'bank',
      paymentDetail: approval.data.reason,
      amountPaid: approval.data.amount,
      branch: approval.data.branch,
      type: 'out'
    }
    dispatch(createCashbook(data))
    dispatch(deleteApproval(approval?._id, 'refund'))
  }

  const handleReject = (approvalId) => {
    dispatch(rejectRefundApproval(approvalId))
  }


  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar />
      <Table
        rows={approvals}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching}
        error={error}
      />

    </div>
  )
}

export default RequestApprovals