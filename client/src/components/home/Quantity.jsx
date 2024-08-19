import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Quantity = ({ quantity, inc, dec, theme }) => {
  return (
    <div className="flex last:border-r last:rounded-tr-lg last:rounded-br-lg first:rounded-tl-lg first:rounded-bl-lg overflow-hidden shadow-sm">
      <span
        className={`flex border p-3 border-r-0 cursor-pointer bg-[#e0e6e3] hover:bg-gray-300 hover:text-gray-800 transition-all rounded-l-lg ${
          theme === "indigo" && "bg-indigo-500 text-white"
        }`}
        onClick={dec}
      >
        <AiOutlineMinus className="text-lg" />
      </span>
      <span className="flex-1 border flex items-center justify-center font-semibold text-gray-700 border-r-0 bg-[#f8f9fa]">
        {quantity}
      </span>
      <span
        className={`flex border p-3 border-r-0 cursor-pointer bg-[#e0e6e3] hover:bg-gray-300 hover:text-gray-800 transition-all rounded-r-lg ${
          theme === "indigo" && "bg-darkgreen text-white"
        }`}
        onClick={inc}
      >
        <AiOutlinePlus className="text-lg" />
      </span>
    </div>
  );
};

export default Quantity;
