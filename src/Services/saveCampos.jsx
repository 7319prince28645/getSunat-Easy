import { useContext, useState,useEffect } from "react";
import { Context } from "./getFiles";
export const saveCampos = () => {
  const { sire, compras } = useContext(Context);
  const [camposSire, setCamposSire] = useState([]);
  const [camposCompras, setCamposCompras] = useState([]);
  const AgregarCampos = () => {
    const valoresSire = sire
      .slice(1)
      .map((value) =>
        `${value["Nro Doc Identidad"]}-0${value["Tipo CP/Doc."]} ${value["Serie del CDP"]}-${value["Nro CP o Doc. Nro Inicial (Rango)"]}`
          .trim()
          .toLowerCase()
      );

    const valoresCompras = compras
      .slice(2)
      .map(
        (value) =>
          `${value["__EMPTY_2"]}-${(value["__EMPTY_1"] || "")
            .trim()
            .toLowerCase()}`
      );

    setCamposSire(valoresSire);
    setCamposCompras(valoresCompras);
   
  };
  
  useEffect(() => {
    AgregarCampos();
  }, [sire, compras]);
  return { camposSire, camposCompras };
};
