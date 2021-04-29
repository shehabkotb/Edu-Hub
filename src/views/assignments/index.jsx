import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Button, Modal, Form, Input, List, Card ,Space , Collapse} from 'antd'
import CreateAssignment from '../CreateAssignment'
import { FlexSectionHeader } from '../style'
import styled from 'styled-components'
import { DeleteOutlined ,PlusOutlined} from '@ant-design/icons'

const Assignments = () => {
  const { Title } = Typography

  const [addAssignment, setAddAssignmentActive] = useState(false);

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
      {  addAssignment ? (<CreateAssignment />)
        :
       
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
          header={<Typography.Text strong>Assignment 1</Typography.Text>}
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
          {/* <List
            locale={{ emptyText: 'no items' }}
            // dataSource={module.moduleItems}
            renderItem={(item) => (
              <div>test</div>
            )}
          ></List> */}
          <div>
            options
          </div>
        </Collapse.Panel>
      </Collapse>
      }

      {/*  array of assignments  */}

    </React.Fragment>

  )
}

export default Assignments
