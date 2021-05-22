import React from 'react'
import { Form, Input, Button, Checkbox, Tag } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import {
  KeyWords,
  QuestionContent,
  FormItemQuestionContent,
  Hrline,
  CheckLabel,
  GroupButton,
  FormButton1,
  FormButton2
} from './style'

class WrittenQuestion extends React.Component {
  formRef = React.createRef()
  state = {
    tags: [],
    showInputValue: false,
    inputValue: ''
  }

  static props = {
    AddingKeyWords: PropTypes.func.isRequired
  }

  onToggle = () => {
    this.setState((prevstate) => ({
      showInputValue: !prevstate.showInputValue
    }))
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ showInputValue: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  onConfirm = () => {
    this.props.AddingKeyWords(this.state.tags)
  }
  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }

    this.setState({
      tags,
      showInputValue: false,
      inputValue: ''
    })

    this.props.AddingKeyWords(this.state.tags)
  }
  saveInputRef = (input) => {
    this.input = input
  }
  render() {
    const { tags, showInputValue, inputValue } = this.state
    return (
      <>
        <Form.Item
          name="Answer"
          rules={[
            {
              required: true,
              message: 'Please input your Answer!'
            }
          ]}
          style={FormItemQuestionContent}
        >
          <Input style={QuestionContent} placeholder="Answer" />
        </Form.Item>
        <Hrline />
        <CheckLabel>
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
        <CheckLabel>
          <Form.Item name="TextMatch" valuePropName="checked">
            <Checkbox
              checked={this.state.checked}
              disabled={this.state.disabled}
              onChange={this.onChange}
            >
              TextMatch
            </Checkbox>
          </Form.Item>
        </CheckLabel>
        {/* <TagsWords  tags={this.state} /> */}

        <KeyWords>
          KeyWords :
          {!showInputValue && (
            <Button
              icon={<PlusCircleOutlined />}
              style={{ border: '0px', marginRight: '5px', background: 'none' }}
              onClick={this.onToggle}
            ></Button>
          )}
          {showInputValue && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78, margin: '0px 5px' }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {tags.length > 0 ? (
            tags.map((word) => (
              <Tag
                onClose={(e) => {
                  e.preventDefault()
                  this.handleClose(word)
                }}
                closable
                key={word}
                color="#2db7f5"
              >
                {word}
              </Tag>
            ))
          ) : (
            <Tag color="gray">none</Tag>
          )}
        </KeyWords>
        <GroupButton>
          <Form.Item style={FormButton1}>
            <Button type="primary" htmlType="submit" onClick={this.onConfirm}>
              Add
            </Button>
          </Form.Item>
          <Form.Item style={FormButton2}>
            <Button htmlType="button">Cancel</Button>
          </Form.Item>
        </GroupButton>
      </>
    )
  }
}

export default WrittenQuestion
