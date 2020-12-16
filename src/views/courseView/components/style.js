import { css } from '@emotion/core'

/*
 * menu
 */

export const subSectionItem = css`
  list-style: none;
  padding: 7px 0 7px 32px;
  max-height: 55px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  position: relative;
  &:hover {
    background: #d9d9d9;
  }

  a {
    color: #000000d9;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: transparent;
    }
  }
`
export const sectionWrapper = css`
  width: 100%;
  height: 40px;
  padding: 0px 16.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #d9d9d9;
  }
`
export const menuSection = css`
  width: 90%;
  border-radius: 10px;
  background: #f0f0f0;
  margin: 0 auto;
  overflow: hidden;
  list-style-type: none;
`

/*
 * info
 */

export const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
`

export const infoTitle = css`
  margin: 0;
  font-size: 18px;
`

export const infoDate = css`
  color: #bfbfbf;
  font-size: 12px;
  font-weight: 600;
`
