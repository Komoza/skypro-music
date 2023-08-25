import { GlobalStyle } from './index.style';
import * as S from './App.style';
import './fonts.css';

import { AppRoutes } from './routes';
import { useDispatch } from 'react-redux';
import { currentPage, user } from './store/actions/creators/creators';
import { getUserFromLocalStorage } from './helper';

function App() {
    const dispatch = useDispatch();
    dispatch(currentPage(window.location.pathname));
    dispatch(user(getUserFromLocalStorage()));

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
