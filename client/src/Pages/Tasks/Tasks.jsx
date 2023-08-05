import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { person5 } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../../redux/action/task'

function Tasks() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { tasks, isFetching, error } = useSelector(state => state.task)

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getTasks())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table tasks={tasks} isFetching={isFetching} error={error} />

    </div>
  )
}

export default Tasks