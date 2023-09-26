import { KeyboardArrowRight } from '@mui/icons-material'
import React from 'react'
import { PiArrowArcRightLight, PiArrowRightLight, PiCaretRightLight } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'

const Path = () => {

    const { pathname } = useLocation()
    const pathArr = pathname.split('/').filter(item => item != ''); // Remove empty elements

    const pathObjects = pathArr.map((item, index) => {
        const name = item;
        const link = `/${pathArr.slice(0, index + 1).join('/')}`;
        return { name, link };
    });

    pathObjects.unshift({ name: 'Dashboard', link: '/' });

    return (
        <div className='flex justify-start items-center gap-[2px] '>
            {
                pathObjects.map((path, index) => (
                    <React.Fragment key={index} >
                        <Link to={path.link} className='capitalize hover:text-primary-blue ' >{path.name}</Link>
                        {index != pathObjects.length - 1 && <PiCaretRightLight className='text-primary-gray ' />}
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default Path