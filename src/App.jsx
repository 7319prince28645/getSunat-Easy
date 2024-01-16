import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
function App() {
  const [sire, setSire] = useState([]);
  const [compras, setCompras] = useState([]);
  const [camposSire, setCamposSire] = useState([]);
  const [camposCompras, setCamposCompras] = useState([]);
  const [resultadosFallos, setResultadosFallos] = useState([]);

  const handleClick = async () => {
    Swal.fire({
      title: '¡Sucess!',
      text: 'Espere por favor',
      icon: 'success',
      confirmButtonText: 'Aceptar'
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

  const handleComparar = async (file) => {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
      console.error("Error al leer el archivo: ", error);
      return [];
    }
  };
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
      .map((value) => `${value["__EMPTY_2"]}-${(value["__EMPTY_1"] || "").trim().toLowerCase()}`);

    setCamposSire(valoresSire);
    setCamposCompras(valoresCompras);
  };

  const comparar = () => {
    const resultados = camposSire.filter(
      (value) => !camposCompras.includes(value)
    );
    
    setResultadosFallos(resultados);
  };
  useEffect(() => {
    if (sire.length > 0 && compras.length > 0) {
      AgregarCampos();
    }
  }, [sire, compras]);

  useEffect(() => {
    if (camposSire.length > 0 && camposCompras.length > 0) {
      comparar();
    }
  }, [camposSire, camposCompras]);

  console.log(compras)
  return (
    <>
      <header className="">
        <h1 className="text-center mt-4 font-semibold text-2xl">
          COMPARAR COMPRAS CP - SUNAT
        </h1>
        <nav className="  p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex space-x-4 items-center w-full justify-around">
              <div className="flex flex-col items-center">
                <label htmlFor="sire" className="block text-sm font-medium">
                  INGRESAR COMPRAS SIRE
                </label>
                <input
                  type="file"
                  id="sire"
                  className="mt-1 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="compras" className="block text-sm font-medium">
                  INGRESAR COMPRAS SUNAT
                </label>
                <input
                  type="file"
                  id="compras"
                  className="mt-1 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
            >
              COMPARAR
            </button>
          </div>
        </nav>
      </header>
      <main className="mx-16">
        {resultadosFallos.length > 0 && (
          <h2 className="text-center text-lg font-semibold text-gray-800 pt-4">
            Comprobantes Faltantes
          </h2>
        )}

        <div className="grid grid-cols-4 gap-4 p-4">
          {resultadosFallos ? (
            resultadosFallos.map((value, index) => (
              <div
                className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4"
                key={index}
              >
                <span className="font-semibold">{index + 1}.</span>
                <p>{value.toUpperCase()}</p>
              </div>
            ))
          ) : (
            <p>Espere por favor ...</p>
          )}
        </div>

        {sire.length > 0 && resultadosFallos.length === 0 && (
          <p className="text-center pt-8 text-sm text-gray-600">
            NO SE ENCONTRARON COMPROBANTES FALTANTES
          </p>
        )}
        {sire.length === 0 && compras.length === 0 && (
          <p className="text-center pt-8 text-sm text-gray-600">Por favor ingrese los documentos a comparar.</p>
        )}
      </main>
    </>
  );
}

export default App;
