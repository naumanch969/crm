import React from "react";
import {
  Add,
  DeleteOutlined,
  EditOutlined,
  FilterTiltShift,
  MoreVert,
  MoveUpOutlined,
  SellOutlined,
  Upgrade,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledListbox = styled("ul")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};
    z-index: 1;
    `
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;

    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `
);

const Topbar = ({ leadId, isAppliedForRefund }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];


  return (
    <div className="flex flex-col ">
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className="flex justify-between items-center font-primary">
        <h1 className="text-primary-blue text-[32px] capitalize">{title}</h1>
        <Dropdown>
          <MenuButton className="bg-primary-red hover:bg-red-500 text-white w-[40px] h-[40px] flex justify-center items-center rounded-full shadow-lg">
            <MoreVert />
          </MenuButton>
          <Menu slots={{ listbox: StyledListbox }}>
            <StyledMenuItem>
              <EditOutlined /> Edit
            </StyledMenuItem>
            <StyledMenuItem>
              <DeleteOutlined /> Delete
            </StyledMenuItem>
            <StyledMenuItem>
              <Upgrade /> Status Update
            </StyledMenuItem>
            <StyledMenuItem>
              <FilterTiltShift /> Shift Lead
            </StyledMenuItem>
            <StyledMenuItem>
              <MoveUpOutlined /> Share Lead
            </StyledMenuItem>
            {
              isAppliedForRefund
                ?
                <StyledMenuItem>
                  <MoveUpOutlined /> Applied For Refund
                </StyledMenuItem>
                :
                <span onClick={() => navigate("/leads/refund", { state: { leadId } })}>
                  <StyledMenuItem>
                    <SellOutlined /> Apply for Refund
                  </StyledMenuItem>
                </span>
            }
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
