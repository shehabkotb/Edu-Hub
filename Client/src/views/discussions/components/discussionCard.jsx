import React, { useState } from 'react'
import { Card, Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import AllComments from './commentCard'
import {
  removeDiscussion,
  addComment
} from '../../../reducers/discussionReducer'
import './../styles.css'

const DiscussionCard = ({ discussion, user }) => {
  const dispatch = useDispatch()
  const [commText, setcommText] = useState('')

  const onPost = () => {
    if (commText !== '') {
      dispatch(addComment(discussion._id, commText, user))
      setcommText('')
    } else console.log('cant post empty comment')
  }

  const onTxtChange = (txt) => {
    setcommText(txt.target.value)
  }

  return (
    <div className="container">
      <Card
        hoverable
        className="customcard"
        title={
          <div>
            <Meta
              avatar={<Avatar src={discussion.user.photo} />}
              title={discussion.user.name}
            />
            {discussion.user._id === user._id && (
              <Button
                disabled={!(discussion.user._id === user._id)}
                className="deleteButton"
                onClick={() => {
                  dispatch(removeDiscussion(discussion._id))
                }}
              >
                delete
              </Button>
            )}
          </div>
        }
      >
        <div className="dis">{discussion.data}</div>
        <Card
          size="small"
          type="inner"
          className="commentcard"
          title="comments"
        >
          <AllComments
            comments={discussion.comments}
            dId={discussion._id}
            Luser={user}
          />
        </Card>
        <div className="container">
          <Input
            size="large"
            allowClear={true}
            value={commText}
            bordered={true}
            placeholder="what you think"
            onChange={onTxtChange}
            className="txt"
          ></Input>
          <Button onClick={onPost}>Add Comment</Button>
        </div>
      </Card>
    </div>
  )
}

export default DiscussionCard
