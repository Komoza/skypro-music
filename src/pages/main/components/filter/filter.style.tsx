import { styled } from 'styled-components';

interface Props {
    $active: boolean;
}

export const filter = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 51px;
    justify-content: space-between;
`;

export const filterLeftWrap = styled.div`
    display: flex;
    align-items: center;
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
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    &:hover {
        color: #cda4fa;
    }
`;

export const authors = styled.div`
    width: 248px;
    ${authGenreProps}
`;
export const authorsWrap = styled.div`
    ${authGenreWrapProps}
`;
export const authorsText = styled.p`
    ${authGenreTextProps}
    color: #fff;
`;
export const authorTextActive = styled.p`
    ${authGenreTextProps}
    color: #b672ff;
`;

export const years = styled.div`
    width: 232px;
    position: absolute;
    flex-direction: column;
    display: flex;
    gap: 20px;
    top: 50px;
    left: 0;
    padding: 34px;
    border-radius: 12px;
    background: #313131;
`;

const yearsItemStyle = `
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    cursor: pointer;

`;
export const yearsItem = styled.p`
    ${yearsItemStyle}
    &:hover {
        color: #cda4fa;
        text-decoration: underline;
    }
`;
export const yearsItemActive = styled.p`
    ${yearsItemStyle}
    color: #b672ff;
    font-weight: bold;
`;

export const genre = styled.div`
    width: 282px;
    ${authGenreProps}
`;
export const genreWrap = styled.div`
    ${authGenreWrapProps}
`;
export const genreText = styled.p`
    ${authGenreTextProps}
    color: #fff;
`;
export const genreTextActive = styled.p`
    ${authGenreTextProps}
    color: #b672ff;
`;

export const filterSortWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const countFilters = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #9a48f1;
    right: -8px;
    top: -9px;

    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;
