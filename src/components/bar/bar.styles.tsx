import { styled } from 'styled-components';

interface Props {
    $isAppLoad: Boolean;
}

const btn = `
    cursor: pointer;
`;

export const bar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(28, 28, 28, 0.5);
`;

export const barContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const barPlayerProgress = styled.div`
    width: 100%;
    height: 5px;
    background: #2e2e2e;
`;
export const barPlayerBlock = styled.div`
    height: 73px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const player = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const barVolumeBlock = styled.div`
    width: auto;
    display: flex;
    align-items: center;
    padding: 0 92px 0 0;
`;

export const playerControls = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 27px 0 31px;
`;

const buttonStyle = `
    padding: 5px;
    display: flex;
    align-items: center;
`;

export const playerBtnPrev = styled.div`
    ${buttonStyle + btn}
    margin-right: 23px;
`;
export const playerBtnPrevSvg = styled.svg`
    width: 15px;
    height: 14px;
`;

export const playerBtnPlay = styled.div`
    ${buttonStyle + btn}
    margin-right: 23px;
`;
export const playerBtnPlaySvg = styled.svg`
    width: 22px;
    height: 20px;
    fill: #d9d9d9;
`;

export const playerBtnNext = styled.div`
    ${buttonStyle + btn}
    margin-right: 28px;
    fill: #a53939;
`;
export const playerBtnNextSvg = styled.svg`
    width: 15px;
    height: 14px;
    fill: inherit;
    stroke: #d9d9d9;
`;

export const playerBtnRepeat = styled.div`
    ${buttonStyle + btn}
    margin-right: 24px;
`;
export const playerBtnRepeatSvg = styled.svg`
    width: 18px;
    height: 12px;
    fill: transparent;
    stroke: #696969;
`;

export const playerBtnShuffle = styled.div`
    ${buttonStyle + btn}
    display: flex;
    align-items: center;
`;
export const playerBtnShuffleSvg = styled.svg`
    width: 19px;
    height: 12px;
    fill: transparent;
    stroke: #696969;
`;

export const trackPlay = styled.div`
    display: flex;
    flex-direction: row;
`;

export const trackPlayContain = styled.div`
    width: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'image author' 'image album';
    align-items: center;
`;

export const trackPlayImage = styled.div<Props>`
    width: 51px;
    height: 51px;
    background-color: #313131;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    grid-area: image;

    ${(props) =>
        props.$isAppLoad
            ? ''
            : `
            background: #313131;
            animation: skeleton-loading 1s linear infinite alternate;
    `}
`;

export const trackPlaySvg = styled.svg`
    width: 18px;
    height: 17px;
    fill: transparent;
    stroke: #4e4e4e;
`;

export const trackPlayAuthor = styled.div<Props>`
    grid-area: author;
    min-width: 49px;
    ${(props) =>
        props.$isAppLoad
            ? ''
            : `
            width: 60px;
            height: 16px;
            background: #313131;
            animation: skeleton-loading 1s linear infinite alternate;
            `}
`;

export const trackPlayAuthorLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    white-space: nowrap;
`;

export const trackPlayAlbum = styled.div<Props>`
    grid-area: album;
    min-width: 49px;

    ${(props) =>
        props.$isAppLoad
            ? ''
            : `
            width: 60px;
            height: 16px;
            background: #313131;
            animation: skeleton-loading 1s linear infinite alternate;
            `}
`;

export const trackPlayAlbumLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: #ffffff;
`;

export const trackPlayLikeDis = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 26%;
`;

export const trackPlayLike = styled.div`
    padding: 5px;
`;
export const trackPlayDislike = styled.div`
    padding: 5px;
    margin-left: 28.5px;
`;

export const trackPlayLikeSvg = styled.svg`
    width: 14px;
    height: 12px;
    fill: transparent;
    stroke: #696969;
`;
export const trackPlayDislikeSvg = styled.svg`
    width: 14.34px;
    height: 13px;
    fill: transparent;
    stroke: #696969;
`;

export const volumeContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
`;

export const volumeImage = styled.div`
    width: 13px;
    height: 18px;
    margin-right: 17px;
`;
export const volumeSvg = styled.svg`
    width: 13px;
    height: 18px;
    fill: transparent;
`;
export const volumeProgress = styled.div`
    ${btn}
    width: 109px;
`;
export const volumeProgressLine = styled.input`
    ${btn}
    width: 109px;
`;
