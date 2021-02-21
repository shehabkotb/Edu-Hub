import React from 'react'

import { Card } from 'antd'

const CourseImage = ({ image, backgroundColor }) => {
  if (image === undefined)
    return (
      <div style={{ backgroundColor: `${backgroundColor}`, height: 256 }}></div>
    )

  return (
    <img
      style={{
        maxHeight: 256,
        objectFit: 'cover',
        objectPosition: 'top'
      }}
      alt="course img"
      src={image}
    />
  )
}

const CourseCard = ({ course, onClick, ...props }) => {
  return (
    <Card
      hoverable
      bordered={false}
      cover={
        <CourseImage
          image={course.image}
          backgroundColor={course.backgroundColor}
        />
      }
      onClick={onClick}
    >
      <Card.Meta title={course.name} description={course.description} />
    </Card>
  )
}

export default CourseCard
