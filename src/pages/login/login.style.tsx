import { styled } from 'styled-components';

export const login = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const loginWrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
    width: 366px;
    border-radius: 12px;
    padding: 43px;
`;

export const loginLogo = styled.img`
    width: 140px;
`;

const loginInput = `
    width: 100%;
    padding: 8px 0;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.054px;
    border: 0;
    border-bottom: 1px solid #D0CECE;
    outline: none;

    &::placeholder {
        color: #E1E1E1;
    }
`;
export const loginName = styled.input`
    ${loginInput}
    margin-top: 22px;
`;

export const loginPassword = styled.input`
    ${loginInput}
    margin-top: 18px;
`;

const loginButton = `
    width: 100%;
    text-align: center;
    padding: 16px 0;
    border-radius: 6px;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.054px;

    cursor: pointer;
`;

export const loginLogin = styled.div`
    ${loginButton}
    background-color: #580EA2;
    margin-top: 40px;
    &:hover {
        opacity: 0.8;
    }
`;

export const loginRegistration = styled.div`
    ${loginButton}
    color: #000;
    border: 1px solid #d0cece;
    &:hover {
        background-color: #ddd;
    }
`;
