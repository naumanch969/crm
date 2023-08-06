import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProject } from '../../redux/action/project'
import { Clear, UploadFile } from '@mui/icons-material'
import FileBase from 'react-file-base64'

const CreateProject = () => {

    //////////////////////////////////////// VARIABLES ////////////////////////////////////
    const imageRef = useRef(null)
    const dispatch = useDispatch()
    const initialState = {
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
    }

    //////////////////////////////////////// STATES ////////////////////////////////////
    const [projectData, setProjectData] = useState(initialState)
    const [images, setImages] = useState([])

    //////////////////////////////////////// USE EFFECTS ////////////////////////////////


    //////////////////////////////////////// FUNCTIONS //////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createProject({ ...projectData, images }))
    }
    const handleImageButtonClick = (e) => {
        e.preventDefault();
        imageRef.current.querySelector('input[type="file"]').click();
    }
    const handleAddImage = (files) => {
        let imagesArr = []
        files.map((img) => {
            if (images.includes(img)) console.log('image already exist')
            else imagesArr = imagesArr.concat(img.base64)
        })
        setImages([...images, ...imagesArr])
    }
    const removeImage = (e, img) => {
        e.preventDefault()
        setImages(images.filter(i => i != img))
    }

    const handleChange = (e) => {
        setProjectData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    return (
        <div className='flex flex-col gap-[1rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

            <div className="p-[8px] flex justify-between items-center sticky top-0 ">
                <h2 className='font-bold text-[24px] ' >Add Cutomer Detail</h2>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-[24px] w-full ' >

                <div className="flex flex-col rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
                    <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
                        <h4 className='font-medium text-[1rem] ' >CUSTOMER DETAILS</h4>
                    </div>
                    <div className="flex justify-between flex-wrap gap-[8px] p-[1rem] w-full ">
                        {/* name */}
                        <div className="flex flex-col justify-start gap-[4px] w-[25%] ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="name">Name:</label>
                            <div className="flex gap-[4px] ">
                                <select name='gender' value={projectData.gender} onChange={handleChange} className='py-[4px] px-[8px] rounded-[4px] w-[40%] ' >
                                    <option value="male">Mr.</option>
                                    <option value="female">Mrs.</option>
                                </select>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] w-[60%] ' type="text" name="name" value={projectData.name} onChange={handleChange} placeholder="Enter Customer Name" />
                            </div>
                        </div>
                        {/* primary phone */}
                        <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="primaryPhone">Primary Phone:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="primaryPhone" value={projectData.primaryPhone} onChange={handleChange} placeholder="Enter Primary Phone" />
                        </div>
                        {/* secondary phone */}
                        <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="secondaryPhone">Secondary Phone:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="secondaryPhone" value={projectData.secondaryPhone} onChange={handleChange} placeholder="Enter Secondary Phone" />
                        </div>
                        {/* location */}
                        <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="location">Location:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="location" value={projectData.location} onChange={handleChange} placeholder="Enter Location" />
                        </div>
                        {/* email */}
                        <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="email">Email:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="email" name="email" value={projectData.email} onChange={handleChange} placeholder="Enter Email" />
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
                        {/* images */}
                        <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
                            {
                                images?.map((img, index) => (
                                    <div key={index} className="relative rounded-[8px] overflow-hidden w-[10rem] h-[10rem] p-[8px] flex justify-center items-center  " >
                                        <img src={img} alt="" className="w-full h-full object-cover rounded-[8px] " />
                                        <button onClick={(e) => removeImage(e, img)} className="absolute top-[6px] right-[6px] text-white   " ><Clear /></button>
                                    </div>
                                ))
                            }
                            <div ref={imageRef} id='filebase_image' className="flex justify-center items-center rounded-[8px] h-[10rem] w-[10rem] p-[8px] overflow-hidden bg-gray-300 ">
                                <button onClick={handleImageButtonClick} className="flex  justify-center items-center " >
                                    <UploadFile style={{ fontSize: '4rem', color: '#555' }} />
                                </button>
                                <FileBase type="file" multiple onDone={(files) => handleAddImage(files)} />
                            </div>
                        </div>
                        {/* all inputs */}
                        <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                            {/* city */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={projectData.city} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="lahore">Lahore</option>
                                    <option value="karachi">Karachi</option>
                                    <option value="islamabad">Islamabad</option>
                                </select>
                            </div>
                            {/* project */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="project">Project:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='project' value={projectData.project} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="project1">Project1</option>
                                    <option value="project2">Project2</option>
                                    <option value="project3">Project3</option>
                                </select>
                            </div>
                            {/* block */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="block">Block:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='block' value={projectData.block} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="block1">Block1</option>
                                    <option value="block2">Block2</option>
                                    <option value="block3">Block3</option>
                                </select>
                            </div>
                            {/* property type */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={projectData.propertyType} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="type1">Type1</option>
                                    <option value="type2">Type2</option>
                                    <option value="type3">Type3</option>
                                </select>
                            </div>
                            {/* home type */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={projectData.homeType} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="type1">Type1</option>
                                    <option value="type2">Type2</option>
                                    <option value="type3">Type3</option>
                                </select>
                            </div>
                            {/* min budget */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minBudget">MIN Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="minBudget" value={projectData.minBudget} onChange={handleChange} />
                            </div>
                            {/* max budget */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxBudget">MAX Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="maxBudget" value={projectData.maxBudget} onChange={handleChange} />
                            </div>
                            {/* min area unit */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minAreaUnit">Area:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='minAreaUnit' value={projectData.minAreaUnit} onChange={handleChange} >
                                    <option value="">Square Feet</option>
                                    <option value="unit1">unit1</option>
                                    <option value="unit2">unit2</option>
                                    <option value="unit3">unit3</option>
                                </select>
                            </div>
                            {/* min area */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minArea">MIN Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="minArea" value={projectData.minArea} onChange={handleChange} />
                            </div>
                            {/* max area unit */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxAreaUnit">Area:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='maxAreaUnit' value={projectData.maxAreaUnit} onChange={handleChange} >
                                    <option value="">Square Feet</option>
                                    <option value="unit1">unit1</option>
                                    <option value="unit2">unit2</option>
                                    <option value="unit3">unit3</option>
                                </select>
                            </div>
                            {/* max area */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">MAX Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="maxArea" value={projectData.maxArea} onChange={handleChange} />
                            </div>
                            {/* project priority */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="projectPriority">Project Priority:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='projectPriority' value={projectData.projectPriority} onChange={handleChange} >
                                    <option value="high">High</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            {/* client type */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="clientType">Client Type:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='clientType' value={projectData.clientType} onChange={handleChange} >
                                    <option value="">Please Select</option>
                                    <option value="directClient">Direct Client</option>
                                    <option value="agent">Agent</option>
                                    <option value="investor">Investor</option>
                                    <option value="investmentFund">Investment Fund</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            {/* allocated to */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="allocatedTo">Allocated To:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='allocatedTo' value={projectData.allocatedTo} onChange={handleChange} >
                                    <option value="">-</option>
                                    <option value="user1">User1</option>
                                    <option value="user2">User2</option>
                                    <option value="user3">User3</option>
                                </select>
                            </div>
                            {/* beds */}
                            <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={projectData.beds} onChange={handleChange} />
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
    )
}

export default CreateProject