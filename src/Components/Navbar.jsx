import { useContext } from "react";
import { Context } from "../Services/getFiles";
function Navbar() {
  const { handleClick } = useContext(Context);
  return (
    <header className="">
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
  );
}

export default Navbar;
