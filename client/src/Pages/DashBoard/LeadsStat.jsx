import { Box, Chip } from "@mui/material";
import React, { useEffect } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getLeadsStat } from "../../redux/action/lead";

const Leads = () => {
  const dispatch = useDispatch();
  const { stats: leadsStat } = useSelector((state) => state.lead);
  const COLORS = ["#24d2b5", "#ff9041", "#cddc39", "#ff5c6c", "#20aee3"];

  useEffect(() => {
    dispatch(getLeadsStat());
  }, []);

  return (
    <Box className="bg-white flex flex-col items-center h-96 rounded-lg p-6 mt-5 float-left ml-0 lg:w-auto w-full lg:ml-5 md:mt-0">
      <div className="w-full flex flex-col items-center  text-xl font-light text-gray-600">
        Leads This Year
        <PieChart className="flex justify-center" width={450} height={240}>
          <Pie
            data={leadsStat}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value">
            {leadsStat.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 w-full justify-center">
            <div className="bg-[#ff5c6c] font-semibold px-[10px] py-[5px] rounded-full capitalize text-white text-xs">
              Declined
            </div>

            <div className="bg-[#20aee3] font-semibold px-[8px] py-[4px] rounded-full capitalize text-white text-xs">
              Remaining
            </div>

            <div className="bg-[#ff9041] font-semibold px-[8px] py-[4px] rounded-full capitalize text-white text-xs">
              Unsuccessful
            </div>
          </div>
          <div className="flex items-center gap-2 w-full justify-center">
            <div className="bg-[#cddc39] font-semibold px-[8px] py-[4px] rounded-full capitalize text-white text-xs">
              Under Process
            </div>

            <div className="bg-[#24d2b5] font-semibold px-[8px] py-[4px] rounded-full capitalize text-white text-xs">
              Successful
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Leads;
