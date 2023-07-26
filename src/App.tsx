import { useState, useEffect } from 'react';

import { Bar } from './components/bar/bar';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';
import { Nav } from './components/navigation/nav';
import { Songs } from './components/songs/songs';
import { Search } from './components/search/search';
import { Filter } from './components/filter/filter';

import { GlobalStyle } from './index.style';
import * as S from './App.style';

function App() {
    const [isNavOpen, setIsNavOpen] = useState<Boolean>(false);
    const [isOpenNavAnimation, setIsOpenNavAnimation] = useState(true);
    const [isLoadApp, setIsLoadApp] = useState<Boolean>(false);
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadApp(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleClickBurger = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        // остановка срабатывания закрытия окна при клике на контейнер
        event.stopPropagation();
        setIsOpenNavAnimation(true);
        setIsNavOpen(true);
    };

    // зарытие окон при клике на любое место
    const handleClickContainer = () => {
        setFilter(null);
        // Сначала отработка анимации закрытия, потом переопределние состояния
        setIsOpenNavAnimation(false);

        setTimeout(() => {
            setIsNavOpen(false);
        }, 500);
    };
    return (
        <>
            <GlobalStyle />
            <S.wrapper onClick={handleClickContainer}>
                <S.container>
                    <S.main>
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
                            />
                        )}
                        <S.centerblock>
                            <Search />
                            <S.centerblockH2>Треки</S.centerblockH2>
                            <Filter filter={filter} setFilter={setFilter} />
                            <Songs isLoadApp={isLoadApp} />
                        </S.centerblock>
                        <Sidebar isLoadApp={isLoadApp} />
                    </S.main>

                    <Bar isAppLoad={isLoadApp} />
                    <Footer />
                </S.container>
            </S.wrapper>
        </>
    );
}

export default App;
