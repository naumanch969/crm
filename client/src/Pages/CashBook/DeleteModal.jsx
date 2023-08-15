import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteCashbook } from '../../redux/action/cashbook'
import { useDispatch, useSelector } from 'react-redux'

const DeleteModal = ({ open, setOpen, cashbookId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.cashbook)

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteCashbook(cashbookId))
    setOpen(false)
  }


  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Delete the Cashbook?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this cashbook?
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