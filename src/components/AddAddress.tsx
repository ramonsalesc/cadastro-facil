import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Imovel } from "./SearchImovel";
type AddImovelProps = {
  imovel: Imovel;
  imoveis?: [Imovel];
  onClickCloseAddImovel: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type FormValues = {
  tipo_logradouro: string;
  nome_logradouro: string;
  num_imovel: string;
  bairro: string;
  cep: string;
};
export default function AddAddress({
  imovel,
  imoveis,
  onClickCloseAddImovel,
}: AddImovelProps) {
  let singleAddress: boolean;

  let imoveisOrderned = imoveis
    ?.sort((a, b) => a.SETOR - b.SETOR)
    .sort((a, b) => a.ROTA - b.ROTA)
    .sort((a, b) => a.SEGMENTO - b.SEGMENTO)
    .sort((a, b) => a.LOTE - b.LOTE);

  let imoveisNear: Array<Imovel> = [];
  let indiceImovel = imoveisOrderned?.indexOf(imovel);

  imoveisOrderned?.filter((element, index) => {
    if (indiceImovel === index - 1) {
      imoveisNear.push(element);
    }
    if (indiceImovel === index) {
      imoveisNear.push(element);
    }
    if (indiceImovel === index + 1) {
      imoveisNear.push(element);
    }
  });

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    let { tipo_logradouro, nome_logradouro, num_imovel, bairro, cep } = data;

    if (!tipo_logradouro) {
      // tipo_logradouro = .;
    }
    if (!nome_logradouro) {
      // nome_logradouro = address.LOGRADOURO.toString();
    }
    if (!num_imovel) {
      // num_imovel = address.NUM_IMOVEL.toString();
    }
    if (!bairro) {
      // bairro = address.BAIRRO.toString();
    }
    if (!cep) {
      // cep = address.CEP.toString();
    }

    singleAddress = true;

    // imoveisOrderned?.filter(
    //   ({ SETOR, ROTA, QUADRA, SEGMENTO, LOTE, SUBLOTE }) => {
    //     if (
    //   SETOR === parseInt(setor) &&
    //   ROTA === parseInt(rota) &&
    //   QUADRA === parseInt(quadra) &&
    //   SEGMENTO === parseInt(segmento) &&
    //   LOTE === parseInt(lote) &&
    //   SUBLOTE === parseInt(sublote)
    //     ) {
    //       singleAddress = false;

    //       alert(
    //         `A inscrição Informada já está vinculada ao imóvel de matrícula ${imovel.MATRICULA}`
    //       );
    //     }
    //   }
    // );
    try {
      if (singleAddress) {
        // await axios.post(
        //   `${process.env.REACT_APP_API_URL!}/${imovel.MATRICULA}`,
        //   {
        //     SETOR: parseInt(setor),
        //     ROTA: parseInt(rota),
        //     QUADRA: parseInt(quadra),
        //     SEGMENTO: parseInt(segmento),
        //     LOTE: parseInt(lote),
        //     SUBLOTE: parseInt(sublote),
        //   }
        // );
        alert(`imóvel de matrícula ${imovel.MATRICULA} alterado com sucesso!`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-min absolute border-red-500 border-2 rounded-md px-2 PB-2 pt-0 m-2 pb-3 w-3/12 space-y-3 box-border shadow-md bg-white bg-opacity-80">
      <div className="text-right">
        <button
          type="submit"
          className="hover:font-semibold pt-0 mt-0"
          onClick={onClickCloseAddImovel}
        >
          x
        </button>
      </div>
      <div className="text-left ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <label id="tipo_logradouro" className="flex p-0 m-0 flex-row w-full">
            <p className="w-20 font-semibold p-0 m-0">Tipo do logradouro:</p>
            <input
              type="number"
              // placeholder={address.TIPO_LOGRADOURO.toString()}
              className="w-20 p-0  rounded-sm border-blue-300 px-1 m-0"
              {...register("tipo_logradouro")}
            />
          </label>
          <label id="nome_logradouro" className="flex p-0 m-0 flex-row w-full">
            <p className="w-20 font-semibold p-0 m-0">Logradouro:</p>
            <input
              type="number"
              // placeholder={address.LOGRADOURO.toString()}
              className="w-20 p-0  rounded-sm border-blue-300 px-1 m-0"
              {...register("nome_logradouro")}
            />
          </label>
          <label id="num_imovel" className="flex p-0 m-0 flex-row w-full ">
            <p className="w-20 font-semibold p-0 m-0">Número:</p>
            <input
              type="number"
              // placeholder={address.NUM_IMOVEL.toString()}
              className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
              {...register("num_imovel")}
            />
          </label>
          <label id="bairro" className="flex p-0 m-0 flex-row w-full">
            <p className="w-20 font-semibold p-0 m-0">Bairro:</p>
            <input
              type="number"
              // placeholder={address.BAIRRO.toString()}
              className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
              {...register("bairro")}
            />
          </label>
          <label id="cep" className="flex p-0 m-0 flex-row w-full ">
            <p className="w-20 font-semibold p-0 m-0">Lote:</p>
            <input
              type="number"
              // placeholder={address.CEP.toString()}
              className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
              {...register("cep")}
            />
          </label>

          <input
            type="submit"
            className={
              "opacity-80  text-center text-white rounded-sm p-1 w-full   hover:bg-blue-800 bg-blue-600"
            }
          />
        </form>
      </div>
    </div>
  );
}
