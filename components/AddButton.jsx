// components/AddButton.js
import Link from "next/link";

const AddButton = ({ href }) => {
  return (
    <Link
      href={href}
      className="w-16 h-16 flex justify-center items-center shadow-md rounded-full bg-blue-700 fixed bottom-2 right-4 z-10"
    >
      <span className="font-bold text-2xl text-white">+</span>
    </Link>
  );
};

export default AddButton;
