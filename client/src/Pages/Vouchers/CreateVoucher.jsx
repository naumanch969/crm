import React, { useEffect, useRef, useState } from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import { createVoucher } from "../../redux/action/voucher";
import { getClients } from "../../redux/action/user";
import { getProjects } from "../../redux/action/project";
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
import { CFormSelect } from "@coreui/react";
import { countries } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CreateVoucher = ({ open, setOpen, scroll, downloadPdf, loader }) => {
  ////////////////////////////////////// VARIBALES ///////////////////////////////////
  const { isFetching } = useSelector(state => state.voucher)
  const { projects } = useSelector(state => state.project)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialVoucherState = {
    issuingDate: "",
    dueDate: "",
    clientName: "",
    CNIC: "",
    phone: "",
    degree: "",
    degreeName: "",
    country: "",
    project: "Null",
    major: "",
    visa: "",
    type: "",
    total: "",
    paid: "",
    remained: "",
    note: ""
  };

  ////////////////////////////////////// STATES //////////////////////////////////////
  const [voucherData, setVoucherData] = useState(initialVoucherState);

  ////////////////////////////////////// Use Effects ///////////////////////////////////////////
  useEffect(() => {
    dispatch(getClients());
    dispatch(getProjects());
  }, [open]);

  ////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleChange = (field, value) => {
    setVoucherData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    const {
      issuingDate,
      dueDate,
      clientName,
      phone,
      type,
      total,
      degreeName,
      note,
      paid,
      degree,
      country,
      visa,
      remained,
      major,
    } = voucherData;
    // if (
    //   !visa ||
    //   !degree ||
    //   !issuingDate ||
    //   !dueDate ||
    //   !clientName ||
    //   !phone ||
    //   !type ||
    //   !country ||
    //   !total ||
    //   !paid ||
    //   !remained ||
    //   !major ||
    //   !note
    // )
    //   return alert("Make sure to provide all the fields");

    dispatch(createVoucher(voucherData, setOpen, projects));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const degrees = [
    { name: "Bachelors", value: "bachelors" },
    { name: "MPhil", value: "mphil" },
    { name: "PhD", value: "phd" },
    { name: "Diploma", value: "diploma" },
    { name: "Other", value: "other" },
  ];

  const handleRemainingAmount = () => {
    const [number1, postfix1] = voucherData.total.split(" ");
    const [number2, postfix2] = voucherData.paid.split(" ");
    const total = parseInt(number1);
    const paid = parseInt(number2);
    const remained = total - paid;
    return remained + " " + postfix2;
  }

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="md"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Voucher</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Voucher Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Date of Issue </td>
                <td className="pb-4">
                  <TextField
                    type="date"
                    name="issuingDate"
                    disabled
                    value={(voucherData.issuingDate = today)}
                    onChange={(e) => handleChange("issuingDate", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Due Date </td>
                <td className="pb-4">
                  <TextField
                    name="dueDate"
                    value={voucherData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    size="small"
                    type="date"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    name="clientName"
                    onChange={(e) => handleChange("clientName", e.target.value)}
                    value={voucherData.clientName}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    name="CNIC"
                    value={voucherData.CNIC}
                    onChange={(e) => handleChange("CNIC", e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="phone"
                    value={voucherData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Project </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.project}
                    onChange={(e) => { handleChange("project", e.target.value) }}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>None</option>
                    {projects.map((project, key) => (
                      <option key={key} value={project._id}>
                        {project.title}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Area </td>
                <td className="pb-4">
                  <TextField
                    name="Area"
                    value={voucherData.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                    placeholder="Area in Marla"
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Branch </td>
                <td className="pb-4">
                  <TextField
                    name="branch"
                    value={voucherData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Branch"
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Porperty Type </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.propertyType}
                    onChange={(e) => handleChange("propertyType", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>None</option>
                    <option value={"residential"}>Residential</option>
                    <option value={"commercial"}>Commercial</option>
                    <option value={"industrial"}>Industrial</option>
                    <option value={"agricultural"}>Agricultural</option>
                    <option value={"other"}>Other</option>
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Payment Type </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>None</option>
                    <option value={"cash"}>Cash</option>
                    <option value={"cheque"}>Cheque</option>
                    <option value={"card"}>Card</option>
                    <option value={"online"}>Online</option>
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Total Amount </td>
                <td className="pb-4">
                  <TextField
                    name="total"
                    value={voucherData.total}
                    onChange={(e) => handleChange("total", e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Amount Paying </td>
                <td className="pb-4">
                  <TextField
                    name="paid"
                    value={voucherData.paid}
                    onChange={(e) => handleChange("paid", e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Remainig Amount </td>
                <td className="pb-4">
                  <TextField
                    disabled
                    name="remained"
                    value={voucherData.remained = handleRemainingAmount()}
                    onChange={(e) => handleChange("remained", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pt-1 text-lg flex flex-col justify-start">Note </td>
                <td className="pb-4">
                  <TextField
                    name="note"
                    value={voucherData.note}
                    onChange={(e) => handleChange("note", e.target.value)}
                    size="small"
                    type="text"
                    rows={4}
                    multiline
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
            onClick={handleCreateVoucher}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? <span>Submitting...</span> : <span>Create</span>}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateVoucher;
