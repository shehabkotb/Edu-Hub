import React from 'react'

import {
    LikeOutlined,
    LikeFilled
} from '@ant-design/icons'
import Styles from '../index.module.css'

const LikeIcon = ({ likesCount, liked, setLiked }) => {
    return (
        <div className={Styles['like-container']} onClick={() => setLiked(!liked)}>
            <span className={Styles['likes-count']}>{likesCount}</span>
            {liked ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
        </div>
    )
}


export default LikeIcon;