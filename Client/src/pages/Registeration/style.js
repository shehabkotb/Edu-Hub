import styled from 'styled-components'

import { Form } from 'antd'

export const FormItemFlex = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
  }
`

export const FormContainer = styled.div`
  margin: 0 auto;
  width: 26rem;
  /* height: 50rem; */
  position: relative;
  z-index: 2;
  background-color: white;
  border-radius: 10px;
`

export const FormWrapper = styled.div`
  padding: 40px 32px;
`

export const FormTitle = styled.h2`
  margin: 0px;
`

export const PageContainer = styled.div`
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    pointer-events: none; /* make the pseudo class click-through */
  }

  background: #251b43; /* fallback */
  background-image: url('/login-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 870px;
`
