import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import { Table } from '../../Components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClients } from '../../redux/action/user'
import { getClientsReducer } from '../../redux/reducer/user'

const Clients = () => {

    ////////////////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch()
    const { clients, isFetching, error } = useSelector(state => state.user)
    const columns = [
        {
            field: 'firstName', headerName: 'First Name', width: '150', renderCell: (params) => (
                <Link to={`/users/${params.row._id}`} >{params.row.firstName}</Link>
            )
        },
        { field: 'lastName', headerName: 'Last Name', width: '150' },
        { field: 'username', headerName: 'Username', width: '150' },
        { field: 'email', headerName: 'Email', width: '150' },
        { field: 'phone', headerName: 'Phone', width: '150' },
        { field: 'cnic', headerName: 'CNIC', width: '150' },
    ]

    ////////////////////////////////////// STATES ////////////////////////////////////////

    ////////////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getClients())
    }, [])

    ////////////////////////////////////// FUNCTIONS //////////////////////////////////////////



    return (
        <div className='w-full' >


            <Topbar />
            <Table
                rows={clients}
                columns={columns}
                isFetching={isFetching}
                error={error}
                rowsPerPage={10}
            />

        </div>
    )
}

export default Clients