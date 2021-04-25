import React from 'react'
import Styles from '../index.module.css'
import {
    StarOutlined,
    StarFilled,
    MinusCircleFilled
  } from '@ant-design/icons'
const BookMarkIcon = ({ bookMarked, setBookMark, hidden }) => {
    return (
        <>
            {hidden ? (<div> <MinusCircleFilled />  <StarOutlined /></div>) : (<div
                className={Styles['bookmark-container']}
                onClick={() => setBookMark(!bookMarked)}
            >
                {bookMarked ? (
                    <StarFilled style={{ color: '#1890ff' }} />
                ) : (
                    <StarOutlined />
                )}
            </div>)}
        </>
    )
  }

export default BookMarkIcon ; 