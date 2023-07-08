import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
// import Home from "./components/home";
// import CashIn from "./components/cashin";
// import CashOut from "./components/cashout";
import UserContext from "./components/usercontext";

function App() {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/cadastro" element={<SignUp />}></Route>
                    {/* <Route path="/home" element={<Home />}></Route>
                    <Route
                        path="/nova-transacao/entrada"
                        element={<CashIn />}
                    ></Route>
                    <Route
                        path="/nova-transacao/saida"
                        element={<CashOut />}
                    ></Route> */}
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
