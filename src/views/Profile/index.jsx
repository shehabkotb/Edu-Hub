import React from 'react'
import { Layout, Menu, Card ,Row,Col} from 'antd';
const { Sider } = Layout;
const Profile = () => {
  return (
    <Card>
    <div className="site-card-wrapper">
          <Row gutter={16}>
          <Col span={8}>
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">Basic Setting</Menu.Item>
            <Menu.Item key="2">Security Setting</Menu.Item>
            <Menu.Item key="3">Account Binding</Menu.Item>
            <Menu.Item key="4">New Message Notifications</Menu.Item>

          </Menu>
         
        </Sider>
      </Col>
      <Col span={16}>
      {/* <Registeration /> */}
      </Col>

      </Row>
      </div>
      </Card>
      
  );
}

export default Profile 
