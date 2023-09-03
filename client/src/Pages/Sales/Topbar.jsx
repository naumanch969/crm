import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../utils';
import { Add } from '@mui/icons-material';
import CreateSale from './CreateSale'
 
const Topbar = ({ view, setView }) => {

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");

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

  return (
    <div className='flex flex-col pb-6'>
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className='flex justify-between items-center '>
        <h1 className='text-primary-blue text-[32px] capitalize'>{title}</h1>

        {showAddButton && (
          <button
          onClick={handleCreateopen("body")}
            className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg"
          >
            <Add />
          </button>
        )}
      </div>
      <CreateSale scroll={scroll} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
