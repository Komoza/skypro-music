import { styled } from 'styled-components';

interface Props {
    $active: boolean;
}

export const filter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 51px;
`;
export const filterTitle = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-right: 15px;
`;
export const filterButton = styled.div<Props>`
    position: relative;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    border: 1px solid #ffffff;
    border-radius: 60px;
    padding: 6px 20px;

    &:not(:last-child) {
        margin-right: 10px;
    }

    ${(props) =>
        props.$active &&
        `
            color: #b672ff;
            border: 1px solid #9a48f1;
            &:hover {
                color: #b672ff !important;
                border: 1px solid #9a48f1 !important;
            }
            `}
`;

const authGenreProps = `
    width: 248px;
    max-height: 305px;
    position: absolute;
    top: 50px;
    left: 0;
    padding: 34px 0 34px 34px;
    border-radius: 12px;
    background: #313131;
`;

const authGenreWrapProps = `
    max-height: 237px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

const authGenreTextProps = `
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    &:hover {
        color: #cda4fa;
    }
`;

export const authors = styled.div`
    ${authGenreProps}
`;
export const authorsWrap = styled.div`
    ${authGenreWrapProps}
`;
export const authorsText = styled.p`
    ${authGenreTextProps}
`;

export const years = styled.div`
    width: 404px;
    position: absolute;
    display: flex;
    gap: 28px;
    top: 50px;
    left: 0;
    padding: 34px;
    border-radius: 12px;
    background: #313131;

    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

const newOldProps = `
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
        color: #cda4fa;
    }
`;
export const yearsNew = styled.div`
    ${newOldProps}
`;
export const yearsOld = styled.div`
    ${newOldProps}
`;
export const yearsPoint = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const yearsPointActive = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
`;

export const genre = styled.div`
    ${authGenreProps}
`;
export const genreWrap = styled.div`
    ${authGenreWrapProps}
`;
export const genreText = styled.p`
    ${authGenreTextProps}
`;
