import { Checkbox } from '@mui/material'
import React from 'react'
import { PiCaretRightLight } from 'react-icons/pi'

const SettingVoucher = () => {
  return (
    <div><div>
    {" "}
    <div className="font-primary">
      <div className="w-full text-2xl text-sky-400">Settings</div>
      <div className="w-full flex items-center text-[16px] text-[#cecece]">
        Settings <PiCaretRightLight /> Project
      </div>
      <div className="flex justify-center text-2xl pt-10 text-[#cecece]">
        Which Things you want ?
      </div>
      <div className="flex justify-center text-lg pt-3 text-[#cecece] font-light">
        Select The things which want and unselect those which you don't want.
      </div>
      <div className="flex flex-col gap-10 md:p-14 text-lg text-[#cecece]">
        <div className="flex items-center gap-[300px]">
          <div className="font-light">Search Bar</div>
          <Checkbox defaultChecked style={{ color: "skyblue" }} />
        </div>
        <div className="flex items-center gap-[350px]">
          <div className="font-light">Filter</div>
          <Checkbox defaultChecked style={{ color: "skyblue" }} />
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default SettingVoucher