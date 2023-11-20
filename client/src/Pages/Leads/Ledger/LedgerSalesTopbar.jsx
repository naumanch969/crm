import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../../utils";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";
import CreateSale from "../../Sales/CreateSale";
import { searchSaleReducer } from "../../../redux/reducer/sale";

const LedgerSalesTopbar = ({ }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleSearch = (searchTerm) => {
    dispatch(searchSaleReducer(searchTerm));
  }

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className="flex flex-col tracking-wide pb-4 font-primary pt-10">

      <div className="md:flex justify-between items-center flex-none">
        <h1 className="text-primary-red text-[20px]">All Sales History</h1>

        <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
          <div>
            <Tooltip title="Add New Sale" placement="top" arrow>
              <div onClick={handleCreateopen("body")}>
                <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <CreateSale open={open} setOpen={setOpen} />

    </div>
  );
};

export default LedgerSalesTopbar;
