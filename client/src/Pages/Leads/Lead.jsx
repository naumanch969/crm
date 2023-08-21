import React, { useEffect } from "react";
import LeadTopbar from "./LeadTopBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../redux/action/lead";
import { format } from "timeago.js";

const Lead = () => {

    const dispatch = useDispatch()
    const { leadId } = useParams()
    const { currentLead, isFetching, error } = useSelector(state => state.lead)
    const { city, propertyType, homeType, region, minArea, minAreaUnit, maxArea, maxAreaUnit, minBudget, minBudgetUnit, maxBudget, maxBudgetUnit, priority, clientType, beds, source, createdAt, allocatedTo, status, isAppliedForRefund } = currentLead
    const { firstName, lastName, gender, email, phone, cnic } = currentLead?.clientId

    useEffect(() => {
        dispatch(getLead(leadId))
    }, [leadId])

    return (
        <div className='h-full w-full'>
            <LeadTopbar leadId={leadId} isAppliedForRefund={isAppliedForRefund} />

            <div className="bg-white rounded-lg shadow-md h-screen w-full mt-5">

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10 columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">FirstName</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">LastName</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Gender</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{firstName}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{lastName}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{gender}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">CNIC</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Phone</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Email</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{cnic}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{phone}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{email}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">City</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Location Area</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Property Type</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{city}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{region}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{propertyType}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Home Type</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Min Area</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Max Area</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{homeType}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{minArea} {minAreaUnit}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{maxArea} {maxAreaUnit}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Min Budget</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Max Budget</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Lead Priority</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{minBudget} {minBudgetUnit}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{maxBudget} {maxBudgetUnit}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{priority}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Client Type</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Beds</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Source</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{clientType}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{beds}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{source[0]}</div>
                </div>

                {/* Field Heading */}
                <div className="pl-10 pr-10 pt-10  columns-3">
                    <div className="text-xl font-Mulish text-gray-600 flex justify-start">Submitted</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-center">Allocated to</div>
                    <div className="text-xl font-Mulish text-gray-600 flex justify-end">Status</div>
                </div>

                {/* Field Data */}
                <div className="pl-10 pr-10 columns-3">
                    <div className="text-lg font-extralight text-gray-600 flex justify-start">{format(createdAt)}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-center">{allocatedTo?.email}</div>
                    <div className="text-lg font-extralight text-gray-600 flex justify-end">{status}</div>
                </div>

            </div>

        </div>
    );
};

export default Lead