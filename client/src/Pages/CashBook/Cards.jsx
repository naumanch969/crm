import { CreditCard } from "@mui/icons-material";
import { Box, Card, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../redux/action/cashbook";
import { CiCreditCard1 } from "react-icons/ci";

const Cards = () => {

  const { payments } = useSelector((state) => state.cashbook);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  return (
    <div>
      <Box className="w-auto md:columns-3 font-primary">
        
        <Card className="bg-white border-b-[3px] border-b-emerald-300 md:mt-0 mt-2">
          <CardContent className="flex justify-between items-center">
            <div className="float-left">
              <p className="text-2xl text-slate-600">${payments?.todayReceived}</p>
              <p className="text-md text-slate-500 text-opacity-70">Payments - Today</p>
            </div>
            <div>
            <CiCreditCard1 className="text-emerald-300 text-[50px]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-[3px] border-b-sky-400 md:mt-0 mt-4">
          <CardContent className="flex justify-between items-center">
            <div className="float-left">
              <p className="text-2xl text-slate-600">${payments?.thisMonthReceived}</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - This Month
              </p>
            </div>
            <div>
            <CiCreditCard1 className="text-sky-400 text-[50px]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-[3px] border-b-amber-400 md:mt-0 mt-4">
          <CardContent className="flex justify-between items-center">
            <div className="float-left">
              <p className="text-2xl text-slate-600">${payments?.thisYearReceived}</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - This Year
              </p>
            </div>
            <div>
            <CiCreditCard1 className="text-amber-400 text-[50px]" />
            </div>
          </CardContent>
        </Card>

      </Box>
    </div>
  );
};

export default Cards;
