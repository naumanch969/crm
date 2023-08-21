import React from 'react'
import Topbar from './Topbar'
import TableView from '../../Pages/Leads/TableView'

const ViewPage = () => {
  return (
    <div className='h-full w-full'>
        <Topbar />
        <TableView />
    </div>
  )
}

export default ViewPage