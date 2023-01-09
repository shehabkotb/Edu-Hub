import React from 'react'
import { Card, Button } from 'antd'
import { useDispatch } from 'react-redux'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import { removeAnnouncement } from '../../../reducers/announcementsReducer'

const AnnouncementCard = ({ announcement, user }) => {
  const dispatch = useDispatch()

  return (
    <div className="container">
      <Card
        hoverable
        className="custom-card"
        title={
          <div>
            <Meta
              avatar={<Avatar src={announcement.user.photo} />}
              title={announcement.user.name}
            />
            {announcement.user._id === user._id && (
              <Button
                disabled={!(announcement.user._id === user._id)}
                className="deleteButton"
                onClick={() => {
                  dispatch(removeAnnouncement(announcement._id))
                }}
              >
                delete
              </Button>
            )}
          </div>
        }
      >
        <div className="annData">{announcement.data}</div>
      </Card>
    </div>
  )
}

export default AnnouncementCard
