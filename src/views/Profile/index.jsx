import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import style from './style.css'
import { Form, Input, Card, Button } from 'antd'
import { editProfile } from '../../reducers/authReducer'

const Profile = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.auth.user)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  //const [password, setPassword] = useState(user.passwordConfirm)
  const [mobile, setMobile] = useState(user.mobile)
  const [userName, setUserName] = useState(user.username)
  const onNameChange = (txt) => {
    setName(txt.target.value)
  }
  const onEmailChange = (txt) => {
    setEmail(txt.target.value)
  }
  /*const onPasswordChange = (txt) => {
    setPassword(txt.target.value)
  }*/
  const onUserNameChange = (txt) => {
    setUserName(txt.target.value)
  }
  const onMobileChange = (txt) => {
    setMobile(txt.target.value)
  }
  const onsave = () => {
    dispatch(
      editProfile({
        name: name,
        email: email,
        username: userName,
        mobile: mobile
      })
    )
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <Meta
              avatar={<Avatar size="large" src={user.photo} />}
              title={user.name}
            />
          </div>
          <h5 className="card-title">{'Role: ' + user.role}</h5>
          <h5 className="card-text">{'@' + user.username}</h5>
          <p className="card-text">
            {user.email}
            <br />
            <span className="phone">{user.mobile}</span>
          </p>
        </div>
        <span>user's Bio</span>
      </div>
      <Card className="Form">
        <Form size="middle" colon={true} labelAlign="left" layout="vertical">
          <Form.Item label="Name">
            <Input
              allowClear={true}
              className="input"
              value={name}
              onChange={onNameChange}
            />
          </Form.Item>
          <Form.Item label="User Name">
            <Input
              allowClear={true}
              className="input"
              value={userName}
              onChange={onUserNameChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              allowClear={true}
              className="input"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input
              allowClear={true}
              className="input"
              value={mobile}
              onChange={onMobileChange}
            />
          </Form.Item>
          {/*<Form.Item label="New Password">
            <Input.Password
              allowClear={true}
              className="input"
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Item>*/}
          <Button onClick={onsave}>Save Changes</Button>
        </Form>
      </Card>
    </div>
  )
}

export default Profile
