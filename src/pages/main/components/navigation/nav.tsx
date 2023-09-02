import React from 'react';
import * as S from './nav.style';
import { removeUserFromLocalStorage } from '../../../../helper';
import { useDispatch } from 'react-redux';
import { currentPage, user } from '../../../../store/actions/creators/creators';

interface navProps {
    isOpenNavAnimation: boolean;
    setIsOpenNavAnumation: (value: boolean) => void;
    setIsNavOpen: (value: boolean) => void;
}

export const Nav: React.FC<navProps> = ({
    isOpenNavAnimation,
    setIsOpenNavAnumation,
    setIsNavOpen,
}) => {
    const dispatch = useDispatch();

    // остановка закрытия окна при клике на панель навигация
    const handleClickNav = (
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    const closeMenu = () => {
        setIsOpenNavAnumation(false);

        setTimeout(() => {
            setIsNavOpen(false);
        }, 500);
    };

    // закрытие на иконку крестика
    const handleCloseClick = () => {
        closeMenu();
    };

    const handleClickLogout = () => {
        closeMenu();
        dispatch(user(null));
        removeUserFromLocalStorage();
    };

    const handleClickMain = () => {
        dispatch(currentPage('/'));
        closeMenu();
    };

    const handleClickMyPlaylist = () => {
        dispatch(currentPage('/playlist'));
        closeMenu();
    }

    return (
        <S.nav
            $isOpen={isOpenNavAnimation}
            onClick={(event) => handleClickNav(event)}
        >
            <S.navLogo>
                <S.logoImage src="/src/img/logo.png" alt="logo" />
                <S.navClose
                    onClick={handleCloseClick}
                    src="/src/img/icon/close.svg"
                    alt="Закрыть"
                />
            </S.navLogo>
            <S.menu>
                <S.menuList>
                    <S.menuItem>
                        <S.menuLink onClick={handleClickMain} to="/">
                            Главная
                        </S.menuLink>
                    </S.menuItem>
                    <S.menuItem>
                        <S.menuLink onClick={handleClickMyPlaylist} to="/playlist">
                            Мой плейлист
                        </S.menuLink>
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
