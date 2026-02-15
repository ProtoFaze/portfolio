import React from "react";

function Loader() {
    return (
        <div className="flex justify-center z-20  items-center h-screen fixed inset-0 bg-primary">
            <img className="h-64 w-auto animate-spin-delay" src='/logo.svg' alt="spinning logo"/>
        </div>
    )
}

export default Loader;