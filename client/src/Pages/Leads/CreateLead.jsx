import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createLead } from '../../redux/action/lead'

const CreateLead = () => {

    //////////////////////////////////////// VARIABLES ////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching } = useSelector(state => state.lead)

    //////////////////////////////////////// STATES ////////////////////////////////////
    const [clientData, setClientData] = useState({ gender: 'male', firstName: '', lastName: '', phone: '', email: '', cnic: '', })
    const [leadData, setLeadData] = useState({
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
        priority: 'high',
        clientType: '',
        allocatedTo: '',
        beds: 0,
        source: []
    })

    //////////////////////////////////////// USE EFFECTS ////////////////////////////////


    //////////////////////////////////////// FUNCTIONS //////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        const { gender, firstName, lastName, phone, email, cnic } = clientData
        const { city, project, block, propertyType, homeType, minBudget, maxBudget, minAreaUnit, minArea, maxAreaUnit, maxArea, priority, clientType, allocatedTo, beds, source } = leadData
        if (!gender || !firstName || !lastName || !phone || !email || !cnic || !city || !project || !block || !propertyType || !homeType || !minBudget || !maxBudget || !minAreaUnit || !minArea || !maxAreaUnit || !maxArea || !priority || !clientType || !allocatedTo || !beds || !source)
            return alert('make sure to provide all the fields')

        dispatch(createLead({ ...leadData, ...clientData }, 'onsite', navigate))

    }

    const handleLeadDataChange = (e) => {
        const { name, value } = e.target
        name == 'source'
            ?
            (
                leadData.source.includes(value)
                    ?
                    setLeadData(pre => ({ ...pre, source: leadData.source.filter(s => s != value) }))
                    :
                    setLeadData(pre => ({ ...pre, source: [...leadData.source, value] }))

            )
            :
            setLeadData(pre => ({ ...pre, [name]: value }))
    }

    const handleClientDataChange = (e) => {
        setClientData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }



    return (
        <div className='flex flex-col gap-[1rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

            <div className="p-[8px] flex justify-between items-center bg-white ">
                <h2 className='font-bold text-[24px] ' >Add New Lead</h2>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-[24px] w-full ' >

                {/* client data */}
                <div className="flex flex-col rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
                    <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
                        <h4 className='font-medium text-[1rem] ' >CUSTOMER DETAILS</h4>
                    </div>
                    <div className="flex justify-start flex-wrap gap-[24px] w-full p-[1rem] ">
                        {/* first name */}
                        <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="firstName">First Name:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="firstName" value={clientData.firstName} onChange={handleClientDataChange} placeholder="Last Name" />
                        </div>
                        {/* last name */}
                        <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="lastName">lastName:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="lastName" value={clientData.lastName} onChange={handleClientDataChange} placeholder="First Name" />
                        </div>
                        {/* gender */}
                        <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="gender">Gender:</label>
                            <div className="flex gap-[8px] py-[8px] ">
                                <div className="flex gap-[2px] ">
                                    <label className='text-gray-500 font-light text-[16px] ' htmlFor="male">Male</label>
                                    <input type="radio" onChange={handleClientDataChange} value={clientData.gender} name="gender" id="male" />
                                </div>
                                <div className="flex gap-[2px] ">
                                    <label className='text-gray-500 font-light text-[16px]  ' htmlFor="female">Female</label>
                                    <input type="radio" onChange={handleClientDataChange} value={clientData.gender} name="gender" id="female" />
                                </div>
                            </div>
                        </div>
                        {/* phone */}
                        <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="phone">phone:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="phone" value={clientData.phone} onChange={handleClientDataChange} placeholder="Phone" />
                        </div>
                        {/* cnic */}
                        <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="cnic">CNIC:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="cnic" value={clientData.cnic} onChange={handleClientDataChange} placeholder="Phone" />
                        </div>
                        {/* email */}
                        <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="email">Email:</label>
                            <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="email" name="email" value={clientData.email} onChange={handleClientDataChange} placeholder="Enter Email" />
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
                        <div className="flex flex-wrap gap-[8px] ">
                            <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-white text-black ' >BUY</button>
                            <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >RENT</button>
                            <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >SELLER</button>
                            <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >MORTGAGE</button>
                            <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >LESSEE</button>
                        </div>
                        {/* all inputs */}
                        <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                            {/* city */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={leadData.city} onChange={handleLeadDataChange} >
                                    <option value="">-</option>
                                    <option value="lahore">Lahore</option>
                                    <option value="karachi">Karachi</option>
                                    <option value="islamabad">Islamabad</option>
                                </select>
                            </div>
                            {/* project */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="project">Project:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='project' value={leadData.project} onChange={handleLeadDataChange} >
                                    <option value="">-</option>
                                    <option value="project1">Project1</option>
                                    <option value="project2">Project2</option>
                                    <option value="project3">Project3</option>
                                </select>
                            </div>
                            {/* block */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="block">Block:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='block' value={leadData.block} onChange={handleLeadDataChange} >
                                    <option value="">-</option>
                                    <option value="block1">Block1</option>
                                    <option value="block2">Block2</option>
                                    <option value="block3">Block3</option>
                                </select>
                            </div>
                            {/* property type */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={leadData.propertyType} onChange={handleLeadDataChange} >
                                    <option value="">-</option>
                                    <option value="type1">Type1</option>
                                    <option value="type2">Type2</option>
                                    <option value="type3">Type3</option>
                                </select>
                            </div>
                            {/* home type */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={leadData.homeType} onChange={handleLeadDataChange} >
                                    <option value="">-</option>
                                    <option value="type1">Type1</option>
                                    <option value="type2">Type2</option>
                                    <option value="type3">Type3</option>
                                </select>
                            </div>
                            {/* min budget */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minBudget">MIN Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="minBudget" value={leadData.minBudget} onChange={handleLeadDataChange} />
                            </div>
                            {/* max budget */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxBudget">MAX Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="maxBudget" value={leadData.maxBudget} onChange={handleLeadDataChange} />
                            </div>
                            {/* min area unit */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minAreaUnit">Area:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='minAreaUnit' value={leadData.minAreaUnit} onChange={handleLeadDataChange} >
                                    <option value="">Square Feet</option>
                                    <option value="unit1">unit1</option>
                                    <option value="unit2">unit2</option>
                                    <option value="unit3">unit3</option>
                                </select>
                            </div>
                            {/* min area */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minArea">MIN Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="minArea" value={leadData.minArea} onChange={handleLeadDataChange} />
                            </div>
                            {/* max area unit */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxAreaUnit">Area:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='maxAreaUnit' value={leadData.maxAreaUnit} onChange={handleLeadDataChange} >
                                    <option value="">Square Feet</option>
                                    <option value="unit1">unit1</option>
                                    <option value="unit2">unit2</option>
                                    <option value="unit3">unit3</option>
                                </select>
                            </div>
                            {/* max area */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">MAX Budget:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="maxArea" value={leadData.maxArea} onChange={handleLeadDataChange} />
                            </div>
                            {/* lead priority */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="priority">Lead Priority:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='priority' value={leadData.priority} onChange={handleLeadDataChange} >
                                    <option value="high">High</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            {/* client type */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="clientType">Client Type:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='clientType' value={leadData.clientType} onChange={handleLeadDataChange} >
                                    <option value="">Please Select</option>
                                    <option value="directClient">Direct Client</option>
                                    <option value="agent">Agent</option>
                                    <option value="investor">Investor</option>
                                    <option value="investmentFund">Investment Fund</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            {/* allocated to */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="allocatedTo">Allocated To:</label>
                                <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='allocatedTo' value={leadData.allocatedTo} onChange={handleLeadDataChange} >
                                    <option value="">-</option>
                                    <option value="user1">User1</option>
                                    <option value="user2">User2</option>
                                    <option value="user3">User3</option>
                                </select>
                            </div>
                            {/* beds */}
                            <div className="flex flex-col justify-start gap-[4px] lg:w-[23%] md:w-[31%] sm:w-[47%] w-full ">
                                <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
                                <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={leadData.beds} onChange={handleLeadDataChange} />
                            </div>
                        </div>
                        {/* source */}
                        <div className="flex flex-col gap-[1rem] ">
                            <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="source">Source:</label>
                            <div className="flex flex-wrap justify-start gap-[8px] w-full ">
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='smsLead' onChange={handleLeadDataChange} id="smsLead" />
                                    <label htmlFor="smsLead">SMS Lead</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='olx' onChange={handleLeadDataChange} id="olx" />
                                    <label htmlFor="olx">OLX</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='emailBlast' onChange={handleLeadDataChange} id="emailBlast" />
                                    <label htmlFor="emailBlast">Email Blast</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='clientReference' onChange={handleLeadDataChange} id="clientReference" />
                                    <label htmlFor="clientReference">Client Reference</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='googleAdword' onChange={handleLeadDataChange} id="googleAdword" />
                                    <label htmlFor="googleAdword">Google Adword</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='radio' onChange={handleLeadDataChange} id="radio" />
                                    <label htmlFor="radio">Radio</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='facebook' onChange={handleLeadDataChange} id="facebook" />
                                    <label htmlFor="facebook">Facebook</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='tv' onChange={handleLeadDataChange} id="tv" />
                                    <label htmlFor="tv">TV</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='personal' onChange={handleLeadDataChange} id="personal" />
                                    <label htmlFor="personal">Personal</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='newspaper' onChange={handleLeadDataChange} id="newspaper" />
                                    <label htmlFor="newspaper">Newspaper</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='emailLead' onChange={handleLeadDataChange} id="emailLead" />
                                    <label htmlFor="emailLead">Email Lead</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='youtube' onChange={handleLeadDataChange} id="youtube" />
                                    <label htmlFor="youtube">Youtube</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='walk' onChange={handleLeadDataChange} id="walk-in" />
                                    <label htmlFor="walk-in">Walk-In</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='billBoards' onChange={handleLeadDataChange} id="billBoards" />
                                    <label htmlFor="billBoards">Bill Boards</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='streamers' onChange={handleLeadDataChange} id="streamers" />
                                    <label htmlFor="streamers">Streamers</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='smsMarketing' onChange={handleLeadDataChange} id="smsMarketing" />
                                    <label htmlFor="smsMarketing">SMS Marketing</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='clientFacebook' onChange={handleLeadDataChange} id="clientFacebook" />
                                    <label htmlFor="clientFacebook">Client Facebook</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='other' onChange={handleLeadDataChange} id="other" />
                                    <label htmlFor="other">Other</label>
                                </div>
                                <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
                                    <input type="checkbox" name="source" value='newpaperClassifieds' onChange={handleLeadDataChange} id="newpaperClassifieds" />
                                    <label htmlFor="newpaperClassifieds">Newpaper Classifieds</label>
                                </div>
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

export default CreateLead