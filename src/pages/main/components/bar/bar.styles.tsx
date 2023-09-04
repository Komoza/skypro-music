import { keyframes, styled } from 'styled-components';

interface Props {
    $isRepeatTrack?: boolean;
    $currentProgress?: number;
    $isShuffle?: boolean;
}

const slideInBar = keyframes`
    0% {
        bottom: -78px;
    }
    100% {
        bottom: 0;
    }
`;

const btn = `
    cursor: pointer;
`;

export const bar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(28, 28, 28);
    animation: ${slideInBar} 0.3s forwards;
`;

export const barContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const barPlayerProgress = styled.div`
    position: relative;
    width: 100%;
    height: 5px;
    background: #2e2e2e;
    cursor: pointer;
    transition: height 0.2s;
    transition-delay: 0.5s;

    &:hover {
        height: 20px;
        transition-delay: 0s;
    }
`;

export const barPlayerProgressCurrent = styled.div<Props>`
    width: ${(props) => props.$currentProgress}%;
    border-radius: 30px;
    height: 100%;
    background: #b672ff;
`;

export const barPlayerProgressTime = styled.div`
    position: absolute;
    right: 10px;
    top: -25px;
`;
export const barPlayerBlock = styled.div`
    height: 85px;
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

    &:hover {
        opacity: .5;
    }
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
export const playerBtnRepeatSvg = styled.svg<Props>`
    width: 18px;
    height: 12px;
    fill: transparent;

    ${(props) =>
        props.$isRepeatTrack
            ? `
            stroke: #fff 
            `
            : `stroke: #696969`}
`;

export const playerBtnShuffle = styled.div`
    ${buttonStyle + btn}
    display: flex;
    align-items: center;
`;
export const playerBtnShuffleSvg = styled.svg<Props>`
    width: 19px;
    height: 12px;
    fill: transparent;
    stroke: ${(props) => (props.$isShuffle ? '#fff' : '#696969')};
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
`;

export const trackPlaySvg = styled.svg`
    width: 18px;
    height: 17px;
    fill: transparent;
    stroke: #4e4e4e;
`;

export const trackPlayAuthor = styled.div<Props>`
    grid-area: author;
    width: auto;
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
    width: auto;
    grid-area: album;
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

const likeSvg = `
    width: 14px;    
    height: 12px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
        transform: scale(1.5);
    }
`;
export const trackPlayLikeSvg = styled.svg`
    ${likeSvg}
    fill: transparent;
    stroke: #696969;
`;
export const trackPlayLikeSvgActive = styled.svg`
    ${likeSvg}
    fill: #b672ff;
    stroke: #b672ff;
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

export const audioFile = styled.audio`
    display: none;
`;
