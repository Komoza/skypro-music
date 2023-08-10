import { styled } from 'styled-components';

const trackLoading = `
    animation: skeleton-loading 1s linear infinite alternate;
    height: 19px;
    background-color: #313131;
`;

export const centerblockContent = styled.div`
    display: flex;
    flex-direction: column;
`;
export const playlistTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;
const playlistTitleCol = `
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 2px;
    color: #696969;
    text-transform: uppercase;
`;

export const playlistTitleCol01 = styled.div`
    ${playlistTitleCol}
    width: 447px;
`;
export const playlistTitleCol02 = styled.div`
    ${playlistTitleCol}
    width: 321px;
`;
export const playlistTitleCol03 = styled.div`
    ${playlistTitleCol}
    width: 245px;
`;
export const playlistTitleCol04 = styled.div`
    ${playlistTitleCol}
    width: 60px;
    text-align: end;
`;
export const playlistTitleSvg = styled.svg`
    width: 12px;
    height: 12px;
    fill: transparent;
    stroke: #696969;
`;

export const playlist = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

export const playlistItem = styled.div`
    width: 100%;
    display: block;
    margin-bottom: 12px;
`;

export const track = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    &:hover {
        background-color: #222;
    }
`;

export const trackTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 447px;
`;

const trackTitleImagePattern = `
    width: 51px;
    height: 51px;
    padding: 16px;
    background: #313131;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 17px;
`;
export const trackTitleImage = styled.div`
    ${trackTitleImagePattern}
`;

export const trackTitleImageLoading = styled.div`
    ${trackTitleImagePattern}
    animation: skeleton-loading 1s linear infinite alternate;
`;

export const trackTitleSvg = styled.svg`
    width: 18px;
    height: 17px;
    fill: transparent;
    stroke: #4e4e4e;
`;

export const trackTitleText = styled.div``;

export const trackTitleTextLoading = styled.div`
    ${trackLoading}
    width: 356px;
`;

export const trackTitleLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
`;

export const trackTitleSpan = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #4e4e4e;
`;

export const trackAuthor = styled.div`
    width: 321px;
    display: flex;
    justify-content: flex-start;
`;

export const trackAuthorLoading = styled.div`
    ${trackLoading}
    width: 324px;
`;

export const trackAuthorLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    text-align: left;
`;

export const trackAlbum = styled.div`
    width: 245px;
`;

export const trackAlbumLoading = styled.div`
    ${trackLoading}
    width: 400px;
`;

export const trackAlbumLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #696969;
`;

export const trackTime = styled.div``;

export const trackTimeSvg = styled.svg`
    width: 14px;
    height: 12px;
    margin-right: 17px;
    fill: transparent;
    stroke: #696969;
`;
export const trackTimeText = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: #696969;
`;
export const trackTimeLoading = styled.div`
    animation: skeleton-loading 1s linear infinite alternate;
    height: 19px;
    background-color: #313131;
`;

export const errorGetSongs = styled.p`
    font-size: 32px;
    margin-top: 40px;
`;
