import SidebarItem from "./SidebarItem"
import { Avatar, Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { Close, HomeOutlined, PeopleAltOutlined, AssignmentOutlined, AccountCircleOutlined, LockOutlined, LocalAtmOutlined, ShoppingCartOutlined, CardGiftcardOutlined, SummarizeOutlined, StarBorder, ExpandLess, ExpandMore, Create, Today, OpenInNewOutlined, Money, AccountBalanceOutlined, ReceiptLong, Receipt, PeopleAltRounded } from '@mui/icons-material'
import { useState } from "react"
import { useSelector } from "react-redux"

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { loggedUser } = useSelector(state => state.user)
    const role = loggedUser?.role
    const links = [
        {
            id: 1,
            title: "Dashboard",
            link: "/",
            icon: <HomeOutlined />,
            role: ['employee', 'manager', 'super_admin'],
            childrens: []
        },
        {
            id: 2,
            title: "Leads",
            icon: <PeopleAltOutlined />,
            childrens: [
                {
                    title: "Create Lead",
                    icon: <Create />,
                    link: "/leads/create",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "My Leads",
                    icon: <PeopleAltRounded />,
                    link: "/myLeads",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "Get All Leads",
                    icon: <PeopleAltOutlined />,
                    link: "/leads?type=all",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
        {
            id: 3,
            title: "Projects",
            icon: <AccountBalanceOutlined />,
            childrens: [
                {
                    title: "All Projects",
                    icon: <Today />,
                    link: "/projects",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "Create Project",
                    icon: <OpenInNewOutlined />,
                    link: "/projects/create",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
        {
            id: 4,
            title: "To Do Tasks",
            icon: <AssignmentOutlined />,
            childrens: [
                {
                    title: "Create Task",
                    icon: <Create />,
                    link: "tasks/create",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "My Tasks",
                    icon: <AssignmentOutlined />,
                    link: "/tasks",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
        {
            id: 5,
            title: "User",
            icon: <AccountCircleOutlined />,
            childrens: [
                {
                    title: "Create Employee",
                    icon: <Create />,
                    link: "/employees/create",
                    role: ['manager', 'super_admin']
                },
                {
                    title: "Clients",
                    icon: <AccountCircleOutlined />,
                    link: "/clients",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "Employees",
                    icon: <AccountCircleOutlined />,
                    link: "/employees",
                    role: ['manager', 'super_admin']
                },
            ]
        },
        {
            id: 6,
            title: "Authorization",
            icon: <LockOutlined />,
            childrens: [
                {
                    title: "Approvals",
                    icon: <Create />,
                    link: "/authorization/request",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "Refunds",
                    icon: <Create />,
                    link: "/authorization/refund",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "Vouchers",
                    icon: <LockOutlined />,
                    link: "/voucher",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
        {
            id: 7,
            title: "Sales",
            icon: <ShoppingCartOutlined />,
            childrens: [
                {
                    title: "Generate Sale",
                    icon: <Create />,
                    link: "/sales/create",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "All Sales",
                    icon: <ShoppingCartOutlined />,
                    link: "/sales",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
        {
            id: 8,
            title: "Cash Book",
            icon: <AccountBalanceOutlined />,
            childrens: [
                {
                    title: "Today Cash Book",
                    icon: <Today />,
                    link: "/cashbook",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "View Cash Book",
                    icon: <OpenInNewOutlined />,
                    link: "/view/cashbook",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
        {
            id: 9,
            title: 'Vouchers',
            icon: <Receipt />,
            childrens: [
                {
                    title: "All Vouchers",
                    icon: <ReceiptLong />,
                    link: "/voucher",
                    role: ['employee', 'manager', 'super_admin'],
                },
                {
                    title: "Create Voucher",
                    icon: <Create />,
                    link: "/voucher/create",
                    role: ['employee', 'manager', 'super_admin'],
                },
            ]
        },
    ]


    const filteredLinks = links.map(link => {
        const filteredLink = { ...link };

        if (!filteredLink.role || filteredLink.role.includes(role)) {
            if (filteredLink.childrens) {
                filteredLink.childrens = filteredLink.childrens.filter(childLink => !childLink.role || childLink.role.includes(role));
            }
            return filteredLink;
        }
    });

    const [openedMenu, setOpenedMenu] = useState(false);

    return (
        <>
            {/* desktop sidebar */}
            <Box className={`lg:w-[20vw] md:w-[25vw] sticky top-0 flex flex-col shadow-none h-screen  ${showSidebar ? 'md:flex hidden' : 'hidden'} bg-white z-[1000] border-r-[1px] border-r-gray-300 border-b-[1px] border-b-gray-300`} >
                {/* <div className='flex flex-col gap-[1.3px] w-56 py-[8px] text-gray' > */}
                <div className="border-b-[1px] border-b-gray-300 p-[7.5px] h-[4rem] ">
                    {!showSidebar ? "" : <img className="h-10" src="/favicon/GrowLOGO.png" />}
                </div>
                <div style={{ height: 'calc(100vh - 4rem)' }} className="py-[6px] flex flex-col h-fit overflow-y-scroll ">
                    {
                        filteredLinks.map((link, index) => (
                            <SidebarItem item={link} key={index} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} setShowSidebar={setShowSidebar} />
                        ))
                    }
                </div>
                {/* </div> */}
            </Box>

            {/* mobile sidebar */}
            {
                showSidebar &&
                <Box className='absolute top-0 left-0 bg-white shadow-box w-[16rem] h-screen md:hidden flex z-[1100] ' >
                    <div className='wrapper flex flex-col w-full h-full overflow-y-scroll p-[10px] ' >
                        <div className='w-full flex justify-between items-center mb-[1rem] h-[4rem] ' >
                            <img src="/favicon/GrowLOGO.png" />
                            <IconButton onClick={() => setShowSidebar(false)} ><Close /></IconButton>
                        </div>
                        <div style={{ height: 'calc(100vh - 4rem)' }} className="flex flex-col gap-[5px] py-[6px] overflow-y-scroll ">
                            {
                                filteredLinks.map((link, index) => (
                                    <SidebarItem item={link} key={index} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
                                ))
                            }
                        </div>
                    </div>
                </Box>
            }
        </>
    )
}

export default Sidebar;