import { useDispatch, useSelector } from 'react-redux';
import * as S from './filter.style';
import { filters } from '../../../../store/actions/creators/creators';
import { RootState } from '../../../../store/actions/types/types';
import { useGetAllTracksQuery } from '../../../../services/tracks';
import { useEffect, useState } from 'react';

interface FilterProps {
    filter: string | null;
    setFilter: (value: string | null) => void;
}

interface FilterItemProps {
    items: string[];
}

const AllAuthors: React.FC<FilterItemProps> = ({ items }) => {
    const dispatch = useDispatch();
    const filterState = useSelector(
        (state: RootState) => state.otherState.filters
    );

    const handleClickAddAuthor = (author: string) => {
        const updatedFilters = {
            ...filterState,
            author: [...filterState.author, author],
        };
        dispatch(filters(updatedFilters));
    };

    const handleClickDeleteAuthor = (author: string) => {
        const updateAuthors = [...filterState.author];
        const authorIndex = updateAuthors.indexOf(author);
        updateAuthors.splice(authorIndex, 1);

        const updateFilters = {
            ...filterState,
            author: [...updateAuthors],
        };
        dispatch(filters(updateFilters));
    };

    items.sort();
    const uniqueAuthors = [...new Set(items)];
    return uniqueAuthors.map((author, index) => (
        <div key={index}>
            {!filterState.author.includes(author) ? (
                <S.authorsText onClick={() => handleClickAddAuthor(author)}>
                    {author}
                </S.authorsText>
            ) : (
                <S.authorTextActive
                    onClick={() => handleClickDeleteAuthor(author)}
                >
                    {author}
                </S.authorTextActive>
            )}
        </div>
    ));
};

const AllGenre: React.FC<FilterItemProps> = ({ items }) => {
    const dispatch = useDispatch();
    const filterState = useSelector(
        (state: RootState) => state.otherState.filters
    );

    const handleClickAddGenre = (genre: string) => {
        const updatedFilters = {
            ...filterState,
            genre: [...filterState.genre, genre],
        };
        dispatch(filters(updatedFilters));
    };
    const handleClickDeleteGenre = (genre: string) => {
        const updateGenres = [...filterState.genre];
        const genreIndex = updateGenres.indexOf(genre);
        updateGenres.splice(genreIndex, 1);

        const updateFilters = {
            ...filterState,
            genre: [...updateGenres],
        };
        dispatch(filters(updateFilters));
    };

    items.sort();
    const uniqueGenres = [...new Set(items)];
    return uniqueGenres.map((genre, index) => (
        <div key={index}>
            {filterState.genre.includes(genre) ? (
                <S.genreTextActive
                    onClick={() => handleClickDeleteGenre(genre)}
                >
                    {genre}
                </S.genreTextActive>
            ) : (
                <S.genreText onClick={() => handleClickAddGenre(genre)}>
                    {genre}
                </S.genreText>
            )}
        </div>
    ));
};

export const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    const [authorsFilter, setAuthorFilter] = useState<string[]>([
        'Загрузка...',
    ]);
    const [genresFilter, setGenresFilter] = useState<string[]>(['Загрузка...']);
    const { data: playlistState } = useGetAllTracksQuery();
    const filtersState = useSelector(
        (state: RootState) => state.otherState.filters
    );

    useEffect(() => {
        if (playlistState) {
            setAuthorFilter(playlistState.map((track) => track.author));
            setGenresFilter(playlistState.map((track) => track.genre));
        }
    }, [playlistState]);

    const dispatch = useDispatch();

    const handleClickSortYears = (status: string) => {
        dispatch(
            filters({
                ...filtersState,
                years: status,
            })
        );
        setFilter(null);
    };

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
            <S.filterLeftWrap>
                <S.filterTitle>Искать по:</S.filterTitle>
                <S.filterButton
                    className="_btn-text"
                    $active={filter === 'authors' ? true : false}
                    onClick={(event) => handleClickFilter(event, 'authors')}
                >
                    исполнителю
                    {filtersState.author.length > 0 && (
                        <S.countFilters>
                            {filtersState.author.length}
                        </S.countFilters>
                    )}
                    {filter === 'authors' && (
                        <S.authors onClick={(event) => event.stopPropagation()}>
                            <S.authorsWrap>
                                <AllAuthors items={authorsFilter} />
                            </S.authorsWrap>
                        </S.authors>
                    )}
                </S.filterButton>
                <S.filterButton
                    className="_btn-text"
                    $active={filter === 'genres' ? true : false}
                    onClick={(event) => handleClickFilter(event, 'genres')}
                >
                    жанру
                    {filtersState.genre.length > 0 && (
                        <S.countFilters>
                            {filtersState.genre.length}
                        </S.countFilters>
                    )}
                    {filter === 'genres' && (
                        <S.genre onClick={(event) => event.stopPropagation()}>
                            <S.genreWrap>
                                <AllGenre items={genresFilter} />
                            </S.genreWrap>
                        </S.genre>
                    )}
                </S.filterButton>
            </S.filterLeftWrap>

            <S.filterSortWrap>
                <S.filterTitle>Сортировка:</S.filterTitle>
                <S.filterButton
                    className="_btn-text"
                    $active={filter === 'years' ? true : false}
                    onClick={(event) => handleClickFilter(event, 'years')}
                >
                    {filtersState.years}
                    {filter === 'years' && (
                        <S.years onClick={(event) => event.stopPropagation()}>
                            {filtersState.years === 'По умолчанию' ? (
                                <S.yearsItemActive>
                                    По умолчанию
                                </S.yearsItemActive>
                            ) : (
                                <S.yearsItem
                                    onClick={() =>
                                        handleClickSortYears('По умолчанию')
                                    }
                                >
                                    По умолчанию
                                </S.yearsItem>
                            )}
                            {filtersState.years === 'Сначала новые' ? (
                                <S.yearsItemActive>
                                    Сначала новые
                                </S.yearsItemActive>
                            ) : (
                                <S.yearsItem
                                    onClick={() =>
                                        handleClickSortYears('Сначала новые')
                                    }
                                >
                                    Сначала новые
                                </S.yearsItem>
                            )}
                            {filtersState.years === 'Сначала старые' ? (
                                <S.yearsItemActive>
                                    Сначала старые
                                </S.yearsItemActive>
                            ) : (
                                <S.yearsItem
                                    onClick={() =>
                                        handleClickSortYears('Сначала старые')
                                    }
                                >
                                    Сначала старые
                                </S.yearsItem>
                            )}
                        </S.years>
                    )}
                </S.filterButton>
            </S.filterSortWrap>
        </S.filter>
    );
};
