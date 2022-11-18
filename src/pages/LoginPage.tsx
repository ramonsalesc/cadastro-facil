import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BsColumnsGap } from "react-icons/bs";
import { AuthContext } from "../providers/auth";

export default function LoginPage() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const { authenticated, login } = useContext(AuthContext);

  const handleOnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("senha: ", senha, "matricula: ", matricula);
    login(parseInt(matricula), senha);
  };
  return (
    <div className="h-full border-2 flex bg-blue-300 flex-row justify-center items-center">
      <p>{String(authenticated)}</p>
      <div className="w-80 ">
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-2xl  rounded px-8 pt-1 pb-6 "
        >
          <div className="flex items-center pb-4 text-3xl justify-center  font-semibold text-blue-200 tracking-tight ">
            <BsColumnsGap className="pr-0.5" />
            <span className="pl-1">Cadastro Fácil</span>
          </div>
          <div className="mb-4 text-start">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userMatricula"
            >
              Matrícula
            </label>
            <input
              autoFocus
              onChange={(e) => setMatricula(e.currentTarget.value)}
              className="shadow appearance-none border-blue-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="userMatricula"
              id="userMatricula"
              value={matricula}
              type="text"
              placeholder="Insira a sua Matrícula..."
            />
          </div>
          <div className="mb-6 text-start">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              onChange={(e) => setSenha(e.currentTarget.value)}
              className="shadow appearance-none border-blue-300  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              id="password"
              value={senha}
              type="password"
              placeholder="Insira a sua senha..."
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 text-white hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
              Entrar
            </button>
            <div className="flex flex-col space-y-2">
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Esqueceu a senha?
              </a>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Cadastre-se
              </a>
            </div>
          </div>
        </form>
        <p className="text-center text-white text-xs mt-2">
          &copy; All rights reserved.
        </p>
      </div>
    </div>
  );
}
