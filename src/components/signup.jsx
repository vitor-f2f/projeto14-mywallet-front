import styled from "styled-components";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [signupEmail, setEmail] = useState("");
    const [signupName, setName] = useState("");
    const [signupPassword, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const signupObj = {
        email: "",
        name: "",
        password: "",
    };

    function validateEmail(email) {
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    function sendSignup() {
        if (signupEmail === "" || signupName === "" || signupPassword === "") {
            alert("Preencha todos os dados para prosseguir.");
            return;
        }
        if (!validateEmail(signupEmail)) {
            alert("Insira um endereço de e-mail válido.");
            return;
        }
        if (signupPassword !== confirmPassword) {
            alert("Falha ao confirmar senha.");
            return;
        }
        setLoading(true);
        signupObj.email = signupEmail;
        signupObj.name = signupName;
        signupObj.password = signupPassword;
        console.log(signupObj);
        const promise = axios.post(
            `${import.meta.env.VITE_API_URL}/signup`,
            signupObj
        );
        promise
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                alert(`Erro ${err.response.status}`);
            });
        setLoading(false);
    }

    return (
        <SignupContainer>
            <span>MyWallet</span>
            <SignupForm>
                <input
                    type="text"
                    placeholder="Nome"
                    value={signupName}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading}
                    data-test="name"
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    autoComplete="new-email"
                    value={signupEmail}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                    data-test="email"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    autoComplete="new-password"
                    value={signupPassword}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                    data-test="password"
                />
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirm(event.target.value)}
                    disabled={loading}
                    data-test="conf-password"
                />
                <button
                    onClick={sendSignup}
                    disabled={loading}
                    data-test="sign-up-submit"
                >
                    {loading ? `...` : `Cadastrar`}
                </button>
                <Link to={`/`}>Já tem uma conta? Entre agora!</Link>
            </SignupForm>
        </SignupContainer>
    );
}

const SignupContainer = styled.div`
    span {
        font-family: "Saira Stencil One";
        font-size: 32px;
        font-weight: 400;
        line-height: 50px;
        color: white;
    }
    font-size: 30px;
    padding: 0 38px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    text-align: center;
    height: 100vh;
`;

const SignupForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 16px;
`;
