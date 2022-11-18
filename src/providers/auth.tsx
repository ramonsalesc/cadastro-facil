import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { RoutesProps } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface User {
  MATRICULA_USER: number | null;
  NAME_USER: string | null;
  CARGO_USER: string | null;
  LOTACAO_USER: string | null;
  E_MAIL_USER: string | null;
  // PASSWORD_USER: string | null;
}

export interface AppContextInterface {
  authenticated: boolean;
  user?: User | null;
  loading: boolean;
  login: (MATRICULA: number, SENHA: string) => void;
  logout: () => void;
}

const initialValue = {
  authenticated: false,
  loading: true,

  login: () => {},
  logout: () => {},
};
export const AuthContext = createContext<AppContextInterface>(initialValue);

export const AuthProvider = ({ children }: RoutesProps) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      const recoveredUser = localStorage.getItem("user");
      if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
      }
      setLoading(false);
    };
  }, []);

  const login = async (MATRICULA: number, SENHA: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL!}/user/login`,
        {
          MATRICULA_USER: MATRICULA,
          PASSWORD_USER: SENHA,
        }
      );

      if (response.data.TOKEN) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response!.data);
        console.log(response);

        return navigate("/imovel");
      }

      if (response.data.message) {
        console.log(response.data.message);

        return response.data.message;
      }
    } catch (error) {
      return error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
