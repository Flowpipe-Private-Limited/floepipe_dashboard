import React, { useState, useRef, createRef, useEffect } from 'react';
import FlowpipeLogo from '../../../assets/images/FlowpipeLogo.png';
import { HandleVerifyIPIN } from '../../../common/apiCalls/CommonApiCall';
import { toTitleCase } from '../../../utils/simpleHellperFn';
import { useUserStore } from '../../../Store/userStore';


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
            const isValidPin = fullPin === '1526' ;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm">
            
            {/* Modal Container */}
            <div 
                ref={modalRef} 
                className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative"
            >
                
                {/* Close Button (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Logo and Greeting */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden">
                        <img src={FlowpipeLogo} alt="Flowpipe Logo" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        Hey {userName}!
                    </h3>
                    <p className="text-sm text-gray-500">
                        Your screen was locked because of inactivity<br/>To protect your account.
                    </p>
                </div>
                
                {/* PIN Input Section */}
                <div className="mb-4">
                    <p className="text-center text-sm text-gray-600 mb-3">
                        Enter Flowpipe iPIN
                    </p>
                    <div className="flex justify-center space-x-3">
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
                                className={`w-12 h-14 text-center text-2xl font-bold border rounded-lg transition duration-150
                                    ${errorMessage ? 'border-red-500' : 'border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600'}`
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Error Message Display */}
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center mb-6">{errorMessage}</p>
                )}
                
                {/* Unlock Button */}
                <button
                    onClick={handleUnlock}
                    disabled={!isPinComplete || isLoading}
                    className={`w-full py-3 rounded-lg text-white font-medium transition duration-200 flex items-center justify-center
                        ${!isPinComplete || isLoading
                            ? 'bg-purple-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        'Unlock'
                    )}
                </button>
                
                {/* Separator and OTP Option */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-xs text-gray-500 font-medium">OR</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
                
                <button
                    onClick={handlePasswordUnlock}
                    className="w-full py-3 text-gray-700 font-medium hover:text-purple-600 transition duration-150"
                    disabled={isLoading}
                >
                    Unlock using OTP
                </button>
                
            </div>
        </div>
    );
};

export default FlowpipeUnlockModal;