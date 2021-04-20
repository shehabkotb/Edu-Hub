import React from 'react'
import { Form, Input, Button, Checkbox, Radio } from 'antd'
import {
    RadioAnswer2, Hrline, CheckLabel, GroupButton,
    FormButton1, FormButton2, AnswerHeader, AnswerLabelCorrect,
    AnswerLabelCancel, OptionChecker, RadioAnswer
} from './style'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import PropTypes from "prop-types";

class ChoiceQuestion extends React.Component {
    formRef = React.createRef();
    state = {
        options: [
            { name: 'First Option', correct: false },
            { name: 'Second Option', correct: false },
            { name: 'third Option', correct: false },
            { name: 'fourth Option', correct: false }
        ],
        newOptionInput: false,
        inputValue: '',
    }

    static props = {
        updateOptions: PropTypes.func.isRequired,
      };

    showData = () => {
        this.props.updateOptions(this.state.options)
    }
   

    showInputField = () => {
        this.setState(prevstate => ({ newOptionInput: !prevstate.newOptionInput }));
    }

    changeValue = (updateOption) => {

        let index = this.state.options.findIndex((option) => option === updateOption);
        let updatedOption = this.state.options[index];
        let newValues = this.state.options;
        newValues[index] = updatedOption;
        this.setState({ options: newValues });

    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        let inputValue = this.state.inputValue;
        let myOptions = this.state.options;
        let checkValuein = true;
        myOptions.forEach(option => {
            if (option.name === inputValue) {
                checkValuein = false;
            }
        });
        if ((inputValue.length > 0) && checkValuein) {
            let newOption = { name: inputValue, correct: false };
            let myOptions = this.state.options;

            if (newOption && myOptions.indexOf(newOption) === -1) {
                myOptions = [...myOptions, newOption];
            }
            this.setState({
                options: myOptions
            })
        } else if (inputValue.length === 0) {
            alert('empty field enter value')
        }
        else {
            alert('this option is already in ');
        }
    }

    onChangeAutoGraded = () => {
        this.setState(prevstate => ({ autoGraded: !prevstate.autoGraded }));
    }
    saveInputRef = input => {
        this.input = input;
    }

    deleteOption = (deletedOption) => {
        const options = this.state.options.filter(option => option !== deletedOption);
        this.setState({ options });
    }
    onCahn = (selectedOption)=>{
        this.state.options.forEach((element) => {
            if(element === selectedOption) 
            {
                selectedOption.correct= !selectedOption.correct ; 
            }
        });

    }
    render() {
        const { newOptionInput, options, inputValue } = this.state;
        return (
            <>




                <AnswerHeader>
                    <AnswerLabelCorrect>
                        Correct
                        </AnswerLabelCorrect>
                    <AnswerLabelCancel>
                        Cancel
                        </AnswerLabelCancel>
                </AnswerHeader>


                {(options.length > 0) && (
                    options.map((option, index) => (
                        <OptionChecker key={index}>
                            <RadioAnswer>
                                <Radio style={{ marginLeft: "10px" }}>
                                    {option.name}


                                </Radio>

                            </RadioAnswer>
                            <AnswerHeader>
                                <AnswerLabelCorrect>
                                    <Form.Item name={option.name} valuePropName="checked">
                                        <Checkbox
                                            checked={this.state.checked}
                                            disabled={this.state.disabled}
                                            onChange={()=>{
                                                this.onCahn(option)
                                            }}
                                        />
                                    </Form.Item>
                                </AnswerLabelCorrect>

                                <AnswerLabelCancel>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        style={{ border: '0px', marginLeft: "5px", background: 'none' }}
                                        onClick={
                                            () => {
                                                this.deleteOption(option)
                                            }
                                        }

                                    >
                                    </Button>
                                </AnswerLabelCancel>
                            </AnswerHeader>
                        </OptionChecker>
                    ))
                )}


                {/* this is add value  */}
                <OptionChecker>
                    <RadioAnswer>

                        <Button
                            icon={<PlusCircleOutlined />}
                            style={{ border: "0px", marginLeft: "5px", background: 'none' }}
                            onClick={this.showInputField}
                        >
                        </Button>

                    </RadioAnswer>

                    {newOptionInput && (<RadioAnswer2>
                        <Input placeholder="Add Option"
                            ref={this.saveInputRef}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            style={{ float: "left", width: "60%" }}
                        />
                        <Button style={{ float: "right", textAlign: 'center' }} type="primary"
                            onClick={this.handleInputConfirm} >
                            Add
                            </Button>
                    </RadioAnswer2>)}

                </OptionChecker>
                <Hrline />
                <CheckLabel >
                    <Form.Item name="AutoGraded" valuePropName="checked">
                        <Checkbox
                            checked={this.state.checked}
                            disabled={this.state.disabled}
                            onChange={this.onChange}
                        >
                            Auto-Graded
                        </Checkbox>
                    </Form.Item>

                </CheckLabel>
                <GroupButton>
                    <Form.Item style={FormButton1} >
                        <Button type="primary" htmlType="submit" onClick = {this.showData} >
                            Add
                        </Button>
                    </Form.Item>
                    <Form.Item style={FormButton2}>
                        <Button htmlType="button"  >
                            Cancel
                            </Button>
                    </Form.Item>
                </GroupButton>
            </>
        )
    }
}
export default ChoiceQuestion;