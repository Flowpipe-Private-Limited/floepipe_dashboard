import React, { useState, useRef, createRef, useEffect } from 'react';
import FlowpipeLogo from '../../../assets/images/FlowpipeLogo.png';
import { useUserStore } from '../../../Store/userStore';
import { VerifyIPIN } from '../../../utils/Apis/api';
import { EncryptedApirequestHandler } from '../../../utils/Apis/apiRequestHandler';
import { toTitleCase } from '../../../utils/simpleHellperFn';
import './IpinVerify.css';


// ⚛️ Updated Flowpipe Unlock Modal Component
const FlowpipeUnlockModal = ({ onClose, isVisible, IsValidPIN }) => {
    const { users, setIsLocked } = useUserStore();

    const [pin, setPin] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputRefs = useRef(pin.map(() => createRef()));
    const unlockButtonRef = useRef(null);
    const modalRef = useRef(null);

    const isPinComplete = pin.every(digit => digit.length === 1);
    const userName = toTitleCase(users?.name) || 'User';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (isVisible && onClose) {
                    onClose();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

    useEffect(() => {
        if (isVisible) {
            setPin(['', '', '', '']);
            setErrorMessage('');
            // Focus first input on open
            if (inputRefs.current[0]?.current) {
                setTimeout(() => inputRefs.current[0].current.focus(), 100);
            }
        }
    }, [isVisible]);


    const handlePinChange = (index, value) => {
        setErrorMessage('');

        // Take the last character entered to allow overwriting
        const digit = value.replace(/[^0-9]/g, '').slice(-1);

        const newPin = [...pin];
        newPin[index] = digit;
        setPin(newPin);

        // Move focus forward if a digit was entered
        if (digit) {
            if (index < 3 && inputRefs.current[index + 1]?.current) {
                inputRefs.current[index + 1].current.focus();
            } else if (index === 3 && unlockButtonRef.current) {
                unlockButtonRef.current.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!pin[index] && index > 0 && inputRefs.current[index - 1]?.current) {
                // If current is empty, move back
                inputRefs.current[index - 1].current.focus();
            }
        } else if (e.key === 'ArrowLeft') {
            if (index > 0 && inputRefs.current[index - 1]?.current) {
                inputRefs.current[index - 1].current.focus();
            }
        } else if (e.key === 'ArrowRight') {
            if (index < 3 && inputRefs.current[index + 1]?.current) {
                inputRefs.current[index + 1].current.focus();
            }
        } else if (e.key === 'Enter') {
            handleUnlock();
        }
    };


    const handleUnlock = async () => {
        if (!isPinComplete || isLoading) {
            setErrorMessage("Please enter the complete 4-digit Flowpipe iPIN.");
            return;
        }

        const fullPin = pin.join('');
        setErrorMessage('');
        setIsLoading(true);

        try {
            await EncryptedApirequestHandler(
                async () => await VerifyIPIN({ IPIN: fullPin }),
                null,
                (res) => {
                    if (res?.success) {
                        // Successful unlock: Hide the modal, clear store lock, and continue flow
                        setIsLocked(false);
                        if (onClose) onClose();
                        if (IsValidPIN) IsValidPIN(true);
                    } else {
                        setErrorMessage(res?.message || "Invalid iPIN. Please try again.");
                        setPin(['', '', '', '']);
                        if (inputRefs.current[0]?.current) {
                            inputRefs.current[0].current.focus();
                        }
                    }
                },
                (errMessage) => {
                    setErrorMessage(errMessage || "An error occurred during verification.");
                }
            );
        } catch (error) {
            console.error("PIN verification failed:", error);
            setErrorMessage("An error occurred during verification. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handler for the "Unlock using OTP" button
    const handlePasswordUnlock = () => {
        console.log("Switching to OTP Unlock mode...");
        // TODO: Implement logic to switch to an OTP input form
    };

    if (!isVisible) return null; // Only render if isVisible is true

    return (
        // Modal Overlay
        <div className="ipin-overlay">

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="ipin-modal"
            >

                {/* Close Button (X) */}
                <button
                    onClick={onClose}
                    className="ipin-close-btn"
                    aria-label="Close modal"
                >
                    <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Logo and Greeting */}
                <div className="ipin-header">
                    <div className="ipin-logo-container">
                        <img src={FlowpipeLogo} alt="Flowpipe Logo" className="ipin-logo" />
                    </div>
                    <h3 className="ipin-greeting">
                        Hey {userName}!
                    </h3>
                    <p className="ipin-subtext">
                        Your screen was locked because of inactivity<br />To protect your account.
                    </p>
                </div>

                {/* PIN Input Section */}
                <div className="ipin-input-section">
                    <p className="ipin-instruction">
                        Enter Flowpipe iPIN
                    </p>
                    <div className="ipin-inputs">
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                type="password"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handlePinChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={inputRefs.current[index]}
                                disabled={isLoading}
                                className={`ipin-digit-input ${errorMessage ? 'error' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Error Message Display */}
                {errorMessage && (
                    <p className="ipin-error-msg">{errorMessage}</p>
                )}

                {/* Unlock Button */}
                <button
                    ref={unlockButtonRef}
                    onClick={handleUnlock}
                    disabled={!isPinComplete || isLoading}
                    className={`ipin-unlock-btn ${!isPinComplete || isLoading ? '' : 'active'}`}
                >
                    {isLoading ? (
                        <svg className="spinner-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        'Unlock'
                    )}
                </button>

                {/* Separator and OTP Option */}
                <div className="ipin-separator">
                    <hr className="separator-line" />
                    <span className="separator-text">OR</span>
                    <hr className="separator-line" />
                </div>

                <button
                    onClick={handlePasswordUnlock}
                    className="ipin-otp-btn"
                    disabled={isLoading}
                >
                    Unlock using OTP
                </button>

            </div>
        </div>
    );
};

export default FlowpipeUnlockModal;
