import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../../redux/action/lead";
import { pakistanCities } from "../../constant";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { getProjects } from "../../redux/action/project";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const { employees, loggedUser } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const projectsTitles = projects.map(({ _id, title }) => ({ _id, title }));
  let initialLeadState = {
    firstName: "",
    lastName: "",
    phone: "",
    CNIC: "",
    clientCity: "",
    email: "",
    city: "",
    priority: "",
    property: "",
    status: "",
    source: "",
    description: "",
  };
  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [leadData, setLeadData] = useState(currentLead);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setLeadData(currentLead);
  }, [currentLead]);
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      phone,
      clientCity,
      city,
      priority,
      property,
      status,
      source,
      description,
    } = leadData;
    console.log(
      firstName,
      lastName,
      username,
      phone,
      clientCity,
      city,
      priority,
      property,
      status,
      source,
      description
    );
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phone ||
      !clientCity ||
      !city ||
      !priority ||
      !property ||
      !status ||
      !source ||
      !description
    )
      return alert("Make sure to provide all the fields");
    dispatch(updateLead(currentLead?._id, leadData));
    setLeadData(initialLeadState);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((pre) => ({ ...pre, [name]: value }));
  };

  const handleClose = () => {
    setLeadData(initialLeadState);
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
          <div className="text-sky-400 font-primary">Add New Lead</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    name="firstName"
                    value={leadData?.firstName}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    name="lastName"
                    value={leadData?.lastName}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Username </td>
                <td className="pb-4">
                  <TextField
                    name="username"
                    value={leadData?.username}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="phone"
                    onChange={handleChange}
                    value={leadData?.phone}
                    type="number"
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
                    onChange={handleChange}
                    value={leadData?.CNIC}
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData?.clientCity}
                    name="clientCity"
                    type="text"
                    size="small"
                    fullWidth>
                    {pakistanCities.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    type="email"
                    onChange={handleChange}
                    value={leadData?.email}
                    name="email"
                    size="small"
                    placeholder="Optional"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>

          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad />
              <span>Client Requirements</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData?.city}
                    name="city"
                    type="text"
                    size="small"
                    fullWidth>
                    {pakistanCities.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData?.property}
                    name="property"
                    type="text"
                    size="small"
                    fullWidth>
                    {projectsTitles.map((project, index) => (
                      <MenuItem value={project._id} key={index}>
                        {project.title}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData?.priority}
                    name="priority"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="veryCold">Very Cold</MenuItem>
                    <MenuItem value="cold">Cold</MenuItem>
                    <MenuItem value="moderate">Moderate</MenuItem>
                    <MenuItem value="hot">Hot</MenuItem>
                    <MenuItem value="veryHot">Very Hot</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData?.status}
                    name="status"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="closedLost">Closed (Lost)</MenuItem>
                    <MenuItem value="followedUpCall">Followed Up (Call)</MenuItem>
                    <MenuItem value="contactedCallAttempt">
                      Contacted Client (Call Attempt)
                    </MenuItem>
                    <MenuItem value="contactedCall">Contacted Client (Call)</MenuItem>
                    <MenuItem value="followedUpEmail">Followed Up (Email)</MenuItem>
                    <MenuItem value="contactedEmail">Contacted Client (Email)</MenuItem>
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="meetingDone">Meeting (Done)</MenuItem>
                    <MenuItem value="closedWon">Closed (Won)</MenuItem>
                    <MenuItem value="meetingAttempt">Meeting (Attempt)</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Source </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData?.source}
                    name="source"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="facebookComment">Facebook Comment</MenuItem>
                    <MenuItem value="FriendAndFamily">Friend and Family</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="directCall">Direct Call</MenuItem>
                    <MenuItem value="google">Google</MenuItem>
                    <MenuItem value="referral">Referral</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Description </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleChange}
                    value={leadData?.description}
                    name="description"
                    type="text"
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mr-4 mb-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleClose}>
            Cancel
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleSubmit}
            autoFocus>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditModal;
