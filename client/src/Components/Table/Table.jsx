import { Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";

const Table = ({ columns, rows, isFetching, error, rowsPerPage }) => {
  //////////////////////////////////////// VARIABLES ///////////////////////////////////

  //////////////////////////////////////// STATES //////////////////////////////////////
  const [searchValue, setSearchValue] = useState("");

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////

  return (
    <div className="w-full">
      {isFetching && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <CircularProgress />
        </div>
      )}
      {error && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <span className="text-red-500 ">Newtwork Error</span>
        </div>
      )}
      {!isFetching && !error && (
        <div className="flex flex-col gap-[8px]">
          <DataGrid
            className="bg-white rounded-[6px] p-[5px] font-primary"
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
        </div>
      )}
    </div>
  );
};

export default Table;
