import { Collapse, Select, List, Space, Button, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import ModuleItem from './ModuleItem'
import ModuleItemForm from './ModuleItemForm'

const { Option } = Select

const ModuleList = (props) => {
  const {
    module,
    instructorAccess,
    removeModule,
    addModuleItem,
    removeModuleItem
  } = props

  return (
    <>
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
          header={<Typography.Text strong>{module.title}</Typography.Text>}
          bordered={false}
          key="1"
          extra={
            instructorAccess && (
              <Space
                onClick={(event) => {
                  // If you don't want click extra trigger collapse, you can prevent this:
                  event.stopPropagation()
                }}
              >
                <Button type="text" icon={<EditOutlined />} />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => removeModule(module.id)}
                />
              </Space>
            )
          }
        >
          <List
            locale={{ emptyText: 'no items' }}
            dataSource={module.moduleItems}
            renderItem={(item) => (
              <ModuleItem
                removeModuleItem={removeModuleItem}
                item={item}
                instructorAccess={instructorAccess}
              />
            )}
          ></List>
          <ModuleItemForm
            addModuleItem={addModuleItem}
            instructorAccess={instructorAccess}
            moduleId={module.id}
          />
        </Collapse.Panel>
      </Collapse>
    </>
  )
}

export default ModuleList
