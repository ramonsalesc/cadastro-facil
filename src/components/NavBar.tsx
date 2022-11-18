import { NavLink } from "react-router-dom";
import {
  BsQuestionCircleFill,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import React from "react";

export default function NavBar() {
  return (
    <nav className="h-full w-full flex flex-row font-normal border-l pl-2 text-sm">
      <ul className=" h-full w-full flex flex-row justify-between items-center">
        <div className="h-full flex flex-row ">
          <NavLink
            to="/imovel"
            title="Imovel"
            className={({ isActive }) =>
              "h-full p-1 px-3 justify-center flex flex-col  text-xl  hover:bg-blue-800 " +
              (isActive ? "bg-blue-900" : "")
            }
          >
            <BsReverseLayoutTextWindowReverse className="text-2xl" />
          </NavLink>
        </div>
        <div className="h-full flex flex-row pr-7">
          {[
            ["/help", "Ajuda"],
            ["/user", "Usuário"],
          ].map(([url, title], id) => {
            return (
              <li key={id}>
                <NavLink
                  to={url}
                  title={title}
                  className={({ isActive }) =>
                    "h-full p-1 px-5 text-lg justify-center flex flex-col   hover:bg-blue-800 " +
                    (isActive ? "bg-blue-900" : "")
                  }
                >
                  {title === "Ajuda" ? <BsQuestionCircleFill /> : <FaUserTie />}
                </NavLink>
              </li>
            );
          })}
        </div>
      </ul>
    </nav>
  );
}
