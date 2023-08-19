import * as S from './sidebar.style';
import { playlist } from '../../../../cosntant';
import { User } from '../../../../App';
import { removeUserFromLocalStorage } from '../../../../helper';
import { useSelector } from 'react-redux';
import { MusicState } from '../../../../store/actions/types/types';

interface SidebarProps {
    user: User | null;
    setUser: (value: User | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, setUser }) => {
    const loadingApp: boolean = useSelector(
        (state: MusicState) => state.loadingApp
    );

    const handleClickLogout = () => {
        setUser(null);
        removeUserFromLocalStorage();
    };
    return (
        <S.sidebar>
            <S.sidebarPersonal>
                {user && (
                    <S.sidebarPersonalName>{`Здравствуйте, ${user.username}`}</S.sidebarPersonalName>
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
