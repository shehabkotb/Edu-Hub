/** @jsxImportSource @emotion/core */

import { useEffect, useRef, useState } from 'react'

import CircleIcon from './CircleIcon.jsx'

import { CheckCircleTwoTone, DownOutlined } from '@ant-design/icons'
import { subSectionItem, sectionWrapper, menuSection } from './style.js'
import { rotate180 } from '../style.js'

export const SectionItem = ({ checked, children }) => {
  return (
    <li css={subSectionItem}>
      <span style={{ marginRight: '0.25rem' }}>
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
      style={{
        padding: 0,
        marginTop: '10px',
        marginBottom: 0
      }}
    >
      <li css={menuSection}>
        <div onClick={handleClick} css={sectionWrapper}>
          <div style={{ display: 'inline-block' }}>
            {checked ? (
              <CheckCircleTwoTone twoToneColor="#52C41A" />
            ) : (
              <CircleIcon />
            )}
            <span
              style={{
                display: 'inlineBlock',
                marginLeft: '10px',
                fontSize: '15px'
              }}
            >
              {title}
            </span>
          </div>

          {!header && (
            <DownOutlined
              css={active ? rotate180 : ''}
              style={{ fontSize: '11px', transition: 'all, 0.3s' }}
            />
          )}
        </div>
        {!header && (
          <ul style={{ transition: 'all, 0.3s' }} ref={contentRef}>
            {children}
          </ul>
        )}
      </li>
    </ul>
  )
}
