import * as S from './login.style';
import { saveUserToLocalStorage } from '../../helper';
import { useNavigate } from 'react-router-dom';
import { User } from '../../App';
import { useRef, useState } from 'react';
import { loginAPI } from '../../api';

interface LoginProps {
    setUser: (value: User) => void;
}

export const Login: React.FC<LoginProps> = ({ setUser }) => {
    const mailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateAndLogin = async () => {
        try {
            let email = '';
            let password = '';

            if (mailRef.current && passwordRef.current) {
                email = mailRef.current.value;
                password = passwordRef.current.value;
            }

            const userData: User = (await loginAPI(email, password)) as User;

            setUser(userData);
            saveUserToLocalStorage(userData);
            setErrorMessage(null);
            navigate('/', { replace: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    };

    const handleClickLogin = () => {
        if (!mailRef.current?.value) {
            setErrorMessage('Заполните почту');
            return;
        }
        if (!passwordRef.current?.value) {
            setErrorMessage('Введите пароль');
            return;
        }

        void validateAndLogin();
    };

    return (
        <S.login>
            <S.loginWrap>
                <S.loginLogo src="./src/img/logo-black.png" alt="Логотип" />
                <S.loginName ref={mailRef} type="text" placeholder="Почта" />
                <S.loginPassword
                    ref={passwordRef}
                    type="password"
                    placeholder="Пароль"
                />
                {errorMessage && (
                    <S.errorMessage>{errorMessage}</S.errorMessage>
                )}
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
