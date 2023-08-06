import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useState } from 'react'
import React from 'react'

const EditModal = ({ open, setOpen }) => {

  const [projectData, setProjectData] = useState({
    gender: 'Mr.',
    name: '',
    primaryPhone: '',
    secondaryPhone: '',
    location: '',
    email: '',
    city: '',
    project: '',
    block: '',
    propertyType: 'Homes',
    homeType: 'House',
    minBudget: 0,
    maxBudget: 0,
    minAreaUnit: 'squareFeet',
    minArea: 0,
    maxAreaUnit: 'squareFeet',
    maxArea: 0,
    projectPriority: 'high',
    clientType: '',
    allocatedTo: '',
    beds: 0,
    source: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(projectData)
  }

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value })
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

      <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

        <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
          <h2 className='font-bold text-[24px] ' >Update Project</h2>
          <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-[24px] w-full p-[1rem] ' >

          <div className="flex flex-col rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
            <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
              <h4 className='font-medium text-[1rem] ' >CUSTOMER DETAILS</h4>
            </div>
            <div className="flex justify-between flex-wrap gap-[8px] p-[1rem] w-full ">
              {/* name */}
              <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="name">Name:</label>
                <div className="flex gap-[4px] ">
                  <select name='gender' value={projectData.gender} onChange={handleChange} className='py-[4px] px-[8px] rounded-[4px] w-[40%] ' >
                    <option value="male">Mr.</option>
                    <option value="female">Mrs.</option>
                  </select>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] w-[60%] ' type="text" name="name" value={projectData.name} onChange={handleChange} placeholder="Enter Customer Name" />
                </div>
              </div>
              {/* primary phone */}
              <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="primaryPhone">Primary Phone:</label>
                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="primaryPhone" value={projectData.primaryPhone} onChange={handleChange} placeholder="Enter Primary Phone" />
              </div>
              {/* secondary phone */}
              <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="secondaryPhone">Secondary Phone:</label>
                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="secondaryPhone" value={projectData.secondaryPhone} onChange={handleChange} placeholder="Enter Secondary Phone" />
              </div>
              {/* location */}
              <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="location">Location:</label>
                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="text" name="location" value={projectData.location} onChange={handleChange} placeholder="Enter Location" />
              </div>
              {/* email */}
              <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="email">Email:</label>
                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="email" name="email" value={projectData.email} onChange={handleChange} placeholder="Enter Email" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[1rem] rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
            {/* heading */}
            <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
              <h4 className='font-medium text-[1rem] ' >CUSTOMER REQUIREMENT</h4>
            </div>
            <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
              {/* buttons */}
              <div className="flex gap-[8px] ">
                <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-white text-black ' >BUY</button>
                <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >RENT</button>
                <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >SELLER</button>
                <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >MORTGAGE</button>
                <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >LESSEE</button>
              </div>
              {/* all inputs */}
              <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                {/* city */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='city' value={projectData.city} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                  </select>
                </div>
                {/* project */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="project">Project:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='project' value={projectData.project} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="project1">Project1</option>
                    <option value="project2">Project2</option>
                    <option value="project3">Project3</option>
                  </select>
                </div>
                {/* block */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="block">Block:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='block' value={projectData.block} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="block1">Block1</option>
                    <option value="block2">Block2</option>
                    <option value="block3">Block3</option>
                  </select>
                </div>
                {/* property type */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='propertyType' value={projectData.propertyType} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="type1">Type1</option>
                    <option value="type2">Type2</option>
                    <option value="type3">Type3</option>
                  </select>
                </div>
                {/* home type */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='homeType' value={projectData.homeType} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="type1">Type1</option>
                    <option value="type2">Type2</option>
                    <option value="type3">Type3</option>
                  </select>
                </div>
                {/* min budget */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minBudget">MIN Budget:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="minBudget" value={projectData.minBudget} onChange={handleChange} />
                </div>
                {/* max budget */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxBudget">MAX Budget:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="maxBudget" value={projectData.maxBudget} onChange={handleChange} />
                </div>
                {/* min area unit */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minAreaUnit">Area:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='minAreaUnit' value={projectData.minAreaUnit} onChange={handleChange} >
                    <option value="">Square Feet</option>
                    <option value="unit1">unit1</option>
                    <option value="unit2">unit2</option>
                    <option value="unit3">unit3</option>
                  </select>
                </div>
                {/* min area */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minArea">MIN Budget:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="minArea" value={projectData.minArea} onChange={handleChange} />
                </div>
                {/* max area unit */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxAreaUnit">Area:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='maxAreaUnit' value={projectData.maxAreaUnit} onChange={handleChange} >
                    <option value="">Square Feet</option>
                    <option value="unit1">unit1</option>
                    <option value="unit2">unit2</option>
                    <option value="unit3">unit3</option>
                  </select>
                </div>
                {/* max area */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">MAX Budget:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="maxArea" value={projectData.maxArea} onChange={handleChange} />
                </div>
                {/* project priority */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="projectPriority">Project Priority:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='projectPriority' value={projectData.projectPriority} onChange={handleChange} >
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                {/* client type */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="clientType">Client Type:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='clientType' value={projectData.clientType} onChange={handleChange} >
                    <option value="">Please Select</option>
                    <option value="directClient">Direct Client</option>
                    <option value="agent">Agent</option>
                    <option value="investor">Investor</option>
                    <option value="investmentFund">Investment Fund</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/* allocated to */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="allocatedTo">Allocated To:</label>
                  <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' name='allocatedTo' value={projectData.allocatedTo} onChange={handleChange} >
                    <option value="">-</option>
                    <option value="user1">User1</option>
                    <option value="user2">User2</option>
                    <option value="user3">User3</option>
                  </select>
                </div>
                {/* beds */}
                <div className="flex flex-col justify-start gap-[4px] w-[31%] ">
                  <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
                  <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] min-h-[40px] ' type="number" name="beds" value={projectData.beds} onChange={handleChange} />
                </div>
              </div>
              {/* source */}
              <div className="flex flex-col gap-[1rem] ">
                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="source">Source:</label>
                <div className="flex flex-wrap justify-start gap-[8px] w-full ">
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='smsProject' onChange={handleChange} id="smsProject" />
                    <label htmlFor="smsProject">SMS Project</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='olx' onChange={handleChange} id="olx" />
                    <label htmlFor="olx">OLX</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='emailBlast' onChange={handleChange} id="emailBlast" />
                    <label htmlFor="emailBlast">Email Blast</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='clientReference' onChange={handleChange} id="clientReference" />
                    <label htmlFor="clientReference">Client Reference</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='googleAdword' onChange={handleChange} id="googleAdword" />
                    <label htmlFor="googleAdword">Google Adword</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='radio' onChange={handleChange} id="radio" />
                    <label htmlFor="radio">Radio</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='facebook' onChange={handleChange} id="facebook" />
                    <label htmlFor="facebook">Facebook</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='tv' onChange={handleChange} id="tv" />
                    <label htmlFor="tv">TV</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='personal' onChange={handleChange} id="personal" />
                    <label htmlFor="personal">Personal</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='newspaper' onChange={handleChange} id="newspaper" />
                    <label htmlFor="newspaper">Newspaper</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='emailProject' onChange={handleChange} id="emailProject" />
                    <label htmlFor="emailProject">Email Project</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='youtube' onChange={handleChange} id="youtube" />
                    <label htmlFor="youtube">Youtube</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='walk' onChange={handleChange} id="walk-in" />
                    <label htmlFor="walk-in">Walk-In</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='billBoards' onChange={handleChange} id="billBoards" />
                    <label htmlFor="billBoards">Bill Boards</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='streamers' onChange={handleChange} id="streamers" />
                    <label htmlFor="streamers">Streamers</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='smsMarketing' onChange={handleChange} id="smsMarketing" />
                    <label htmlFor="smsMarketing">SMS Marketing</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='clientFacebook' onChange={handleChange} id="clientFacebook" />
                    <label htmlFor="clientFacebook">Client Facebook</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='other' onChange={handleChange} id="other" />
                    <label htmlFor="other">Other</label>
                  </div>
                  <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                    <input type="checkbox" name="source" value='newpaperClassifieds' onChange={handleChange} id="newpaperClassifieds" />
                    <label htmlFor="newpaperClassifieds">Newpaper Classifieds</label>
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="w-full flex justify-end items-center">
                <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                  Save
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>

    </Modal>
  )
}

export default EditModal