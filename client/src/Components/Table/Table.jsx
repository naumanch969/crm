import React from "react";
import { Search } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { Loader } from "../../utils";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const Table = ({ columns, rows, isFetching, error, rowsPerPage }) => {
  //////////////////////////////////////// VARIABLES ///////////////////////////////////

  //////////////////////////////////////// STATES //////////////////////////////////////
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className="w-full">
      {isFetching && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      )}
      {error && (
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={error ? handleClick({ vertical: 'bottom', horizontal: 'right' }) : handleClose}
            onClose={handleClose}
            message={error}
            key={vertical + horizontal}
          />
        </Box>
      )}
      {!isFetching && (
        <div className="flex flex-col gap-[8px]">
          <Box
            sx={{
              justifyContent: "center",
              boxShadow: "none",
              border: "1px solid #f6f9fa",
              "& .super-app-theme--header": {
                color: "#20aee3",
                fontFamily: "Montserrat, sans-serif",
              },
            }}>
            <DataGrid
              className="bg-white rounded-[6px] p-[15px]"
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: rowsPerPage },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10]}
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
