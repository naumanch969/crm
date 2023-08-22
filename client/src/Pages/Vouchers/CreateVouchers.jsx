import { KeyboardArrowRight } from "@mui/icons-material";
import React from "react";
import Form from "./Form";
import Topbar from "./Topbar";

function CreateVouchers() {
  return (
    <div className="w-full h-screen">

      <Topbar />
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
