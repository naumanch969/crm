import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteApproval } from '../../../redux/action/approval'
import { useDispatch } from 'react-redux'

const DeleteModal = ({ open, setOpen, approvalId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteApproval(approvalId, "voucher"))
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Delete the Request?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this aproval request?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default DeleteModal