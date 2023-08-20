import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FORM = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    Branch: "",
    IssueDate: "",
    DueDate: "",
    Name: "",
    CNIC: "",
    TOP: "",
    TAmount: "",
    PAmount: "",
    RAmount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDownloadPDF = (e) => {
    const documentDefinition = {
      content: [
        { text: "PAYMENT VOUCHER", style: "header" },
        {
          columns: [
            {
              text: "Voucher Number : ",
              style: "subheader",
            },
            {
              text: `${formData.Branch}`,
              style: "fieldData",
            },
          ],
        },
        {
          columns: [
            {
              text: "Date of Issue : ",
              style: "subheader",
            },
            {
              text: `${formData.IssueDate}`,
              style: "fieldData",
            },
          ],
        },
        {
          style: "tableExample",
          color: "#444",
          table: {
            widths: [180, "auto", "auto"],
            headerRows: 2,
            body: [
              [
                {
                  text: `Amount : ${formData.PAmount}`,
                  colSpan:0,
                },
                {
                  text: `Due Date : ${formData.DueDate}`,
                  colSpan:0,
                },
                {},
              ],
              [
                { text: "Header 1", style: "tableHeader", alignment: "center" },
                { text: "Header 2", style: "tableHeader", alignment: "center" },
                { text: "Header 3", style: "tableHeader", alignment: "center" },
              ],
              ["Sample value 1", "Sample value 2", "Sample value 3"],
              [
                {
                  rowSpan: 3,
                  text: "rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
                },
                "Sample value 2",
                "Sample value 3",
              ],
              ["", "Sample value 2", "Sample value 3"],
              ["Sample value 1", "Sample value 2", "Sample value 3"],
              [
                "Sample value 1",
                {
                  colSpan: 2,
                  rowSpan: 2,
                  text: "Both:\nrowSpan and colSpan\ncan be defined at the same time",
                },
                "",
              ],
              ["Sample value 1", "", ""],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 30],
          alignment: "center",
        },
        subheader: {
          fontSize: 13,
          bold: true,
          margin: [70, 0, 0, 0],
        },
        fieldData: {
          bold: false,
          fontSize: 10,
          margin: [-40, 2, 0, 0],
        },
        tableExample: {
          margin: [70, 15, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Voucher.pdf");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form className="flex flex-col mt-4 w-full">
        <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
          <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
            {/* all inputs */}
            <div className="flex justify-start flex-wrap gap-[24px] w-full ">
              {/* Branch */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Branch:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="text"
                  name="Branch"
                  value={formData.Branch}
                  onChange={handleInputChange}
                />
              </div>
              {/* Date of Issue */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Issueing Date:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="date"
                  name="IssueDate"
                  value={formData.IssueDate}
                  onChange={handleInputChange}
                />
              </div>
              {/* Due Date */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Due Date:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="date"
                  name="DueDate"
                  value={formData.DueDate}
                  onChange={handleInputChange}
                />
              </div>
              {/* Customer Name */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Customer Name:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                />
              </div>
              {/* Customer CNIC */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Customer CNIC:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="CNIC"
                  value={formData.CNIC}
                  onChange={handleInputChange}
                />
              </div>
              {/* Type of Payment */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="homeType">
                  Type of Payment
                </label>
                <select
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  name="TOP"
                  value={formData.TOP}
                  onChange={handleInputChange}>
                  <option value="">-</option>
                  <option name="TOP">Cash</option>
                  <option name="TOP">Cheque</option>
                  <option name="TOP">Credit Card</option>
                  <option name="TOP">Online</option>
                </select>
              </div>
              {/* Total Amount */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Total Amount:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="TAmount"
                  value={formData.TAmount}
                  onChange={handleInputChange}
                />
              </div>
              {/* Amount Paying */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Amount Paying:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="PAmount"
                  value={formData.PAmount}
                  onChange={handleInputChange}
                />
              </div>
              {/* Remaing Amount */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Remaing Amount:
                </label>
                <input
                  disabled
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="text"
                  name="RAmount"
                  value={formData.TAmount - formData.PAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* button */}
            <div className="w-full flex justify-end items-center pr-5">
              <button
                onClick={handleDownloadPDF}
                className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
                Download Voucher
              </button>
            </div>
          </div>
        </div>
      </form>
      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            {/* Content for the modal overlay */}
            {/* This can be used to show PDF content if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FORM;
