import { Layout } from 'antd'
import Styled from 'styled-components'

const { Header, Footer } = Layout

const S = {}
S.Header = Styled(Header)`
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #fff;
`

S.Footer = Styled(Footer)`
    text-align: center;
    box-shadow: 0px -5px 20px #c9d6dc;
    background: rgb(232 232 233);
`

export default S
