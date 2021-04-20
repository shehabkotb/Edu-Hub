import { Layout } from 'antd'
import Styled from 'styled-components'

const { Content } = Layout


export const QuestionBody = Styled(Content)`
    min-width:400px ;
    margin:20px 20px;
    background-color:#eee; 
    border-radius:5px ; 
    padding:5px 20px ; 
    overflow:hidden ; 
`

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

export const pointStyle = {
    "fontFamily": "Sans-serif",
    "width": "90%",
    "float": "left",
    "border": "0px",
    "overflow": "hidden"
}
export const Headers = Styled.div`
    width:100% ;   
    overflow:hidden ;   
`

export const Hrline = Styled.hr`
    border: 1px solid #ccc;
    margin:20px 0px ;
    
`

export const CheckLabel = Styled.div`
    float:left ; 
    margin:0px 5px;
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
    margin:15px 0px ; 
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

export const AnswerHeader = Styled.div`
    margin:15px 0px;
    width:40%;
    color:black; 
    font-family:Sans-serif;
    padding:5px 10px ; 
    border-radius:5px ; 
    float:right;
    height:35px;

`

export const RadioAnswer = Styled.div`
    margin:15px 0px ; 
    width:5%;
    font-family:Sans-serif;
    float:left; 
    padding:5px 0px ;

`

export const RadioAnswer2 = Styled.div`
    margin:15px 0px ; 
    width:30%;
    font-family:Sans-serif;
    float:left; 
    padding:5px 0px ;

`
export const AnswerLabelCorrect = Styled.div`
    width:60%;
    float:left;
    text-align:center;
`


export const AnswerLabelCancel = Styled.div`
    width:30%;
    float:right;   
    margin-left:5px; 
`

export const OptionChecker = Styled.div`
    width:100%;  
    overflow:hidden; 

`

export const labelPoint = Styled.div`
    color:black ;
    float:left ; 
    text-align:center; 
    width:45%;
    border:1px solid black ;
`
export const InputPoints = Styled.input`
    border:0px ; 
    font-family:Sans-serif;
    width:42%; 
    float:left;
`

export const Answers = Styled.div`
    float:right ; 
    margin-right 15%; 
`


export const GroupButton = Styled.div`
    float:right ; 
    width:20%;    
`
export const FormButton1 = {
    "float": "right",
    "marginLeft":"10px"

}

export const FormButton2 = {
    "float": "right"
}

export const IconStyle ={
    "fontSize":"15px",
    "color":"gray",
    "margin":"6px 0px"
}