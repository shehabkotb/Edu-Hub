import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import './style.css'
import { uploadFile } from 'react-s3'
import { Form, Input, Card, Button } from 'antd'
import { editProfile } from '../../reducers/authReducer'
import ImageUploader from 'react-images-upload'
import notificationsService from '../../services/notifications'

const Profile = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  //const [password, setPassword] = useState(user.passwordConfirm)
  const [mobile, setMobile] = useState(user.mobile)
  const [userName, setUserName] = useState(user.username)
  const [photo, setPhoto] = useState(user.photo)
  const [active, setActive] = useState(true)

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
    if (typeof(photo.name) != 'undefined') {
      dispatch(
        editProfile({
          name: name,
          email: email,
          username: userName,
          mobile: mobile,
          photo:
            '' +
            user._id +
            '/' +
            photo.name
        })
      )
    } else {
      dispatch(
        editProfile({
          name: name,
          email: email,
          username: userName,
          mobile: mobile,
          photo: user.photo
        })
      )
    }
  }

  const S3_BUCKET = ''
  const REGION = ''
  const ACCESS_KEY = ''
  const SECRET_ACCESS_KEY = ''

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'users_profile_photo/' + user._id,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  }

  const onFileChange = (event) => {
    setPhoto(event[0])
    setActive(false)
  }

  const handleUpload = async () => {
    await uploadFile(photo, config)
      .then((data) => {
        console.log(data)
        console.log('uploaded')
        setActive(true)
      })
      .catch((err) => console.error(err))
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
          <Form.Item label="Name:">
            <Input
              allowClear={true}
              className="input"
              value={name}
              onChange={onNameChange}
            />
          </Form.Item>
          <Form.Item label="User Name:">
            <Input
              allowClear={true}
              className="input"
              value={userName}
              onChange={onUserNameChange}
            />
          </Form.Item>
          <Form.Item label="Email:">
            <Input
              allowClear={true}
              className="input"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Item>
          <Form.Item label="Mobile:">
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
          <Form.Item label="Photo:">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={onFileChange}
              imgExtension={['.jpg', '.png']}
              maxFileSize={1048576}
              singleImage={true}
              label="max size 1MB"
            />
            <button onClick={handleUpload}>Upload!</button>
          </Form.Item>
          <Button disabled={!active} onClick={onsave} loading={!active}>
            Save Changes
          </Button>
          <Button
            className="unsub"
            type="text"
            onClick={() => notificationsService.unsubscribe()}
            title="re-login to subscribe again!!"
          >
            unsubscribe from notifications on all devices
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default Profile
