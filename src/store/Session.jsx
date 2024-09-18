import axios from "axios";
import { createContext, useEffect, useState } from "react";
const SessionContext = createContext();

const obtenerPerfil = async (token) => {
  try {
    const configHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(import.meta.env.VITE_SPLITPAY_SERVER+"/get_splitpay", configHeaders);
    return data;
  } catch (error) {
    return error;
  }
};

const SessionProvider = ({ children }) => {
  const [splitPay, setSplitPay] = useState({});
  const [loading, setLoading] = useState(true);
  const [splitPayToken, setSplitPayToken] = useState(null);

  const perfil = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await obtenerPerfil(token ?? "");
      setSplitPay(data ? data : {});
      setSplitPayToken(token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (splitPay) => {
    localStorage.setItem("token", splitPay.token);
    await perfil();
  };

  const logout = () => {
    setSplitPay({});
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    perfil();
  }, []);



  if (loading) return <p>Cargando...</p>;

  return (
    <SessionContext.Provider
      value={{
        splitPay,
        login,
        logout,
        splitPayToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };