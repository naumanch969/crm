import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProject } from '../../redux/action/project'
import { Clear, UploadFile } from '@mui/icons-material'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom'
import { Upload } from '../../utils'
import { deleteAllImagesReducer } from '../../redux/reducer/upload'

const CreateProject = () => {

    //////////////////////////////////////// VARIABLES ////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.project)
    const { urls, } = useSelector(state => state.upload)
    const initialState = {
        city: '',
        region: '',
        propertyType: 'Homes',
        homeType: 'House',
        price: '',
        area: '',
        areaUnit: 'squareFeet',
        priority: 'high',
        beds: '',
        images: []
    }

    //////////////////////////////////////// STATES ////////////////////////////////////
    const [projectData, setProjectData] = useState(initialState)

    //////////////////////////////////////// USE EFFECTS ////////////////////////////////
    useEffect(() => {
        setProjectData({ ...projectData, images: urls })
    }, [urls])

    //////////////////////////////////////// FUNCTIONS //////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createProject(projectData, navigate))

        dispatch(deleteAllImagesReducer())
    }
    const handleChange = (e) => {
        setProjectData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }


    return (
        <div className='flex flex-col gap-[1rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

            <div className="p-[8px] flex justify-between items-center sticky top-0 ">
                <h2 className='font-bold text-[24px] ' >Add Project Detail</h2>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-[24px] w-full ' >

                <div className="flex flex-col gap-[1rem] rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
                    {/* heading */}
                    <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
                        <h4 className='font-medium text-[1rem] ' >Project Fields</h4>
                    </div>
                    <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
                        {/* images */}
                        <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
                            <Upload image={projectData?.images} isMultiple={true} />
                        </div> 
                        {/* all inputs */}
                        <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                            {/* city */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={projectData.city} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="lahore">Lahore</option>
                                    <option value="karachi">Karachi</option>
                                    <option value="islamabad">Islamabad</option>
                                </select>
                            </div>
                            {/* area */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="region">Region:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="region" value={projectData.region} onChange={handleChange} />
                            </div>
                            {/* property type */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={projectData.propertyType} onChange={handleChange} >
                                    <option value="">Select Property Type</option>
                                    <option value="comercial">Comercial</option>
                                    <option value="residential">Residential</option>
                                </select>
                            </div>
                            {/* home type */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={projectData.homeType} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="bangla">Bangla</option>
                                    <option value="appartment">Apartment</option>
                                    <option value="restaurant">Restaurant</option>
                                </select>
                            </div>
                            {/* price */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="price">Price:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="price" value={projectData.price} onChange={handleChange} />
                            </div>
                            {/* area */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">Area:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="area" value={projectData.area} onChange={handleChange} />
                            </div>
                            {/* area unit */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="areaUnit">Area Unit:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='areaUnit' value={projectData.areaUnit} onChange={handleChange} >
                                    <option value="squareFeet">Square Feet</option>
                                    <option value="marla">Marla</option>
                                </select>
                            </div>
                            {/* priority */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="priority">Project Priority:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='priority' value={projectData.priority} onChange={handleChange} >
                                    <option value="high">High</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            {/* beds */}
                            <div className="flex flex-col justify-start gap-[4px] md:w-[30%] sm:w-[47%] w-full">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={projectData.beds} onChange={handleChange} />
                            </div>
                        </div>
                        {/* button */}
                        <div className="w-full flex justify-end items-center">
                            <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                                {isFetching ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default CreateProject