import { useState } from 'react';

import { Bar } from './components/bar/bar';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';
import { Nav } from './components/navigation/nav';
import { Songs } from './components/songs/songs';
import { Search } from './components/search/search';
import { Filter } from './components/filter/filter';

import * as S from '../../App.style';
import { User, UserContext } from '../../App';

interface MainProps {
    setUser: (value: User | null) => void;
}

export const Main: React.FC<MainProps> = ({ setUser }) => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [isOpenNavAnimation, setIsOpenNavAnimation] = useState(true);
    const [filter, setFilter] = useState<string | null>(null);

    // зарытие окон при клике на любое место
    const handleClickContainer = () => {
        setFilter(null);
        // Сначала отработка анимации закрытия, потом переопределние состояния
        setIsOpenNavAnimation(false);
        setTimeout(() => {
            setIsNavOpen(false);
        }, 500);
    };
    const handleClickBurger = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        // остановка срабатывания закрытия окна при клике на контейнер
        event.stopPropagation();
        setIsOpenNavAnimation(true);
        setIsNavOpen(true);
    };

    return (
        <>
            <S.main onClick={handleClickContainer}>
                <S.burger
                    onClick={(event) => handleClickBurger(event)}
                    src="./src/img/icon/burger.svg"
                    alt="открыть меню"
                />
                {isNavOpen && (
                    <Nav
                        isOpenNavAnimation={isOpenNavAnimation}
                        setIsOpenNavAnumation={setIsOpenNavAnimation}
                        setIsNavOpen={setIsNavOpen}
                        setUser={setUser}
                    />
                )}
                <S.centerblock>
                    <Search />
                    <S.centerblockH2>Треки</S.centerblockH2>
                    <Filter filter={filter} setFilter={setFilter} />
                    <Songs />
                </S.centerblock>
                <UserContext.Consumer>
                    {(user) => (
                        <Sidebar
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </UserContext.Consumer>
            </S.main>

            <Bar/>
            <Footer />
        </>
    );
};
