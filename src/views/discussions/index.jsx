import DiscussionCard from "./components/discussionCard"
import styles from "./styles.css"
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input } from "antd"
import TextArea from 'antd/lib/input/TextArea'
import {
  addDiscussion,
  getAllDiscussions
} from '../../reducers/discussionReducer'


const Feed = ({discussions,user})=>{
  return(discussions.map(
        dis =>{
            return (
              <DiscussionCard
                key={dis._id}
                discussion={dis}
                user={user}
                styles={styles}
              />
            )
        }
    ))
}


const DiscussionFeed = ({ courseId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDiscussions(courseId))
  }, [dispatch]);
  const user = useSelector((state) => state.auth.user);
  const discussions = useSelector((state) => state.discussions);
  const [disText, setDisText] = useState('');

  const onPost = () => {
    if (disText!==''){
      dispatch(addDiscussion(courseId, disText))
      setDisText('')
    }
    else console.log("cant post empty post")
  }

  const onTxtChange = (txt) => {
    setDisText(txt.target.value)
  }

  return (
    <div>
      <span>
        <Input
          size="large"
          allowClear={true}
          bordered={true}
          value={disText}
          placeholder="what you think"
          onChange={onTxtChange}
          className="txt"
        ></Input>
        <Button onClick={onPost}>Post</Button>
      </span>
      <Feed discussions={discussions} user={user} />
    </div>
  )
}

export default DiscussionFeed