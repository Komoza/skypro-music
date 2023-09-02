import { ChangeEvent } from 'react';
import * as S from './search.style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';
import { setDisplayPlaylist } from '../../../../store/actions/creators/creators';

export const Search = () => {
    const dispatch = useDispatch();

    const originPlaylist = useSelector(
        (state: RootState) => state.otherState.originPlaylist
    );

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const newVisualPlaylist = originPlaylist.filter((track) =>
            track.name
                .toLowerCase()
                .includes(
                    event.currentTarget.value.toString().toLocaleLowerCase()
                )
        );
        dispatch(setDisplayPlaylist(newVisualPlaylist));
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
