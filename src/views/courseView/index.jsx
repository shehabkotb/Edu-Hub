/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Link } from 'react-router-dom'

import {
  gridContainer,
  videoWrapper,
  video,
  info,
  tabs,
  menu,
  menuWrapper,
  menuHeader
} from './style'
import Info from './components/Info'
import { MenuSection, SectionItem } from './components/CourseMenu'

const CourseView = () => {
  return (
    <div css={gridContainer}>
      <div css={videoWrapper}>
        <iframe
          css={video}
          title="courseVideo"
          src="https://www.youtube.com/embed/lTRiuFIWV54"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div css={info}>
        <Info />
      </div>
      <div css={tabs}>Disscusion or tabs place holder</div>
      <div css={menu}>
        <div css={menuWrapper}>
          <div css={menuHeader}>
            <h1>Course Content</h1>
          </div>
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
          <MenuSection title="Chapter 3">
            <SectionItem checked>
              <Link to="/login">1.1 some section</Link>
            </SectionItem>
            <SectionItem>
              <Link to="#">1.2 some section</Link>
            </SectionItem>
          </MenuSection>
          <MenuSection title="Chapter 4">
            <SectionItem checked>
              <Link to="/login">1.1 some section</Link>
            </SectionItem>
            <SectionItem>
              <Link to="#">1.2 some section</Link>
            </SectionItem>
          </MenuSection>
          <MenuSection title="Chapter 5">
            <SectionItem checked>
              <Link to="/login">1.1 some section</Link>
            </SectionItem>
            <SectionItem>
              <Link to="#">1.2 some section</Link>
            </SectionItem>
          </MenuSection>
        </div>
      </div>
    </div>
  )
}

export default CourseView
