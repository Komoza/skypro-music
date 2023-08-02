import { styled } from 'styled-components';

export const registration = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const registrationWrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 38px;
    background-color: #fff;
    width: 366px;
    border-radius: 12px;
    padding: 43px;
`;

export const registrationLogo = styled.img`
    width: 140px;
`;

const registrationInput = `
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
export const registrationName = styled.input`
    ${registrationInput}
    margin-top: 4px;
`;

export const registrationPassword = styled.input`
    ${registrationInput}
`;

export const registrationRepeatPass = styled.input`
    ${registrationInput}
`;

export const registrationRegistration = styled.div`
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
    background-color: #580ea2;
    margin-top: 22px;
    &:hover {
        opacity: 0.8;
    }
`;
