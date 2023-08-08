import * as S from './login.style';
import { saveUserToLocalStorage } from '../../helper';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        saveUserToLocalStorage({ isAllowed: true });
        console.log(1);
        navigate('/', { replace: true });
    };
    return (
        <S.login>
            <S.loginWrap>
                <S.loginLogo src="./src/img/logo-black.png" alt="Логотип" />
                <S.loginName type="text" placeholder="Почта" />
                <S.loginPassword type="text" placeholder="Пароль" />
                <S.loginLogin onClick={handleClickLogin}>Войти</S.loginLogin>
                <S.registrationLink to="/registration">
                    <S.loginRegistration>
                        Зарегистрироваться
                    </S.loginRegistration>
                </S.registrationLink>
            </S.loginWrap>
        </S.login>
    );
};
