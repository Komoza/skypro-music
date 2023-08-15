import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *:before,
    *:after {
        box-sizing: border-box;
    }
    a,
    a:visited {
        text-decoration: none;
        font-family: 'StratosSkyeng', sans-serif;
        cursor: pointer;
    }
    
    button,
    ._btn {
        cursor: pointer;
    }

    ul li {
        list-style: none;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        font-family: 'StratosSkyeng', sans-serif;
        color: #ffffff;
    }

    ._btn-text:hover {
        border-color: #d9b6ff;
        color: #d9b6ff;
        cursor: pointer;
    }

    ._btn-icon:hover svg {
        fill: transparent;
        stroke: #acacac;
        cursor: pointer;
    }

    ._btn-text:active {
        border-color: #ad61ff;
        color: #ad61ff;
        cursor: pointer;
    }

    ._btn-icon:active svg {
        fill: transparent;
        stroke: #ffffff;
        cursor: pointer;
    }

    ._btn-icon:active .track-play__like-svg,
    ._btn-icon:active .track-play__dislike-svg {
        fill: #696969;
        stroke: #ffffff;
        cursor: pointer;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: #313131;
        }
        100% {
            background-color: #464646;
        }
    }

`;
