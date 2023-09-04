import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../utils';
import { Add } from '@mui/icons-material';
import CreateSale from './CreateSale'
import { FormControl, Input, InputAdornment, Tooltip } from '@mui/material';
import { FiFilter } from 'react-icons/fi';
import { PiMagnifyingGlass } from 'react-icons/pi';
import FilterDrawer from './Filter';
 
const Topbar = ({ view, setView }) => {

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] =useState("paper");
  const [openFilters, setOpenFilters] = useState(false);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1];
  const pathArr = pathname.split('/').filter(item => item !== '');
  const showAddButton = !pathArr.includes('create');
  const descriptionElementRef = React.useRef(null);

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleToggleFilters = () => {
    setOpenFilters((pre) => !pre);
  };

  return (
    <div className='flex flex-col pb-6'>
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className='flex justify-between items-center '>
        <h1 className='text-primary-blue text-[32px] capitalize'>{title}</h1>

        {showAddButton && (
          <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
          <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
            <FormControl>
              <Input
                name="search"
                placeholder="Search Sales"
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
              className={` p-2 rounded-md cursor-pointer ${
                openFilters
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
              }`}>
              <FiFilter className="text-[25px] " />
            </div>
          </Tooltip>
          <div>
            <Tooltip title="Add New Lead" placement="top" arrow>
              <div onClick={handleCreateopen("body")}>
                <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
              </div>
            </Tooltip>
          </div>
        </div>
        )}
      </div>
      <CreateSale scroll={scroll} open={open} setOpen={setOpen} />
      <FilterDrawer open={openFilters} setOpen={setOpenFilters} />
    </div>
  );
};

export default Topbar;
