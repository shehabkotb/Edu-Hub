import { Comment, Form, List, Typography, Input, Button, Avatar } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import styled from 'styled-components'

import Spinner from '../../../components/Spinner'

import {
  getAllComments,
  createComment,
  deleteComment
} from '../../../reducers/lectureCommentsReducer'

export const Container = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px 20px;
`

const CommentForm = (props) => {
  const { addComment, avatar } = props

  const handleSubmit = (values) => {
    addComment({ comment: values.comment })
  }

  return (
    <Comment
      avatar={avatar}
      content={
        <>
          <Form validateTrigger="onSumbit" onFinish={handleSubmit}>
            <Form.Item name="comment" rules={[{ required: true }]}>
              <Input.TextArea allowClear={true} defaultValue="" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Add Comment
              </Button>
            </Form.Item>
          </Form>
        </>
      }
    />
  )
}

const LectureComments = (props) => {
  const dispatch = useDispatch()

  const { selectedLecture } = props
  const { courseId } = useParams()

  const comments = useSelector((state) => state.lectureComments.data.comments)
  const loading = useSelector((state) => state.lectureComments.loading)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(getAllComments(courseId, selectedLecture.id))
  }, [courseId, selectedLecture, dispatch])

  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    )

  const addComment = (moduleItemId, comment) => {
    dispatch(createComment(courseId, moduleItemId, comment))
  }

  const removeComment = (moduleItemId, commentId) => {
    dispatch(deleteComment(courseId, moduleItemId, commentId))
  }

  const getActions = (
    currentUserId,
    commentAuthorId,
    moduleItemId,
    commentId
  ) => {
    if (currentUserId === commentAuthorId)
      return [
        <Typography.Text
          onClick={() => removeComment(moduleItemId, commentId)}
          type="danger"
        >
          Delete
        </Typography.Text>
      ]
    return []
  }

  return (
    <Container>
      <Typography.Title level={4}>Comments</Typography.Title>
      <List
        style={{ padding: '0px 8px' }}
        dataSource={comments}
        locale={{ emptyText: 'no comments' }}
        renderItem={(comment) => (
          <List.Item>
            <Comment
              style={{ color: '#000000d9' }}
              actions={getActions(
                user._id,
                comment.user._id,
                selectedLecture.id,
                comment.id
              )}
              author={
                <Typography.Text strong>{comment.user.name}</Typography.Text>
              }
              avatar={<Avatar src={comment.user.photo} />}
              content={comment.comment}
            />
          </List.Item>
        )}
      ></List>
      <CommentForm
        avatar={<Avatar src={user.photo} />}
        addComment={(comment) => {
          addComment(selectedLecture.id, comment)
        }}
        style={{ padding: '0px 8px' }}
      />
    </Container>
  )
}

export default LectureComments
