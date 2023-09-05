import React, { useEffect, useState } from "react";
import Topbar from './Topbar'
import { useSelector, useDispatch } from "react-redux";
import { deleteNotification } from '../../redux/action/notification'
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import ViewNotification from './Notification'


function Notifications({ }) {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const { notifications } = useSelector(state => state.notification)
    const dispatch = useDispatch()

    ////////////////////////////////////// STATES //////////////////////////////
    const [openNotification, setOpenNotification] = useState(false)
    const [notificationId, setNotificationId] = useState('')

    ////////////////////////////////////// USE EFFECTS //////////////////////////////

    ////////////////////////////////////// FUNCTIONS //////////////////////////////
    const handleDelete = (notificationId) => {
        dispatch(deleteNotification(notificationId))
    }

    ////////////////////////////////////// COMPONENTS //////////////////////////////
    const Notification = ({ notification }) => {
        const [showCloseButton, setShowCloseButton] = useState(false)
        return (
            <div
                onClick={() => { setNotificationId(notification._id); setOpenNotification(true) }}
                onMouseEnter={() => setShowCloseButton(true)}
                onMouseLeave={() => setShowCloseButton(false)}
                className={`${notification.isRead ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-50 relative cursor-pointer flex flex-col w-full p-[8px] rounded-[6px]  `}
            >
                {showCloseButton && <IconButton onClick={() => handleDelete(notification._id)} style={{ position: 'absolute' }} className='absolute top-[5px] right-[5px] ' > <Close /></IconButton>}
                <div>
                    <span className="text-lg font-extralight text-sky-400">{notification.title}</span>
                    <br />
                    {notification.description}
                    <br />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-fit bg-inherit flex flex-col gap-[1rem] ">

            <Topbar />

            <ViewNotification open={openNotification} setOpen={setOpenNotification} notificationId={notificationId} />

            {
                notifications.map((notification, index) => (
                    <div key={index} className="w-[48%] ">
                        <Notification notification={notification} />
                    </div>
                ))
            }
        </div>
    );
}

export default Notifications;