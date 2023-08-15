import React from 'react';
import { Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../../utils';

const Topbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1];
  const pathArr = pathname.split('/').filter(item => item !== '');
  const showAddButton = !pathArr.includes('create');

  const handleAddClick = () => {
    navigate(`${pathname}/create`);
  };

  return (
    <div className='flex flex-col '>
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className='flex justify-between items-center '>
        <h1 className='text-primary-blue text-[32px] capitalize'>{title}</h1>

        {showAddButton && (
          <button
            onClick={handleAddClick}
            className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg"
          >
            <Add />
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
