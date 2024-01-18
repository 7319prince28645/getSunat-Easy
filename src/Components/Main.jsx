import { useContext } from "react";
import { getCompare } from "../Services/getCompare";
import { Context } from "../Services/getFiles";
function Main() {
  const { sire, compras } = useContext(Context);
  const { resultadosFallos } = getCompare();
  return (
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
        <p className="text-center pt-8 text-sm text-gray-600">
          Por favor ingrese los documentos a comparar.
        </p>
      )}
    </main>
  );
}

export default Main;
