import SidebarItem from "./SidebarItem"
import { Avatar, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { Close, HomeOutlined, PeopleAltOutlined, AssignmentOutlined, AccountCircleOutlined, LockOutlined, LocalAtmOutlined, ShoppingCartOutlined, CardGiftcardOutlined, SummarizeOutlined, StarBorder, ExpandLess, ExpandMore, Create } from '@mui/icons-material'
import { useState } from "react"

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    //////////////////////////////////////// Variables ////////////////////////////////////////
    const links = [
        {
            title: "Dashboard",
            link: "/",
            icon: <HomeOutlined />,
            childrens: []
        },
        {
            title: "Leads",
            icon: <PeopleAltOutlined />,
            childrens: [
                {
                    title: "Create Lead",
                    icon: <Create />,
                    link: "/leads/create"
                },
                {
                    title: "Get All Leads",
                    icon: <PeopleAltOutlined />,
                    link: "/leads"
                },
            ]
        },
        {
            title: "To Do Tasks",
            icon: <AssignmentOutlined />,
            childrens: [
                {
                    title: "Create Task",
                    icon: <Create />,
                    link: "/tasks"
                },
                {
                    title: "My Tasks",
                    icon: <AssignmentOutlined />,
                    link: "/tasks"
                },
            ]
        },
        {
            title: "User",
            icon: <AccountCircleOutlined />,
            childrens: [
                {
                    title: "Create User",
                    icon: <Create />,
                    link: "/users/create"
                },
                {
                    title: "Users",
                    icon: <AccountCircleOutlined />,
                    link: "/users"
                },
            ]
        },
        {
            title: "Authorization",
            icon: <LockOutlined />,
            childrens: [
                {
                    title: "Approvals",
                    icon: <Create />,
                    link: "/authorization/request"
                },
                {
                    title: "Vouchers",
                    icon: <LockOutlined />,
                    link: "/users"
                },
            ]
        },
        {
            title: "Sales",
            icon: <ShoppingCartOutlined />,
            childrens: [
                {
                    title: "Generate Sale",
                    icon: <Create />,
                    link: "/sales/create"
                },
                {
                    title: "All Sales",
                    icon: <ShoppingCartOutlined />,
                    link: "/sales"
                },
            ]
        },
        {
            title: 'Cash Book',
            icon: <LocalAtmOutlined />,
            link: '/cashbook',
            childrens: []
        },
        {
            title: 'Vouchers',
            link: '/voucher',
            icon: <CardGiftcardOutlined />,
            childrens: []
        },
        {
            title: 'Report',
            link: '/report',
            icon: <SummarizeOutlined />,
            childrens: []
        },
    ]

    //////////////////////////////////////// States ////////////////////////////////////////
    const [openedMenu, setOpenedMenu] = useState('');

    //////////////////////////////////////// UseEffects ////////////////////////////////////////

    //////////////////////////////////////// Functions ////////////////////////////////////////

    //////////////////////////////////////// Components ////////////////////////////////////////



    return (
        <>
            {/* desktop sidebar */}
            <div style={{ height: 'calc(100vh - 4rem)' }} className={`flex-[2] shadow-box ${showSidebar ? 'md:flex hidden' : 'hidden'} bg-white sticky top-0`} >
                <div className='flex flex-col gap-[4px] w-full py-[8px] text-gray h-full overflow-y-scroll ' >
                    {
                        links.map((link, index) => (
                            <SidebarItem item={link} key={index} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
                        ))
                    }
                </div>
            </div>


            {/* mobile sidebar */}
            {
                showSidebar &&
                <div className='absolute top-0 left-0 w-[14rem] bg-lighterBlue h-screen md:hidden flex z-[1100] ' >
                    <div className='wrapper flex flex-col w-full h-full overflow-y-scroll p-[1rem] ' >

                        <div className='w-full flex justify-between items-center mb-[1rem] ' >
                            <h3 className='md:text-[32px] sm:text-[28px] text-[24px] text-darkBlue font-bold ' >nanoadmin</h3>
                            <IconButton className='' onClick={() => setShowSidebar(false)} ><Close /></IconButton>
                        </div>

                        <div className="flex flex-col gap-[5px] ">
                            {
                                links.map((link, index) => (
                                    <SidebarItem item={link} key={index} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar;