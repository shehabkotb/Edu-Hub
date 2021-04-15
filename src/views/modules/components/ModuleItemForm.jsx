import { Button, Input, List, Radio, Space, Form, notification } from 'antd'
import React, { useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import Dropzone from 'react-dropzone-uploader'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

const FileForm = ({ moduleId, handleCancel, ...rest }) => {
  const [form] = Form.useForm()

  const { courseId } = useParams()

  const [uploadDisabled, setUploadDisabled] = useState(true)
  const test = { disabled: uploadDisabled }

  const getUploadParams = ({ file, meta }) => {
    const body = new FormData()
    body.append('file', file)
    body.append('title', form.getFieldValue('title'))
    body.append('type', 'file')
    return {
      url: `http://localhost:4000/courses/${courseId}/modules/${moduleId}/module-item`,
      body
    }
  }

  const handleValueChange = (e) => {
    if (e.target.value === '') setUploadDisabled(true)
    else setUploadDisabled(false)
  }

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === 'headers_received') {
      notification.success({
        message: 'file uploaded'
      })
      remove()
    } else if (status === 'aborted') {
      notification.error({
        message: 'file failed to upload'
      })
    }
  }

  return (
    <>
      <Form
        form={form}
        style={{ marginTop: '8px', width: '100%' }}
        requiredMark="optional"
      >
        <Space>
          <Form.Item
            name="title"
            label="File Name"
            onChange={handleValueChange}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Space>
        <Dropzone
          getUploadParams={getUploadParams}
          maxFiles={1}
          multiple={false}
          canCancel={false}
          onChangeStatus={handleChangeStatus}
          {...test}
          styles={{
            dropzone: {
              height: 'fit-content',
              overflow: 'hidden'
            },
            inputLabel: { borderStyle: 'groove' },
            input: { display: 'none' }
          }}
        />
      </Form>
    </>
  )
}

const VideoForm = ({ handleCancel, addModuleItem }) => {
  const dispatch = useDispatch()

  const handleSubmit = (moduleItem) => {
    moduleItem.type = 'video'
    dispatch(addModuleItem(moduleItem))
  }

  return (
    <Form
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
        <Form.Item name="url" label="Video url" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Space>
    </Form>
  )
}

const ModuleItemForm = ({ instructorAccess, addModuleItem, moduleId }) => {
  const [formActive, setFormActive] = useState(false)
  const [moduleItemType, setModuleItemType] = useState('video')

  const handleCancel = () => setFormActive(false)

  if (!instructorAccess) return null

  debugger
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
            />
          )}
          {moduleItemType === 'file' && (
            <FileForm moduleId={moduleId} handleCancel={handleCancel} />
          )}
        </>
      )}
    </>
  )
}

export default ModuleItemForm
