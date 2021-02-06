import React from 'react'
import { Form, Input, Button , Card } from 'antd';

const { TextArea } = Input;
const ArticleForm = () => {
    const onFinish = (values) => {
        console.log(values)
      };
    return (

        <Card style={{ width: 600 , marginLeft:200 }}>
            <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="articleTitle"
        rules={[
          {
            required: true,
            message: 'Please input your Article Title!',
          },
        ]}
      >
        <Input type="text" placeholder="ArticleTitle" />
      </Form.Item>
      <Form.Item
        name="articleBody"
        rules={[
          {
            required: true,
            message: 'Please input your article body!',
          },
        ]}
      >
        <TextArea
          type="text"
          placeholder="article body"
          autoSize={{ minRows: 5, maxRows: 6 }}

        />
      </Form.Item>
    
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            Post
        </Button>
      </Form.Item>
    </Form>
        </Card>
    )
}

export default ArticleForm; 