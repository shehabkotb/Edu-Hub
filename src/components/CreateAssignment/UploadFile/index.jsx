import React from 'react'
import { UploadOutlined  } from '@ant-design/icons';
import {Upload , Form , Button} from 'antd'

const UploadFile = ()=>{

    return (
        <Form.Item
        name="upload"
        rules={[{ required: true, message: 'Please upload this file!' }]}

    >
        <Upload name="logo"  listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
    </Form.Item>  
    )
}

export default UploadFile 