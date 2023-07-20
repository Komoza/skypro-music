import React from 'react';

interface navProps {
    refNav: React.RefObject<HTMLDivElement>;
    setIsNavOpen: (value: boolean) => void;
}

export const Nav: React.FC<navProps> = ({ refNav, setIsNavOpen }) => {

    // остановка закрытия окна при клике на панель навигация
    const handleClickNav = (
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    // закрытие на иконку крестика
    const handleCloseClick = () => {
        if (refNav.current) refNav.current.classList.add('slide-out');

        setTimeout(() => {
            setIsNavOpen(false);
        }, 500);
    };
    return (
        <nav
            onClick={(event) => handleClickNav(event)}
            ref={refNav}
            className="main__nav nav"
        >
            <div className="nav__logo logo">
                <img
                    className="logo__image"
                    src="./src/img/logo.png"
                    alt="logo"
                />
                <img
                    onClick={handleCloseClick}
                    src="./src/img/icon/close.svg"
                    className="nav__close"
                    alt="Закрыть"
                />
            </div>
            <div className="nav__menu menu">
                <ul className="menu__list">
                    <li className="menu__item">
                        <a href="http://" className="menu__link">
                            Главное
                        </a>
                    </li>
                    <li className="menu__item">
                        <a href="http://" className="menu__link">
                            Мой плейлист
                        </a>
                    </li>
                    <li className="menu__item">
                        <a href="http://" className="menu__link">
                            Войти
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
