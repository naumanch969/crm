import JsBarcode from "jsbarcode";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import CreateVoucher from "./CreateVoucher";
import jsPDF from "jspdf";

const VoucherPage = () => {
  const barcodeValue = "AD157491594D5";

  // Create a barcode canvas using JsBarcode
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, barcodeValue, {
    format: "CODE128", // You can choose a barcode format
    width: 2,
    height: 50,
  });

  // Convert the canvas to an image
  const barcodeImage = canvas.toDataURL("image/png");

  const [loader, setLoader] = useState(false);

  const downloadPdf = () => {
    const capture = document.querySelector(".completePdfPage");
    setLoader(true);
    html2canvas(capture)
      .then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const compenentWidth = pdf.internal.pageSize.getWidth();
        const compenentHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, compenentWidth, compenentHeight);
        pdf.save("download.pdf");
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="completePdfPage">
      <div className="w-full h-screen px-40 pt-10 bg-white">
        <div className="">
          <div className="flex justify-start"></div>
          <div className="flex justify-center text-3xl font-primary font-medium">
            Payments Reciept
          </div>
          <div className="flex justify-end">
            <table className="border-[2px] border-black">
              <tr className="border-b-2 border-black">
                <th className="border-r-2 border-black px-6 bg-[#dddddd]">Branch</th>
                <td className="px-12 ">demo</td>
              </tr>
              <tr>
                <th className="border-r-2 border-black bg-[#dddddd]">Dated</th>
                <td className="px-12">demo</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="pt-10 flex justify-center">
          <table className="border-2 border-black">
            <tr>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd]">Name</th>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd]">CNIC</th>
              <th className="border-b-2 border-black bg-[#dddddd]">Phone</th>
            </tr>
            <tr>
              <td className="border-b-2 border-black">demo</td>
              <td className="border-b-2 border-l-2 border-black">demo</td>
              <td className="border-b-2 border-l-2 border-black">demo</td>
            </tr>
            <tr>
              <td className="px-2" colSpan={3}>
                * If for some reason, the deal fails through, there is no penalty and the same
                amount will be returned to the buyer by the company.
              </td>
            </tr>
          </table>
        </div>
        <div className="pt-4 flex justify-center">
          <table className="border-2 border-black">
            <tr>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd] px-24">
                Type of Payment
              </th>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd] px-28">Amount</th>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd] px-28">
                Payment Date
              </th>
            </tr>
            <tr>
              <td className="border-b-2 border-black px-32">demo</td>
              <td className="border-b-2 border-l-2 border-black px-[120px]">demo</td>
              <td className="border-b-2 border-l-2 border-black px-[140px]">demo</td>
            </tr>
          </table>
        </div>
        <div className="pt-4 flex justify-center">
          <table className="border-2 border-black">
            <tr>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd] px-32">Project</th>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd] px-32">
                Property Type
              </th>
              <th className="border-b-2 border-r-2 border-black bg-[#dddddd] px-28">Area</th>
            </tr>
            <tr>
              <td className="border-b-2 border-black px-32">demo</td>
              <td className="border-b-2 border-l-2 border-black px-36">demo</td>
              <td className="border-b-2 border-l-2 border-black px-28">demo</td>
            </tr>
          </table>
        </div>
        <div className="flex justify-center pt-4 gap-[66px]">
          <div>
            <table>
              <tr>
                <th className="font-primary">Total Amount</th>
              </tr>
              <tr>
                <td className="border-2 border-black px-28">demo</td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tr>
                <th className="font-primary">Amount Paying</th>
              </tr>
              <tr>
                <td className="border-2 border-black px-28">demo</td>
              </tr>
            </table>
          </div>
          <div>
            <table>
              <tr>
                <th className="font-primary">Remaining Amount</th>
              </tr>
              <tr>
                <td className="border-2 border-black px-28">demo</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <img src={barcodeImage} />
        </div>
      </div>
      <button
        onClick={downloadPdf}
        className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
        {loader ? <span>Downloading</span> : <span>Download</span>}
      </button>
    </div>
  );
};

export default VoucherPage;
