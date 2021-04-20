import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Comment, Avatar, Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, CreateComment, deleteComment } from '../../../reducers/articleComments'
import { DeleteFilled } from '@ant-design/icons'
import Styles from './index.module.css'


const { TextArea } = Input;
const ArticleComments = (props) => {
  const dispatch = useDispatch();

  const articleId = props.articleId;

  useEffect(() => {
    dispatch(getComments(articleId));
  }, [dispatch , articleId]);

  const initalComments = useSelector((state) => state.articleComment);
  console.log(initalComments);
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const addComment = (val) => {
    dispatch(CreateComment(articleId, val));
    setSubmitting(true);
  }
  const handleSubmit = () => {
    if (!value) {
      return;
    }

    addComment(value);
    setSubmitting(false);
  }


  return (
    <>

      { props.showEditor && <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />}

      {initalComments.length > 0 && <CL comments={initalComments} articleId={articleId} />}

    </>
  )
}

const CL = ({ comments, articleId }) => {

  const dispatch = useDispatch();
  

  return (
    <div>
      { comments.map((comment ,index) => {
        return (
          <div key={index}>
            <div className={Styles['iconCommentBody']}>
              <Comment content={comment.body} author={comment.name} avatar={comment.photo} datetime={comment.createdAt} />

            </div>
            <div className={Styles['iconCommentRemove']}>
              <Button type="icon" className={Styles['iconButton']}
                onClick={()=>{
                  return dispatch(deleteComment(articleId, comment._id))
                }}
              >
                <DeleteFilled />
              </Button>
            </div>
          </div>)
      })}
    </div>

  )
};


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
       </Button>
    </Form.Item>
  </>
);

export default ArticleComments;
