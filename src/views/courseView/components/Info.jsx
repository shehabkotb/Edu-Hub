/** @jsxImportSource @emotion/core */

import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { container, infoTitle, infoDate } from './style'

const Info = () => {
  return (
    <div css={container}>
      <div>
        <h3 css={infoTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </h3>
        <div css={infoDate}>11/12/2020</div>
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
