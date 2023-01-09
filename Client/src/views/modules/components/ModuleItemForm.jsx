import { Button, Input, Radio, Space, Form, Upload } from 'antd'
import React, { useState } from 'react'

import { PlusOutlined, InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const FileForm = ({
  handleCancel,
  addModuleItem,
  loadingUpload,
  setFormActive
}) => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    const body = new FormData()
    body.append('file', values.file[0].originFileObj)
    body.append('type', 'file')
    body.append('title', values.title)
    addModuleItem(body).then(() => setFormActive(false))
  }

  const getFileList = (files) => {
    return files.fileList
  }

  const handleAutoFillName = (value) => {
    form.setFieldsValue({ ...form.getFieldValue(), title: value.file.name })
  }

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ marginTop: '8px', width: '100%' }}
        requiredMark="optional"
      >
        <Space>
          <Form.Item
            name="title"
            label="File Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loadingUpload}
              type="primary"
              onClick={() => form.submit()}
            >
              submit
            </Button>
          </Form.Item>
        </Space>
        <Form.Item
          name="file"
          valuePropName="fileList"
          getValueFromEvent={getFileList}
          rules={[
            { type: 'array', max: 1, required: true, message: 'only one file' }
          ]}
        >
          <Dragger
            onChange={handleAutoFillName}
            beforeUpload={() => {
              return false
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single file upload only.
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </>
  )
}

const VideoForm = ({ handleCancel, addModuleItem, setFormActive }) => {
  const [form] = Form.useForm()

  const handleSubmit = (moduleItem) => {
    moduleItem.type = 'video'
    addModuleItem(moduleItem).then(() => setFormActive(false))
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      style={{ marginTop: '8px' }}
      requiredMark="optional"
    >
      <Space size={'middle'}>
        <Form.Item
          name="title"
          label="Video Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please valid url',
              type: 'url'
            }
          ]}
          name="url"
          label="Video url"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={form.submit} type="primary">
            Submit
          </Button>
        </Form.Item>
      </Space>
    </Form>
  )
}

const ModuleItemForm = ({ instructorAccess, addModuleItem, loadingUpload }) => {
  const [formActive, setFormActive] = useState(false)
  const [moduleItemType, setModuleItemType] = useState('video')

  const handleCancel = () => setFormActive(false)

  if (!instructorAccess) return null

  return (
    <>
      {!formActive && (
        <div style={{ marginTop: '16px' }}>
          <Button icon={<PlusOutlined />} onClick={() => setFormActive(true)}>
            Add Item
          </Button>
        </div>
      )}
      {formActive && (
        <>
          <div
            style={{
              paddingBottom: '16px',
              borderBottom: '0px',
              marginTop: '16px'
            }}
          >
            <Radio.Group
              defaultValue="video"
              buttonStyle="solid"
              value={moduleItemType}
              onChange={(e) => setModuleItemType(e.target.value)}
            >
              <Radio.Button value="video">Video</Radio.Button>
              <Radio.Button value="file">File</Radio.Button>
            </Radio.Group>
          </div>
          {moduleItemType === 'video' && (
            <VideoForm
              addModuleItem={addModuleItem}
              handleCancel={handleCancel}
              setFormActive={setFormActive}
            />
          )}
          {moduleItemType === 'file' && (
            <FileForm
              addModuleItem={addModuleItem}
              handleCancel={handleCancel}
              loadingUpload={loadingUpload}
              setFormActive={setFormActive}
            />
          )}
        </>
      )}
    </>
  )
}

export default ModuleItemForm
