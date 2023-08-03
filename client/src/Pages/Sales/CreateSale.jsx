import React, { useState } from 'react'

const CreateSale = () => {

    const [saleData, setSaleData] = useState(
        { invoiceNumber: 0, createdAt: '', supplierName: '', leadId: '', net: 0, received: 0, psf: 0, fop: 0, branch: '', staff: '', },
    )

    const stats = [
        { title: 'Completed', numbers: 100 },
        { title: 'Pending', numbers: 0 },
        { title: 'Delayed', numbers: 0 },
        { title: 'Started', numbers: 0 },
    ]


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(saleData)
    }


    const handleChange = (e) => {
        setSaleData({ ...saleData, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex flex-col gap-[2rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

            <div className="flex justify-between gap-[24px] w-full">
                {
                    stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center flex-[1] px-[2rem] py-[1rem] shadow-md rounded-[4px]  ">
                            <span className='text-gray-500 font-semibold text-[20px] text-center ' >{stat.title}</span>
                            <span className='text-[22px] font-semibold ' >{stat.numbers}</span>
                        </div>
                    ))
                }
            </div>

          
            <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full px-[2rem] py-[1rem] ' >

                <div className="w-full flex gap-[3rem]  ">
                    <div className="flex-[1] flex flex-col gap-[1rem]  ">
                        {/* invoice number */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="invoiceNumber">First Name</label>
                            <input type="number" onChange={handleChange} value={saleData.invoiceNumber} name="invoiceNumber" id="invoiceNumber" placeholder='Invoice Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* supplier name */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="supplierName">Supplier Name</label>
                            <input type="text" onChange={handleChange} value={saleData.supplierName} name="supplierName" id="supplierName" placeholder='Supplier Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* net */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="net">Net</label>
                            <input type="number" onChange={handleChange} value={saleData.net} name="net" id="net" placeholder='Net' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* received */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="received">Received</label>
                            <input type="number" onChange={handleChange} value={saleData.received} name="received" id="received" placeholder='Received' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                    </div>


                    <div className="flex-[1] flex flex-col gap-[1rem]  ">
                        {/* psf */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="psf">PSF</label>
                            <input type="number" onChange={handleChange} value={saleData.psf} name="psf" id="psf" placeholder='PSF' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* fop */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="fop">Password</label>
                            <input type="number" onChange={handleChange} value={saleData.fop} name="fop" id="fop" placeholder='FOP' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* branch */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="branch">CNIC</label>
                            <input type="text" onChange={handleChange} value={saleData.branch} name="branch" id="branch" placeholder='Branch' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                        {/* staff */}
                        <div className="flex flex-col gap-[4px] ">
                            <label className='text-black font-medium text-[16px] ' htmlFor="staff">Staff</label>
                            <input type="text" onChange={handleChange} value={saleData.staff} name="staff" id="staff" placeholder='Staff' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
                        </div>
                    </div>
                </div>


                <div className="w-full flex justify-end items-center">
                    <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
                        Save
                    </button>
                </div>


            </form>

        </div>
    )
}

export default CreateSale