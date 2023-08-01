import { GlobalStyle } from './index.style';
import * as S from './App.style';
import { AppRoutes } from './routes';
import { getUserFromLocalStorage } from './helper';

const isUser = getUserFromLocalStorage();
const user = isUser ? isUser : { isAllowed: false };

function App() {
    return (
        <>
            <GlobalStyle />
            <S.wrapper>
                <S.container>
                    <AppRoutes user={user} />
                </S.container>
            </S.wrapper>
        </>
    );
}

export default App;
