import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { Add } from "@mui/icons-material";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiBackspace, PiMagnifyingGlass, PiTag, PiXCircle } from "react-icons/pi";
import CreateTranscript from "./CreateTranscript";
import { FiFilter } from "react-icons/fi";
import SetDeductions from "./SetDeductions";
import ShowDeductions from "./ShowDeductions";

const Topbar = () => {
  ///////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const descriptionElementRef = React.useRef(null);

  /////////////////////////////////////////STATES ////////////////////////////////////////////////
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeductionModal, setOpenDeductionModal] = useState(false);
  const [scroll, setScroll] = useState("paper");

  ///////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    if (openCreateModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [openCreateModal]);

  ///////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////

  const handleCreateopen = (scrollType) => () => {
    setOpenCreateModal(true);
    setScroll(scrollType);
  };

  const handleDeductionopen = (scrollType) => () => {
    setOpenDeductionModal(true);
    setScroll(scrollType);
  };

  return (
    <div className="flex flex-col pb-6">
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className="flex justify-between items-center ">
        <h1 className="text-primary-blue text-[32px] capitalize">{title}</h1>

        <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
          <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
            <FormControl>
              <Input
                name="search"
                placeholder="Search Transcripts"
                onChange={(e) => handleSearch(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <PiMagnifyingGlass className="text-[25px]" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Tooltip title="Set Deductions" arrow placement="top">
            <div
              onClick={handleDeductionopen("body")}
              className={` p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]`}>
              <PiTag className="text-[25px] " />
            </div>
          </Tooltip>
          <div>
            <Tooltip title="Create New Transcript" placement="top" arrow>
              <div onClick={handleCreateopen("body")}>
                <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <ShowDeductions scroll={scroll} open={openDeductionModal} setOpen={setOpenDeductionModal} />
      <CreateTranscript scroll={scroll} open={openCreateModal} setOpen={setOpenCreateModal} />
    </div>
  );
};

export default Topbar;
