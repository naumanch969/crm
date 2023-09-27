import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../../redux/action/project";
import { CheckBox, Clear, UploadFile } from "@mui/icons-material";
import { Loader, Upload } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { deleteAllImagesReducer } from "../../../redux/reducer/upload";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiImages, PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../../constant";
import { getSocieties } from "../../../redux/action/society";

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
  const { societies, isFetching: societiesFetching } = useSelector((state) => state.society);
  const { urls } = useSelector((state) => state.upload);
  const ProjectinitialState = {
    title: "",
    description: "",
    city: "",
    society: "",
    images: [],
    status: "active",
  };
  //////////////////////////////////////// STATES ////////////////////////////////////
  const [projectData, setProjectData] = useState(ProjectinitialState);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    setProjectData({ ...projectData, images: urls });
  }, [urls]);
  useEffect(() => {
    dispatch(getSocieties());
  }, []);

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(projectData, navigate));
    dispatch(deleteAllImagesReducer());
    setProjectData(ProjectinitialState);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setProjectData((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setProjectData(ProjectinitialState);
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
          <div className="p-3 flex flex-col gap-2 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser size={23} />
              <span>Project Details</span>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-3 text-gray-500">
              <table className="mt-4">
                <tr>
                  <td className="pb-4 text-lg">Title </td>
                  <td className="pb-4">
                    <TextField
                      value={projectData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      fullWidth
                      size="small"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-lg pt-1 flex flex-col justify-start">Description </td>
                  <td className="pb-4">
                    <TextField
                      value={projectData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                      multiline
                      rows={4}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">City </td>
                  <td className="pb-4">
                    <CFormSelect
                      value={projectData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                    >
                      <option value={""}>None</option>
                      {pakistanCities.map((city, key) => (
                        <option key={key} value={city}>{city}</option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Society </td>
                  <td className="pb-4">
                    <CFormSelect
                      value={projectData.society}
                      onChange={(e) => handleChange("society", e.target.value)}
                      className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                    >
                      <option value={""}>None</option>
                      {societies.map((society, key) => (
                        <option key={key} value={society._id}>{society.title}</option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">images </td>
                  <td className="pb-4 flex flex-wrap gap-[8px] ">
                    <Upload image={projectData.images} isMultiple={true} />
                  </td>
                </tr>
                <tr>
                  <td className="text-lg">Status </td>
                  <td>
                    <FormGroup>
                      <FormControlLabel
                        className="w-40 text-gray-400"
                        onChange={(e) =>
                          setProjectData({
                            ...projectData,
                            status: e.target.checked ? "active" : "inactive",
                          })
                        }
                        control={<Checkbox defaultChecked style={{ color: "#20aee3" }} />}
                      />
                    </FormGroup>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="mr-7 mb-5">
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-red-400 px-4 py-2 rounded-lg mt-4 text-white hover:bg-red-500 border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-sky-400 px-4 py-2 rounded-lg text-white mt-4 hover:bg-sky-500 font-thin">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateProject;
