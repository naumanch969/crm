import { Autocomplete, DialogActions, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { updateInventory } from "../../../redux/action/inventory";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllImagesReducer } from "../../../redux/reducer/upload";
import { Loader, Upload } from "../../../utils";
import { PiImages, PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../../constant";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditInventory = ({ open, setOpen, openEdit, setOpenEdit, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch();
  const { currentInventory: inventory, isFetching } = useSelector((state) => state.inventory);
  const { isFetching: projectsFetching, projects } = useSelector((state) => state.project);

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [inventoryData, setInventoryData] = useState(inventory);

  //////////////////////////////////////// USE EFFEECT ////////////////////////////////////////////
  useEffect(() => {
    setInventoryData(inventory);
  }, [inventory]);

  //////////////////////////////////////// FUNCTION ////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInventory(inventory._id, { ...inventoryData }));
    dispatch(deleteAllImagesReducer());
    setOpen(false);
  };
  const handleInputChange = (field, value) => {
    setInventoryData((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Inventory</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-3 flex flex-col gap-2 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser size={23} />
              <span>Seller Details</span>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-3 text-gray-500">
              <table className="mt-4">
                <tr>
                  <td className="pb-4 text-lg">Seller Email Address </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData?.sellerEmail}
                      onChange={(e) => handleInputChange("sellerEmail", e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="Optional"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Phone Number </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData?.sellerPhone}
                      onChange={(e) => handleInputChange("sellerPhone", e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Name </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData?.sellerName}
                      onChange={(e) => handleInputChange("sellerName", e.target.value)}
                      size="small"
                      type="text"
                      fullWidth
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Company Name </td>
                  <td className="pb-4">
                    <TextField
                      value={inventoryData?.sellerCompamyName}
                      onChange={(e) => handleInputChange("sellerCompamyName", e.target.value)}
                      fullWidth
                      size="small"
                      type="text"
                      placeholder="Optional"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller City </td>
                  <td className="pb-4">
                    <CFormSelect
                      size="sm"
                      value={inventoryData?.sellerCity}
                      onChange={(e) => handleInputChange("sellerCity", e.target.value)}
                      className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                      {pakistanCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-primary">
              <PiNotepad size={23} />
              <span>Inventory Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Project </td>
                <td className="pb-4">
                  <CFormSelect
                    size="sm"
                    value={inventoryData?.project}
                    onChange={(e) => handleInputChange("project", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.title}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Number </td>
                <td className="pb-4">
                  <TextField
                    value={inventoryData?.propertyNumber}
                    onChange={(e) => handleInputChange("propertyNumber", e.target.value)}
                    size="small"
                    placeholder="Plot/Shop/Appartment etc. No."
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Street Number </td>
                <td className="pb-4">
                  <TextField
                    value={inventoryData?.propertyStreetNumber}
                    onChange={(e) => handleInputChange("propertyStreetNumber", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Price </td>
                <td className="pb-4">
                  <TextField
                    value={inventoryData?.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="text-lg pt-1 flex flex-col justify-start">Remarks </td>
                <td>
                  <TextField
                    value={inventoryData?.remarks}
                    onChange={(e) => handleInputChange("remarks", e.target.value)}
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mr-7 mb-5">
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-red-400 px-4 py-2 rounded-lg mt-4 text-white hover:bg-red-500 border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-primary transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-sky-400 px-4 py-2 rounded-lg text-white mt-4 hover:bg-sky-500 font-primary">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditInventory;
