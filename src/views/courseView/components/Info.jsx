import React from 'react'
import { Button } from 'antd'

import { ArrowRightOutlined } from '@ant-design/icons'

import styles from './Info.module.css'

const Info = () => {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles['info-title']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </h3>
        <div className={styles['info-date']}>11/12/2020</div>
      </div>

      <Button
        shape="circle"
        type="secondary"
        icon={<ArrowRightOutlined />}
      ></Button>
    </div>
  )
}

export default Info
