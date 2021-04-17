import React from 'react'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'


const comment = ({user,data}) =>{
    return(
        <div className="container">
            <h3>
                From {user.name}
            </h3>
            <h1>
                {data}
            </h1>
        </div>
    );
}

const allComments = ({comments}) =>{
    return(comments.map(
        cmnt =>{
            return <comment user={cmnt.user} data={cmnt.data} />
        }
    ))
}

const DiscussionCard = ({discussion}) => {
    return (
      <Card hoverable>
        <Meta
          avatar={<Avatar src={discussion.user.photo} />}
          title={discussion.user.name}
          description={discussion.data}
        />
        <allComments comments={discussion.comments}/>
      </Card>
    )

}

export default DiscussionCard;