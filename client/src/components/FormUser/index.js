import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { api } from "../../services/api";
import { Modal } from "../Modal";

import "./styles.scss";

export const FormUser = ({
    formTitle, 
    register = false,
    }) => {

    const [animationRegister, setAnimationRegister] = useState(false)
    const [animationUpdate, setAnimationUpdate] = useState(false)

    const handleClickRegister = async (values) => {
        console.log("Cadastrado")
        try {
            await api.post(`registrar`, {
                nome: values.nome,
                data_de_nascimento: values.data_de_nascimento,
                cpf: values.cpf,
                sexo: values.sexo,
                endereco: values.endereco,
                status: values.status
            }).then(() => {
                setTimeout(() => {
                    setAnimationRegister(true)
                    setTimeout(() => {
                        setAnimationRegister(false)
                    }, 1500)
                }, 500)
            })
        } catch (err) {
            console.log("Erro: " + err)
        }
    }

    const handleClickUpdate = (values) => {
        console.log("Cadastrado")
        try {
            api.put("alterar/" + values.cpf, {
                nome: values.nome,
                data_de_nascimento: values.data_de_nascimento,
                sexo: values.sexo,
                endereco: values.endereco,
                status: values.status
            }).then(()=> {
                setTimeout(() => {
                    setAnimationUpdate(true)
                    setTimeout(() => {
                        setAnimationUpdate(false)
                    }, 1500)
                }, 500)
            })
        } catch (err) {
            console.log("Erro: " + err)
        }
    }

    const validationUser = yup.object().shape({
        nome: yup.string().required('Este campo é obrigatório'),
        data_de_nascimento: yup.string().required('Este campo é obrigatório'),
        cpf: yup.string().min(11).max(11).required('Este campo é obrigatório'),
        sexo: yup.string().max(9).required('Este campo é obrigatório'),
        endereco: yup.string(),
        status: yup.string().required('Este campo é obrigatório')
    })

    return (
        <fieldset>
            <legend>{formTitle} Usuário</legend>
            <Formik 
                initialValues={{}}
                onSubmit={
                    register ? handleClickRegister : handleClickUpdate
                }
                validationSchema={validationUser}
            >
                <Form className="form">
                    <FormInput
                        titleField="Nome"
                        placeHolder="Ex: João Ricardo Siva"
                        nameField="nome"
                    />
                    <FormInput
                        titleField="Data de Nascimento"
                        placeHolder="Ex: 1997-01-24"
                        nameField="data_de_nascimento"
                    />
                    <FormInput
                        titleField="CPF"
                        placeHolder="Ex: 12345678912"
                        nameField="cpf"
                    />
                    <FormInput
                        titleField="Sexo"
                        placeHolder="Ex: Masculino"
                        nameField="sexo"
                    />
                    <FormInput
                        titleField="Endereço"
                        placeHolder="Ex: Rua Conceição, 89"
                        nameField="endereco"
                        onChange={(e) => console.log(e.target.values)}
                    />
                    <FormInput
                        titleField="Status"
                        placeHolder="Ativo"
                        nameField="status"
                    />

                <button type="submit" className="button">
                    {formTitle}
                </button>
                </Form>
            </Formik>
            {
                animationRegister ? <Modal title="registrado" /> : null
            }
            {
                animationUpdate ? <Modal title="alterado" /> : null
            }
        </fieldset>
    )
}

const FormInput = ({titleField, placeHolder, nameField}) => {
    return (
        <div className="form-group">
            <label>
                <p>{titleField}</p>
                <Field 
                    placeholder={placeHolder}
                    name={nameField}
                    className="form-field"
                    />
            </label>
            <ErrorMessage 
                component="span"
                name={nameField}
                className="form-error"
            />
        </div> 
    )
}