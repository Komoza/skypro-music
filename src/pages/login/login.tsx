import * as S from './login.style';
import { saveUserToLocalStorage } from '../../helper';
import { useNavigate } from 'react-router-dom';
import { User } from '../../App';

interface LoginProps {
    setUser: (value: User) => void;
}

const userFields: User = {
    isAllowed: false,
};

export const Login: React.FC<LoginProps> = ({ setUser }) => {
    const navigate = useNavigate();

    userFields.isAllowed = true;
    const handleClickLogin = () => {
        saveUserToLocalStorage(userFields);
        setUser(userFields);
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
