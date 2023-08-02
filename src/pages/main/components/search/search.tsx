import * as S from './search.style';

export const Search = () => {
    return (
        <S.search>
            <S.searchSvg>
                <use xlinkHref="./src/img/icon/sprite.svg#icon-search"></use>
            </S.searchSvg>
            <S.searchText type="search" placeholder="Поиск" name="search" />
        </S.search>
    );
};
