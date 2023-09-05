import React, { useEffect } from "react";
import { PiHandCoins, PiHouseLine, PiImage, PiMapPinLine, PiRuler, PiXLight } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import Carousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../utils";
import { getProject } from "../../redux/action/project";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Project = ({ open, setOpen, scroll, projectId }) => {
  const dispatch = useDispatch();
  const { currentProject, isFetching } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(getProject(projectId));
    }
  }, [projectId]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">View Project</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        {isFetching ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <DialogContent>
            <div className="text-[#67757c] font-primary">
              <div className="bg-white w-full h-full px-4">
                <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                  <PiHouseLine className="text-[25px]" />
                  Property Details
                </div>
                <Divider />

                <table className="flex flex-col gap-2">
                  <tr className="pt-2 text-lg font-[350] flex items-center gap-8">
                    <td>Property Type : </td>
                    <td className="text-black font-normal capitalize">
                      {currentProject?.propertyType}
                    </td>
                  </tr>
                  <td className="text-lg font-[350] flex items-center gap-[52px]">
                    <td>Home Type : </td>
                    <td className="text-black font-normal capitalize">
                      {currentProject?.homeType}
                    </td>
                  </td>
                  <tr className="text-lg font-[350] pb-6 flex items-center gap-[64px]">
                    <td>Total Beds :</td>
                    <td className="text-black font-normal">{currentProject?.beds}</td>
                  </tr>
                </table>

                <div className="flex items-center pb-2 gap-3 text-[20px]">
                  <PiMapPinLine className="text-[25px]" />
                  Location
                </div>
                <Divider />
                <table>
                  <tr className="pt-2 text-lg font-[350] flex items-center gap-[120px]">
                    <td>City : </td>
                    <td className="text-black font-normal capitalize">{currentProject?.city}</td>
                  </tr>
                  <tr className="text-lg font-[350] pb-6 flex items-center gap-[30px]">
                    <td>Location Area : </td>
                    <td className="text-black font-normal capitalize">{currentProject?.region}</td>
                  </tr>
                </table>

                <div className="flex items-center pb-2 gap-3 text-[20px]">
                  <PiRuler className="text-[25px]" />
                  Area
                </div>
                <Divider />
                <table>
                <tr className="pt-2 text-lg font-[350] flex items-center gap-[34px]">
                  <td>Area in Marla : </td>
                  <td className="text-black font-normal">{currentProject?.area} Marla</td>
                </tr>
                <tr className="text-lg font-[350] pb-6 flex items-center gap-[15px]">
                  <td>Area in sq feets : </td>
                  <td className="text-black font-normal">
                    {currentProject?.area * 273} sq feets
                  </td>
                </tr>
                </table>

                <div className="flex items-center pb-2 gap-3 text-[20px]">
                  <PiHandCoins className="text-[25px]" />
                  Price
                </div>
                <Divider />
                <table>
                <tr className="text-lg font-[350] pb-6 pt-2 flex items-center gap-[40px]">
                  <td>Selling Price : </td><td className="text-black font-normal">Rs. {currentProject?.price}</td>
                </tr>
                </table>

                <div className="flex items-center pb-2 gap-3 text-[20px]">
                  <PiImage className="text-[25px]" />
                  Images
                </div>
                <Divider />
                <div>
                  <Carousel src={currentProject?.images} />
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Project;
