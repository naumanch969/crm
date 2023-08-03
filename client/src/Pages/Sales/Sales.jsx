import React, { useState } from 'react'
import Topbar from './Topbar'
import Table from './Table/Table'

function Sales() {

  const [view, setView] = useState('table')

  const sales = [
    { _id:'1', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'2', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'3', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'4', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'5', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'6', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'7', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'8', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
    { _id:'9', invoiceNumber: 1243124, createdAt: '12/12/2020', supplierName: 'supplierName', leadId: 123021830, net: 20000, received: 30000, psf: 500, fop: 1000, branch: 'Lahore', staff: 'staff', },
  ]


  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table sales={sales} />

    </div>
  )
}

export default Sales