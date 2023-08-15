import { Avatar, Box, Divider, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const LatestActivity = () => {


    const latestActivities = [
        {
          id: 1,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 2,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 3,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 4,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 5,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 6,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 7,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 8,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 9,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 10,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 11,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 12,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
        {
          id: 13,
          name: 'henry',
          time: 2,
          description: 'This is demo Description',
        },
      ]

    return (
        <Box className='w-full h-auto bg-white rounded-lg mt-5 pb-4'>

            <div className='flex justify-center text-xl pt-4'>Latest Activty</div>
            <Box className='w-full max-h-96 p-1 rounded-lg overflow-scroll'>
                <List sx={{ width: '100%' }}>
                    {latestActivities.map((item, index) => (
                        <React.Fragment key={index} >
                            <ListItemButton key={item.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {item.description} — &nbsp;
                                            </Typography>
                                            {item.time} Hours Ago
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

export default LatestActivity