import React from 'react'
import { Card, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import {
  removeComment
} from '../../../reducers/discussionReducer'
import { useDispatch } from 'react-redux'


const Comment = ({ cmnt, Luser,dId }) => {
  const dispatch = useDispatch()
  return (
    <Card
      size="small"
      title={
        <span>
          <Avatar src={cmnt.user.photo} />
          <span>{' ' + cmnt.user.name}</span>
          <Button
            disabled={!(cmnt.user._id === Luser._id)}
            className="deleteButton"
            onClick={() => {
              dispatch(removeComment(dId, cmnt))
            }}
          >
            delete
          </Button>
        </span>
      }
    >
      <p>{cmnt.data}</p>
    </Card>
  )
}

const AllComments = ({comments,Luser,dId}) =>{
    return(comments.map(
        cmnt =>{
            return <Comment key={cmnt._id} cmnt={cmnt} Luser={Luser} dId={dId}/>
        }
    ))
}

export default AllComments