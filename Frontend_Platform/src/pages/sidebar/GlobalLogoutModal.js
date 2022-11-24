import React from "react";
import ReactDom from "react-dom";

/**
 * Uses createPortal to render Modal at top level in index.html
 * Accepted props:
 * @param {boolean} open
 * @param {eventHandler} onClose
 * @param {eventHandler} event
 * @param {string} message
 */
const Modal = ({ open, onClose, event, message }) => {
    if (!open) return null;
    return ReactDom.createPortal(
        <div className="flex justify-center items-center bg-gray-300/50 h-screen w-screen absolute top-0 left-0 z-10">
            <div className="flex justify-center items-center bg-white h-36 w-80 rounded shadow-lg relative">
                <div className="p-3">
                    <div className="absolute right-3 top-3">
                        <button className="w-6" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col items-center ">
                        <div className="font-mukta mt-5 mb-3">{message}</div>
                        {event ? (
                            <button
                                onClick={event}
                                className="font-mukta bg-red-500"
                            >
                                Logout
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default Modal;
