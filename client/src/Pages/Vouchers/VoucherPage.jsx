import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";
import CreateVoucher from "./CreateVoucher";
import QRCode from 'qrcode.react'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";

const VoucherPage = ({ }) => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////
  const { state } = useLocation()
  const voucher = state?.voucher
  const navigate = useNavigate()
  const pdfRef = useRef()

  useEffect(() => {
    const downloadPdf = () => {
      const capture = document.querySelector(".completePdfPage");
      html2canvas(capture)
        .then((canvas) => {
          const imgData = canvas.toDataURL("img/png");
          const pdf = new jsPDF("p", "mm", "a2", true);
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
      <div className="w-[51rem] h-full pt-10 bg-white">



        <div className="flex justify-between items w-full relative py-[1rem] ">
        <div className="flex justify-start">
          <img src="/images/adotmarketinglogo.png" className="h-20 mb-5" />
        </div>
          <div className=" ">
            <table className="border-[1px] border-black w-full " >
              <tr className="text-center border-[1px] border-black">
                <th className="border-r-[1px] border-[1px] border-black px-6 bg-[#dddddd] pb-4">Voucher No.</th>
                <td className="px-12 border-[1px] border-black capitalize pb-4">{voucher?.uid}</td>
              </tr>
              <tr className='w-full' >
                <th className="border-[1px] border-black bg-[#dddddd] pb-4">Dated</th>
                <td className="px-12 pb-4 border-[1px] border-black">{voucher?.issuingDate}</td>
              </tr>
            </table>
          </div>
        </div>

        {/* name, cnic, phone */}
        <div className="w-full flex justify-center">
          <table className="text-center border-[1px] border-black w-full ">
            <tr className='w-full' >
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Name</th>
              <th className="text-center border-y-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">CNIC</th>
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Phone</th>
            </tr>
            <tr className='w-full' >
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] capitalize pb-4">{voucher?.clientName}</td>
              <td className="text-center border-b-[1px] border-black h-[2rem] w-[13rem] pb-4">{voucher?.CNIC}</td>
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] pb-4">{voucher?.phone}</td>
            </tr>
            <tr className='w-full' >
              <td className="px-[1px] border-b-[1px] border-x-[1px] border-black h-[2rem] pb-4 text-red-700"  colSpan={3}>
                * {voucher?.note}
              </td>
            </tr>
          </table>
        </div>

        {/* TOP Amount PaymentDate */}
        <div className="w-full pt-4 flex justify-center">
          <table className="text-center border-[1px] border-black w-full ">
            <tr className='w-full' >
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Type of Payment</th>
              <th className="text-center border-y-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Country</th>
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Payment Date</th>
            </tr>
            <tr className='w-full' >
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] capitalize pb-4">{voucher?.type}</td>
              <td className="text-center border-b-[1px]  border-black h-[2rem] w-[13rem] pb-4">{voucher?.country}</td>
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] pb-4">{voucher?.dueDate}</td>
            </tr>
          </table>
        </div>

        {/* Project PropertyType Area */}
        <div className="w-full pt-4 flex justify-center">
          <table className="text-center border-[1px] border-black w-full ">
            <tr className='w-full' >
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Degree</th>
              <th className="text-center border-y-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Major</th>
              <th className="text-center border-y-[1px] border-x-[1px] border-black bg-[#dddddd] h-[2rem] w-[13rem] pb-4">Visa</th>
            </tr>
            <tr className='w-full' >
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] capitalize pb-4">{voucher?.degree == 'other' ? <div>{voucher?.degreeName}</div> : <div>{voucher.degree}</div>}</td>
              <td className="text-center border-b-[1px] border-black h-[2rem] w-[13rem] capitalize pb-4">{voucher?.major}</td>
              <td className="text-center border-b-[1px] border-x-[1px] border-black h-[2rem] w-[13rem] pb-4">{voucher?.visa == 'studentVisa' ? <div>Student Visa</div> : voucher?.visa == "visitVisa" ? <div>Visit Visa</div> : voucher?.visa == 'workVisa' ? <div>Work Visa</div> : voucher?.visa}</td>
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
              <td className="text-center border-[1px] border-black h-[2rem] min-w-[30%] max-w-[30%] pb-4">{voucher?.total}</td>
              <td className="text-center border-[1px] border-black h-[2rem] min-w-[30%] max-w-[30%] pb-4">{voucher?.paid}</td>
              <td className="text-center border-[1px] border-black h-[2rem] min-w-[30%] max-w-[30%] pb-4">{voucher?.remained}</td>
            </tr>
          </table>
        </div>

        <div className="flex justify-center pt-10">
          <QRCode value={`Name: ${voucher.clientName}\nPhone: ${voucher.phone}\nCNIC: ${voucher.CNIC}\nAmount Paid: ${voucher.paid}\nPurpose: This person has applied for the degree of ${voucher.degree == 'other' ? voucher.degreeName : voucher.degree} with major as ${voucher.major} on ${voucher.visa} in ${voucher.country}.`} size={128} />
        </div>
        
        <div className="flex justify-center flex-col py-2">
          <p className="text-center">&copy; Right Reserverd by A. Consultant</p>
          <p className="text-center">2nd Floor, Plaza 6-A, Vilas Road, Main Boulevard, Park View City, Lahore</p>
        </div>
      </div>

    </div>
  );
};

export default VoucherPage;
