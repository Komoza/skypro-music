import * as S from './sidebar.style';
import { selections } from '../../../../cosntant';
import { removeUserFromLocalStorage } from '../../../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';
import { currentPage, user } from '../../../../store/actions/creators/creators';
import { useGetAllTracksQuery } from '../../../../services/tracks';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const { isLoading: loadingApp } = useGetAllTracksQuery();

    const userState = useSelector((state: RootState) => state.otherState.user);

    const handleClickLogout = () => {
        dispatch(user(null));
        removeUserFromLocalStorage();
    };
    const handleClickSelector = (id: number) => {
        dispatch(currentPage(`/compilation/${id}`));
    };
    return (
        <S.sidebar>
            <S.sidebarPersonal>
                {userState && (
                    <S.sidebarPersonalName>{`Здравствуйте, ${userState.username}`}</S.sidebarPersonalName>
                )}
                <S.sidebarLogout onClick={handleClickLogout}>
                    Выйти
                </S.sidebarLogout>
            </S.sidebarPersonal>
            <S.sidebarBlock>
                <S.sidebarList>
                    {selections.map((item) => {
                        return (
                            <S.sidebarItem
                                key={item.id}
                                $loadingApp={loadingApp}
                            >
                                {!loadingApp && (
                                    <S.sidebarLink
                                        onClick={() =>
                                            handleClickSelector(item.id)
                                        }
                                        to={`/compilation/${item.id}`}
                                    >
                                        <S.sidebarImg
                                            src={item.img}
                                            alt={item.alt}
                                        />
                                    </S.sidebarLink>
                                )}
                            </S.sidebarItem>
                        );
                    })}
                </S.sidebarList>
            </S.sidebarBlock>
        </S.sidebar>
    );
};
