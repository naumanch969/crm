import { Add, Archive, ArrowDropDown, ArrowRight, Download, DownloadOutlined, Filter, FilterAltOutlined, FormatListBulleted, Grid3x3, Inventory2Outlined, KeyboardArrowRight, ListAlt, Person, PersonOutlineOutlined, Search, Sort, TableView } from '@mui/icons-material'
import { Grid, List, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { ArrowDown } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const Topbar = ({ view, setView }) => {

  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='flex justify-between items-center ' >

      <div className='flex flex-col justify-start gap-[4px] '>
        <h1 className='text-primary-blue text-[24px] ' >Users</h1>
        <div className='flex justify-start items-center gap-[8px] '>
          <span className='capitalize text-[15px] text-primary-gray ' >App</span>
          <KeyboardArrowRight className='text-primary-gray ' />
          <span className='capitalize text-black '>Users</span>
        </div>
      </div>

      <div className='flex justify-end items-center gap-[6px] '>
        <div className="h-[32px] bg-secondary-gray rounded-[4px] flex ">
          <div className="w-[2rem] text-primary-gray h-full flex justify-center items-center ">
            <Search />
          </div>
          <input className='w-[7rem] text-primary-gray outline-none border-none bg-inherit h-full ' type="text" placeholder='Search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>
        <div className="flex justify-start items-center gap-[6px]">
          <Tooltip placement='top' title='Show Archived Users' >
            <div className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-blue rounded-[4px] ">
              <Inventory2Outlined className='text-primary-blue ' />
            </div>
          </Tooltip>
          <Tooltip placement='top' title='My Users' >
            <div className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-gray rounded-[4px] ">
              <PersonOutlineOutlined className='text-primary-gray ' />
            </div>
          </Tooltip>
          <Tooltip placement='top' title={`${view == 'table' ? 'Table' : 'Kanban'} view`} >
            <div onClick={() => setView(view == 'table' ? 'kanban' : 'table')} className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-blue rounded-[4px] ">
              {
                view == 'table'
                  ?
                  <TableView />
                  :
                  <FormatListBulleted className='text-primary-blue ' />
              }
            </div>
          </Tooltip>
          <Tooltip placement='top' title='' >
            <div className="w-[48px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-gray rounded-[4px] ">
              <Sort className='text-primary-gray ' />
              <ArrowDropDown />
            </div>
          </Tooltip>
          <Tooltip placement='top' title='Import Users' >
            <div className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-gray rounded-[4px] ">
              <DownloadOutlined className='text-primary-gray ' />
            </div>
          </Tooltip>
          <Tooltip placement='top' title='Filter' >
            <div className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-gray rounded-[4px] ">
              <FilterAltOutlined className='text-primary-gray ' />
            </div>
          </Tooltip>
        </div>
        <button onClick={() => navigate('/user/create')} className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg ">
          <Add />
        </button>
      </div>


    </div>
  )
}

export default Topbar