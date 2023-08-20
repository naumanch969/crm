import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { updateProject } from '../../redux/action/project'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllImagesReducer } from '../../redux/reducer/upload'
import { Upload } from '../../utils'

const EditModal = ({ open, setOpen }) => {

  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch()
  const { currentProject: project, isFetching } = useSelector(state => state.project)
  const { urls } = useSelector(state => state.upload)

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [projectData, setProjectData] = useState(project)

  //////////////////////////////////////// USE EFFEECT ////////////////////////////////////////////
  useEffect(() => {
    setProjectData(project)
  }, [project])
  useEffect(() => {
    setProjectData({ ...projectData, images: urls })
  }, [urls])

  //////////////////////////////////////// FUNCTION ////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProject(project._id, { ...projectData }))
    setOpen(false)

    dispatch(deleteAllImagesReducer())
  }
  const handleChange = (e) => {
    setProjectData(pre => ({ ...pre, [e.target.name]: e.target.value }))
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

      <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

        <div className="z-[100] bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
          <h2 className='font-bold text-[24px] ' >Update Project</h2>
          <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-wrap gap-[1rem] w-full p-[1rem] ' >

          {/* images */}
          <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
            <Upload image={projectData?.images} isMultiple={true} />
          </div>
          {/* all inputs */}
          <div className="flex justify-start flex-wrap gap-[24px] w-full ">
            {/* city */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
              <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={projectData?.city} onChange={handleChange} >
                <option value="">-</option>
                <option value="lahore">Lahore</option>
                <option value="karachi">Karachi</option>
                <option value="islamabad">Islamabad</option>
              </select>
            </div>
            {/* area */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="region">Region:</label>
              <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="region" value={projectData?.region} onChange={handleChange} />
            </div>
            {/* property type */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
              <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={projectData?.propertyType} onChange={handleChange} >
                <option value="">Select Property Type</option>
                <option value="comercial">Comercial</option>
                <option value="residential">Residential</option>
              </select>
            </div>
            {/* home type */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
              <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={projectData?.homeType} onChange={handleChange} >
                <option value="">-</option>
                <option value="bangla">Bangla</option>
                <option value="appartment">Apartment</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            {/* price */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="price">Price:</label>
              <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="price" value={projectData?.price} onChange={handleChange} />
            </div>
            {/* area */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">Area:</label>
              <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="area" value={projectData?.area} onChange={handleChange} />
            </div>
            {/* area unit */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="areaUnit">Area Unit:</label>
              <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='areaUnit' value={projectData?.areaUnit} onChange={handleChange} >
                <option value="squareFeet">Square Feet</option>
                <option value="marla">Marla</option>
              </select>
            </div>
            {/* priority */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="priority">Project Priority:</label>
              <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='priority' value={projectData?.priority} onChange={handleChange} >
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
            </div>
            {/* beds */}
            <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
              <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
              <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={projectData?.beds} onChange={handleChange} />
            </div>
          </div>
          {/* button */}
          <div className="w-full flex justify-end items-center">
            <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
              {isFetching ? 'Saving' : 'Save'}
            </button>
          </div>

        </form>




      </div>

    </Modal>
  )
}

export default EditModal