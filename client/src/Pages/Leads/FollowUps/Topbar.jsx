import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../../utils";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";
import CreateFollowUps from "./CreateFollowUps";
import { searchFollowUpReducer } from "../../../redux/reducer/followUp";
import { useDispatch } from "react-redux";

const Topbar = () => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleSearch = (searchTerm) => {
    dispatch(searchFollowUpReducer(searchTerm));
  }

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className="tracking-wide pb-4 font-primary">

      <div className="flex justify-between w-full items-center">
        <h1 className="text-primary-red flex justify-end text-[20px]">All Follow Ups History</h1>

        <div className="gap-2 flex justify-start md:mt-0 mt-4">
          <div>
            <Tooltip title="Add New Follow Up" placement="top" arrow>
              <div onClick={handleCreateopen("body")}>
                <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <CreateFollowUps scroll={scroll} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
