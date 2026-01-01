import { Header } from "./components/Header";
import { Routess } from "./Routes";

import "./app.scss";

export function App() {
  return (
    <>
      <Header 
        title="ACME" 
        subtitle="Cadastro, alteração e consulta de pacientes"
      />
      <Routess />
    </>
  );
}
