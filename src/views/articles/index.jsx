import { Card, Button, Modal, Form, Input } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { create_article, getAllArticles , deleteArticle  } from '../../reducers/articlesReducer';
import ArticlePage from '../ArticlePage'
import {
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  StarFilled,
  PlusSquareOutlined,
  MinusSquareOutlined,
  CommentOutlined,
  DeleteFilled
} from '@ant-design/icons'


import Styles from './index.module.css'

const { TextArea } = Input;


const Articles = () => {
  let dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm()
  const handleCancel = () => {
    setModalVisible(false)
  }



  const onFinish = (values) => {
    let Article = {
      "text": values.articleBody,
      "title": values.articleTitle,
      "url": values.url
    };


    try {
      dispatch(create_article(Article));
      setModalVisible(false);

    } catch (e) {
      console.log('can\'t Create Article');
    }
  };

  useEffect(() => {
    dispatch(getAllArticles())
  }, [dispatch, onFinish]);

  useEffect(()=>{
   const deleteArticle = (id)=>{ return dispatch(deleteArticle(id))}
   
  },[dispatch])



  let articleData = useSelector((state) => state.articles)

  function handleClick() {
    setModalVisible(true);
  }

  return (
    <div className={Styles['articles-wrapper']}>
      <div className={Styles['article-title-container']}>
        <h2>Articles</h2>
        <div className={Styles['article-title-container']}>

          <Button type="primary" onClick={handleClick}>
            New Article
          </Button>

          <Modal
            title="Add New Article"
            visible={modalVisible}
            onOk={form.submit}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
             </Button>,
              <Button key="submit" type="primary" onClick={form.submit}>
                Submit
             </Button>
            ]}
          >
            <Form
              form={form}
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="articleTitle"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Article Title!',
                  },
                ]}
              >
                <Input type="text" placeholder="ArticleTitle" />
              </Form.Item>
              <Form.Item
                name="articleBody"
                rules={[
                  {
                    required: true,
                    message: 'Please input your article body!',
                  },
                ]}
              >
                <TextArea
                  type="text"
                  placeholder="article body"
                  autoSize={{ minRows: 5, maxRows: 6 }}

                />
              </Form.Item>
              <Form.Item
                name="url"

              >
                <Input type="text" placeholder="article url" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      {articleData.map((article) => (
        <ArticleCard 
        key={article.id} 
        article={article} 
        deleteArticle={deleteArticle(article.id)} 
        />
      ))}
    </div>
  )
}

const ArticleCard = ({ article ,deleteArticle  }) => {
  
  const clickDelete = ()=>{
    deleteArticle(article.id)
  }

  const viewArticle = ()=>{
    history.push(`/app/articlePage/${article.id}`)
  }
  
  const history = useHistory() ; 
  const user = useSelector((state) => state.auth.user) 
  const [liked, setLiked] = useState(article.like)
  const [bookMark, setBookMark] = useState(article.bookMarked)
  const [follow, setFollow] = useState(article.followingAuthor)
  const [likeCount, setLikeCount] = useState(article.likesCount)


  // like mock function
  const likeArticle = (liked) => {
    liked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1)
    setLiked(liked)
  }

  return (
    <div className={Styles['article-card-container']}>
      <Card
        hoverable
        className="article-card"
        // actions={[
        //   <Like likesCount={likeCount} liked={liked} setLiked={likeArticle} />,
        //   <Bookmark bookMarked={bookMark} setBookMark={setBookMark} />,
        //   <Follow followed={follow} setFollow={setFollow} />,
        //   <Comment />
        // ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={article.authorPersonId.name}
          description={article.title}
        />

        <p>
          {article.text}
        </p>
        {user && user._id === article.authorPersonId._id && (  <Button type="icon"  className={Styles['iconButton']} 
        onClick={clickDelete}
        >
          <DeleteFilled />
        </Button>)}
        <Button type="text" onClick={viewArticle} className={Styles['viewButton']} > view </Button>

      </Card>
    </div>
  )
}

// const Like = ({ likesCount, liked, setLiked }) => {
//   return (
//     <div className={Styles['like-container']} onClick={() => setLiked(!liked)}>
//       <span className={Styles['likes-count']}>{likesCount}</span>
//       {liked ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
//     </div>
//   )
// }


// const Comment = () => {
//   return (
//     <div className={Styles['like-container']}>
//       <CommentOutlined style={{ color: '#1890ff' }} />
//     </div>
//   )
// }

// const Bookmark = ({ bookMarked, setBookMark }) => {
//   return (
//     <div
//       className={Styles['bookmark-container']}
//       onClick={() => setBookMark(!bookMarked)}
//     >
//       {bookMarked ? (
//         <StarFilled style={{ color: '#1890ff' }} />
//       ) : (
//         <StarOutlined />
//       )}
//     </div>
//   )
// }

// const Follow = ({ followed, setFollow }) => {
//   return (
//     <div
//       className={Styles['follow-container']}
//       onClick={() => setFollow(!followed)}
//     >
//       {followed ? (
//         <>
//           <MinusSquareOutlined style={{ marginRight: '8px' }} />
//           <span>UnFollow</span>
//         </>
//       ) : (
//         <>
//           <PlusSquareOutlined style={{ marginRight: '8px' }} />
//           <span>Follow</span>
//         </>
//       )}
//     </div>
//   )
// }

export default Articles
