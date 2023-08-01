import { Main } from './pages/main/main';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { NotFoundPage } from './pages/not-found/not-found';
import { Compilation } from './pages/compilation/compilation';
import { MyPlaylist } from './pages/my-playlist/my-playlist';

import { GlobalStyle } from './index.style';
import * as S from './App.style';

function App() {
    return (
        <>
            <GlobalStyle />
            <S.wrapper>
                <S.container>
                    {/* <Login /> */}
                    {/* <Main /> */}
                    {/* <Registration /> */}
                    {/* <NotFoundPage /> */}
                    {/* <Compilation /> */}
                    {/* <MyPlaylist /> */}
                </S.container>
            </S.wrapper>
        </>
    );
}

export default App;
