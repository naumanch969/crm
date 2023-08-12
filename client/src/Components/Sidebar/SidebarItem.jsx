import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ item, child, openedMenu, setOpenedMenu }) => {
    const isMenuOpen = openedMenu === item.title.toLowerCase();

    const handleMenuClick = (e) => {
        e.stopPropagation(); // Prevent event propagation to parent elements
        if (child) {
            return; // Don't close when clicking on sub-link
        }

        if (isMenuOpen) {
            setOpenedMenu('');
        } else {
            setOpenedMenu(item.title.toLowerCase());
        }
    };

    return (
        <div className={`${child ? 'pl-4 hover:bg-gray-300 ' : 'pl-2'} pr-2 py-2 transition-colors ${isMenuOpen ? 'bg-gray-200 text-gray-900' : ' text-gray-700'} hover:bg-gray-200 hover:text-gray-900`} >
            <Link to={item.link} className="flex items-center justify-between cursor-pointer" onClick={handleMenuClick}>
                <span className="flex items-center gap-2">
                    {item.icon && <IconButton size="small">{item.icon}</IconButton>}
                    {item.title}
                </span>
                {item.childrens?.length > 0 && (
                    isMenuOpen ? <ExpandLess /> : <ExpandMore />
                )}
            </Link>
            {item.childrens?.length > 0 && isMenuOpen && (
                <div className="py-2 bg-gray-200">
                    {item.childrens.map((child, index) => (
                        <SidebarItem key={index} item={child} child={true} openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
