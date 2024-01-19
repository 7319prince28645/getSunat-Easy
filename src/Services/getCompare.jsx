import {useState, useEffect} from "react";
import {saveCampos} from "./saveCampos";
export const getCompare = () => {
  const { camposSire, camposCompras } = saveCampos();
  const [resultadosFallos, setResultadosFallos] = useState([]);
  const [cambiarComparacion, setCambiarComparacion] = useState(false);
  const comparar = () => {
    const resultados = (cambiarComparacion? camposCompras: camposSire).filter(
      (value) => !(cambiarComparacion? camposSire: camposCompras).includes(value)
    );

    setResultadosFallos(resultados);
  };
  useEffect(() => {
    comparar();
  }, [camposSire, camposCompras]);
  return { resultadosFallos, comparar,cambiarComparacion, setCambiarComparacion };
};
