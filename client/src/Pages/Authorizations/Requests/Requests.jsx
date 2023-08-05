import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovals } from '../../../redux/action/approval'

function RequestApprovals() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { approvals, isFetching, error } = useSelector(state => state.approval)

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getApprovals())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table approvals={approvals} isFetching={isFetching} error={error} />

    </div>
  )
}

export default RequestApprovals