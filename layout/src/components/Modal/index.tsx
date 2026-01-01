import "./styles.scss";

export const Modal = ({title}) => {
    return (
        <div className="modal">
            <p>Paciente {title} com sucesso!</p>
        </div>
    )
}