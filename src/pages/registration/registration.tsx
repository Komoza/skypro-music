import * as S from './registration.style';

export const Registration = () => {
    return (
        <S.registration>
            <S.registrationWrap>
                <S.registrationLogo
                    src="./src/img/logo-black.png"
                    alt="Логотип"
                />
                <S.registrationName type="text" placeholder="Почта" />
                <S.registrationPassword type="text" placeholder="Пароль" />
                <S.registrationRepeatPass type="text" placeholder="Повторите пароль" />
                <S.registrationRegistration>
                    Зарегистрироваться
                </S.registrationRegistration>
            </S.registrationWrap>
        </S.registration>
    );
};
