import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { createVoucher } from '../../redux/action/voucher'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FORM = () => {

  ////////////////////////////////////// VARIBALES ///////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialVoucherState = { branch: "", issuingDate: "", dueDate: "", customerName: "", cnic: "", phone: "", type: "", total: "", paid: "", remained: "", }

  ////////////////////////////////////// STATES //////////////////////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [isVoucherCreated, setIsVoucherCreated] = useState(false)
  const [voucherData, setVoucherData] = useState(initialVoucherState);


  ////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVoucherData((prevData) => ({ ...prevData, [name]: value, }));
  };


  const handleDownloadPDF = (e) => {
    e.preventDefault()
    dispatch(createVoucher(voucherData))
    setIsVoucherCreated(false)

    const documentDefinition = {
      content: [
        {
          columns: [
            {},
            { text: "Payment Reciept", style: "header", alignment: "center" },
            {
              margin: [10, 0, 0, 0],
              table: {
                widths: [50, 80],
                body: [
                  [
                    { text: "Branch", bold: true, alignment: "center" },
                    { text: `${voucherData.branch}`, alignment: "center" },
                  ],
                  [
                    { text: "Date", bold: true, alignment: "center" },
                    { text: `${voucherData.issuingDate}`, alignment: "center" },
                  ],
                ],
              },
            },
          ],
        },

        {
          margin: [0, 40, 0, 0],
          table: {
            headerRows: 1,
            widths: [160, 160, 160],
            body: [
              [
                { text: "Name", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "CNIC", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Phone", alignment: "center", bold: true, fillColor: "#dddddd" },
              ],
              [
                { text: `${voucherData.customerName}`, alignment: "center" },
                { text: `${voucherData.cnic}`, alignment: "center" },
                { text: `${voucherData.phone}`, alignment: "center" },
              ],
              [
                {
                  colSpan: 3,
                  text: "* If, for some reason, the deal fails through, there is no penalty and the same amount is returned to the buyer.",
                },
                "",
                "",
              ],
            ],
          },
        },

        {
          margin: [0, 5, 0, 0],
          table: {
            headerRows: 1,
            widths: [160, 160, 160],
            body: [
              [
                { text: "Type of Payment", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Amount", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Pay before", alignment: "center", bold: true, fillColor: "#dddddd" },
              ],
              [
                { text: `${voucherData.type}`, alignment: "center" },
                { text: `${voucherData.paid}`, alignment: "center" },
                { text: `${voucherData.dueDate}`, alignment: "center" },
              ],
            ],
          },
        },

        {
          columns: [
            {
              margin: [10, 30, 0, 0],
              table: {
                widths: [130],
                body: [
                  [
                    {
                      text: "Total Amount",
                      bold: true,
                      alignment: "center",
                      border: [false, false, false, false],
                    },
                  ],
                  [{ text: `${voucherData.total}`, alignment: "center" }],
                ],
              },
            },
            {
              margin: [10, 30, 0, 0],
              table: {
                widths: [130],
                body: [
                  [
                    {
                      text: "Amount Paying",
                      bold: true,
                      alignment: "center",
                      border: [false, false, false, false],
                    },
                  ],
                  [{ text: `${voucherData.paid}`, alignment: "center" }],
                ],
              },
            },
            {
              margin: [10, 30, 0, 0],
              table: {
                widths: [130],
                body: [
                  [
                    {
                      text: "Remaining Amount",
                      bold: true,
                      alignment: "center",
                      border: [false, false, false, false],
                    },
                  ],
                  [{ text: `${voucherData.total - voucherData.paid}`, alignment: "center" }],
                ],
              },
            },
          ],
        },
        {
          text: "© Generated by GROW company", alignment: 'center', fontSize: 10, margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: "center",
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Voucher.pdf");

    setVoucherData(initialVoucherState)
  };



  return (
    <div className="flex justify-center items-center">
      <form onSubmit={(e) => handleDownloadPDF(e)} className="flex flex-col mt-4 w-full">
        <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
          <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
            {/* all inputs */}
            <div className="flex justify-start flex-wrap gap-[24px] w-full ">
              {/* Branch */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="branch">
                  Branch:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="text"
                  name="branch"
                  value={voucherData.branch}
                  onChange={handleInputChange}
                />
              </div>
              {/* Date of Issue */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="issuingDate">
                  Issueing Date:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="date"
                  name="issuingDate"
                  value={voucherData.issuingDate}
                  onChange={handleInputChange}
                />
              </div>
              {/* Due Date */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="dueDate">
                  Due Date:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="date"
                  name="dueDate"
                  value={voucherData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              {/* Customer Name */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="name">
                  Customer Name:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="text"
                  name="customerName"
                  value={voucherData.customerName}
                  onChange={handleInputChange}
                />
              </div>
              {/* Customer CNIC */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="cnic">
                  Customer CNIC:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="cnic"
                  value={voucherData.cnic}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="phone">
                  Phone Number:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="phone"
                  value={voucherData.phone}
                  onChange={handleInputChange}
                />
              </div>
              {/* Type of Payment */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="type">
                  Type of Payment
                </label>
                <select
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  name="type"
                  value={voucherData.type}
                  onChange={handleInputChange}
                >
                  <option value="">-</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="online">Online</option>
                </select>
              </div>
              {/* Total Amount */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="total">
                  Total Amount:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="total"
                  value={voucherData.total}
                  onChange={handleInputChange}
                />
              </div>
              {/* Amount Paying */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paid">
                  Amount Paying:
                </label>
                <input
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="number"
                  name="paid"
                  value={voucherData.paid}
                  onChange={handleInputChange}
                />
              </div>
              {/* Remaing Amount */}
              <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="remained">
                  Remaing Amount:
                </label>
                <input
                  disabled
                  className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  type="text"
                  name="remained"
                  value={voucherData.total - voucherData.paid}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* button */}
            <div className="w-full flex justify-end items-center pr-5 sm:pb-0 pb-5">
              <button
                type="submit"
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
