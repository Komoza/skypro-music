import * as S from './sidebar.style';
import { playlist } from '../../../../cosntant';

interface SidebarProps {
    isLoadApp: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isLoadApp }) => {
    return (
        <S.sidebar>
            <S.sidebarPersonal>
                <S.sidebarPersonalName>Sergey.Ivanov</S.sidebarPersonalName>
                <S.sidebarAvatar className="sidebar__avatar"></S.sidebarAvatar>
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
