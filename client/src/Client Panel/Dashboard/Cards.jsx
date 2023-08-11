import React from 'react'
import { HomeRounded } from "@mui/icons-material";
import { Box, Card, CardContent } from "@mui/material";

const Cards = () => {
  return (
    <div>
        <Box className="w-full columns-3 pt-24 pr-24 pl-24 pb-10">
        <Card className="bg-white border-b-4 border-b-emerald-300">
          <CardContent className="flex-grow-[1] flex justify-between items-center">
            <div>
              <p className="text-2xl font-Mulish">5</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                Projects Sold - Today
              </p>
            </div>
            <div className="flex justify-end items-center">
              <HomeRounded sx={{ fontSize: "50px" }} className="text-emerald-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-4 border-b-sky-400">
          <CardContent className="flex-grow-[1] flex justify-between items-center">
            <div>
              <p className="text-2xl font-Mulish">19</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                Projects Sold - This Month
              </p>
            </div>
            <div className="flex justify-end items-center">
              <HomeRounded sx={{ fontSize: "50px" }} className="text-sky-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-b-4 border-b-amber-400">
          <CardContent className="flex-grow-[1] flex justify-between items-center">
            <div>
              <p className="text-2xl font-Mulish">124</p>
              <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                Projects Sold - This Year
              </p>
            </div>
            <div className="flex justify-end items-center">
              <HomeRounded sx={{ fontSize: "50px" }} className="text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default Cards