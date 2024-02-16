import React from "react";

const UpCursor = ({ active }) => {
    const color = !active ? "rgba(148, 163, 184, 1)" : "rgba(0, 118, 158, 1)";

    return (
        <svg
            className="mt-2 cursor-pointer transition-colors duration-300"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {active ? (
                <path
                    d="M1.12158 7.12109L7.12138 1.12129L13.1212 7.12109"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : (
                <path
                    d="M1.12158 1.12109L7.12138 7.12129L13.1212 1.12109"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
};

export default UpCursor;
