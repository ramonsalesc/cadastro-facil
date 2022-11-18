import axios from "axios";
import { useEffect, useState } from "react";

// types

type Imovel = {
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
  ENDERECO: Endereco;
}[];
type Endereco = {
  BAIRRO: string;
  CEP: string;
  ID_LOGRADOURO: number;
  LOGRADOURO: string;
  MATRICULA: number;
  NUM_IMOVEL: number;
  TIPO_LOGRADOURO: string;
  _id: string;
};
function GetImoveis(url: string) {
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { response, error };
}

function UpdateImovel(url: string, matricula: number) {
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .put(`${url}/${matricula}`)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { response, error };
}
export { GetImoveis, UpdateImovel };
