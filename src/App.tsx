import { GlobalStyle } from './index.style';
import * as S from './App.style';
import { AppRoutes } from './routes';
import { getUserFromLocalStorage } from './helper';
import { useEffect, useState } from 'react';
import { getAllSongs } from './api';

export interface Song {
    album: string;
    author: string;
    duration_in_seconds: number;
    genre: string;
    id: number;
    logo: null;
    name: string;
    release_date: string;
    track_file: string;
}

const isUser = getUserFromLocalStorage();
const user = isUser ? isUser : { isAllowed: false };

function App() {
    const [isLoadApp, setIsLoadApp] = useState<boolean>(false);
    const [songs, setSongs] = useState<Song[] | null>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isErrorGetAllSong, setIsErrorGetAllSong] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSongs();
                setSongs(data);
            } catch (error) {
                console.log(1);
                setIsErrorGetAllSong(true);
            } finally {
                setIsLoadApp(true);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <GlobalStyle />
            <S.wrapper>
                <S.container>
                    <AppRoutes
                        isLoadApp={isLoadApp}
                        user={user}
                        songs={songs}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        isErrorGetAllSong={isErrorGetAllSong}
                    />
                </S.container>
            </S.wrapper>
        </>
    );
}

export default App;
