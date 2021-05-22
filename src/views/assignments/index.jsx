import React, { useState } from 'react'

import { Typography, Button, Space, Collapse, Tag, Divider } from 'antd'

import CreateAssignment from '../CreateAssignment'
import { FlexSectionHeader } from '../style'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const Assignments = () => {
  const { Title } = Typography

  const [addAssignment, setAddAssignmentActive] = useState(false)

  return (
    <React.Fragment>
      <FlexSectionHeader>
        <Title level={4}>Assignments</Title>
        <Button
          onClick={() => setAddAssignmentActive(!addAssignment)}
          type="dashed"
          shape="round"
          icon={<PlusOutlined />}
        >
          Add Assignment
        </Button>
      </FlexSectionHeader>
      {addAssignment ? (
        <CreateAssignment />
      ) : (
        <Collapse
          style={{
            borderRadius: '10px',
            width: '100%',
            fontSize: '16px',
            border: '0px'
          }}
          defaultActiveKey={['1']}
          expandIconPosition={'left'}
        >
          <Collapse.Panel
            header={
              <Typography.Text strong> Stack and Queues </Typography.Text>
            }
            bordered={false}
            key="1"
            extra={
              <Space
                onClick={(event) => {
                  // If you don't want click extra trigger collapse, you can prevent this:
                  event.stopPropagation()
                }}
              >
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  // onClick={() => removeModule(module.id)}
                />
              </Space>
            }
          >
            <Divider>Assignment Schedule </Divider>

            <div>
              <b> Assignment Type:</b> Online Question
            </div>
            <div>
              <b> Start Date :</b> 11/11/2021
            </div>
            <div>
              <b> Remaining Time : </b> 3 days , 5 hours , 16 minute , 20
              seconds
            </div>

            <Divider>Available</Divider>
            <div>
              <Tag color="#f50"> Coming-Soon</Tag>
              <Tag color="#2db7f5">#2db7f5</Tag>
              <Tag color="#87d068">open</Tag>
              <Tag color="#ff0000">Expired</Tag>
            </div>
          </Collapse.Panel>
        </Collapse>
      )}

      {/*  array of assignments  */}
    </React.Fragment>
  )
}

export default Assignments
