import { Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const Table = ({ columns, rows, isFetching, error, rowsPerPage }) => {

    //////////////////////////////////////// VARIABLES ///////////////////////////////////

    //////////////////////////////////////// STATES ///////////////////////////////////
    const [searchValue, setSearchValue] = useState('')

    //////////////////////////////////////// FUNCTIONS ///////////////////////////////////



    return (
        <div className='w-full h-auto overflow-x-scroll '>

            {
                isFetching
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <CircularProgress />
                </div>
            }
            {
                error
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <span className='text-red-500 ' >{error}</span>
                </div>
            }
            {
                (!isFetching && !error) &&
                <div className="flex flex-col gap-[8px] ">
                    <div className="flex justify-end items-center w-full ">
                        <div className="h-[40px] w-fit bg-white border-[1px] border-neutral-500 rounded-[4px] flex overflow-hidden ">
                            <input className='w-[14rem] px-[8px] text-primary-gray outline-none border-none bg-inherit h-full ' type="text" placeholder='Search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                            <div className="w-[40px] bg-neutral-400 text-primary-gray h-full flex justify-center items-center ">
                                <Search className='text-white' />
                            </div>
                        </div>
                    </div>
                    <DataGrid
                        className='bg-white rounded-[6px] p-[5px] '
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: rowsPerPage, }
                            },
                        }}
                        getRowId={row => row._id}
                        pageSizeOptions={[10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            }
        </div>
    );
}

export default Table