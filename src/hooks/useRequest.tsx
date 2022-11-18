import { useState, useEffect } from "react";
import axios from "axios";

// type Imovel = {
//   _id: string;
//   COORDENADAX: number;
//   COORDENADAY: number;
//   ID_LOGRADOURO: number;
//   LOCALIDADE: number;
//   LOTE: number;
//   MATRICULA: number;
//   QUADRA: number;
//   ROTA: number;
//   SEGMENTO: number;
//   SETOR: number;
//   SUBLOTE: number;
//   ENDERECO: Endereco;
// };
// type Endereco = {
//   BAIRRO: string;
//   CEP: string;
//   ID_LOGRADOURO: number;
//   LOGRADOURO: string;
//   MATRICULA: number;
//   NUM_IMOVEL: number;
//   TIPO_LOGRADOURO: string;
//   _id: string;
// }[];

export function useRequest(url: string) {
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
