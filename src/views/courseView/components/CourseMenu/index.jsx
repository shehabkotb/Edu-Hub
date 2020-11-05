import { useEffect, useRef, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import CircleIcon from './CircleIcon.jsx'
import { CheckCircleTwoTone, DownOutlined } from '@ant-design/icons'

import { subSectionItem, sectionWrapper, menuSection } from './style.js'

export const SectionItem = ({ checked, children }) => {
  return (
    <li css={subSectionItem}>
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

// implemnt the to prop for header option
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
      <li css={menuSection}>
        <div onClick={handleClick} css={sectionWrapper}>
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
                display: inline-block;
                margin-left: 10px;
                font-size: 15px;
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
