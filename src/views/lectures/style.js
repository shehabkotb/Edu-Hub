import { css } from '@emotion/core'

import styled from 'styled-components'

export const rotate180 = css`
  transform: rotateX(180deg);
`

export const GridContainer = styled.div`
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

  @media (max-width: 992px) {
    grid-template-areas:
      'video-wrapper'
      'info'
      'menu'
      'tabs';
  }
`

export const VideoWrapper = styled.div`
  grid-area: video-wrapper;
  position: relative;
  padding-bottom: 56.25%;
`

export const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Menu = styled.div`
  grid-area: menu;
  border-radius: 10px;
  overflow: hidden;
  min-width: 100px;
  border: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
`

export const Info = styled.div`
  grid-area: info;
  background-color: #fafafa;
  border-radius: 10px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`

export const Tabs = styled.div`
  background-color: rgb(94, 167, 145);
  grid-area: tabs;
  height: 600px;
  text-align: center;
  line-height: 600px;
  color: white;
`
