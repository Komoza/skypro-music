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
    items.sort();
    const uniqueAuthors = [...new Set(items)];
    return uniqueAuthors.map((author, index) => (
        <S.authorsText key={index}>{author}</S.authorsText>
    ));
};

const AllGenre: React.FC<FilterItemProps> = ({ items }) => {
    items.sort();
    const uniqueGenres = [...new Set(items)];
    return uniqueGenres.map((genre, index) => (
        <S.genreText key={index}>{genre}</S.genreText>
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
                author: filtersState.author,
                genre: filtersState.genre,
                years: status,
            })
        );
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
                    {filter === 'authors' && (
                        <S.authors>
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
                    {filter === 'genres' && (
                        <S.genre>
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
                        <S.years>
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
