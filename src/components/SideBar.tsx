import { useState } from "react";
import { BsSearch, BsQuestionCircleFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      {[
        ["/imovel/consultarimovel", "Consultar Imovel"],
        ["/imovel/cadastrarimovel", "Cadastrar Imovel"],
      ].map(([url, title], id) => {
        return (
          <li key={id}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                "h-full p-1 justify-center flex flex-col rounded-sm text-xl hover:bg-blue-800 " +
                (isActive ? "bg-blue-900" : "")
              }
            >
              {title === "Consultar Imovel" ? <BsSearch /> + title : title}
            </NavLink>
          </li>
        );
      })}
    </>
  );
}
