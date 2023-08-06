import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../redux/action/project'

function Projects() {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const dispatch = useDispatch()
    const { projects, isFetching, error } = useSelector(state => state.project)

    ////////////////////////////////////// STATES //////////////////////////////
    const [view, setView] = useState('table')

    ////////////////////////////////////// USE EFFECTS //////////////////////////////
    useEffect(() => {
        dispatch(getProjects())
    }, [])

    ////////////////////////////////////// FUNCTION //////////////////////////////

    return (
        <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

            <Topbar view={view} setView={setView} />
            <Table projects={projects} isFetching={isFetching} error={error} />

        </div>
    )
}

export default Projects