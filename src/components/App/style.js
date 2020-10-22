import { Layout } from 'antd'
import Styled from 'styled-components'

const { Header } = Layout

export const AppHeader = Styled(Header)`
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #fff; 
`
