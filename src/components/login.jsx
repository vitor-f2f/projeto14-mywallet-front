import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./usercontext.js";

export default function Login() {
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");

    const loginObj = {
        email: "",
        password: "",
    };

    function validateEmail(email) {
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    useEffect(() => {
        if (loading) {
            sendLogin();
        }
    }, [loading]);

    function sendLogin() {
        if (userEmail === "" || userPassword === "") {
            alert("Preencha todos os dados para prosseguir.");
            setLoading(false);
            return;
        }
        if (!validateEmail(userEmail)) {
            alert("Endereço de email inválido");
            setLoading(false);
            return;
        }
        loginObj.email = userEmail;
        loginObj.password = userPassword;
        console.log(loginObj);
        const promise = axios.post(
            `${import.meta.env.VITE_API_URL}/signin`,
            loginObj
        );
        promise
            .then((res) => {
                const r = res.data;
                console.log(r);
                setUserData({
                    userToken: r.token,
                });
                const loginData = {
                    savedEmail: userEmail,
                    savedPassword: userPassword,
                };
                localStorage.setItem("loginData", JSON.stringify(loginData));
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                alert(`Erro ${err.response.status}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <LoginContainer>
            <span>MyWallet</span>
            <LoginForm>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={userEmail}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={userPassword}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                />
                <button onClick={() => setLoading(true)} disabled={loading}>
                    {loading ? `...` : `Entrar`}
                </button>
                <Link to={`/cadastro`} className="logintext">
                    Primeira vez? Cadastre-se!
                </Link>
            </LoginForm>
        </LoginContainer>
    );
}
const LoginContainer = styled.div`
    span {
        font-family: "Saira Stencil One";
        font-size: 32px;
        font-weight: 400;
        line-height: 50px;
        color: white;
    }
    padding: 0 38px;
    display: flex;
    flex-direction: column;
    max-width: 412px;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
`;

const LoginForm = styled.div`
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 16px;
`;
