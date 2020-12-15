import { css } from '@emotion/core'

export const rotate180 = css`
  transform: rotateX(180deg);
`

export const gridContainer = css`
  padding-top: 16px;
  overflow: hidden;
  display: grid;
  height: 100%;
  gap: 1rem;
  grid-template-areas:
    'video-wrapper video-wrapper video-wrapper video-wrapper menu'
    'video-wrapper video-wrapper video-wrapper video-wrapper menu'
    'info info info info menu'
    'tabs tabs tabs tabs none';

  @media (max-width: 768px) {
    grid-template-areas:
      'video-wrapper'
      'info'
      'menu'
      'tabs';
  }
`

export const videoWrapper = css`
  grid-area: video-wrapper;
  position: relative;
  padding-bottom: 56.25%;
`

export const video = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
export const menuHeader = css`
  width: 90%;
  margin: 10px auto 15px;
  h1 {
    font-size: 1.2rem;
  }
`
export const menuWrapper = css``

export const menu = css`
  grid-area: menu;
  padding-bottom: 20px;
  background: #fafafa;
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
  /* max-height: 100%; */
`

export const info = css`
  grid-area: info;
  /* background-color: chocolate; */
  background-color: #fafafa;
  border-radius: 10px;
`

export const tabs = css`
  background-color: rgb(94, 167, 145);
  grid-area: tabs;
  height: 600px;
  text-align: center;
  line-height: 600px;
  color: white;
`
