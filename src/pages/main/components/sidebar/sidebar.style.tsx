import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
    $isLoadApp: boolean;
}

export const sidebar = styled.div`
    max-width: 418px;
    padding: 20px 90px 20px 78px;
`;

export const sidebarPersonal = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 12px 0 15px 0;
`;
export const sidebarPersonalName = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    margin-right: 16px;
`;
export const sidebarLogout = styled.button`
    text-decoration: underline;
    background: none;
    border: 0;

    color: white;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export const sidebarBlock = styled.div`
    height: 100%;
    padding: 240px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const sidebarList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const sidebarItem = styled.div<Props>`
    width: 250px;
    height: 150px;
    &:not(:last-child) {
        margin-bottom: 30px;
    }

    ${(props) =>
        !props.$isLoadApp &&
        `
        background: #313131;
        animation: skeleton-loading 1s linear infinite alternate;
        `}
`;
export const sidebarLink = styled(Link)`
    width: 100%;
    height: 100%;
`;
export const sidebarImg = styled.img`
    width: 100%;
    height: auto;
`;
