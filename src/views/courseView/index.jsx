/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from 'react-router-dom'

import './index.css'
import S from './style.js'

import { MenuSection, SectionItem } from './components/CourseMenu'

const CourseView = () => {
  return (
    <S.MenuWrapper>
      <MenuSection title="Chapter 1">
        <SectionItem checked>
          <Link to="/login">1.1 some section</Link>
        </SectionItem>
        <SectionItem>
          <Link to="#">1.2 some section</Link>
        </SectionItem>
      </MenuSection>
      <MenuSection checked title="Chapter 2">
        <SectionItem checked>
          <Link to="/login">2.1 some section</Link>
        </SectionItem>
        <SectionItem checked>
          <Link to="#">2.3 some section</Link>
        </SectionItem>
        <SectionItem checked>
          <Link to="#">2.3 some section</Link>
        </SectionItem>
      </MenuSection>
    </S.MenuWrapper>
  )
}

export default CourseView
