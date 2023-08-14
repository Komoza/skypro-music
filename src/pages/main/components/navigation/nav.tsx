import React from 'react';
import * as S from './nav.style';
import { removeUserFromLocalStorage } from '../../../../helper';
import { Song } from '../../../../App';

interface navProps {
    isOpenNavAnimation: boolean;
    setIsOpenNavAnumation: (value: boolean) => void;
    setIsNavOpen: (value: boolean) => void;
    setCurrentSong: (value: Song | null) => void;
}

export const Nav: React.FC<navProps> = ({
    isOpenNavAnimation,
    setIsOpenNavAnumation,
    setIsNavOpen,
    setCurrentSong,
}) => {
    // остановка закрытия окна при клике на панель навигация
    const handleClickNav = (
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    // закрытие на иконку крестика
    const handleCloseClick = () => {
        setIsOpenNavAnumation(false);

        setTimeout(() => {
            setIsNavOpen(false);
        }, 500);
    };

    const handleClickLogout = () => {
        removeUserFromLocalStorage();
        setCurrentSong(null);
    };

    return (
        <S.nav
            $isOpen={isOpenNavAnimation}
            onClick={(event) => handleClickNav(event)}
        >
            <S.navLogo>
                <S.logoImage src="./src/img/logo.png" alt="logo" />
                <S.navClose
                    onClick={handleCloseClick}
                    src="./src/img/icon/close.svg"
                    alt="Закрыть"
                />
            </S.navLogo>
            <S.menu>
                <S.menuList>
                    <S.menuItem>
                        <S.menuLink to="/">Главная</S.menuLink>
                    </S.menuItem>
                    <S.menuItem>
                        <S.menuLink to="/playlist">Мой плейлист</S.menuLink>
                    </S.menuItem>
                    <S.menuItem>
                        <S.menuLink onClick={handleClickLogout} to="/login">
                            Выйти
                        </S.menuLink>
                    </S.menuItem>
                </S.menuList>
            </S.menu>
        </S.nav>
    );
};
