import React from 'react'
import { Dropdown, Avatar, Menu } from 'antd'
import { useDispatch } from 'react-redux'

import { logout } from '../../reducers/authReducer'

const ProfileIcon = () => {
  const dispatch = useDispatch()

  const clickHandler = ({ key }) => {
    if (key === 'SIGN_OUT') {
      dispatch(logout())
    }
  }

  const menu = (
    <Menu onClick={clickHandler}>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item key="SIGN_OUT">Sign out</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown
      style={{}}
      overlay={menu}
      trigger={['click']}
      placement="topRight"
      arrow
    >
      <Avatar
        src="https://www.w3schools.com/howto/img_avatar.png"
        style={{ marginRight: 20, cursor: 'pointer' }}
      ></Avatar>
    </Dropdown>
  )
}

export default ProfileIcon
