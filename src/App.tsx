import { GlobalStyle } from './index.style';
import * as S from './App.style';
import { AppRoutes } from './routes';

function App() {
    return (
        <>
            <GlobalStyle />
            <S.wrapper>
                <S.container>
                    <AppRoutes />
                </S.container>
            </S.wrapper>
        </>
    );
}

export default App;
