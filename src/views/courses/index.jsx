import React from 'react'
import { Card, Col, Row, Typography, Layout } from 'antd'

const Courses = () => {
  const { Title } = Typography
  const { Meta } = Card
  const { Content } = Layout

  return (
    <Content style={{ margin: '0 16px' }}>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}
      <Title
        style={{ marginLeft: 24, marginTop: 30, marginBottom: 6 }}
        level={2}
      >
        My Courses
      </Title>
      <div style={{ minHeight: 572 }}>
        <div style={{ padding: 24 }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    style={{
                      maxHeight: 256,
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    alt="example"
                    src="https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    style={{
                      maxHeight: 256,
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    alt="example"
                    src="https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                  />
                }
              >
                <Meta
                  title="Course title"
                  description="a really long description test to see if it still looks ok my dude"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    style={{
                      maxHeight: 256,
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    alt="example"
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  />
                }
              >
                <Meta title="Course title" description="description" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    style={{
                      maxHeight: 256,
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    alt="example"
                    src="https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  />
                }
              >
                <Meta title="Course title" description="description" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    style={{
                      maxHeight: 256,
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    alt="example"
                    src="https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  />
                }
              >
                <Meta title="Course title" description="description" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    style={{
                      maxHeight: 256,
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    alt="example"
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  />
                }
              >
                <Meta
                  title="Course title"
                  description="a really long description test to see if it still looks ok my dude"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  )
}

export default Courses
