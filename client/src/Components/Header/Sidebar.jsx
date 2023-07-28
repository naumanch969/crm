import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, HomeOutlined, PeopleAltOutlined, AssignmentOutlined, AccountCircleOutlined, LockOutlined, LocalAtmOutlined, ShoppingCartOutlined, CardGiftcardOutlined, SummarizeOutlined } from '@mui/icons-material'
import { Drawer, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, CssBaseline, Tooltip } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx'

const Sidebar = ({ open, setOpen, date, setDate, DrawerHeader }) => {

    ////////////////////////////////////// states /////////////////////////////////////
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState(null);

    ////////////////////////////////////// variables //////////////////////////////////
    const drawerWidth = 240;
    const links = [
        {
            id: 1,
            title: 'DashBoard',
            link: '/',
            icon: <HomeOutlined />
        },
        {
            id: 2,
            title: 'Leads',
            link: '/leads',
            icon: <PeopleAltOutlined />
        },
        {
            id: 3,
            title: 'To Do Tasks',
            link: '/tasks',
            icon: <AssignmentOutlined />
        },
        {
            id: 4,
            title: 'User',
            link: '/user',
            icon: <AccountCircleOutlined />
        },
        {
            id: 5,
            title: 'Authorization',
            link: '/auths',
            icon: <LockOutlined />
        },
        {
            id: 6,
            title: 'Cash Book',
            link: '/cashbook',
            icon: <LocalAtmOutlined />
        },
        {
            id: 7,
            title: 'Sales',
            link: '/sales',
            icon: <ShoppingCartOutlined />
        },
        {
            id: 8,
            title: 'Vouchers',
            link: '/voucher',
            icon: <CardGiftcardOutlined />
        },
        {
            id: 9,
            title: 'Report',
            link: '/report',
            icon: <SummarizeOutlined />
        },
    ]

    ////////////////////////////////////// useEffect //////////////////////////////////
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    })

    ////////////////////////////////////// function ////////////////////////////////////
    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    ////////////////////////////////////// Components ////////////////////////////////////
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });
    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    const CustomListItem = styled(ListItemButton)(({ theme, selected }) => ({
        color: 'rgb(107 114 128)',
        '&:hover': {
            '& .MuiListItemIcon-root': {
                color: 'rgb(56 189 248)', // Change this to your desired hover icon color
            },
        },
        ...(selected && {
            color: 'rgb(2 132 199)', // Change this to your desired active item color
            fontWeight: 'bold',
            backgroundColor: 'yellow', // Change this to your desired background color
            '& .MuiListItemIcon-root': {
                color: 'rgb(2 132 199)', // Change this to your desired active icon color
            },
        }),
    }));



    return (
        <CustomDrawer variant="permanent" open={open}>
            <DrawerHeader>
                <img src='/favicon/GrowLOGO.png' />
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {links.map((text) => (
                    <>
                        <ListItem
                            key={text.id}
                            disablePadding
                            sx={{ display: 'block' }}
                            className={clsx({
                                'hover:text-sky-400 hover:border-l-4 hover:border-l-sky-400 transition-all': true,
                                'text-sky-600 border-l-4 border-l-sky-600': selectedItem === text.id,
                                'text-gray-500': selectedItem !== text.id,
                            })}
                            onClick={() => handleItemClick(text.id)}
                        >
                            <Link to={text.link}>
                                <CustomListItem
                                    sx={{
                                        minHeight: 50,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    className={clsx({
                                        'hover:text-sky-400 hover:border-l-4 hover:border-l-sky-400 transition-all': true,
                                        'text-sky-600 border-l-4 border-l-sky-600': selectedItem === text.id,
                                        'text-gray-500': selectedItem !== text.id,
                                    })}
                                    onClick={() => handleItemClick(text.id)}
                                    selected={selectedItem === text.id}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.title} sx={{ opacity: open ? 1 : 0 }} />
                                </CustomListItem>
                            </Link>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </CustomDrawer>
    )
}

export default Sidebar