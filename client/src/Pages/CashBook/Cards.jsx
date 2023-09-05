import { CreditCard } from "@mui/icons-material";
import { Box, Card, CardContent } from "@mui/material";
import React from "react";

const Cards = () => {
  return (
    <div>
      <Box className="w-auto md:columns-4 font-primary">
        
        <Card className="bg-white border-b-[3px] border-b-emerald-300 pb-5 md:mt-0 mt-2">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl">$200.00</p>
              <p className="text-md text-slate-500 text-opacity-70">Payments - Today</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-[3px] border-b-sky-400 pb-5 md:mt-0 mt-4">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl">$1500.00</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - This Month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-[3px] border-b-amber-400 pb-5 md:mt-0 mt-4">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl">$23000.00</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - This Year
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-[3px] border-b-red-400 pb-5 md:mt-0 mt-4">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl">$1500.00</p>
              <p className="text-md text-slate-500 text-opacity-70">
                Payments - Total
              </p>
            </div>
          </CardContent>
        </Card>

      </Box>
    </div>
  );
};

export default Cards;
