import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Button, Modal, Form, Input, List, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CreateAssignment from '../CreateAssignment'
import { FlexSectionHeader } from '../style'


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
        (
          <Card>
            array of assignmenst
          </Card>
        )
      }

      {/*  array of assignments  */}

    </React.Fragment>

  )
}

export default Assignments
