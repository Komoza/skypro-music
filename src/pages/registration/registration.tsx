import { useRef, useState } from 'react';
import * as S from './registration.style';
import { useNavigate } from 'react-router-dom';
import { saveUserToLocalStorage } from '../../helper';
import { User } from '../../App';
import { registrationAPI } from '../../api';

interface RegistrationProps {
    setUser: (value: User | null) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ setUser }) => {
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [connectToServer, setConnectToServer] = useState<boolean>(false);

    const mailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPassRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const validateAndRegistration = async () => {
        setConnectToServer(true);
        try {
            let email = '';
            let password = '';

            if (mailRef.current && passwordRef.current) {
                email = mailRef.current.value;
                password = passwordRef.current.value;
            }

            const userData: User = (await registrationAPI(
                email,
                password
            )) as User;

            setUser(userData);
            saveUserToLocalStorage(userData);
            setErrorMessage(null);
            navigate('/', { replace: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setConnectToServer(false);
        }
    };

    const handleClickRegistration = () => {
        if (!mailRef.current?.value) {
            setErrorMessage('Заполните почту');
            return;
        }
        if (!passwordRef.current?.value) {
            setErrorMessage('Введите пароль');
            return;
        }
        if (passwordRef.current?.value !== confirmPassRef.current?.value) {
            setErrorMessage('Пароли не совпадают');
            return;
        }

        void validateAndRegistration();
    };

    return (
        <S.registration>
            <S.registrationWrap>
                <S.registrationLogo
                    src="./src/img/logo-black.png"
                    alt="Логотип"
                />
                <S.registrationName
                    ref={mailRef}
                    type="text"
                    placeholder="Почта"
                />
                <S.registrationPassword
                    ref={passwordRef}
                    type="password"
                    placeholder="Пароль"
                />
                <S.registrationRepeatPass
                    ref={confirmPassRef}
                    type="password"
                    placeholder="Повторите пароль"
                />
                {errorMessage && (
                    <S.errorMessage>{errorMessage}</S.errorMessage>
                )}
                {connectToServer ? (
                    <S.registrationRegistrationLoad>
                        Загрузка...
                    </S.registrationRegistrationLoad>
                ) : (
                    <S.registrationRegistration
                        onClick={handleClickRegistration}
                    >
                        Зарегистрироваться
                    </S.registrationRegistration>
                )}
            </S.registrationWrap>
        </S.registration>
    );
};
