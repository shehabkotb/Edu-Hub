import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Comment, Avatar, Form, Button, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  DeleteComment,
  getArticleData
} from '../../../reducers/articlePageReducer'
import { DeleteFilled } from '@ant-design/icons'
import Styles from './index.module.css'

import { DateTime } from 'luxon'

const { TextArea } = Input
const ArticleComments = (props) => {
  const dispatch = useDispatch()

  const articleId = props.articleId
  const [submitting, setSubmitting] = useState(false)

  const initalComments = useSelector((state) => state.articlePage.comments)

  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const user = useSelector((state) => state.auth.user)

  const addComment = (comment) => {
    dispatch(createComment(articleId, comment))
    setSubmitting(true)
  }

  const handleSubmit = () => {
    if (!value) {
      return
    }

    let date = new Date()
    let datetoString = date.toString()
    let comment = {
      body: value,
      authorPersonId: user._id,
      createdAt: datetoString
    }
    addComment(comment)
    setSubmitting(false)
    setValue('')
  }

  useEffect(() => {
    dispatch(getArticleData(articleId))
  }, [dispatch, articleId])

  return (
    <>
      {props.showEditor && (
        <Comment
          avatar={<Avatar src={user.photo} alt="Han Solo" />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      )}

      {initalComments?.length > 0 && (
        <CL comments={initalComments} articleId={articleId} />
      )}
    </>
  )
}

const CL = ({ comments, articleId }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <div className={Styles['iconCommentBody']}>
              <Comment
                content={comment?.body}
                author={comment?.createdBy?.name || user?.name}
                avatar={comment?.createdBy?.photo || user.photo}
                datetime={DateTime.fromISO(comment.createdAt).toRelative()}
              />
            </div>
            <div className={Styles['iconCommentRemove']}>
              {(user._id === comment.authorPersonId ||
                user._id === comment?.createdBy?._id) && (
                <Button
                  type="icon"
                  className={Styles['iconButton']}
                  onClick={() => {
                    return dispatch(DeleteComment(articleId, comment))
                  }}
                >
                  <DeleteFilled />
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
)

export default ArticleComments
