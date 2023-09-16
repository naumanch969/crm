import { Avatar, Box, Divider, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

const Projects = () => {

    const dispatch = useDispatch()
    const { stats: projectsStats, isFetching } = useSelector(state => state.project)

    useEffect(() => {
        // dispatch(getUserAssignedProjectsStats())
    }, [])

    return (
        <Box className='w-7/12 h-full bg-white mt-5 ml-5 p-2'>
            <div className='flex justify-center text-xl'>Projects</div>
            {
                isFetching
                    ?
                    <div className='w-full h-full flex justify-center items-center ' >
                        <CircularProgress />
                    </div>
                    :
                    <Box className='w-full max-h-96 p-1 rounded-lg overflow-scroll'>
                        <List sx={{ width: '100%' }}>
                            {projectsStats.map((item, index) => (
                                <React.Fragment key={index} >
                                    <ListItemButton alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: 'orange' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.action}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ font: 'light' }}
                                                        component="span"
                                                        variant="body2"
                                                    >
                                                        {"Assigned to me : "}
                                                    </Typography>
                                                    {item.assigned}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
            }
        </Box>
    )
}

export default Projects