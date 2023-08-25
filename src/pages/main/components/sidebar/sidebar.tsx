import * as S from './sidebar.style';
import { playlist } from '../../../../cosntant';
import { removeUserFromLocalStorage } from '../../../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { MusicState } from '../../../../store/actions/types/types';
import { user } from '../../../../store/actions/creators/creators';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const loadingApp: boolean = useSelector(
        (state: MusicState) => state.loadingApp
    );

    const userState = useSelector((state: MusicState) => state.user);

    const handleClickLogout = () => {
        dispatch(user(null))
        removeUserFromLocalStorage();
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
                    {playlist.map((item) => {
                        return (
                            <S.sidebarItem key={item.id} $loadingApp={loadingApp}>
                                {!loadingApp && (
                                    <S.sidebarLink
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
