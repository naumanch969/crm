import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, CssBaseline, Tooltip, Collapse } from '@mui/material'
import { Menu, Alarm, NotificationsActiveOutlined, TimerOutlined, QuestionAnswerOutlined, SettingsOutlined, ControlPointDuplicateRounded, Language, Mail, Inbox, Close, ChevronLeft, ChevronRight, HomeOutlined, PeopleAltOutlined, AssignmentOutlined, AccountCircleOutlined, LockOutlined, LocalAtmOutlined, ShoppingCartOutlined, CardGiftcardOutlined, SummarizeOutlined, StarBorder, ExpandLess, ExpandMore } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Link, Outlet } from 'react-router-dom';
import clsx from 'clsx';


// <-------------------------- Drawer Styling ----------------------------->

const drawerWidth = 240;

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
      color: 'rgb(56 189 248)',
    },
  },
  ...(selected && {
    color: 'rgb(2 132 199)',
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    '& .MuiListItemIcon-root': {
      color: 'rgb(2 132 199)',
    },
  }),
}));



const Header = () => {

  // <----------- Current Time -------------->

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  // <---------- Right Drawer --------------->

  const [state, setState] = useState({ right: false });

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

  // <--------------- Left Drawer Functions ---------------->

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(1);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Links = [
    {
      id: 1,
      title: 'DashBoard',
      link: '/',
      icon: <HomeOutlined />,
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
      icon: <AssignmentOutlined />,
      link: 'tasks'
    },
    {
      id: 4,
      title: 'User',
      link: 'user',
      icon: <AccountCircleOutlined />
    },
    {
      id: 5,
      title: 'Authorization',
      icon: <LockOutlined />,
      link: '/authorization/request'
    },
    {
      id: 6,
      title: 'Cash Book',
      icon: <LocalAtmOutlined />,
      link: 'cashbook'
    },
    {
      id: 7,
      title: 'Sales',
      icon: <ShoppingCartOutlined />,
      link: 'sales'
    },
    {
      id: 8,
      title: 'Vouchers',
      link: '/voucher',
      icon: <CardGiftcardOutlined />,
    },
    {
      id: 9,
      title: 'Report',
      link: '/report',
      icon: <SummarizeOutlined />
    },
  ]

  //------------------------ DropDown Functions ----------------------------

  const [open1, setopen1] = useState(false);

  const dropdownHandleOpen = () => {
    setopen1(true)
  }
  const dropdownHandleClose = () => {
    setopen1(false)
  }

  // const dropdownMenu = () => {
  //   if () {
  //     <ExpandMore />
  //   }
  //   else{

  //   }
  // }

  //------------------------------------------------------------------------

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar position="fixed" open={open}>
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

          {['right'].map((anchor, index) => (
            <React.Fragment key={index}>
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
      </AppBar>

      {/* <------------------- Drawer --------------------> */}

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src='/favicon/GrowLOGO.png' />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Links.map((text, index) => (
            <React.Fragment key={index} >
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
                    {(open) && (text.id === 2 || text.id === 3 || text.id === 4 || text.id === 5 || text.id === 6 || text.id === 7) ? <ExpandMore /> : false}
                  </CustomListItem>
                  <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Link>
              </ListItem>

              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Box className='bg-gray-50' component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Header