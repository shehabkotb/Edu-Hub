import React from 'react'
import { DeleteOutlined, EditOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import { ReceivedQuestionHeader, ReceivedQuestionTitle, ReceivedQuestionBody, QuestionTitlea, QuestionIcon } from './style'


const ReceivedChoice = (props) => {
    const {  Points, QuestionTitle, options, AutoGraded, QuestionType } = props.questionData;
    const id = props.id + 1  ; 
    const DeleteQuestion = props.DeleteQuestion
    const del = () => {
        DeleteQuestion(props.questionData)  ;
    }

    return (
        <ReceivedQuestionHeader>
            <ReceivedQuestionTitle>
                <QuestionTitlea>
                Question {id} : 
              </QuestionTitlea>
                <QuestionIcon>
                    (Points : {Points})
                    <Button
                        icon={<EditOutlined />}
                        style={{ border: '0px', marginRight: '5px' }}
                    >
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        style={{ border: '0px' }}
                        onClick={del}
                    >

                    </Button>
                </QuestionIcon>
            </ReceivedQuestionTitle>
            <ReceivedQuestionBody>
                <p>{QuestionTitle}</p>
                {options ? options.map((value ,index) =>
                    <p key={index}   >&nbsp;{value.name}
                        {value.correct &&
                            <CheckCircleOutlined style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }} />} </p>) : <p>invalid choices</p>}
                <hr style={{ border: "0.5px solid #c2c2c2" }} />
                <div>
                    Question Type :<b> {QuestionType} </b> ,
                 &nbsp;
                 AutoGraded : {AutoGraded ? <CheckCircleOutlined style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }} /> : <CloseCircleOutlined style={{ fontSize: '16px', color: 'gray', margin: '5px' }} />}

                </div>
            </ReceivedQuestionBody>
        </ReceivedQuestionHeader>
    )
}



export default ReceivedChoice;