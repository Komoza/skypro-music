import * as S from './sidebar.style';
import { playlist } from '../../../../cosntant';
import { Song, User } from '../../../../App';
import { removeUserFromLocalStorage } from '../../../../helper';

interface SidebarProps {
    isLoadApp: boolean;
    user: User | null;
    setCurrentSong: (value: Song | null) => void;
    setUser: (value: User | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isLoadApp,
    user,
    setCurrentSong,
    setUser,
}) => {
    const handleClickLogout = () => {
        setUser(null);
        removeUserFromLocalStorage();
        setCurrentSong(null);
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
                            <S.sidebarItem key={item.id} $isLoadApp={isLoadApp}>
                                {isLoadApp && (
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
