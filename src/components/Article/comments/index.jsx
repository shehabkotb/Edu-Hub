import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// import {DeleteFilled} from '@ant-design/icons'



const { TextArea } = Input;



const ArticleComments = (props) => {



  const initial = [{
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: 'this is as ',
    
    id: 1
  },
  {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: 'fasdfasda',
    
    id: 2
  }];
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState(initial);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setComments(comments.concat(
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{value}</p>,
          
          id: comments.length + 1
        }))

      setSubmitting(false);
      setValue('');
    }, 1000);

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

      {comments.length > 0 && <CommentList comments={comments} />}

    </>
  )
}

const CommentList = ({ comments }) => {
  return (
     <List
       dataSource={comments}
       itemLayout="horizontal"
       renderItem={props => <> <Comment {...props} /> </>}
     />
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
