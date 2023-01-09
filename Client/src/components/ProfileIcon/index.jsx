import React from 'react'
import { Dropdown, Avatar, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../../reducers/authReducer'

const ProfileIcon = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const clickHandler = ({ key }) => {
    if (key === 'SIGN_OUT') {
      dispatch(logout())
    }
  }

  const menu = (
    <Menu onClick={clickHandler}>
      <Menu.Item key="PROFILE">
        <NavLink to={'/app/profile'}>My Profile</NavLink>
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
      <Avatar src={user.photo} style={{ cursor: 'pointer' }}></Avatar>
    </Dropdown>
  )
}

export default ProfileIcon
