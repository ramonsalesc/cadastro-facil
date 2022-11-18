import React, { useContext } from "react";
import NavBar from "./NavBar";
import { BsColumnsGap } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AuthContext } from "../providers/auth";

export default function Header() {
  const { logout } = useContext(AuthContext);

  const onLogOut = () => {
    logout();
  };

  return (
    <div className="fixed mt-0 w-full bg-blue-700 flex flex-row items-center border-b-2 border-blue-900 h-11  text-white font-semibold shadow-lg">
      <h1 className="w-1/6 flex-row flex items-center justify-center space-x-1">
        <BsColumnsGap />
        <span>Cadastro Fácil</span>
      </h1>
      <NavBar />
      <button
        onClick={onLogOut}
        className="hover:bg-blue-800 mr-4 h-full w-16 flex flex-row justify-center items-center"
        type="submit"
      >
        <AiOutlinePoweroff size={22} />
      </button>
    </div>
  );
}
