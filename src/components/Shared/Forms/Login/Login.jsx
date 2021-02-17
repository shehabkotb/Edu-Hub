import React from 'react'
import { Form, Input, Button, Checkbox, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons'

import {
  FormItemFlex,
  PageContainer,
  FormContainer,
  FormWrapper,
  FormTitle
} from './style'

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  return (
    <PageContainer>
      <FormContainer>
        <FormWrapper>
          <Form name="login" onFinish={onFinish} scrollToFirstError>
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
              <Form.Item name="remember" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/ForgetPassword">Forget Password</Link>
            </FormItemFlex>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={onFinish()}
              >
                Login
              </Button>
            </Form.Item>

            <Divider plain>Or</Divider>

            <Form.Item>
              <Button block icon={<GoogleOutlined />}>
                Sign in with Google
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </FormContainer>
    </PageContainer>
  )
}
export default Login
