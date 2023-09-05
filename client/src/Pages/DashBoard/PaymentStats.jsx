import { CreditCard } from "@mui/icons-material";
import { Box, Card, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPayments } from "../../redux/action/cashbook";
import { CiCreditCard1 } from "react-icons/ci";

const Stats = () => {
  const { payments } = useSelector((state) => state.cashbook);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  return (
    <Box className="w-auto md:columns-3">
      <Link to="/cashbook">
        <div className="bg-white border-b-[3px] border-b-emerald-300 md:mt-0 mt-4 shadow-none rounded-md">
          <CardContent className="flex-grow-[1] flex justify-between items-center font-primary">
            <div>
              <p className="text-2xl text-[#455a64]">${payments?.todayReceived}</p>
              <p className="text-md text-slate-500 text-opacity-70">Payments - Today</p>
            </div>
            <div className="flex justify-end">
              <CiCreditCard1 className="text-emerald-300 text-[50px]" />
            </div>
          </CardContent>
        </div>
      </Link>

      <Link to="/cashbook">
        <div className="bg-white border-b-[3px] border-b-sky-400 md:mt-0 mt-4 shadow-none rounded-md">
          <CardContent className="flex-grow-[1] flex justify-between items-center font-primary">
            <div>
              <p className="text-2xl text-[#455a64]">${payments?.thisMonthReceived}</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - This Month
              </p>
            </div>
            <div className="flex justify-end">
              <CiCreditCard1 className="text-sky-400 text-[50px]" />
            </div>
          </CardContent>
        </div>
      </Link>

      <Link to="/cashbook">
        <div className="bg-white border-b-[3px] border-b-amber-400 md:mt-0 mt-4 shadow-none rounded-md">
          <CardContent className="flex-grow-[1] flex justify-between items-center font-primary">
            <div>
              <p className="text-2xl text-[#455a64]">${payments?.thisYearReceived}</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - This Year
              </p>
            </div>
            <div className="flex justify-end">
            <CiCreditCard1 className="text-amber-400 text-[50px]" />
            </div>
          </CardContent>
        </div>
      </Link>
    </Box>
  );
};

export default Stats;
