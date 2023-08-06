import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteLead } from '../../redux/action/lead'
import { useDispatch } from 'react-redux'

const DeleteModal = ({ open, setOpen, leadId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteLead(leadId))
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        Delete the User?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this lead?
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