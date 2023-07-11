import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "./usercontext.js";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function Home() {
    const navigate = useNavigate();
    const userToken = localStorage.getItem("userToken");
    const userName = localStorage.getItem("userName");
    const tokenObj = {
        headers: { Authorization: userToken },
    };

    const [userTransactions, setTransactions] = useState([]);
    const [userBalance, setUserBalance] = useState(null);

    function requestData() {
        const promise = axios.get(
            `${import.meta.env.VITE_API_URL}/account`,
            tokenObj
        );
        promise
            .then((res) => {
                setTransactions(res.data.transactions);
                setUserBalance(res.data.balance);
            })
            .catch((error) => {
                alert(`Erro: ${error}`);
            });
    }

    useEffect(() => {
        if (!userToken) {
            navigate("/");
        } else {
            requestData();
        }
    }, [userToken]);

    const transactionButton = (tipo) => {
        navigate(`/nova-transacao/${tipo}`);
    };

    const logOff = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        navigate("/");
    };

    return (
        <HomeContainer>
            <HomeTitle>
                <h1 data-test="user-name">Olá, {userName}</h1>
                <BiExit data-test="logout" onClick={logOff} />
            </HomeTitle>
            <TransactionList>
                <ul>
                    {userTransactions.length > 0 ? (
                        userTransactions.map((t) => (
                            <Item key={t.id}>
                                <div>
                                    <span>{t.date}</span>
                                    <strong data-test="registry-name">
                                        {t.description}
                                    </strong>
                                </div>
                                <Value
                                    color={
                                        t.type === "entrada"
                                            ? "positivo"
                                            : "negativo"
                                    }
                                    data-test="registry-amount"
                                >
                                    {t.value}
                                </Value>
                            </Item>
                        ))
                    ) : (
                        <NoTransactions>
                            Não há registros de <br /> entrada ou saída
                        </NoTransactions>
                    )}
                </ul>
                {userTransactions.length > 0 ? (
                    <article>
                        <strong>SALDO</strong>
                        <Value
                            color={userBalance >= 0 ? "positivo" : "negativo"}
                            data-test="total-amount"
                        >
                            {userBalance}
                        </Value>
                    </article>
                ) : (
                    ""
                )}
            </TransactionList>
            <ButtonsContainer>
                <button
                    onClick={() => transactionButton("entrada")}
                    data-test="new-income"
                >
                    <AiOutlinePlusCircle />
                    <p>
                        Nova <br /> entrada
                    </p>
                </button>
                <button
                    onClick={() => transactionButton("saida")}
                    data-test="new-expense"
                >
                    <AiOutlineMinusCircle />
                    <p>
                        Nova <br />
                        saída
                    </p>
                </button>
            </ButtonsContainer>
        </HomeContainer>
    );
}

const HomeTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2px 5px 2px;
    margin-bottom: 15px;
    font-size: 26px;
    color: white;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
`;

const NoTransactions = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    font-size: 25px;
    font-family: "Roboto", sans-serif;
    color: #868686;
`;

const TransactionList = styled.div`
    flex-grow: 1;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    article {
        display: flex;
        justify-content: space-between;
        strong {
            font-weight: 700;
            text-transform: uppercase;
        }
    }
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    color: #000000;
    margin-right: 10px;
    div span {
        color: #c6c6c6;
        margin-right: 10px;
    }
`;
const Date = styled.p`
    color: #c6c6c6;
`;
const Description = styled.p`
    color: black;
`;
const ButtonsContainer = styled.section`
    margin-top: 15px;
    margin-bottom: 0;
    display: flex;
    gap: 15px;

    button {
        width: 50%;
        height: 115px;
        font-size: 22px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        p {
            font-size: 18px;
        }
    }
`;
const Value = styled.div`
    font-size: 16px;
    text-align: right;
    color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
