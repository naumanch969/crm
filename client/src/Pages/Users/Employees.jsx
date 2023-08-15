import React, { useEffect, useState } from 'react'
 import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, getEmployees } from '../../redux/action/user'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../Components'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { Tooltip } from 'recharts'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'

function Employees() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { employees, isFetching, error } = useSelector(state => state.user)
  const columns = [
    {
      field: 'image', headerName: 'Photo', width: 100, renderCell: (params) => (
        <img src={params.row.image} alt="" className='w-[2rem] h-[2rem] rounded-full object-cover ' />
      )
    },
    {
      field: 'username', headerName: 'User Name', width: 150, renderCell: (params) => (
        <span onClick={() => handleNavigateToUser(params.row)} className='cursor-pointer text-blue-600' >{params.row.username}</span>
      )
    },
    { field: 'password', headerName: 'Password', width: 150 },
    {
      field: 'changePassword', headerName: 'Change Password', width: 150, renderCell: (params) => (
        <React.Fragment>
          <input type="password" value={changePassword} onChange={(e) => setChangePassword(e.target.value)} />
        </React.Fragment>
      )
    },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'officialNumber', headerName: 'Office No.', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'cnic', headerName: 'CNIC', width: 150 },
    { field: 'branch', headerName: 'Branch', width: 150 },
    {
      field: 'activeStatus', headerName: 'Status', width: 150, renderCell: (params) => {
        const { activeStatus } = params.row
        return (
          <span className={`
            ${activeStatus ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}
            border-[1px] rounded-[6px] px-[4px] py-[2px]
            `}
          >{activeStatus ? 'Active' : 'Inactive'}</span>
        )
      }
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
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')
  const [changePassword, setChangePassword] = useState('')
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getEmployees())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleNavigateToUser = (user) => {
    navigate(`/user/${user._id}`)
    dispatch(getUserReducer(user))
  }

  const handleOpenEditModal = (user) => {
    dispatch(getUserReducer(user))
    setOpenEditModal(true);
  }

  const handleOpenDeleteModal = (userId) => {
    setOpenDeleteModal(true);
    setSelectedUserId(userId)
  }


  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >


      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} userId={selectedUserId} />

      <Topbar view={view} setView={setView} />
      <Table
        rows={employees}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching}
        error={error}
      />

    </div>
  )
}

export default Employees