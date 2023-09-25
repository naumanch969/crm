
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSale } from "../../redux/action/sale";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { getClients, getEmployees } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  //////////////////////////////////////// VARIABLES ///////////////////////////////////
  const { currentLead: lead } = useSelector(state => state.lead)
  const initialState = {
    staff: "",
    clientName: lead?.client ? lead?.client?.username : '',
    net: "",
    received: "",
    profit: "",
    top: "",
  };
  const dispatch = useDispatch();
  const { currentSale: sale, isFetching } = useSelector((state) => state.sale);
  const { clients, employees } = useSelector((state) => state.user);

  //////////////////////////////////////// STATES ///////////////////////////////////
  const [saleData, setSaleData] = useState(sale);

  //////////////////////////////////////// STATES ///////////////////////////////////
  useEffect(() => {
    setSaleData(sale);
  }, [sale]);
  useEffect(() => {
    setSaleData({ ...saleData, staff: lead?.client?.username })
  }, [lead])
  useEffect(() => {
    dispatch(getClients())
    dispatch(getEmployees())
  }, [])

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSale(sale._id, saleData));
    setOpen(false);
    setSaleData(initialState);
  };
  const handleChange = (field, value) => {
    setSaleData({ ...saleData, [field]: value });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      scroll={"paper"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Sale</div>
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
                <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={employees}
                    value={saleData?.staff}
                    getOptionLabel={(employee) => employee.username? employee.username : employee}
                    onChange={(e, employee) => handleChange('staff', employee.username)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Client Name </td>
              <td className="pb-4">
                <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={clients}
                    value={saleData?.clientName}
                    getOptionLabel={(client) =>client.username? client.username : client}
                    onChange={(e, client) => handleChange('clientName', client.username)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Net Worth </td>
              <td className="pb-4">
                <TextField
                  onChange={(e)=>handleChange('net',e.target.value)}
                  value={saleData?.net}
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
                  onChange={(e)=>handleChange('received',e.target.value)}
                  value={saleData?.received}
                  name="received"
                  size="small"
                  type="number"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Profit </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.net - saleData?.received}
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
                <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={[{name:'Cash',value:'cash'},{name:'Card',value:'card'},{name:'Cheque',value:'cheque'}]}
                    value={saleData?.top}
                    getOptionLabel={(top) =>top.name? top.name : top}
                    onChange={(e, top) => handleChange('top',top.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
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
          Submit
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
