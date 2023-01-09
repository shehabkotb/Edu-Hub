import React from 'react'
import Styles from '../index.module.css'
import {

    PlusSquareOutlined,
    MinusSquareOutlined,
    MinusSquareFilled,
    MinusCircleOutlined 
} from '@ant-design/icons' ;

const FollowIcon = ({ followed, setFollow, hidden }) => {
    return (
        <>
            {hidden ? (<div>
                <MinusSquareFilled />
                <MinusCircleOutlined style={{ marginRight: '8px' }} />
            </div>) :
                (<div
                    className={Styles['follow-container']}
                    onClick={() => setFollow(!followed)}
                >
                    {followed ? (
                        <>
                            <MinusSquareOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            <span style={{ color: '#1890ff' }}>UnFollow</span>
                        </>
                    ) : (
                        <>
                            <PlusSquareOutlined style={{ marginRight: '8px' }} />
                            <span>Follow</span>
                        </>
                    )}
                </div>)}
        </>
    )
}

export default FollowIcon;