import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { Add } from '@mui/icons-material';
import { searchNotificationReducer } from "../../redux/reducer/notification";




const Topbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const title = pathname.split("/")[1];
    const pathArr = pathname.split("/").filter((item) => item != "");

    const handleSearch = (searchTerm) => {
        dispatch(searchNotificationReducer(searchTerm));
    }

    return (
        <div className="flex flex-col ">
            <div className="w-full text-[14px] ">
                <Path />
            </div>

            <div className="flex justify-between items-center ">
                <h1 className="text-primary-blue text-[32px] capitalize">Notifications</h1>
            </div>


        </div>
    );
};

export default Topbar;
