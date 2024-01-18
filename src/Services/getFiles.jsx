import { useState, createContext } from "react";
import Swal from "sweetalert2";
import { readFile } from "./readFile";

export const Context = createContext({});
export const GetFiles = ({children}) => {
  const { handleComparar } = readFile();
  const [sire, setSire] = useState([]);
  const [compras, setCompras] = useState([]);
  const handleClick = async () => { 
    Swal.fire({
      title: "¡Sucess!",
      text: "Espere por favor",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    const sireFile = document.getElementById("sire").files[0];
    const comprasFile = document.getElementById("compras").files[0];
    if (sireFile && comprasFile) {
      const sireData = await handleComparar(sireFile);
      const comprasData = await handleComparar(comprasFile);
      setSire(sireData);
      setCompras(comprasData);
    }
   
  };
  return (
    <Context.Provider value={{ sire, compras, handleClick }}>
        {children}
    </Context.Provider>
  )
};
export default GetFiles;
