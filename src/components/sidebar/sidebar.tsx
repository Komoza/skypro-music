interface SidebarProps {
    isLoadApp: Boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isLoadApp }) => {
    return (
        <div className="main__sidebar sidebar">
            <div className="sidebar__personal">
                <p className="sidebar__personal-name">Sergey.Ivanov</p>
                <div className="sidebar__avatar"></div>
            </div>
            <div className="sidebar__block">
                <div className="sidebar__list">
                    <div
                        className={`sidebar__item ${
                            isLoadApp ? '' : 'sidebar__item--loading'
                        }`}
                    >
                        {isLoadApp && (
                            <a className="sidebar__link" href="#">
                                <img
                                    className="sidebar__img"
                                    src="./src/img/playlist01.png"
                                    alt="day's playlist"
                                />
                            </a>
                        )}
                    </div>
                    <div
                        className={`sidebar__item ${
                            isLoadApp ? '' : 'sidebar__item--loading'
                        }`}
                    >
                        {isLoadApp && (
                            <a className="sidebar__link" href="#">
                                <img
                                    className="sidebar__img"
                                    src="./src/img/playlist02.png"
                                    alt="day's playlist"
                                />
                            </a>
                        )}
                    </div>
                    <div
                        className={`sidebar__item ${
                            isLoadApp ? '' : 'sidebar__item--loading'
                        }`}
                    >
                        {isLoadApp && (
                            <a className="sidebar__link" href="#">
                                <img
                                    className="sidebar__img"
                                    src="./src/img/playlist03.png"
                                    alt="day's playlist"
                                />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
