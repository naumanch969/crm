import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/action/project";
import { Clear, UploadFile } from "@mui/icons-material";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { Upload } from "../../utils";
import { deleteAllImagesReducer } from "../../redux/reducer/upload";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { PiImages, PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateProject = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.project);
  const { urls } = useSelector((state) => state.upload);
  const ProjectinitialState = {
    property: "",
    propertyNumber: "",
    propertyStreetNumber: "",
    propertyPrice: "",
    remarks: "",
    createdAt: dateTime,
  };

  const SellerInitialStates = {
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    sellerCompamyName: "",
    sellerCity: "",
  };

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [projectData, setProjectData] = useState(ProjectinitialState);
  const [sellerData, setsellerData] = useState(SellerInitialStates);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    setProjectData({ ...projectData, images: urls });
  }, [urls]);

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(projectData, navigate));
    dispatch(deleteAllImagesReducer());
    setProjectData(ProjectinitialState);
    setsellerData(SellerInitialStates);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const inputValue =
      e.target.value.charAt(0).toLowerCase() + e.target.value.slice(1).replace(/\s+/g, "");
    setProjectData((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: inputValue,
    }));
  };

  const handleClose = () => {
    setProjectData(ProjectinitialState);
    setsellerData(SellerInitialStates);
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
          <div className="text-sky-400 font-primary">Add New Project</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-3 flex flex-col gap-2 text-gray-500">
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
                      value={sellerData.sellerEmail}
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
                      value={sellerData.sellerEmail}
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
                      value={sellerData.sellerName}
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
                      value={sellerData.sellerCompamyName}
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
                      value={sellerData.sellerCity}
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
          <div className="flex flex-col gap-2 p-3 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-primary">
              <PiNotepad size={23} />
              <span>Project Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="text-lg pt-1 flex flex-col justify-start">Creation Date </td>
                <td className="pb-4">
                  <TextField
                    name="remarks"
                    value={projectData.createdAt}
                    size="small"
                    disabled
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property </td>
                <td className="pb-4">
                  <Select
                    name="property"
                    size="small"
                    value={projectData.property}
                    onChange={handleInputChange}
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
                    value={projectData.propertyNumber}
                    onChange={handleInputChange}
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
                    value={projectData.propertyStreetNumber}
                    onChange={handleInputChange}
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
                    value={projectData.propertyPrice}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="text-lg pt-1 flex flex-col justify-start">Remarks </td>
                <td className="pb-4">
                  <TextField
                    name="remarks"
                    value={projectData.remarks}
                    onChange={handleInputChange}
                    size="small"
                    multiline
                    rows={3}
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
};

export default CreateProject;
