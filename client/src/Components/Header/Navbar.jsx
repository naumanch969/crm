import { AppBar } from '@mui/material';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, Tooltip } from '@mui/material'
import { Menu, Alarm, NotificationsActiveOutlined, TimerOutlined, QuestionAnswerOutlined, SettingsOutlined, ControlPointDuplicateRounded, Language, Close } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';


const Navbar = ({ open, setOpen, date, setDate }) => {

    ////////////////////////////////////// states /////////////////////////////////////
    const [state, setState] = useState({ right: false });

    ////////////////////////////////////// variables ///////////////////////////////////
    const drawerWidth = 240;

    ////////////////////////////////////// use effects ////////////////////////////////
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)

        return function cleanup() {
            clearInterval(timer)
        }
    })

    ////////////////////////////////////// functions //////////////////////////////////
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    ////////////////////////////////////// Components //////////////////////////////////
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}      // Drawer Width
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Toolbar className='bg-sky-400 text-white mt-16'>
                <NotificationsActiveOutlined sx={{ fontSize: '30px', marginRight: '5px' }} /><p className='text-2xl font-Mulish'>Notifications</p>
                <Close className='text-white mt-1 cursor-pointer ml-28' />
            </Toolbar>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <React.Fragment key={index} >
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar>H</Avatar>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
    const CustomAppBar = styled(AppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));



    return (
        <CustomAppBar position="fixed" open={open}>
            <Toolbar className='bg-white text-slate-600'>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}>
                    <Menu />
                </IconButton>

                <Typography className='text-red-400' variant="h6" sx={{ flexGrow: 1 }}><TimerOutlined className='mb-1' /> {date.toLocaleTimeString()}</Typography>

                <Tooltip title="Timer" arrow placement="bottom">
                    <IconButton className='hover:text-red-400' aria-label="menu">
                        <Alarm />
                    </IconButton>
                </Tooltip>

                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Tooltip title="Notifications" arrow placement="bottom">
                            <IconButton className='hover:text-red-400' onClick={toggleDrawer(anchor, true)} size="large" aria-label="menu">
                                <NotificationsActiveOutlined />
                            </IconButton>
                        </Tooltip>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                        >
                            {list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))}

                <Tooltip title="Timer" arrow placement="bottom">
                    <IconButton className='hover:text-red-400' size="large" aria-label="menu">
                        <TimerOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Timer" arrow placement="bottom">
                    <IconButton className='hover:text-red-400' size="large" aria-label="menu">
                        <QuestionAnswerOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Settings" arrow placement="bottom">
                    <IconButton className='hover:text-red-400' size="large" aria-label="menu">
                        <SettingsOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Add User" arrow placement="bottom">
                    <IconButton className='hover:text-red-400' size="large" aria-label="menu">
                        <ControlPointDuplicateRounded />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Language" arrow placement="bottom">
                    <IconButton className='hover:text-red-400' size="large" aria-label="menu">
                        <Language />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Profile" arrow placement="bottom">
                    <Avatar className='m-2 cursor-pointer'>H</Avatar>
                </Tooltip>

            </Toolbar>
        </CustomAppBar>
    )
}

export default Navbar