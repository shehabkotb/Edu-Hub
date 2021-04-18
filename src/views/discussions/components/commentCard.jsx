import React from 'react'
import { Card, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'

const Comment = ({ user, data, Luser }) => {
  return (
    <Card
      size="small"
      title={
        <span>
          <Avatar src={user.photo} />
          <span>{' ' + user.name}</span>
          <Button
                disabled={!(user._id === Luser._id)}
                className="deleteButton"
              >delete</Button>
        </span>
      }
    >
      <p>{data}</p>
    </Card>
  )
}

const AllComments = ({comments,Luser}) =>{
    return(comments.map(
        cmnt =>{
            return <Comment key={cmnt._id} user={cmnt.user} data={cmnt.data} Luser={Luser}/>
        }
    ))
}

export default AllComments