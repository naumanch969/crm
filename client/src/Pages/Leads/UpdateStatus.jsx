import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../../redux/action/lead";
import { PiXLight } from "react-icons/pi";
import { Loader } from "../../utils";
import { getLeadReducer } from "../../redux/reducer/lead";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UpateStatusModal = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const statuses = [
    { name: 'Closed (Lost)', value: "closedLost" },
    { name: 'Followed Up (Call)', value: "followedUpCall" },
    { name: 'Contacted Client (Call Attempt)', value: "contactedCallAttempt" },
    { name: 'Contacted Client (Call)', value: "contactedCall" },
    { name: 'Followed Up (Email)', value: "followedUpEmail" },
    { name: 'Contacted Client (Email)', value: "contactedEmail" },
    { name: 'New<', value: "new" },
    { name: 'Meeting (Done)', value: "meetingDone" },
    { name: 'Closed (Won)', value: "closedWon" },
    { name: 'Meeting (Attempt)', value: "meetingAttempt" },
  ]
  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [status, setStatus] = useState(currentLead?.status);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setStatus(currentLead?.status);
  }, [currentLead]);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLead(currentLead?._id, { status }));
    dispatch(getLeadReducer(null))
    setOpen(false);
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
                    <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={statuses}
                    value={status}
                    getOptionLabel={(status) => status.name ? status.name :status}
                    onChange={(e, status) => setStatus(status.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
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
            className="bg-[#d7d7d7] font-primary px-4 py-2 rounded-lg text-gray-100 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-normal transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red font-primary px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-normal">
            {isFetching ? "Saving" : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
 
  );
};

export default UpateStatusModal;
