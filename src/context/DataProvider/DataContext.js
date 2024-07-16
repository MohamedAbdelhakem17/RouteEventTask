import { createContext, useContext } from "react";

export const DataContext = createContext()
const useGetData = () => useContext(DataContext)

export default useGetData