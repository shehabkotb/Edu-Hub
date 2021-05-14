import AnnouncementCard from './components/announcementCard'
import styles from './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import {
  addAnnouncement,
  getAllAnnouncements
} from '../../reducers/announcementsReducer'

const Feed = ({ announcements, user }) => {
  return announcements.map((ann) => {
    return (
      <AnnouncementCard
        key={ann._id}
        announcement={ann}
        user={user}
        styles={styles}
      />
    )
  })
}

const AnnouncementsFeed = ({ courseId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllAnnouncements(courseId))
  }, [dispatch, courseId])
  const user = useSelector((state) => state.auth.user)
  const announcements = useSelector((state) => state.announcements)
  const [annText, setAnnText] = useState('')

  const onPost = () => {
    if (annText !== '') {
      dispatch(addAnnouncement(courseId, annText))
      setAnnText('')
    } else console.log('cant post empty post')
  }

  const onTxtChange = (txt) => {
    setAnnText(txt.target.value)
  }

  return (
    <div>
      <span>
        <Input.TextArea
          size="large"
          allowClear={true}
          bordered={true}
          value={annText}
          placeholder="what you think"
          onChange={onTxtChange}
          className="txt"
        ></Input.TextArea>
        <Button onClick={onPost}>Post</Button>
      </span>
      <Feed announcements={announcements} user={user} />
    </div>
  )
}

export default AnnouncementsFeed
