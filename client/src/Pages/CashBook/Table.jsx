import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { format } from 'timeago.js'
import DeleteModal from "./DeleteModal";




const Table = () => {

  ///////////////////////////////////////////// VARIABLES //////////////////////////////////////////////

  

  ///////////////////////////////////////////// STATES //////////////////////////////////////////////

  ///////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////
 
  return (
    <div>


      <div className="flex justify-center text-3xl mb-4 font-Mulish text-gray-600 mt-5">
        Amounts In
      </div>
     

      <div className="flex justify-center text-3xl mb-4 font-Mulish text-gray-600 mt-10">
        Amounts Out
      </div>
    
    </div>
  );
};

export default Table;
