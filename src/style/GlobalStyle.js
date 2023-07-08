import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Raleway';
        background-color: #8c11be;
    }
    a:visited { text-decoration: none; }
    a:hover { text-decoration: none; }
    a:focus { text-decoration: none; }
    a:active { text-decoration: none; }
    a {
        text-decoration: underline;
        color: white;
        font-size: 14px;
        font-weight: 400;
        font-family: 'Raleway';
    }
    body {
        display: flex;
        justify-content: center;
        
    }
    input {
        height: 52px;
        border-radius: 8px;
        padding-left: 14px;
        border: none;
        background-color: white;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        border: none;
        height: 52px;
        background-color: #a328d6;
        color: white;
        font-size: 14px;
        font-weight: 700;
    }
`;

export default GlobalStyle;
