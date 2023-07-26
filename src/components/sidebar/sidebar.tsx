import * as S from './sidebar.style';

interface SidebarProps {
    isLoadApp: Boolean;
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
                    <S.sidebarItem $isLoadApp={isLoadApp}>
                        {isLoadApp && (
                            <S.sidebarLink href="#">
                                <S.sidebarImg
                                    src="./src/img/playlist01.png"
                                    alt="day's playlist"
                                />
                            </S.sidebarLink>
                        )}
                    </S.sidebarItem>
                    <S.sidebarItem $isLoadApp={isLoadApp}>
                        {isLoadApp && (
                            <S.sidebarLink href="#">
                                <S.sidebarImg
                                    src="./src/img/playlist02.png"
                                    alt="day's playlist"
                                />
                            </S.sidebarLink>
                        )}
                    </S.sidebarItem>
                    <S.sidebarItem $isLoadApp={isLoadApp}>
                        {isLoadApp && (
                            <S.sidebarLink href="#">
                                <S.sidebarImg
                                    src="./src/img/playlist03.png"
                                    alt="day's playlist"
                                />
                            </S.sidebarLink>
                        )}
                    </S.sidebarItem>
                </S.sidebarList>
            </S.sidebarBlock>
        </S.sidebar>
    );
};
