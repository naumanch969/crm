import { NotificationsOutlined, Language, Settings, Menu, TimerOutlined, QuestionAnswerOutlined, SettingsOutlined, ControlPointDuplicateRounded } from '@mui/icons-material'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'

const Navbar = ({ setShowSidebar }) => {

    const { loggedUser } = useSelector(state => state.user)
 
    return (
        <div className='w-full h-[4rem] bg-white sticky top-0 z-[1000] shadow-box ' >

            <div className='wrapper h-full md:px-[24px] px-[1rem] flex items-center justify-between ' >

                {/* left section */}
                <div className='left flex justify-start gap-[4px] ' >
                    <h3 className='md:text-[32px] sm:text-[28px] text-[24px] text-darkBlue font-bold ' >Grow CRM</h3>
                    <IconButton onClick={() => setShowSidebar(pre => !pre)} className='md:hidden flex cursor-pointer ' ><Menu /></IconButton>
                </div>

                {/* right section */}
                <div className='flex gap-[4px] ' >

                    <Tooltip title="Timer" arrow placement="bottom">
                        <IconButton className='hover:text-red-400' size="small" aria-label="menu">
                            <TimerOutlined />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Timer" arrow placement="bottom">
                        <IconButton className='hover:text-red-400' size="small" aria-label="menu">
                            <QuestionAnswerOutlined />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Settings" arrow placement="bottom">
                        <IconButton className='hover:text-red-400' size="small" aria-label="menu">
                            <SettingsOutlined />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Add User" arrow placement="bottom">
                        <IconButton className='hover:text-red-400' size="small" aria-label="menu">
                            <ControlPointDuplicateRounded />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Language" arrow placement="bottom">
                        <IconButton className='hover:text-red-400' size="small" aria-label="menu">
                            <Language />
                        </IconButton>
                    </Tooltip>

                    <div className="flex items-center ">
                        <span className="capitalize " >{loggedUser?.username}</span>
                        <Tooltip title="Profile" arrow placement="bottom">
                            <Avatar className='m-2 cursor-pointer capitalize '>{loggedUser?.username[0]}</Avatar>
                        </Tooltip>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Navbar;