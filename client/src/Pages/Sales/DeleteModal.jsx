import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteSale } from '../../redux/action/sale'
import { useDispatch, useSelector } from 'react-redux'

const DeleteModal = ({ open, setOpen, saleId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.sale)

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteSale(saleId))
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
          {isFetching ? 'Deleting' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default DeleteModal