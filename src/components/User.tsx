import React, { useContext } from "react";
import { AuthContext } from "../providers/auth";

export default function User() {
  const { user } = useContext(AuthContext);
  const { MATRICULA_USER, NAME_USER, CARGO_USER, LOTACAO_USER, E_MAIL_USER } =
    user!;

  return (
    <div className="m-5 mt-16 h-full  bg-blue-50 shadow-lg rounded-md space-y-32">
      <div className=" flex flex-row items-center justify-between border-b">
        <h1 className=" border-gray-300 text-center font-semibold text-lg">
          Dados do usuário
        </h1>
        <div className="space-x-4">
          <button
            type="submit"
            className="text-white shadow-md bg-blue-600 rounded-sm px-1 hover:bg-blue-700"
          >
            editar dados
          </button>
          <button
            type="submit"
            className="text-white shadow-md bg-blue-600 rounded-sm px-1 active:bg-blue-800 hover:bg-blue-700"
          >
            {" "}
            alterar senha{" "}
          </button>
        </div>
      </div>

      <div className="pb-10 ml-5 font-semibold space-y-5 text-sm">
        <h2>
          Nome:
          <p className="text-sm font-normal">{NAME_USER}</p>
        </h2>
        <h2>
          Matrícula:
          <p className="text-sm font-normal">{MATRICULA_USER}</p>
        </h2>
        <h2>
          Cargo:
          <p className="text-sm font-normal">{CARGO_USER}</p>
        </h2>
        <h2>
          Lotação:
          <p className="text-sm font-normal">{LOTACAO_USER}</p>
        </h2>
        <h2>
          E-mail:
          <p className="text-sm font-normal">{E_MAIL_USER}</p>
        </h2>
      </div>
    </div>
  );
}
