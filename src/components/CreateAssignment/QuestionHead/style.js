import Styled from 'styled-components'
import { Layout } from 'antd'

const { Content } = Layout


export const QuestionBody = Styled(Content)`
    min-width:400px ;
    background-color:#eee; 
    border-radius:5px ; 
    padding:5px 20px ; 
    overflow:hidden ; 
    width:100%;
`

export const QuestionHeader = Styled.div`
    margin:15px 0px;
    width:35%;
    background: #c3c3c2;
    color:white; 
    font-family:Sans-serif;
    padding:5px 10px ; 
    border-radius:5px ; 
    float:left;
`

export const Points = Styled.div`
    color:black;
    margin:15px 5px ; 
    float:right;
    width:20%;
    min-width:150px;
    padding:0px 5px ; 
    border-radius:5px ; 
    color:black; 
    font-family:Sans-serif;
    background:#fff; 
    text-align:center; 
    border:1px solid #c3c3c2;
    height:35px;    
    `


export const pointStyle = {
    "fontFamily": "Sans-serif",
    "width": "90%",
    "float": "left",
    "border": "0px",
    "overflow": "hidden"
}


export const FormItemQuestionContent = {
    "width": "60%",
    "display": "block",
    "margin": "5px 0px"
}


export const QuestionContent = {
    "paddingLeft": "5px",
    " fontFamily": "Sans-serif",
    "color": "black",
    " margin": "5px 0px",
    "border": "1px solid #c3c3c2",
    "borderRadius": "5px",
    "height": "35px",
}