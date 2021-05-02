import React from 'react'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon'
import './DropDownNotification.css'

import { BellFilled } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { delAll, del } from '../../reducers/notificationsReducer'
import { Tag } from 'antd'

function getNoticeData(data) {
  return data.map((item) => {
    var avater

    if (item.type == 'follow') {
      avater =
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png'
    } else if (item.type == 'like') {
      avater =
        'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png'
    } else if (item.type == 'comment') {
      avater =
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
    } else if (item.type == 'admin') {
      avater =
        'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png'
    } else if (item.type == 'alert') {
      avater =
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg'
    }

    var res = {
      id: item._id,
      avatar: avater,
      title: item.type,
      description: item.data,
      datetime: item.updatedAt
    }

    return res
  })
}

const DropDownNotification = () => {
  const dispatch = useDispatch()

  const notifications = useSelector((state) => state.notifications)

  const onClear = () => {
    dispatch(delAll())
  }

  const onItemClick = (item, tabProps) => {
    dispatch(del({ _id: item.id }))
    console.log(tabProps)
  }

  return (
    <div className={'dropdown-div'}>
      <NoticeIcon
        className="notice-icon"
        count={notifications.length}
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
          list={getNoticeData(notifications)}
          title="notification"
          emptyText="You have viewed all notifications"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
      </NoticeIcon>
    </div>
  )
}

export default DropDownNotification
