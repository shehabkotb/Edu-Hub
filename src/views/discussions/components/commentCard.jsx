import React from 'react'
import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'

const Comment = ({ user, data }) => {
  return (
    <Card
      size="small"
      title={
        <span>
          <Avatar src={user.photo} />
          <span>{' ' + user.name}</span>
        </span>
      }
    >
      <p>{data}</p>
    </Card>
  )
}

const AllComments = ({comments}) =>{
    return(comments.map(
        cmnt =>{
            return <Comment key={cmnt._id} user={cmnt.user} data={cmnt.data} />
        }
    ))
}

export default AllComments