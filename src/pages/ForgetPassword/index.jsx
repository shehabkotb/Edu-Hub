import React from 'react'
import { Form, Input, Button, Card } from 'antd';
import { formItemLayout, tailFormItemLayout } from './style'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Card >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

               
                
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={onFinish()}>
                        Send Mail 
                    </Button>
                </Form.Item>
            </Form>
            <Link to='/register'>Create Account</Link>
        </Card>
    );
};
export default ForgetPassword;