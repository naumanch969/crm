import React from 'react'
import { PiCaretRightLight } from 'react-icons/pi'
import { Checkbox } from '@mui/material'

const SettingDashboard = () => {
  return (
    <div className='font-primary'>
      <div className="w-full text-2xl text-sky-400">
        Settings
      </div>
      <div className="w-full flex items-center text-[16px] text-[#cecece]">
        Settings <PiCaretRightLight /> Dashboard
      </div>
      <div className='flex justify-center text-2xl pt-10 text-[#cecece]'>Which Things you want ?</div>
      <div className='flex justify-center text-lg pt-3 text-[#cecece] font-light'>Select The things which want and unselect those which you don't want.</div>
      <div className='flex flex-col gap-10 sm:p-14 pt-10 text-lg text-[#cecece]'>
        <div className='flex items-center sm:gap-[300px] gap-[288px]'>
          <div className='font-light'>Cashbook Stats</div>
          <Checkbox defaultChecked style={{ color:'skyblue'}} />
        </div>
        <div className='flex items-center sm:gap-[190px] gap-[180px]'>
          <div className='font-light'>Income and Expanses Stats</div>
          <Checkbox defaultChecked style={{ color:'skyblue'}} />
        </div>
        <div className='flex items-center sm:gap-[340px] gap-[333px]'>
          <div className='font-light'>Lead Stats</div>
          <Checkbox defaultChecked style={{ color:'skyblue'}} />
        </div>
      </div>
    </div>
  )
}

export default SettingDashboard