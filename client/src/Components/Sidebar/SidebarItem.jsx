import { useState } from "react"

const SidebarItem = ({ item }) => {
    const [open, setOpen] = useState(false)




    {
        if (item.childrens) {
            return (
                <>
                    <div className={open ? "sidebar-item open" : "sidebar-item"} >
                        <div className="sidebar-title" >
                            <span>
                                <p>{item.icon}</p>
                                {item.title}
                            </span>
                            <p className="toggle-btn" onClick={() => setOpen(!open)} >up</p>
                        </div>
                        <div className="sidebar-content" >
                            {
                                item.childrens.map((child, index) => (
                                    <SidebarItem key={index} item={child} />
                                ))
                            }
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <a href={item.path || "#"} className="sidebar-item plain" >
                        {item.icon && <p>{item.icon}</p>}
                        {item.title}
                    </a>

                </>
            )
        }

    }
}

export default SidebarItem