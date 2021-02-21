import React from 'react'

import { useHistory } from 'react-router-dom'

import { Space, Button } from 'antd'
import ProfileIcon from '../ProfileIcon'
import DropDownNotification from '../DropDownNotification'
import CourseNavigation from '../CourseNavigation'

import { ArrowLeftOutlined } from '@ant-design/icons'

import styled from 'styled-components'

const FlexedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 32px;
  background: #fff;
`

const AppHeader = ({ courseNavigation }) => {
  const history = useHistory()

  const popHistory = () => {
    history.goBack()
  }

  //will fix back button later
  return (
    <FlexedDiv>
      <Space>
        <Button
          disabled={true}
          shape="circle"
          type="secondary"
          onClick={popHistory}
          icon={<ArrowLeftOutlined />}
        ></Button>
        {courseNavigation && <CourseNavigation />}
      </Space>
      <Space>
        <DropDownNotification />
        <ProfileIcon />
      </Space>
    </FlexedDiv>
  )
}

export default AppHeader
