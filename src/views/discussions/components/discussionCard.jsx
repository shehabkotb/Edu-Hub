import React from 'react'
import { Card, Button } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import TextArea from 'antd/lib/input/TextArea'
import AllComments from './commentCard'

const DiscussionCard = ({discussion}) => {
    return (
      <div className="container">
        <Card hoverable className="custom-card">
          <Meta
            avatar={<Avatar src={discussion.user.photo} />}
            title={discussion.user.name}
          />
          <p>{discussion.data}</p>
          <Card
            size="small"
            type="inner"
            className="comment-card"
            title="comments"
          >
            <AllComments comments={discussion.comments} />
          </Card>
          <div className="container">
            <TextArea></TextArea>
            <Button color="secondary">add comment</Button>
          </div>
        </Card>
      </div>
    )

}

export default DiscussionCard;