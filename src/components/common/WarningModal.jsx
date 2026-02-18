import React from 'react';

const WarningModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Warning: Regenerate Key</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to regenerate your keys? <br />
                    <strong>Your old keys will stop working immediately.</strong>
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Regenerate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;
