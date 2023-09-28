import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInventory } from "../../../redux/action/inventory";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { PiXLight } from "react-icons/pi";
import { Loader } from "../../../utils";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UpateStatusModal = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentInventory, isFetching } = useSelector((state) => state.inventory);
  const statuses = [
    { name: "Not Started", value: "notStarted" },
    { name: "Completed", value: "completed" },
    { name: "In Progress", value: "inProgress" },
    { name: "On Hold", value: "onHold" },
  ];

  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [status, setStatus] = useState(currentInventory?.status);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setStatus(currentInventory?.status);
  }, [currentInventory]);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInventory(currentInventory?._id, { status }));
    setOpen(false);
  };
  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth="xs"
        maxWidth="xs"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-xl text-sky-400 font-primary">Update Status</div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        {isFetching ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <DialogContent>
            <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
              <table className="w-full">
                <tr>
                  <td className="pb-4 text-lg">Status </td>
                  <td className="pb-4 w-64">
                    <CFormSelect
                      size="sm"
                      value={status?.status}
                      onChange={handleChange}
                      className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                      {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.name}
                        </option>
                      ))}
                    </CFormSelect>
                    {/* <Autocomplete
                      size="small"
                      disablePortal={false}
                      options={statuses}
                      value={status?.status}
                      getOptionLabel={(status) => status.name ? status.name : status}
                      onChange={(e, status) => handleChange('status', status.value)}
                      className="w-full"
                      renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                    /> */}
                  </td>
                </tr>
              </table>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <button
            onClick={() => setOpen(false)}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Saving" : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpateStatusModal;
