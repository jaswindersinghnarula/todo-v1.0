import React from "react";
import CheckBadge from "../icons/CheckBadge";
const Logo = () => {
    return (
        <div className="flex gap-1 text-gray-500 group">
            <CheckBadge className="transition duration-300 w-9 h-9 text-green-500 group-hover:text-green-700" />
            <h1 className="text-3xl font-bold flex gap-1 items-baseline">
                Todo
                <span className="text-sm font-thin">V1.0</span>
            </h1>
        </div>
    );
};

export default Logo;
