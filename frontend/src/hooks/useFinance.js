import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext.jsx";

const useFinance = () => useContext(FinanceContext);

export default useFinance;
