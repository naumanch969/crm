import React, { useEffect, useState } from 'react'
import Table from './Table'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getLeads } from '../../redux/action/lead'

function Leads() {

    ////////////////////////////////////// VARIABLES //////////////////////////////
    const dispatch = useDispatch()
    const { leads: input_leads, isFetching, error } = useSelector(state => state.lead)

    ////////////////////////////////////// STATES //////////////////////////////
    const [view, setView] = useState('table')
    const [leads, setLeads] = useState([...input_leads])

    ////////////////////////////////////// USE EFFECTS //////////////////////////////
    useEffect(() => {
        dispatch(getLeads())
    }, [])

    ////////////////////////////////////// FUNCTION //////////////////////////////

    return (
        <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >

            <Topbar view={view} setView={setView} />
            {
                view == 'table'
                    ?
                    <Table leads={leads} isFetching={isFetching} error={error} />
                    :
                    <Kanban leads={leads} setLeads={setLeads} />
            }

        </div>
    )
}

export default Leads