import { CreditCard } from "@mui/icons-material";
import { Box, Card, CardContent } from "@mui/material";
import React from "react";

const Cards = () => {
  return (
    <div>
      <Box className="w-auto columns-4">
        
        <Card className="bg-white border-b-4 border-b-emerald-300 pb-5">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl font-Mulish">$200.00</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">Payments - Today</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-4 border-b-sky-400 pb-5">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl font-Mulish">$1500.00</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                Payments - This Month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-4 border-b-amber-400 pb-5">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl font-Mulish">$23000.00</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                Payments - This Year
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-4 border-b-sky-400 pb-5">
          <CardContent>
            <div className="float-left">
              <p className="text-2xl font-Mulish">$1500.00</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                Payments - This Month
              </p>
            </div>
          </CardContent>
        </Card>

      </Box>
    </div>
  );
};

export default Cards;
