import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '../../reducers/authReducer'

import { Form, Input, Button, Checkbox, Divider } from 'antd'
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons'

import {
  FormItemFlex,
  PageContainer,
  FormContainer,
  FormWrapper,
  FormTitle
} from './style'

const Login = () => {
  const dispatch = useDispatch()

  const onFinish = (values) => {
    if (values.remember) {
      window.localStorage.setItem(
        'eduhub-remember-cred',
        JSON.stringify({ remember: values.remember, email: values.email })
      )
    } else {
      window.localStorage.setItem(
        'eduhub-remember-cred',
        JSON.stringify({ remember: false })
      )
    }
    dispatch(login(values))
  }

  const getInitialValues = () => {
    return JSON.parse(window.localStorage.getItem('eduhub-remember-cred'))
  }

  return (
    <PageContainer>
      <FormContainer>
        <FormWrapper>
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={getInitialValues()}
            scrollToFirstError
          >
            <FormTitle>Sign in</FormTitle>

            <p>
              New user? <Link to="/register">Create Account</Link>
            </p>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-Mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password"
              />
            </Form.Item>

            <FormItemFlex>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              {/* <Link to="/ForgetPassword">Forget Password</Link> */}
            </FormItemFlex>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            {/* <Divider plain>Or</Divider>

            <Form.Item>
              <Button block icon={<GoogleOutlined />}>
                Sign in with Google
              </Button>
            </Form.Item> */}
          </Form>
        </FormWrapper>
      </FormContainer>
    </PageContainer>
  )
}
export default Login
