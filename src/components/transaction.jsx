import { useParams } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "./usercontext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
    const navigate = useNavigate();
    const { tipo } = useParams();
    const userToken = localStorage.getItem("userToken");
    const tokenObj = {
        headers: { Authorization: userToken },
    };

    const type = tipo === "entrada" ? "Entrada" : "Saída";

    const [loading, setLoading] = useState(false);

    const [newvalue, setValue] = useState("");
    const [newdescription, setDescription] = useState("");
    let transactionObj = {
        value: Number(""),
        description: "",
    };
    const sendTransaction = (event) => {
        event.preventDefault();
        if (newvalue === "" || newdescription === "") {
            alert("Preencha todos os dados para prosseguir.");
            setLoading(false);
            return;
        }
        setLoading(true);
        const numValue = Number(newvalue.replace(",", "."));
        transactionObj.value = numValue;
        transactionObj.description = newdescription;

        console.log("log obj", transactionObj);
        const promise = axios.post(
            `${import.meta.env.VITE_API_URL}/transaction/${tipo}`,
            transactionObj,
            tokenObj
        );
        promise
            .then((res) => {
                const r = res.data;
                console.log(r);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                alert(`Erro ${err.response.status}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <TransactionsContainer>
            <h1>Nova {type}</h1>
            <form>
                <input
                    type="text"
                    placeholder="Valor"
                    value={newvalue}
                    onChange={(event) => setValue(event.target.value)}
                    disabled={loading}
                    data-test="registry-amount-input"
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newdescription}
                    onChange={(event) => setDescription(event.target.value)}
                    disabled={loading}
                    data-test="registry-name-input"
                />
                <button data-test="registry-save" onClick={sendTransaction}>
                    {loading ? `...` : `Salvar ${tipo}`}
                </button>
            </form>
        </TransactionsContainer>
    );
}

const TransactionsContainer = styled.main`
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h1 {
        align-self: flex-start;
        margin-bottom: 40px;
    }
`;
