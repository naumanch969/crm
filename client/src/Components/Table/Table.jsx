import { Search } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Loader } from '../../utils'

const Table = ({ columns, rows, isFetching, error, rowsPerPage }) => {
  //////////////////////////////////////// VARIABLES ///////////////////////////////////

  //////////////////////////////////////// STATES //////////////////////////////////////
  const [searchValue, setSearchValue] = useState("");

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////

  return (
    <div className="w-full">
      {isFetching && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      )}
      {error && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <span className="text-red-500 ">{error}</span>
        </div>
      )}
      {!isFetching && !error && (
        <div className="flex flex-col gap-[8px]">
          <Box
            sx={{
              justifyContent: "center",
              boxShadow: 'none',
              border: '1px solid #f6f9fa',
              "& .super-app-theme--header": {
                color: '#20aee3',
                fontWeight: 'lighter'
              },
            }}>
            <DataGrid
              className="bg-white rounded-[6px] p-[15px] font-primary"
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: rowsPerPage },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnMenu
              disableSelectionOnClick
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Table;
