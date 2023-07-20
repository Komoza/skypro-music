import { useState, useRef, useEffect } from 'react';

import { Bar } from './components/bar/bar';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';
import { Nav } from './components/navigation/nav';
import { Songs } from './components/songs/songs';
import { Search } from './components/search/search';
import { Filter } from './components/filter/filter';

function App() {
    const [isNavOpen, setIsNavOpen] = useState<Boolean>(false);
    const [isLoadApp, setIsLoadApp] = useState<Boolean>(false);
    const [filter, setFilter] = useState<string | null>(null);

    const refNav = useRef<HTMLDivElement | null>(null);

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
        setIsNavOpen(true);
    };

    // зарытие окон при клике на любое место
    const handleClickContainer = () => {
        setFilter(null);
        // Сначала отработка анимации закрытия, потом переопределние состояния
        if (refNav.current) refNav.current.classList.add('slide-out');

        setTimeout(() => {
            setIsNavOpen(false);
        }, 500);
    };
    return (
        <div onClick={handleClickContainer} className="wrapper">
            <div className="container">
                <main className="main">
                    <img
                        onClick={(event) => handleClickBurger(event)}
                        className="nav__burger burger"
                        src="./src/img/icon/burger.svg"
                        alt="открыть меню"
                    />
                    {isNavOpen && (
                        <Nav refNav={refNav} setIsNavOpen={setIsNavOpen} />
                    )}
                    <div className="main__centerblock centerblock">
                        <Search />
                        <h2 className="centerblock__h2">Треки</h2>
                        <Filter filter={filter} setFilter={setFilter} />
                        <Songs isLoadApp={isLoadApp} />
                    </div>
                    <Sidebar isLoadApp={isLoadApp} />
                </main>

                <Bar isAppLoad={isLoadApp} />
                <Footer />
            </div>
        </div>
    );
}

export default App;
