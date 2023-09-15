import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { deleteProject } from '../../../redux/action/project'
import { useDispatch, useSelector } from 'react-redux'

const DeleteProject = ({ open, setOpen, projectId }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching } = useSelector(state => state.project)

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteProject(projectId))
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Delete the Project?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this project?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' style={{ backgroundColor:'gray' }} onClick={handleClose}>Cancel</Button>
        <Button variant='contained' color='error' onClick={handleDelete} autoFocus>
          {isFetching ? 'Deleting' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default DeleteProject