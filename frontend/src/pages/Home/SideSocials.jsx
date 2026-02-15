import React from "react";

function SideSocials(){
    return (
        <div className="fixed left-0 bottom-1/2 sm:right-1/2 flex flex-col sm:flex-row gap-5 text-xl text-light items-center sm:justify-center sm:static">
            <div className="w-[1px] h-20 sm:hidden bg-light opacity-50"></div>
            <a href="https://github.com/ProtoFaze" target="_blank" rel="noreferrer" className=" duration-200 hover:text-secondary">
                <i class="ri-github-line"></i>
            </a>
            <a href="https://www.linkedin.com/in/damon-n-460652115/" target="_blank" rel="noreferrer" className=" duration-200 hover:text-secondary">
                <i class="ri-linkedin-box-line"></i>
            </a>
            <div className="w-[1px] h-20 sm:hidden bg-light opacity-50"></div>
        </div>
    )
}

export default SideSocials;