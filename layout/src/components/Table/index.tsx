import "./styles.scss";

export const Table = ({ children }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>CPF</th>
                    <th>Sexo</th>
                    <th>Endereço</th>
                    <th>Status</th>
                </tr>
            </thead>
                <tbody>
                    {children}
                </tbody>
        </table>
    )
}