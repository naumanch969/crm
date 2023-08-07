import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, getEmployees } from '../../redux/action/user'

function Users() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { clients, employees, isFetching, error } = useSelector(state => state.user)

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getEmployees())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table users={employees} isFetching={isFetching} error={error} />

    </div>
  )
}

export default Users