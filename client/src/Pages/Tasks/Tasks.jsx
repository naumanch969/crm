import React, { useState } from 'react'
import Table from './Table/Table'
import Topbar from './Topbar'
import { person5 } from '../../assets'

function Tasks() {

  const [view, setView] = useState('table')

  const tasks = [
    { _id: '1', title: 'Random Text Generated', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia animi iure tempore explicabo. Odio nulla adipisci facere quaerat ullam ut debitis minus, explicabo veniam! Alias eaque enim reiciendis quae tempore tempora, veniam ipsum', dueDate: '12/12/2022', createdAt: '12/12/2022' },
    { _id: '2', title: 'Random Text Generated', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia animi iure tempore explicabo. Odio nulla adipisci facere quaerat ullam ut debitis minus, explicabo veniam! Alias eaque enim reiciendis quae tempore tempora, veniam ipsum', dueDate: '12/12/2022', createdAt: '12/12/2022' },
    { _id: '3', title: 'Random Text Generated', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia animi iure tempore explicabo. Odio nulla adipisci facere quaerat ullam ut debitis minus, explicabo veniam! Alias eaque enim reiciendis quae tempore tempora, veniam ipsum', dueDate: '12/12/2022', createdAt: '12/12/2022' },
    { _id: '4', title: 'Random Text Generated', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia animi iure tempore explicabo. Odio nulla adipisci facere quaerat ullam ut debitis minus, explicabo veniam! Alias eaque enim reiciendis quae tempore tempora, veniam ipsum', dueDate: '12/12/2022', createdAt: '12/12/2022' },
    { _id: '5', title: 'Random Text Generated', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia animi iure tempore explicabo. Odio nulla adipisci facere quaerat ullam ut debitis minus, explicabo veniam! Alias eaque enim reiciendis quae tempore tempora, veniam ipsum', dueDate: '12/12/2022', createdAt: '12/12/2022' },
    { _id: '6', title: 'Random Text Generated', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia animi iure tempore explicabo. Odio nulla adipisci facere quaerat ullam ut debitis minus, explicabo veniam! Alias eaque enim reiciendis quae tempore tempora, veniam ipsum', dueDate: '12/12/2022', createdAt: '12/12/2022' },
  ]

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

      <Topbar view={view} setView={setView} />
      <Table tasks={tasks} />

    </div>
  )
}

export default Tasks