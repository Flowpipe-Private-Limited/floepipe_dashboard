import React, { useState, useRef, createRef, useEffect } from 'react';
import FlowpipeLogo from '../../../assets/images/FlowpipeLogo.png';
import { HandleVerifyIPIN } from '../../../common/apiCalls/CommonApiCall';
import { toTitleCase } from '../../../utils/simpleHellperFn';
import { useUserStore } from '../../../Store/userStore';
import './IpinVerify.css';


// ⚛️ Updated Flowpipe Unlock Modal Component
const FlowpipeUnlockModal = ({ onClose, isVisible, IsValidPIN }) => {
    const { users } = useUserStore();

    const [pin, setPin] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputRefs = useRef(pin.map(() => createRef()));
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
        }
    }, [isVisible]);


    const handlePinChange = (index, value) => {
        setErrorMessage('');

        const digit = value.replace(/[^0-9]/g, '').slice(0, 1);

        const newPin = [...pin];
        newPin[index] = digit;
        setPin(newPin);

        if (digit && index < 3 && inputRefs.current[index + 1]?.current) {
            inputRefs.current[index + 1].current.focus();
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
            // const isValidPin = await HandleVerifyIPIN(fullPin);
            const isValidPin = fullPin === '1526';

            if (isValidPin) {
                // Successful unlock: Hide the modal and continue the flow
                if (onClose) {
                    onClose();
                    IsValidPIN(isValidPin);
                }
            } else {
                // Invalid PIN: Show error message
                setErrorMessage("Invalid iPIN. Please try again.");
                setPin(['', '', '', '']); // Clear PIN inputs
                if (inputRefs.current[0]?.current) {
                    inputRefs.current[0].current.focus(); // Focus on the first input
                }
            }
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
                                onKeyDown={(e) => {
                                    // Backspace logic to move backward
                                    if (e.key === 'Backspace' && !pin[index] && index > 0 && inputRefs.current[index - 1]?.current) {
                                        inputRefs.current[index - 1].current.focus();
                                    }
                                }}
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
