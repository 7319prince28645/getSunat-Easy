import React from "react";
import { getCompare } from "../Services/getCompare";
function Tittle() {
  const { setCambiarComparacion, cambiarComparacion } = getCompare();
  const handleComparar = () => {
    setCambiarComparacion(!cambiarComparacion);
  };
  return (
    <>
      <button onClick={handleComparar} className="absolute pl-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md">{cambiarComparacion ? "Cambiar a Sire" : "Cambiar a Pricont"}</button>
      <h1 className="text-center mt-4 font-semibold text-2xl">
        COMPARAR COMPRAS CP - SUNAT
      </h1>
    </>
  );
}

export default Tittle;
