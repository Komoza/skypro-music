import { styled } from 'styled-components';

export const notFound = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const notFoundCode = styled.h1`
    font-size: 160px;
    font-style: normal;
    font-weight: 400;
    line-height: 168px;
`;

export const notFoundTextWrap = styled.div`
    display: flex;
    gap: 8px;
`

export const notFoundText = styled.p`
    margin-top: 3px;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px;
`;

export const notFoundImg = styled.img`

`

export const notFoundDescription = styled.p`
    margin-top: 19px;
    width: 280px;
    text-align: center;
    color: #4e4e4e;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.054px;
`;

export const notFoundButton = styled.button`
    margin-top: 36px;
    border-radius: 6px;
    background-color: #580ea2;
    border: 0;
    padding: 12px 46px;

    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.054px;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;
