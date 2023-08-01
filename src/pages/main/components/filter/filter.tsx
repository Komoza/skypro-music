import * as S from './filter.style';

interface FilterProps {
    filter: string | null;
    setFilter: (value: string | null) => void;
}

const AllAuthors = () => {
    return (
        <S.authors>
            <S.authorsWrap>
                <S.authorsText>Michael Jackson</S.authorsText>
                <S.authorsText>Frank Sinatra</S.authorsText>
                <S.authorsText>Calvin Harris</S.authorsText>
                <S.authorsText>Zhu</S.authorsText>
                <S.authorsText>Arctic Monkeys</S.authorsText>
                <S.authorsText>Imaging Dragons</S.authorsText>
            </S.authorsWrap>
        </S.authors>
    );
};

const AllYears = () => {
    return (
        <S.years>
            <S.yearsNew>
                <S.yearsPoint>
                    <S.yearsPointActive></S.yearsPointActive>
                </S.yearsPoint>
                <p>Более новые</p>
            </S.yearsNew>
            <S.yearsOld>
                <S.yearsPoint></S.yearsPoint>
                <p>Более старые</p>
            </S.yearsOld>
        </S.years>
    );
};

const AllGenre = () => {
    return (
        <S.genre>
            <S.genreWrap>
                <S.genreText>Рок</S.genreText>
                <S.genreText>Хип-хоп</S.genreText>
                <S.genreText>Поп-музыка</S.genreText>
                <S.genreText>Техно</S.genreText>
                <S.genreText>Инди</S.genreText>
                <S.genreText>Кантри</S.genreText>
                <S.genreText>Классика</S.genreText>
            </S.genreWrap>
        </S.genre>
    );
};

export const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    const handleClickFilter = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        status: string | null
    ) => {
        event.stopPropagation();
        if (status === filter) {
            setFilter(null);
        } else {
            setFilter(status);
        }
    };
    return (
        <S.filter>
            <S.filterTitle>Искать по:</S.filterTitle>
            <S.filterButton
                className="_btn-text"
                $active={filter === 'authors' ? true : false}
                onClick={(event) => handleClickFilter(event, 'authors')}
            >
                исполнителю
                {filter === 'authors' && <AllAuthors />}
            </S.filterButton>
            <S.filterButton
                className="_btn-text"
                $active={filter === 'years' ? true : false}
                onClick={(event) => handleClickFilter(event, 'years')}
            >
                году выпуска
                {filter === 'years' && <AllYears />}
            </S.filterButton>
            <S.filterButton
                className="_btn-text"
                $active={filter === 'genres' ? true : false}
                onClick={(event) => handleClickFilter(event, 'genres')}
            >
                жанру
                {filter === 'genres' && <AllGenre />}
            </S.filterButton>
        </S.filter>
    );
};
