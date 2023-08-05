import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getSales } from '../../redux/action/sale'

function Sales() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { sales, isFetching, error } = useSelector(state => state.sale)

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getSales())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table sales={sales} isFetching={isFetching} error={error} />

    </div>
  )
}

export default Sales