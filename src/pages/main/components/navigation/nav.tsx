import React from 'react';
import * as S from './nav.style';

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
                        <S.menuLink href="http://">Главное</S.menuLink>
                    </S.menuItem>
                    <S.menuItem>
                        <S.menuLink href="http://">Мой плейлист</S.menuLink>
                    </S.menuItem>
                    <S.menuItem>
                        <S.menuLink href="http://">Войти</S.menuLink>
                    </S.menuItem>
                </S.menuList>
            </S.menu>
        </S.nav>
    );
};
