import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '../../redux/action/user'

function Users() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { clients: users, isFetching, error } = useSelector(state => state.user)

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getClients())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table users={users} isFetching={isFetching} error={error} />

    </div>
  )
}

export default Users