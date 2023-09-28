import React, { useEffect, useRef, useState } from "react";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../../utils";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";
import CreateRefund from "./CreateRefund";
import { searchRefundReducer } from "../../../redux/reducer/refund";
import { useDispatch, useSelector } from "react-redux";

const Topbar = () => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {loggedUser} = useSelector(state=>state.user)
  const title = pathname.split("/")[1];

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const descriptionElementRef = useRef(null);

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
    dispatch(searchRefundReducer(searchTerm));
  };

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className="w-full flex flex-col tracking-wide pb-8 font-primary">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="w-full md:flex justify-between items-center flex-none">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">Refund</h1>

        <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
          <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
            <FormControl>
              <Input
                name="search"
                placeholder="Search Follow Ups"
                onChange={(e) => handleSearch(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <PiMagnifyingGlass className="text-[25px]" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div>
            {
            loggedUser?.role == 'employee' || 'admin' &&  
              <Tooltip title="Add New Follow Up" placement="top" arrow>
              <div onClick={handleCreateopen("body")}>
                <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
              </div>
            </Tooltip>
            }
          </div>
        </div>
      </div>

      <CreateRefund scroll={scroll} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
