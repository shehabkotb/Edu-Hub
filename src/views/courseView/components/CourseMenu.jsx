import { useEffect, useRef, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import CircleIcon from './CircleIcon.jsx'
import { CheckCircleTwoTone, DownOutlined } from '@ant-design/icons'

export const SectionItem = ({ checked, children }) => {
  return (
    <li
      css={css`
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
      `}
    >
      <span
        css={css`
          margin-right: 0.25rem;
        `}
      >
        {checked ? (
          <CheckCircleTwoTone twoToneColor="#52C41A" />
        ) : (
          <CircleIcon />
        )}
      </span>
      {children}
    </li>
  )
}

export const MenuSection = ({ checked, title, header, children, to }) => {
  const [active, setActive] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    !header &&
      (contentRef.current.style.maxHeight = active
        ? `${contentRef.current.scrollHeight}px`
        : '0px')
  }, [active, contentRef, header])

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <ul
      css={css`
        padding: 0;
        margin-top: 10px;
        margin-bottom: 0;
      `}
    >
      <li
        css={css`
          width: 90%;
          border-radius: 10px;
          background: #f0f0f0;
          margin: 0 auto;
          overflow: hidden;
          list-style-type: none;
        `}
      >
        <div
          onClick={handleClick}
          css={css`
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
          `}
        >
          <div
            css={css`
              display: 'inline-block';
            `}
          >
            {checked ? (
              <CheckCircleTwoTone twoToneColor="#52C41A" />
            ) : (
              <CircleIcon />
            )}
            <span
              css={css`
                display: 'inline-block',
                marginLeft: '10px',
                fontSize: '15px'
                `}
            >
              {title}
            </span>
          </div>

          {!header && (
            <DownOutlined
              className={active ? 'rotate180' : ''}
              css={css`
                font-size: 11px;
                transition: all, 0.3s;
              `}
            />
          )}
        </div>
        {!header && (
          <ul
            css={css`
              transition: all, 0.3s;
            `}
            ref={contentRef}
          >
            {children}
          </ul>
        )}
      </li>
    </ul>
  )
}
