import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSale } from '../../redux/action/sale'

const EditModal = ({ open, setOpen }) => {

  //////////////////////////////////////// VARIABLES ///////////////////////////////////
  const initialState = { invoiceNumber: 0, createdAt: '', supplierName: '', leadId: '', net: 0, received: 0, psf: 0, fop: 0, branch: '', staff: '', }
  const dispatch = useDispatch()
  const { currentSale: sale, isFetching } = useSelector(state => state.sale)

  //////////////////////////////////////// STATES ///////////////////////////////////
  const [saleData, setSaleData] = useState(sale)

  //////////////////////////////////////// STATES ///////////////////////////////////
  useEffect(() => {
    setSaleData(sale)
  }, [sale])

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateSale(sale._id, saleData))
    setOpen(false)
  }
  const handleChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value })
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

      <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

        <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
          <h2 className='font-bold text-[24px] ' >Update Sale</h2>
          <IconButton onClick={handleClose} ><Close className='text-white' /></IconButton>
        </div>


        <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem] w-full px-[2rem] py-[1rem] ' >

          <div className="w-full flex gap-[3rem]  ">
            <div className="flex-[1] flex flex-col gap-[1rem]  ">
              {/* invoice number */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="invoiceNumber">Invoice Number</label>
                <input type="number" onChange={handleChange} value={saleData?.invoiceNumber} name="invoiceNumber" id="invoiceNumber" placeholder='Invoice Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* supplier name */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="supplierName">Supplier Name</label>
                <input type="text" onChange={handleChange} value={saleData?.supplierName} name="supplierName" id="supplierName" placeholder='Supplier Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* net */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="net">Net</label>
                <input type="number" onChange={handleChange} value={saleData?.net} name="net" id="net" placeholder='Net' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* received */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="received">Received</label>
                <input type="number" onChange={handleChange} value={saleData?.received} name="received" id="received" placeholder='Received' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
            </div>


            <div className="flex-[1] flex flex-col gap-[1rem]  ">
              {/* psf */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="psf">PSF</label>
                <input type="number" onChange={handleChange} value={saleData?.psf} name="psf" id="psf" placeholder='PSF' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* fop */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="fop">FOP</label>
                <input type="number" onChange={handleChange} value={saleData?.fop} name="fop" id="fop" placeholder='FOP' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* branch */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="branch">Branch</label>
                <input type="text" onChange={handleChange} value={saleData?.branch} name="branch" id="branch" placeholder='Branch' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
              {/* staff */}
              <div className="flex flex-col gap-[4px] ">
                <label className='text-black font-medium text-[16px] ' htmlFor="staff">Staff</label>
                <input type="text" onChange={handleChange} value={saleData?.staff} name="staff" id="staff" placeholder='Staff' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
              </div>
            </div>
          </div>


          <div className="w-full flex justify-end items-center">
            <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
              {isFetching ? 'Updating' : 'Update'}
            </button>
          </div>


        </form>

      </div>

    </Modal>
  )
}

export default EditModal