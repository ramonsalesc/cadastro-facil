import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// types
type FormValues = {
  matriculaImovel: string;
};
type HandleImoveis = {
  handleImoveis: (matricula: number) => void;
};
export interface Imovel {
  _id: string;
  COORDENADAX: number;
  COORDENADAY: number;
  ID_LOGRADOURO: number;
  LOCALIDADE: number;
  LOTE: number;
  MATRICULA: number;
  QUADRA: number;
  ROTA: number;
  SEGMENTO: number;
  SETOR: number;
  SUBLOTE: number;
  ENDERECO: Array<Endereco>;
}
export interface Endereco {
  BAIRRO: string;
  CEP: string;
  ID_LOGRADOURO: number;
  LOGRADOURO: string;
  MATRICULA: number;
  NUM_IMOVEL: number;
  TIPO_LOGRADOURO: string;
  _id: string;
}
export default function SearchImovel({
  handleImoveis,
}: HandleImoveis): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [activeInput, setActiveInput] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      handleImoveis(parseInt(data.matriculaImovel));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="  box-border" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        autoFocus
        onFocusCapture={() => setActiveInput(!activeInput)}
        placeholder="Busque o imovel..."
        className={`${
          activeInput ? "border-blue-800" : "border-blue-400"
        } rounded-md bg-transparent py-1  px-3 border font-normal text-sm`}
        {...register("matriculaImovel", {
          required: "Por favor, insira a matrícula!",
        })}
      />
      <div className="flex flex-col items-center">
        {errors.matriculaImovel && (
          <span className="relative p-0 M-0 text-red-500 m-0 text-sm">
            {errors.matriculaImovel.message}
          </span>
        )}
        <input
          type="submit"
          className="fixed mt-4 rounded-sm p-0.5 opacity-80 w-20 text-white hover:bg-blue-800 bg-blue-700 "
        />
      </div>
    </form>
  );
}
