import DiscussionCard from './components/discussionCard'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'

import {
  addDiscussion,
  getAllDiscussions
} from '../../reducers/discussionReducer'

const Feed = ({ discussions, user }) => {
  return discussions.map((dis) => {
    return <DiscussionCard key={dis._id} discussion={dis} user={user} />
  })
}

const DiscussionFeed = ({ courseId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllDiscussions(courseId))
  }, [dispatch, courseId])
  const user = useSelector((state) => state.auth.user)
  const discussions = useSelector((state) => state.discussions)
  const [disText, setDisText] = useState('')

  const onPost = () => {
    if (disText !== '') {
      dispatch(addDiscussion(courseId, disText))
      setDisText('')
    } else console.log('cant post empty post')
  }

  const onTxtChange = (txt) => {
    setDisText(txt.target.value)
  }

  return (
    <div className="container">
      <span>
        <Input.TextArea
          size="large"
          allowClear={true}
          bordered={true}
          value={disText}
          placeholder="what you think"
          onChange={onTxtChange}
          className="txt"
        ></Input.TextArea>
        <Button className="postButton" onClick={onPost}>
          Post
        </Button>
      </span>
      <Feed discussions={discussions} user={user} className="container" />
    </div>
  )
}

export default DiscussionFeed
