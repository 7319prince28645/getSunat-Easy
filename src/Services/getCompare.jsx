import {useState, useEffect} from "react";
import {saveCampos} from "./saveCampos";
export const getCompare = () => {
  const { camposSire, camposCompras } = saveCampos();
  const [resultadosFallos, setResultadosFallos] = useState([]);

  const comparar = () => {
    const resultados = camposSire.filter(
      (value) => !camposCompras.includes(value)
    );

    setResultadosFallos(resultados);
  };
  useEffect(() => {
    comparar();
  }, [camposSire, camposCompras]);
  return { resultadosFallos, comparar };
};
