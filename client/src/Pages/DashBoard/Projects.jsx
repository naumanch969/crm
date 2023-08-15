import { Avatar, Box, Divider, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Projects = () => {

    const Projectsdata = [
        {
          id: 1,
          action: 'Not Started',
          assigned: 0,
        },
        {
          id: 2,
          action: 'In Progress',
          assigned: 3,
        },
        {
          id: 3,
          action: 'On Hold',
          assigned: 1,
        },
        {
          id: 4,
          action: 'Completed',
          assigned: 5,
        },
      ]
    

    return (
        <Box className='w-7/12 h-full bg-white mt-5 ml-5 p-2'>
            <div className='flex justify-center text-xl'>Projects</div>
            <Box className='w-full max-h-96 p-1 rounded-lg overflow-scroll'>
                <List sx={{ width: '100%' }}>
                    {Projectsdata.map((item, index) => (
                        <React.Fragment key={index} >
                            <ListItemButton key={item.id} alignItems="flex-start">
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
        </Box>
    )
}

export default Projects