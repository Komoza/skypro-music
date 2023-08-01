import * as S from './compilation.style';
import { useParams } from 'react-router-dom';
import { PLAYLIST } from '../../cosntant';

export const Compilation = () => {
    const params = useParams();
    const compilation = PLAYLIST.find((item) => item.id === Number(params.id));
    return (
        <S.compilation>
            Страница&nbsp;
            <S.compilationText>{compilation?.name}</S.compilationText>
        </S.compilation>
    );
};
