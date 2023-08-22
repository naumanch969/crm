import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const View = ({ open, setOpen }) => {

    
    return (
        <Dialog className="z-[1000]" open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <DialogTitle className="border-b-2 border-b-black flex justify-center">
                    Voucher Details
                </DialogTitle>
                <DialogContentText id="alert-dialog-description" className="p-10">
                    <div className="font-bold">
                        Voucher Number: <span className="font-thin ml-[30px]">000000</span>
                    </div>
                    <div className="font-bold">
                        Issue date: <span className="font-thin ml-20">00/00/0000</span>
                    </div>
                    <div className="font-bold">
                        Customer Name: <span className="font-thin ml-[35px]">###########</span>
                    </div>
                    <div className="font-bold">
                        Customer CNIC: <span className="font-thin ml-[38px]">00000-00000000-0</span>
                    </div>
                    <div className="font-bold">
                        Payment Type: <span className="font-thin ml-[50px]">######</span>
                    </div>
                    <div className="font-bold">
                        Amount In: <span className="font-thin ml-[78px]">0000000</span>
                    </div>
                    <div className="font-bold">
                        Amount Remaining: <span className="font-thin ml-[9px]">0000000</span>
                    </div>
                    <div className="font-bold">
                        Status: <span className="font-thin ml-[108px]">##########</span>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default View