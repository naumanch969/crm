import { DialogActions, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { updateProject } from "../../redux/action/project";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllImagesReducer } from "../../redux/reducer/upload";
import { Upload } from "../../utils";
import { PiImages, PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditInventory = ({ open, setOpen, openEdit, setOpenEdit, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch();
  const { currentProject: project, isFetching } = useSelector((state) => state.project);
  const { urls } = useSelector((state) => state.upload);

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [projectData, setProjectData] = useState(project);

  //////////////////////////////////////// USE EFFEECT ////////////////////////////////////////////
  useEffect(() => {
    setProjectData(project);
  }, [project]);
  useEffect(() => {
    setProjectData({ ...projectData, images: urls });
  }, [urls]);

  //////////////////////////////////////// FUNCTION ////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject(project._id, { ...projectData }));
    dispatch(deleteAllImagesReducer());
    setOpen(false);
  };
  const handleChange = (e) => {
    setProjectData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <div>
      <Dialog
        open={openEdit}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Edit Project</div>
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
                      name="sellerEmail"
                      // value={sellerData.sellerEmail}
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
                      name="sellerPhone"
                      // value={sellerData.sellerEmail}
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
                      name="sellerName"
                      // value={sellerData.sellerName}
                      fullWidth
                      size="small"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Seller Company Name </td>
                  <td className="pb-4">
                    <TextField
                      name="sellerCompamyName"
                      // value={sellerData.sellerCompamyName}
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
                    <Select
                      name="sellerCity"
                      size="small"
                      // value={sellerData.sellerCity}
                      displayEmpty
                      placeholder="Seller City"
                      fullWidth>
                      {pakistanCities.map((city) => (
                        <MenuItem value={city}>{city}</MenuItem>
                      ))}
                    </Select>
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
                <td className="text-lg pt-1 flex flex-col justify-start">Creation Date </td>
                <td className="pb-4">
                  <TextField
                    name="remarks"
                    // value={projectData.createdAt}
                    size="small"
                    disabled
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Project </td>
                <td className="pb-4">
                  <Select
                    name="project"
                    size="small"
                    // value={projectData.project}
                    // onChange={handleInputChange}
                    fullWidth>
                    <MenuItem value="1">
                      Blue World City (Blue World City - Blue World City)
                    </MenuItem>
                    <MenuItem value="2">Kingdom Valley (Kingdom Valley - Kingdom Valley)</MenuItem>
                    <MenuItem value="3">Ruden Enclave (Ruden Enclave - Ruden Enclave)</MenuItem>
                    <MenuItem value="4">
                      Smart City (Smart City - Smart City Canal Road Lahore)
                    </MenuItem>
                    <MenuItem value="6">Blue Town (Blue Town - Blue Town Sapphire)</MenuItem>
                    <MenuItem value="6">Alnoor Orchard (Alnoor Orchard - Alnoor Orchard)</MenuItem>
                    <MenuItem value="7">
                      Lahore Ent City (Lahore Ent City - Lahore Ent City)
                    </MenuItem>
                    <MenuItem value="8">
                      Soul City Lahore (Blue World City - Blue World City)
                    </MenuItem>
                    <MenuItem value="9">Mid City (Mid City Lahore - Mid City Lahore)</MenuItem>
                    <MenuItem value="10">
                      Urban City (Urban City Lahore - Urban City Lahore)
                    </MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Number </td>
                <td className="pb-4">
                  <TextField
                    name="propertyNumber"
                    // value={projectData.propertyNumber}
                    // onChange={handleInputChange}
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
                    name="propertyStreetNumber"
                    // value={projectData.propertyStreetNumber}
                    // onChange={handleInputChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Price </td>
                <td className="pb-4">
                  <TextField
                    name="propertyPrice"
                    // value={projectData.propertyPrice}
                    // onChange={handleInputChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="text-lg pt-1 flex flex-col justify-start">Remarks </td>
                <td>
                  <TextField
                    name="remarks"
                    // value={projectData.remarks}
                    // onChange={handleInputChange}
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
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 font-primary hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 font-primary hover:bg-red-400">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditInventory;
