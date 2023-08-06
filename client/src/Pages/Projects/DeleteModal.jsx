import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteProject } from '../../redux/action/project'
import { useDispatch } from 'react-redux'

const DeleteModal = ({ open, setOpen, projectId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    dispatch(deleteProject(projectId))
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
        Delete the User?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this project?
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