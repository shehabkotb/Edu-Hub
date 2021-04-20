import React, { useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd'
import WrittenQuestion from '../WrittenQuestion'
import ChoiceQuestion from '../ChoiceQuestion'
import { QuestionHeader, Points, pointStyle, QuestionBody, FormItemQuestionContent, QuestionContent } from './style'


const QuestionHead = ({ changeOption }) => {

    const { Option } = Select;
    const [written, ShowWritten] = useState('written-question');
    const [KeyWords , AddingKeyWords] = useState([]) ; 
    const [options , AddOptions] = useState([]) ; 

    const addOptions = (newElement)=>{
        AddOptions(newElement)
    }

    const addKWords = (newElement)=>{
        AddingKeyWords(newElement)
    }

    const onChangeType = (value) => {
       ShowWritten(value) ; 
    }

    const onFinish = (values) => {
        if (values.QuestionType === 'written-question') {
            values.KeyWords = KeyWords
            if(values.AutoGraded === undefined)
            {
                values.AutoGraded = false ; 
            }
            if(values.TextMatch === undefined)
            {
                values.TextMatch = false ; 
            }
            changeOption(values);

        }
        if (values.QuestionType === 'choice-question') {
           if(values.AutoGraded === undefined)
           {
               values.AutoGraded = false ; 
           }
           let myChoiceValue = {}
           myChoiceValue.AutoGraded = values.AutoGraded 
           myChoiceValue.options = options ; 
           myChoiceValue.points = values.points ; 
           myChoiceValue.QuestionType = values.QuestionType ; 
           myChoiceValue.QuestionTitle = values.QuestionTitle ; 
           changeOption(myChoiceValue);

        }        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <QuestionBody>
            <Form

                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <QuestionHeader>
                    Question
            </QuestionHeader>
                <Points>

                    <Form.Item
                        name='points'
                        label={<span>Points</span>}
                        rules={[
                            {
                                type: 'number',
                                min: 1,
                                max: 100,
                            },
                            {
                                required: true
                            }
                        ]}

                    >

                        <InputNumber style={pointStyle} />
                    </Form.Item>
                </Points>
                <Points>

                    <Form.Item
                        name="QuestionType"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={onChangeType}
                            className="QuestionType"
                            bordered={false}
                        >
                            <Option value="written-question">written-question</Option>
                            <Option value="choice-question">choice-question</Option>
                        </Select>
                    </Form.Item>
                </Points>

                <Form.Item
                    name="QuestionTitle"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={FormItemQuestionContent}

                >
                    <Input style={QuestionContent} placeholder="Question body" />
                </Form.Item>
                <QuestionHeader>
                    Answer
                </QuestionHeader>
                {
                    written === "written-question" ?
                        <WrittenQuestion AddingKeyWords={addKWords} />
                        :
                        <ChoiceQuestion  updateOptions={addOptions}   />
                }

            </Form>
        </QuestionBody>
    )
}

export default QuestionHead;