import * as XLSX from "xlsx";
export const readFile = () => {
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
  return { handleComparar };
};
