import { KeyboardArrowRight } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCashbook } from "../../redux/action/cashbook";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { getClients, getEmployees } from "../../redux/action/user";
import cashbook from "../../redux/reducer/cashbook";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function CreateCashBook({ open, setOpen, scroll }) {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentLead: lead } = useSelector(state => state.lead)
  const { employees, clients } = useSelector(state => state.user)
  const paymentTypes = [
    { name: 'Cash', value: 'cash' },
    { name: 'Cheque', value: 'cheque' },
    { name: 'Credit Card', value: 'creditCard' },
    { name: 'Online', value: 'online' },
  ]
  const initialCashbookState = {
    staff: "",
    clientName: "",
    remarks: "",
    top: "",
    amount: 0,
    type: '',
  }

  const [cashbookData, setCashbookData] = useState(initialCashbookState);

  ///////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getEmployees())
    dispatch(getClients())
  }, [open])
  useEffect(() => {
    setCashbookData({ ...cashbookData })
  }, [lead])


  ///////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////

  const handleChange = (field, value) => {
    setCashbookData((pre) => ({ ...pre, [field]: value }));
  };

  const handleSubmit = (e) => {
    dispatch(createCashbook({ ...cashbookData, leadId: lead?._id, clientName: lead?.client?.username }));
    setOpen(false);
    setCashbookData(initialCashbookState);
  };

  const handleClose = () => {
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
          <div className="text-sky-400 font-primary">Add New Cash Detail</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Cash Report Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Staff </td>
                <td className="pb-4">
                {/* <CFormSelect
                    value={cashbookData.staff}
                    onChange={(e, input) => handleChange("staff", input.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    {employees.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect> */}
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={employees}
                    value={cashbookData.staff}
                    getOptionLabel={(employee) => employee?.firstName ? employee.firstName : employee}
                    onChange={(e, employee) => handleChange('staff', employee.username)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params}  fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    disablePortal={true}
                    options={clients}
                    value={cashbookData.clientName}
                    onChange={(e, client) => handleChange('clientName', client.username)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Payment Type </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={paymentTypes}
                    value={cashbookData.top}
                    getOptionLabel={(top) => top?.name ? top.name : top}
                    onChange={(e, top) => handleChange('top', top.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Amount </td>
                <td className="pb-4">
                  <TextField
                    name="amount"
                    value={cashbookData.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Type </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={[{ name: 'In', value: 'in' }, { name: 'Out', value: 'out' }]}
                    value={cashbookData.type}
                    getOptionLabel={(type) => type?.name ? type.name : type}
                    onChange={(e, type) => handleChange('type', type.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-lg flex flex-col justify-start pt-1">Remarks </td>
                <td className="pb-4">
                  <TextField
                    name="remarks"
                    multiline
                    rows={4}
                    value={cashbookData.remarks}
                    onChange={(e) => handleChange('remarks', e.target.value)}
                    size="small"
                    fullWidth
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
    </div>
  );
}

export default CreateCashBook;
