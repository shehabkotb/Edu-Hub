import React from 'react'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon'
import './DropDownNotification.css'

import { BellFilled } from '@ant-design/icons'

import { Tag } from 'antd'

const data = [
  {
    id: '000000001',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'You have received 14 new weekly reports',
    datetime: '2017-08-09',
    type: 'notification'
  },
  {
    id: '000000002',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: 'Your recommended Qu Nini has passed the third round of interview',
    datetime: '2017-08-08',
    type: 'notification'
  },
  {
    id: '000000003',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: 'This template can distinguish multiple notification types',
    datetime: '2017-08-07',
    read: true,
    type: 'notification'
  },
  {
    id: '000000004',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: 'The icon on the left is used to distinguish different types',
    datetime: '2017-08-07',
    type: 'notification'
  },
  {
    id: '000000005',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title:
      'The content should not exceed two lines, and it will be automatically truncated when it exceeds',
    datetime: '2017-08-07',
    type: 'notification'
  },
  {
    id: '000000006',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Qu Lili commented on you',
    description:
      'Description information description information description information',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000007',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Zhu Pianyou replied to you',
    description:
      'This template is used to remind who has interacted with you, put the avatar of who on the left',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000008',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Title',
    description:
      'This template is used to remind who has interacted with you, put the avatar of who on the left',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000009',
    title: 'Task Name',
    description: 'The task needs to be started before 20:00 on 2017-01-12',
    extra: 'Not started',
    status: 'todo',
    type: 'event'
  },
  {
    id: '000000010',
    title: 'Third Party Emergency Code Change',
    description:
      'Guanlin submitted on 2017-01-06, the code change task must be completed before 2017-01-07',
    extra: 'Expires soon',
    status: 'urgent',
    type: 'event'
  },
  {
    id: '000000011',
    title: 'Information Security Exam',
    description:
      'Assign Zhuer to complete the update and release before 2017-01-09',
    extra: 'Elapsed 8 days',
    status: 'doing',
    type: 'event'
  },
  {
    id: '000000012',
    title: 'ABCD Version Release',
    description:
      'Guanlin submitted on 2017-01-06, the code change task must be completed before 2017-01-07',
    extra: 'In progress',
    status: 'processing',
    type: 'event'
  }
]

function onItemClick(item, tabProps) {
  console.log(item, tabProps)
}

function onClear(tabTitle) {
  console.log(tabTitle)
}

function getNoticeData(notices) {
  if (notices.length === 0) {
    return {}
  }
  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice }
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold'
      }[newNotice.status]
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      )
    }
    return newNotice
  })
  return newNotices.reduce((pre, data) => {
    if (!pre[data.type]) {
      pre[data.type] = []
    }
    pre[data.type].push(data)
    return pre
  }, {})
}

const noticeData = getNoticeData(data)
const DropDownNotification = () => (
  <div className={'dropdown-div'}>
    <NoticeIcon
      className="notice-icon"
      count={5}
      onItemClick={onItemClick}
      onClear={onClear}
      bell={
        <BellFilled
          style={{
            fontSize: 16
          }}
        />
      }
    >
      <NoticeIcon.Tab
        list={noticeData.notification}
        title="notification"
        emptyText="You have viewed all notifications"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
      />
      <NoticeIcon.Tab
        list={noticeData.message}
        title="message"
        emptyText="You have read all messages"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      />
      <NoticeIcon.Tab
        list={noticeData.event}
        title="event"
        emptyText="You have completed all to do"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
      />
    </NoticeIcon>
  </div>
)

export default DropDownNotification
