import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "../components/Dashboard";
import { Find } from "../components/Find";
import { FindByName } from "../components/FindByName";
import { Register } from "../components/Register";
import { Update } from "../components/Update";


export const Routess = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Register />} />
            <Route path="alterar" element={<Update />} />
            <Route path="consultapelonome" element={<FindByName />} />
            <Route path="consultar" element={<Find />} />
          </Route> 
        </Routes>
      </BrowserRouter>
  );
}