import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";
import CreateVoucher from "./CreateVoucher";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";

const VoucherPage = ({ }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////
  const barcodeValue = "AD157491594D5";
  const navigate = useNavigate()
  const { state } = useLocation()
  const voucher = state?.voucher
  const pdfRef = useRef()

  // Create a barcode canvas using JsBarcode
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, barcodeValue, {
    format: "CODE128", // You can choose a barcode format
    width: 2,
    height: 50,
  });

  // Convert the canvas to an image
  const barcodeImage = canvas.toDataURL("image/png");



  useEffect(() => {
    const downloadPdf = () => {
      const capture = document.querySelector(".completePdfPage");
      html2canvas(capture)
        .then((canvas) => {
          const imgData = canvas.toDataURL("img/png");
          const pdf = new jsPDF("p", "mm", "a4", true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width
          const imgHeight = canvas.height
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 100;
          pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save("download.pdf");
          navigate('/voucher')
        })
        .catch((err) => {
          console.log(err);
        });
    };
    downloadPdf()
  })

  return (
    <div ref={pdfRef} className="completePdfPage w-full flex justify-center ">
      <div className="w-[51rem] h-screen pt-10 bg-white">


        <div className="w-full flex justify-center relative  ">
          <h2 className="text-3xl font-primary font-medium">Payments Reciept</h2>
        </div>

        <div className="flex justify-end items w-full relative py-[1rem] ">
          <div className=" ">
            <table className="border-[1px] border-black w-full " >
              <tr className="text-center border-[1px] border-black">
                <th className="border-r-[1px] border-b-[1px] border-black px-6 bg-[#dddddd]">Branch</th>
                <td className="px-12 border-b-[1px] border-black capitalize ">{voucher?.branch}</td>
              </tr>
              <tr className='w-full' >
                <th className="border-r-[1px] border-black bg-[#dddddd]">Dated</th>
                <td className="px-12">{voucher?.issuingDate}</td>
              </tr>
            </table>
          </div>
        </div>

        {/* name, cnic, phone */}
        <div className="w-full flex justify-center">
          <table className="text-center border-[1px] border-black w-full ">
            <tr className='w-full' >
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Name</th>
              <th className="text-center border-y-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">CNIC</th>
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Phone</th>
            </tr>
            <tr className='w-full' >
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] capitalize ">{voucher?.type}</td>
              <td className="text-center border-b-[1px] border-black h-[2rem] w-[13rem] ">{voucher?.CNIC}</td>
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] ">{voucher?.phone}</td>
            </tr>
            <tr className='w-full' >
              <td className="px-[1px] h-[4rem] "  colSpan={5}>
                * If for some reason, the deal fails through, there is no penalty and the same
                amount will be returned to the buyer by the company.
              </td>
            </tr>
          </table>
        </div>

        {/* TOP Amount PaymentDate */}
        <div className="w-full pt-4 flex justify-center">
          <table className="text-center border-[1px] border-black w-full ">
            <tr className='w-full' >
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Type of Payment</th>
              <th className="text-center border-y-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Amount</th>
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Payment Date</th>
            </tr>
            <tr className='w-full' >
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] capitalize">{voucher?.top}</td>
              <td className="text-center border-b-[1px]  border-black h-[2rem] w-[13rem] ">{voucher?.total}</td>
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] ">{voucher?.dueDate}</td>
            </tr>
          </table>
        </div>

        {/* Project PropertyType Area */}
        <div className="w-full pt-4 flex justify-center">
          <table className="text-center border-[1px] border-black w-full ">
            <tr className='w-full' >
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Project</th>
              <th className="text-center border-y-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Property Type</th>
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] ">Area</th>
            </tr>
            <tr className='w-full' >
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] capitalize ">{voucher?.projectTitle}</td>
              <td className="text-center border-b-[1px] border-black h-[2rem] w-[13rem] capitalize ">{voucher?.propertyType}</td>
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] ">{voucher?.area}</td>
            </tr>
          </table>
        </div>

        {/* Project PropertyType Area */}
        <div className="w-full pt-4 flex justify-center">
          <table className="w-full ">
            <tr className='w-full flex justify-around ' >
              <th className="h-[2rem] w-[13rem] ">Total</th>
              <th className="h-[2rem] w-[13rem] ">Paying</th>
              <th className="h-[2rem] w-[13rem] ">Remaining</th>
            </tr>
            <tr className='w-full flex justify-around mt-[8px] ' >
              <td className="text-center border-[1px] border-black h-[2rem] min-w-[30%] max-w-[30%] ">{voucher?.total}</td>
              <td className="text-center border-[1px] border-black h-[2rem] min-w-[30%] max-w-[30%] ">{voucher?.paid}</td>
              <td className="text-center border-[1px] border-black h-[2rem] min-w-[30%] max-w-[30%] ">{voucher?.total - voucher?.paid}</td>
            </tr>
          </table>
        </div>

        
        <div className="flex justify-center pt-10">
          <img src={barcodeImage} />
        </div>
      </div>
      {/* <btton
        onClick={downloadPdf}
        className="bg-primary-red px-4 py-[1px] rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
        {loader ? <span>Downloading</span> : <span>Download</span>}
      </btton>u */}
    </div>
  );
};

export default VoucherPage;
