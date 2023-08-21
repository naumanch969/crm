import React from "react";

const TableView = () => {
  return (
    <div className="bg-white rounded-lg shadow-md h-screen w-full mt-5">
      <p className="flex justify-center text-3xl font-thin text-primary-red pt-4">
        Single Item View
      </p>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10 columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">FirstName</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">LastName</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Gender</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">Hamza</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">Zulfiqar</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">Male</div>
      </div>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10  columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">CNIC</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">Phone</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Email</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">12312312312</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">1231231322</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">hamza@gmail.com</div>
      </div>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10  columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">City</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">Location Area</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Property Type</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">Lahore</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">Cantt</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">Domestic</div>
      </div>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10  columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">Home Type</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">Min Area</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Max Area</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">Appartment</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">2 Marla</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">3 Marls</div>
      </div>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10  columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">Min Budget</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">Max Budget</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Lead Priority</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">20000</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">30000</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">High</div>
      </div>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10  columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">Client Type</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">Beds</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Source</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">Direct</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">3</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">Facebook</div>
      </div>

      {/* Field Heading */}
      <div className="pl-10 pr-10 pt-10  columns-3">
        <div className="text-xl font-Mulish text-gray-600 flex justify-start">Submitted</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-center">Allocated to</div>
        <div className="text-xl font-Mulish text-gray-600 flex justify-end">Status</div>
      </div>

      {/* Field Data */}
      <div className="pl-10 pr-10 columns-3">
        <div className="text-lg font-extralight text-gray-600 flex justify-start">2 Days Ago</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-center">User 1</div>
        <div className="text-lg font-extralight text-gray-600 flex justify-end">Processing</div>
      </div>

    </div>
  );
};

export default TableView;
