import { styled, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

interface NavProps {
    $isOpen: boolean;
}

const slideIn = keyframes`
    0% {
        left: -302px;
    }
    100% {
        left: 0;
    }
`;
const slideOut = keyframes`
    0% {
        left: 0;
    }
    100% {
        left: -302px;
    }
`;
export const nav = styled.div<NavProps>`
    width: 302px;
    background-color: #1c1c1c;
    padding: 20px 0 20px 36px;
    position: absolute;
    z-index: 100;
    top: 0;
    height: 100vw;
    animation: ${(props) => (props.$isOpen ? slideIn : slideOut)} 0.5s forwards;
`;
export const navLogo = styled.div`
    padding: 13px 20px 13px 0;
    background-color: transparent;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const logoImage = styled.img`
    width: 113.33px;
    height: 17px;
    color: #181818;
`;

export const navClose = styled.img`
    width: 36px;
    cursor: pointer;
`;

export const menu = styled.div`
    display: block;
    visibility: visible;
`;
export const menuList = styled.ul`
    padding: 18px 0 10px 0;
`;
export const menuItem = styled.li`
    padding: 5px 0;
    margin-bottom: 16px;
`;
export const menuLink = styled(Link)`
    color: #ffffff;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
`;
// export const nav = styled.div``
// export const nav = styled.div``
