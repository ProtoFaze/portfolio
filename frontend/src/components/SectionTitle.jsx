import React from "react";

function SectionTitle({title, textColor="secondary", lineColor="light"}) {
    return (
        <div className="flex gap-10 items-center">
            <h1 className={`text-2xl text-${textColor} `}>{title}</h1>
            <div className={`w-60 h-[1px] bg-${lineColor}`}></div>
        </div>
    )

}
export default SectionTitle