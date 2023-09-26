import {
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { updateSociety } from "../../../redux/action/society";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllImagesReducer } from "../../../redux/reducer/upload";
import { Upload } from "../../../utils";
import { PiImages, PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditSociety = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch();
  const { currentSociety: society, isFetching } = useSelector((state) => state.society);
  const { urls } = useSelector((state) => state.upload);

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [societyData, setSocietyData] = useState(society);

  //////////////////////////////////////// USE EFFEECT ////////////////////////////////////////////
  useEffect(() => {
    setSocietyData(society);
  }, [society]);
  useEffect(() => {
    setSocietyData({ ...societyData, images: urls });
  }, [urls]);

  //////////////////////////////////////// FUNCTION ////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSociety(society._id, { ...societyData }));
    dispatch(deleteAllImagesReducer());
    setOpen(false);
  };
  const handleInputChange = (field, value) => {
    setSocietyData((prevFilters) => ({
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
          <div className="text-sky-400 font-primary">Add New Society</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-3 flex flex-col gap-2 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser size={23} />
              <span>Society Details</span>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-3 text-gray-500">
              <table className="mt-4">
                <tr>
                  <td className="pb-4 text-lg">Title </td>
                  <td className="pb-4">
                    <TextField
                      name="title"
                      value={societyData?.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
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
                      name="description"
                      value={societyData?.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                      multiline
                      rows={4}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Images </td>
                  <td className="pb-4 flex flex-wrap gap-[8px] ">
                    <Upload image={societyData?.images} isMultiple={true} />
                  </td>
                </tr>
                <tr>
                  <td className="text-lg">Status </td>
                  <td>
                    <FormGroup>
                      <FormControlLabel
                        className="w-40 text-gray-400"
                        onChange={(e) => setSocietyData({ ...societyData, 'status': e.target.checked ? "active" : "inactive" })}
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
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditSociety;
