import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetImovel(url: string, matricula: number) {
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/${matricula}`)
      .then(({ data }) => {
        setResponse(data);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { response, error };
}
