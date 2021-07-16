import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Form, Input, Button, Checkbox, Divider, Select } from 'antd'
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  UserOutlined,
  MobileOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons'
import { register } from '../../reducers/authReducer'

import { useDispatch } from 'react-redux'

import {
  FormItemFlex,
  PageContainer,
  FormContainer,
  FormWrapper,
  FormTitle
} from './style'

const Registeration = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    try {
      dispatch(register(values))
      history.push('/login')
    } catch (e) {
      console.log("can't register")
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <FormWrapper>
          <Form
            name="register"
            onFinish={onFinish}
            initialValues={{ remember: false }}
            scrollToFirstError
          >
            <FormTitle>Sign Up</FormTitle>
            <p>
              Have already Account ? <Link to="/login">Login</Link>
            </p>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'please enter your name'
                },
                {
                  min: 3,
                  message: 'please min length for name is 3'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="fullname" />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'please enter your username'
                },
                {
                  min: 3,
                  message: 'please min length for username is 3'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="username" />
            </Form.Item>

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
            <Form.Item name="role">
              <Select prefix={<UserOutlined />} placeholder="role">
                <Select.Option value="instructor">Instructor</Select.Option>
                <Select.Option value="student">Student</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!'
                }
              ]}
            >
              <Input prefix={<MobileOutlined />} placeholder="mobile" />
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

            <Form.Item
              name="passwordConfirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    )
                  }
                })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="confirm password"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true
                },
                {
                  len: 6,
                  message: 'length should be 6'
                }
              ]}
            >
              <Input prefix={<CodeSandboxOutlined />} placeholder="code" />
            </Form.Item>

            <FormItemFlex>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject('Should accept agreement')
                  }
                ]}
              >
                <Checkbox>
                  I have read the <Link to="#">agreement</Link>
                </Checkbox>
              </Form.Item>
              {/* <Form.Item>
                <Link to="/ForgetPassword">Forget Password?</Link>
              </Form.Item> */}
            </FormItemFlex>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>

            {/* <Divider plain>Or</Divider>

            <Form.Item>
              <Button block icon={<GoogleOutlined />}>
                Sign up with Google
              </Button>
            </Form.Item> */}
          </Form>
        </FormWrapper>
      </FormContainer>
    </PageContainer>
  )
}
export default Registeration
