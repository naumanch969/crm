import React, { useEffect } from "react";
import { PiHandCoins, PiHouseLine, PiImage, PiMapPinLine, PiRuler, PiXLight } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../utils";
import { getInventory } from "../../../redux/action/inventory";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ViewInventory = ({ open, setOpen, scroll, inventoryId }) => {
  const dispatch = useDispatch();
  const { currentInventory, isFetching } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (inventoryId) {
      dispatch(getInventory(inventoryId));
    }
  }, [inventoryId]);

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
          <div className="text-sky-400 font-primary">View Inventory</div>
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
                      {currentInventory?.propertyType}
                    </td>
                  </tr>
                  <td className="text-lg font-[350] flex items-center gap-[52px]">
                    <td>Home Type : </td>
                    <td className="text-black font-normal capitalize">
                      {currentInventory?.homeType}
                    </td>
                  </td>
                  <tr className="text-lg font-[350] pb-6 flex items-center gap-[64px]">
                    <td>Total Beds :</td>
                    <td className="text-black font-normal">{currentInventory?.beds}</td>
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
                    <td className="text-black font-normal capitalize">{currentInventory?.city}</td>
                  </tr>
                  <tr className="text-lg font-[350] pb-6 flex items-center gap-[30px]">
                    <td>Location Area : </td>
                    <td className="text-black font-normal capitalize">{currentInventory?.region}</td>
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
                  <td className="text-black font-normal">{currentInventory?.area} Marla</td>
                </tr>
                <tr className="text-lg font-[350] pb-6 flex items-center gap-[15px]">
                  <td>Area in sq feets : </td>
                  <td className="text-black font-normal">
                    {currentInventory?.area * 273} sq feets
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
                  <td>Selling Price : </td><td className="text-black font-normal">Rs. {currentInventory?.price}</td>
                </tr>
                </table>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ViewInventory;
