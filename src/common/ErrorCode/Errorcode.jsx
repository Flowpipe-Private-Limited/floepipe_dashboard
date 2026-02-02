
import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    overflow: "auto",
    height: "480px",
};
const ErrorCode = ({ open, onClose }) => {
    return (
        <Modal
            style={{ fontFamily: "SF Pro Display" }}
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <div className="card" style={{fontFamily: "JetBrainsMono"}}>
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center px-3 ">
                            <div className="fs-3">Error Code</div> <button className="btn btn-close " onClick={onClose}></button>
                        </div>
                    </div>
                    <div className="card-body fs-4 pb-4">
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>200 - </b> <span>Success</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>400 - </b> <span>Invalid Data: More or less than 10 characters</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>400 - </b> <span>Invalid Data: Special characters</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>401 - </b> <span>Invalid Client Id and Secret Key</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>402 - </b> <span>Credits Not Available</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>403 - </b> <span>Forbidden: Including Any Known or Unknown Error Code</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>404 - </b> <span>Data Not Found</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>500 - </b> <span>Internal Server Error</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>501 - </b> <span>Not Implemented</span>
                        </div>
                        <div style={{borderBottom:'1px solid black'}}>
                            <b>503 - </b> <span>Internal Service Error</span>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};
ErrorCode.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default ErrorCode;
