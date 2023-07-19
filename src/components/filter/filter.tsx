interface FilterProps {
    filter: string | null;
    setFilter: (value: string | null) => void;
}

const AllAuthors = () => {
    return (
        <div className="authors">
            <div className="authors__wrap">
                <p className="authors__text">Michael Jackson</p>
                <p className="authors__text">Frank Sinatra</p>
                <p className="authors__text">Calvin Harris</p>
                <p className="authors__text">Zhu</p>
                <p className="authors__text">Arctic Monkeys</p>
                <p className="authors__text">Imaging Dragons</p>
            </div>
        </div>
    );
};

const AllYears = () => {
    return (
        <div className="years">
            <div className="years__new">
                <div className="years__point">
                    <div className="years__point--active"></div>
                </div>
                <p>Более новые</p>
            </div>
            <div className="years__old">
                <div className="years__point"></div>
                <p>Более старые</p>
            </div>
        </div>
    );
};

const AllGenre = () => {
    return (
        <div className="genre">
            <div className="genre__wrap">
                <p className="genre__text genre__text--active">Рок</p>
                <p className="genre__text">Хип-хоп</p>
                <p className="genre__text">Поп-музыка</p>
                <p className="genre__text">Техно</p>
                <p className="genre__text">Инди</p>
                <p className="genre__text">Кантри</p>
                <p className="genre__text">Классика</p>
            </div>
        </div>
    );
};

export const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    const handleClickFilter = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        status: string | null
    ) => {
        console.log(1);
        event.stopPropagation();
        if (status === filter) {
            setFilter(null);
        } else {
            setFilter(status);
        }
    };
    return (
        <div className="centerblock__filter filter">
            <div className="filter__title">Искать по:</div>
            <div
                onClick={(event) => handleClickFilter(event, 'authors')}
                className={`filter__button button-author _btn-text ${
                    filter === 'authors' ? 'filter__button--active' : ''
                }`}
            >
                исполнителю
                {filter === 'authors' && <AllAuthors />}
            </div>
            <div
                onClick={(event) => handleClickFilter(event, 'years')}
                className={`filter__button button-year _btn-text ${
                    filter === 'years' ? 'filter__button--active' : ''
                }`}
            >
                году выпуска
                {filter === 'years' && <AllYears />}
            </div>
            <div
                onClick={(event) => handleClickFilter(event, 'genres')}
                className={`filter__button button-genre _btn-text ${
                    filter === 'genres' ? 'filter__button--active' : ''
                }`}
            >
                жанру
                {filter === 'genres' && <AllGenre />}
            </div>
        </div>
    );
};
