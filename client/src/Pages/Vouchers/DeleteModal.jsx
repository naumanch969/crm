import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVoucher } from '../../redux/action/voucher'

const DeleteModal = ({ open, setOpen, voucherId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const { isFetching } = useSelector(state => state.voucher)
  const dispatch = useDispatch()

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteVoucher(voucherId))
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Delete the Voucher?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this voucher?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleDelete} autoFocus>
          {isFetching ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default DeleteModal