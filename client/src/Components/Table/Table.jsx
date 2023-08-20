import { Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const Table = ({ columns, rows, isFetching, error, rowsPerPage, showSidebar }) => {
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
          <span className="text-red-500 ">{error}</span>
        </div>
      )}
      {!isFetching && !error && (
        <div className="flex flex-col gap-[8px] ">
          <DataGrid
            className="bg-white rounded-[6px] p-[5px] "
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
          />
        </div>
      )}
    </div>
  );
};

export default Table;
