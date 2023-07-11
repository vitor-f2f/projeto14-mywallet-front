import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import NewTransaction from "./components/transaction";
import UserContext from "./components/usercontext";

function App() {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <PagesContainer>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="/cadastro" element={<SignUp />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route
                            path="/nova-transacao/:tipo"
                            element={<NewTransaction />}
                        />
                    </Routes>
                </BrowserRouter>
            </PagesContainer>
        </UserContext.Provider>
    );
}

export default App;

const PagesContainer = styled.main`
    background-color: #8c11be;
    width: calc(100vw - 50px);
    max-height: 100vh;
    padding: 25px;
`;
