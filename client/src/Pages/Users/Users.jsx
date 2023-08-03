import React, { useState } from 'react'
import Table from './Table/Table'
import Topbar from './Topbar'
import { person5 } from '../../assets'

function Users() {

  const [view, setView] = useState('table')

  const users = [
    { _id: '1', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '2', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '3', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '4', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '5', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '6', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '7', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '8', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
    { _id: '9', image: person5, firstName: 'Jogn', lastName: 'Doe', userName: 'johndoe', email: 'john@gmail.com', password: 'john', cnic: '3540567878134', phone: '030324563456', officialNumber: '030324563456', branch: 'lahore', gender: 'male', martialStatus: 'married', salaryType: 'online', activeStatus: false },
  ]

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table users={users} />

    </div>
  )
}

export default Users