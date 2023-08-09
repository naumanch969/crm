import SidebarItem from "./SidebarItem"
import items from "./links.json"

const Sidebar = () => {
    return (
        <div className="sidebar" >
            {
                items.map((item, index) => (
                    <SidebarItem key={index} item={item} />
                ))
            }
        </div>
    )
}

export default Sidebar