import { KeyboardArrowRight } from "@mui/icons-material";
import React from "react";
import Form from "./Form";

function CreateVouchers() {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start gap-[4px] ">
          <h1 className="text-primary-blue text-[24px] ">Create Vouchers</h1>
          <div className="flex justify-start items-center gap-[8px] ">
            <span className="capitalize text-[15px] text-primary-gray ">App</span>
            <KeyboardArrowRight className="text-primary-gray " />
            <span className="capitalize text-black ">Create Voucher</span>
          </div>
        </div>
      </div>

      <div>
        <div className="text-2xl font-normal flex justify-center mt-10 text-gray-600">
          Create New Voucher
        </div>

        <div className="mt-5">
            <Form />
        </div>
      </div>

    </div>
  );
}

export default CreateVouchers;
