import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteSale } from '../../redux/action/sale'
import { useDispatch } from 'react-redux'

const DeleteModal = ({ open, setOpen, saleId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    dispatch(deleteSale(saleId))
    setOpen(false)
  }
  const handleDelete = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Delete the Sale?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this sale?
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