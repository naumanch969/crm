import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Add, Close } from '@mui/icons-material';
import { Path } from '../../../utils';
import { Chip, FormControl, Input, InputAdornment, Tooltip } from '@mui/material';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { FiFilter } from 'react-icons/fi';
import FilterDrawer from './Filter';

const Topbar = ({ isFiltered, setIsFiltered }) => {

  const [openFilters, setOpenFilters] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1];
  const pathArr = pathname.split('/').filter(item => item != '');
  const showAddButton = !pathArr.includes('create');

  const handleAddClick = () => {
    navigate(`${pathname}/create`);
  };

  const handleToggleFilters = () => {
    setOpenFilters((pre) => !pre);
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="sm:flex justify-between items-center flex-none">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">Refunds</h1>

        {showAddButton && (
          <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
            {
              isFiltered &&
              <Chip
                label="Filtered"
                onDelete={() => setIsFiltered(false)}
                deleteIcon={<Close />}
              />
            }
            <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
              <FormControl>
                <Input
                  name="search"
                  placeholder="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PiMagnifyingGlass className="text-[25px]" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <Tooltip title="Filter" arrow placement="top">
              <div
                onClick={handleToggleFilters}
                className={` p-2 rounded-md cursor-pointer ${openFilters
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <FiFilter className="text-[25px] " />
              </div>
            </Tooltip>
          </div>
        )}
      </div>
      <FilterDrawer open={openFilters} setOpen={setOpenFilters} setIsFiltered={setIsFiltered} />
    </div>
  );
};

export default Topbar;
