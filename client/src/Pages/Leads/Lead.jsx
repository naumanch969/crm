import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../redux/action/lead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Dialog, DialogContent, DialogTitle, Slide, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loader } from "../../utils";
import moment from "moment";
import FollowUps from "./FollowUps/FollowUps";
import Ledger from "./Ledger/Ledger";

const Lead = () => {
  //////////////////////////////////// States ////////////////////////////////////////

  //////////////////////////////////// Variables /////////////////////////////////////
  const { leadId } = useParams();
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const date = moment(currentLead?.createdAt).format("DD-MM-YYYY");

  //////////////////////////////////// UseEffects /////////////////////////////////////
  useEffect(() => {
    dispatch(getLead(leadId));
  }, [leadId]);

  //////////////////////////////////// Functions /////////////////////////////////////

  return (
    <div className="w-full font-primary">
      <h1 className="text-primary-blue text-[32px] capitalize font-light">Lead Details</h1>

      {isFetching && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      )}

      {!isFetching && (

        <div className="bg-white rounded-lg w-full p-4 my-4">
          <div>
            <div className="text-[20px] text-primary-red">Client Details</div>
            <div className="my-2">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Name</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Phone</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>CNIC</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>City</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.clientName} arrow>{currentLead?.clientName}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.clientPhone} arrow>{currentLead?.clientPhone}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.client?.CNIC} arrow>{currentLead?.client?.CNIC}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.client?.city} arrow>{currentLead?.client?.city}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.client?.email} arrow>{currentLead?.client?.email}</Tooltip></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <div>
            <div className="text-[20px] text-primary-red mt-10">Lead Details</div>
            <div className="my-2">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Client Name</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Client Phone</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Property</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>City</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Created</TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: 'rgb(32 174 227)', fontSize: '16px' }}>Allocated To</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.clientName} arrow>{currentLead?.clientName}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.clientPhone} arrow>{currentLead?.clientPhone}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={currentLead?.property?.title} arrow>{currentLead?.property?.title}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip className="capitalize" title={currentLead?.city} arrow>{currentLead?.city}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}><Tooltip title={date} arrow>{date}</Tooltip></TableCell>
                      <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {
                        currentLead?.allocatedTo?.length > 1 ? (
                          currentLead?.allocatedTo?.map((item, key) => (
                            <Tooltip className="capitalize flex gap-2" key={key} title={`• ${item?.firstName}`} arrow>• {item?.firstName}</Tooltip>
                          ))
                        ) : (
                          currentLead?.allocatedTo?.map((item, key) => (
                            <Tooltip className="capitalize flex gap-2" key={key} title={item?.firstName} arrow>{item?.firstName}</Tooltip>
                          ))
                        )
                      }
                    </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 bg-white w-full">
        <FollowUps />
      </div>

      <div className="p-4 mt-4 bg-white w-full">
        <Ledger />
      </div>

    </div>
  );
};

export default Lead;
