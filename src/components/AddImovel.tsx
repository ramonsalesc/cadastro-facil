import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Imovel } from "./SearchImovel";
import { type Coordinates } from "./ApiMap";
import { toast, ToastContainer } from "react-toastify";

type AddImovelProps = {
  imovel: Imovel;
  activeAddImovel: boolean;
  imoveis?: [Imovel];
  coordinates: Coordinates | null;
  onClickCloseAddImovel: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type FormValues = {
  matricula: string;
  setor: string;
  rota: string;
  quadra: string;
  segmento: string;
  lote: string;
  sublote: string;
  tipo_logradouro: string;
  nome_logradouro: string;
  num_imovel: string;
  bairro: string;
  cep: string;
};
export default function AddImovel({
  imovel,
  imoveis,
  coordinates,
  onClickCloseAddImovel,
}: AddImovelProps) {
  let singleSubscription: boolean;
  let coordinatesAux = coordinates;

  console.log("coordinates no addImove", coordinates);

  let imoveisOrderned = imoveis
    ?.sort((a, b) => a.SETOR - b.SETOR)
    .sort((a, b) => a.ROTA - b.ROTA)
    .sort((a, b) => a.SEGMENTO - b.SEGMENTO)
    .sort((a, b) => a.LOTE - b.LOTE);

  let imoveisNear: Array<Imovel> = [];
  let indiceImovel = imoveisOrderned?.indexOf(imovel);

  imoveisOrderned?.filter((element, index) => {
    if (indiceImovel === index - 1) {
      return imoveisNear.push(element);
    }
    if (indiceImovel === index) {
      return imoveisNear.push(element);
    }
    if (indiceImovel === index + 1) {
      return imoveisNear.push(element);
    }
  });

  if (coordinatesAux) {
    console.log("dentro do if alert");

    toast.success(
      "Pronto! Coordenadas coletadas. Agora informe os dados do imóvel a ser cadastrado."
    );
  }

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    let {
      tipo_logradouro,
      nome_logradouro,
      num_imovel,
      bairro,
      cep,
      setor,
      rota,
      quadra,
      segmento,
      lote,
      sublote,
    } = data;

    if (!tipo_logradouro) {
      tipo_logradouro = imovel.ENDERECO[0].TIPO_LOGRADOURO;
    }
    if (!nome_logradouro) {
      nome_logradouro = imovel.ENDERECO[0].LOGRADOURO;
    }
    if (!num_imovel) {
      num_imovel = imovel.ENDERECO[0].NUM_IMOVEL.toString();
    }
    if (!bairro) {
      bairro = imovel.ENDERECO[0].BAIRRO;
    }
    if (!cep) {
      cep = imovel.ENDERECO[0].CEP;
    }
    if (!setor) {
      setor = imovel.SETOR.toString();
    }
    if (!rota) {
      rota = imovel.ROTA.toString();
    }
    if (!quadra) {
      quadra = imovel.QUADRA.toString();
    }
    if (!segmento) {
      segmento = imovel.SEGMENTO.toString();
    }
    if (!lote) {
      lote = imovel.LOTE.toString();
    }
    if (!sublote) {
      sublote = imovel.SUBLOTE.toString();
    }

    singleSubscription = true;

    imoveisOrderned?.filter(
      ({ SETOR, ROTA, QUADRA, SEGMENTO, LOTE, SUBLOTE, MATRICULA }) => {
        if (
          SETOR === parseInt(setor) &&
          ROTA === parseInt(rota) &&
          QUADRA === parseInt(quadra) &&
          SEGMENTO === parseInt(segmento) &&
          LOTE === parseInt(lote) &&
          SUBLOTE === parseInt(sublote)
        ) {
          return (
            (singleSubscription = false),
            (coordinatesAux = null),
            toast.error(
              `A inscrição Informada já está vinculada ao imóvel de matrícula ${MATRICULA}`
            )
          );
        }
      }
    );
    imoveisOrderned?.filter(({ ENDERECO }) => {
      if (
        ENDERECO[0].BAIRRO === bairro &&
        ENDERECO[0].CEP === cep &&
        ENDERECO[0].LOGRADOURO === nome_logradouro &&
        ENDERECO[0].NUM_IMOVEL === parseInt(num_imovel) &&
        ENDERECO[0].TIPO_LOGRADOURO === tipo_logradouro
      ) {
        return (
          (singleSubscription = false),
          (coordinatesAux = null),
          toast.error(
            `O endereço Informado já está vinculado ao imóvel de matrícula ${ENDERECO[0].MATRICULA}`
          )
        );
      }
    });
    console.log("singleimovel: ", singleSubscription);
    try {
      if (singleSubscription && coordinates) {
        let matriculaLastImovel;
        imoveisOrderned
          ?.sort((a, b) => a.MATRICULA - b.MATRICULA)
          .filter((el: Imovel, i: number) => {
            if (i === imoveisOrderned!.length - 1) {
              matriculaLastImovel = ++el.MATRICULA;
            }
          });
        console.log("LASTIMOVEL:", matriculaLastImovel);

        await axios.post(`186.148.230.186/imovel/`, {
          MATRICULA: matriculaLastImovel,
          LOCALIDADE: imovel.LOCALIDADE,
          SETOR: parseInt(setor),
          ROTA: parseInt(rota),
          QUADRA: parseInt(quadra),
          SEGMENTO: parseInt(segmento),
          LOTE: parseInt(lote),
          SUBLOTE: parseInt(sublote),
          COORDENADAX: coordinates?.coordinatesLat,
          COORDENADAY: coordinates?.coordinatesLng,
          ID_LOGRADOURO: imovel.ID_LOGRADOURO,
        });
        await axios.post(`186.148.230.186/endereco/`, {
          MATRICULA: matriculaLastImovel,
          BAIRRO: bairro,
          CEP: cep,
          LOGRADOURO: nome_logradouro,
          NUM_IMOVEL: parseInt(num_imovel),
          TIPO_LOGRADOURO: tipo_logradouro,
          ID_LOGRADOURO: imovel.ID_LOGRADOURO,
        });

        toast.success(
          `Imóvel cadastrado com sucesso! Matrícula ${matriculaLastImovel}`
        );

        window.location.reload();

        coordinates = null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-min absolute rounded-md px-2 PB-2 pt-0 m-2 pb-3 w-3/12 space-y-3 box-border shadow-md bg-white bg-opacity-80">
      <div className="text-justify">
        <ToastContainer
          position="top-center"
          autoClose={10000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
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
          <div className="flex flex-row  space-x-2 min-w-min">
            <div className="space-y-2">
              <label id="setor" className="flex p-0 m-0 flex-row w-full">
                <p className="w-20 font-semibold p-0 m-0">Setor:</p>
                <input
                  type="number"
                  placeholder={imovel.SETOR.toString()}
                  className="w-20 p-0  rounded-sm border-blue-300 px-1 m-0"
                  {...register("setor")}
                />
              </label>
              <label id="rota" className="flex p-0 m-0 flex-row w-full">
                <p className="w-20 font-semibold p-0 m-0">Rota:</p>
                <input
                  type="number"
                  placeholder={imovel.ROTA.toString()}
                  className="w-20 p-0  rounded-sm border-blue-300 px-1 m-0"
                  {...register("rota")}
                />
              </label>
              <label id="quadra" className="flex p-0 m-0 flex-row w-full ">
                <p className="w-20 font-semibold p-0 m-0">Quadra:</p>
                <input
                  type="number"
                  placeholder={imovel.QUADRA.toString()}
                  className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("quadra")}
                />
              </label>
              <label id="segmento" className="flex p-0 m-0 flex-row w-full">
                <p className="w-20 font-semibold p-0 m-0">Segmento:</p>
                <input
                  type="number"
                  placeholder={imovel.SEGMENTO.toString()}
                  className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("segmento")}
                />
              </label>
              <label id="lote" className="flex p-0 m-0 flex-row w-full ">
                <p className="w-20 font-semibold p-0 m-0">Lote:</p>
                <input
                  type="number"
                  placeholder={imovel.LOTE.toString()}
                  className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("lote")}
                />
              </label>
              <label id="sublote" className="flex p-0 m-0 flex-row w-full ">
                <p className="w-20 font-semibold p-0 m-0">Sublote:</p>
                <input
                  type="number"
                  placeholder={imovel.SUBLOTE.toString()}
                  className="w-20 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("sublote")}
                />
              </label>
            </div>
            <div className="w-80  space-y-2">
              <label
                id="tipo_logradouro"
                className="flex p-0 m-0 flex-row w-full "
              >
                <p className="w-40 font-semibold p-0 m-0">
                  Tipo do logradouro:
                </p>
                <input
                  type="text"
                  placeholder={imovel.ENDERECO[0].TIPO_LOGRADOURO}
                  className="w-40 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("tipo_logradouro")}
                />
              </label>
              <label
                id="nome_logradouro"
                className="flex p-0 m-0 flex-row w-full "
              >
                <p className="w-40 font-semibold p-0 m-0">Logradouro:</p>
                <input
                  type="text"
                  placeholder={imovel.ENDERECO[0].LOGRADOURO}
                  className="w-40 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("nome_logradouro")}
                />
              </label>
              <label id="num_imovel" className="flex p-0 m-0 flex-row w-full ">
                <p className="w-40 font-semibold p-0 m-0">Número:</p>
                <input
                  type="text"
                  placeholder={imovel.ENDERECO[0].NUM_IMOVEL.toString()}
                  className="w-40 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("num_imovel")}
                />
              </label>
              <label id="cep" className="flex p-0 m-0 flex-row w-full ">
                <p className="w-40 font-semibold p-0 m-0">CEP:</p>
                <input
                  type="text"
                  placeholder={imovel.ENDERECO[0].CEP}
                  className="w-40 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("cep")}
                />
              </label>
              <label id="bairro" className="flex p-0 m-0 flex-row w-full ">
                <p className="w-40 font-semibold p-0 m-0">Bairro:</p>
                <input
                  type="text"
                  placeholder={imovel.ENDERECO[0].BAIRRO}
                  className="w-40 p-0 rounded-sm border-blue-300 px-1 m-0"
                  {...register("bairro")}
                />
              </label>
            </div>
          </div>
          <div className="w-full flex flex-row justify-center">
            <input
              type="submit"
              className={
                "opacity-80 mt-2  text-center text-white rounded-sm p-1 w-20   hover:bg-blue-800 bg-blue-600"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
