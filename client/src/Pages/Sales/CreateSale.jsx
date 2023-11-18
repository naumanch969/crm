import React, { useEffect, useState } from "react";
import { createSale } from "../../redux/action/sale";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { getClients, getEmployees } from "../../redux/action/user";
import { getLeadReducer } from "../../redux/reducer/lead";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateSale = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.sale);
  const { currentLead: lead } = useSelector((state) => state.lead);
  const { employees, clients } = useSelector((state) => state.user);
  const initialState = {
    staff: "",
    clientName: "",
    net: "",
    received: "",
    profit: "",
    top: "",
  };
  ////////////////////////////////////////// STATES /////////////////////////////////////
  const [saleData, setSaleData] = useState(initialState);

  ////////////////////////////////////////// USE EFFECTS /////////////////////////////////
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(getEmployees());
    }
        dispatch(getClients());
  }, [open]);
  useEffect(() => {
    setSaleData({ ...saleData, staff: lead?.client?.username });
  }, [lead]);

  ////////////////////////////////////////// FUNCTIONS ///////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSale({ ...saleData, leadId: lead?._id || "" }, setOpen));
    dispatch(getLeadReducer());
    setSaleData(initialState);
    setOpen(false);
  };
  const handleChange = (field, value) => {
    setSaleData({ ...saleData, [field]: value });
  };

  const handleClose = () => {
    setSaleData(initialState);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Sale</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Report Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Staff </td>
                <td className="pb-4">
                  <CFormSelect
                    value={saleData.staff}
                    onChange={(e) => handleChange("staff", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>Select an Option</option>
                    {employees.map((employee, key) => (
                      <option key={key} value={employee.username}>{employee.username}</option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Client Name </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("clientName", e.target.value)}
                    value={saleData.clientName}
                    name="clientName"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Net Price </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("net", e.target.value)}
                    value={saleData.net}
                    name="net"
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Recieved </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("received", e.target.value)}
                    value={saleData.received}
                    name="received"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Profit </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleChange}
                    value={saleData.received - saleData.net}
                    name="profit"
                    size="small"
                    type="number"
                    disabled
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Type of Payment </td>
                <td className="pb-4">
                  <CFormSelect
                    value={saleData.top}
                    onChange={(e) => handleChange("top", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>Select an Option</option>
                    <option value={"card"}>Card</option>
                    <option value={"cash"}>Cash</option>
                    <option value={"cheque"}>Cheque</option>
                  </CFormSelect>
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mb-4 mr-7">
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching  ? 'Submitting...' :'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateSale;
