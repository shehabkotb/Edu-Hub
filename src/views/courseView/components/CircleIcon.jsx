import Icon from '@ant-design/icons'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const circleSvg = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentcolor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
  </svg>
)

const CircleIcon = (props) => (
  <Icon
    css={css`
      color: #bfbfbf;
      background-color: #fff;
      overflow: hidden;
      border-radius: 10px;
    `}
    component={circleSvg}
    {...props}
  />
)

export default CircleIcon
