import { Modal } from '@mui/material'
import React from 'react'

const DeleteModal = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} >
      
      <div className="">

      </div>
    </Modal>
  )
}

export default DeleteModal