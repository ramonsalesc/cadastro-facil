import axios from "axios";
import React from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import manual from "../documents/Manual.pdf";
export default function help() {
  const openDocument = () => {
    axios(`${manual}`, {
      method: "GET",
      responseType: "blob", //Forçar o recebimento de dados no formato Blob
    })
      .then((response) => {
        //Criar um Blob a partir do arquivo PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Construa uma URL a partir do arquivo
        const fileURL = URL.createObjectURL(file);
        //Abre a URL em uma nova janela
        window.open(fileURL);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <div className="mt-20">
      <h1 className=" border-gray-300 text-center font-semibold text-lg">
        Ajuda sobre o Cadastro Fácil
      </h1>
      <div className="m-20 space-y-5">
        <h2 className="text-center">O que é cadastro fácil?</h2>
        <p className="text-justify">
          O cadastro fácil é uma aplicação desenvolvida para facilitar o
          cadastro de imóveis.
        </p>
        <h2 className="text-center">Qual o objetivo do Cadastro Fácil?</h2>
        <p className="text-justify">
          O cadastro fácil surgiu com o objetivo de facilitar os cadastro
          técnicos de imóveis. Com ele é possível realizar cadastros de imóveis
          sem a necessidade de deslocamento do agente até o imóvel. Assim, há
          economia de tempo e dinheiro.
        </p>
        <h2 className="text-center">Manual de Cadastro técnico de imóveis</h2>
        <p className="text-justify">
          Para melhor aproveitar os recursos do Cadastro Fácil leia o manual do
          cadastro técnico de imóveis disponível abaixo.
        </p>
        <button
          className="text-center  rounded-sm p-1 w-40 text-white  hover:bg-blue-800 bg-blue-600"
          onClick={openDocument}
        >
          Manual de Cadastro
        </button>
      </div>
    </div>
  );
}
