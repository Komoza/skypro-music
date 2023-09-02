import { ChangeEvent } from 'react';
import * as S from './search.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';
import { filters } from '../../../../store/actions/creators/creators';

export const Search = () => {
    const dispatch = useDispatch();
    const filterState = useSelector(
        (state: RootState) => state.otherState.filters
    );

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(filters({ ...filterState, searchWords: event.target.value }));
    };
    return (
        <S.search>
            <S.searchSvg>
                <use xlinkHref="/src/img/icon/sprite.svg#icon-search"></use>
            </S.searchSvg>
            <S.searchText
                onChange={(event) => handleChangeSearch(event)}
                type="search"
                placeholder="Поиск"
                name="search"
            />
        </S.search>
    );
};
