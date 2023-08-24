import { GlobalStyle } from './index.style';
import * as S from './App.style';
import './fonts.css';

import { AppRoutes } from './routes';
import { getUserFromLocalStorage } from './helper';
import React, { useEffect, useState } from 'react';
import { getAllSongs } from './api';
import { Track } from './store/actions/types/types';
import { useDispatch } from 'react-redux';
import { loadingApp, setPlaylist } from './store/actions/creators/creators';

export interface AccessToken {
    refresh: string;
    access: string;
}
export interface User {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    username: string;
    accessToken: AccessToken;
}
export const UserContext = React.createContext<User | null>(null);

function App() {
    const dispatch = useDispatch();

    const [user, setUser] = useState<null | User>(getUserFromLocalStorage());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Track[] = await getAllSongs();
                dispatch(setPlaylist(data));
            } catch (error) {
                dispatch(setPlaylist([]));
            } finally {
                dispatch(loadingApp(false));
            }
        };

        void fetchData();
    }, [dispatch]);

    return (
        <>
            <GlobalStyle />
            <S.wrapper>
                <S.container>
                    <UserContext.Provider value={user}>
                        <AppRoutes setUser={setUser} />
                    </UserContext.Provider>
                </S.container>
            </S.wrapper>
        </>
    );
}

export default App;
