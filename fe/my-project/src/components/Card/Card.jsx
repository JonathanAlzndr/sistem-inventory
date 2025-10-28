import React from "react";
import { BsFillBoxFill } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { BsExclamationLg } from "react-icons/bs";

const dataDummy = [
  {
    title: "Total Stok Beras",
    Value: 43,
    colorbg:" bg-[#1F91F5]/10",
    bgicon:"bg-[#1F91F5]",
    icon: <BsFillBoxFill className="text-4xl p-1 text-white" />,

  },
  {
    title: "Total Stok Masuk",
    Value: 43,
    colorbg:" bg-[#36DC72]/10",
    bgicon:"bg-[#29DB6A]",
    icon: <FaArrowDown className="text-4xl p-1 text-white" />,

  },
  {
    title: "Total Stok Keluar",
    Value: 43,
    colorbg:" bg-[#FE4524]/10",
    bgicon:"bg-[#FE4524]",
    icon: <FaArrowUp className="text-4xl p-1 text-white" />,

  },
  {
    title: "Total Stok Kritis",
    Value: 43,
    colorbg:" bg-[#F9315A]/10",
    bgicon:"bg-[#F9315A]",
    icon: <BsExclamationLg className="text-4xl  text-white" />,

  },
];

const Card = () => {
  return (
    <div className="flex  w-full justify-center space-x-13">
      {dataDummy.map((item, index) => (
        <div
          key={index}
          className={`hover:scale-103 duration-300 shadow-[0_5px_8px_rgba(0,0,0,0.25)]  ${item.colorbg} rounded-[10px] w-[249px] h-[108px] mt-10 flex justify-center items-center gap-4`}
        >
          <div>
            <p>{item.title}</p>
            <h1 className="text-3xl font-bold">{item.Value}</h1>
          </div>
          <div className={`rounded-[10px] ${item.bgicon} p-2`}>
           {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
